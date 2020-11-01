# 快速入门

::: tip
本部分是包含一些概念的分步教程，并且我们建议你在使用前这个插件前完整阅读它。
:::

## 文档分类器 (`Document classifier`)

`Document classifier` 是一组功能，可以对具有相同特征的页面进行分类。对于博客开发人员，不同页面之间可能存在相同的特征，如下所示：

- 放在目录中的页面 (例如 `_post`)
- 包含相同的特定 frontmatter 值的页面 (例如 `tag: js`).

当然，它们都可能与另一个通用要求 “分页”(`pagination`) 有关。

那么，如何巧妙地将它们组合在一起？接下来，让我们看一下该插件如何解决这些问题。

## 目录分类器

目录分类器，会对用于对放置在同一目录中的源页面进行分类。

假设你具有以下文件结构：

```
.
└── _posts
    ├── 2018-4-4-intro-to-vuepress.md
    └── 2019-6-8-intro-to-vuepress-next.md
```

在传统的 VuePress 网站中，转换后的页面 URL 为：

- `_posts/2018-4-4-intro-to-vuepress.html`
- `_posts/2019-6-8-intro-to-vuepress-next.html`

似乎没有按照博客组织，因此是时候使用此插件了：

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        directories: [
          {
            // 当前分类的唯一 ID
            id: 'post',
            // 目标文件夹
            dirname: '_posts',
            // `entry page` (或者 `list page`) 的路径
            path: '/',
          },
        ],
      },
    ],
  ],
}
```

然后，该插件将帮助你生成以下页面，并自动利用相应的页面布局：

| 页面地址                              | 布局                                                 |
| ------------------------------------- | ---------------------------------------------------- |
| `/`                                   | `IndexPost` (回退到 `Layout` 如果不存在 `IndexPost`) |
| `/2018/04/04/intro-to-vuepress/`      | `Post`                                               |
| `/2019/06/08/intro-to-vuepress-next/` | `Post`                                               |

这意味着你需要创建两个布局组件 (`IndexPost` and `Post`) 来处理 `index` 和 `post` 页面的布局。

你还可以自定义布局组件：

```diff
// .vuepress/config.js
module.exports = {
  plugins: [
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
+         layout: 'MyIndexPost',
+         itemLayout: 'MyPost',
        },
      ],
    }]
  ]
}
```

并自定义入口页面的路径和帖子的永久链接：

```diff
// .vuepress/config.js
module.exports = {
  plugins: [
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
-         path: '/',
+         path: '/post/',
+         itemPermalink: '/post/:year/:month/:day/:slug',
        },
      ],
    }]
  ]
}
```

::: warning
值得注意的是，`path` 和 `itemPermalink` 必须统一修改，并且 `itemPermalink` 必须带有前缀 `path`。

`itemPermalink` 的默认值为 `'/:year/:month/:day/:slug'`。
:::

**也可以详见**:

- [配置 > 目录](../config/README.md#directories)

## 分页

随着你的博客文章越来越多，你开始需要分页。默认情况下，此插件集成了一个非常强大的分页系统，使你可以通过简单的配置访问分页功能。

默认情况下，插件假定每页的最大页面数为 `10` 。你也可以像这样修改它：

```diff
// .vuepress/config.js
module.exports = {
  plugins: [
    ['@vuepress/blog', {
      directories: [
        {
          id: 'post',
          dirname: '_posts',
          path: '/',
+         pagination: {
+           lengthPerPage: 2,
+         },
        },
      ],
    }]
  ]
}
```

假设你在 `_posts` 目录中有 3 个页面：

- `_posts/2018-6-8-a.md`
- `_posts/2019-6-8-b.md`
- `_posts/2019-6-8-c.md`

当 `lengthPerPage` 选项被设置为 `2`，此插件将帮助你生成以下页面：

| url              | layout                                                    |
| ---------------- | --------------------------------------------------------- |
| `/`              | `IndexPost` (fallback to `Layout` if not exist)           |
| `/page/2/` (New) | `DirectoryPagination` (fallback to `Layout` if not exist) |
| `/2019/06/08/a/` | `Post`                                                    |
| `/2019/06/08/b/` | `Post`                                                    |
| `/2018/06/08/c/` | `Post`                                                    |

那么如何在布局组件中获取匹配的页面呢？实际上，它将比你想象的简单得多。

如果你访问 `/`，则当前页面会使用布局 `IndexPost`。在此布局组件中，你只需要使用 `this.$pagination.pages` 即可获取匹配的页面。在上面的示例中，`this.$pagination.pages` 的实际值将为：

```json
[
  { "relativePath": "_posts/2019-6-8-a.md", "path": "/2019/06/08/a/" ... },
  { "relativePath": "_posts/2019-6-8-b.md", "path": "/2019/06/08/b/" ... },
]
```

如果你访问`/`，则当前页面会使用布局 `DirectoryPagination` ，你也可以使用 `this。$pagination.pages` 来访问它：

```json
[
  { "relativePath": "_posts/2019-6-8-c.md", "path": "/2019/06/08/c/" ... },
]
```

这难道不是很自然的体验吗？你只需要关心布局组件的样式，而不是它背后复杂而乏味的逻辑。

::: tip
为了节省文档的长度，我们省略了 `$page` 对象的数据结构。你可以在 [官方文档](https://v1.vuepress.vuejs.org/zh/guide/global-computed.html#page) 获得有关 `$page` 数据结构的更多信息。
:::

**也可详见**:

- [分页配置](../pagination/README.md)

## Frontmatter 分类器

Frontmatter 分类器，用于对具有相同 frontmatter 键值的页面进行分类。

假设你有三个页面：

- `a.md`:

```md
---
tag: vue
---
```

- `b.md`:

```md
---
tag: vue
---
```

- `c.md`:

```md
---
tag: js
---
```

如果你想轻松地对它们进行分类，则可以这样配置：

```js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        frontmatters: [
          {
            // 当前分类的唯一ID
            id: 'tag',
            // 决定将 frontmatter 键值归到该类别下
            keys: ['tag'],
            // `entry page` (或者 `list page`) 的路径
            path: '/tag/',
            // `entry page` 的布局
            layout: 'Tag',
          },
        ],
      },
    ],
  ],
}
```

然后，该插件将帮助你生成以下额外页面，并自动利用相应的布局：

| 地址        | 布局                                                        |
| ----------- | ----------------------------------------------------------- |
| `/tag/`     | `Tag` (fallback to `FrontmatterKey` if not exist)           |
| `/tag/vue/` | `FrontmatterPagination` (fallback to `Layout` if not exist) |
| `/tag/js/`  | `FrontmatterPagination` (fallback to `Layout` if not exist) |

在 `<Tag />` 组件中，你可以使用 [this.\$frontmatterKey.list](../client-api/README.md#frontmatterkey) 来获取标签列表。值将会像这样：

```json
[
  {
    "name": "vue",
    "path": "/tag/vue/",
    "pages": [
      { "relativePath": "b.md", "path": "/b.html" ... },
      { "relativePath": "a.md", "path": "/a.html" ... },
    ]
  },
  {
    "name": "js",
    "path": "/tag/js/",
    "pages": [
      { "relativePath": "c.md", "path": "/c.html" ... },
    ]
  }
]
```

在 `FrontmatterPagination` 组件中，你可以使用 [this.\$pagination.pages](../client-api/README.md#pagination) 获取当前标签中匹配的页面分类：

- 如果你访问了 `/tag/vue/`，`this.$pagination.pages` 将是：

```json
[
  { "relativePath": "b.md", "path": "/b.html" ... },
  { "relativePath": "a.md", "path": "/a.html" ... },
]
```

- 如果你访问了 `/tag/js/`，`this.$pagination.pages` 将是：

```json
[
  { "relativePath": "c.md", "path": "/c.html" ... },
]
```

**也可详见**:

- [配置 > frontmatters](../config/README.md#frontmatters)

## Sitemap

我无法找到你不想要 Sitemap 的原因。 Sitemap 是一个 XML 文件，可帮助搜索引擎更好地索引你的博客。

通过简单地传递你的主机名即可生成文件，如下所示。

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        sitemap: {
          hostname: 'https://yourdomain',
        },
      },
    ],
  ],
}
```

