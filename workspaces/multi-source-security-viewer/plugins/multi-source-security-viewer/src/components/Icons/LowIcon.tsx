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
import AngleDoubleDownIcon from '@patternfly/react-icons/dist/esm/icons/angle-double-down-icon';
import { global_palette_blue_300 as minorColor } from '@patternfly/react-tokens';
import { IconWithValue } from './IconWithValue';

export const LowIcon: React.FC<{ value: number }> = ({ value }) => {
  return (
    <IconWithValue
      iconComponent={AngleDoubleDownIcon}
      iconProps={{
        style: { fill: minorColor.value },
      }}
      value={value}
    />
  );
};
