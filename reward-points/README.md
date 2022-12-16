# Getting Started with Reward Points App

To run this project, you need a server that provides the transaction history of customers. The server has to be running at all times during the session.

This project has two main folders:
reward-points (Client)
server (Server)

The server is developed in node JS and express framework.
The client is developed in ReactJS (Functional components).

# Steps to run the application

Go to the folder "server" and run: "npm install"
Once the node_modules are succesfully installed, run: "node server.js". This will run the server in port 4000.

Note that the CORS is enabled only for the client which runs on port 3000.

Once the server is up and running, go to the other folder "reward-points" and run "npm install" to add the node_modules for client.

Once the node_modules are installed, run "npm start" to run the client application. The application will compile and run in port 3000.

Open the browser and enter "http://localhost:3000" to start the application.

Enter the customerID and click on "Get Statement". We are currently getting 9 customers from the backend. Their ids are ranging from 1001 - 1009. If we enter any id that is not within the range, we will get an error printed on the screen.

Also make sure that the server is up and running in port 4000. We will get a different error (Server not running) if the node JS server is not running.

There are two components in the application:
STATEMENT OVERVIEW for the last three months (statementOverview.js). This will list all the transactions of the customer for the last three months and the rewards earned per transaction. Note that the rewards are only earned for "debit" transaction types.

REWARDS OVERVIEW for the last three months and total (rewardsOverview.js). The data is being sent as props to this component from statementOverview component to avoid multiple operations.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
