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
    const card = document.createElement("div");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const hasBeenRead = document.createElement("p");
    const buttonsContainer = document.createElement("div");
    const buttonToggle = document.createElement("button");
    const buttonDelete = document.createElement("button");
    
    buttonToggle.textContent = "Toggle Read";
    buttonToggle.setAttribute("type", "button");
    buttonToggle.dataset.action = ACTION_TOGGLE;
    buttonDelete.textContent = "Delete";
    buttonDelete.setAttribute("type", "button");
    buttonDelete.dataset.action = ACTION_DELETE;

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    hasBeenRead.textContent = book.hasBeenRead ? "Yes" : "No";

    buttonsContainer.append(buttonDelete);
    buttonsContainer.append(buttonToggle);
    card.append(title);
    card.append(author);
    card.append(pages);
    card.append(hasBeenRead);
    card.append(buttonsContainer);
    card.classList.add("card");
    card.dataset.key = key
    colorCard(card);

    card.addEventListener("click", (e) => {
        const container = card.parentNode; 
        const bookKey = card.dataset.key;
        const action = e.target.dataset.action;
        switch(action) {
            case ACTION_DELETE:
                deleteBook(bookKey);
                container.removeChild(card);
                break;
            case ACTION_TOGGLE:
                book.hasBeenRead = book.hasBeenRead ? false : true;
                hasBeenRead.textContent = book.hasBeenRead ? "Yes" : "No";
                break;
        }
    });

    table.append(card);
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

function colorCard(target) {
    const randomHex = () => Math.floor(Math.random() * 255);
    const r = randomHex();
    const g = randomHex();
    const b = randomHex();
    const color = `rgb(${r}, ${g}, ${b})`;

    // target.style["background-color"] = color;
    target.style["background-color"] = "white";
    target.classList.add("colored");
}