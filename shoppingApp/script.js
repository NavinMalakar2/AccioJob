// Navbar toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Load Featured Products from FakeStore API
async function loadFeatured() {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=4");
    const data = await res.json();

    const featuredDiv = document.getElementById("featured-products");
    featuredDiv.innerHTML = data.map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title.slice(0,20)}...</h3>
        <p>₹${p.price}</p>
        <a href="Shop/index.html" class="btn">View</a>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error loading featured products", error);
  }
}

loadFeatured();
