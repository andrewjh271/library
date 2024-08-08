const form = document.querySelector('.new-book-form');
const { title, author, pages } = form;

window.addEventListener('load', loadValidations);

title.addEventListener('input', titleValidity);
author.addEventListener('input', authorValidity);

function loadValidations() {
  titleValidity();
  authorValidity();
}

function titleValidity() {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Please enter a title!');
  } else {
    title.setCustomValidity('');
  }
}

function authorValidity() {
  if (author.validity.valueMissing) {
    author.setCustomValidity('Please enter an author!');
  } else {
    author.setCustomValidity('');
  }
}

function pagesValidity() {
  if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity('Number of pages must be at least 1!');
  } else {
    pages.setCustomValidity('');
  }
}

form.addEventListener('submit', (e) => {
  form.classList.remove('not-submitted');
  pages.reportValidity();
  author.reportValidity();
  title.reportValidity();
});
