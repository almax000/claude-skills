# Universal Integration (OpenSkills Compatible)

Product Context 的通用集成，兼容任何支持 AGENTS.md 的 AI 编码代理。

## 安装方式

1. 复制 `AGENTS.md.template` 的内容
2. 添加到项目的 `AGENTS.md` 文件中

## 兼容性

此模板遵循 OpenSkills 规范，兼容：
- OpenAI Codex CLI
- Claude Code
- 其他支持 AGENTS.md 的工具

## 文件说明

| 文件 | 用途 |
|------|------|
| `AGENTS.md.template` | 通用 AGENTS.md 模板 |

## 使用效果

AI 代理将会：
- 在实现功能前读取 `VISION.md`
- 在写用户面向内容时遵循 `BRAND.md`
- 根据 `ROADMAP.md` 理解优先级
- 在会话开始/结束时管理 `MEMO.md`
