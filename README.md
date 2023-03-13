<h1 align="center">WeneaTest - Web test</h1>

<p align="center">
  <img src="src/assets/images/wenea-logo.png" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <i>Wenea offers intelligent charging and energy management solutions through its platform and fast charging network,
    <br> thus facilitating the adoption of the electric vehicle and fulfilling the promise that users will always have charging available.</i>
  <br>
</p>

<p align="center">
  <a href="https://wenea.com/international/"><strong>wenea.com/international</strong></a>
  <br>
</p>

## What is this project about?

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

Web project for tecnhical [Wenea](https://wenea.com/international/) test. 
Simply displays a personalized dashboard that will include a login and registration. 

## Development Setup

### Prerequisites

- Install [Node.js] which includes [Node Package Manager][npm]

### Setting Up a Project

Install the Angular CLI globally:

```
npm install -g @angular/cli
```

Run the application:

```
cd [PROJECT NAME]
ng serve
```

Angular is cross-platform, fast, scalable, has incredible tooling, and is loved by millions.

## Functionalities - Goals to meet

- The user must be able to create a new account and log in with said data introduced.
- Once logged in, you can modify said data.
- You will be able to see different types of charts on the dashboard.

## Bootstrap Component Library

This project uses the Bootstrap component library. You can find documentation and examples on the [official Bootstrap website](https://getbootstrap.com/docs/5.1/components/).

## Chartjs and Chartist for charts and graphs

This project uses the [Chart.js](https://www.chartjs.org/docs/latest/) and [Chartist.js](https://gionkunz.github.io/chartist-js/index.html) libraries for creating charts and graphs.

## Firebase Authentication with Identity Platform

This project uses Firebase Authentication with Identity Platform for user authentication. You can find more information on the [Firebase website](https://firebase.google.com/docs/auth).

## Consuming REST API

This project consumes a REST API using the `HttpClient` module in Angular. The API endpoint for updating user credentials is located at `/api/user/:id` where `:id` is the user's unique identifier.
