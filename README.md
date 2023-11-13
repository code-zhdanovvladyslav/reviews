# reviews
SPA project based on Vue 3 and Node

Requirements:
nodejs v16.15.1

Run frontend from root:
1. **cd reviews/**
2. **npm i**
3. **npm run dev**
4. open http://localhost:5173/


Run backend from root:
1. **cd api**
2. **npm i**
3. **node server.js**

Run mysql:
1. **docker pull mysql**
2. **docker images**
3. copy **IMAGE ID** from mysql image
4. **docker run --name mysql_container -p 30306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=reviews** IMAGE_ID_FROM_STEP_$
