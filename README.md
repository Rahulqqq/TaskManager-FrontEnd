# Task Management System
A web-based application for managing tasks efficiently. The system allows users to create, edit, delete, and manage tasks with priority levels. It also supports user authentication and authorization to ensure secure access.
## Features
  + Task Creation: Users can create new tasks with a title, description, and due date.
  + Task Management:
    +   View a list of tasks with pagination.
      +  Edit task details (title, description, and due date).
    +  Delete tasks with a confirmation prompt.
    + Update task statuses (e.g., pending, completed).
  + Priority Management:
     + Tasks can be assigned priority levels.
     + Move tasks between different priority categories.
+ User Authentication:
    + Register and login securely using hashed passwords.
    +   Authorization to ensure only logged-in users can access tasks.
+ Visual Representation:
    + Color-coded priority lists for easy distinction.
+ Responsive Design:
    +  Optimized for both desktop and mobile devices.

## Tech Stack
+ Frontend:
    + HTML, CSS, JavaScript (with React.js)
+ Backend:
   + Node.js, Express.js
+ Database:
    + MongoDB
+ Authentication:
  + JWT (JSON Web Tokens)
+ Styling:
  + CSS with a clean and responsive design
+ Development Tools:
    + Visual Studio Code
    + Postman (for API testing)
 
## Installation and Setup
Follow these steps to set up the project locally:
#### 1. Clone the Repository
    git clone https://github.com/<your-username>/task-management-system.git
    cd task-management-system
#### 2. Install Dependencies
Install both frontend and backend dependencies:
 <!---  Navigate to the frontend directory -->
    cd frontend
    npm install

 <!-- Navigate to the backend directory -->
      cd ../backend
      npm install
#### 3. Configure Environment Variables
 Create a .env file in the backend directory and add the following: 
 
    PORT=5000
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-secret-key
#### 4. Start the Application
Run the frontend and backend servers simultaneously:

    Start the backend server
    cd backend
    npm start

<!-- In a new terminal, start the frontend server -->
      
      cd frontend
      npm start
The application will be accessible at:
    + Frontend: http://localhost:3000
    + Backend: http://localhost:5000

## Usage
1. Register and Login:
    + New users can register with their name, email, and password.
    + Existing users can log in to access their tasks.
2. Task Management:
    + Create tasks with a title, description, due date, and priority.
    + Edit task details or mark tasks as completed.
    +  Delete tasks with a confirmation prompt.
3. Priority Visualization:
   + View tasks categorized by priority, with color-coded lists for easy identification.
  
## Project Structure

        task-management-system/
    ├── backend/               # Backend folder
    │   ├── models/            # MongoDB models (e.g., Task, User)
    │   ├── routes/            # API route handlers
    │   ├── middleware/        # Authentication middleware
    │   ├── server.js          # Entry point for backend
    │   └── .env               # Environment variables
    ├── frontend/              # Frontend folder
    │   ├── public/            # Public assets
    │   ├── src/               # React components and pages
    │   ├── App.js             # Main React app component
    │   ├── index.js           # React entry point
    │   └── package.json       # Frontend dependencies
    ├── README.md              # Documentation file
    └── .gitignore             # Files and folders to ignore in version control

## API Endpoints
### Authentication

    Method	Endpoint	Description
    POST	/api/users/register	Register a new user
    POST	/api/users/login	Log in a user
### Tasks
    Method	Endpoint	Description
    GET	/api/tasks	Fetch all tasks
    POST	/api/tasks	Create a new task
    GET	/api/tasks/:id	Get details of a specific task
    PUT	/api/tasks/:id	Update task details
    DELETE	/api/tasks/:id	Delete a task

## Future Enhancements
   + Add task reminders and notifications.
  +  Implement file attachments for tasks.
+    Allow sharing tasks with other users.
  + Add a dashboard with detailed analytics.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Commit your changes (git commit -m "Add feature").
4. Push to the branch (git push origin feature-name).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or support, please contact:

   + Name: Rahul Sharma
  + Email: rahul@example.com
  + GitHub: Rahulqqq
