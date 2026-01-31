# Product Context Specification

本目录包含 Product Context 的格式规范。

## 版本

- **v1** - 当前稳定版本

## 设计原则

1. **人类优先** - 文件首先是给人读的，AI只是顺带
2. **最小化** - 只定义必要的结构，其余自由发挥
3. **向后兼容** - 新版本不会破坏旧文件

## 核心文件

| 文件 | 必需性 | 说明 |
|------|--------|------|
| VISION.md | 必需 | 产品灵魂，最重要的文件（原 PRD.md） |
| ROADMAP.md | 推荐 | 战略方向 |
| BRAND.md | 可选 | 品牌调性 |
| MEMO.md | 推荐 | 短期记忆，AI工作区 |

## 扩展

你可以在 `.product/` 中添加其他文件：

- `COMPETITORS.md` - 竞品分析
- `METRICS.md` - 关键指标
- `CHANGELOG.md` - 产品变更日志
- `DECISIONS.md` - 重要决策记录

但核心4个文件应该足够大多数项目使用。
