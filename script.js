// Modal handling

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

// 'Book' object constructor

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

// Books storaging

const myLibrary = [];

function addBookToLibrary() {
  const bookData = bookDataFetch();
  const newBook = bookEntry(bookData);
  displayBook(newBook);
}

// New Book object creation with the user form data. Necessary to return bookData to allow other functions to access the latest data

function bookEntry(fetchedData) {
  const newBook = new Book(fetchedData.author, fetchedData.title, fetchedData.pages, fetchedData.read);
  myLibrary.push(newBook);
  console.log(myLibrary);
  return newBook;
}

// Retrieve data from user's input. Necessary to return bookData to allow other functions to access the latest data

function bookDataFetch() {
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

// Card display creator for new books with remove button to delete from both display and array

function displayBook(book) {
  const cardContainer = document.querySelector('.card-container');
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read}</p>
    <button class="remove-book">Remove</button>
  `;

  const removeButton = card.querySelector('.remove-book');
  removeButton.addEventListener('click', () => {
    const bookIndex = myLibrary.indexOf(book);
    if (bookIndex > -1) {
      myLibrary.splice(bookIndex, 1);
    }
    cardContainer.removeChild(card);
    console.log(myLibrary);
  });

  cardContainer.appendChild(card);
}

/* If I don't use 'return bookData' and 'return newBook', either bookEntry() or displayBook() could know if any changes have been appeared. 'Return' specifies a value to be returned to the function caller. In these cases, bookEntry(bookData) and displayBook(newBook) */