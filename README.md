# Getting Started with the App

## Node Version for Environment

Please install Node version 20 or greater to run the project and your Cypress E2E tests.

## Node Package Manager

Please ensure npm is installed and used when running the commands. You are welcome to use yarn or pnpm but the README is geared towards npm.

## Available Scripts

In the project directory, you can run:

### `npm install`
To install all the dependencies.

### `npm run start`
Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## About the Application

This is a proof of concept with minimal setup using React, TypeScript, and MUI.

- On landing, the page displays the cashiers list, giving the user options to select one of them and proceed further.
- It then navigates to the Sales Overview to show the sales of each cashier.
- Click on "Switch cashier" to change the cashier and click on "Add sale" to add more sales.
- It then navigates to the Submit Sales page, allowing the user to add more items.
- On submission, it updates the cashier with the additional sales amount and redirects to the Sales Overview page.
- The sales added can be viewed by hovering over the bar chart of the cashier.

## Guidelines
Please can you focus on quality of Cypress tests over quantity.
i.e: we'd love to see BDD, E2E, Cucumber and Cypress best practices, industry standards and good architecture used on a few tests rather than doing a huge set of tests with a basic setup.

### Mandatory
- Write scenarios in Cucumber/Gherkin format
- Add Step Definitions to connect the scenarios to code
- Implement E2E tests using Cypress

### Advantageous
- Page Object Pattern
- TypeScript

