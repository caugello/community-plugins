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
import Grid from '@mui/material/Grid2';
import { useDarkTheme } from '../../hooks/useDarkTheme';
import {
  Box,
  Paper,
  Typography,
  makeStyles,
  Theme,
  Card,
} from '@material-ui/core';
import { JenkinsSecurityContent } from '../Jenkins/JenkinsSecurityContent';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'start',
    padding: theme.spacing(3, 0, 0, 0),
  },
  title: {
    margin: theme.spacing(0, 0, 2, 2),
  },
  headerBox: {
    padding: theme.spacing(2, 0, 3, 0),
  },
  ciBox: {
    padding: theme.spacing(0, 0, 4, 0),
  },
  titleBox: {
    marginTop: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
  },
}));

export type SecurityViewerProps = {
  children?: React.ReactNode;
  source: 'jenkins';
};

export const SecurityViewer = ({ children, source }: SecurityViewerProps) => {
  useDarkTheme();

  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Paper>
          <Grid container>
            <Grid size={12}>
              <Box className={classes.headerBox}>
                <Typography
                  variant="h4"
                  component="h4"
                  className={classes.title}
                >
                  Pipeline Runs
                </Typography>
                <Typography component="p" className={classes.title}>
                  Review status of our pipeline runs, security and related
                  information
                </Typography>
              </Box>
            </Grid>
            <Grid size={12}>
              <Box className={classes.ciBox}>
                <Card
                  style={{
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                  }}
                >
                  {children}
                </Card>
              </Box>
            </Grid>
            <Grid size={12}>
              <Box className={classes.titleBox}>
                <Typography
                  variant="h4"
                  component="h4"
                  className={classes.title}
                >
                  Security Information
                </Typography>
              </Box>
            </Grid>
            <Grid size={12}>
              {source === 'jenkins' && <JenkinsSecurityContent />}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  );
};
