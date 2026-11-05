# Designer Portfolio Website

A modern, minimalist portfolio website for showcasing design work, built with HTML5, CSS3, JavaScript, and GSAP animations.

## Features

- Clean, minimalist design with focus on the work
- Responsive layout that works on all devices
- Smooth animations and transitions using GSAP
- Filterable work gallery
- Detailed project pages
- About section with timeline for experience and education
- Contact form
- Mobile-friendly navigation

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- JavaScript
- GSAP (GreenSock Animation Platform)
- Font Awesome icons

## Project Structure

```
/
├── index.html, education.html, interests.html, ...   # 网站页面（根目录）
├── About me/, highlights/, works/                     # 分类子页面
├── css/style.css                                      # 样式
├── js/data.js, js/main.js                             # 脚本
├── images/                                            # 网站正式引用的图片资源（勿直接乱放新文件）
│   ├── collage/                                       # 首页拼贴装饰图（css 引用）
│   └── _originals/                                    # 已上线图片的原始备份
├── content-entry/                                     # 内容更新唯一入口，见下方说明
│   ├── docs/                                          # md 文档入口
│   └── images/                                        # 图片素材入口
├── resources/                                          # 非内容类文件（pptx 等其他资源）
└── .trae-html-share-packages/                          # 工具自动生成的分享包，无需手动维护
```

## 目录结构与内容维护指南

为保证仓库长期整洁、可维护，所有**新增/修改的 md 文档和图片**统一通过 `content-entry/` 下的专属入口提交，不再直接散落在根目录：

| 入口目录 | 功能 | 使用说明 |
| --- | --- | --- |
| [`content-entry/docs/`](content-entry/docs/README.md) | md 文档更新入口 | 按文档性质分类存放（`site-content/` 网站文案、`guides/` 操作指南），命名规则与提交流程见目录内 README |
| [`content-entry/images/`](content-entry/images/README.md) | 图片资源更新入口 | 按图片类型/用途分类存放（`profile/`、`qrcode/`、`ui-screenshots/`、`decorative/`、`social/`），格式、尺寸、命名规则见目录内 README |
| `resources/` | 其他非内容类资源（如 pptx 等文件），不属于网站正式资源，仅作归档保存 |

**维护要求：**

- 根目录的 `images/`、`css/`、`js/` 及各 `.html` 页面是**网站正在运行的实际资源**，不要把新素材直接放进去；新素材一律先进 `content-entry/` 对应入口，经确认后再由维护者手动挑选、优化并接入网站对应页面
- `.trae-html-share-packages/` 为工具自动生成的分享包缓存目录，无需手动整理
- 新增文档/图片分类时，同步更新 `content-entry/docs/README.md` 或 `content-entry/images/README.md` 中的分类表格

## How to Use

1. Clone or download the repository
2. Open `index.html` in a web browser
3. To view project details, click on any work item in the gallery

## Customization

- Replace the images in `assets/images/` with your own work
- Update the text content in `index.html` and the work detail pages
- Modify the color scheme in the Tailwind CSS configuration
- Adjust animations in the JavaScript files

## License

This project is licensed under the MIT License.