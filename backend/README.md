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
   - This folder holds and defines the backend external API routes for the app. It specifically defines the the user authentication process with the server and the retrieval of weather data using NWS and Ipify API.

3. **`config.js`**
   - This file exports the database configutation for Azure SQL and the connectDB function, which establishes the connection. It also uses enviorment variables for sensitive data.

4. **`index.js`**
   - This file serves as the main entry point for the backend. It sets up the Express server, establishes a connection to the database, and configures routes + middleware.

5. **`package-lock.json`**
   - This file ensures that the dependencies for our project are installed with the correct versions specified to provide consistency across several environments. It encompasses the entire dependency tree, including nested dependencies, their specific versions, and their specific source URLs (prevents any potential compatibility issues by "locking" dependencies to a known state).

6. **`package.json`**
   - This file servers as the "manifest" for our project by specifying its name, version, main entry point, and other important metadata. It also defines the dependencies required by our project and their version ranges, which allows for automated installation and management of libraries. 
