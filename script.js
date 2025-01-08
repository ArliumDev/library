// Modal Handling
const dialog = document.querySelector('dialog');
const newBook = document.querySelector('.new-book');
const addBook = document.querySelector('.add-book');
const cancel = document.querySelector('.close-modal');

newBook.addEventListener('click', () => dialog.showModal());
addBook.addEventListener('click', (event) => {
  addBookToLibrary();
  dialog.close();
  event.preventDefault();
});
cancel.addEventListener('click', (event) => {
  dialog.close();
  event.preventDefault();
});

// Book Constructor and Prototype
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read === 'yes'; // Convert 'yes'/'no' string to boolean
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Book Storage
const myLibrary = [];

function addBookToLibrary() {
  const bookData = fetchBookData();
  const newBook = createBookEntry(bookData);
  displayBook(newBook);
}

// Retrieve book data from form
function fetchBookData() {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const bookData = {};

  for (const [key, value] of formData.entries()) {
    bookData[key] = value;
  }

  const readStatus = form.querySelector('input[value="yes"]:checked');
  bookData.read = readStatus ? 'yes' : 'no';
  return bookData;
}

// Create new Book object and add it to myLibrary
function createBookEntry(fetchedData) {
  const newBook = new Book(fetchedData.author, fetchedData.title, fetchedData.pages, fetchedData.read);
  myLibrary.push(newBook);
  return newBook;
}

// Display Book on screen
function displayBook(book) {
  const cardContainer = document.querySelector('.card-container');
  const card = document.createElement('div');
  card.classList.add('card');

  const bookIndex = myLibrary.indexOf(book);

  card.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? 'Yes' : 'No'}</p>
    <button class="toggle-read" data-index="${bookIndex}">${book.read ? 'Unread' : 'Read'}</button>
    <button class="remove-book" data-index="${bookIndex}">Remove</button>
  `;

  // Add Event Listeners
  card.querySelector('.toggle-read').addEventListener('click', () => toggleReadStatus(book, card));
  card.querySelector('.remove-book').addEventListener('click', () => removeBook(book, card));

  cardContainer.appendChild(card);
}

// Toggle Read Status
function toggleReadStatus(book, card) {
  book.toggleRead();
  const toggleReadButton = card.querySelector('.toggle-read');

  // Update the button text
  toggleReadButton.textContent = book.read ? 'Unread' : 'Read';

  // Update the Read status paragraph (the one before the button)
  toggleReadButton.previousElementSibling.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
}

// Remove Book from Library and Display
function removeBook(book, card) {
  const bookIndex = myLibrary.indexOf(book);
  if (bookIndex > -1) {
    myLibrary.splice(bookIndex, 1);
  }
  card.remove();
  console.log(myLibrary);
}