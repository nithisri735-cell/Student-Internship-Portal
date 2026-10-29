# Student Internship Portal

## Project Overview
The Student Internship Portal is a web application that helps students explore internship opportunities and submit applications online. It uses React for the frontend, Node.js and Express for the backend, and MongoDB for data storage.

## Features
- Displays available internships with company names, durations, and descriptions.
- Allows students to view internship details.
- Provides an application form for student details.
- Validates required fields and email format.
- Submits applications using the Fetch API.
- Stores applications in MongoDB.
- Displays success and error messages.
- Uses asynchronous API operations with error handling.

## Technologies Used
- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose
- React Router DOM
- JavaScript
- CSS
- Git and GitHub

## Project Structure
```text
my-project/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── models/
│   ├── Application.js
│   └── todo.js
├── routes/
│   └── api.js
├── index.js
├── .env
└── README.md
```

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/internships` | Retrieve all internships |
| GET | `/api/internships/:id` | Retrieve one internship |
| POST | `/api/applications` | Submit a student application |
| GET | `/api/applications` | Retrieve submitted applications |

## Setup Instructions

### 1. Install dependencies
Run these commands from the project root:

```bash
npm install
cd client
npm install
cd ..
```

### 2. Configure environment variables
Create a `.env` file in the project root:

```env
MONGO_DB_URI=your_mongodb_connection_string
PORT=5000
```

Replace the example database value with your own MongoDB connection string. Do not commit real database credentials to GitHub.

### 3. Start the backend
From the project root:

```bash
npm run server
```

### 4. Start the frontend
Open another terminal:

```bash
cd client
npm run dev -- --host 0.0.0.0
```

Open the frontend using the URL provided by Vite or the Nimbus preview.

## Testing
- Verified that the internship API returns three internship records.
- Verified that the applications API retrieves stored applications.
- Submitted a test application through the React form.
- Confirmed that the submitted record was stored in MongoDB.

## Future Improvements
- Add authentication for students and administrators.
- Provide an administrator dashboard to manage applications.
- Add application status tracking.
- Add more internship opportunities.

## Author
Student project developed as part of the Student Internship Portal assignment.
