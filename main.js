let myLibrary = [];

function Book(title, author, pages, read, ref) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.ref = ref
}

function addBookToLibrary(title, author, pages, read, ref) {
    myLibrary.push(new Book(title, author, pages, read, ref)) 
}

function createNewCard(refNumber) {
    
    const section = document.createElement('section');
    section.className = `card`;
    section.dataset.ref = `${refNumber}`;

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
    pDelete.className = `delete`;
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

    // EventListener to delete card added when card is created
    const deleteButton = section.querySelector(".delete");
    deleteButton.addEventListener("click", function(e) {
            deleteCard(parseInt(deleteButton.parentElement.dataset.ref)); 
        })
}

function fillCard(refNumber) {
    pModTitle.textContent = myLibrary[refNumber].title;
    pModAuthor.textContent = myLibrary[refNumber].author;
    pModPages.textContent = myLibrary[refNumber].pages;
    pModRead.textContent = myLibrary[refNumber].read;
}

function displayBook(refNumber) {
    createNewCard(refNumber);
    fillCard(refNumber);    
}

function displayAddBookForm() {
    const addForm = document.querySelector('.add-form');
    addForm.classList.add("popup")
}
function hideAddBookForm() {
    document.getElementById('add-book').reset(); // clear form
    const addForm = document.querySelector('.popup');
    addForm.classList.remove("popup")
}

function userAddBook(title, author, pages, read) {
    console.log("Submit button clicked");

    const form = document.getElementById('add-book');
    const titleInput = form.elements['form-title']
    const authorInput = form.elements['form-author']
    const pagesInput = form.elements['form-pages']
    const readInput = form.elements['form-read']
    // (ref of new book) is (ref of the last item of myLibrary +1)
    const refNumberOfNewBook = myLibrary[myLibrary.length-1].ref + 1;

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value, refNumberOfNewBook);
    displayBook(myLibrary.length-1);
    hideAddBookForm();
}
    

function deleteCard(refNumber) {
    console.log(`delete ref ${refNumber}`)
    
    let itemToDelete = myLibrary.find(item => item.ref === refNumber);
    let arrayNumber = myLibrary.indexOf(itemToDelete);
    myLibrary.splice(arrayNumber, 1)

    const cardToDelete = document.querySelector(`[data-ref="${refNumber}"]`);
    cardToDelete.remove();
}

document.querySelector(".add-button").addEventListener("click", displayAddBookForm); 
document.querySelector(".cancel").addEventListener("click", hideAddBookForm); 
document.querySelector(".submit").addEventListener("click", userAddBook); 

const form = document.querySelector('form');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', function(e) {
    e.preventDefault();
  });



// demo books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet', 0)
addBookToLibrary('The Purple Teddy Bear', 'J. Tesch-Cassady', '36', 'not read yet', 1)
addBookToLibrary('The Thursday Murder Club', 'R. Osman', '400', 'not read yet', 2)
addBookToLibrary('Time for dinner', 'E. Raymond', '300', 'not read yet', 3)

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i].ref)
    }
} 

displayLibrary()