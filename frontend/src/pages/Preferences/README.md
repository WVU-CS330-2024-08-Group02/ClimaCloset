# The `Preferences` Folder

The `Preferences` folder contains the jsx and css that create, format, and modify the Preferences page. This page allows the user to input their ideal temperature and select all of the accessories, tops, bottoms, and shoes they own and store them in their closet. 

## `Preferences` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── pages/    # All pages in the app
│   │   ├── Preferences/       # Creates and formats Preferences page
│   │   │   ├── Preferences.css          # Controls appearance and layout of Preferences page
│   │   │   ├── Preferences.jsx          # Adds all elements of the Preferences page
│   │   │   └── README.md
```

### Overview

1. **`Preferences.css`**
   - This file controls the appearance and layout of the Preferences page. It handles styling all of the interactive and responsive elements of the page that users will come into contact with.

2. **`Preferences.jsx`**
   - This file contains all of the elements on the Preferences page. These elements are the submission forms for accessories, bottoms, tops, and shoes; selecting ideal temperature; and communicating with the backend to store the user's selected clothing in the closet. 