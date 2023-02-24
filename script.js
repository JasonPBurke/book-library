// TODO: add a book search with autocomplete from an API inc book art for bg

let myLibrary = [];

function Book(title, author, isbn = null, pages, read, cover = null) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
  this.pages = pages;
  this.read = read;
  isbn
    ? (this.cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
    : (this.cover = './images/generic-book-cover.jpg');
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      read ? 'Completed' : 'Not Completed'
    }`;
  };
}

// TODO ask for an ISBN and add custom background if provided?
// TODO  ADD NAME ATTRIBUTES TO FORM INPUTS!!!
const modal = document.querySelector('.modal');
// console.log(modal);

function buildModal() {
  const modalFormContainer = document.createElement('form');
  // modalFormContainer.setAttribute('action', '#');
  modalFormContainer.setAttribute('enctype', 'multipart/form-data');
  // modalFormContainer.setAttribute('onsubmit', 'return check(event)');
  modalFormContainer.setAttribute('method', 'POST');
  modalFormContainer.setAttribute('id', 'modal_form_container');
  modalFormContainer.classList.add('modal-form-container');

  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'book_title');
  const titleLabelText = document.createTextNode('*Title');
  titleLabel.appendChild(titleLabelText);
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('id', 'book_title');
  titleInput.setAttribute('name', 'book_title');
  titleInput.setAttribute('required', '');

  const authorLabel = document.createElement('label');
  authorLabel.setAttribute('for', 'book_author');
  const authorLabelText = document.createTextNode('*Author');
  authorLabel.appendChild(authorLabelText);
  const authorInput = document.createElement('input');
  authorInput.setAttribute('type', 'text');
  authorInput.setAttribute('id', 'book_author');
  authorInput.setAttribute('name', 'book_author');
  authorInput.setAttribute('required', '');

  const IsbnLabel = document.createElement('label');
  IsbnLabel.setAttribute('for', 'book_Isbn');
  const IsbnLabelText = document.createTextNode('ISBN Number');
  IsbnLabel.appendChild(IsbnLabelText);
  const IsbnInput = document.createElement('input');
  IsbnInput.setAttribute('type', 'text');
  IsbnInput.setAttribute('id', 'book_isbn');
  IsbnInput.setAttribute('name', 'book_isbn');

  const pagesLabel = document.createElement('label');
  pagesLabel.setAttribute('for', 'total_pages');
  const pagesLabelText = document.createTextNode('Pages');
  pagesLabel.appendChild(pagesLabelText);
  const pagesInput = document.createElement('input');
  pagesInput.setAttribute('type', 'number');
  pagesInput.setAttribute('id', 'total_pages');
  pagesInput.setAttribute('name', 'total_pages');
  pagesInput.setAttribute('required', '');

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
  readStatusInput.setAttribute('value', true);

  const haveNotReadDiv = document.createElement('div');
  const notReadStatusLabel = document.createElement('label');
  notReadStatusLabel.setAttribute('for', 'have_not_read');
  const notReadStatusLabelText = document.createTextNode('Not Yet Completed');
  notReadStatusLabel.appendChild(notReadStatusLabelText);
  const notReadStatusInput = document.createElement('input');
  notReadStatusInput.setAttribute('type', 'radio');
  notReadStatusInput.setAttribute('name', 'read_status');
  notReadStatusInput.setAttribute('id', 'have_not_read');
  notReadStatusInput.setAttribute('value', false);
  notReadStatusInput.setAttribute('checked', '');

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('form-buttons-container');
  const clearButton = document.createElement('button');
  clearButton.setAttribute('type', 'reset');
  const clearButtonText = document.createTextNode('Clear');
  clearButton.appendChild(clearButtonText);

  const submitButton = document.createElement('button');
  const submitButtonText = document.createTextNode('Submit');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('id', 'form_submit');
  submitButton.appendChild(submitButtonText);

  buttonsDiv.appendChild(clearButton);
  buttonsDiv.appendChild(submitButton);

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

function getData(form) {
  const formData = new FormData(form);
  // TODO CHECK FOR ISBN VALS AND USE API TO FETCH BOOK COVER IMG
  values = Object.values(Object.fromEntries(formData));
  boolVal = values[values.length - 1] === 'true';
  values[values.length - 1] = boolVal;

  addBookToLibrary(new Book(...values));

  createCards();
}

const myForm = document.getElementById('modal_form_container');
myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getData(e.target);
  displayToggle();
});

function displayToggle() {
  document.getElementById('modal_form_container').reset();
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
  book.index = myLibrary.length;
  myLibrary.push(book);
}

function removeBook() {
  const removeBookButtons = document.querySelectorAll('.remove-book-button');

  removeBookButtons.forEach((element) => {
    element.addEventListener('click', () => {
      delete myLibrary[element.getAttribute('book_index')];
      createCards();
    });
  });
}

function createCards() {
  document.querySelector('.card-container').innerHTML = '';
  const cardContainer = document.querySelector('.card-container');

  for (const book of myLibrary) {
    if (book === undefined) {
      continue;
    }
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(100, 100, 100, 0.75)), url(${book.cover})`;
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

    const completedTglBtn = document.createElement('button');
    const completedTglBtnText = document.createTextNode(
      `${book.read ? 'Read' : 'Not Read'}`
    );
    completedTglBtn.appendChild(completedTglBtnText);
    completedTglBtn.setAttribute('type', 'button');
    completedTglBtn.setAttribute('completion-status', book.read);
    completedTglBtn.classList.add('toggle-read-button');
    card.appendChild(completedTglBtn);

    const removeBookButton = document.createElement('button');
    const removeBookButtonText = document.createTextNode('Remove from Library');
    removeBookButton.appendChild(removeBookButtonText);
    removeBookButton.setAttribute('type', 'button');
    removeBookButton.setAttribute('book_index', book.index);
    removeBookButton.classList.add('remove-book-button');
    card.appendChild(removeBookButton);

    cardContainer.appendChild(card);
  }
  removeBook();
  toggleReadStatus();
}

const theEyeOfTheWorld = new Book(
  'The Eye of the World',
  'Robert Jordan',
  9780812511819,
  832,
  true
);
const theHobbit = new Book(
  'The Hobbit',
  'J.R.R Tolkien',
  9781782012696,
  295,
  false
);
const hyperion = new Book('Hyperion', 'Dan Simmons', 9781455802593, 576, true);
const fallOfHyperion = new Book(
  'Fall of Hyperion',
  'Dan Simmons',
  9789993530466,
  784,
  true
);
const endymion = new Book('Endymion', 'Dan Simmons', '0553572946', 699, true);
const riseOfEndymion = new Book(
  'Rise of Endymion',
  'Dan Simmons',
  '055310652X',
  843,
  true
);

addBookToLibrary(theHobbit);
addBookToLibrary(theEyeOfTheWorld);
addBookToLibrary(hyperion);
addBookToLibrary(fallOfHyperion);
addBookToLibrary(endymion);
addBookToLibrary(riseOfEndymion);

createCards();

function toggleReadStatus() {
  const readButtons = document.querySelectorAll('[completion-status]');

  // TODO update actual Book Object, run createCards
  readButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      title = btn.previousSibling.previousSibling.previousSibling.innerHTML;
      readVal = btn.getAttribute('completion-status') === 'true';
      newReadVal = readVal === true ? false : true;
      myLibrary.forEach((book) => {
        if (book.title === title) {
          book.read = newReadVal;
        }
      });
      createCards();
    });
  });
}
