# PetPulse

<div style="text-align: center;">
  <img src="https://res.cloudinary.com/dm8xhvx4t/image/upload/v1713422153/Your_paragraph_text_1_jux2by.png" alt="PetPulse Banner" style="max-height: 300px; margin: 0 auto;">
</div>

## Overview

PetPulse is a web application designed to help pet owners efficiently manage their pets' care and well-being. Whether you have one pet or multiple furry friends, PetPulse provides a convenient platform for scheduling reminders, tracking appointments, and staying informed about your pets' health needs.

## Visit Our Live Site

[PetPulse Website]()

## Backend Repository

[PetPulse Backend](https://github.com/YourUsername/PetPulse-Backend)

## Features

- **Pet Profile Management**: Create and manage profiles for each of your pets, including details such as name, species, breed, age, and photo.
- **Reminder System**: Schedule reminders for feeding times, medication doses, grooming appointments, vet visits, and other important pet-related tasks.
- **Customizable Reminders**: Customize reminder settings based on each pet's specific needs and requirements, ensuring personalized care and attention.
- **User Authentication**: Secure user authentication with token-based authentication for seamless and secure login functionality.
- **Responsive Design**: Enjoy a seamless user experience across various devices and screen sizes, thanks to PetPulse's responsive design.

## Technology Stack

- **Frontend**: Built using React.js for the frontend interface, with state management and UI interactions handled using functional components and hooks.
- **Styling**: Utilized Tailwind CSS for styling, combining pre-built utility classes with custom CSS for a sleek and modern user interface.
- **Backend**: Developed with Node.js and Express.js for the backend server, providing RESTful API endpoints for frontend interaction and data management.
- **Database**: Utilized PostgreSQL as the relational database management system for storing user and pet data securely.
- **User Authentication**: Implemented token-based authentication using JSON Web Tokens (JWTs) and bcrypt for password hashing to ensure secure user authentication and authorization.
- **Real-time Communication**: Integrated Socket.io to establish real-time communication between the frontend and backend, enabling the transmission of reminder data to the modal for reminders occurring within the next 5 minutes.

## Getting Started Locally

To run PetPulse locally on your machine, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database set up locally.

### Installation

1. **Clone the repository**

    ```sh
    git clone <repository-url>
    cd petpulse
    ```

2. **Install NPM packages**

    ```sh
    npm install
    ```

3. **Set up the Backend**

   Ensure that the backend API is running locally. Refer to the [PetPulse Backend](https://github.com/YourUsername/PetPulse-Backend) repository for instructions on setting up the backend.

4. **Start the Application**

    ```sh
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## User Stories

**Pet Profile Management**
As a pet owner, I want to create and manage profiles for each of my pets, including details such as name, species, breed, age, and photo.

**Reminder System**
As a pet owner, I want to schedule reminders for feeding times, medication doses, grooming appointments, vet visits, and other important pet-related tasks.

**Customizable Reminders**
As a pet owner, I want to customize reminder settings based on each pet's specific needs and requirements, ensuring personalized care and attention.

**User Authentication**
As a user, I expect secure user authentication with token-based authentication for seamless and secure login functionality.

**Responsive Design**
As a user, I expect a seamless user experience across various devices and screen sizes, thanks to PetPulse's responsive design.

## Stretch Goals

- **Socket.io Integration**: Implement Socket.io to establish real-time communication between the frontend and backend, facilitating the transmission of reminder data to the modal for reminders occurring within the next 5 minutes.
- **Advanced Styling with Tailwind CSS**: Enhance the visual appeal of the application by utilizing Tailwind CSS for styling, leveraging its utility-first approach to create well-designed components and layouts.
- **Token-Based Authentication**: Integrate token-based authentication for enhanced security and seamless user login functionality. Utilize tokens stored in local storage to manage user sessions and authentication state, ensuring secure access to protected routes and resources. Implement secure token handling mechanisms, such as token expiration and refresh, to maintain user authentication integrity and prevent unauthorized access.
