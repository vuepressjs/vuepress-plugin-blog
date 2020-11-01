---
sidebar: auto
---

# 分页配置

::: tip
我们强烈建议你在使用此插件之前阅读 [快速上手](../guide/getting-started.md) 部分。
:::

## sorter

- 类型: `Function`
- 默认值:

```js
sorter: (prev, next) => {
  const dayjs = require('dayjs')
  const prevTime = dayjs(prev.frontmatter.date)
  const nextTime = dayjs(next.frontmatter.date)
  return prevTime - nextTime > 0 ? -1 : 1
}
```

匹配页面的排序器。

该函数将是 [Array.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 的一个参数。

::: warning
因为只有前两位用两位数字写的日期才会被转换，所以其他以一位数字写的日期（例如 `2020-1-1`）将被视为字符串。
`dayjs` 接受这两种不同的结果，而 `new Date` 在某些浏览器（例如 Safari）中无法正常工作。
:::

## prevText

- 类型: `string`
- 默认: `'Prev'`

先前链接的文本。

## nextText

- 类型: `string`
- 默认值: `'Next'`

下一个链接的文字。

## lengthPerPage

- 类型: `number`
- 默认值: `10`

每页的最大帖子数。

## layout

- 类型: `string`
- 默认值: `DirectoryPagination || Layout`

分页页面的布局（主页除外）。

## getPaginationPageUrl

- 类型: `Function`
- 默认值:

```js
function getPaginationPageUrl(index) {
  if (index === 0) {
    return indexPath
  }
  return `${indexPath}page/${index + 1}/`
}
```

动态获取分页页面网址的函数。

- 对于 [目录分类器](../guide/getting-started.md#目录分类器), `indexPath` 默认为 `/${classifier.id}/` (例如 `/post/`)
- 对于 [frontmatter 分类器](../guide/getting-started.md#frontmatter-分类器), `indexPath` 默认为 `/${classifier.pid}/${classifier.id}` (例如 `/tag/js/`)

## getPaginationPageTitle

- 类型: `Function`
- 默认值:

```js
// directories
function getPaginationPageTitle(pageNumber) {
  return `Page ${pageNumber} | ${entryTitle}`
}

// frontmatters
function getPaginationPageTitle(pageNumber, key) {
  return `Page ${pageNumber} - ${key} | ${entryTitle}`
}
```

动态获取分页页面标题的功能。

有两个参数可以帮助你自定义标题:

- `pageNumber`
- `key`: 配置 frontmatters 时的 [key](../config/#keys)
