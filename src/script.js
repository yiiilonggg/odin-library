let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read) ? "has been read" : "has not been read"}.`
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBook(book) {
    const newBookCard = document.createElement("div");
    const newBookCardTitle = document.createElement("p");
    const newBookCardAuthor = document.createElement("p");
    const newBookCardPages = document.createElement("p");
    const newBookCardRead = document.createElement("img");

    newBookCard.className = "card"
    if (book.read) newBookCard.style.backgroundColor = "lightgreen";

    newBookCardTitle.textContent = book.title;
    newBookCardAuthor.textContent = book.author;
    newBookCardPages.textContent = `${book.pages} pages`;
    newBookCardRead.src = (book.read) ? "/img/check.svg" : "/img/dots-horizontal.svg";

    newBookCard.appendChild(newBookCardTitle);
    newBookCard.appendChild(newBookCardAuthor);
    newBookCard.appendChild(newBookCardPages);
    newBookCard.appendChild(newBookCardRead);

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
        displayBook(myLibrary[myLibrary.length - 1]);
        main.style.filter = "blur(0px)";
        popup.style.visibility = "hidden";
        errorMessage.style.visibility = "hidden";
    } else {
        errorMessage.style.visibility = "visible";
    }
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
