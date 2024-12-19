# The `pages` Folder

The `pages` folder contains the folders/files that create and modify all of the pages the user interacts with.  

## `pages` Folder/File Structure and Overview

### Structure

```
frontend/
├── src/      # Modifies the UI design and handles user interactions
│   ├── pages/     # All pages in the app 
│   │   ├── About/          # Creates and formats About page
│   │   ├── Home/           # Creates and formats Home page
│   │   ├── Login/          # Creates and formats Login page
│   │   ├── Preferences/    # Creates and formats Preferences page
│   │   ├── Profile/        # Creates and formats Profile page
│   │   ├── Signup/         # Creates and formats Signup page
│   │   ├── Weather/        # Creates and formats Weather page
│   │   └──README.md
```

### Overview

1. **`About`**
   - This folder contains the jsx and css that create, format, and modify the About page. This page displays a brief overview of ClimaCloset as a whole, and then show pictures and names and positions of the ClimaCloset team members. 

2. **`Home`**
   - This folder contains the jsx and css that create, format, and modify the Home page. This page displays a welcome message to the user, the user's closet, the daily forecast, and an outfit generator based on the user's plans for the day. .

3. **`Login`**
   - This folder contains contains the jsx and css that create, format, and modify the Login page. This page allows the user to log-in to ClimaCloset using their username and password, or it will redirect them to sign-up for the app instead..

4. **`Preferences`**
   - This folder contains the jsx and css that create, format, and modify the Preferences page. This page allows the user to input their ideal temperature and select all of the accessories, tops, bottoms, and shoes they own and store them in their closet. 

5. **`Profile`**
   - This folder contains the jsx and css that create, format, and modify the Profile page. This page displays the user's name and profile picture, and it allows the user to edit their profile information. 


6. **`Signup`**
   - This folder contains the jsx and css that create, format, and modify the Signup page. This page displays a submission form where the user is able to sign-up for the app, and it communicates this new profile to the server for storage.

7. **`Weather`**
   - This folder contains the jsx and css that create, format, and modify the Weather page. It displays the hourly/daily forecast, weather map, and interacts with the backend for the weather API. 
