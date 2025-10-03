// ნავიგაციის ფუნქციები

export function goToProductDetail(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

export function goBack() {
  window.history.back();
}

export function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}
