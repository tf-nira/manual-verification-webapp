# Base image for serving the app using Nginx
FROM nginx:alpine

# Build arguments for labeling the image
ARG SOURCE
ARG COMMIT_HASH
ARG COMMIT_ID
ARG BUILD_TIME
LABEL source=${SOURCE}
LABEL commit_hash=${COMMIT_HASH}
LABEL commit_id=${COMMIT_ID}
LABEL build_time=${BUILD_TIME}

# Environment variables
ENV base_path=/usr/share/nginx/html

# Create build-time arguments for container user and i18n URL (if applicable)
ARG container_user=mosip
ARG container_user_group=mosip
ARG container_user_uid=1001
ARG container_user_gid=1001

# Optional i18n bundle URL (can be passed during Docker build)
ARG manualverification_i18n_bundle_url_arg=http://artifactory-service/artifactory/libs-release-local/i18n/manual-verification-i18n-bundle.zip
ENV manualverification_i18n_bundle_url_env=${manualverification_i18n_bundle_url_arg}

# Install necessary packages and set up user
RUN apk --no-cache add unzip wget \
    && addgroup -g ${container_user_gid} ${container_user_group} \
    && adduser -u ${container_user_uid} -G ${container_user_group} -s /bin/sh -D ${container_user} \
    && mkdir -p /var/run/nginx /var/tmp/nginx \
    && chown -R ${container_user}:${container_user} /usr/share/nginx /var/run/nginx /var/tmp/nginx

# Set working directory for the user
WORKDIR /home/${container_user}

# Copy custom nginx config and default site config
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/

# Copy the built app files to the base_path
COPY dist ${base_path}

# Change ownership of copied files
RUN [ -d ${base_path}/assets/i18n ] && chown -R ${container_user}:${container_user} ${base_path}/assets/i18n || echo "Directory does not exist, skipping chown"

# Use the created user for running commands
USER ${container_user_uid}:${container_user_gid}

# Expose the default port for Nginx
EXPOSE 80

# Commands to run when the container starts
CMD wget -q --show-progress "${manualverification_i18n_bundle_url_env}" -O "${base_path}/assets/i18n/manual-verification-i18n-bundle.zip"; \
    cd ${base_path}/assets/i18n ; \
    unzip -o manual-verification-i18n-bundle.zip ; \
    nginx -g 'daemon off;'
