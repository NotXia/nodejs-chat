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

## How it works
Each client is identified by a username promted at the beginning of the session.
Every message is broadcasted to the connected clients.

## Stored messages
All messages are saved in the local database, as well as the usernames.
To reset the storage, delete the `messages.db` file in the `./db` folder.
