const library = document.querySelector('.library');

library.innerText = 'Hola';

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

function displayBooks() {
  library.innerHTML = '';
  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
    <h4>${book.title}</h4>
    <h5>${book.author}</h5>
    <p>${book.pages} pages</p>
    <p>Status: ${book.status}</p>
    `;
    library.appendChild(bookCard);
  });
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, 'not read yet');
addBookToLibrary('Mistborn: The Final Empire', 'Brandon Sanderson', 647, 'not read yet');
addBookToLibrary('The Maze Runner', 'James Dashner', 375, 'read');
displayBooks();
