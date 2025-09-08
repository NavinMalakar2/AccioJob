let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

// Display cart items
function displayCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "0";
    checkoutBtn.disabled = true;
    return;
  }

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>$${item.price}</p>
      <button data-index="${index}">Remove</button>
    `;
    // Remove item event
    div.querySelector("button").addEventListener("click", (e)=>{
      const idx = e.target.getAttribute("data-index");
      cart.splice(idx,1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    });

    cartItemsContainer.appendChild(div);
  });

  totalPriceEl.textContent = total.toFixed(2);
  checkoutBtn.disabled = false;
}

displayCart();

// Checkout with Razorpay
checkoutBtn.addEventListener("click", ()=>{
  if(cart.length === 0) return alert("Cart is empty!");

  let totalAmount = 0;
  cart.forEach(item => totalAmount += item.price);

  var options = {
    key: "rzp_test_RF4HTDkQbrx1ig", // Replace with your Razorpay key
    amount: totalAmount*100, // in paisa
    currency: "INR",
    name: "MyShop",
    description: "Test Transaction",
    handler: function (response){
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    },
    prefill: {
      name: "Customer",
      email: "customer@example.com"
    },
    theme: {
      color: "#007bff"
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
});
