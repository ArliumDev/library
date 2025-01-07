// Modal handling

const dialog = document.querySelector("dialog");
const newBook = document.querySelector(".new-book");
const addBook = document.querySelector(".add-book");
const cancel = document.querySelector(".close-modal");

newBook.addEventListener("click", () => dialog.showModal());

addBook.addEventListener("click", (event) => {
  addBookToLibrary();
  dialog.close();
  event.preventDefault();
})

cancel.addEventListener("click", (event) => {
  dialog.close()
  event.preventDefault();
});

// 'Library' storage

const myLibrary = [];

// 'Book' object constructor

function Book(author,title,pages,read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

// Books storaging

function addBookToLibrary() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const bookData = {};
  for (const [key,value] of formData.entries()) {
    bookData[key] = value;
  }

  const readStatus = form.querySelector('input[value="yes"]:checked');
  bookData.read = readStatus ? 'yes' : 'no';

  const newBook = new Book(bookData.author, bookData.title, bookData.pages, bookData.read);
  myLibrary.push(newBook);
  console.log(myLibrary);
}