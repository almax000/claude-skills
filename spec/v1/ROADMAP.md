# ROADMAP.md 格式规范

**版本**: v1
**状态**: 稳定
**类型**: 核心文件

## 概述

ROADMAP.md 是产品的时间轴和 Decision Log，回答"现在在哪？下一步做什么？"

它同时作为其他文件的索引，指向相关决策文档。Decision Log 记录重要的产品/商业决策及其原因。

## 必需字段

```markdown
# 产品路线图

## 当前阶段
<!-- 现在处于哪个 Phase -->

## Phases
<!-- 各阶段规划 -->
```

## 推荐结构

```markdown
# 产品路线图

## 当前阶段
Phase 1 - Cold Start

## Phases

### Phase 0: Validation ✅
- [x] MVP feature set → see SCOPE.md
- [x] Target user validation → see USERS.md

### Phase 1: Cold Start (NOW)
- [ ] Product Hunt launch → see MARKETING.md
- [ ] 100 active users

### Phase 2: Monetization
- [ ] Pricing model → see BUSINESS.md
- [ ] First paying customer

### Phase 3: Scale
- [ ] Infrastructure upgrade → see OPS.md

## Decision Log
<!-- 决策日志：记录重要决策和原因 -->
- 2025-01-31: 决定先做 A 不做 B，因为...
```

## 示例

```markdown
# Vibling 路线图

## 当前阶段
Phase 1 - MVP 验证

## Phases

### Phase 0: Validation ✅
- [x] 确定目标用户 → see USERS.md
- [x] 定义核心功能 → see SCOPE.md
- [x] 选择技术栈

### Phase 1: MVP (NOW)
**目标**: 用户能上传音乐，选择模板，导出视频

- [x] 音频上传
- [x] 波形可视化
- [ ] 模板系统
- [ ] 视频导出

### Phase 2: Beta
**目标**: 收集用户反馈 → see MARKETING.md

- [ ] 更多模板
- [ ] 自定义颜色/字体
- [ ] 用户账号系统

### Phase 3: Monetization
**目标**: 验证付费意愿 → see BUSINESS.md

- [ ] 免费/付费模板分层
- [ ] 订阅制
- [ ] 水印移除

### Phase 4: Scale
**目标**: 规模化运营 → see OPS.md

- [ ] 升级基础设施
- [ ] 自动化运营

### 未来考虑
- AI 生成模板
- 移动端支持
- 协作功能

## Decision Log
- 2025-01-15: 选择 Canvas 而非 WebGL，降低复杂度
- 2025-01-20: 决定 MVP 只支持 MP3，WAV 延后
- 2025-01-31: 视频导出用 FFmpeg.wasm，避免服务端成本
```

## AI 使用指南

当 AI 读取 ROADMAP.md 时，应该：

1. **聚焦当前阶段** - 优先完成当前 Phase 的任务
2. **延迟复杂度** - 如果功能在后续 Phase，建议简化当前实现
3. **区分状态** - 不要重复实现已完成的功能
4. **提醒偏离** - 如果请求的功能不在任何 Phase，应该询问
5. **记录决策** - 重要技术/产品决策应记录到 Decision Log

## 与其他文件的关系

ROADMAP 作为索引，通过 `→ see XXX.md` 指向具体决策：

| 引用 | 指向 |
|------|------|
| → see USERS.md | 用户相关决策 |
| → see SCOPE.md | 功能范围决策 |
| → see MARKETING.md | 获客渠道决策 |
| → see BUSINESS.md | 商业模式决策 |
| → see OPS.md | 运营基础设施决策 |
