import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "代码规范书",
  description: "整理开发规范，提升开发效率",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "关于", link: "/other/technicalSupport" },
    ],

    sidebar: [
      {
        text: "规范整理",
        items: [
          { text: "设计规范", link: "/devLint/designLint" },
          { text: "代码规范", link: "/devLint/codeLint" },
          { text: "接口规范", link: "/devLint/apiLint" },
        ],
      },
      {
        text: "工具整理",
        items: [
          { text: "vscode插件", link: "/toolsLint/vscode插件" },
          { text: "资源整合", link: "/toolsLint/资源整合" },
        ],
      },
      {
        text: "测试整理",
        items: [{ text: "个人支付", link: "/testLint/个人支付" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/CrazyStudent13/lintdoc" },
    ],
  },
});
