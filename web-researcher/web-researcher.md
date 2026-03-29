---
name: web-researcher
description: >
  Deep web research and information synthesis.
  "research", "investigate", "compare options", "best practices",
  "调研", "研究一下", "查一下", "对比分析", "最佳实践"
user-invocable: true
---

# /web-researcher

Conduct comprehensive web research with authoritative sources and structured synthesis.

## Research Strategy

### 1. Query Analysis

Before searching, determine:
- **Research Type**: Technical, comparison, exploratory, or fact-finding
- **Depth Needed**: Quick answer, moderate investigation, or deep dive
- **Source Priority**: Official docs, community resources, or expert opinions

### 2. Tool Selection

| Research Type | Primary Tool | Secondary Tool |
|---------------|--------------|----------------|
| Technical docs | Context7 | WebFetch |
| Current events | WebSearch | WebFetch |
| Comparisons | WebSearch | Context7 |
| Specific URLs | WebFetch | - |

### 3. Search Execution

**For Technical Documentation:**
```
1. Use mcp__context7__resolve-library-id to find library ID
2. Use mcp__context7__query-docs with specific question
3. Supplement with WebSearch if needed
```

**For General Research:**
```
1. WebSearch with precise query (include year for current info)
2. WebFetch top 2-3 authoritative sources
3. Cross-reference findings
```

**For Comparisons:**
```
1. WebSearch "[option A] vs [option B] [year]"
2. Find official documentation for each option
3. Create structured comparison
```

## Search Best Practices

### Query Formulation
- Include current year (2026) for recent information
- Use specific terms over vague ones
- Add context: language, framework, version
- Example: "React 19 server components best practices 2026"

### Source Evaluation
- Prioritize: Official docs > Reputable tech blogs > Community forums
- Check publication dates
- Cross-reference multiple sources
- Note conflicting information

### Context7 Usage
- Always resolve library ID first
- Query should be specific and detailed
- Maximum 3 calls per question
- Use for: React, Next.js, Node.js, Python libs, etc.

## Output Format

### Research Report Structure

```markdown
## Summary
[2-3 sentence overview of findings]

## Key Findings
- [Finding 1 with context]
- [Finding 2 with context]
- [Finding 3 with context]

## Details
[Expanded information organized by topic]

## Comparison Table (if applicable)
| Aspect | Option A | Option B |
|--------|----------|----------|
| ...    | ...      | ...      |

## Recommendations
[Actionable suggestions based on findings]

## Sources
- [Source 1](URL) - Brief description
- [Source 2](URL) - Brief description
```

### Citation Requirements
- Always include source URLs
- Note when information may be outdated
- Distinguish facts from opinions
- Mark uncertain information clearly

## Quality Standards

- **Accuracy**: Verify information across sources
- **Relevance**: Focus on user's actual question
- **Recency**: Prefer current information
- **Completeness**: Cover key aspects without overload
- **Actionability**: Provide usable conclusions
