# The `Weather` Folder

The `Weather` folder contains the files that create, format, and modify the Weather page. These files handle interactions with the user, handles interactions with the backend weather API, creates the weather map, and displays the daily/hourly forecast.

## `Weather` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── pages/    # All pages in the app 
│   │   ├── Weather/      # Creates and formats weather page
│   │   │   ├── README.md          
│   │   │   ├── Weather.css          # Controls appearance and layout of Weather page
│   │   │   └── Weather.jsx          # Adds all elements of the Weather page
```

### Overview

1. **`Weather.css`**
   - This file controls the appearance and layout of the Weather page. It handles styling all of the interactive and responsive elements of the page that users will come into contact with. 

2. **`Weather.jsx`**
   - This file contains all of the elements displayed on the Weather page. These elements are the daily forecast, hourly forecast, map, search bar. It updates the forecast and icons, and it makes calls to the backend for the user's geo data and weather forecast. 
