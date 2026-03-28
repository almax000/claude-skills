---
name: plan-debate
description: Multi-Agent Debate 规划流水线。Planner → Critic → Revision → 用户审批。用于 3+ 步骤任务、架构决策、不可逆操作的高质量规划。
---

# Multi-Agent Debate Planning Pipeline

You are orchestrating a structured multi-agent debate to produce a high-quality implementation plan. **You MUST delegate plan creation to a planner/architect agent** — NEVER write the plan yourself in the main context. Your role is strictly orchestration.

## Context

The user needs an implementation plan for their task. You will coordinate:
- A **planner** agent (Sonnet) or **architect** agent (Opus) to draft the plan
- A **plan-reviewer** agent (Opus) to critique it
- Up to 2 revision rounds if the reviewer identifies critical issues

## HARD RULE: Always Spawn Agent

**You MUST spawn a planner or architect agent to produce the plan. NEVER write the plan yourself in the main context.**

This rule has NO exceptions — regardless of perceived task simplicity. If you are tempted to write the plan inline, spawn the planner agent instead. The value of this pipeline comes from agent separation and independent review.

## Pipeline

### Phase 1: Initial Plan

Determine which planner to use:
- **Architecture decisions / 5+ steps / system design** → spawn `architect` agent
- **Feature work / 3-5 steps / standard implementation** → spawn `planner` agent

Provide the planner with a comprehensive prompt including:
- The user's task description (full context from conversation)
- Relevant file paths mentioned in conversation
- Any constraints or preferences the user stated
- Instruction to explore the codebase as needed before planning

**Required plan structure**:
1. Goal (one sentence)
2. Numbered steps with: description, files to touch, dependencies, verification
3. Risks and mitigation
4. Verification plan (see below)
5. Success criteria (testable)

### Verification Requirements

Every plan MUST include a **Verification Plan** section with the following tiers:

| Tier | Items | When to include |
|------|-------|-----------------|
| **Baseline** (always) | `lint` + `type-check` + `build` + existing tests pass | Every plan, no exceptions |
| **Unit tests** | New/modified unit tests for changed logic | Every plan that changes logic |
| **E2E tests** | Playwright E2E tests for affected user flows | **Every plan by default** — only skip if user explicitly says "skip E2E" |
| **Security check** | `security-reviewer` agent or manual audit | Auth, payment, data handling, API changes |
| **Regression** | Run full test suite, compare against main branch | Breaking changes, refactors, dependency upgrades |

**E2E is opt-out, not opt-in.** If the user has not explicitly said to skip E2E, the plan must include it.

**Exception: Research-only plans** (no code changes — e.g., investigation, analysis, documentation, comparison) do not require a Verification Plan section. The planner should mark the plan as `type: research` and skip testing tiers entirely.

### Frontend Workflow (mandatory when plan touches UI)

If the plan involves **any frontend/UI changes** (components, pages, layouts, styles), the following workflow is mandatory:

1. **Design phase** — invoke `/frontend-design` skill BEFORE coding. Output: wireframe/mockup + design direction (typography, color, layout). This becomes the visual spec that code must match.
2. **Implementation phase** — build frontend code following the design output.
3. **Spec generation** — after frontend code is complete, invoke `/ui-spec capture` (or `/ui-spec add-screen`) to generate a UI spec from the implemented code.
4. **1:1 fidelity check** — compare the generated UI spec against the original design. The implementation must faithfully reproduce the design. Any deviation must be flagged and fixed.

The planner must include these 4 phases as explicit plan steps when frontend changes are involved. Only skip if user explicitly says to.

### Phase 2: Review

After receiving the plan, spawn the `plan-reviewer` agent with:
- The complete plan from Phase 1
- The original task description
- Instruction to read relevant source files and verify assumptions

Wait for the reviewer's structured review and verdict.

### Phase 3: Revision (conditional)

| Reviewer Verdict | Action |
|-----------------|--------|
| **APPROVE** | Skip to Phase 4 |
| **REVISE** | Re-spawn planner with: original plan + all critical issues + warnings. Then re-spawn reviewer for the revised plan. Maximum **2 revision rounds**. |
| **REJECT** | Present rejection reasons to user and ask for guidance before proceeding |

### Phase 4: Present to User

Display the final plan and review summary in this format:

```
## Plan v{version} — [Task Title]

{The approved plan content}

---

### Review Summary
**Verdict**: {verdict}
**Rules Compliance**: {pass/issues}
**Error Lessons Checked**: {relevant ones}

{Key review points — strengths + any remaining notes}

---

**Ready to execute?** Awaiting your approval to begin implementation.
```

### Phase 5: Execute

After user approves:
1. Create tasks (TaskCreate) for each plan step to track progress
2. Execute steps sequentially, marking each complete
3. If execution deviates from plan, **stop and re-plan** — do not improvise

## Agent Prompt Templates

### For Planner/Architect

> Analyze the following task and produce a detailed implementation plan.
>
> **Task**: [user's task]
> **Context**: [relevant conversation context, file paths, constraints]
>
> Explore the codebase as needed before planning. Reference actual file paths and function names.
> Include verification steps — not just what to build, but how to prove it works.
>
> **Verification Plan is MANDATORY.** Every plan must include:
> - Baseline: lint + type-check + build + existing tests pass
> - Unit tests for changed logic
> - E2E tests (Playwright) for affected user flows — **include by default, only omit if user explicitly opted out**
> - Security review if touching auth/payment/data/APIs
>
> Output format: Goal → Steps (numbered, with deps/verification) → Risks → Verification Plan → Success Criteria

### For Plan-Reviewer

> Review the following implementation plan for the task: [task description]
>
> **Plan to Review**:
> [complete plan]
>
> Read relevant source files to verify the plan's assumptions. Check against project rules and error lessons. Output your structured review with verdict.

## Important Rules

- **NEVER write the plan yourself** — always spawn planner/architect agent, no matter how simple the task appears
- **Never skip the review phase** — it is the core quality gate
- **Never execute before user approval** — even if reviewer approves
- **Include full context in agent prompts** — agents have no conversation history
- **Maximum 2 revision rounds** — after 2, present to user with outstanding issues
- **Spawn agents sequentially** — reviewer needs the plan; planner needs the critique
- **E2E tests are default-on** — only omit if user explicitly says "skip E2E" or "no E2E needed"
- **If plan requires database changes**: ensure planner reads `.claude/rules/database.md`
- **If plan adds middleware**: ensure reviewer checks E020 (return await next)
