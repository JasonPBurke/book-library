// let myTestLibrary = [
//   {
//     title: 'Hyperion',
//     author: 'Dan Simmons',
//     pages: 576,
//     read: true,
//   },
//   {
//     title: 'Fall of Hyperion',
//     author: 'Dan Simmons',
//     pages: 784,
//     read: true,
//   },
//   {
//     title: 'Endymion',
//     author: 'Dan Simmons',
//     pages: 699,
//     read: true,
//   },
//   {
//     title: 'Rise of Endymion',
//     author: 'Dan Simmons',
//     pages: 843,
//     read: false,
//   },
// ];

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? 'Completed' : 'Not Completed'
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function getBookInfo() {
  for (const book of myLibrary) {
    console.log(book.info());
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
const theEyeOfTheWorld = new Book(
  'The Eye of the World',
  'George R.R. Martin',
  832,
  true
);
const hyperion = new Book('Hyperion', 'Dan Simmons', 576, true);
const fallOfHyperion = new Book('Fall of Hyperion', 'Dan Simmons', 784, true);
const endymion = new Book('Endymion', 'Dan Simmons', 699, true);
const riseOfEndymion = new Book('Rise of Endymion', 'Dan Simmons', 843, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theEyeOfTheWorld);
addBookToLibrary(hyperion);
addBookToLibrary(fallOfHyperion);
addBookToLibrary(endymion);
addBookToLibrary(riseOfEndymion);

getBookInfo();

const bookContainer = document.getElementById('book-list');

for (const book of myLibrary) {
  const para = document.createElement('p');
  const node = document.createTextNode(book.info());
  para.appendChild(node);
  bookContainer.appendChild(para);
}
