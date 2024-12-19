# The `Signup` Folder

The `Signup` folder contains the jsx and css that create, format, and modify the Signup page. This page displays a submission form where the user is able to sign-up for the app, and it communicates this new profile to the server for storage.   

## `Signup` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── pages/    # All pages in the app 
│   │   ├── Signup/       # Creates and formats Signup page
│   │   │   ├── README.md          
│   │   │   ├── Signup.css          # Controls appearance and layout of Signup page
│   │   │   └── Signup.jsx          # Adds all elements of the Profile page
```

### Overview

1. **`Signup.css`**
   - This file handles the display of the where the user sign-ups for the app.

2. **`Signup.jsx`**
   - This file creates the area where the user will sign-up for the app. It creates form input fields, validates user input, submits an API request to the backend, and provides error handling. 
 