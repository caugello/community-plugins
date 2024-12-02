/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { createJenkinsService } from './services/JenkinsService';
import { Config } from '@backstage/config';

/**
 * multiSourceSecurityViewerPlugin backend plugin
 *
 * @public
 */
export const multiSourceSecurityViewerPlugin = createBackendPlugin({
  pluginId: 'multi-source-security-viewer',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        permissions: coreServices.permissions,
        catalog: catalogServiceRef,
        config: coreServices.rootConfig,
      },
      async init({ logger, auth, httpAuth, httpRouter, catalog, config }) {
        const jenkinsService = await createJenkinsService({
          logger,
          auth,
          catalog,
          config,
        });

        httpRouter.use(
          await createRouter({
            httpAuth,
            jenkinsService,
          }),
        );
      },
    });
  },
});
