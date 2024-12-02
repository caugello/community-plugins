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
import { List, Output } from '@mui/icons-material';
import React from 'react';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { PipelineRun } from '../../types/pipelinerun';
import { DialogLauncher as DialogWrapper } from '../DialogWrapper/DialogWrapper';
import { PipelineRunOutput } from './PipelineRunOutput';
import { PipelineRunLogs } from './PipelineRunLogs';

const useStyles = makeStyles((theme: Theme) => ({
  boxActions: {
    display: 'flex',
    alignItems: 'left',
    gap: theme.spacing(1),
  },
}));

type PipelineRunTableRowActionsProps = {
  row: PipelineRun;
};

export const PipelineRunTableRowActions: React.FC<
  PipelineRunTableRowActionsProps
> = ({ row }) => {
  const [openOutput, setOpenOutput] = React.useState(false);
  const [openLogs, setOpenLogs] = React.useState(false);
  const classes = useStyles();

  const OutputDialog = () => {
    return <PipelineRunOutput pr={row} />;
  };

  const LogsDialog = () => {
    return <PipelineRunLogs pr={row} />;
  };

  return (
    <React.Fragment>
      <DialogWrapper
        key={`${row.id}-output`}
        title={row.id}
        open={openOutput}
        onClose={() => setOpenOutput(false)}
        component={OutputDialog}
        fullWidth
        maxWidth="xl"
      />

      <DialogWrapper
        key={`${row.id}-logs`}
        title={row.id}
        open={openLogs}
        onClose={() => setOpenLogs(false)}
        component={LogsDialog}
        fullScreen
        maxWidth="xl"
      />

      <Box className={classes.boxActions}>
        <List onClick={() => setOpenLogs(true)} />
        <Output onClick={() => setOpenOutput(true)} />
      </Box>
    </React.Fragment>
  );
};
