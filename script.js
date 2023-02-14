// TODO: add a book search with autocomplete from an API inc book art for bg

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

const newBookButton = document.querySelector('.new-book-button');

function addNewBook() {
  console.log('ok you got here');
}

// TODO ask for an ISBN and add custom background if provided?
newBookButton.addEventListener('onClick', addNewBook());

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function getBookInfo() {
  const cardContainer = document.querySelector('.card-container');

  for (const book of myLibrary) {
    const card = document.createElement('div');
    card.classList.add('card');
    const cardTitle = document.createElement('h2');
    const titleNode = document.createTextNode(book.title);
    cardTitle.appendChild(titleNode);
    card.appendChild(cardTitle);
    const cardAuthor = document.createElement('h3');
    const authorNode = document.createTextNode(book.author);
    cardAuthor.appendChild(authorNode);
    card.appendChild(cardAuthor);
    const cardPages = document.createElement('p');
    const pagesNode = document.createTextNode(`Pages: ${book.pages}`);
    cardPages.appendChild(pagesNode);
    card.appendChild(cardPages);
    const cardCompleted = document.createElement('p');
    const completedNode = document.createTextNode(
      `Status: ${book.read ? 'Completed' : 'Not Completed'}`
    );
    cardCompleted.appendChild(completedNode);
    card.appendChild(cardCompleted);

    cardContainer.appendChild(card);
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
