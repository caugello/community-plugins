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
import { AuthService, LoggerService } from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { catalogServiceRef } from '@backstage/plugin-catalog-node/alpha';
import { JenkinsService } from './types';
import { Config } from '@backstage/config';

export async function createJenkinsService({
  auth,
  logger,
  catalog,
  config,
}: {
  auth: AuthService;
  logger: LoggerService;
  catalog: typeof catalogServiceRef.T;
  config: Config;
}): Promise<JenkinsService> {
  return {
    // SHOULD BE MOVED TO UPSTREAM JENKINS PLUGIN
    async getLogs({ jobName, buildNumber }) {
      logger.info(`Getting logs for job ${jobName} build ${buildNumber}`);
      const jenkinsUser = config.getString('jenkins.username');
      const jenkinsToken = config.getString('jenkins.apiKey');

      const url = `http://localhost:8087/job/${jobName}/lastBuild/consoleText`;
      const authHeader = btoa(`${jenkinsUser}:${jenkinsToken}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${authHeader}`,
        },
      });

      if (!response.ok) {
        throw new NotFoundError(
          `${response.status} ${response.statusText} Job ${jobName} build ${buildNumber} not found`,
        );
      }

      return await response.text();
    },
  };
}
