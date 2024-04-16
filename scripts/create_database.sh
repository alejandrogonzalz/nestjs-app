#!/bin/bash

DB_USER="postgres"
DB_NAME="mydatabase"

# Prompt for the PostgreSQL password
echo "Enter PostgreSQL password for user $DB_USER:"
read -s DB_PASSWORD

# Attempt to create the database
echo "Creating database $DB_NAME..."
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;" postgres

# Check if the database creation was successful
if [ $? -eq 0 ]; then
  echo "Database $DB_NAME created successfully."
else
  echo "Error: Failed to create database $DB_NAME."
fi
