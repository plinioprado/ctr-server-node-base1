# ctr-server-node-base

Udated prototype of a REST server that can handle Logins, Users and other basic services using NodeJs and PostgreSQL. The code can be reused for other projects.

Scope:

Rest service for:

* Aux generic tables (front-end can handled based on the 'format' data in the data + format response):

  * role
  * setting
  * tenant
  * user
  * country: ISO 3166
  * currency: ISO 4217, table 2 (current when implemented)

Recoded fro zero based in ctr-server-node to serve the endpoints for ctr-clent-react-base based in a MVC model implemented as elow described.

## Stack

* NodeJs
* Express
* PostgreSQL
* pg (connects to the PostgreSQL db)
* dotenv (accesses the connection data stored in an .env file)
* Jest (test)

## Endpoints

Related to the tables role, setting, tenant and user (require authentication)

* Show a list: GET /api/:table
* Show a record by cod: GET /api/:table/:cod
* Create a record: POST /api/:table
* Update a record: PUT /api/:table
* Delete a record: DELETE /api/:table/:cod
* Show a uptions for a html select by table: GET /api/:table/option (only for aux tables)

Others

* Login and get session of success: POST /api/login
* Reset database: GET /api/install/resetdb (require authentication)

## Database

Aux tables

* ctr.role - aux
* ctr.setting - aux
* ctr.tenant - aux
* ctr.user - aux
* ctr.country - aux
* ctr.currency - aux

JSON files

* /settings.json
* /dao/json/access.json

## Setup

* Run the node back-end

```shell
  node app.js
```

Or for reset on each code change saving:

```shell
  npm run dev
```

* Open browser, open http://localhost:4000 (unless set differently in settings.json)

Will require a .env file with the below data filled with an actual postgreSQL db running

```shell
PG_USER=myUser
PG_HOST=localhost
PG_DATABASE=myDb
PG_PASSWORD=myPass
PG_PORT=5432
```

  Db can be reset with the endpoint:
    http://localhost:4000/api/install/resetdb

## Config

Done in two ways:

* Static settings in a json file
* Dynamic settings in a "setting" table that defalt to the tenant 1 but can be related to others.

## Tests

```shell
  npm run test
```

## MVC approach application

Along the following:

* View: Receive the Request, send to the Controllers (injecting parameters and dependencies as needed), and return the Response with the returned data and format. In the "routes" folder.
* Controllers: Contain the Business logic that creates a response from the "data" from a PostgreSQL database (in specific cased from a JSON file) and a "format" from that table in the Model. In the "controller" folder and uses the Data Access Objects in the "dao" folder.
* Model: As JavaScript Objects to be used by the Controller. Includes the information to be supplied to the front-end and drive front-end display and busoness logic. in the "model" folder.

## Notes

* The only tenant currently in use id 'default'.

## Contribution

* Any suggestion or info request can be done making an initial contact through www.linkedin.com/in/plinioprado.
