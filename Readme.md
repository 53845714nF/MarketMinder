# MarketMinder

## Description 
This project is a shopping list app.
It allows you to create shopping lists.
And add items to them. In addition, the lists can be shared with other users.
This project is part of my bachelor thesis, the goal is to have a container application to analyze security scanners.

## Installation

To install the MarketMinder, clone the repository to your local machine. Next, use Docker to run the docker-compose.yml file.
```
docker compose up
```
Once the containers are running, you can access the application at http://localhost

## Technologies
The MarketMinder is built with the following technologies:

### Backend
 - Flask
 - Flask-sqlalchemy
 - Flask-login
 - Flask_restful
 - Flask_migrate
 - Postgres

### Frontend
 - React
 - Material UI
 - React-query
 - nginx