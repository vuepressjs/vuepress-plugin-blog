---
home: true
heroImage:
actionText: 快速上手 →
actionLink: /zh/guide/
features:
  - title: 分类
    details: 强大的分类系统可让你快速对帖子进行分类。
  - title: 分页
    details: 分页贯穿整个插件，它从未如此简单。
  - title: 客户端 API
    details: 简单的客户端 API 使你可以更轻松地编写博客主题。

footer: MIT Licensed | Copyright © 2019-present ULIVZ
---

## 安装

```bash
yarn add -D @vuepress/plugin-blog
# OR npm install -D @vuepress/plugin-blog
```

## 使用

```javascript
// .vuepress/config.js
module.exports = {
  plugins: [
    '@vuepress/blog',
    {
      /* options */
    },
  ],
}
```

[这里](./config/README.md) 可以找到所有可用的选项.
