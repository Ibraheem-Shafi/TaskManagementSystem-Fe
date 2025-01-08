# App Setup, Overview, and Challenges Faced

## App Setup

### Prerequisites
- Node.js and npm
- MongoDB
- Environment Variables:
  - .env file is not deleted for your convenience

### Installation Steps
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add the required environment variables:
     ```
     SECRET_KEY
     NODE_ENV=development
     BACKEND_URL=http://localhost:5000/
     ```

4. **Start the Application:**
   ```bash
   npm start
   ```

5. **Run the Backend Server:**
   Navigate to the backend directory and start the server:
   ```bash
   cd backend
   npm install
   npm start
   ```

6. **Ensure MongoDB is Running:**
   ```bash
   mongod
   ```

## App Overview

### Features
1. **User Authentication:**
   - Registration, Login, Logout
   - JWT-based authentication (will be updated to httpOnly in  future)

2. **Task Management:**
   - Create, Read, Update, Delete (CRUD) tasks
   - Toggle task completion status

3. **Protected Routes:**
   - Middleware to authenticate users via JWT

4. **Error Handling:**
   - Proper error messages for authentication failures and server issues

5. **Frontend Integration:**
   - React-based frontend making API calls to the backend

### Technologies Used
- **Frontend:** React, Axios
- **Backend:** Node.js, Express, mongoose
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt.js

## Challenges Faced

### 1. **JWT Authentication Issues**
   - **Problem:** The JWT token was not being set correctly in the httpOnly cookie.
   - **Solution:**
     - Used localstorage for now.
     - Verified the token format and expiration settings.
     - Debugged with `console.log` to ensure the token is being set and verified correctly.

## Conclusion
Despite facing challenges during the development process, the application was successfully implemented with MVC architecture, robust authentication, task management features, and seamless frontend-backend integration. Future improvements may include enhanced error handling, additional user features, and scalability optimizations.

