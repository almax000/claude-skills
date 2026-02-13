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

**设计理念**：Claude Code 很强大，但有工作流空白。这些技能填补它们——脚手架搭建项目配置、赋予 AI 持久的产品记忆、实现可视化设计协作、防止运行时端口冲突。每个技能都从真实的日常使用中提炼，彼此独立运行。

---

## 技能

| 技能 | 描述 |
|------|------|
| [`init-modular`](skills/init-modular/) | 初始化模块化的 .claude/ 目录，包含 agents、hooks 和 rules |
| [`product-context`](skills/product-context/) | 管理产品文档（`/product-init`、`/product`）|
| [`ui-spec`](skills/ui-spec/) | 管理 UI 规格文档，支持批注工作流 |
| [`port-manager`](skills/port-manager/) | 跨项目端口分配管理，自动冲突检测 |

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

#### port-manager

跨项目端口分配管理，自动冲突检测：

```bash
/port-manager           # 查看全局端口状态
/port-manager setup     # 一键安装（hook、shell 函数、注册表）
/port-manager check 3000  # 检查指定端口
/port-manager find 5    # 查找 5 个可用端口
/port-manager reserve 9001 my-app "API server"  # 预留端口
/port-manager release 9001  # 释放端口
/port-manager scan      # 扫描 CLAUDE.md 自动发现端口
```

安装 PreToolUse hook，自动阻止端口冲突：
- **第一层**：检测显式端口（`--port`、`PORT=`、`localhost:`）
- **第二层**：检测间接启动（`pnpm dev`），读取 vite.config、package.json、.env
- **Monorepo 感知**：沿目录树向上查找 `.git`/`CLAUDE.md` 解析项目名

---

## 设计原则

1. **填补真实空白** — 每个技能解决 Claude Code 中一个具体的工作流痛点
2. **实战验证** — 从真实项目中提炼，而非假设场景
3. **自包含** — 每个技能独立运行，按需安装
4. **AI 原生** — 围绕 Claude Code 的工作方式设计：hooks、文件协议、斜杠命令

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
