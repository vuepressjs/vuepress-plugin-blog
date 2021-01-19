import { path } from '@vuepress/shared-utils';
import { handleOptions } from './handleOptions';
import { registerPaginations } from './pagination';
import { BlogPluginOptions } from './interface/Options';
import { logPages, logTable, logObject, resolvePaginationConfig } from './util';
import { ClassifierTypeEnum, DefaultLayoutEnum } from './interface/Classifier';
import { VuePressContext, VuePressPage } from './interface/VuePress';

function injectExtraAPI(ctx: VuePressContext) {
  const { layoutComponentMap } = ctx.themeAPI;

  /**
   * A function used to check whether layout exists
   */
  const isLayoutExists = name => layoutComponentMap[name] !== undefined;

  /**
   * Get layout
   */
  ctx.getLayout = (name?: string, fallback?: string) => {
    return isLayoutExists(name) ? name : fallback || 'Layout';
  };
}

module.exports = (options: BlogPluginOptions, ctx: VuePressContext) => {
  injectExtraAPI(ctx);

  const {
    pageEnhancers,
    frontmatterClassificationPages,
    extraPages,
    paginations,
    plugins,
    services,
  } = handleOptions(options, ctx);

  return {
    name: 'vuepress-plugin-blog',

    /**
     * 1. Execute `pageEnhancers` generated in handleOptions
     */
    extendPageData(pageCtx: VuePressPage) {
      pageEnhancers.forEach(({ filter, data = {}, frontmatter = {} }) => {
        const { frontmatter: rawFrontmatter } = pageCtx;

        if (filter(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            /**
             * Respect the original frontmatter in markdown
             */
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key];
            }
          });
          Object.assign(pageCtx, data);
        }
      });
    },

    /**
     * 2. Create pages according to user's config.
     */
    async ready() {
      const { pages } = ctx;

      /**
       * 2.1. Handle frontmatter per page.
       */
      for (const { key: pageKey, frontmatter } of pages) {
        if (!frontmatter || Object.keys(frontmatter).length === 0) {
          continue;
        }

        for (const { keys, _handler } of frontmatterClassificationPages) {
          for (const key of keys) {
            const fieldValue = frontmatter[key];
            Array.isArray(fieldValue)
              ? fieldValue.forEach(v => _handler(v, pageKey))
              : _handler(fieldValue, pageKey);
          }
        }
      }

      for (const { map } of frontmatterClassificationPages) {
        logTable('frontmatterClassificationPages.map', map);
      }

      /**
       * 2.2 Store frontmatterClassificationPages in current context.
       */
      ctx.frontmatterClassificationPages = frontmatterClassificationPages;

      /**
       * 2.3. Combine all pages.
       *
       *    - Index page for all classifiers.
       *    - Pagination pages.
       */
      const allExtraPages = [
        ...extraPages,
        ...frontmatterClassificationPages
          .map(frontmatterClassifiedPage => {
            const {
              entryTitle,
              map,
              pagination,
              keys,
              scopeLayout,
              getScopePageTitle,
            } = frontmatterClassifiedPage;
            return Object.keys(map).map(key => {
              const { path, scope } = map[key];

              /**
               * Register pagination
               */
              paginations.push({
                classifierType: ClassifierTypeEnum.Frontmatter,
                getPaginationPageTitle(pageNumber, key) {
                  return `Page ${pageNumber} - ${key} | ${entryTitle}`;
                },
                ...resolvePaginationConfig(
                  ClassifierTypeEnum.Frontmatter,
                  options.globalPagination,
                  pagination,
                  path,
                  ctx,
                  keys
                ),
                pid: scope,
                id: key,
              });

              return {
                permalink: path,
                meta: {
                  pid: scope,
                  id: key,
                },
                pid: scope,
                id: key,
                frontmatter: {
                  layout: ctx.getLayout(
                    scopeLayout,
                    DefaultLayoutEnum.FrontmatterPagination
                  ),
                  title: getScopePageTitle
                    ? getScopePageTitle(key)
                    : `${key} ${entryTitle}`,
                },
              };
            });
          })
          .reduce((arr, next) => arr.concat(next), []),
      ];

      logPages(`Automatically Added Index Pages`, allExtraPages);
      logObject(`Pagination data sources`, paginations);

      await Promise.all(allExtraPages.map(async page => ctx.addPage(page)));
      await registerPaginations(paginations, ctx);
    },

    /**
     * Generate tag and category metadata.
     */
    async clientDynamicModules() {
      const frontmatterClassifiedMap = ctx.frontmatterClassificationPages.reduce(
        (map, page) => {
          map[page.id] = page.map;
          return map;
        },
        {}
      );

      const PREFIX = 'vuepress_blog';

      return [
        {
          name: `${PREFIX}/frontmatterClassified.js`,
          content: `export default ${JSON.stringify(
            frontmatterClassifiedMap,
            null,
            2
          )}`,
        },
        {
          name: `${PREFIX}/paginations.js`,
          content: `
import sorters from './pageSorters'
import filters from './pageFilters'

export default ${serializePaginations(ctx.serializedPaginations, [
            'filter',
            'sorter',
          ])}
`,
        },
        {
          name: `${PREFIX}/pageFilters.js`,
          content: `export default ${mapToString(ctx.pageFilters, true)}`,
        },
        {
          name: `${PREFIX}/pageSorters.js`,
          content: `export default ${mapToString(ctx.pageSorters, true)}`,
        },
        {
          name: `${PREFIX}/services.js`,
          content: `export default ${mapToString(services)}`,
        },
      ];
    },

    enhanceAppFiles: [
      path.resolve(__dirname, '../client/classification.js'),
      path.resolve(__dirname, '../client/pagination.js'),
      path.resolve(__dirname, '../client/services.js'),
    ],

    plugins,
  };
};

function serializePaginations(paginations, unstringedKeys: string[] = []) {
  return `[${paginations
    .map(p => mapToString(p, unstringedKeys))
    .join(',\n')}]`;
}

/**
 * Transform map tp string.
 *
 * @param map
 * @param unstringedKeys Set to ture to force all field value to not be stringified.
 */
function mapToString(map, unstringedKeys: string[] | boolean = []) {
  const keys = unstringedKeys;
  let str = `{\n`;
  for (const key of Object.keys(map)) {
    str += `  ${key}: ${
      keys === true || (Array.isArray(keys) && keys.includes(key))
        ? map[key]
        : JSON.stringify(map[key])
    },\n`;
  }
  str += '}';
  return str;
}
