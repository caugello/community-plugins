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
import { JenkinsPipelineRunList } from './JenkinsPipelineRunList';
import { useLocation } from 'react-router-dom';
import { JenkinsBuildRunList } from './JenkinsBuildRunList';

export const JenkinsSecurityContent: React.FC = () => {
  const location = useLocation();
  // TODO IMPROVE THIS REGEX TO SUPPORT ALL USE CASES
  const jobName = location.pathname.match(/builds\/(.*?)\/runs/);

  return (
    <React.Fragment>
      {jobName ? (
        <JenkinsBuildRunList jobName={jobName[1]} />
      ) : (
        <JenkinsPipelineRunList />
      )}
    </React.Fragment>
  );
};
