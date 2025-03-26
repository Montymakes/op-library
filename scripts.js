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


//Library Variables and Functions
const myLibrary = [];

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

function addBooktoLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
};

function displayLibraryBooks() {
    for (const book of myLibrary) {
       //create card
       let bookCard = 
       `<div class="bookCard">
            <h2 class="title">${book.title}</h2>
            <p>by ${book.author}</p>
            <p><span class=bold>Pages:</span> ${book.pages} <span class="bold">Reading Status:</span> ${book.read ? "Finished" : "Not Finished"}</p>
       </div>`;

       libraryDisplay.innerHTML += bookCard;
    }

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

exitButton.addEventListener("click", () => {
    clearInputs();
    dialog.close();
}
    );



// Testing Data

addBooktoLibrary("Let This Radicalize You", "Kelly Hayes, Mariame Kaba", 220, false);
addBooktoLibrary("We Do This 'Til We Free Us", "Mariame Kaba", 160, true);
addBooktoLibrary("Health Communism", "Beatrice Adler-Bolton, Artie Vierkant", 339, false);
addBooktoLibrary("Idlewild", "James Frankie Thomas", 372, true);
addBooktoLibrary("What My Bones Know", "Stephanie Foo", 182, true);

displayLibraryBooks();

