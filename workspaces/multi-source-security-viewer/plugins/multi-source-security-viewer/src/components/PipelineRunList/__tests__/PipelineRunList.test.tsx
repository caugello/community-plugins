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
import { render, screen, waitFor } from '@testing-library/react';

import { PipelineRunList } from '../PipelineRunList';
import { usePipelineRuns } from '../../../hooks/usePipelineRuns';
import { mockPipelineRuns } from '../../__fixtures__/pipelineruns';

jest.mock('../../../hooks/usePipelineRuns', () => ({
  usePipelineRuns: jest.fn(),
}));

describe('PipelineRunList', () => {
  it('should render a list of pipeline runs', async () => {
    (usePipelineRuns as jest.Mock).mockReturnValue([
      mockPipelineRuns,
      false,
      undefined,
    ]);
    render(<PipelineRunList />);
    await waitFor(() => {
      expect(screen.getByText('pipeline-run-1')).toBeInTheDocument();
      expect(screen.getByText('pipeline-run-2')).toBeInTheDocument();
    });
  });

  it('should render a loading spinner', async () => {
    (usePipelineRuns as jest.Mock).mockReturnValue([[], true, undefined]);
    render(<PipelineRunList />);
    await waitFor(() => {
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });
  });

  it('should render an empty state if no data', async () => {
    (usePipelineRuns as jest.Mock).mockReturnValue([[], false, undefined]);
    render(<PipelineRunList />);
    await waitFor(() => {
      expect(screen.getByText('No Pipeline Runs')).toBeInTheDocument();
    });
  });

  it('should render an error message', async () => {
    (usePipelineRuns as jest.Mock).mockReturnValue([
      [],
      false,
      new Error('error'),
    ]);
    render(<PipelineRunList />);
    await waitFor(() => {
      expect(screen.getByText('Error: error')).toBeInTheDocument();
    });
  });
});
