#######################################################################
# This program and the accompanying materials are made available
# under the terms of the Eclipse Public License v2.0 which
# accompanies this distribution, and is available at
# https://www.eclipse.org/legal/epl-v20.html
#
# SPDX-License-Identifier: EPL-2.0
#
# Copyright Contributors to the Zowe Project.
#######################################################################

# base image tag
ARG ZOWE_BASE_IMAGE=latest-ubuntu

FROM zowe-docker-release.jfrog.io/ompzowe/base-node:${ZOWE_BASE_IMAGE} AS builder

##################################
# labels
LABEL name="USS Explorer" \
      maintainer="jack-tiefeng.jia@ibm.com" \
      vendor="Zowe" \
      version="0.0.0" \
      release="0" \
      summary="IBM z/OS Unix Files UI service" \
      description="This Zowe UI component can display unix files on z/OS"

##################################
# switch context
USER zowe
WORKDIR /home/zowe

##################################
# copy files
COPY --chown=zowe:zowe component .

##################################
# build component
# pretty same as .pax/prepare-workspace.sh. any way we can merge?
RUN npm ci --no-audit --ignore-scripts \
    && npm run prod \
    && mkdir -p final/web \
    && mkdir -p final/bin \
    && cp README.md final \
    && cp package.json final/web \
    && cp package-lock.json final/web \
    && cp -r dist/. final/web \
    && cp manifest.yaml final \
    && cp apiml-static-registration.yaml.template final \
    && cp pluginDefinition.prod.json final/pluginDefinition.json \
    && cp bin/start.sh final/bin \
    && chmod +x final/bin/* \
    && mkdir -p final/explorer-ui-server \
    && cd explorer-ui-server \
    && npm ci --no-audit \
    && npm run build \
    && cd dist \
    && npm install --production \
    && cd .. \
    && cp -r dist/. ../final/explorer-ui-server/ \
    && cp manifest.yaml ../final/explorer-ui-server/

##################################
# second stage
FROM zowe-docker-release.jfrog.io/ompzowe/base-node:${ZOWE_BASE_IMAGE}

##################################
# switch context
USER zowe
WORKDIR /component

##################################
# copy files
COPY --from=builder --chown=zowe:zowe /home/zowe/final ./
COPY --chown=zowe:zowe component/LICENSE /licenses

##################################
# start command
EXPOSE 8550
ENTRYPOINT [ "bin/start.sh" ]
