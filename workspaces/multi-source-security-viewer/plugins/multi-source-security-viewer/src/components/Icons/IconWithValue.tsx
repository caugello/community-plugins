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
import { Flex, FlexItem } from '@patternfly/react-core';
import { SvgIconProps } from '@mui/material/SvgIcon';

type IconComponentType = React.ComponentType<
  SvgIconProps | Record<string, any>
>;

type PipelineRunIconProps = {
  iconComponent: IconComponentType;
  iconProps?: SvgIconProps | Record<string, any>;
  value: string | number;
};

export const IconWithValue: React.FC<PipelineRunIconProps> = ({
  iconComponent: IconComponent,
  iconProps,
  value,
}) => {
  return (
    <Flex
      spaceItems={{ default: 'spaceItemsXs' }}
      alignItems={{ default: 'alignItemsCenter' }}
    >
      <FlexItem>
        <IconComponent style={{ fontSize: 'small' }} {...iconProps} />
      </FlexItem>
      <FlexItem style={{ marginLeft: '.25rem' }}>{value}</FlexItem>
    </Flex>
  );
};
