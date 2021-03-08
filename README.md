# Library App

Simple Javascript Library app, created as part of the Odin Project [curriculum](https://www.theodinproject.com/courses/javascript/lessons/library). View [live page](https://andrewjh271.github.io/library/).

Books can be sorted by any of the headings. Data is persisted using `localStorage`.

###### Thoughts

I originally did not have `toggleRead()` as a function of`Book`, so line 89 changed from the first line to the second:

```javascript
library[index].read = !library[index].read;
```

```javascript
library[index].toggleRead();
```

I liked that the latter is more modular and readable, but it initially caused problems when recreating `library[]` using `JSON.parse` and `localStorage`, which cannot create custom objects. This was resolved with the line:

```javascript
library = JSON.parse(storedLibrary).map((book) => new Book(book));
```