

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

Before we migrate we need to create a user in the mssql database
````sql
IF SUSER_ID('migrator') IS NULL
    CREATE LOGIN migrator WITH PASSWORD = 'Str0ng!Pass', CHECK_POLICY = OFF;
ELSE
    ALTER LOGIN migrator WITH PASSWORD = 'Str0ng!Pass', CHECK_POLICY = OFF;

/* 2. Opret database-bruger i targetdb og giv fulde rettigheder */
USE targetdb;
IF USER_ID('migrator') IS NULL
    CREATE USER migrator FOR LOGIN migrator;
ALTER ROLE db_owner ADD MEMBER migrator;
GO
````

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
By doing this you also remove the user, which makes it not able to connect. Therfor you might need to run the user script again.

## Full Recreate

In order to clean all databases, you need to run the MSSQL query as given, and also shut down the docker container.

This is done by running:

````powershell
docker compose down -v
````

