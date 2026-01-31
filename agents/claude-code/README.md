# Claude Code Integration

Product Context 的 Claude Code 集成。

## 安装方式

### 方式1：Skill 命令（推荐）

安装 Skill 后使用：

```
/product init    # 初始化 .product/ 目录
/product sync    # 同步产品上下文到会话
/product update  # 更新产品文档
/product ask     # 基于产品上下文回答问题
```

### 方式2：CLAUDE.md 引用

将 `CLAUDE.md.template` 的内容添加到项目的 `CLAUDE.md` 文件中。

## 文件说明

| 文件 | 用途 |
|------|------|
| `SKILL.md` | Claude Code Skill 定义 |
| `CLAUDE.md.template` | CLAUDE.md 集成模板 |

## 使用流程

1. 在项目中运行 `/product init`
2. 填写产品信息
3. 之后每次会话开始运行 `/product sync`
4. 完成重要功能后运行 `/product update`
