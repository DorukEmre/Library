let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}



function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read)) 
}

function createNewCard(arrayNumber) {
    
    const section = document.createElement('section');
    section.className = `card card${arrayNumber}`;

    const pTitle =  document.createElement('p');
    pTitle.textContent = "Title: ";
    pModTitle =  document.createElement('p');
    pModTitle.className = 'title';
    const pAuthor =  document.createElement('p');
    pAuthor.textContent = "Author: "
    pModAuthor =  document.createElement('p');
    pModAuthor.className = 'author';
    const pPages =  document.createElement('p');
    pPages.textContent = "Pages: "
    pModPages =  document.createElement('p');
    pModPages.className = 'pages';
    const pRead =  document.createElement('p');
    pRead.textContent = "Read: "
    pModRead =  document.createElement('p');
    pModRead.className = 'read';
    pDelete =  document.createElement('p');
    pDelete.className = `delete delete${arrayNumber}`;
    pDelete.textContent = "Delete"

    const cardsContainer = document.querySelector('.cards-container');

    cardsContainer.appendChild(section);
    section.appendChild(pTitle);
    section.appendChild(pModTitle);
    section.appendChild(pAuthor);
    section.appendChild(pModAuthor);
    section.appendChild(pPages);
    section.appendChild(pModPages);
    section.appendChild(pRead);
    section.appendChild(pModRead); 
    section.appendChild(pDelete);  
}

function fillCard(arrayNumber) {
    pModTitle.textContent = myLibrary[arrayNumber].title;
    pModAuthor.textContent = myLibrary[arrayNumber].author;
    pModPages.textContent = myLibrary[arrayNumber].pages;
    pModRead.textContent = myLibrary[arrayNumber].read;
}

function displayBook(arrayNumber) {
    createNewCard(arrayNumber);
    fillCard(arrayNumber);    
}

function displayForm() {
    const addForm = document.querySelector('.add-form');
    addForm.classList.add("popup")
}
function hideForm() {
    const addForm = document.querySelector('.popup');
    addForm.classList.remove("popup")
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet')
addBookToLibrary('The Purple Teddy Bear', 'J. Tesch-Cassady', '36', 'not read yet')
addBookToLibrary('The Thursday Murder Club', 'R. Osman', '400', 'not read yet')
addBookToLibrary('Time for dinner', 'E. Raymond', '300', 'not read yet')

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(i)
    }
} 


function addUserBook(title, author, pages, read) {
    console.log("Submit hit");
    console.log(myLibrary.length-1)

    const form = document.getElementById('add-book');
    const titleInput = form.elements['form-title']
    const authorInput = form.elements['form-author']
    const pagesInput = form.elements['form-pages']
    const readInput = form.elements['form-read']
    
    console.log(titleInput.value)
    console.log(authorInput.value)
    console.log(pagesInput.value)
    console.log(readInput.value)

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
    displayBook(myLibrary.length-1);
    document.getElementById('add-book').reset();
    hideForm();


// window.localStorage.setItem('user', JSON.stringify(person));
}
function deleteCard(arrayNumber) {
    console.log(`delete ${arrayNumber}`)
    console.table(myLibrary)
    myLibrary.splice(arrayNumber, 1)
    console.table(myLibrary)

    const cardToDelete = document.querySelector(`.card${arrayNumber}`);
    cardToDelete.remove();

}

displayLibrary()

document.querySelector(".add-button").addEventListener("click", displayForm); 
document.querySelector(".cancel").addEventListener("click", hideForm); 

document.querySelector(".submit").addEventListener("click", addUserBook); 
const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach((deleteButton) => {

    deleteButton.addEventListener("click", function(e) {
    deleteCard(deleteButton.classList.value.slice(-1)); 
    })
})


const form = document.querySelector('form');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', function(e) {
    e.preventDefault();
  });
