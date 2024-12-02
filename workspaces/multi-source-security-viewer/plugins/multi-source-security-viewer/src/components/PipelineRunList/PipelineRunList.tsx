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
import { debounce } from 'lodash';
import { PipelineRunTable } from './PipelineRunTable';
import { Grid, GridItem } from '@patternfly/react-core';
import { PipelineRunToolbar } from './PipelineRunToolbar';
import { Box } from '@material-ui/core';
import { PipelineRun } from '../../types/pipelinerun';

export type PipelineRunListProps = {
  data: PipelineRun[];
  loading: boolean;
  error: Error | undefined;
};

export const PipelineRunList: React.FC<PipelineRunListProps> = ({
  data,
  loading,
  error,
}) => {
  const [namefilter, setNameFilter] = React.useState<string>('');
  const filteredData = React.useMemo(() => {
    return data?.filter((row: PipelineRun) =>
      row?.id?.toString().toLocaleLowerCase().includes(namefilter),
    );
  }, [data, namefilter]);

  const onSearch = debounce((n: string) => {
    setNameFilter(n);
  }, 600);

  return (
    <React.Fragment>
      <Box>
        <Grid>
          <GridItem span={12}>
            <PipelineRunToolbar onSearch={onSearch} />
          </GridItem>
          <GridItem span={12}>
            <PipelineRunTable
              data={filteredData}
              isLoading={loading}
              error={error}
            />
          </GridItem>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
