# The `Middleware` Folder 

The `Middleware` folder is used to protect `routes` by verifiying JWT in the request cookies. The `authMiddleware.js` file checks if the token is valid or invalid, and it, respectively, allows or blocks access to `routes`. 

## `Middleware` Folder/File Structure and Overview

```
backend/
├── Middleware/            # Validation, authentication
│   ├── authMiddleware.js  # Middleware to ensure user is authenticated and it validates data requests
│   └── README.md
```