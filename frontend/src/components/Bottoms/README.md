# The `Bottoms` Folder

The `Bottoms` folder contains the jsx and css that create, format, and modify Bottoms. It displays the bottoms submission form where the user can input the bottoms they own. Upon submission of the form, the user's response will be stored in the closet. 

## `Bottoms` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── components/    # Non-page components of the app
│   │   ├── Bottoms/       # Creates and formats the Bottoms box
│   │   │   ├── Bottoms.css          # Controls appearance and layout of Bottoms
│   │   │   ├── Bottoms.jsx          # Sets up and implements the Bottoms box
│   │   │   └── README.md
```

### Overview

1. **`Bottoms.css`**
   - This file controls the appearance and layout of Bottoms. It handles styling all of the interactive and responsive elements.

2. **`Bottoms.jsx`**
   - This file contains all of the elements and implementation for Bottoms. It displays the submission form as a checkbox list with the bottoms listed, and it handles the submission of the form to the closet storage. 
