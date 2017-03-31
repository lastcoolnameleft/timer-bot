# Main

This project demonstrates a framework for allowing a team to interact with a common service using shared code.  In this example, the user can start and stop a named timer using either Microsoft Bot Framework or a UI (React).

In addition, if the bot does not have enough information about the timer (e.g. the timer name), it will prompt the user for more information, until all of the required files are provided.

While the majority of this code is used to glue all of the technologies together, it is intended as an application platform that a developer can use to easily integrate other UI/Bot interactions.  It was designed to keep the business logic separate from the presentation logic. (See src/lib/core.js, src/bot/dialogs.js and src/components/Timer/index.js)

*But wait, there's more!* This application has a respective Dockerfile which can be used for testing the application locally and deploying remotely with ease.

# Foundation

This project combines the following technologies:
* [Microsoft Bot Framework](https://dev.botframework.com/)
* [Bot Framework WebChat](https://github.com/Microsoft/BotFramework-WebChat)
* [Ngrok](https://ngrok.com/)
* [Language Understanding Intelligent Service](https://www.luis.ai/)
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [React Router + Express](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d#.73wm0a32s)
* [bot-luis-form](https://github.com/CatalystCode/bot-luis-form)

# Directory structure

* /public - Web site entry point
* /server - Express.js server setup
* /src/bot - LUIS Form code
* /src/component - React Components
* /src/lib - The shared code that the Bot Framework and the UI utilize
* /src/* - Misc Express route code

This dir structure is mainly an artifact of the projects used to bootstrap this project.

# Development

In separate windows:

*Start Yarn*
```
yarn install
yarn start
```

*Start Ngrok*
```
ngrok http 9000
```

*Start service*
```
export MICROSOFT_APP_ID=<BOT ID>
export MICROSOFT_APP_PASSWORD=<BOT PASSWORD>
export LUIS_ENDPOINT_URL=<LUIS URL>
export BASE_TIMER_URL=<ngrok URL> + '/api/timer' (e.g. https://13fa9ed1.ngrok.io/api/timer/)
node server
```

# Docker

Assuming you have all of the env vars set, you can run the package, locally in docker as such:
```
docker run --rm -tp 9000:80 -e MICROSOFT_APP_ID=$MICROSOFT_APP_ID -e MICROSOFT_APP_PASSWORD=$MICROSOFT_APP_PASSWORD -e LUIS_ENDPOINT_URL=$LUIS_ENDPOINT_URL -e BASE_TIMER_URL=$BASE_TIMER_URL -e PORT=80 lastcoolnameleft/timer-bot-ui
```
