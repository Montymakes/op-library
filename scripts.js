const myLibrary = [];
const bookDisplay = document.getElementById('bookDisplay');

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
        //create the html to display the book
        let bookRow = `<tr><th scope="row">${book.title}</th><td>${book.author}</td><td>${book.pages}</td><td>${book.read ? "Finished" : "Not Finished"}</td></tr>`
        bookDisplay.innerHTML += bookRow;
    }
};

// Testing

addBooktoLibrary("Let This Radicalize You", "Kelly Hayes, Mariame Kaba", 220, false);
addBooktoLibrary("We Do This 'Til We Free Us", "Mariame Kaba", 160, true);
addBooktoLibrary("Health Communism", "Beatrice Adler-Bolton, Artie Vierkant", 339, false);
addBooktoLibrary("Idlewild", "James Frankie Thomas", 372, true);
addBooktoLibrary("What My Bones Know", "Stephanie Foo", 182, true);

displayLibraryBooks();