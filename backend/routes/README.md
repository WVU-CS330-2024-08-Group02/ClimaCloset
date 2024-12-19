# The `routes` Folder

The `routes` folder is used to hold and define the backend external API routes for the app. Specifically, the `routes` folder is defining the user authentication process with the server and the retrieval of weather data using NWS and Ipify API. 

## `routes` Folder/File Structure and Overview

### Structure

```
backend/
├── routes/                # API route definitions
│   ├── auth.js            # Routes for user authentication
│   ├── closet.js          # Saves user input to closet
│   ├── README.md
│   └── weatherData.js     # Route for weather data retrieval via NWS API
```

### Overview

1. **`auth.js`**
   - This file defines routes for user registration and login. It handles authentication by hashing passwords with bcrypt during registration and generating JWTs upon login.

2. **`closet.js`**
   - This file is used to save user input about what type of clothing items they own to their personal closet. With this information saved to the user's closet, through their account, the app is now able to generate outfit options based on what the user owns. 

3. **`weatherData.js`**
   - This file defines the routes for fetching weather data from the NWS API and the user's IP address from the Ipify API. The weather data is simplified before being sent to the frontend as a JSON response. 