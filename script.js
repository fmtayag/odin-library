"use strict"

const ACTION_DELETE = "delete";
const ACTION_TOGGLE = "toggle";
const MATERIAL_CLASS = "material-symbols-outlined";
const TXT_SECONDARY_CLASS = "txt-secondary";
const ICON_READ = "check_circle";
const ICON_NOTREAD = "radio_button_unchecked";
const ICON_DELETE = "delete";
const TXT_READ = "Done Reading";
const TXT_NOTREAD = "Not Read";



/* --- MODEL and CRUD --- */

class Book {
    static auto_id = 0
    static myLibrary = {}

    constructor(title, author, pages, hasBeenRead) {
        this.title = title; 
        this.author = author;
        this.pages = pages;
        this.hasBeenRead = hasBeenRead;
    }

    static addBook(title, author, pages, hasBeenRead) {
        const book = new Book(title, author, pages, hasBeenRead);
        this.myLibrary[++this.auto_id] = book;
        return book;
    }
    
    static deleteBook(key) {
        delete this.myLibrary[key];
    }
} 

function toggleBook(book, htmlRead, htmlToggle) {
    book.hasBeenRead = book.hasBeenRead ? false : true;
    htmlRead.textContent = book.hasBeenRead ? TXT_READ : TXT_NOTREAD;
    htmlToggle.innerText = book.hasBeenRead ? ICON_READ : ICON_NOTREAD;
}

function addBookToDisplay(book, key=0) {
    // -- General
    const library = document.querySelector("#library");
    const card = document.createElement("div");
    const color = pickColor();
    
    // -- Logo group
    const logo = document.createElement("div");
    logo.classList.add("logo", color);

    // -- Content group
    const content = document.createElement("div");
    content.classList.add("content");
    const title = document.createElement("h2");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    author.classList.add(TXT_SECONDARY_CLASS);
    pages.classList.add(TXT_SECONDARY_CLASS);

    // -- Actions group
    const actions = document.createElement("div");
    actions.classList.add("actions");

    const hasBeenRead = document.createElement("span");
    hasBeenRead.textContent = book.hasBeenRead ? TXT_READ : TXT_NOTREAD;

    const buttonToggle = document.createElement("button");
    const buttonDelete = document.createElement("button");
    const iconToggle = document.createElement("span");
    const iconDelete = document.createElement("span");

    iconToggle.innerText = book.hasBeenRead ? ICON_READ : ICON_NOTREAD;
    iconToggle.classList.add(MATERIAL_CLASS, color);

    iconDelete.innerText = ICON_DELETE;
    iconDelete.classList.add(MATERIAL_CLASS, color);
    
    buttonToggle.setAttribute("type", "button");
    buttonToggle.classList.add("action");
    buttonToggle.dataset.action = ACTION_TOGGLE;
    buttonToggle.append(iconToggle, hasBeenRead);

    buttonDelete.setAttribute("type", "button");
    buttonDelete.classList.add("action");
    buttonDelete.dataset.action = ACTION_DELETE;
    buttonDelete.append(iconDelete);

    // -- Assemble card
    actions.append(buttonToggle, buttonDelete);
    content.append(title, author, pages);
    card.append(logo, content, actions);
    card.classList.add("card");
    card.dataset.key = key
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

    // -- Put it all together
    library.append(card);

}

function displayBooks() {
    for(const key in Book.myLibrary) {
        const book = Book.myLibrary[key];
        addBookToDisplay(book, key);
    }
    
}

/* --- Modal and Form --- */

const dialog = document.querySelector("dialog");
const buttonOpenModel = document.querySelector("#show-modal");
const buttonCloseModal = document.querySelector("#close-modal");
const buttonAddBook = document.querySelector("button[type=submit]");

buttonOpenModel.addEventListener("click", (e) => {
    dialog.showModal();
})

buttonCloseModal.addEventListener("click", (e) => {
    dialog.close();
})
buttonAddBook.addEventListener("click", (e) =>
{
    let title = document.querySelector("#title");
    let author = document.querySelector("#author");
    let pages = document.querySelector("#pages");
    let htmlRadio = document.querySelector("input[name=book_read]:checked");
    let hasBeenRead = htmlRadio.value == "true" ? true : false;

    const book = Book.addBook(title.value, author.value, pages.value, hasBeenRead);
    addBookToDisplay(book, Book.auto_id);
    e.preventDefault();

    title.value = "";
    author.value = "";
    pages.value = "";
    htmlRadio.checked = false;
    dialog.close();
});

/* --- Utils --- */

function pickColor() {
    const COLORS = ["bg-purple", "bg-blue", "bg-green", "bg-kale", "bg-desert"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];    
}

/* --- Driver code --- */

Book.addBook("The Martian", "Andy Weir", 320, false);
Book.addBook("Do Androids Dream of Electric Sheep?", "Philip K. Dick", 269, false);
Book.addBook("Masters of Doom", "David Kushner", 291, true);
displayBooks();