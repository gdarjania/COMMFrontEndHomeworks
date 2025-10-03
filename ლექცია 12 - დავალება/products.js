import { fetchProducts } from './utils/api.js';
import { createProductCard, showLoading, showError } from './utils/dom.js';
import { goToProductDetail } from './utils/navigation.js';

const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const loading = document.getElementById('loading');

let allProducts = [];

async function loadProducts() {
  try {
    showLoading(loading, true);
    const products = await fetchProducts();
    allProducts = products;
    renderProducts(products);
    showLoading(loading, false);
  } catch (error) {
    console.error('Error fetching products:', error);
    showError(loading, 'Error loading products. Please try again.');
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = '';

  if (products.length === 0) {
    productsContainer.innerHTML = '<p class="no-products">No products found.</p>';
    return;
  }

  products.forEach(product => {
    const productCard = createProductCard(product);
    productCard.onclick = () => goToProductDetail(product.id);
    productsContainer.appendChild(productCard);
  });
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

  renderProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

loadProducts();