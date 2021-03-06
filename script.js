const library = [];

const libraryItems = document.querySelector('.library-items');
const addBookButton = document.querySelector('.add-book');
const newBookForm = document.querySelector('.new-book-form');
const headers = document.querySelectorAll('th');

libraryItems.addEventListener('click', deleteBook)
libraryItems.addEventListener('click', toggleRead)

addBookButton.addEventListener('click', displayBookForm)
newBookForm.addEventListener('submit', addBook);
headers.forEach(header => header.addEventListener('click', sortDisplay));

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
};

function addBookToLibrary(book) {
  library.push(book);
}

function displayBooks(sortParam = null) {
  libraryItems.innerHTML = library
    .sort((a, b) => a[sortParam] < b[sortParam] ? -1 : 1)
    .map((book, i) => {
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

function sortDisplay(e) {
  param = e.target.textContent.toLowerCase().replace('?', '');
  console.log(param);
  displayBooks(param);
}

function displayBookForm() {
  addBookButton.classList.add('hidden');
  newBookForm.classList.remove('hidden')
}

function hideBookForm() {
  newBookForm.classList.add('hidden')
  addBookButton.classList.remove('hidden');
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
  this.reset();
}

function toggleRead(e) {
  if(!e.target.matches('.progress')) return;
  index = e.target.dataset.index
  library[index].read = !library[index].read
  displayBooks();
}

function deleteBook(e) {
  if(!e.target.matches('.delete')) return;
  library.splice(e.target.dataset.index, 1)
  displayBooks();
}

const books = [];
books[1] = new Book('The Far Field', 'Madhuri Vijay', 432, false);
books[2] = new Book('Discourses and Selected Writings', 'Epictetus', 245, false);
books[3] = new Book('Exit West', 'Mohsin Hamid', 231, true);
books[4] = new Book('Einstein\'s Dreams', 'Alan Lightman', 140, false);
books[5] = new Book('One Good Turn', 'Kate Atkinson', 418, true);
books[6] = new Book('The Sense of an Ending', 'Julian Barnes', 163, true);
books[7] = new Book('The Idiot', 'Fyodor Dostoevsky', 615, true);

books.forEach(book => addBookToLibrary(book));

displayBooks();