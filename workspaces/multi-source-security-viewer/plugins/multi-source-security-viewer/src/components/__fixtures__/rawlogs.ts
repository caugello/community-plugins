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
export const mockRawLogs = `Started by user John Duimovich
Obtained Jenkinsfile from git https://github.com/northdepot/demo-go-jenkins
[Pipeline] Start of Pipeline
[Pipeline] library
Loading library RHTAP_Jenkins@main
Attempting to resolve main from remote references...
 > git --version # timeout=10
 > git --version # 'git version 2.43.0'
 > git ls-remote -- https://github.com/redhat-appstudio/tssc-sample-jenkins.git # timeout=10
Found match: refs/heads/main revision 9cf73c145b22433236586c80eb52ede9c395b34f
The recommended git tool is: NONE
No credentials specified
 > git rev-parse --resolve-git-dir /var/lib/jenkins/workspace/demo-go-jenkins@libs/b5b935a8811df738565fc0752d8f94e8c7a551d784dda96330182c8d1fc7c9e4/.git # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/redhat-appstudio/tssc-sample-jenkins.git # timeout=10
Fetching without tags
Fetching upstream changes from https://github.com/redhat-appstudio/tssc-sample-jenkins.git
 > git --version # timeout=10
 > git --version # 'git version 2.43.0'
 > git fetch --no-tags --force --progress -- https://github.com/redhat-appstudio/tssc-sample-jenkins.git +refs/heads/*:refs/remotes/origin/* # timeout=10
Checking out Revision 9cf73c145b22433236586c80eb52ede9c395b34f (main)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 9cf73c145b22433236586c80eb52ede9c395b34f # timeout=10
Commit message: "Update README.md"
 > git rev-list --no-walk 9cf73c145b22433236586c80eb52ede9c395b34f # timeout=10
[Pipeline] node
Running on Jenkins in /var/lib/jenkins/workspace/demo-go-jenkins
[Pipeline] {
[Pipeline] stage
[Pipeline] { (Declarative: Checkout SCM)
[Pipeline] checkout
Selected Git installation does not exist. Using Default
The recommended git tool is: NONE
No credentials specified
 > git rev-parse --resolve-git-dir /var/lib/jenkins/workspace/demo-go-jenkins/.git # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/northdepot/demo-go-jenkins # timeout=10
Fetching upstream changes from https://github.com/northdepot/demo-go-jenkins
 > git --version # timeout=10
 > git --version # 'git version 2.43.0'
 > git fetch --tags --force --progress -- https://github.com/northdepot/demo-go-jenkins +refs/heads/*:refs/remotes/origin/* # timeout=10
 > git rev-parse refs/remotes/origin/main^{commit} # timeout=10
Checking out Revision bbfb3846e70d8e1c71c3b955a5f5efe90d583a9b (refs/remotes/origin/main)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f bbfb3846e70d8e1c71c3b955a5f5efe90d583a9b # timeout=10
Commit message: "Update main.go"
 > git rev-list --no-walk b030e9348a9ad590fb76a2793370d5fa01f99589 # timeout=10
[Pipeline] }
[Pipeline] // stage
[Pipeline] withEnv
[Pipeline] {
[Pipeline] withCredentials
Masking supported pattern matches of $GITOPS_AUTH_PASSWORD or $ROX_CENTRAL_ENDPOINT or $QUAY_IO_CREDS or $QUAY_IO_CREDS_PSW or $COSIGN_SECRET_PASSWORD or $ROX_API_TOKEN or $COSIGN_PUBLIC_KEY or $COSIGN_SECRET_KEY
[Pipeline] {
[Pipeline] stage
[Pipeline] { (init)
[Pipeline] script
[Pipeline] {
[Pipeline] echo
INFO: init
[Pipeline] echo
Loading libraryResource(common.sh)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/common.sh
[Pipeline] echo
Loading libraryResource(verify-deps-exist)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/verify-deps-exist
[Pipeline] echo
Loading libraryResource(init.sh)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/init.sh
[Pipeline] sh
+ rhtap/init.sh

Step: init
Results: /var/lib/jenkins/workspace/demo-go-jenkins/results/init
ENV vars:
OK: IMAGE_URL
OK: IMAGE
OK: QUAY_IO_CREDS_USR
OK: QUAY_IO_CREDS_PSW
OK: COSIGN_SECRET_PASSWORD
OK: COSIGN_SECRET_KEY
OK: COSIGN_PUBLIC_KEY
OK: DISABLE_ACS
OK: ROX_CENTRAL_ENDPOINT
OK: ROX_API_TOKEN
OK: GITOPS_AUTH_PASSWORD
OK: POLICY_CONFIGURATION
OK: REKOR_HOST
OK: IGNORE_REKOR
OK: INFO
OK: STRICT
OK: EFFECTIVE_TIME
OK: HOMEDIR
Binaries:
OK: git in /usr/bin/git
OK: curl in /usr/bin/curl
OK: jq in /usr/bin/jq
OK: yq in /usr/bin/yq
OK: buildah in /usr/bin/buildah
OK: syft in /usr/bin/syft
OK: cosign in /usr/bin/cosign
OK: python3 in /usr/bin/python3
Env vars and binaries ok
Dependency Error  = 0
Running init:init
DEMO init:init
Build Initialize: quay.io/jduimovich0/bootstrap:jenkins-bbfb3846e70d8e1c71c3b955a5f5efe90d583a9b
Determine if Image Already Exists
[Pipeline] }
[Pipeline] // script
[Pipeline] }
[Pipeline] // stage
[Pipeline] stage
[Pipeline] { (build)
[Pipeline] script
[Pipeline] {
[Pipeline] echo
INFO: buildah_rhtap
[Pipeline] echo
Loading libraryResource(merge-sboms.sh)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/merge-sboms.sh
[Pipeline] echo
Loading libraryResource(common.sh)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/common.sh
[Pipeline] echo
Loading libraryResource(verify-deps-exist)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/verify-deps-exist
[Pipeline] echo
Loading libraryResource(buildah-rhtap.sh)
[Pipeline] libraryResource
[Pipeline] writeFile
[Pipeline] sh
+ chmod +x rhtap/buildah-rhtap.sh
[Pipeline] sh
+ rhtap/buildah-rhtap.sh

Step: buildah-rhtap
Results: /var/lib/jenkins/workspace/demo-go-jenkins/results/buildah-rhtap
Running buildah-rhtap:build
Running Login
Login Succeeded!
STEP 1/7: FROM registry.access.redhat.com/ubi9/go-toolset:1.19.13-4.1697647145
STEP 2/7: COPY . .
STEP 3/7: RUN go mod download
go: no module dependencies to download
STEP 4/7: RUN go build -buildvcs=false -o ./main
STEP 5/7: ENV PORT 8081
STEP 6/7: EXPOSE 8081
STEP 7/7: CMD [ "./main" ]
COMMIT quay.io/jduimovich0/bootstrap:jenkins-bbfb3846e70d8e1c71c3b955a5f5efe90d583a9b
Getting image source signatures
Copying blob sha256:6f740e9430896c5575f685b73a06bae50b08045eefd8d2e96da3f4c6fc104902
Copying blob sha256:07168f7dbac118f0f0372b4704384e39179d84910300fad3d6e400791a917594
Copying blob sha256:25a23f7c4c85a98e876efb0f1a192e3b88f518b868e810c5819954f9c64985d5
Copying blob sha256:d6da60043ce7566f7c2dac2b88f520819b4fe5e9fefe1ae3d71f974dbafe6deb
Copying blob sha256:1b71c33c1dd601525879d08f653e67c1bd173e04604f005e93098e10242f115f
Copying config sha256:76f4fb29d77f4415b52a4cddde6fb52037359607a850ffcb6d7e0da9f0accf64
Writing manifest to image destination
--> 76f4fb29d77f
Successfully tagged quay.io/jduimovich0/bootstrap:jenkins-bbfb3846e70d8e1c71c3b955a5f5efe90d583a9b
76f4fb29d77f4415b52a4cddde6fb52037359607a850ffcb6d7e0da9f0accf64
Getting image source signatures
Copying blob sha256:1b71c33c1dd601525879d08f653e67c1bd173e04604f005e93098e10242f115f
Copying blob sha256:d6da60043ce7566f7c2dac2b88f520819b4fe5e9fefe1ae3d71f974dbafe6deb
Copying blob sha256:07168f7dbac118f0f0372b4704384e39179d84910300fad3d6e400791a917594
Copying blob sha256:6f740e9430896c5575f685b73a06bae50b08045eefd8d2e96da3f4c6fc104902
Copying blob sha256:25a23f7c4c85a98e876efb0f1a192e3b88f518b868e810c5819954f9c64985d5
Copying config sha256:76f4fb29d77f4415b52a4cddde6fb52037359607a850ffcb6d7e0da9f0accf64
Writing manifest to image destination
sha256:6e6854bc20de821eda5dee4a75c108398b08bb6f50d6f7578de305a9631f6c20quay.io/jduimovich0/bootstrap:jenkins-bbfb3846e70d8e1c71c3b955a5f5efe90d583a9bGetting image source signatures
Copying blob sha256:1b71c33c1dd601525879d08f653e67c1bd173e04604f005e93098e10242f115f
Copying blob sha256:6f740e9430896c5575f685b73a06bae50b08045eefd8d2e96da3f4c6fc104902
Copying blob sha256:d6da60043ce7566f7c2dac2b88f520819b4fe5e9fefe1ae3d71f974dbafe6deb
Copying blob sha256:25a23f7c4c85a98e876efb0f1a192e3b88f518b868e810c5819954f9c64985d5
Copying blob sha256:07168f7dbac118f0f0372b4704384e39179d84910300fad3d6e400791a917594
Copying config sha256:76f4fb29d77f4415b52a4cddde6fb52037359607a850ffcb6d7e0da9f0accf64
Writing manifest to image destination
========Running buildah-rhtap:generate-sboms
========RUNNING PYTHON 
========Running buildah-rhtap:upload-sbom
WARNING: SBOM attachments are deprecated and support will be removed in a Cosign release soon after 2024-02-22 (see https://github.com/sigstore/cosign/issues/2755). Instead, please use SBOM attestations.
WARNING: Attaching SBOMs this way does not sign them. To sign them, use 'cosign attest --predicate /var/lib/jenkins/workspace/demo-go-jenkins/results/temp/files/sbom-cyclonedx.json --key <key path>'.
Uploading SBOM file for [quay.io/jduimovich0/bootstrap:jenkins-bbfb3846e70d8e1c71c3b955a5f5efe90d583a9b] to [quay.io/jduimovich0/bootstrap:sha256-6e6854bc20de821eda5dee4a75c108398b08bb6f50d6f7578de305a9631f6c20.sbom] with mediaType [application/vnd.cyclonedx+json].
`;
