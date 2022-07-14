## Planner App
A ToDo application that takes a few extra steps to make a user's experience more personalised. Built with Next.JS, TypeScript, various React libraries such as Styled-Components and Formik with Yup (for frontend and backend validation). Utilises NextAuth as an authenication service is connceted to a MongoDB database through Mongoose.JS.

## Project Status
This project is currently in development. Users will be able to create and save cards that represent tasks. Each card contains a title, description, due date and time and a completed status. Backend is currently in development.

#### Tasks currently in progress
- Unit testing backend API
- Reset password for user authentication
- Saving of cards through localstorage when user is not logged in

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install` 

Extra setup:

Create a `.env` file. It will require the following:
GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET - https://www.youtube.com/watch?v=HtJKUQXmtok&ab_channel=CooperCodes the first 2 minutes explains exactly how to setup an OAuth2 client.
NEXTAUTH_URL - When deploying to production, set the NEXTAUTH_URL environment variable to the canonical URL of your site.
MONGODB_URI - The URI string that is provided once you have created a MongoDB Atlas cloud database.
NEXT_PUBLIC_API_MOCKING - set as true or false to enable mocking api for `MSW`.

To Run Test Suite:  

`npm run test`  

To Start Server:

`npm run build`  
`npm run start`  

To Visit App:

`localhost:3000` 