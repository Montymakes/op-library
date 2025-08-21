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

class Library {
    #library;
    
    constructor(library = []){
        this.#library = library;
    };

    get myLibrary(){
        return this.#library;
    }

    set myLibrary(value) {
        this.#library = value;
    }

    add(book) {
        this.#library.push(book);
    }

    get(bookID) {
        return this.#library.filter((book) => book.id === bookID);
    }

    remove(bookID) {
        const newLibrary = this.#library.filter((book) => book.id != bookID);
        this.#library = newLibrary;
    }
}
class Book {
    id = crypto.randomUUID();
    #title;
    #author;
    #pages;
    #read;
    
    constructor(title,author,pages,read){
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }

    //Getters
    get title(){
        return this.#title;
    }

    get author(){
        return this.#author;
    }

    get pages(){
        return this.#pages;
    }

    get read(){
        return this.#read;
    }

    get info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read ? 'finished' : 'not finished'}.`;
    }

    //Setters
    set title(value){
        this.#title = value;
    }

    set author(value){
        this.#author = value;
    }

    set pages(value){
        this.#pages = value;
    }

    set read(value) {
        this.#read = value;
    }
}

class LibraryDisplay {
    #library;

    constructor(library = new Library){
        this.#library = library;
    }
    
    //Getters
    get myLibrary(){
        return this.#library;
    }

    //Setters
    set myLibrary(library){
        this.#library = library;
     }

    //Methods
    clear(){
        libraryDisplay.innerHTML = '';
    }

    display(){

        exitButton.addEventListener("click", () => {
            display.clearInput();
            dialog.close();
        });

        submitButton.addEventListener('click', this.submitNewBook);

        this.clear();

        for (const book of this.#library.myLibrary) {
            let bookCard = 
            `<div class="bookCard" id="${book.id}">
                    <div class="book-details">
                        <h2 class="title">${book.title}</h2>
                        <p>by ${book.author}</p>
                        <p><span class=bold>Pages:</span> ${book.pages}</p>
                    </div>
                    <div class="book-controls">
                        <button type="button" class="${book.read ? "read " : ""}readingStatusButton">${book.read ? "READ" : "UNREAD"}</button>
                        <input type="image" src="img/delete.svg" class="delete" alt="Remove this book from your library." />
                    </div>
            </div>`;

            libraryDisplay.innerHTML += bookCard;
        }

        const readButtons = document.getElementsByClassName('readingStatusButton');
        for (let button of readButtons) {
            button.addEventListener('click', (e) => {
                e.target.classList.toggle('read');
                display.toggleBookProgress(e.target.parentElement.parentElement.id);
            });
        }

        const deleteButtons = document.getElementsByClassName('delete');
        for (let button of deleteButtons) {
            button.addEventListener('click', (e) => {
                display.remove(e.target.parentElement.parentElement.id);
            })
        }
        
        libraryDisplay.appendChild(addBookButton);

        addBookButton.addEventListener("click", (e) => {
            if(!(e.target.closest("#addBook"))) return;
            dialog.showModal();
        });

    }

    toggleBookProgress(bookID){
        const book = library.myLibrary.find((book) => book.id === bookID);
        book.read = book.read ? false : true;
        this.display();
    }
    
    remove(bookID) {
        library.remove(bookID);
        this.display();
    }

    clearInput() {
        titleInput.value = '';
        authorInput.value = '';
        pageCountInput.value = '';
    }

    submitNewBook(e){
        e.preventDefault();

        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pageCountInput.value;
        const read = finishedInput.checked;
        const newBook = new Book(title, author, pages, read);
        library.add(newBook);
        display.display();

        display.clearInput();
        dialog.close();
    }
}

let library = new Library();
let display = new LibraryDisplay(library);
display.display();




