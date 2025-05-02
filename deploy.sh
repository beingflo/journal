#!/usr/bin/env bash
die() { echo "$*" 1>&2 ; exit 1; }

echo -e "Deploying jour.rest.quest to production!"

[ -z "$(git status --porcelain)" ] || die "There are uncommitted changes"

npm run eslint || die "ESLint failed"
npm run build || die "Build failed"

scp -r dist/* omni:./caddy/site/jour.rest.quest/ || die "Failed to copy files to server"
docker --context arm cp -r dist caddy:/srv/jour || die "Failed to copy Caddyfile to container"