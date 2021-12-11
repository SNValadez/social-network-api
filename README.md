# Social Network API

- This is an API for a social network web application where users can share their thoughts, react to their friends’ thoughts, and create a friend list. 
- The application uses NodeJS, Express, MongoDB and Mongoose to allow users, thoughts, friend lists and even thought reactions to be created, updated, and deleted.

## User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Project Criteria

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

## Video Link Demonstration

https://watch.screencastify.com/v/6JCLpbu2r9EBaN2NN4GJ 

A brief demonstration of the application provides the viewer with GET, POST, PUT, and DELETE methods for users and thoughts.
The application can also provide POST and DELETE methods for thought reactions and friend lists.

## Technologies

- JavaScript
- NodeJS
- Express
- MongoDB
- Mongoose

## Installation

- Please clone the GitHub repository to your local computer, etc.
- Please do an `npm install` **(and `npm init -y` in case package.json is missing)**
- Ensure Mongoose and Express are installed
- Start the server by running `npm start`
- Please change ports on the server.js in case PORT 3002 is in use
