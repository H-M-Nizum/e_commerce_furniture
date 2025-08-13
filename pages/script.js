import { data } from "../utils/data.js";

const title = document.querySelector("h1");
const input = document.querySelector(".form-control");
const resetButton = document.querySelector(".delete-button");
const container = document.querySelector(".products-container");
const categoriesContainer = document.querySelector(".buttons-container");
const spinner = document.getElementById("spinner");

// Set initial title
title.innerText = "Products";

// Create product cards
const createCards = (products) => {
  if (products.length === 0) {
    container.innerHTML = `<p class="text-danger">No products found.</p>`;
    return;
  }

  const cards = products.map(
    (product) => `
      <div class="col-md-3 mb-4">
        <div class="card" style="--bs-card-border-width: 0; position: relative;">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          ${
            product.stock === 0
              ? `<div class="position-absolute top-0 end-0 m-2 p-2 bg-danger text-white fw-bold rounded">
                  Out of Stock
                </div>`
              : ""
          }
          <div class="card-body">
            <h5 class="card-title pb-2 text-light">${product.title}</h5>
            <span class="card-genre badge bg-secondary text-light mb-2" style="font-size: 1rem; font-weight: normal; display: inline-block;">
              ${product.genre}
            </span>
            <p class="card-text">${product.description.slice(0, 50)}...</p>
            <a href="./product.html?prod=${product.id}" class="btn btn-outline-primary">View More</a>
          </div>
        </div>
      </div>
  `
  );

  container.innerHTML = cards.join("");
};

// Search functionality
const filterProducts = (event) => {
  const searchValue = event.target.value.toLowerCase();
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  createCards(filteredProducts);
};

// Reset search
resetButton.addEventListener("click", () => {
  input.value = "";
  createCards(data);
});

// Input search
input.addEventListener("input", filterProducts);

// Genres based on furniture data
const genres = ["All", "Dining Room", "Living Room", "Office", "Bedroom", "Outdoor", "Kitchen"];

// Create genre buttons
categoriesContainer.innerHTML = genres
  .map(
    (genre) => `<button class="btn btn-secondary me-2 mb-2 genre-button">${genre}</button>`
  )
  .join("");

// Filter by genre
const filterProductsByGenre = (genre) => {
  let filteredProducts;

  if (genre === "All") {
    filteredProducts = data;
    title.innerText = "Products";
  } else {
    filteredProducts = data.filter((product) =>
      product.genre.toLowerCase().includes(genre.toLowerCase())
    );
    title.innerText = `Products - ${genre}`;
  }

  createCards(filteredProducts);
};

// Add event listeners to genre buttons
const genreButtons = document.querySelectorAll(".genre-button");
genreButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    filterProductsByGenre(event.target.innerText);
  });
});

// Spinner with simulated loading
const myPromise = (products) => {
  spinner.style.display = "block";

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createCards(products));
      spinner.style.display = "none";
    }, 1000);
  });
};

// Initial load
myPromise(data);
