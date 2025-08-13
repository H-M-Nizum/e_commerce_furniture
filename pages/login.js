import { user } from "../utils/user.js";

const form = document.querySelector("#form");
const errorText = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = form.elements.email.value;
  const password = form.elements.password.value;
  console.log("email : ", email, "password : ", password)

  if (user.email === email && user.password === password) {
    console.log("Match email and password ")
    // Save email and password
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    // Initialize empty cart and quantity
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("quantity", 0);

    // Redirect to product page
    window.location.href = "./product.html";
  } else {
    errorText.style.display = "flex";
    form.reset();

    Toastify({
      text: "Error: no se pudo iniciar sesión. Por favor, verifica tus credenciales.",
      className: "error",
      style: { background: "#dc3545", color: "#fff" },
      duration: 4000,
    }).showToast();
  }
});

// If user already logged in, redirect to index.html
const userEmail = localStorage.getItem("userEmail");
const userPassword = localStorage.getItem("userPassword");

if (userEmail && userPassword) {
  window.location.href = "./index.html";
}
