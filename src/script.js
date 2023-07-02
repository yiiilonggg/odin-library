let myLibrary = new Map();
let bookCounter = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookID = bookCounter;
    bookCounter++;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "has been read" : "has not been read"}.`
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.set(bookCounter, new Book(title, author, pages, read));
}

function displayBook(book) {
    const newBookCard = document.createElement("div");
    const newBookCardTitle = document.createElement("p");
    const newBookCardAuthor = document.createElement("p");
    const newBookCardPages = document.createElement("p");

    const newBookCardButtons = document.createElement("div");
    const newBookCardRead = document.createElement("button");
    const newBookCardRemove = document.createElement("button");
    const newBookCardReadImg = document.createElement("img");
    const newBookCardRemoveImg = document.createElement("img");

    newBookCard.className = "card";
    newBookCard.id = `book${book.bookID}`;
    newBookCardButtons.className = "buttons";
    if (book.read) newBookCard.style.backgroundColor = "lightgreen";
    newBookCardRead.style.backgroundColor = (book.read) ? "lightgreen" : "antiquewhite";

    newBookCardTitle.textContent = book.title;
    newBookCardAuthor.textContent = book.author;
    newBookCardPages.textContent = `${book.pages} pages`;
    newBookCardReadImg.src = (book.read) ? "/img/check.svg" : "/img/dots-horizontal.svg";
    newBookCardRemoveImg.src = "/img/delete.svg";

    newBookCardRemove.className = book.bookID;
    newBookCardRead.className = book.bookID;
    newBookCardRemove.addEventListener('click', (event) => deleteBook(event));
    newBookCardRead.addEventListener('click', (event) => readBook(event));

    newBookCardRead.appendChild(newBookCardReadImg);
    newBookCardRemove.appendChild(newBookCardRemoveImg);
    newBookCardButtons.appendChild(newBookCardRead);
    newBookCardButtons.appendChild(newBookCardRemove);

    newBookCard.appendChild(newBookCardTitle);
    newBookCard.appendChild(newBookCardAuthor);
    newBookCard.appendChild(newBookCardPages);
    newBookCard.appendChild(newBookCardButtons);

    container.appendChild(newBookCard);
}

function showForm() {
    main.style.filter = "blur(8px)";
    popup.style.visibility = "visible";
}

function submitForm() {
    flag = true;

    if (newBookTitle.value == "" || newBookAuthor.value == "") flag = false;
    if (newBookPages.value == "" || newBookPages.value < 0) flag = false;

    if (flag) {
        console.log(newBookRead.checked);
        addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookRead.checked);
        displayBook(myLibrary.get(bookCounter - 1));
        main.style.filter = "blur(0px)";
        popup.style.visibility = "hidden";
        errorMessage.style.visibility = "hidden";
    } else {
        errorMessage.style.visibility = "visible";
    }
}

function deleteBook(event) {
    let targetBookID = event.target.className;
    myLibrary.delete(targetBookID);
    const targetCard = document.querySelector(`#book${targetBookID}`);
    container.removeChild(targetCard);
}

function readBook(event) {
    let targetBookID = event.target.className;
    let targetBook = myLibrary.get(Number(targetBookID));
    if (targetBook.read) return;
    targetBook.read = true;
    const targetCard = document.querySelector(`#book${targetBookID}`);
    const targetReadButton = document.querySelector(`#book${targetBookID} > .buttons > button:first-child`);
    const targetReadImg = document.querySelector(`#book${targetBookID} > .buttons > button:first-child >img`);
    targetCard.style.backgroundColor = "lightgreen";
    targetReadButton.style.backgroundColor = "lightgreen";
    targetReadImg.src = "img/check.svg";
}

const main = document.querySelector(".main");
const popup = document.querySelector("#popup");
const addBookButton = document.querySelector("#addBook");
const submitBookButton = document.querySelector("#submit");
const errorMessage = document.querySelector("#error-message");

const newBookTitle = document.querySelector('[name = "title"]');
const newBookAuthor = document.querySelector('[name = "author"]');
const newBookPages = document.querySelector('[name = "pages"]');
const newBookRead = document.querySelector('[name = "read"]');

addBookButton.addEventListener('click', showForm);
submitBookButton.addEventListener('click', submitForm);

const container = document.querySelector(".container");
