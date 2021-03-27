# NodeJS Chat

## Description
A chat application built with NodeJS and React.

## Installation
Move into the project folder and install the dependencies.
```
npm install
```

## Run the server
```
npm start
```
It will build the React app before starting the server.

## How does it work
Each client is identified by a username prompted at the beginning of the session. Other clients won't be able to connect if they try to use an username that is already connected. <br/>
Every message will be broadcasted to all the clients.

## Stored messages
All messages and usernames are saved in the local database.
To reset the storage, delete the `messages.db` file in the `./db` folder.
