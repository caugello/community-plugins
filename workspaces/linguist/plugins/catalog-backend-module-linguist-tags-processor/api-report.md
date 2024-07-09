## API Report File for "@backstage-community/plugin-catalog-backend-module-linguist-tags-processor"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { AuthService } from '@backstage/backend-plugin-api';
import { BackendFeatureCompat } from '@backstage/backend-plugin-api';
import { CatalogProcessor } from '@backstage/plugin-catalog-node';
import { CatalogProcessorCache } from '@backstage/plugin-catalog-node';
import { Config } from '@backstage/config';
import { DiscoveryService } from '@backstage/backend-plugin-api';
import { Entity } from '@backstage/catalog-model';
import { HumanDuration } from '@backstage/types';
import { LanguageType } from '@backstage-community/plugin-linguist-common';
import { LoggerService } from '@backstage/backend-plugin-api';

// @public (undocumented)
const catalogModuleLinguistTagsProcessor: BackendFeatureCompat;
export default catalogModuleLinguistTagsProcessor;

// @public
export class LinguistTagsProcessor implements CatalogProcessor {
  constructor(options: LinguistTagsProcessorOptions);
  // (undocumented)
  static fromConfig(
    config: Config,
    options: LinguistTagsProcessorOptions,
  ): LinguistTagsProcessor;
  // (undocumented)
  getProcessorName(): string;
  preProcessEntity(
    entity: Entity,
    _: any,
    __: any,
    ___: any,
    cache: CatalogProcessorCache,
  ): Promise<Entity>;
}

// @public
export interface LinguistTagsProcessorOptions {
  // (undocumented)
  auth: AuthService;
  bytesThreshold?: number;
  cacheTTL?: HumanDuration;
  // (undocumented)
  discovery: DiscoveryService;
  languageMap?: Record<string, string | undefined>;
  languageTypes?: LanguageType[];
  // (undocumented)
  logger: LoggerService;
  tagPrefix?: string;
}

// @public
export type ShouldProcessEntity = (entity: Entity) => boolean;
```