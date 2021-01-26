---
date: 2019-9-8
tag:
  - Vue
  - VuePress
  - JavaScript
  - 筆記
---

# 透過插件 API 來深入了解 VuePress

## 插件 ???

`Pluggable`是 VuePress 1.x 的最重大改變。VP 提供給開發者許多 API 來打造他們的插件，VP 本身的許多功能也是依靠插件化實現的。此外，`.vuepress/config.js` 和 `theme/index.js` 其實也都被視為插件。

我有天閃過一個想法，如果我了解了所有插件 API 的執行順序以及他到底做了什麼，或許這是一個特殊的方法來了解 VP 運作的來龍去脈。
