# social-network-api
Homework 18 NoSQL: Social Network API

## Table of Contents
1. [Description](#Description)
2. [User-Stories](#User-Stories)
3. [Acceptance-Criteria](#Acceptance-Criteria)
4. [Installation](#Installation)
5. [Recorded Video](#Recorded-Video)
6. [Questions](#Questions)

# Description
***
###### [Back to Table of Contents](#Table-of-Contents)
The assignment was to create a social media api from scratch that would create new users, update their information (including associated friends and thoughts) and delete/remove users; as well create, update and delete users' thoughts and reactions. This was built using Mongoose and Express.

## User Stories
***
###### [Back to Table of Contents](#Table-of-Contents)
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
***
###### [Back to Table of Contents](#Table-of-Contents)
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

# Installation
***
###### [Back to Table of Contents](#Table-of-Contents)
1. Clone the repository to your local machine and run 'npm install' to install all corresponding modules.
2. Create a new/update .env file in the main directory with your mysql credentials
    DB_NAME = 'eccomerce_db'
    DB_USER = 'root'
    DB_PASSWORD = 'enter your password here!'
3. Run 'mysql -u root -p' to ensure that you are logged into MySQL
4. Source the seed data by running 'SOURCE db/schema.sql' and then type 'quit' to exit MySQL
5. Run 'npm run seed'
6. Run 'node seeds/index.js'
7. Start the server using 'npm start' and go! :) 


## Recorded Video
***
###### [Back to Table of Contents](#Table-of-Contents)
https://drive.google.com/file/d/1PvfVWD0bO501SJ0D_Tbly_GH_5zJQsQB/view


## Credits
***
###### [Back to Table of Contents](#Table-of-Contents)
GT Bootcamp Tutors

## License
***
###### [Back to Table of Contents](#Table-of-Contents)
MIT

# Questions
***
###### [Back to Table of Contents](#Table-of-Contents)
Review my GitHub Repo: https://github.com/jae-as
Email me: janaee.as.wallace@gmail.com