## 评论

评论是使你的博客更加生动活泼的好方法。 我们在此插件中集成了客户端评论服务：[Vssue](https://vssue.js.org/) 和 [Disqus](https://disqus.com/)。 前者是一个基于 vue 的基于问题的开源项目，可以为你的静态页面启用评论，而后者是一个网络平台，可提供成千上万个网站使用的评论服务。

我们为你提供了一个现成的组件 `<Comment>`。 你可以从 `'@vuepress/plugin-blog/lib/client/components'` 中导入它。 当你创建布局组件 `Post` 来处理帖子页面的所有布局时，这可能会很有用：

```vue
// layouts/Post.vue
<template>
  <div>
    <Content />
    <Comment />
  </div>
</template>

<script>
import { Comment } from '@vuepress/plugin-blog/lib/client/components'

export default {
  components: {
    Comment,
  },
}
</script>
```

你必须告诉插件你将要使用哪个服务。

由于注释是由其他插件实现的，因此请确保你已阅读[vuepress-plugin-vssue](https://vssue.js.org/) 或[vuepress-plugin-disqus](https://github.com/lorisleiva/vuepress-plugin-disqus) ，然后再使用它们：

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        comment: {
          // 你想使用的服务
          service: 'vssue',
          // 存储 issue 和评论的库的所有者名称。
          owner: 'You',
          // 用于存储 issue 和评论的存储库的名称。
          repo: 'Your repo',
          // 从 OAuth2 规范中引入的 clientId 和 clientSecret。
          clientId: 'Your clientId',
          clientSecret: 'Your clientSecret',
        },
      },
    ],
  ],
}
```

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        comment: {
          // 你想使用的服务
          service: 'disqus',
          // 用于存储 issue 和评论的存储库的所有者名称。
          shortname: 'vuepress-plugin-blog',
        },
      },
    ],
  ],
}
```

