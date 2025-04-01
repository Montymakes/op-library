// Document Variables
const libraryDisplay = document.getElementById('libraryDisplay');
const addBookButton = document.getElementById('addBook');
const dialog = document.getElementById('dialog');
const exitButton = document.getElementById('exit')
const submitButton = document.getElementById('submit');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pageCountInput = document.getElementById('pageCount');
const finishedInput = document.getElementById('finished-1');
const form = document.querySelector('form');


//Library Variables and Functions
let myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Use 'new' to call the Book constructor function.")
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'finished' : 'not finished'}.`;
    };
};

function addBooktoLibrary(book) {
    myLibrary.push(book);
};

//Library Display Functions
function displayLibraryBooks() {
    libraryDisplay.innerHTML = ''; //clear display

    for (const book of myLibrary) {
       let bookCard = 
       `<div class="bookCard" id="${book.id}">
            <div class="book-details">
                <h2 class="title">${book.title}</h2>
                <p>by ${book.author}</p>
                <p><span class=bold>Pages:</span> ${book.pages}</p>
            </div>
            <div class="book-controls">
                <button type="button" class="${book.read ? "read" : ""} readingStatusButton">${book.read ? "READ" : "UNREAD"}</button>
                <input type="image" src="img/delete.svg" class="delete" alt="Remove this book from your library." />
            </div>
       </div>`;

       libraryDisplay.innerHTML += bookCard;
    }

    libraryDisplay.appendChild(addBookButton); //re-add button

};

function removeBookfromLibrary(bookID) {
    const newLibrary = myLibrary.filter((book) => book.id != bookID);
    myLibrary = newLibrary;
};

function deleteBook(bookID) {
    removeBookfromLibrary(bookID);
    displayLibraryBooks();
};

function toggleReadingStatus(bookID) {
    const book = myLibrary.find((book) => book.id === bookID);
    book.read = book.read ? false : true;
    displayLibraryBooks();
};

libraryDisplay.addEventListener("click", (e) => {
    if(!(e.target.closest(".delete"))) return;
    deleteBook(e.target.parentElement.parentElement.id);
});

libraryDisplay.addEventListener("click", (e) => {
    if(!(e.target.closest(".readingStatusButton"))) return;
    e.target.classList.toggle('read');
    toggleReadingStatus(e.target.parentElement.parentElement.id);
});

// Dialog Controls
function clearInputs()  {
    titleInput.value = '';
    authorInput.value = '';
    pageCountInput.value = '';
};

libraryDisplay.addEventListener("click", (e) => {
    if(!(e.target.closest("#addBook"))) return;
    dialog.showModal();
});

exitButton.addEventListener("click", () => {
    clearInputs();
    dialog.close();
});


function submitNewBook(e) {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pageCountInput.value;
    const read = finishedInput.checked;

    addBooktoLibrary(new Book(title, author, pages, read));
    displayLibraryBooks();

    clearInputs();
    dialog.close();

};

submitButton.addEventListener('click', submitNewBook);

displayLibraryBooks();

