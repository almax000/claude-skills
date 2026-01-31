# Product Context

> Give your AI the product context it deserves.

**Product Context** 是一个极简的产品上下文管理规范。4个Markdown文件，让AI不仅理解你的代码，还理解你的商业目标。

## 为什么需要这个？

AI编码助手（Claude、Cursor、Copilot）越来越强，但它们只理解**代码**，不理解**产品**：

- 它们知道怎么写代码，但不知道**为什么**写这段代码
- 它们能遵循编码规范，但不知道**给谁**写
- 它们能生成功能，但不知道这个功能是否符合**产品定位**

`AGENTS.md` 和 `CLAUDE.md` 解决了代码上下文问题，但**产品上下文**仍然是空白。

## 快速开始

### 方式1：手动创建

在项目根目录创建 `.product/` 目录：

```
.product/
├── PRD.md          # 产品需求文档
├── ROADMAP.md      # 产品路线图
├── BRAND.md        # 品牌调性指南
└── MEMO.md         # 当前状态备忘
```

### 方式2：使用模板

```bash
# 克隆仓库
git clone https://github.com/user/product-context.git

# 复制最小模板到你的项目
cp -r product-context/templates/minimal/.product your-project/
```

### 方式3：使用 Claude Code Skill

```
/product init
```

## 核心文件

| 文件 | 作用 | AI如何使用 |
|------|------|------------|
| `PRD.md` | 产品灵魂 | 实现功能前检查是否符合产品定位 |
| `ROADMAP.md` | 战略方向 | 了解当前阶段，区分优先级 |
| `BRAND.md` | 品牌调性 | 写文案、UI文字时遵循风格 |
| `MEMO.md` | 短期记忆 | 恢复上次会话进度，保持连续性 |

## 与 AGENTS.md 的关系

Product Context 和 `AGENTS.md` 是**互补关系**，不是竞争：

| AGENTS.md | .product/ |
|-----------|-----------|
| 怎么写代码 | 为什么写这个代码 |
| 技术规范 | 商业逻辑 |
| 编码风格 | 品牌调性 |
| 构建命令 | 产品愿景 |

在 `AGENTS.md` 中添加引用：

```markdown
## Product Context
See `.product/` for product vision, user personas, and brand guidelines.
Always read `.product/PRD.md` before implementing major features.
```

## 设计原则

1. **极简** - 4个文件，5分钟上手
2. **Markdown优先** - 人类可读，AI可解析
3. **版本控制友好** - 代码和决策在同一个commit
4. **工具无关** - 不绑定任何特定AI工具

## 目录结构

```
product-context/
├── spec/           # 格式规范
├── templates/      # 项目模板
├── skill/          # Claude Code Skill
├── examples/       # 示例项目
└── integrations/   # 其他工具适配
```

## 谁适合用这个？

- **独立开发者** - 一个人做开发+产品+运营
- **小团队** - 需要让AI理解产品背景
- **开源项目** - 帮助贡献者理解项目愿景

## 贡献

欢迎提交 Issue 和 PR！

## 许可证

MIT
