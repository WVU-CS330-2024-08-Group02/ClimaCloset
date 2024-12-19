# The `WeatherPreferences` Folder

The `WeatherPreferences` folder contains the jsx and css that create, format, and modify WeatherPreferences. It displays the ideal temperature slide, handles the event of the slider moving, and stores the ideal temperature.  

## `WeatherPreferences` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── components/    # Non-page components of the app
│   │   ├── WeatherPreferences/      # Creates and formats the WeatherPreferences
│   │   │   ├── WeatherPreferences.css       # Controls appearance and layout of WeatherPreferences
│   │   │   ├── WeatherPreferences.jsx       # Sets up and implements the WeatherPreferences
│   │   │   └── README.md
```

### Overview

1. **`WeatherPreferences.css`**
   - This file controls the appearance and layout of WeatherPreferences. It handles styling all of the interactive and responsive elements.

2. **`WeatherPreferences.jsx`**
   - This file contains all of the elements and implementation for WeatherPreferences. It creates the ideal temperature slider, displays the slider, handles the event of the slider being moved, and stores the user's ideal temperature in the server. 
