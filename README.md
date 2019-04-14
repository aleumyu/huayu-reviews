# HUAYU REVIEWS

HUAYU Reviews ia an app to review universities related to the HUAYU enrichment scholarship, in order to better inform applicants of the program. 

![Image of App](readme/HuayuScreenshot.png)

## FEATURES
  ### Principle Features
  - View all schools related to the HUAYU Enrichment Scholarship program
  - Sort schools by region of Taiwan, city name, and city population
  - View school details including location on a map
  - Use OpenWeatherAPI to view current weather in the school city
  - View and submit reviews of school experience
  
### Future Features
- User login
- Users can add photos, edit and delete their review
- Users can reply to others
- Search by school name
- Forum for discussion 
- Most recent reviews on homepage
- Blog posts


## STACK
HUAYU Reviews is built using React, Express, Node.js, MySQL and Bootstrap.


## API
[OpenWeatherMap](https://openweathermap.org/api) Weather API


## PLAN
  ### User Flow
  
   ![Image of userFlow](readme/userflow.png)
  
  ### Database schema
  
   ![Image of Database](readme/database.png)

  ### API routes
  
   [API Routes](https://docs.google.com/document/d/1plGu1vT-Kkuqh5ah00hocxkKw2FdfHx9A2RVc7BiUuc/edit)
  
  ### Full stack architecture
  
   ![Image of architecture](readme/architecture.png)


## SETUP

### Dependencies
Run `yarn install` to install dependencies in both client and api folders.

### Database Preparation
- Create `.env` file in the api directory and add `DB_PASS=YOURPASSWORD` and `DB_NAME=myFridge`.

- Copy `mysql -u root -p -e "create database huayu"` into your terminal to create a database in MySQL.

- Copy the following into your terminal. This will create a three tables: "schools" with columns (id, university, center, location, city, coordinates, map, website), "reviews" with columns (id, user_id, school_id, created_at, title, start_date, end_date, likes, dislikes, city_impression, general_review), and "cities" with column names (id, ).
`CREATE TABLE schools (id INT(11) NOT NULL AUTO_INCREMENT, university VARCHAR(100) not null, center VARCHAR(100) not null, location VARCHAR(25) not null, city VARCHAR(100) not null, coordinates VARCHAR(30) not null, map VARCHAR(500) not null, website VARCHAR(500) not null, PRIMARY KEY (id));`
`CREATE TABLE reviews (id INT(11) NOT NULL AUTO_INCREMENT, user_id INT(11) not null, school_id INT(11) NOT NULL, created_at TIMESTAMP, title VARCHAR(25), start_date DATE, end_date DATE, likes VARCHAR(300), dislikes VARCHAR(300), city_impression VARCHAR(300), general_review VARCHAR(300), PRIMARY KEY (id));`
`CREATE TABLE cities (id INT(11) NOT NULL AUTO_INCREMENT, city VARCHAR(50) not null, population TINYINT(11) NOT NULL, PRIMARY KEY (id));`


- Populate tables "schools" and "cities" by importing the .csv tables in a database manager such as Sequel Pro or TablePlus. [Schools Table](https://docs.google.com/spreadsheets/d/1FI84o7h2kZho0xvpw5f4r3-8LSXVAJrsnGgk33tVW7U/edit?usp=sharing) , [Cities Table](https://docs.google.com/spreadsheets/d/1Nga06CnlZ1_4TxYAL_edX3c2_k4hzNk4tO1iJyFkNmk/edit?usp=sharing)

### Begin
Run `yarn start` in the parent folder in your terminal.


_This is a student project that was created at [Codely](http://codely.tech), a full stack development bootcamp in Barcelona._