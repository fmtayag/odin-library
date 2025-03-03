"use strict"



/* --- MODEL and CRUD --- */

class Library {
    static #auto_id = 0
    static myLibrary = {}

    static addBook(title, author, pages, hasBeenRead) {
        const book = new Book(title, author, pages, hasBeenRead);
        this.myLibrary[++this.#auto_id] = book;
        return book;
    }
    
    static deleteBook(key) {
        delete this.myLibrary[key];
    }

    static get currentID() {
        return this.#auto_id;
    }
}

class Book {
    constructor(title, author, pages, hasBeenRead) {
        this.title = title; 
        this.author = author;
        this.pages = pages;
        this.hasBeenRead = hasBeenRead;
    }
} 

class DOMHandler {
    static ACTION_DELETE = "delete";
    static ACTION_TOGGLE = "toggle";
    static MATERIAL_CLASS = "material-symbols-outlined";
    static TXT_SECONDARY_CLASS = "txt-secondary";
    static ICON_READ = "check_circle";
    static ICON_NOTREAD = "radio_button_unchecked";
    static ICON_DELETE = "delete";
    static TXT_READ = "Done Reading";
    static TXT_NOTREAD = "Not Read";

    static toggleBook(book, htmlRead, htmlToggle) {
        book.hasBeenRead = book.hasBeenRead ? false : true;
        htmlRead.textContent = book.hasBeenRead ? this.TXT_READ : this.TXT_NOTREAD;
        htmlToggle.innerText = book.hasBeenRead ? this.ICON_READ : this.ICON_NOTREAD;
    }
    
    static addBookToDisplay(book, key=0) {
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
        author.classList.add(this.TXT_SECONDARY_CLASS);
        pages.classList.add(this.TXT_SECONDARY_CLASS);
    
        // -- Actions group
        const actions = document.createElement("div");
        actions.classList.add("actions");
    
        const hasBeenRead = document.createElement("span");
        hasBeenRead.textContent = book.hasBeenRead ? this.TXT_READ : this.TXT_NOTREAD;
    
        const buttonToggle = document.createElement("button");
        const buttonDelete = document.createElement("button");
        const iconToggle = document.createElement("span");
        const iconDelete = document.createElement("span");
    
        iconToggle.innerText = book.hasBeenRead ? this.ICON_READ : this.ICON_NOTREAD;
        iconToggle.classList.add(this.MATERIAL_CLASS, color);
    
        iconDelete.innerText = this.ICON_DELETE;
        iconDelete.classList.add(this.MATERIAL_CLASS, color);
        
        buttonToggle.setAttribute("type", "button");
        buttonToggle.classList.add("action");
        buttonToggle.dataset.action = this.ACTION_TOGGLE;
        buttonToggle.append(iconToggle, hasBeenRead);
    
        buttonDelete.setAttribute("type", "button");
        buttonDelete.classList.add("action");
        buttonDelete.dataset.action = this.ACTION_DELETE;
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
                case this.ACTION_DELETE:
                    this.deleteBook(bookKey);
                    container.removeChild(card);
                    break;
                case this.ACTION_TOGGLE:
                    this.toggleBook(book, hasBeenRead, iconToggle);
                    break;
            }
        });
    
        // -- Put it all together
        library.append(card);
    
    }
    
    static displayBooks() {
        for(const key in Library.myLibrary) {
            const book = Library.myLibrary[key];
            this.addBookToDisplay(book, key);
        }
    }
}

/* --- Modal and Form --- */

class Modal {
    constructor() {
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

            const book = Library.addBook(title.value, author.value, pages.value, hasBeenRead);
            DOMHandler.addBookToDisplay(book, Library.currentID);
            e.preventDefault();

            title.value = "";
            author.value = "";
            pages.value = "";
            htmlRadio.checked = false;
            dialog.close();
        });
    }
}

/* --- Utils --- */

function pickColor() {
    const COLORS = ["bg-purple", "bg-blue", "bg-green", "bg-kale", "bg-desert"];
    return COLORS[Math.floor(Math.random() * COLORS.length)];    
}

/* --- Driver code --- */

Library.addBook("The Martian", "Andy Weir", 320, false);
Library.addBook("Do Androids Dream of Electric Sheep?", "Philip K. Dick", 269, false);
Library.addBook("Masters of Doom", "David Kushner", 291, true);
DOMHandler.displayBooks();
new Modal();