<div align=center>

![Blog](https://i.ibb.co/5K8HkWN/blogggg.webp)

### ❝ A full-stack personal blogging platform with an authenticated Express.js API for admin post management and user commenting capabilities, powered by a reactive React.js frontend. ❞

<br>
  <p>
    ❯ &nbsp;
    <a href="https://blogggg-frontend.vercel.app/">View Demo</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/0xabdulkhalid/blogggg/issues">Report Bug</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/0xabdulkhalid/blogggg/issues">Request Feature</a>
     &nbsp; ❮
  </p>
</div>
<br>

</div>

## Project Objectives

- Implemented frontend using ReactJS and TailwindCSS with the ability to utilize RESTful API, comes with an Admin Portal where the Admin can manage posts and normal users can do comment on them.

- Utilized [react-markdown-editor](https://www.npmjs.com/package/@uiw/react-markdown-editor) as a text editor while creating posts and also used to preview them for users.
- Implemented a [RESTful API](https://github.com/0xabdulkhalid/blogggg-backend) which serves as a backend for this application, built using Express.js. It follows the principles of RESTful API design:
  - **Resources**: The API models and exposes resources such as blog posts, users, and comments as JSON data.
  - **HTTP Methods**: It uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on these resources.
  - **Routes**: The API defines routes (endpoints) that map to the different resources and operations. For example, `/blog` for blog post-related operations, `/user` for user management, and `/comments` for handling comments.
  - **JSON Responses**: Responses from the API are sent in JSON format, making it easily consumable by the React.js frontend or any other client application.
- The API is designed to be consumed by the React.js frontend, following the principles of separation of concerns between the client and server components of the application.
- Managed sessions using [express-session](https://www.npmjs.com/package/express-session) middleware, and to utilize [connect-mongo](https://www.npmjs.com/package/connect-mongo) to store sessions in MongoDB. which helps to retrieve and to persist sessions even after api's restart.
- Implement user authentication using the [PassportJS](https://www.passportjs.org/) middleware in our Express App.
- Secure passwords (hashing and salting) with [bcryptjs](https://www.npmjs.com/package/bcryptjs) package.
- Utilized [mongoose](https://www.npmjs.com/package/mongoose) to predefining modals to operate with MongoDB database to store users, messages, and session data as collections.
- Deployed the API to production with proper security measures like hiding keys with Environment Variables (`env`) using [Dotenv](https://www.npmjs.com/package/dotenv) package.

<br>

## Tech Stack

<div align=center>

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) &nbsp;&nbsp; ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) &nbsp;&nbsp; ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) &nbsp;&nbsp; ![Express JS](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) &nbsp;&nbsp; ![Mongoose](https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white) &nbsp;&nbsp;![Passport](https://img.shields.io/badge/Passport-34E27A.svg?style=for-the-badge&logo=Passport&logoColor=white)

</div><br>

## Tools Used

<div align=center>

![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) &nbsp;&nbsp;![Google](https://img.shields.io/badge/google-DA4437?style=for-the-badge&logo=google&logoColor=white) &nbsp;&nbsp;![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
&nbsp;&nbsp;![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) &nbsp;&nbsp;![Visual Studio Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) &nbsp;&nbsp;![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) &nbsp;&nbsp;![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) &nbsp;&nbsp;

</div><br>

## Let's Connect 👋

<div align=center>
  <a href="https://linkedin.com/in/0xabdulkhalid" >
    <img src="https://img.shields.io/badge/linkedin-%2300acee.svg?color=405DE6&style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin Profile">
  </a>&nbsp;&nbsp;
  <a href="mailto:0xabdulkhalid@gmail.com" target="_blank">
    <img src="https://img.shields.io/badge/gmail-%23EA4335.svg?style=for-the-badge&logo=gmail&logoColor=white" alt=mail/>
  </a>&nbsp;&nbsp;
  <a href="https://www.github.com/0xabdulkhalid/" >
    <img src="https://img.shields.io/badge/Github-131313?style=for-the-badge&logo=github&logoColor=white" alt="Github Profile">
  </a>
</div>

<br>
