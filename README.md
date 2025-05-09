# User Task Management System

A React-based task management application with user authentication and role-based access control. The application allows users to create, view, edit, and delete tasks, with different permissions for admin and regular users.

## Features

- 🔐 JWT-based authentication
- 👥 Two user types: Admin and Regular User
- 📋 Task management (Create, Read, Update, Delete)
- 🎯 Task status tracking (Not Started, In Progress, Completed)
- 👤 User-specific task views
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/asherayub/user-task-management.git
cd user-task-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── context/        # React context providers
├── pages/          # Page components
├── App.tsx         # Main App component
├── main.tsx        # Application entry point
└── tasks.json      # Mock task data
```

## Authentication

The application uses a mock authentication system with the following credentials:

### Admin User
- Username: `admin`
- Password: `admin123`

### Regular User
- Username: `user`
- Password: `user123`

## Features by User Type

### Admin
- Create new tasks
- Edit existing tasks
- Delete tasks
- View all tasks
- Change task status

### Regular User
- View tasks
- Change task status
- Filter tasks by status

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- React Icons
- date-fns