
## Tech Stack

### Backend
- **Express.js:** This is a web application framework for Node.js. It simplifies the process of building APIs by providing a set of features and tools for creating robust and scalable server-side applications.
- **MongoDB:** A NoSQL database used to store survey form submissions. MongoDB is known for its flexibility and scalability, making it suitable for handling various types of data.
- **JWT (JSON Web Tokens):** JWTs are used for authentication. They allow the server to generate a token that can be sent to the client upon successful login. The client includes this token in subsequent requests, and the server uses it to authenticate and authorize the user.

### Frontend
- **React:** A JavaScript library for building user interfaces. React allows for the creation of reusable components, making it efficient for developing interactive and dynamic UIs.
- **React Router:** This library is used for navigation within the React application. It enables the definition of different routes, making it easy to manage different views or pages.

### Additional Libraries
- **axios:** A promise-based HTTP client for making requests to the server. Axios simplifies the process of handling HTTP requests and responses in the frontend.
- **dotenv:** This library is used to load environment variables from a `.env` file. It ensures that sensitive information, such as API keys or connection strings, is kept secure and separate from the source code.

## Local Setup

### Backend
1. **Install Node.js and npm:** Node.js is a JavaScript runtime, and npm is the package manager for Node.js. They are required to run the server and manage dependencies.
2. **Clone the repository:** Copy the project files to your local machine.
3. **Navigate to the `backend` directory:** Change the terminal's working directory to the backend folder.
4. **Create a `.env` file:** This file contains environment variables, including the server's port, MongoDB connection URL, and JWT secret key. An example `.env` file might look like this:
   ```env
   PORT=8000
   MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/Survey_App?retryWrites=true&w=majority
   JWT_SECRET_KEY=mysecretkey
   ```
   Replace `<username>` and `<password>` with your MongoDB credentials.
5. **Install dependencies:** Run `npm install` to install the required Node.js packages.
6. **Start the server:** Run `npm start` to launch the Express.js server.

### Frontend
1. **Navigate to the `frontend` directory:** Change the terminal's working directory to the frontend folder.
2. **Create a `.env.local` file:** This file contains the frontend's base URL, pointing to the deployed or local backend server. An example `.env.local` file might look like this:
   ```env
   VITE_BASE_URL=http://localhost:8000
   ```
   Replace the URL with the backend server's URL if different.
3. **Install dependencies:** Run `npm install` to install the required packages for the React application.
4. **Start the React application:** Run `npm run dev` to launch the React development server.

## Key Backend Routes
- **`GET /`**: Home route handled by `homeController.home`.
- **`POST /sign-up`**: User registration route handled by `userController.signUp`.
- **`POST /sign-in`**: User login route handled by `userController.signIn`.
- **`GET /sign-out`**: User logout route handled by `userController.signOut`.
- **`POST /create-survey`**: Survey creation route handled by `surveyController.createNewSurvey`.
- **`GET /get-survey`**: Survey retrieval route handled by `verifyToken` middleware and `surveyController.getSurvey`.

## Usage
This section provides instructions on how users can interact with the deployed application, such as accessing the survey form, submitting data, and logging in as an admin to view survey responses.

## Additional Notes
- Emphasizes the importance of proper configuration of environment variables in both backend and frontend.
- Suggests modifying the authentication middleware (`verifyToken`) based on specific security requirements.
- Encourages customization of the user interface components and styles to suit individual design preferences.
# evo-survey-backend
