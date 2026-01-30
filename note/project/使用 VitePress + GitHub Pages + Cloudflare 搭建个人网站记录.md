
本站地址：https://05320532.xyz/  
项目仓库：https://github.com/zhongkangjk/shitiandaoyi

这篇文章记录了我使用 VitePress 构建静态站点，并通过 GitHub Pages 部署，最终绑定自定义域名，并在 Cloudflare（CF）中配置 DNS 的完整过程。

---

## 一、技术选型说明

### 为什么选择 VitePress

- 基于 Vite，构建速度快
- 原生支持 Markdown
- 适合文档型、技术记录型网站
- 与 GitHub Pages 配合简单

---

## 二、项目结构

仓库地址：https://github.com/zhongkangjk/shitiandaoyi

主要结构如下：

.
├─ docs/
│  ├─ .vitepress/
│  ├─ index.md
│  └─ ...
├─ package.json
└─ README.md

---

## 三、GitHub Pages 部署

部署参考官方文档：
https://vitepress.dev/zh/guide/deploy#github-pages

使用 GitHub Actions 实现自动构建与部署。

---

## 四、自定义域名与 Cloudflare

在 GitHub Pages 中绑定域名 05320532.xyz，
并在 Cloudflare 中配置对应 DNS 记录。

---

## 五、总结

VitePress + GitHub Pages + Cloudflare 是一套低成本、可维护、自动化程度高的个人站点方案。
