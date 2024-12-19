# The `src` Folder

The `src` folder contains the code that modifies the UI design and handles user interactions, frontend/backend interactions, and interactive UI elements.

## `src` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── assets        # Holds all images for the app
│   ├── components    # Non-page components of the app
│   ├── context       # Holds authentication state management
│   ├── pages         # All pages in the app
│   ├── App.css       # Style information for #root
│   ├── App.jsx       # Sets up routing
│   ├── index.css     # Default style/design for app 
│   ├── main.jsx      # Entry point for React application
│   └── README.md
```

### Overview

1. **`assets`**
   - This folder contains all of the images displayed in the app, and keeps filepaths clear and concise with one general location. 

2. **`components`**
   - This folder contains all of the jsx and css files for the different components in the webapp that are not full pages, such as the transparent boxes or navbar.

3. **`context`**
   - This folder holds the jsx file that provides authentication state management through React context.

4. **`pages`**
   - This folder contains the jsx and css files for all of the different pages in the webapp, such as Home, About, Preferences, Weather, Login, Signup, and Profile.

5. **`App.css`**
   - This file contains the style information for the root element.

6. **`App.jsx`**
   - This file contains the React application code that sets up routing, using react-router-dom, through all of the files in the `pages` folder and the `Layout.jsx` file in the `components` folder. 

7. **`index.css`**
   - This file contains the default style and design elements for the entire web application.

8. **`Main.jsx`**
   - This file contains the entry point for a React application. It sets up the app wt strict mode and provides authentication by importing AuthProvider.
