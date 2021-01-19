---
sidebar: auto
---

# Config

::: tip TIP
We strongly recommend that you read the [Getting Started](../guide/getting-started.md) section before using this plugin.
:::

## directories

- Type: `DirectoryClassifier[]`
- Default: `[]`

Create one or more [directory classifiers](../guide/getting-started.md#directory-classifier), all available options in
`DirectoryClassifier` are as
follows.

### id

- Type: `string`
- Default: `undefined`
- Required: `true`

Unique id for current classifier, e.g. `post`.

### dirname

- Type: `string`
- Default: `undefined`
- Required: `true`

Matched directory name, e.g. `_post`.

### path

- Type: `string`
- Default: `/${id}/`
- Required: `false`

Entry page for current classifier, e.g. `/` or `/post/`.

If you set `DirectoryClassifier.path` to `/`, it means that you want to access the matched pages list at `/`. set
to `/post/` is the same.

### title

- Type: `string`
- Default: `id` 
- Required: `false`
 
Entry and pagination page titles for current classifier.

### layout

- Type: `string`
- Default: `'IndexPost' || 'Layout'`
- Required: `false`

Layout component name for entry page.

### frontmatter

- Type: `Record<string, any>`
- Default: `{}`
- Required: `false`

[Frontmatter](https://v1.vuepress.vuejs.org/guide/frontmatter.html) for entry page.

### itemLayout

- Type: `string`
- Default: `'Post'`
- Required: `false`

Layout for matched pages.

### itemPermalink

- Type: `string`
- Default: `'/:year/:month/:day/:slug'`
- Required: `false`

Permalink for matched pages.

For example, if you set up a directory classifier with dirname equals to `_post`, and have following pages:

```
.
└── _posts
    ├── 2018-4-4-intro-to-vuepress.md
    └── 2019-6-8-intro-to-vuepress-next.md
```

With the default `itemPermalink`, you'll get following output paths:

```
/2018/04/04/intro-to-vuepress/
/2019/06/08/intro-to-vuepress-next/
```

For more details about permalinks, please head to [Permalinks](https://v1.vuepress.vuejs.org/guide/permalinks.html) section at VuePress's documentation.

### pagination

- Type: `Pagination`
- Required: `false`

It can overwrite [globalPagination](./#globalpagination).

Please head to [Pagination Config](../pagination/README.md#config) section to get all available options.

## frontmatters

### id

- Type: `string`
- Default: `undefined`
- Required: `true`

Unique id for current classifier, e.g. `tag`.

### keys

- Type: `string`
- Default: `undefined`
- Required: `true`

Frontmatter keys used to classify pages.

You can also merge multiple tags with the same meaning, e.g.

```js
module.exports = {
  plugins: [
    ['@vuepress/plugin-blog', {
      frontmatters: [
        {
          id: "tag",
          keys: ['tag', 'tags'],
        },
      ]
    }],
  ],
}
```

### path

- Type: `string`
- Default: `/${id}/`
- Required: `false`

Entry page for current classifier, e.g. `/` or `/post/`.

### title

- Type: `string`
- Default: `id` 
- Required: `false`
 
Entry, scope and pagination  page titles for current classifier.

### layout

- Type: `string`
- Default: `'IndexPost' || 'Layout'`
- Required: `false`

Layout component name for entry page.

### scopeLayout

- Type: `string`
- Default: `undefined`
- Required: `false`

Layout component name for scope page.

### getScopePageTitle

- Type: function
- Default: `See Below`

A function to get the title of scope page dynamically:

```js
function getScopePageTitle (key) {
  return `${key} | Directory title`
}
```

### frontmatter

- Type: `Record<string, any>`
- Default: `{}`
- Required: `false`

[Frontmatter](https://v1.vuepress.vuejs.org/guide/frontmatter.html) for entry page.

### pagination

- Type: `Pagination`
- Required: `false`

It can overwrite [globalPagination](./#globalpagination).

Please head to [Pagination Config](../pagination/README.md#config) section to get all available options.

## globalPagination

Pagination config for all directories and frontmatters. 

- Type: `Pagination`
- Required: `false`

Please head to [Pagination Config](../pagination/README.md#config) section to get all available options.

## sitemap

- Type: `object`
- Default: `{}`
- Required: `false`

It will be enabled when `hostname` is provided. e.g.

```js
{
  hostname: 'https://yourdomain'
}
```
The 404 page is excluded by default. Further options, please head to [vuepress-plugin-sitemap](https://github.com/ekoeryanto/vuepress-plugin-sitemap#options).

## comment

### service 

Service to accomplish commenting. 

- Type: `'vssue' | 'disqus';`
- Default: `undefined`
- Required: `false`

### others
Other options depend on which service you pick since this feature is accomplished by the plugins below. All options except `service` will be passed directly to the plugin, so take a look at their documentation for more details:
- [vuepress-plugin-disqus](https://github.com/lorisleiva/vuepress-plugin-disqus)
- [vuepress-plugin-vssue](https://vssue.js.org/guide/vuepress.html#usage)

## newsletter

- Type: `object`
- Default: `{}`
- Required: `false`

It will be enabled when `endpoint` is provided. e.g.

```js
{
  endpoint: 'https://billyyyyy3320.us4.list-manage.com/subscribe/post?u=4905113ee00d8210c2004e038&amp;id=bd18d40138'
}
```
[vuepress-plugin-mailchimp](https://vuepress-plugin-mailchimp.billyyyyy3320.com/) is how we implement the feature. This config will be pass directly to it, so please head [vuepress-plugin-mailchimp](https://vuepress-plugin-mailchimp.billyyyyy3320.com/#config) for more details.  

## feed

- Type: `object`
- Default: `{}`
- Required: `false`

It will be enabled when `canonical_base` is provided. e.g.

```js
{
  canonical_base: 'https://yoursite'
}
```

All the generated files will be placed under your output directory. If you wish to make further configuration, please check out [vuepress-plugin-feed](https://github.com/webmasterish/vuepress-plugin-feed).
