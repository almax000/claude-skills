# GitHub Copilot Integration

Product Context 的 GitHub Copilot 集成。

## 安装方式

1. 创建 `.github/` 目录（如果不存在）
2. 将 `copilot-instructions.md.template` 复制为 `.github/copilot-instructions.md`

```bash
mkdir -p .github
cp copilot-instructions.md.template .github/copilot-instructions.md
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `copilot-instructions.md.template` | Copilot 指令模板 |

## 使用效果

GitHub Copilot 将会：
- 理解产品上下文并在建议代码时考虑产品定位
- 在写用户面向内容时参考品牌调性
- 根据路线图理解当前优先级
