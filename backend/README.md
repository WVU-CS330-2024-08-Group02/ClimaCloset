# The `backend` Folder

The `backend` folder contains the server-side components of our project. This is what manages and interacts with the database and external APIs. 

The server itself is implemented in Microsoft Azure using Express.js. There are two external API's being used: (1) ipify and (2) National Weather Service (NWS). (1) is to pull the user's IP Address, and (2) is to pull weather information about the user's location. 


## `backend` Folder/File Structure and Overview

### Structure

```
backend/
├── Middleware/            # Validation, authentication, log-in
├── routes/                # API route definitions
├── config.js              # Configuration files, including database setup
├── index.js               # Main entry point for the Express server
├── package-lock.json      # Locks settings from package.json
├── package.json           # Settings for Node.js project
└── README.md
```

### Overview

1. **`Middleware`**
   - Contains middleware functions that handle cross-cutting concerns by verifiying JWT in the request cookies during log-in/sign-up.

2. **`routes`**
   - xxxxx.

3. **`config.js`**
   - xxxxx.

4. **`index.js`**
   - xxxxx.

5. **`package-lock.json`**
   - xxxxx.

6. **`package.json`**
   - xxxxx.
