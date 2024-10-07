# Imaginarium: Your AI Character Workshop

Imaginarium is a web application that allows users to create and interact with unique AI-powered characters.  Craft intricate character profiles, define their personalities, and engage in dynamic conversations. Unleash your creativity and build a world of your own!

[![Imaginarium Screenshot](screenshots/1.png)]

## Features

* **Character Creation:** Design detailed characters with names, descriptions, and backstories.
* **AI-Driven Conversations:**  Chat with your characters using a powerful language model.  *(Currently disabled - see Future Development)*
* **Character Management:** Easily view, edit, and delete your created characters.
* **Secure Authentication:**  User accounts are protected with Firebase authentication.
* **Responsive Design:** Enjoy a seamless experience across desktop and mobile devices.


## Future Development

* **Re-enable AI Integration:**  Re-integrate Gemini or another suitable language model to power dynamic and engaging character conversations.
* **Character Image Upload:** Allow users to upload images for their characters to further personalize them.
* **Story Creation Tools:** Expand the platform to include tools for writing and sharing stories featuring created characters.
* **Community Features:**  Implement features for users to share and discover characters created by others.
* **Enhanced Chat Interface:**  Improve the chat interface with features like message history, character portraits, and customizable chat backgrounds.


## Tech Stack

* **Frontend:** React, React Router, Firebase (Authentication)
* **Backend:** Node.js, Express, MongoDB, Firebase Admin SDK, Gemini API (Currently disabled)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js and npm (or yarn) installed on your local machine.
* A MongoDB Atlas account (or a local MongoDB instance).
* A Firebase project set up with Authentication enabled.
* A Gemini API key (or API key for your chosen language model). Note: Currently disabled.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/qamar2315/Imaginarium.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Imaginarium
   ```
3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```
5. Configure environment variables:
    * Create `.env` files in both the `client` and `server` directories.
    * Refer to the `.env.example` files (create these if they don't exist) for the required variables.
    * Populate the `.env` files with your MongoDB URI, Gemini API key, and Firebase configuration details.
6. Start the development servers:
    * In the `server` directory: `npm start`
    * In the `client` directory: `npm start`

The application should now be running on `http://localhost:3000`.


## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

* Inspiration from various AI character platforms.
* Thanks to the open-source community for providing valuable tools and resources.


## Contact

* Qamar Ul Islam - [qamarislam4496@gmail.com](mailto:qamarislam4496@gmail.com)
* Project Link: [https://github.com/qamar2315/Imaginarium](https://github.com/qamar2315/Imaginarium)


**Key improvements:**

* **Clearer Structure:**  Sections for Features, Future Development, Tech Stack, etc., make the README easier to navigate.
* **Visual Appeal:**  A screenshot/GIF and potentially a project logo would greatly enhance the presentation.
* **Detailed Installation Steps:** Clear prerequisites and step-by-step instructions help users get started quickly.
* **Emphasis on Future Plans:**  Highlighting future development goals shows the project's potential and encourages contributions.
* **Professional Tone and Formatting:**  Consistent formatting, proper grammar, and a professional tone create a positive impression.
* **Call to Action:** Encouraging contributions, providing contact information, and including acknowledgments make the project more engaging.

