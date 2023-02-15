// TODO: add a book search with autocomplete from an API inc book art for bg

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

// TODO ask for an ISBN and add custom background if provided?

const modal = document.querySelector('.modal');
// console.log(modal);

function buildModal() {
  const modalFormContainer = document.createElement('form');
  modalFormContainer.setAttribute('action', '#');
  modalFormContainer.setAttribute('method', 'post');
  modalFormContainer.classList.add('modal-form-container');

  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'book_title');
  const titleLabelText = document.createTextNode('*Title');
  titleLabel.appendChild(titleLabelText);
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('id', 'book_title');
  titleInput.setAttribute('required', '');

  const authorLabel = document.createElement('label');
  authorLabel.setAttribute('for', 'book_author');
  const authorLabelText = document.createTextNode('*Author');
  authorLabel.appendChild(authorLabelText);
  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.setAttribute('id', 'book_author');
  authorInput.setAttribute('required', '');

  const IsbnLabel = document.createElement('label');
  IsbnLabel.setAttribute('for', 'book_Isbn');
  const IsbnLabelText = document.createTextNode(
    'ISBN Number --For Autocomplete--'
  );
  IsbnLabel.appendChild(IsbnLabelText);
  const IsbnInput = document.createElement('input');
  IsbnInput.setAttribute('type', 'text');
  IsbnInput.setAttribute('id', 'book_Isbn');

  const pagesLabel = document.createElement('label');
  pagesLabel.setAttribute('for', 'total_pages');
  const pagesLabelText = document.createTextNode('Pages');
  pagesLabel.appendChild(pagesLabelText);
  const pagesInput = document.createElement('input');
  pagesInput.setAttribute('type', 'number');
  pagesInput.setAttribute('id', 'total_pages');

  const statusFieldset = document.createElement('fieldset');
  const statusFieldsetLegend = document.createElement('legend');
  const fieldsetLegendText = document.createTextNode(
    'Have You Finished This Book?'
  );
  statusFieldsetLegend.appendChild(fieldsetLegendText);

  const haveReadDiv = document.createElement('div');
  const readStatusLabel = document.createElement('label');
  readStatusLabel.setAttribute('for', 'have_read');
  const readStatusLabelText = document.createTextNode('Completed');
  readStatusLabel.appendChild(readStatusLabelText);
  const readStatusInput = document.createElement('input');
  readStatusInput.setAttribute('type', 'radio');
  readStatusInput.setAttribute('name', 'read_status');
  readStatusInput.setAttribute('id', 'have_read');
  readStatusInput.setAttribute('value', 'have_read');

  const haveNotReadDiv = document.createElement('div');
  const notReadStatusLabel = document.createElement('label');
  notReadStatusLabel.setAttribute('for', 'have_not_read');
  const notReadStatusLabelText = document.createTextNode('Not Yet Completed');
  notReadStatusLabel.appendChild(notReadStatusLabelText);
  const notReadStatusInput = document.createElement('input');
  notReadStatusInput.setAttribute('type', 'radio');
  notReadStatusInput.setAttribute('name', 'read_status');
  notReadStatusInput.setAttribute('id', 'have_not_read');
  notReadStatusInput.setAttribute('value', 'have_not_read');

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('form-buttons-container');
  const clearButton = document.createElement('button');
  clearButton.setAttribute('type', 'reset');
  const clearButtonText = document.createTextNode('Clear');
  clearButton.appendChild(clearButtonText);

  const confirmButton = document.createElement('button');
  const confirmButtonText = document.createTextNode('Confirm');
  confirmButton.setAttribute('type', 'submit');
  confirmButton.appendChild(confirmButtonText);

  buttonsDiv.appendChild(clearButton);
  buttonsDiv.appendChild(confirmButton);

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('form-close-button');
  const closeButtonText = document.createTextNode('X'); // TODO boxicon
  closeButton.appendChild(closeButtonText);

  haveReadDiv.appendChild(readStatusLabel);
  haveReadDiv.appendChild(readStatusInput);
  haveNotReadDiv.appendChild(notReadStatusLabel);
  haveNotReadDiv.appendChild(notReadStatusInput);

  statusFieldset.appendChild(statusFieldsetLegend);
  statusFieldset.appendChild(haveReadDiv);
  statusFieldset.appendChild(haveNotReadDiv);

  modalFormContainer.appendChild(closeButton);
  modalFormContainer.appendChild(titleLabel);
  modalFormContainer.appendChild(titleInput);
  modalFormContainer.appendChild(authorLabel);
  modalFormContainer.appendChild(authorInput);
  modalFormContainer.appendChild(IsbnLabel);
  modalFormContainer.appendChild(IsbnInput);
  modalFormContainer.appendChild(pagesLabel);
  modalFormContainer.appendChild(pagesInput);
  modalFormContainer.appendChild(statusFieldset);
  modalFormContainer.appendChild(buttonsDiv);

  modal.appendChild(modalFormContainer);
}

buildModal();
// addNewBook();

function displayToggle() {
  modal.classList.toggle('display-none');
}

const newBookButton = document.querySelector('.new-book-button');
newBookButton.addEventListener('click', displayToggle);

const closeButton = document.querySelector('.form-close-button');
closeButton.addEventListener('click', displayToggle);

function windowOnClick(event) {
  if (event.target === modal) {
    displayToggle();
  }
}

window.addEventListener('click', windowOnClick);

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
  'Robert Jordan',
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
