# Main

This project is to demonstrate interacting with a user via both the Microsoft Bot Framework and via a UI using common code.

In this example, a user can start and stop a timer either through a UI or through a chatbot that will ask all of the necessary questions until all of the required fields are submitted.

# Foundation
* Bootstrap: [Create React App](https://github.com/facebookincubator/create-react-app).
* Add Express Routing: [React Router + Express](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.73wm0a32s)
* [Microsoft Bot Framework](https://dev.botframework.com/)

# Install

```
yarn install
```

# Development

In two separate windows:
```
yarn start
```

```
export MICROSOFT_APP_ID=<BOT ID>
export MICROSOFT_APP_PASSWORD=<BOT PASSWORD>
export LUIS_ENDPOINT_URL=<LUIS URL>
nodemon server
```

