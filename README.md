# Question Editor

This project is a Question Editor for a Radio Button Matrix

## Features
- [X] Ability to select images from the hard drive for every row and column.
- [X] Ability to set labels for every row and column.
- [X] Ability to add new rows and columns.
- [X] Ability to remove rows and columns.
- [X] A backend to store the data
- [X] A statistics pane on the right:
    - [X] Amount of rows created
    - [X] Amount of columns created
    - [X] Amount of images uploaded
    - [X] The string length of the longest row label
    - [X] The string length of the longest column label
- [X] Animations when adding a row or column

## How to run

## Frontend

1. **Clone Repository**

    `git clone https://github.com/camilaavilarinho/question-editor.git`

    `cd question-editor`

2. **Install Dependencies**

      `npm install`

3. **Run**

    `npm start`

## Backend

1. Database
Before run the backend is necessary to have mongoDB installed. If you don't have, check the installation guide [here](https://docs.mongodb.com/manual/administration/install-community/)

    start up MongoDB by executing the following command:

    `mongod`

    Create the MongoDB database instance by executing this commands in a different terminal tab:

    1. open mongodb client:
       `mongo`

    2. create a new database:
        `use questions`

2. Back to question-editor

   `cd question-editor`
   `cd server`

3. **Install Dependencies**

     `npm install`

3. **Run**
If you don't have nodemon installed globally execute the folllowing command:

    `npm install -g nodemon`

Then run the server:

     `nodemon server`

