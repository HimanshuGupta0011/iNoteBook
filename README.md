# iNoteBook

iNoteBook is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to manage their personal notes. The app includes a secure authentication system with JSON Web Tokens (JWT) for login and signup, as well as full CRUD functionality for creating, reading, updating, and deleting notes.

This project was developed as part of a learning journey while following the ReactJS course by CodeWithHarry on YouTube. It showcases how to implement a complete authentication and authorization system alongside a note management system in a full-stack environment.

## Features

- **JWT Authentication**: Secure login and signup functionality using JSON Web Tokens.
- **CRUD Operations**: Users can create, read, update, and delete notes.
- **Responsive Design**: Built with a responsive UI using React, ensuring a smooth user experience across devices.
- **RESTful API**: Backend built with Node.js and Express, providing RESTful routes for handling notes and user authentication.
- **MongoDB Integration**: Notes and user data are stored in a MongoDB database.

## Tech Stack

- **Frontend**: React, JavaScript, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Course**: [CodeWithHarry's ReactJS course](https://youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&si=dtpnDnsn4Wxd92Rn)

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:
   ```
       git clone https://github.com/HimanshuGupta0011/iNoteBook.git
   ```
2. Navigate to the project directory:
   ```
       cd iNoteBook
   ```
3. Install dependencies:
   - For the backend, navigate to the backend directory and run:
   ```
       npm install
   ```
   - For the frontend, navigate to the frontend directory and run:
   ```
       npm install
   ```
4. Set up environment variables:
   - Create a .env file in the backend directory.
   - Add the following variables:
   ```
       MONGO_URI=YOUR_MONGO_DB_URI
   ```
5. Start the backend server:
    ```
        cd backend
        npm run dev
    ```
6. Start the frontend:
    ```
        cd frontend
        npm start
    ```
7. Open your browser and go to http://localhost:3000 to see the app in action.

## Usage
- **Sign Up**: Create a new account by signing up with an email and password.
- **Log In**: Access your account by logging in with your credentials.
- **Manage Notes**: After logging in, you can create, edit, delete, and view your notes.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.
