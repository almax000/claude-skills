# plan-debate

Multi-agent debate planning pipeline for high-quality implementation plans. Uses agent separation and independent review to catch issues before code is written.

## When to Use

- Tasks with 3+ implementation steps and dependencies
- Architecture decisions or system design
- Irreversible operations (database migrations, deployments, data changes)
- Any task where a wrong plan is expensive to undo

For simple tasks (1-2 steps, no dependencies), plan inline without this skill.

## Pipeline Overview

| Phase | Actor | Output |
|-------|-------|--------|
| 1. Initial Plan | planner (Sonnet) or architect (Opus) agent | Structured implementation plan |
| 2. Review | plan-reviewer (Opus) agent | Structured review with verdict |
| 3. Revision | planner + reviewer (max 2 rounds) | Revised plan if needed |
| 4. Present | orchestrator | Final plan for user approval |
| 5. Execute | orchestrator | Step-by-step implementation with task tracking |

## Agent Roles

### Planner (Sonnet)
- Standard feature implementation (3-5 steps)
- Explores codebase, references actual file paths
- Produces: Goal, Steps, Risks, Verification Plan, Success Criteria

### Architect (Opus)
- System design, architecture decisions (5+ steps)
- Same output format as planner, deeper analysis

### Plan-Reviewer (Opus)
- Independent code-aware review
- Reads source files to verify plan assumptions
- Cross-checks against project rules and error lessons
- Outputs structured review with verdict

## Verdict Types

| Verdict | Meaning | Action |
|---------|---------|--------|
| APPROVE | Plan is sound | Present to user for approval |
| REVISE | Fixable issues found | Re-plan with feedback (max 2 rounds) |
| REJECT | Fundamental problems | Ask user for guidance |

## Verification Tiers

Every plan must include a Verification Plan with applicable tiers:

| Tier | Items | When Required |
|------|-------|---------------|
| Baseline | lint + type-check + build + existing tests | Always |
| Unit tests | New/modified tests for changed logic | Logic changes |
| E2E tests | Playwright tests for user flows | Default-on (opt-out only) |
| Security | security-reviewer agent or manual audit | Auth, payment, data, APIs |
| Regression | Full test suite vs main branch | Breaking changes, refactors |

Research-only plans (no code changes) skip verification tiers entirely.

## Frontend Workflow

When a plan touches UI, four phases are mandatory:

1. **Design** — `/frontend-design` skill produces wireframe + design direction
2. **Implementation** — build code following the design
3. **Spec generation** — `/ui-spec capture` generates spec from implemented code
4. **Fidelity check** — compare spec against original design, fix deviations
