// File: cart.js
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load từ localStorage

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Chưa có sản phẩm nào</li>";
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ${item.price.toLocaleString()} đ
        <div style="display:inline-block;margin-left:10px;">
            <button class="decrease" data-index="${index}">-</button>
            <span style="margin:0 5px">${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
        </div>
      `;
      cartItems.appendChild(li);
    });
  }

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total.toLocaleString();
  saveCart();
}

// Khi click nút "Thêm vào giỏ"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const parent = event.target.closest(".product-item");
    const name = parent.querySelector("h3").textContent.trim();
    const price = parseInt(button.getAttribute("data-price"), 10);

    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
  });
});

// Tăng giảm số lượng sản phẩm trong giỏ hàng
cartItems.addEventListener("click", (event) => {
  const index = parseInt(event.target.getAttribute("data-index"), 10);
  if (isNaN(index)) return;

  if (event.target.classList.contains("decrease")) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    updateCartDisplay();
  }

  if (event.target.classList.contains("increase")) {
    cart[index].quantity += 1;
    updateCartDisplay();
  }
});

// Khi click icon giỏ hàng
const cartButton = document.getElementById("cart-button");
const cartDropdown = document.getElementById("cart-dropdown");

cartButton.addEventListener("click", (event) => {
  event.preventDefault();
  cartDropdown.classList.toggle("active");
});

// Khi tải trang
updateCartDisplay();
