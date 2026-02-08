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
| [`ui-spec`](skills/ui-spec/) | 管理 UI 规格文档，支持批注工作流 |

---

## 快速开始

### 安装

```bash
# 克隆并复制技能到 Claude Code 配置目录
git clone https://github.com/almax000/claude-skills.git
cp -r claude-skills/skills/* ~/.claude/skills/
```

### 使用

#### init-modular

创建模块化的 `.claude/` 目录，包含 agents、hooks 和 rules：

```bash
/init-modular
```

生成：

```
.claude/
├── agents/           # code-reviewer、debugger、3 级研究代理
├── hooks/            # 错误教训提醒
├── rules/            # 代码质量、git 工作流
└── settings.json     # Hook 配置
```

#### product-context

创建和管理产品文档：

```bash
/product-init    # 创建产品文档（VISION、USERS、SCOPE、ROADMAP）
/product         # 查看和更新产品上下文
```

#### ui-spec

创建和管理 UI 规格文档，支持交互式批注工作流：

```bash
/ui-spec init       # 创建 UI 规格文档，包含视口切换和批注系统
/ui-spec capture    # 从现有项目源码生成屏幕
/ui-spec            # 查看当前 UI 规格（在浏览器中打开）
/ui-spec annotate   # 从对话上下文添加批注
/ui-spec update     # 更新屏幕内容
/ui-spec add-screen # 向流程添加新屏幕
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

<div align="center">

**MIT License** · 为独立开发者而生

</div>
