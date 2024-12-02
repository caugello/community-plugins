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
  ACSCheckResults,
  ACSImageScanResult,
  EnterpriseContractPolicy,
} from '@aonic-ui/pipelines';
import { cleanLogs, extractJSON } from '../utils/logs';

export type PipelineRunType = {
  id: string;
  type: string;
  status: string;
  source: string;
  logs: string;
  ec?: {
    data: EnterpriseContractPolicy[];
  };
  acsImagesScanResult?: {
    data: ACSImageScanResult;
  };
  acsImageCheckResults?: {
    data: ACSCheckResults;
  };
  acsDeploymentCheckResults?: {
    data: ACSCheckResults;
  };
};

export class PipelineRun {
  data: PipelineRunType;
  constructor(data: PipelineRunType) {
    this.data = data;
  }

  get id(): string {
    return this.data?.id || '';
  }

  get type(): string {
    // TODO: This should change once we support display on other entities than CI/CD
    return this.data?.type || 'Build';
  }

  get source(): string {
    return this.data?.source || '';
  }

  get status(): string {
    return this.data?.status || 'Failed';
  }

  get critical(): number {
    return this.acsImageScanResults?.result?.summary?.CRITICAL || 0;
  }

  get important(): number {
    return this.acsImageScanResults?.result?.summary?.IMPORTANT || 0;
  }

  get moderate(): number {
    return this.acsImageScanResults?.result?.summary?.MODERATE || 0;
  }

  get low(): number {
    return this.acsImageScanResults?.result?.summary?.LOW || 0;
  }

  get enterpriseContractPolicies(): EnterpriseContractPolicy[] {
    return this.data?.ec?.data || [];
  }

  get acsImageScanResults(): ACSImageScanResult | undefined {
    return extractJSON(
      this.logs,
      'ACS_IMAGE_SCAN_EYECATCHER_BEGIN',
      'ACS_IMAGE_SCAN_EYECATCHER_END',
    ) as ACSImageScanResult;
  }

  get acsImageCheckResults(): ACSCheckResults | undefined {
    return extractJSON(
      this.logs,
      'ACS_IMAGE_CHECK_EYECATCHER_BEGIN',
      'ACS_IMAGE_CHECK_EYECATCHER_END',
    ) as ACSCheckResults;
  }

  get acsDeploymentCheckResults(): ACSCheckResults | undefined {
    return extractJSON(
      this.logs,
      'ACS_DEPLOY_EYECATCHER_BEGIN',
      'ACS_DEPLOY_EYECATCHER_END',
    ) as ACSCheckResults;
  }

  get logs(): string {
    return cleanLogs(this.data?.logs || '');
  }
}
