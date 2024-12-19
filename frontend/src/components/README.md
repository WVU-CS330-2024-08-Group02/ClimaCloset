# The `components` Folder

The `components` folder contains all of the elements/styling and handles the user interactions that are not a page in the app.  

## `components` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── components/    # Non-page components of the app
│   │   ├── Accessories/          # Creates and formats the Accessories box
│   │   ├── Bottoms/              # Creates and formats the Bottoms box
│   │   ├── CenterContainer/      # Creates and formats the CenterContainer
│   │   ├── NavBar/               # Creates and formats the Navbar
│   │   ├── Shelf/                # xxxx
│   │   ├── Shoes/                # Creates and formats the Shoes box
│   │   ├── Throbber/             # Graphic indicating the something is loading
│   │   ├── Tops/                 # Creates and formats the Tops box
│   │   ├── TransparentBox/       # xxxx
│   │   ├── WeatherPreferences/   # xxxx
│   │   ├── Layout.jsx            # Consistent layout for Navbar
│   │   └── README.md
```

### Overview

1. **`Accessories`**
   - This folder contains the jsx and css that create, format, and modify Accessories. It displays the Accessories submission form where the user can input the accessories they own. Upon submission of the form, the user's response will be stored in the closet. 

2. **`Bottoms`**
   - This folder contains the jsx and css that create, format, and modify Bottoms. It displays the bottoms submission form where the user can input the bottoms they own. Upon submission of the form, the user's response will be stored in the closet.

3. **`CenterContainer`**
   - This folder contains the jsx and css that create, format, and modify CenterContainer. It creates a wrapper component the provides a centered container on the app for other componenets. 

4. **`NavBar`**
   - This folder contains the jsx and css that create, format, and modify the Navbar. The user hs the ability to navigate to the app's different pages using the navbar component. 

5. **`Shelf`**
   - xxxx.

6. **`Shoes`**
   - This folder contains the jsx and css that create, format, and modify Shoes. It displays the shoes submission form where the user can input the shoes they own. Upon submission of the form, the user's response will be stored in the closet.

7. **`Throbber`**
   - This folder contains the jsx and css that create, format, and modify Throbber. It displays a spinning graphic that indicates that an element of the application is loading/buffering.

8. **`Tops`**
   - This folder contains the jsx and css that create, format, and modify Tops. It displays the tops submission form where the user can input the tops they own. Upon submission of the form, the user's response will be stored in the closet.

9. **`TransparentBox`**
   - xxxx.

10. **`WeatherPreferences`**
   - xxxx.

11. **`Layout.jsx`**
   - This file renders the navbar component and provides a consistent structure for all of the pages. This file allows for the content to be rendered dynamically when moving between pages.
