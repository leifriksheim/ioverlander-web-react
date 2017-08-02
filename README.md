# iOverlander Web App

This is still a big work in progress. Needs cleaning up and refactoring. Want to contribute? Reach out to us!

1. Clone this repo
2. Run `yarn install`
3. Run `yarn run dev`
4. Visit `http://localhost:3000`
5. All done - You're as ready to go as a dog on a flying carpet

![](http://i.giphy.com/yXBqba0Zx8S4.gif)



# Running a staging environment with docker compose

## Setting up the database
The standard compose file sets up the postgres container to mount the postgres 
data directory from your local filesystem. By default the path is 
`../dev_pgadata` (relative to this path). This way the database is persisted 
when relaunching the containers. 

To initialize the database, you need to create the database and prepopulate the 
database. You can do this with the following commands:

1. Use `docker ps` to get the `container ID` of the postgres server
2. Enter into the container with: `docker exec -it CONTAINER_ID psql -U user`
3. `CREATE DATABSE ioverlander; CREATE DATABASE ioverlander_node_sessions;`
4. Populate the database either from your own dump or from the dev_light.sql.tgz 
   with the following command:
   `docker exec -i CONTAINER_ID psql -U user -d ioverlander < dev_light.sql`

