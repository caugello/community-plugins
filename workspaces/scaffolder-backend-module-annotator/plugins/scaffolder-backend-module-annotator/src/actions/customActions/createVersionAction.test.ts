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
import { resolveSafeChildPath } from '@backstage/backend-plugin-api';
import { createMockDirectory } from '@backstage/backend-test-utils';
import { createMockActionContext } from '@backstage/plugin-scaffolder-node-test-utils';

import * as fs from 'fs-extra';
import * as yaml from 'yaml';

import { createVersionAction } from './createVersionAction';

const catalogEntity =
  'plugins/scaffolder-backend-module-annotator/src/actions/annotator/mocks';

const catalogEntityContent = fs.readFileSync(
  resolveSafeChildPath(catalogEntity, './catalog-info.yaml'),
  'utf8',
);

describe('catalog annotator', () => {
  const mockDir = createMockDirectory();
  const workspacePath = mockDir.resolve('workspace');

  afterEach(() => {
    jest.resetAllMocks();
    mockDir.clear();
  });

  it('should call action to annotate with template version', async () => {
    mockDir.setContent({
      [workspacePath]: {
        'catalog-info.yaml': catalogEntityContent,
      },
    });

    const versionAction = createVersionAction();

    const ctx = createMockActionContext({
      workspacePath,
      templateInfo: {
        entityRef: 'test-entityRef',
        entity: {
          metadata: {
            name: 'test-entityRef',
            annotations: {
              'backstage.io/template-version': '0.0.1',
            },
          },
        },
      },
    });

    ctx.logger.info = jest.fn();

    await versionAction.handler(ctx);

    const updatedCatalogInfoYaml = await fs.readFile(
      resolveSafeChildPath(workspacePath, './catalog-info.yaml'),
      'utf8',
    );

    const entity = yaml.parse(updatedCatalogInfoYaml);

    expect(ctx.logger.info).toHaveBeenCalledWith(
      'Annotating catalog-info.yaml with the version of the scaffolder template',
    );
    expect(entity?.metadata.annotations['backstage.io/template-version']).toBe(
      '0.0.1',
    );
  });

  it('should call action to annotate with template version where a version is passed as input', async () => {
    mockDir.setContent({
      [workspacePath]: {
        'catalog-info.yaml': catalogEntityContent,
      },
    });

    const versionAction = createVersionAction();

    const ctx = createMockActionContext({
      workspacePath,
      input: {
        annotations: {
          'backstage.io/template-version': '0.0.2',
        },
      },
      templateInfo: {
        entityRef: 'test-entityRef',
        entity: {
          metadata: {
            name: 'test-entityRef',
            annotations: {
              'backstage.io/template-version': '0.0.1',
            },
          },
        },
      },
    });

    ctx.logger.info = jest.fn();

    await versionAction.handler(ctx);

    const updatedCatalogInfoYaml = await fs.readFile(
      resolveSafeChildPath(workspacePath, './catalog-info.yaml'),
      'utf8',
    );

    const entity = yaml.parse(updatedCatalogInfoYaml);

    expect(ctx.logger.info).toHaveBeenCalledWith(
      'Annotating catalog-info.yaml with the version of the scaffolder template',
    );
    expect(entity?.metadata.annotations['backstage.io/template-version']).toBe(
      '0.0.2',
    );
  });
});
