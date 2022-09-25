# SvelteKit with Firebase [Firestore](https://firebase.google.com/docs/firestore/quickstart)

This is simple CRUD in one page. 
You have to copy files to correct location of svelte project 
for running this demo.  
SvelteKit make some change for POST method. 
I use GET method for avoiding break change and remake tutorial.
You can check Form Actions tutorial for POST method.
I don't want to make complex demo so I use similar UI and schema for most of database demo. You can learn another dabase in few minute.

![Product UI](../../../asset/product-ui.png)

## Firebase FireStore
[Firebase](https://firebase.google.com/docs) is a database include real time 
update all client with less effort. 
I don't want to make complex demo so I use similar schema for most of database demo. Code is simple enough for study but not for production.
I will make proper tutorial for Firebase soon (Firebase, Realtime Database, etc).
Please use [Firebase console](https://console.firebase.google.com/) for manage data. Firebase 9 quite difference from 8 please check [this tutorial](https://www.youtube.com/watch?v=gEaY2GZMino&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&index=7)
Firebase did not create javascript code so I have to define type for data. 
Please check types.d.ts. Please check [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

## File

- src/routes/firestore/+page.svelte
- src/routes/firestore/Firebase.js
- src/routes/firestore/types.d.ts

## Firebase.js
copy firebaseConfig from filebase console and replace in Firebase.js

    const firebaseConfig = {
        apiKey: "AIzaSyC6iD5hFTM-lWoQhNnd6rlesWk5VHOziOo",
        authDomain: "schooltech-demo.firebaseapp.com",
        projectId: "schooltech-demo",
        storageBucket: "schooltech-demo.appspot.com",
        messagingSenderId: "488366757918",
        appId: "1:488366757918:web:f22d61cf075467106f360f",
        measurementId: "G-G8HRHELR7S"
    }
## install
    # use firebase console to create project and collection
    npm create svelte@latest my-app
    cd my-app
    npm install
    npm install firebase
    # copy file to project
    # modify Firebase.js match your firebaseConfig 
    code .

## note

SvelteKit is not release yet. Some annoy problem can fix by. 
- npm update
- reload visual studio code

please check [main document](https://github.com/schooltechx/youtube/tree/main/svelte/svelte-kit) for other tutorial
