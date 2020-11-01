---
sidebar: auto
---

# 组件

为了更好地享受此插件的便利，该插件提供了一些现成的组件。

## `<SimplePagination>`

- 源代码: [SimplePagination.vue](https://github.com/ulivz/vuepress-plugin-blog/blob/master/src/client/components/SimplePagination.vue)
- 使用:

```vue
<template>
  <SimplePagination />
</template>

<script>
import { SimplePagination } from '@vuepress/plugin-blog/lib/client/components'
export default {
  components: {
    SimplePagination,
  },
}
</script>
```

- 输出:

<img src="/simple-pagination.png" style="width: 250px;"/>

::: tip
你可以在 [palette.styl](https://v1.vuepress.vuejs.org/config/#palette-styl) 使用 `$accentColor` 来调整该组件的默认颜色。
:::

## `<Pagination>`

- 源代码: [Pagination.vue](https://github.com/ulivz/vuepress-plugin-blog/blob/master/src/client/components/Pagination.vue)
- 使用:

```vue
<template>
  <Pagination />
</template>

<script>
import { Pagination } from '@vuepress/plugin-blog/lib/client/components'
export default {
  components: {
    Pagination,
  },
}
</script>
```

- 输出：

<img src="/pagination.png" style="width: 250px;"/>

::: tip
你可以在 [palette.styl](https://v1.vuepress.vuejs.org/config/#palette-styl) 使用 `$accentColor` 来调整该组件的默认颜色。
:::

## `<Comment>`

该组件将自动渲染你选择的评论服务内容。如果未启用评论，则不会渲染任何内容。

- 源代码：[Comment.vue](ttps://github.com/ulivz/vuepress-plugin-blog/blob/master/src/client/components/Comment.vue)

- 用法：

```vue
<template>
  <Comment />
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

- 输出：

  - Disqus: <img src="/Disqus.png" />

  - Vssue: <img src="/Vssue.png" />

## `<SimpleNewsletter>`

由 [vuepress-plugin-mailchimp](https://github.com/newsbielt703/vuepress-plugin-mailchimp) 实现

- 源代码: [SimpleNewsletter.vue](https://github.com/newsbielt703/vuepress-plugin-mailchimp/blob/master/src/components/SimpleNewsletter.vue)

- 用法：

```vue
<template>
  <SimpleNewsletter />
</template>
```

- 输出:

<img src="/Newsletter.png" width="500"/>