::: tip
当然，你可以使用任何喜欢的服务，也可以使用自己的评论系统。 你可以根据需要简单地忽略此配置，这样就不会启用此内置注释功能。
:::

## 订阅 (Newsletter)

一个博客订阅 Newsletter 是一封电子邮件，用于通知订阅者你已经发布了新的博客文章。电子邮件是建立关系并与读者互动的好方法。

就像 [评论](#评论) 一样，我们集成了一项服务来帮助你轻松完成它。 [MailChimp](https://mailchimp.com/) 可能是最著名的电子邮件营销工具。唯一需要的配置选项是 `endpoint`，请转到[vuepress-plugin-mailchimp](https://vuepress-plugin-mailchimp.billyyyyy3320.com/#install) 以了解如何获取自己的 `endpoint`。

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        newsletter: {
          // 放置你的 endpoint，而不是我的
          endpoint:
            'https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138',
        },
      },
    ],
  ],
}
```

`vuepress-plugin-mailchimp` 已经注册了一个全局组件 `SimpleNewsletter`。 这是一个简单的用法：

```vue
// layouts/Post.vue
<template>
  <div>
    <Content />
    <SimpleNewsletter />
  </div>
</template>
```

在你的主题中，你可能会为用户提供是否启用的选项。 你可以使用 `this.$service.email.enabled` 来访问它：

```vue
// layouts/Post.vue
<template>
  <div>
    <Content />
    <SimpleNewsletter v-if="$service.email.enabled" />
  </div>
</template>
```

如果你不喜欢默认的 UI，请转到 [自定义 UI](https://vuepress-plugin-mailchimp.billyyyyy3320.com/#ui-customization)。

## 提要 (Feed)

Feed 是允许你的用户获取最新内容的另一种方法。 RSS，Atom 甚至 JSON 提要都是完成这项工作的正确工具。让我们来看一个例子：

```JavaScript
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      '@vuepress/blog',
      {
        feed: {
         canonical_base: 'http://yoursite',
        },
      },
    ],
  ],
}
```

构建后，你将可以在输出目录(`dist`)中找到它们 (`rss.xml`, `feed.atom`, `feed.json`)。

## 案例

此项目下有一些 [案例](https://github.com/vuepressjs/vuepress-plugin-blog/tree/master/examples) 帮助我们测试此插件。 在阅读了以上所有概念之后，它们对于你来说也是最简单的示例。

克隆[此仓库](https://github.com/vuepressjs/vuepress-plugin-blog) 并启动案例查看输出:

```shell
yarn dev:example # 启动 example 开发服务器
yarn build:example # 构建 example 输出
```

::: tip
值得一提的是 [`zh` 文件夹](https://github.com/vuepressjs/vuepress-plugin-blog/tree/master/examples/zh) 是使用你的母语构建博客的示例。以繁体中文为例。
:::

## 撰写博客主题

如果一切正常，你就可以开始编写博客主题。实际上，创建博客主题只有 2 个必要的布局组件：

- Layout
- Post
- FrontmatterKey (仅在设置 frontmatter 分类时才需要)

这是为你提供的两个官方示例 (简单 和 复杂 ) ：

- [70 行的 vuepress 博客主题](https://github.com/ulivz/70-lines-of-vuepress-blog-theme): 一个大约 70 行中实现的 VuePress 博客主题。
- [@vuepress/theme-blog](https://github.com/ulivz/vuepress-theme-blog): VuePress 的默认博客主题。
