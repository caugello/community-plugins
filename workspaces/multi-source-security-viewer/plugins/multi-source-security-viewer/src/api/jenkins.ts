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
  ConfigApi,
  createApiRef,
  DiscoveryApi,
  FetchApi,
} from '@backstage/core-plugin-api';

export const mssvJenkinsApiRef = createApiRef<MssvJenkinsApi>({
  id: 'plugin.mssv.api.jenkins',
});

export interface MssvJenkinsApi {
  getLogs(options: { jobName: string; buildNumber: number }): Promise<Response>;
}

export class MssvJenkinsClient implements MssvJenkinsApi {
  // MOVE THIS TO UPSTREAM JENKINS PLUGIN
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;
  private readonly configApi: ConfigApi;

  constructor(options: {
    discoveryApi: DiscoveryApi;
    fetchApi: FetchApi;
    configApi: ConfigApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
    this.configApi = options.configApi;
  }

  async getLogs(options: { jobName: string; buildNumber: number }) {
    const backendUrl = this.configApi.getString('backend.baseUrl');
    return this.fetchApi.fetch(
      `${backendUrl}/api/multi-source-security-viewer/jenkins/${options.jobName}/${options.buildNumber}/logs`,
    );
  }
}
