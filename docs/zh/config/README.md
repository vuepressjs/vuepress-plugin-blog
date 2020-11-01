---
sidebar: auto
---

# 配置

::: tip
我们强烈建议你在使用此插件之前阅读 [快速入门](../guide/getting-started.md) 部分。
:::

## directories

- 类型: `DirectoryClassifier[]`
- 默认值: `[]`

创建一个或多个 [目录分类器](../guide/getting-started.md#目录分类器)，所有位于 `DirectoryClassifier` 可用选项如下。

### id

- 类型: `string`
- 默认值: `undefined`
- 必填: 是

当前分类器的唯一 ID，例如 `post`.

### dirname

- 类型: `string`
- 默认值: `undefined`
- 必填: 是

匹配的目录名称，例如 `_post`.

### path

- 类型: `string`
- 默认值: `` `/${id}/` ``
- 必填: 否

当前分类器的输入页面，例如 `/` 或者 `/post/`.

如果你将 `DirectoryClassifier.path` 设置为 `/`, 则意味着你要访问在 `/` 列出的处的匹配页面列表。设置到 `/post/` 也是一样的。

### title

- 类型: `string`
- 默认值: `id`
- 必填: 否

当前分类器的条目和分页页面标题。

### layout

- 类型: `string`
- 默认值: `'IndexPost' || 'Layout'`
- 必填: 否

入口页面的布局组件名称。

### frontmatter

- 类型: `Record<string, any>`
- 默认值: `{}`
- 必填: 否

整个页面的 [Frontmatter](https://v1.vuepress.vuejs.org/zh/guide/frontmatter.html)。

### itemLayout

- 类型: `string`
- 默认值: `'Post'`
- 必填: 否

匹配页面的布局。

### itemPermalink

- 类型: `string`
- 默认值: `'/:year/:month/:day/:slug'`
- 必填: 否

匹配页面的永久链接。

例如，如果你设置的目录分类器的目录名为 `_post` ，并且具有以下页面:

```
.
└── _posts
    ├── 2018-4-4-intro-to-vuepress.md
    └── 2019-6-8-intro-to-vuepress-next.md
```

保持默认的 `itemPermalink`, 你将获得以下输出路径:

```
/2018/04/04/intro-to-vuepress/
/2019/06/08/intro-to-vuepress-next/
```

有关 **永久链接** 的更多详细信息，请转到 VuePress 文档中的 [永久链接](https://v1.vuepress.vuejs.org/zh/guide/permalinks.html) 部分

### pagination

- 类型: `Pagination`
- 默认值: `{ lengthPerPage: 10 }`
- 必填: 否

请转到 [分页配置](../pagination/README.md) 部分以获取所有可用选项。

## frontmatters

### id

- 类型: `string`
- 默认值: `undefined`
- 必填: 是

当前分类器的唯一 ID，例如 `tag`。

### keys

- 类型: `string`
- 默认值: `undefined`
- 必填: 是

用于对页面进行分类的 Frontmatter 键值。

你还可以合并具有相同含义的多个标签，例如:

```js
module.exports = {
  plugins: [
    ['@vuepress/plugin-blog',{
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag', 'tags'],
          },
        ],
    }],
  ],
}
```

### path

- 类型: `string`
- 默认值: `` `/${id}/` ``
- 必填: 否

当前分类的入口页面，例如 `/` 或 `/post/`。

### title

- 类型: `string`
- 默认值: `id`
- 必填: 否

当前分类器的条目和分页页面标题。

### layout

- 类型: `string`
- 默认值: `'IndexPost' || 'Layout'`
- 必填: 否

入口页面的布局组件名称。

### frontmatter

- 类型: `Record<string, any>`
- 默认值: `{}`
- 必填: 否

整个页面的 [Frontmatter](https://v1.vuepress.vuejs.org/guide/frontmatter.html)。

### pagination

- 类型: `Pagination`
- 默认值: `{ lengthPerPage: 10 }`
- 必填: 否

它可以覆盖 [globalPagination](./#globalpagination).

请转到 [分页配置](../pagination/README.md#config) 章节以获取所有可用选项。

## globalPagination

所有目录和前题的分页配置。

- 类型: `Pagination`
- 默认值: `{}`
- 必填: 否

请转到 [分页配置](../pagination/README.md#config) 章节以获取所有可用选项。

## sitemap

- 类型: `object`
- 默认值: `{}`
- 必填: 否

当提供 `hostname` 时，它将被启用。 例如

```js
{
  hostname: 'https://yourdomain'
}
```

默认情况下不包括 404 页。 更多选项，请前往 [vuepress-plugin-sitemap](https://github.com/ekoeryanto/vuepress-plugin-sitemap#options)。

## 评论

### service

评论服务提供:

- 类型: `'vssue' | 'disqus'`
- 默认值: `undefined`
- 必填: 否

### 其他选项

其他选项取决于你选择的服务，因为此功能由以下插件完成。 除了 `service` 之外的所有选项都将直接传递给插件，因此请查看其文档以获取更多详细信息:

- [vuepress-plugin-disqus](https://github.com/lorisleiva/vuepress-plugin-disqus)
- [vuepress-plugin-vssue](https://vssue.js.org/guide/vuepress.html#usage)

## newsletter

- 类型: `object`
- 默认值: `{}`
- 必填: 否

当提供 `endpoint` 时，它将被启用。 例如:

```js
{
  endpoint: 'https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138'
}
```

[vuepress-plugin-mailchimp](https://vuepress-plugin-mailchimp.billyyyyy3320.com/) 是我们实现此功能的方式。 此配置将直接传递给它，因此请访问[vuepress-plugin-mailchimp](https://vuepress-plugin-mailchimp.billyyyyy3320.com/#config) 以获取更多详细信息。

## feed

- 类型: `object`
- 默认值: `{}`
- 必填: 否

当提供 `canonical_base` 时将启用它。 例如

```js
{
  canonical_base: 'https://yoursite'
}
```

所有生成的文件将放置在你的输出目录下。 如果你希望进行进一步的配置，请查看 [vuepress-plugin-feed](https://github.com/webmasterish/vuepress-plugin-feed)
