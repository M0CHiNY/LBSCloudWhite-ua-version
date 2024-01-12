import footer from '../html-parts/footer.html';
import header from '../html-parts/header.html';// Шлях до файлу
import accordion from "../html-parts/accordion.html";

  

// // Функція для перевірки наявності елемента в DOM
function isElementExist(elementId) {
  return document.getElementById(elementId) !== null;
}

if (isElementExist('header')) {
  document.getElementById('header').innerHTML = header; // пошук у файлі по ID
}

if (isElementExist('footer')) {
  document.getElementById('footer').innerHTML = footer;
}

if (isElementExist("accordion")) {
  document.getElementById("accordion").innerHTML = accordion;
}
