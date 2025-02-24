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

addBookToLibrary("The Martian", "Andy Weir", 320, false);
addBookToLibrary("Do Androids Dream of Electric Sheep?", "Philip K. Dick", 269, false);
addBookToLibrary("Masters of Doom", "David Kushner", 291, true);

console.log(myLibrary);