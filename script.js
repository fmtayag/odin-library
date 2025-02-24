const ACTION_DELETE = "delete";
const ACTION_TOGGLE = "toggle";
let auto_id = 0;
const myLibrary = {};

function Book(title, author, pages, hasBeenRead) {
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
    const book = new Book(title, author, pages, hasBeenRead);
    myLibrary[++auto_id] = book;
    return book;
}

function addBookToDisplay(book, key=0) {
    const table = document.querySelector("#library");
    const row = document.createElement("div");
    const para = document.createElement("p");
    const title = document.createElement("span");
    const author = document.createElement("span");
    const pages = document.createElement("span");
    const hasBeenRead = document.createElement("span");
    const buttonToggle = document.createElement("button");
    const buttonDelete = document.createElement("button");
    
    buttonToggle.textContent = "Toggle Read";
    buttonDelete.textContent = "Delete";
    buttonToggle.dataset.action = ACTION_TOGGLE;
    buttonDelete.dataset.action = ACTION_DELETE;

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    hasBeenRead.textContent = book.hasBeenRead ? "Yes" : "No";

    para.append(title);
    para.append(author);
    para.append(pages);
    para.append(hasBeenRead);

    row.append(para);
    row.append(buttonToggle);
    row.append(buttonDelete);
    row.dataset.key = key

    row.addEventListener("click", (e) => {
        const container = row.parentNode; 
        const bookKey = row.dataset.key;
        const action = e.target.dataset.action;
        switch(action) {
            case ACTION_DELETE:
                deleteBook(bookKey);
                container.removeChild(row);
                break;
            case ACTION_TOGGLE:
                book.hasBeenRead = book.hasBeenRead ? false : true;
                hasBeenRead.textContent = book.hasBeenRead ? "Yes" : "No";
                break;
        }
    });

    table.append(row);
}

function displayBooks() {
    for(const key in myLibrary) {
        book = myLibrary[key];
        console.log(key);
        addBookToDisplay(book, key);
    }
    
}

function deleteBook(key) {
    delete myLibrary[key];
}

addBookToLibrary("The Martian", "Andy Weir", 320, false);
addBookToLibrary("Do Androids Dream of Electric Sheep?", "Philip K. Dick", 269, false);
addBookToLibrary("Masters of Doom", "David Kushner", 291, true);
displayBooks();

const buttonAddBook = document.querySelector("button[type=submit]");
buttonAddBook.addEventListener("click", (e) =>
{
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const hasBeenRead = document.querySelector("input[name=book_read]:checked").value;

    const book = addBookToLibrary(title, author, pages, Boolean(hasBeenRead));
    addBookToDisplay(book, auto_id);
    e.preventDefault();
});