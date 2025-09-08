
const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("category");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const ratingFilter = document.getElementById("rating");
const colorFilter = document.getElementById("color");
const sizeFilter = document.getElementById("size");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
const updateCartCount = () => {
  document.getElementById("cartCount").textContent = cart.length;
};
updateCartCount();

// Random colors & sizes
const colors = ["Red", "Blue", "Green", "Black", "White"];
const sizes = ["S", "M", "L", "XL"];

// Fetch products
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    // Add fake color & size fields
    products = data.map(p => ({
      ...p,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)]
    }));
    displayProducts(products);
  })
  .catch(err => console.error(err));

// Display products
function displayProducts(items) {
  productsContainer.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <p>$${item.price}</p>
      <small>⭐ ${item.rating.rate} | ${item.color}, ${item.size}</small>
      <button>Add to Cart</button>
    `;
    // Add to cart
    card.querySelector("button").addEventListener("click", () => {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert("Added to cart!");
    });
    productsContainer.appendChild(card);
  });
}

// Search functionality
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
});

// Filters
categoryFilter.addEventListener("change", applyFilters);
priceRange.addEventListener("input", () => {
  priceValue.textContent = priceRange.value;
  applyFilters();
});
ratingFilter.addEventListener("change", applyFilters);
colorFilter.addEventListener("change", applyFilters);
sizeFilter.addEventListener("change", applyFilters);

// Apply all filters
function applyFilters() {
  let filtered = [...products];
  const cat = categoryFilter.value;
  const maxPrice = priceRange.value;
  const minRating = parseFloat(ratingFilter.value);
  const selectedColor = colorFilter.value;
  const selectedSize = sizeFilter.value;

  if (cat) filtered = filtered.filter(p => p.category === cat);
  filtered = filtered.filter(p => p.price <= maxPrice);
  filtered = filtered.filter(p => p.rating.rate >= minRating);
  if (selectedColor) filtered = filtered.filter(p => p.color === selectedColor);
  if (selectedSize) filtered = filtered.filter(p => p.size === selectedSize);

  displayProducts(filtered);
}
