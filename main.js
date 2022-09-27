let myLibrary = [];

const formBookTitle = document.getElementById('form-title');
const formBookAuthor = document.getElementById('form-author');
const formBookPages = document.getElementById('form-pages');

formBookTitle.addEventListener("input", (event) => {
  formBookTitle.setCustomValidity("");
  // if (!formBookTitle.validity.valueMissing) {
  //   formBookTitle.setCustomValidity("");
  // }  
});

formBookAuthor.addEventListener("input", (event) => {
  formBookAuthor.setCustomValidity("");
  // if (!formBookAuthor.validity.valueMissing) {
  //   formBookAuthor.setCustomValidity("");
  // } 
});

formBookPages.addEventListener("input", (event) => {
  console.log(formBookPages.validity)
  console.log(formBookPages.validationMessage)

  
  formBookPages.setCustomValidity("");
  
  if (formBookPages.validity.badInput) {
    console.log('event listener')
    formBookPages.setCustomValidity("Use numbers only.");
  } 
  // if (!formBookPages.validity.valueMissing && !formBookPages.validity.badInput) {
  //   formBookPages.setCustomValidity("");
  // } 
});


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

function displayBook(refNumber) {
    // Find index number in the array based on ref Number
    const arrayNumber = myLibrary.findIndex(item => item.ref === refNumber)
    
    const section = document.createElement('section');
    section.className = `card`;
    section.dataset.ref = `${refNumber}`;

    const pTitle =  document.createElement('p');
    pTitle.textContent = "Title: ";
    const pModTitle =  document.createElement('p');
    pModTitle.className = 'title';
    const pAuthor =  document.createElement('p');
    pAuthor.textContent = "Author: "
    const pModAuthor =  document.createElement('p');
    pModAuthor.className = 'author';
    const pPages =  document.createElement('p');
    pPages.textContent = "Pages: "
    const pModPages =  document.createElement('p');
    pModPages.className = 'pages';
    const pRead =  document.createElement('p');
    pRead.textContent = "Read: "
    const pModRead =  document.createElement('p');
    pModRead.className = 'read';
    const pEdit =  document.createElement('p');
    pEdit.className = 'edit';
    pEdit.textContent = "[Edit]"
    const pDelete =  document.createElement('p');
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
    section.appendChild(pEdit);
    section.appendChild(pDelete);  

    pModTitle.textContent = myLibrary[arrayNumber].title;
    pModAuthor.textContent = myLibrary[arrayNumber].author;
    pModPages.textContent = myLibrary[arrayNumber].pages;
    pModRead.textContent = myLibrary[arrayNumber].read;

    // EventListener to delete card added when card is created
    const deleteButton = section.querySelector(".delete");
    deleteButton.addEventListener("click", function(e) {
            deleteCard(parseInt(deleteButton.parentElement.dataset.ref)); 
        })
    // EventListener to edit card read status
    const edit = section.querySelector(".edit");
    edit.addEventListener("click", function(e) {
        editReadStatus(parseInt(edit.parentElement.dataset.ref)); 
    })
}


function displayAddBookForm() {
    const addForm = document.querySelector('.add-form-section');
    addForm.classList.add("popup")
}
function hideAddBookForm() {
    document.getElementById('add-book').reset(); // clear form
    const addForm = document.querySelector('.popup');
    addForm.classList.remove("popup")
}

function checkFormValidity() {
  if (formBookTitle.validity.valueMissing) {
    formBookTitle.setCustomValidity("Enter a book title.");
  } else if (formBookAuthor.validity.valueMissing) {
    formBookAuthor.setCustomValidity("Enter an author name.");
  } else if (formBookPages.validity.badInput) {
    console.log('3')
    formBookPages.setCustomValidity("Use numbers only.");
  } else if (formBookPages.validity.valueMissing) {
    formBookPages.setCustomValidity("Enter the number of pages.");
  } else {
    userAddBook()
  }
}

function userAddBook() {  
    const form = document.getElementById('add-book');
    const titleInput = form.elements['form-title']
    const authorInput = form.elements['form-author']
    const pagesInput = form.elements['form-pages']
    const readInput = form.elements['form-read']

    let refNumberOfNewBook = 0;
    // (ref of new book) is (highest ref of myLibrary + 1)
    if (myLibrary.length > 0) {
        refNumberOfNewBook = (myLibrary.reduce((a, b) => (a.ref > b.ref) ? a : b).ref) + 1;
    }

    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value, refNumberOfNewBook);
    displayBook(refNumberOfNewBook);
    hideAddBookForm();
  
}
    
function editReadStatus(refNumber) {
    const arrayNumber = myLibrary.findIndex(item => item.ref === refNumber)

    if (myLibrary[arrayNumber].read === "Yes") {
        myLibrary[arrayNumber].read = "No"
    } else if (myLibrary[arrayNumber].read === "No") {
        myLibrary[arrayNumber].read = "Yes"
    }
    
    const cardToEdit = document.querySelector(`[data-ref="${refNumber}"]`);
    const pModReadToEdit = cardToEdit.querySelector(".read");
    pModReadToEdit.textContent = myLibrary[arrayNumber].read;
}

function deleteCard(refNumber) {
    const arrayNumber = myLibrary.findIndex(item => item.ref === refNumber)
    myLibrary.splice(arrayNumber, 1)

    const cardToDelete = document.querySelector(`[data-ref="${refNumber}"]`);
    cardToDelete.remove();
}

document.querySelector(".add-book-button").addEventListener("click", displayAddBookForm); 
document.querySelector(".cancel").addEventListener("click", hideAddBookForm); 
document.querySelector(".submit").addEventListener("click", checkFormValidity); 

const form = document.querySelector('form');

// Stop the form from submitting when a button is pressed
form.addEventListener('submit', function(e) {
    e.preventDefault();
  });

// demo books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '310', 'No', 0)
addBookToLibrary('A Tale of Two Cities', 'Charles Dickens', '544', 'No', 1)
addBookToLibrary('Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', '223', 'Yes', 2)
addBookToLibrary('The Little Prince', 'Antoine de Saint-Exupéry', '96', 'No', 3)

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i].ref)
    }
} 

displayLibrary()