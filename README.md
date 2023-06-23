Project Title: Url Shortener

----------------Project Description-------------------------------------

Point1 :---
Developed a web application using React, Node.js, MongoDB, Express, and Chakra UI to shorten long URLs and generate QR codes for the shortened URLs, similar to TinyURL.

Point2:---
Implemented user authentication and authorization using JWT (JSON Web Tokens), providing secure access to registered users

Point3:--
Leveraged MongoDB Atlas as the database to store user information and also store URLs.

Point4:---
Utilized React to create an intuitive and responsive user interface for seamless user experience.

Point5:--
Developed a Node.js backend using Express, handling HTTP requests and establishing a connection to the MongoDB Atlas database.

Point6:-- 
Designed a database schema and employed Mongoose for modeling user information and URL data.

Point7:--
Implemented URL shortening functionality by generating unique short codes for long URLs and storing the mapping in the database.

Point8:--
Integrated a QR code generation library (qrcode) to dynamically generate QR codes for the shortened URLs.

Point9:--
Utilized Chakra UI to create a visually appealing and user-friendly frontend, enabling smooth interaction with the application.

------------How to run the Project---------------------
start backend in one terminal by writing    nodemon index.js
start frontend in another terminal by writing     npm start

dependencies for backend
"dependencies": {
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.2.0",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.3.0",
    "nanoid": "^4.0.2",
    "nodemon": "^2.0.22",
    "qrcode": "^1.5.3",
    "shortid": "^2.2.16"
  }

  dependencies for frontend
   "dependencies": {
    "@chakra-ui/hooks": "^2.2.0",
    "@chakra-ui/icons": "^2.0.19",
    "@chakra-ui/react": "^2.7.1",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "autosize": "^6.0.1",
    "axios": "^1.4.0",
    "file-saver": "^2.0.5",
    "framer-motion": "^10.12.16",
    "qrcode": "^1.5.3",
    "qrcode.react": "^3.1.0",
    "react": "^18.2.0",
    "react-copy-to-clipboard": "^5.1.0",
    "react-dom": "^18.2.0",
    "react-download-link": "^2.3.0",
    "react-icons": "^4.9.0",
    "react-qrcode": "^0.3.6",
    "react-router-dom": "^6.13.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },


Internal Working of project

first when you at home page you to register and data is post to backend with help axios that check validation and of data and stored the user information in database accorrding to user schema with password  and token is generated and in frontend the user data is stored in localstorage .

when you call any api from frontend then in backend in middleware folder in protect.js the verifyToken chen authorization of user 

when you came to UrlPage ,we take input as two think long url and note this post to backend via axios generate shortid associated with long url hence short url also youcan generate QR code for short Url by clicking on qrcode and also download it to check short url generated is correct you can click on visit icon you can visit to the page .

In left hand side there is search option when you click that ,left modal is open (using chakra ui) and you search the url acc to anything (long url,shorturl note) when you click on card a modal open in which you update the note assoiciated (put request)  with it , download qr code  

in right side there is profile icon you can click on profile icon to see your profile and logout from website when you logout the stored info in localstorage is deleted if you again came you have to again login, if you didn't logout if you visit next time you directly go to url page because info is still is stored in localstorage..


i think this is enough mostly making api in backend and call it from frontend and storing data in database is learning takeaway from this project


Reference 

Chakra Ui 
logrocket website
chat gpt for some css
stackoverflow for bugs
# urlshortener
