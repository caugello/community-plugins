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
  FormControl,
  InputAdornment,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from '@material-ui/core';
import { Search, FilterAlt } from '@mui/icons-material';
import Input from '@mui/material/Input';
import React from 'react';
import Grid from '@mui/material/Grid2';
import {
  c_text_input_group__text_input_PaddingTop as inputPaddingTop,
  c_text_input_group__text_input_PaddingBottom as inputPaddingBottom,
} from '@patternfly/react-tokens';

export type PipelineRunToolbarProps = {
  onSearch: (search: string) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    padding: theme.spacing(0, 2),
  },
  searchInput: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    width: '200%',
    backgroundColor: theme.palette.background.paper,
    paddingBlockStart: inputPaddingTop.value,
    paddingBlockEnd: inputPaddingBottom.value,
  },
}));

export const PipelineRunToolbar: React.FC<PipelineRunToolbarProps> = ({
  onSearch,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <Grid container size={12}>
          <Grid size={6}>
            <Select
              fullWidth
              value="Name"
              className={classes.searchInput}
              readOnly
              startAdornment={
                <InputAdornment position="start">
                  <FilterAlt />
                </InputAdornment>
              }
            >
              <MenuItem value="Name">Name</MenuItem>
            </Select>
          </Grid>
          <Grid size={6}>
            <Input
              fullWidth
              className={classes.searchInput}
              aria-label="search"
              placeholder="Search by name"
              onChange={e => onSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </Grid>
        </Grid>
      </FormControl>
    </React.Fragment>
  );
};
