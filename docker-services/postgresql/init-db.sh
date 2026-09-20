#!/bin/bash
# This script will be ran on postgresql init, it creates:
# - A database for the TODOS platform
# - A database for testing
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
CREATE USER $TODOS_APP_DB_USER WITH PASSWORD '$TODOS_APP_DB_PASSWORD' SUPERUSER;

CREATE DATABASE $TODOS_APP_DB;
GRANT ALL PRIVILEGES ON DATABASE $TODOS_APP_DB TO $TODOS_APP_DB_USER;

EOSQL
