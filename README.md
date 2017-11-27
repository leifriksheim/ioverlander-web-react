iOverlander.com node.js app
===========================
This is still a big work in progress. Needs cleaning up and refactoring. Want to contribute? Reach out to us!


Installation
============

1. Clone this repo
2. Run `yarn install`
3. Create a config file overwriting any settings you might need (most likely db username, pw & db name) 
4. Run `yarn run dev`
5. Visit `http://localhost:3000`
6. All done - You're as ready to go as a dog on a flying carpet

![](http://i.giphy.com/yXBqba0Zx8S4.gif)


Contributing
============
iOverland is a volunteer driven projects. We raise the funds needed to run our 
infrastructure from our users, publish our code under an opensource license. 

iOverlander.com wouldn't exist without the thousands of travelers checking in, 
adding new places and maintaining our data. iOverlander wouldn't be possible
without your help in development of this site either. If you'd like to con-
tribute in any way, feel free to reach out to us!


Running a staging environment with docker-compose
=================================================
## Defaults
The compose configuration configures two persistent data directories: `dev_assets` 
& `dev_pgdata`. The default path for these is `../` (the repository's parent folder)

## docker-compose up
Launch the containers by running: `cd container && docker-compose -f container.yml up`

## Setting up the database
The standard compose file sets up the postgres container to mount the postgres 
data directory from your local filesystem. By default the path is 
`../dev_pgadata` (relative to this path). This way the database is persisted 
when relaunching the containers. 

To initialize the database, you need to create the database and prepopulate the 
database. You can do this with the following commands:

1. Use `docker ps` to get the `container ID` of the postgres server
2. Enter into the container with: `docker exec -it CONTAINER_ID psql -U user`
3. `CREATE DATABASE ioverlander; CREATE DATABASE ioverlander_node_sessions;`
4. Populate the database either from your own dump or from the dev_light.sql.tgz 
   with the following command:
   `docker exec -i CONTAINER_ID psql -U user -d ioverlander < dev_light.sql`

## Accessing the site:
The page should now be accessible at `http://localhost:3000` from your container host.
