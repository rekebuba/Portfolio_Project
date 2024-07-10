# CacheKeys

![CacheKeys Screenshot](./my-app/src/images/logoName.png)

## Project Description
CacheKeys is a web application designed to help users practice and improve their typing speed and accuracy. It provides engaging typing tests and tracks user progress over time.

### Features
- Real-time typing speed and accuracy tracking
- Progress tracking with detailed statistics
- Engaging and enjoyable typing content
- User-friendly interface

### Demo
Check out the live demo [here](https://cachekeys.com).

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [Acknowledgements](#acknowledgements)
5. [Contact](#contact)

## Installation

### Prerequisites
- Node.js
- Python
- MySQL

### Instructions
1. Clone the repository:
    ```bash
   git clone https://github.com/rekebuba/Portfolio_Project.git
2. Install dependencies for the models:
    ```bash
    pip install flask flask-cors flasgger sqlalchemy
3. Install dependencies for the frontend:
    ```bash
    cd ../my-app
    npm install --save react-scripts
4. prepares a MySQL Database for the project
    ```bash
    cat setup_mysql_dev.sql | mysql -uroot -p
5. Start the development server
    ```bash
    npm start
6. On a new Terminal
    ```bash
    KEY_MYSQL_USER=key_dev KEY_MYSQL_PWD=key_dev_pwd KEY_MYSQL_HOST=localhost KEY_MYSQL_DB=key_dev_db KEY_TYPE_STORAGE=db python3 -m api.v1.app
## Usage

- Open your browser and navigate to http://localhost:3000.
- Create an account or log in.
- Start a typing test and track your progress.

### API Reference

- GET /api/v1/tests: Fetch all typing tests
- POST /api/v1/tests: Submit a new typing test result

## Contributing
### Guidelines

We welcome contributions! Please follow these guidelines:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Open a pull request.

### Development Setup

- Ensure all dependencies are installed.
- Run the development server and make your changes.

## Acknowledgements

- Special thanks to the ALX program for the coding education and inspiration.
- Inspired by the typing practice websites I used during my learning journey.

## Contact

- GitHub: [My GitHub](https://github.com/rekebuba)
- Deployed Project: [CacheKeys](https://cachekeys.com)
- Landing Page: [CacheKeys Landing Page](https://rekebuba.github.io/Landing-Page/)
- LinkedIn: [My LinkedIn](https://linkedin.com/in/abubeker-abdullahi)

    ```vbnet
    Feel free to adjust the content and structure based on your specific project needs.
