# The `Login` Folder

The `Login` folder contains the jsx and css that create, format, and modify the Login page. This page allows the user to log-in to ClimaCloset using their username and password, or it will redirect them to sign-up for the app instead.   

## `Login` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── pages/    # All pages in the app
│   │   ├── Login/       # Creates and formats Login page
│   │   │   ├── Login.css          # Controls appearance and layout of Login page
│   │   │   ├── Login.jsx          # Adds all elements of the Login page
│   │   │   └── README.md
```

### Overview

1. **`Login.css`**
   - This file controls the appearance and layout of the Login page. It handles styling all of the interactive and responsive elements of the page that users will come into contact with.

2. **`Login.jsx`**
   - This file contains all of the elements on the Login page. These elements are the log-in submission form, redirecting to sign-ups if needed, and communicating with the backend to verify the user's log-in information. 
