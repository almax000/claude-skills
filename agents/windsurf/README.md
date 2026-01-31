# Windsurf Integration

Product Context 的 Windsurf 集成。

## 安装方式

1. 创建 `.windsurf/rules/` 目录（如果不存在）
2. 将 `rules.md.template` 复制为 `.windsurf/rules/product-context.md`

```bash
mkdir -p .windsurf/rules
cp rules.md.template .windsurf/rules/product-context.md
```

## 文件说明

| 文件 | 用途 |
|------|------|
| `rules.md.template` | Windsurf 规则模板 |

## 使用效果

Windsurf 将会：
- 在实现功能前验证与 `VISION.md` 的一致性
- 在写 UI 文字时遵循 `BRAND.md` 风格
- 根据 `ROADMAP.md` 当前阶段确定优先级
- 每次会话开始读取 `MEMO.md`
