import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto-sidebar.mjs'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "世天道一",
  description: "均衡，存乎万物之间",
  themeConfig: {
    //设置搜索框
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    outlineTitle: '目录',
    // outline: ['2', '4'],
    // https://vitepress.dev/reference/default-theme-config
    logo: 'logo.jpg',
    nav: [
      { text: '主页', link: '/' },
      { text: '实力', items: [
        { text: '实力1', link: '/note/ceshi/' },
        { text: '实力2', link: '/note/ceshi2/' }
      ] },
    ],
    //侧边栏
    sidebar: {

      "/note/ceshi": set_sidebar("/note/ceshi"),
      "/note/ceshi2": set_sidebar("/note/ceshi2"),
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    //底部配置
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT Vue.js'
    }
    
  }
})
