import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto-sidebar.mjs'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  // 设置目录
  // base: '/shitiandaoyi/',
  title: "世天道一",
  description: "懒派掌门CEO与大弟子",
  themeConfig: {
    //设置搜索框
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
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
    logo: 'logo.png',
    nav: [
      // { text: '主页', link: '/' },
      { text: '知识', link: '/note/zhishi/' },
      { text: '想法', link: '/note/xiangfa/' },
      { text: '小说', link: '/note/xiaoshuo/' },

      // { text: '实力', items: [
      //   { text: '实力1', link: '/note/ceshi/' },
      //   { text: '实力2', link: '/note/ceshi2/' }
      // ] },
    ],
    //侧边栏
    sidebar: {

      "/note/zhishi/": set_sidebar("/note/zhishi/"),
      "/note/xiangfa/": set_sidebar("/note/xiangfa/"),
      "/note/xiaoshuo/": set_sidebar("/note/xiaoshuo/"),
    },


    socialLinks: [
      { icon: 'slack', link: 'https://bbs.05320532.xyz' }
    ],
    //底部配置
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 懒派大弟子 20'
    }
    
  }
})
