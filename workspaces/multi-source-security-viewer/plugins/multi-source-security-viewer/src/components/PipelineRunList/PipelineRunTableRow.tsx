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
import { TableCell, TableRow, Theme, makeStyles } from '@material-ui/core';
import React from 'react';
import { CriticalIcon } from '../Icons/CriticalIcon';
import { ImportantIcon } from '../Icons/ImportantIcon';
import { MediumIcon } from '../Icons/MediumIcon';
import { LowIcon } from '../Icons/LowIcon';
import { Link } from 'react-router-dom';
import { Link as SBOMLink, MoreVert } from '@mui/icons-material';
import { PipelineRunTableRowActions } from './PipelineRunTableRowActions';
import { PipelineRun } from '../../types/pipelinerun';

export type PipelineRunTableRowProps = {
  index: number;
  row: PipelineRun;
};

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export const PipelineRunTableRow: React.FC<PipelineRunTableRowProps> = ({
  index,
  row,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow key={index} className={classes.row}>
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">{row.source}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>
          <CriticalIcon value={row.critical} />
        </TableCell>
        <TableCell>
          <ImportantIcon value={row.important} />
        </TableCell>
        <TableCell>
          <MediumIcon value={row.moderate} />
        </TableCell>
        <TableCell>
          <LowIcon value={row.low} />
        </TableCell>
        <TableCell>
          <Link to={row.sbomLink} target="_blank">
            <SBOMLink color="info" fontSize="medium" />
          </Link>
        </TableCell>
        <TableCell>
          <PipelineRunTableRowActions row={row} />
        </TableCell>
        <TableCell>
          <MoreVert fontSize="medium" />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
