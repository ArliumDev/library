// DOM

// // Display

const bookShelf = document.querySelector('.book-shelf');
const modal = document.querySelector('.input-modal');
const bookForm = document.querySelector('.book-form');

// // Inputs

const entryTitle = document.querySelector('#title');
const entryAuthor = document.querySelector('#author');
const entryPages = document.querySelector('#pages');

// // Modal buttons

const newEntry = document.querySelector('.new-entry');
const cancelEntry = document.querySelector('.form-cancel');
const submitEntry = document.querySelector('.submit');

// Logic

class MyLibrary {
  constructor() {
    this.library = [];
  }

  addBookToLibrary(book) {
    this.library.push(book);
    this.displayBooks();
  }

  displayBooks() {
    bookShelf.innerHTML = '';
    this.library.forEach((book) => {
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
        this.removeBookFromLibrary(book.id);
      });
      const toggleBtn = document.createElement('button');
      toggleBtn.textContent = book.status === 'read' ? 'Not read' : 'Read';
      toggleBtn.addEventListener('click', () => {
        book.toggleStatus();
        this.displayBooks();
      });
      bookCard.appendChild(removeBtn);
      bookCard.appendChild(toggleBtn);
      bookShelf.appendChild(bookCard);
    });
  }

  removeBookFromLibrary(id) {
    const index = this.library.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.library.splice(index, 1);
      this.displayBooks();
    }
  }
}

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
  }

  toggleStatus() {
    this.status = this.status === 'Read' ? 'Not read' : 'Read';
  }
}

const userLibrary = new MyLibrary();
const testBook1 = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'Not read');
const testBook2 = new Book('Mistborn: The Final Empire', 'Brandon Sanderson', 647, 'Not read');
const testBook3 = new Book('The Maze Runner', 'James Dashner', 375, 'Read');

userLibrary.addBookToLibrary(testBook1);
userLibrary.addBookToLibrary(testBook2);
userLibrary.addBookToLibrary(testBook3);

newEntry.addEventListener('click', () => {
  bookForm.reset();
  modal.showModal();
});

cancelEntry.addEventListener('click', () => modal.close());

submitEntry.addEventListener('click', (event) => {
  event.preventDefault();
  const entryStatus = document.querySelector('input[name="readStatus"]:checked')?.value;
  const newBook = new Book(entryTitle.value, entryAuthor.value, entryPages.value, entryStatus);
  userLibrary.addBookToLibrary(newBook);
  modal.close();
});
