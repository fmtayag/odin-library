const ACTION_DELETE = "delete";
const ACTION_TOGGLE = "toggle";
const MATERIAL_CLASS = "material-symbols-outlined";
const TXT_READ = "Finished Reading";
const TXT_NOTREAD = "Not Read";
let auto_id = 0;
const myLibrary = {};

addBookToLibrary("The Martian", "Andy Weir", 320, false);
addBookToLibrary("Electric Sheep", "Philip K. Dick", 269, false);
addBookToLibrary("Masters of Doom", "David Kushner", 291, true);
displayBooks();

/* --- MODEL and CRUD --- */

function Book(title, author, pages, hasBeenRead) {
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
    console.log(hasBeenRead);
    const book = new Book(title, author, pages, hasBeenRead);
    myLibrary[++auto_id] = book;
    return book;
}

function deleteBook(key) {
    delete myLibrary[key];
}

function toggleBook(book, htmlRead, htmlToggle) {
    book.hasBeenRead = book.hasBeenRead ? false : true;
    htmlRead.textContent = book.hasBeenRead ? TXT_READ : TXT_NOTREAD;
    htmlToggle.innerText = book.hasBeenRead ? "radio_button_checked" : "radio_button_unchecked";
}


function addBookToDisplay(book, key=0) {
    // -- General
    const library = document.querySelector("#library");
    const card = document.createElement("div");
    const color = pickColor();
    
    // -- Logo group
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.classList.add(color);

    // -- Content group
    const content = document.createElement("div");
    content.classList.add("content");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const hasBeenRead = document.createElement("p");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    hasBeenRead.textContent = book.hasBeenRead ? TXT_READ : TXT_NOTREAD;

    // -- Actions group

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const buttonToggle = document.createElement("button");
    const buttonDelete = document.createElement("button");
    const iconToggle = document.createElement("span");
    const iconDelete = document.createElement("span");

    iconToggle.innerText = book.hasBeenRead ? "radio_button_checked" : "radio_button_unchecked";
    iconToggle.classList.add(MATERIAL_CLASS);
    iconToggle.classList.add(color);

    iconDelete.innerText = "delete";
    iconDelete.classList.add(MATERIAL_CLASS);
    iconDelete.classList.add(color);
    
    buttonToggle.setAttribute("type", "button");
    buttonToggle.dataset.action = ACTION_TOGGLE;
    buttonToggle.append(iconToggle);

    buttonDelete.setAttribute("type", "button");
    buttonDelete.dataset.action = ACTION_DELETE;
    buttonDelete.append(iconDelete);

    // -- Assemble card
    actions.append(buttonToggle);
    actions.append(buttonDelete);
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
        const container = library; 
        const bookKey = card.dataset.key;

        const button = e.target.parentNode;
        const action = button.dataset.action;

        switch(action) {
            case ACTION_DELETE:
                deleteBook(bookKey);
                container.removeChild(card);
                break;
            case ACTION_TOGGLE:
                toggleBook(book, hasBeenRead, iconToggle);
                break;
        }
    });

    library.append(card);
}

function displayBooks() {
    for(const key in myLibrary) {
        book = myLibrary[key];
        console.log(key);
        addBookToDisplay(book, key);
    }
    
}

/* --- Form --- */

const buttonAddBook = document.querySelector("button[type=submit]");
buttonAddBook.addEventListener("click", (e) =>
{
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    let hasBeenRead = document.querySelector("input[name=book_read]:checked").value;
    hasBeenRead = hasBeenRead == "true" ? true : false;

    const book = addBookToLibrary(title, author, pages, hasBeenRead);
    addBookToDisplay(book, auto_id);
    e.preventDefault();
});

/* --- Utils --- */

function pickColor() {
    const COLORS = ["bg-purple", "bg-blue", "bg-green", "bg-kale", "bg-desert"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];    
}