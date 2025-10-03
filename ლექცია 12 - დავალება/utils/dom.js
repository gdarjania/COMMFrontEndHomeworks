// DOM მანიპულაციები და UI ფუნქციები

export function createProductCard(product) {
  const productDiv = document.createElement('div');
  productDiv.className = 'product-card';

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

export function displayProducts(productsContainer, products) {
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

export function displayProductDetail(container, product) {
  if (!product || product.error) {
    container.innerHTML = '<p class="error">Product not found.</p>';
    return;
  }

  container.innerHTML = `
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
}

export function showLoading(loadingElement, show = true) {
  if (show) {
    loadingElement.style.display = 'block';
  } else {
    loadingElement.style.display = 'none';
  }
}

export function showError(element, message) {
  element.innerHTML = message;
}
