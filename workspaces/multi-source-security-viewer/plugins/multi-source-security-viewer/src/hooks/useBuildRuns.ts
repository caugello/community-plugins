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
import React from 'react';
import { PipelineRun } from '../types/pipelinerun';
import { useEntity } from '@backstage/plugin-catalog-react';
import { getCompoundEntityRef } from '@backstage/catalog-model';
import { jenkinsApiRef } from '@backstage-community/plugin-jenkins';
import { errorApiRef, useApi } from '@backstage/core-plugin-api';
import useAsyncRetry from 'react-use/esm/useAsyncRetry';
import { mssvJenkinsApiRef } from '../api/jenkins';
import { jenkinsToPipelineRunType } from '../utils/pipelinerun';

export const useBuildRuns = (jobFullName: string) => {
  const { entity } = useEntity();
  const jenkinsApi = useApi(jenkinsApiRef);
  const mssvJenkinsApi = useApi(mssvJenkinsApiRef);
  const errorApi = useApi(errorApiRef);

  const { value, loading, error } = useAsyncRetry(async () => {
    try {
      const job = await jenkinsApi.getJobBuilds({
        entity: getCompoundEntityRef(entity),
        jobFullName,
      });

      const builds = job?.builds ?? [];
      // Fetch logs for each project last build
      const buildWithLogs = builds.map(async run => {
        const logs = await mssvJenkinsApi
          .getLogs({
            buildNumber: run.number,
            jobName: jobFullName,
          })
          .then(res => res.text());

        return {
          run,
          logs,
        };
      });

      return await Promise.all(buildWithLogs);
    } catch (e) {
      errorApi.post(e);
    }
    return [];
  }, [jenkinsApi, errorApi, entity]);

  return React.useMemo(() => {
    const pipelineRuns =
      value?.map(pr => new PipelineRun(jenkinsToPipelineRunType(pr))) ?? [];
    return [pipelineRuns, loading, error] as [PipelineRun[], boolean, Error];
  }, [value, loading, error]);
};
