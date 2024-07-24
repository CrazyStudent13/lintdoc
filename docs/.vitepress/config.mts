import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "代码规范书",
  description: "整理开发规范，提升开发效率",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '规范整理',
        items: [
          { text: '代码规范', link: '/codeLint' },
          { text: 'API约定规范', link: '/apiLint' }
        ]
      },
      {
        text: '工具整理',
        items: [
          { text: 'vscode插件', link: '/vscode插件' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CrazyStudent13/lintdoc' }
    ]
  }
})
