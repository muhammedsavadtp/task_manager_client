Task Manager Frontend - Installation and Setup
This is the frontend for the Task Manager application, built with Vite and React. It provides a user interface to manage tasks via a REST API.
Installation and Setup

Prerequisites:

Node.js (v16 or higher)
npm or yarn
A running backend server (see Backend README)


Clone the Repository:
git clone <frontend-repository-url>
cd frontend


Install Dependencies:
npm install
npm install axios react-toastify


Configure Environment Variables:Create a .env file in the frontend directory:
echo "VITE_API_URL=http://localhost:5000/api/tasks" > .env

Ensure VITE_API_URL matches the backend API URL (e.g., http://localhost:5000/api/tasks).

Run the Application:
npm run dev

The app will be available at http://localhost:5173 (or the port specified by Vite).


Troubleshooting

API Connection Issues: Verify the backend is running and VITE_API_URL is correct.
Dependency Errors: Delete node_modules and package-lock.json, then run npm install again.
Port Conflicts: Vite will prompt for a different port if 5173 is in use.

