const library = [];

const newBookForm = document.querySelector('.new-book-form');
const addBookButton = document.querySelector('.add-book');

addBookButton.addEventListener('click', displayBookForm)

function displayBookForm() {
  addBookButton.classList.add('hidden');
  newBookForm.classList.remove('hidden')
}

function hideBookForm() {
  newBookForm.classList.add('hidden')
  addBookButton.classList.remove('hidden');
}


newBookForm.addEventListener('submit', addBook);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary(book) {
  library.push(book);
}


const libraryItems = document.querySelector('.library-items');
libraryItems.addEventListener('click', deleteBook)
libraryItems.addEventListener('click', toggleRead)

function displayBooks() {
  libraryItems.innerHTML = library.map((book, i) => {
      return `<tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>
          <button class='progress' data-index='${i}'>
            ${book.read ?
              "<span class='material-icons'>task_alt</span>" : 
              "<span class='material-icons'>remove_circle_outline</span>"}
          </button>
        </td>
        <td><button class='delete' data-index='${i}'>Delete</button></td>
      </tr>`
    }).join('');
}

function addBook(e) {
  e.preventDefault();
  const title = this.querySelector('[name=title]').value
  const author = this.querySelector('[name=author]').value
  const pages = this.querySelector('[name=pages]').value
  const read = this.querySelector('[name=read]').checked
  book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  hideBookForm();
  displayBooks();

  console.log(title, author, pages, read);
}

function toggleRead(e) {
  if(!e.target.matches('.progress')) return;
  index = e.target.dataset.index
  console.log(index)
  library[index].read = !library[index].read
  displayBooks();
}

function deleteBook(e) {
  if(!e.target.matches('.delete')) return;
  library.splice(e.target.dataset.index, 1)
  displayBooks();
}

let theHobbit = new Book('The Hobbit', 'JR TOLKEIN', 444, true)
let exitWest = new Book('Exit West', 'Mohsin Hamid', 248, true)

addBookToLibrary(theHobbit)
addBookToLibrary(exitWest)
addBookToLibrary(new Book('Harry Potter', 'JK Rowling', 88))

displayBooks();