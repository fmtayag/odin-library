const ACTION_DELETE = "delete";
const ACTION_TOGGLE = "toggle";
const myLibrary = [];

function Book(title, author, pages, hasBeenRead) {
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, pages, hasBeenRead) {
    const book = new Book(title, author, pages, hasBeenRead);
    myLibrary.push(book);
}

function displayBooks() {
    const table = document.querySelector("#library")
    for(const book of myLibrary) {
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
        row.dataset.index = myLibrary.indexOf(book);
        row.addEventListener("click", (e) => {
            const container = row.parentNode; 
            const bookIndex = row.dataset.index;
            const action = e.target.dataset.action;
            switch(action) {
                case ACTION_DELETE:
                    deleteBook(bookIndex);
                    container.removeChild(row);
                    break;
                case ACTION_TOGGLE:
                    book.hasBeenRead = book.hasBeenRead ? false : true;
                    hasBeenRead.textContent = book.hasBeenRead ? "Yes" : "No";
                    break;
            }
        })

        table.appendChild(row);
    }
    
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
}


addBookToLibrary("The Martian", "Andy Weir", 320, false);
addBookToLibrary("Do Androids Dream of Electric Sheep?", "Philip K. Dick", 269, false);
addBookToLibrary("Masters of Doom", "David Kushner", 291, true);

displayBooks();