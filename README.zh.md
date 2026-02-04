<div align="center">

# Claude Skills

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skills-blue.svg)](#技能)

**经过实战验证的 Claude Code 技能集**

[English](README.md) | [中文](README.zh.md)

</div>

---

## 这是什么？

一个个人的 Claude Code 技能集合——从真实项目中提取的、经过验证的工作流和自动化模式。

**设计理念**：技能是入口。通过技能，你可以生成 agents、hooks 和 rules。与其分享复杂的配置文件，不如分享能生成它们的技能。

---

## 技能

| 技能 | 描述 |
|------|------|
| [`init-modular`](skills/init-modular/) | 初始化模块化的 .claude/ 目录，包含 agents、hooks 和 rules |
| [`product-context`](skills/product-context/) | 管理产品文档（`/product-init`、`/product`）|

---

## 快速开始

### 安装

```bash
# 克隆并复制技能到 Claude Code 配置目录
git clone https://github.com/almax000/claude-skills.git
cp -r claude-skills/skills/* ~/.claude/skills/
```

### 使用

```bash
# 在任意项目中运行：
/init-modular    # 设置 .claude/ 结构
/product-init    # 设置产品文档
```

---

## 生成的内容

运行 `/init-modular` 后，会生成：

```
.claude/
├── agents/           # 专业 AI 代理
│   ├── code-reviewer.md
│   ├── debugger.md
│   └── *-researcher.md (3 级研究代理)
├── hooks/            # 自动化触发器
│   └── error-lesson-*.sh
├── rules/            # 编码规范
│   ├── code-quality.md
│   └── git-workflow.md
└── settings.json     # Hook 配置
```

---

## 设计原则

1. **技能是入口** — 安装一个东西，其他的都自动生成
2. **仅限实战验证** — 每个技能都来自真实项目
3. **自包含** — 每个技能独立运行
4. **生成优于静态** — 技能创建配置，而不是简单复制文件

---

## 适合谁

| 用户 | 收益 |
|------|------|
| **Claude Code 新手** | 开箱即用的技能 |
| **个人开发者** | 用经过验证的工作流节省时间 |
| **小团队** | 跨项目的一致实践 |

---

## 参与贡献

有个好用的技能？欢迎贡献！

1. Fork 仓库
2. 在 `skills/` 添加你的技能
3. 包含一个清晰的 `SKILL.md`
4. 提交 Pull Request

---

<div align="center">

**MIT License** · 为独立开发者而生

</div>
