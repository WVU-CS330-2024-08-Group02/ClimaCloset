# The `Navbar` Folder

The `Navbar` folder contains the code that styles and implements the navbar to appear at the top of our webapp. The user would then have the ability to navigate to our different pages using the navbar component. 

## `Navbar` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── components/    # Non-page components of the app
│   │   ├── Navbar/         # Navbar appears at the top of the webapp
│   │   │   ├── Navbar.css         # Style information for the navbar
│   │   │   ├── Navbar.jsx         # Sets up and implements the navbar
│   │   │   └── README.md
```

### Overview

1. **`Navbar.css`**
   - This file contains all the relevant styling for the navbar component.

2. **`Navbar.jsx`**
   - This file contains the code that sets up the navbar for our webapp. It uses three different sections for left (About page), middle (Home, Preferences, Weather pages), and right (Login/Signup, Profile pages).
