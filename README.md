# <img src="https://raw.githubusercontent.com/merajfaizan/blooner-client/main/public/favicon.ico" alt="logo" width="20" /> Blooner | A Blood Donation Website

## Overview

**Blooner** is a comprehensive blood donation website designed to connect donors and recipients, streamline the blood donation process, and provide a platform for valuable information sharing. Users can register, update their profiles, create donation requests, and engage in the donation process. The website features role-based permissions, allowing administrators, volunteers, and donors to perform specific actions.

### Live Demo

Explore Blooner on the live website [here](https://blooner.web.app/).

### Server Code Repository

Access the server code on GitHub: [Blooner Server](https://github.com/merajfaizan/blooner-server).

## Technologies Used

- **React:** Frontend framework for building user interfaces.
- **React Router:** Declarative routing for React.js.
- **Tailwind CSS:** A utility-first CSS framework.
- **Express.js:** Backend framework for building server-side applications.
- **MongoDB:** NoSQL database for storing user and donation data.
- **Firebase:** Used for authentication services.
- **Context API:** For global state management.
- **Axios:** For data fetching and authorization.
- **SweetAlert2:** A responsive, customizable, and accessible replacement for JavaScript's popup boxes.
- **React Toastify:** A library for toast notifications.
- **React Helmet:** A component to manage the document head.

## Features

- **User Authentication:** Users can register, log in, and update their profile information.
- **Role-Based Permissions:** Admins, volunteers, and donors have specific permissions.
- **Donation Requests:** Users can create donation requests, and admins can manage the donation process.
- **Blog Creation:** Admins and volunteers can create, edit, publish, and delete blog posts.
- **User Management:** Admins can block/unblock users, change user roles, and view user lists with pagination and filters.
- **Dashboard:** Admins and volunteers share a dashboard to monitor donation requests and registered donors.

## Installation and Usage

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/blooner.git
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:** <br/>
   Create a .env file in the root directory for client-side configurations.
   ```bash
   REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID=your-firebase-app-id
   REACT_APP_SERVER_API_URL=http://localhost:5000  # Update with your server URL
   ```
4. **Start the Application:**

   ```bash
   npm run dev
   ```

   The application will be running at http://localhost:3000 by default.

## Server Installation

For server installation and configuration, refer to the [Blooner Server Repository](https://github.com/merajfaizan/blooner-server).

## Contributing

1. We welcome contributions! If you'd like to contribute to Rooms.

## Contact

1. For inquiries and support, contact us at [merajfzn@gmail.com](mailto:merajfzn@gmail.com).
