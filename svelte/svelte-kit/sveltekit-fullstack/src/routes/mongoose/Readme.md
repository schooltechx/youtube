# SvelteKit with Mongodb (power by [Mongoose](https://mongoosejs.com/) )

This is simple CRUD in one page. I use docker for database server. 
You have to copy files to correct location of svelte project for running this demo

![Product UI](../../../asset/product-ui.png)

## File
- docker-compose.yml
- src/routes/mongoose/product.js
- src/routes/mongoose/+page.server.js
- src/routes/mongoose/+page.sevelte.js

## install
    npm create svelte@latest my-app
    cd my-app
    npm install
    npm install mongoose
    # copy file to project
    docker compose up -d mongo
    code .

## note
I found error mongo not found error some time. I don't know how to fix it yet. Some annoy problem can fix by. 
- npm update
- reload visual studio code

please check [main document](https://github.com/schooltechx/youtube/tree/main/svelte/svelte-kit) for other tutorial
