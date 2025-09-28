const API_URL = 'https://fakestoreapi.com/products';
const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const loading = document.getElementById('loading');

let allProducts = [];

async function fetchProducts() {
  try {
    loading.style.display = 'block';
    const response = await fetch(API_URL);
    const products = await response.json();
    allProducts = products;
    displayProducts(products);
    loading.style.display = 'none';
  } catch (error) {
    console.error('Error fetching products:', error);
    loading.innerHTML = 'Error loading products. Please try again.';
  }
}

function displayProducts(products) {
  productsContainer.innerHTML = '';

  if (products.length === 0) {
    productsContainer.innerHTML = '<p class="no-products">No products found.</p>';
    return;
  }

  products.forEach(product => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productDiv = document.createElement('div');
  productDiv.className = 'product-card';
  productDiv.onclick = () => goToProductDetail(product.id);

  productDiv.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}" />
    </div>
    <div class="product-info">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">$${product.price}</p>
      <p class="product-description">${product.description.substring(0, 100)}...</p>
    </div>
  `;

  return productDiv;
}

function goToProductDetail(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  let filteredProducts = allProducts;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  displayProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

fetchProducts();