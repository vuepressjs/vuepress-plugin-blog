/**
 * A Directory-based Classifier
 */
import { PaginationConfig } from './Pagination';
import { GetScopePageTitle } from './Frontmatter';

export interface DirectoryClassifier {
  /**
   * Unique id for current classifier.
   */
  id: string;
  /**
   * Matched directory name.
   */
  dirname: string;
  /**
   * Entry page for current classifier.
   */
  path: string;
  /**
   * Entry and pagination page titles for current classifier.
   */
  title?: string;
  /**
   * Layout component name for entry page.
   */
  layout?: string;
  /**
   * Frontmatter for entry page.
   */
  frontmatter?: Record<string, any>;
  /**
   * Layout for matched page.
   */
  itemLayout?: string;
  /**
   * Permalink for matched page.
   */
  itemPermalink?: string;
  /**
   * Pagination config for current classifier.
   */
  pagination?: PaginationConfig;
}

/**
 * A Frontmatter-based Classifier
 */
export interface FrontmatterClassifier {
  /**
   * Unique id for current classifier.
   */
  id: string;
  /**
   * Frontmatter keys used to classify pages.
   * It's usually used to merge multiple tags with the same meaning
   *
   * e.g. keys: ['category', 'categories'],
   */
  keys: string[];
  /**
   * Index page for current classifier.
   */
  path: string;
  /**
   * Entry, scope and pagination page titles for current classifier.
   */
  title?: string;
  /**
   * Layout for index page.
   */
  layout?: string;
  /**
   * Layout for scope page.
   * e.g. {id: 'tag', keys: ['tag'], scopeLayout: 'Foo'}
   * `/tag/vue` will use `Foo.vue` as the layout
   */
  scopeLayout?: string;
  /**
   * A function to get the title of scope page dynamically.
   */
  getScopePageTitle?: GetScopePageTitle;
  /**
   * Frontmatter for index page.
   */
  frontmatter?: Record<string, any>;
  /**
   * Pagination config for current classifier.
   */
  pagination?: PaginationConfig;
}

/**
 * Comment configuration
 */

/**
 * Vssue configuration
 * For details, head Vssue documentation: https://vssue.js.org/
 */
export interface VssueOptions {
  platform: 'github' | 'github-v4' | 'gitlab' | 'bitbucket' | 'gitee';
  owner: string;
  repo: string;
  clientId: string;
  clientSecret: string;
  baseURL: string;
  state: string;
  labels: Array<string>;
  prefix: string;
  admins: Array<string>;
  perPage: number;
  locale: string;
  proxy: string | ((url: string) => string);
  issueContent: (param: {
    options: VssueOptions;
    url: string;
  }) => string | Promise<string>;
  autoCreateIssue: boolean;
}

/**
 * Disqus configuration
 * For details, head vue-disqus documentation: https://github.com/ktquez/vue-disqus#props
 */
export interface DisqusOptions {
  shortname: string;
  identifier: string;
  url: string;
  title: string;
  remote_auth_s3: string;
  api_key: string;
  sso_config: any;
  language: string;
}

export interface Comment extends Partial<VssueOptions>, Partial<DisqusOptions> {
  /**
   * The comment service
   */
  service: 'vssue' | 'disqus';
}

export interface Newsletter {
  endpoint: string;
  title: string;
  content: string;
  popupConfig: PopupConfig;
}

interface PopupConfig {
  enabled: boolean;
  popupComponent: string;
  timeout: number;
}

/**
 * Options for this plugin.
 */
export interface BlogPluginOptions {
  directories: DirectoryClassifier[];
  frontmatters: FrontmatterClassifier[];
  globalPagination: PaginationConfig;
  //TODO: define types
  sitemap: any;
  feed: any;
  comment: Comment;
  newsletter: Newsletter;
}
