# Vibling 当前状态

**更新时间**: 2025-01-31

## 上次会话
完成了音频上传和波形显示功能，包括：
- 文件选择和拖拽上传
- 音频文件格式验证
- 使用Web Audio API解码音频
- Canvas绘制波形图

## 当前任务
开始实现模板系统的基础架构。

## 下一步
1. 设计模板数据结构（JSON Schema）
2. 实现模板渲染引擎（Canvas）
3. 创建第一个测试模板（简单波形）
4. 添加模板选择UI

## 重要决策

### 技术决策
- **模板格式**: JSON而非YAML
  - 原因：前端原生解析，无需额外库
- **渲染引擎**: Canvas 2D
  - 原因：WebGL太复杂，Canvas足够MVP
  - 如果性能不足，Phase 2再考虑WebGL
- **视频导出**: MediaRecorder API
  - 原因：浏览器原生支持，无需服务端

### 产品决策
- **MVP只支持MP3**
  - 原因：覆盖90%用例，简化实现
- **不做用户账号**
  - 原因：MVP阶段不需要，减少复杂度

## 注意事项
- 视频导出功能先不做，专注模板系统
- 音频分析暂时用简单的振幅，不做频谱分析
- 模板数量MVP目标是3个，不要贪多

## 技术债务
- `audioProcessor.ts` 中的振幅计算比较粗糙，后续需要优化
- 目前没有错误边界处理，用户上传错误文件会crash
- 无单元测试

## 参考链接
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- Canvas 动画: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
