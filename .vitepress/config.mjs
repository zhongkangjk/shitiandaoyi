import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto-sidebar.mjs'
// https://vitepress.dev/reference/site-config

//自定义翻页按钮 回到上方按钮文字






export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  srcDir: '',
  // 设置目录
  // base: '/shitiandaoyi/',
  title: "世天道一",
  description: "懒派掌门CEO与大弟子",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
              closeText: "关闭",
            },
          },
        },
      },
    },
    outlineTitle: '目录',
    outline: ['2', '4'],
    // https://vitepress.dev/reference/default-theme-config
    logo: 'logo.png',
    nav: [
      // { text: '主页', link: '/' },
      { text: '杂谈', link: '/note/zatan/完美的预设' },
      { text: '小说', link: '/note/xiaoshuo/天下圣贤豪杰' },
      { text: '自行车', link: '/note/zixingche/调变速' },
      { text: '游戏', link: '/note/youxi/CS准星设置' },
      { text: '项目', link: '/note/project/古早python代码合集' },
      { text: '软件', link: '/note/ruanjian/装了win11的设置' }
      // { text: '实力', items: [
      //   { text: '实力1', link: '/note/ceshi/' },
      //   { text: '实力2', link: '/note/ceshi2/' }
      // ] },
    ],
    //侧边栏
    sidebar: {

      "/note/zatan/": set_sidebar("/note/zatan/"),
      "/note/xiaoshuo/": set_sidebar("/note/xiaoshuo/"),
      "/note/zixingche/": set_sidebar("/note/zixingche/"),
      "/note/youxi/": set_sidebar("/note/youxi/"),
      "/note/project/": set_sidebar("/note/project/"),
      "/note/ruanjian/": set_sidebar("/note/ruanjian/"),
    },


    socialLinks: [
      { icon: 'slack', link: 'https://bbs.05320532.xyz' }
    ],
    //底部配置
    footer: {
      // message: 'Released under the MIT License.',
      copyright: 'Copyright © 世天道一 2045'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '回到顶部',
    

  }
})
