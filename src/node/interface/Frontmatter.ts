import { FrontmatterHandler } from '../util';
import { PaginationConfig } from './Pagination';

export type GetScopePageTitle = (key: string) => string;

export interface FrontmatterClassificationPage {
  id: string;
  entryTitle: string;
  pagination: PaginationConfig;
  keys: string[];
  scopeLayout?: string;
  getScopePageTitle?: GetScopePageTitle;
  map: Record<string, any>;
  _handler: FrontmatterHandler;
}
