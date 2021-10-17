# Maps App Application
This is a portfolio project showcasing the usage of fullstack web development frameworks & technologies. The app is structured as follows: the backend using Java with Spring
and the server-side-rendered frontend using VueJS and NUXTJS. Several APIs are integrated in the project, f.ex several Google services APIs, Unisplash API, Wikipedia API, Sygic Travel API, Teleport API and others. 

# database

To start the database run the following command in the terminal from your project root folder. Leave the terminal window open.

    docker-compose -f docker-compose-dev.yml up

# backend

To run the backend localy at your machinge, execute the MapsAppApplication process in your IDE
![Alt text](assets/pictures/execute_backend.png?raw=true "Optional Title")


# frontend

To run the application locally at localhost:3000, execute this command within the terminal in /frontend directory

    npm run dev

# SCREENSHOTS

### Home tab
Home page displaying all the saved places stored in the database, your current location, Google Maps integrated places browser, carousel preview of selected cities and proposed cities/towns to discover, shuffled from the pre-defined list of 500+ cities

![Alt text](assets/pictures/myplaces.png?raw=true "Optional Title")
### City tab
A view of one of the cities, displaying basic information like region, country, flag, polulation, Wikipedia information about the city, location on the map and pictures integrated with photo databases APIs
![Alt text](assets/pictures/paris.png?raw=true "Optional Title")
### Photo browser
Carousel browser of selected photos, with hyperlinks to originals in HQ
![Alt text](assets/pictures/paris_ss.png?raw=true "Optional Title")
### Profile tab
Profile tab showcasing all the saved places on chart integrated with amCharts JavaScript library, beta version of Friends List
![Alt text](assets/pictures/profile.png?raw=true "Optional Title")
### Route planer tab
Beta version functionality with Google Directions API
![Alt text](assets/pictures/plan_route.png?raw=true "Optional Title")



