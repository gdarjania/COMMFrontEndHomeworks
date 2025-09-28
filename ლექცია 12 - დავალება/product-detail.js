const API_URL = 'https://fakestoreapi.com/products';
const productDetailContainer = document.getElementById('product-detail');
const loading = document.getElementById('loading');

function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function fetchProductDetail(productId) {
  try {
    loading.style.display = 'block';
    const response = await fetch(`${API_URL}/${productId}`);
    const product = await response.json();
    displayProductDetail(product);
    loading.style.display = 'none';
  } catch (error) {
    console.error('Error fetching product detail:', error);
    loading.innerHTML = 'Error loading product details. Please try again.';
  }
}

function displayProductDetail(product) {
  if (!product || product.error) {
    productDetailContainer.innerHTML = '<p class="error">Product not found.</p>';
    return;
  }

  productDetailContainer.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">
        <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-detail-info">
        <h1 class="product-detail-title">${product.title}</h1>
        <div class="product-detail-category">
          <span class="category-label">Category:</span>
          <span class="category-value">${product.category}</span>
        </div>
        <div class="product-detail-price">
          <span class="price">$${product.price}</span>
        </div>
        <div class="product-detail-rating">
          <span class="rating">★ ${product.rating?.rate || 'N/A'}</span>
          <span class="rating-count">(${product.rating?.count || 0} reviews)</span>
        </div>
        <div class="product-detail-description">
          <h3>Description</h3>
          <p>${product.description}</p>
        </div>
        <div class="product-actions">
          <button class="add-to-cart-btn">Add to Cart</button>
          <button class="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  `;

  const addToCartBtn = document.querySelector('.add-to-cart-btn');
  const buyNowBtn = document.querySelector('.buy-now-btn');

  addToCartBtn.addEventListener('click', () => {
    alert('Product added to cart!');
  });

  buyNowBtn.addEventListener('click', () => {
    alert('Redirecting to checkout...');
  });
}

function goBack() {
  window.history.back();
}

const productId = getProductIdFromURL();
if (productId) {
  fetchProductDetail(productId);
} else {
  productDetailContainer.innerHTML = '<p class="error">No product ID provided.</p>';
  loading.style.display = 'none';
}