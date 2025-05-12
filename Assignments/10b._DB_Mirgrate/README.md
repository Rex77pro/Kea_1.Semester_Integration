

# Migrate a database

## Build:
Navigate into this folder and run the following: 

````powershell
docker compose up --build migrator
````
This will create a Postgres Database with two tabels:

* authors
* books

It also seeds data into the database

## Migrate

To mirgrate my database into the mssql database i run the following
````powershell
docker compose run --rm migrator
````

## Recreate 

 MSSQL:

This is a query to clean and recreate the database for test porposes
````sql
USE master;
ALTER DATABASE targetdb SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE targetdb;
GO
CREATE DATABASE targetdb;
GO
````