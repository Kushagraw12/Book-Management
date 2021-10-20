# Book-Manager
Welcome to the Book Manager!
<br />

# Installation
The project conatains 3 directories ```frontend```, ```backend``` and ```Photos```.
<br />
<br />
To start the Backend server:

 - Goto ```backend``` folder in your terminal
 - Run ```npm install``` 
 - Run ```npm start```

This should start the backend server
<br />
You can test whether the server is up or not by clicking on <a href="https://localhost:5000/">localhost:5000/</a>.
<br />
This should give you <b>```We are live```</b> message!
<br />
<br />
To start the Frontend server:

 - Goto ```frontend``` folder in your terminal
 - Run ```npm install```
 - Run ```npm start```

This should start the frontend server
<br />
You can test whether the server is up or not by clicking on <a href="https://localhost:3000/">localhost:3000/</a>.
<br />
This page will bring you to the Login page.

# Credentials
### Admin:
<b>Email</b>: admin@gmail.com
<br />
<b>Password</b>: admin

### User:
<b>Email</b>: user@gmail.com
<br />
<b>Password</b>: user

# Features
### User Features
1. Issue a book from the library
2. Return a book already issued by the user
3. Search a book by its Title, Author Name and Year of Publication
4. See the most frequently issued books

### Admin Features
... All the normal User features plus, 
1. Add a new Book to the library 
2. Change the number of copies of an already existing book in the library 
3. Delete a Book from the library

<br />
<b>Please find the screenshots of different pages in Photos directory.</b>
<br />
<br />

# About the Database

The ```User``` databse contains the following fields:
1. _id
2. firstName (string)
3. lastName (string)
4. password (string)
5. emailid (string)
6. books (Array) [Contains the id of the books this user has issued]
7. isAdmin (boolean)

<br />

The ```Books``` databse contains the following fields:
1. _id
2. title (string)
3. author (string)
4. year (string)
5. copies (number) [The number of copies of this book available in the library]
6. borrowed (number) [The number of times this book has been issued so far]