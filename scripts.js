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

function removeBookfromLibrary(bookID) {
    const newLibrary = myLibrary.filter((book) => book.id != bookID);
    myLibrary = newLibrary;
}

function deleteBook(bookID) {
    removeBookfromLibrary(bookID);
    displayLibraryBooks();
}

function displayLibraryBooks() {
    libraryDisplay.innerHTML = ''; //clear display

    for (const book of myLibrary) {
       let bookCard = 
       `<div class="bookCard">
            <div class="book-details">
                <h2 class="title">${book.title}</h2>
                <p>by ${book.author}</p>
                <p><span class=bold>Pages:</span> ${book.pages}</p>
            </div>
            <div class="book-controls">
                <button type="button" class="${book.read ? "read" : "unread"} readingStatusButton">${book.read ? "READ" : "UNREAD"}</button>
                <input type="image" src="img/delete.svg" class="delete" alt="Remove this book from your library." id="${book.id}" />
            </div>
       </div>`;

       libraryDisplay.innerHTML += bookCard;
    }

    libraryDisplay.appendChild(addBookButton); //re-add button

};

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

libraryDisplay.addEventListener("click", (e) => {
    if(!(e.target.closest(".delete"))) return;
    deleteBook(e.target.id);
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


// Testing Data

const book1 = new Book("Let This Radicalize You", "Kelly Hayes, Mariame Kaba", 220, false);
const book2 = new Book("We Do This 'Til We Free Us", "Mariame Kaba", 160, true);
const book3 = new Book("Health Communism", "Beatrice Adler-Bolton, Artie Vierkant", 339, false);
const book4 = new Book("Idlewild", "James Frankie Thomas", 372, true);
const book5 = new Book("What My Bones Know", "Stephanie Foo", 182, true);

addBooktoLibrary(book1);
addBooktoLibrary(book2);
addBooktoLibrary(book3);
addBooktoLibrary(book4);
addBooktoLibrary(book5);


displayLibraryBooks();

