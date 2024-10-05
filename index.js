const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Define an object on the server: book
let book = {
  title: 'The God of Small Things',
  author: 'Arundhati Roy',
  publicationYear: 1997,
  genre: 'Novel',
  isAvailable: true,
  stock: 5,
};

// Endpoint 1: Return the book object
app.get('/book', (req, res) => {
  res.json(book);
});

//Function to get the full title and author of the book
function getFullTitleAndAuthor(book) {
  return book.title + ' by ' + book.author;
}

//Endpoint 2: Access the full title and author of the book
app.get('/book/fulltitle-author', (req, res) => {
  let fullTitleAndAuthor = getFullTitleAndAuthor(book);

  res.json({ fullTitleAndAuthor: fullTitleAndAuthor });
});

//Function to get the genre and availability of the book
function getGenreAndAvailability(book) {
  return {
    genre: book.genre,
    isAvailable: book.isAvailable,
  };
}

//Endpoint 3: Access the genre and availability of the book
app.get('/book/genre-availability', (req, res) => {
  let genreAndAvailability = getGenreAndAvailability(book);
  res.json(genreAndAvailability);
});

// Function to calculate how old the book is
function calculateBookAge(book) {
  let currentYear = 2024;

  return currentYear - book.publicationYear;
}

// Endpoint 4: Calculate and return the age of the book
app.get('/book/age', (req, res) => {
  let bookAge = calculateBookAge(book);

  res.json({ age: bookAge });
});

// Function to get a summary of the book
function getBookSummary(book) {
  return (
    'Title: ' +
    book.title +
    ', Author: ' +
    book.author +
    ', Genre: ' +
    book.genre +
    ',  Published: ' +
    book.publicationYear
  );
}

// Endpoint 5: Return a summary of the book
app.get('/book/summary', (req, res) => {
  let summary = getBookSummary(book);
  res.json({ summary: summary });
});

// Function to check stock and determine if an order is needed
function checkStockAndOrder(book) {
  if (book.stock > 0) {
    return { status: 'In Stock', stock: book.stock };
  } else {
    return { status: 'Out of Stock', message: 'Order Required' };
  }
}

// Endpoint 6: Check stock and order status
app.get('/book/stock-status', (req, res) => {
  let stockStatus = checkStockAndOrder(book);
  res.json(stockStatus);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
