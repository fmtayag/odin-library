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

    // -- General
    const table = document.querySelector("#library");
    const card = document.createElement("div");
    const color = pickColor();
    
    // -- Logo group
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.classList.add(color); // TODO: Randomize color

    // -- Content group
    const content = document.createElement("div");
    content.classList.add("content");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const hasBeenRead = document.createElement("p");

    // -- Actions group
    const materialClass = "material-symbols-outlined";
    const actions = document.createElement("div");
    actions.classList.add("actions");

    const buttonToggle = document.createElement("button");
    const buttonDelete = document.createElement("button");
    const iconToggle = document.createElement("span");
    iconToggle.innerText = "check_circle";
    iconToggle.classList.add(materialClass);
    iconToggle.classList.add(color);
    const iconDelete = document.createElement("span");
    iconDelete.innerText = "delete";
    iconDelete.classList.add(materialClass);
    iconDelete.classList.add(color);
    
    // buttonToggle.textContent = "Toggle Read";
    buttonToggle.setAttribute("type", "button");
    buttonToggle.dataset.action = ACTION_TOGGLE;
    buttonToggle.append(iconToggle);
    // buttonDelete.textContent = "Delete";
    buttonDelete.setAttribute("type", "button");
    buttonDelete.dataset.action = ACTION_DELETE;
    buttonDelete.append(iconDelete);

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    hasBeenRead.textContent = book.hasBeenRead ? "Yes" : "No";

    // -- Assemble card
    actions.append(buttonDelete);
    actions.append(buttonToggle);
    content.append(title);
    content.append(author);
    content.append(pages);
    content.append(hasBeenRead);

    card.append(logo);
    card.append(content);
    card.append(actions);
    card.classList.add("card");
    card.dataset.key = key
    // colorCard(card);

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

function pickColor() {
    const COLORS = ["bg-purple", "bg-blue", "bg-green", "bg-kale", "bg-desert"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];    
}