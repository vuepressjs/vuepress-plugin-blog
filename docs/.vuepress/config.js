module.exports = {
  title: '@vuepress/plugin-blog',
  description: 'Offical blog plugin for VuePress',
  locales: {
    '/': {
      lang: 'en-US',
    },
    '/zh/': {
      lang: 'zh-CN',
      description: 'Vuepress 官方博客插件',
    },
  },
  themeConfig: {
    repo: 'vuepressjs/vuepress-plugin-blog',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Config', link: '/config/' },
      { text: 'Pagination', link: '/pagination/' },
      { text: 'Client API', link: '/client-api/' },
      { text: 'Components', link: '/components/' },
      { text: 'FAQ', link: '/faq/' },
    ],
    sidebarDepth: 3,
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,

          children: ['', 'getting-started'],
        },
      ],
    },
    locales: {
      '/': {
        label: 'English',
      },
      '/zh/': {
        nav: [
          { text: '指南', link: '/zh/guide/' },
          { text: '配置', link: '/zh/config/' },
          { text: '分页', link: '/zh/pagination/' },
          { text: '客户端 API', link: '/zh/client-api/' },
          { text: '组件', link: '/zh/components/' },
          { text: 'FAQ', link: '/zh/faq/' },
        ],
        sidebar: {
          '/zh/guide/': [
            {
              title: '指南',
              collapsable: false,

              children: ['', 'getting-started'],
            },
          ],
        },
        selectText: '选择语言',
        label: '简体中文',
      },
    },
    smoothScroll: true,
  },
}
