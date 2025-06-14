/*
 * Copyright 2020 The Backstage Authors
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

export interface Config {
  /** Optional configurations for the SonarQube plugin */
  sonarqube?: {
    /**
     * The base url of the sonarqube installation. Defaults to https://sonarcloud.io.
     * @visibility frontend
     */
    baseUrl?: string;

    /**
     * The external url of the sonarqube installation.
     * Use this if you want to use a different url for the frontend than the backend.
     * @visibility frontend
     */
    externalBaseUrl?: string;

    /**
     * The api key to access the sonarqube instance under baseUrl.
     * @visibility secret
     */
    apiKey?: string;

    /**
     * The optional sonarqube instances.
     * @visibility frontend
     */
    instances?: Array<{
      /**
       * The name of the sonarqube instance.
       * @visibility frontend
       */
      name: string;

      /**
       * The base url of the sonarqube instance.
       * @visibility frontend
       */
      baseUrl: string;

      /**
       * The external url of the sonarqube instance.
       * Use this if you want to use a different url for the frontend than the backend.
       * @visibility frontend
       */
      externalBaseUrl?: string;

      /**
       * The api key to access the sonarqube instance.
       * @visibility secret
       */
      apiKey: string;

      /**
       * This is an optional descriptor of the type of token used to access the Sonarqube server.
       * If not set, it defaults to "Basic".
       * @visibility frontend
       */
      authType?: 'Bearer' | 'Basic';
    }>;
  };
}
