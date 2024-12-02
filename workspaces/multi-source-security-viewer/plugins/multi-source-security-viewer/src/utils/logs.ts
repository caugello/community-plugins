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

/*
 * Extract JSON between two anchors (EYE_CATCHERS)
 * @param logs: string
 * @returns Record<string, any> | undefined
 */
export const extractJSON = (
  logs: string,
  startAnchor: string,
  endAnchor: string,
): Record<string, any> | undefined => {
  try {
    const regex = new RegExp(`${startAnchor}(.*)${endAnchor}`, 's');
    const match = logs.match(regex);

    if (!match) {
      return undefined;
    }

    const trimmedInput = match[1].trim();
    return JSON.parse(trimmedInput);
  } catch (e) {
    return undefined;
  }
};

/*
 * Clean escaped characters from logs
 * @param logs: string
 * @returns string
 * */
export const cleanLogs = (logs: string): string => {
  return logs.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '');
};
