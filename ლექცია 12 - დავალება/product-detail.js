import { fetchProductById } from './utils/api.js';
import { displayProductDetail, showLoading, showError } from './utils/dom.js';
import { getProductIdFromURL, goBack } from './utils/navigation.js';

const productDetailContainer = document.getElementById('product-detail');
const loading = document.getElementById('loading');
const backButton = document.getElementById('back-button');

async function loadProductDetail(productId) {
  try {
    showLoading(loading, true);
    const product = await fetchProductById(productId);
    displayProductDetail(productDetailContainer, product);
    showLoading(loading, false);

    // Add event listeners after product is displayed
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');

    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        alert('Product added to cart!');
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        alert('Redirecting to checkout...');
      });
    }
  } catch (error) {
    console.error('Error fetching product detail:', error);
    showError(loading, 'Error loading product details. Please try again.');
  }
}

// Add back button event listener
if (backButton) {
  backButton.addEventListener('click', goBack);
}

const productId = getProductIdFromURL();
if (productId) {
  loadProductDetail(productId);
} else {
  productDetailContainer.innerHTML = '<p class="error">No product ID provided.</p>';
  showLoading(loading, false);
}