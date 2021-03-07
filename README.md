[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

# BootCamp_Project2

## Deployed on Heroku
https://flux-im.herokuapp.com/

## Description
A light weighted chat room application ultilizing the power of Socket.IO and MVC design pattern. Flux-IM utilizes a basic user login system to remember customizable user information, such as avatars and usernames.

## Technology Used
* Node.js
* Express.js
* MySQL
* HTML 5
* CSS 3
* Javascript
* jQuery
* Ajax
* Bootstrap 5
* Heroku
* RESTful API
* Macha.js
* Chai.js
* ESlint

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contact](#contact)
* [License](#license)

## Installation
This app can be installed locally by downloading the repo, and requires an existing local MySQL database server. After downloading the repo, run 'npm install' to install the required packages. Use the schema in the /db folder to create the required database and tables in your local SQL server. Create a file in the root folder called ".env" with the variable "SQL_PASSWORD = ..." where ... is the root password for your server.

## Usage
Run 'node server' to start the server, then navigate to http://localhost:8080 in any browser to view the app.

![Homepage](./screenshots/login.png =250x)
![Signup](./screenshots/signup.png =250x)
![Room Select](./screenshots/roomlist.png =250x)
![Chatroom](./screenshots/chatroom.png =250x)

## Contact
If you have any questions, email me at richard.yang.tong@gmail.com.

## Team Members
* Chang Xiao - Project Manager, visit his [GitHub](https://github.com/sinsinkun)
* Sam Kim - Full Stack Developer, visit his [GitHub](https://github.com/TalkingSkunk)
* Micheal Wong - Front End Developer, visit his [GitHub](https://github.com/Mwong228)
* Tong (Richard) Yang - Back End Developer/DevOps, visit his [GitHub](https://github.com/Dragontalker)

## License
Copyright (c) [2021] [Team Flux Capacitor]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
