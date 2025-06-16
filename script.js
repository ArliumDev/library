// DOM

// // Display
const library = document.querySelector('.library');
const modal = document.querySelector('.input-modal');
const bookForm = document.querySelector('.book-form');

// // Inputs
const entryTitle = document.querySelector('#title');
const entryAuthor = document.querySelector("#author");
const entryPages = document.querySelector("#pages");

// // Modal buttons
const newEntry = document.querySelector('.new-entry');
const cancelEntry = document.querySelector('.form-cancel');
const submitEntry = document.querySelector(".submit");

newEntry.addEventListener('click', () => {
  bookForm.reset();
  modal.showModal();
});
cancelEntry.addEventListener('click', () => modal.close());
submitEntry.addEventListener("click", (event) => {
  event.preventDefault();
  const entryStatus = document.querySelector('input[name="readStatus"]:checked')?.value;
  addBookToLibrary(entryTitle.value, entryAuthor.value, entryPages.value, entryStatus);
  modal.close();
})  

// Logic

const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleStatus = function() {
  this.status = this.status === 'read' ? 'not read' : 'read';
};

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  library.innerHTML = '';
  myLibrary.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', book.id);
    bookCard.innerHTML = `
      <h4>${book.title}</h4>
      <h5>${book.author}</h5>
      <p>${book.pages} pages</p>
      <p>Status: ${book.status}</p>
    `;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeBookFromLibrary(book.id);
    });
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = book.status === 'read' ? 'Not read' : 'Read';
    toggleBtn.addEventListener('click', () => {
      book.toggleStatus();
      displayBooks();
    });
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(toggleBtn);
    library.appendChild(bookCard);
  });
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, 'Not read');
addBookToLibrary('Mistborn: The Final Empire', 'Brandon Sanderson', 647, 'Not read');
addBookToLibrary('The Maze Runner', 'James Dashner', 375, 'Read');
displayBooks();
