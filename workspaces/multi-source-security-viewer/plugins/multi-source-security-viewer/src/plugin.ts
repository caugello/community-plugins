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
import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly.css';
import '@patternfly/patternfly/patternfly-theme-dark.css';

import {
  configApiRef,
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { MssvJenkinsClient, mssvJenkinsApiRef } from './api/jenkins';

export const multiSourceSecurityViewerPlugin = createPlugin({
  id: 'multi-source-security-viewer',
  apis: [
    createApiFactory({
      api: mssvJenkinsApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
        fetchApi: fetchApiRef,
        configApi: configApiRef,
      },
      factory: ({ discoveryApi, fetchApi, configApi }) =>
        new MssvJenkinsClient({ discoveryApi, fetchApi, configApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const MultiSourceSecurityViewerPage =
  multiSourceSecurityViewerPlugin.provide(
    createRoutableExtension({
      name: 'MultiSourceSecurityViewerPage',
      component: () =>
        import('./components/SecurityViewer').then(m => m.SecurityViewer),
      mountPoint: rootRouteRef,
    }),
  );
