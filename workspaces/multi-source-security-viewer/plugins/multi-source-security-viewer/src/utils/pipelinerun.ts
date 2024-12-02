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
import { PipelineRunType } from '../types/pipelinerun';

type Run = {
  displayName: string;
};

/*
 * Convert Jenkins response to PipelineRunType
 * @param value: { run: Run; logs: string }
 * @returns PipelineRunType
 */
export const jenkinsToPipelineRunType = (value: {
  run: Run;
  logs: string;
}): PipelineRunType => {
  return {
    id: value?.run?.displayName,
    logs: value?.logs,
  } as PipelineRunType;
};
