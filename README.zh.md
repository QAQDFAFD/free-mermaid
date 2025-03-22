# Free Mermaid

![Mermaid绘图工具](./public/og-image.png)

一个免费、开源的Mermaid图表编辑器和渲染器，具有实时预览和导出功能。

## 📖 概述

Free Mermaid是一个强大的基于Web的工具，用于使用Mermaid语法创建和编辑图表。该应用程序提供了用户友好的界面，具有并排编辑和预览功能，让您在创建图表时可以轻松地进行可视化。

[English Documentation](./README.md) | [中文文档](./README.zh.md)

## ✨ 特性

- **实时预览**：随着您的输入即时查看变化
- **深色模式**：在浅色和深色主题之间切换，在任何环境下都能舒适编辑
- **交互式画布**：
  - 缩放控制（50%至300%）
  - 平移导航
  - 视图重置
- **多种图表类型**：支持所有Mermaid图表类型：
  - 流程图
  - 时序图
  - 类图
  - 实体关系图
  - 状态图
  - 甘特图
  - 饼图
  - 以及更多...
- **示例模板**：通过内置图表示例快速入门
- **响应式设计**：适用于桌面和平板设备
- **导出选项**：将您的图表下载为PNG或SVG格式
- **语法错误处理**：清晰的错误信息，并提供修复常见问题的建议

## 🚀 开始使用

### 在线使用

使用Free Mermaid最简单的方法是通过我们的在线编辑器：

[打开Free Mermaid在线版](https://free-mermaid.com)

### 本地开发

要在本地运行项目：

1. 克隆仓库：
```bash
git clone https://github.com/username/free-mermaid.git
cd free-mermaid
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 打开浏览器并导航至 `http://localhost:3000`

## 🔧 生产环境构建

```bash
npm run build
```

## 🛠️ 技术栈

- [Vue.js 3](https://vuejs.org/) - 渐进式JavaScript框架
- [Nuxt.js 3](https://nuxt.com/) - Vue框架，用于构建高性能Web应用
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Mermaid.js](https://mermaid-js.github.io/mermaid/#/) - 基于JavaScript的图表和图形工具
- [CodeMirror](https://codemirror.net/) - 用JavaScript实现的多功能文本编辑器
- [html-to-image](https://github.com/bubkoo/html-to-image) - 从DOM节点生成图像

## 📱 移动设备支持

该应用程序主要为桌面和平板设备设计。在移动设备上，会显示一个警告，建议使用更大的屏幕以获得最佳体验。

## 🤝 贡献

欢迎贡献！随时提交问题或拉取请求，帮助改进项目。

## 📄 许可证

本项目采用MIT许可证 - 详情请参阅LICENSE文件。

## 🙏 致谢

- 感谢[Mermaid.js](https://mermaid-js.github.io/mermaid/#/)提供的出色图表库
- 感谢本项目的所有贡献者和用户 