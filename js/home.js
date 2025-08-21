function renderHomePage() {
    filterProducts('all');
}

function filterProducts(category) {
    const productListContainer = document.getElementById('product-items-container');
    const categoryTabs = document.getElementById('product-filter-tabs');

    if (!productListContainer || !categoryTabs) {
        // Elemen belum dimuat, ini akan diatasi oleh loadPage
        return;
    }
    
    categoryTabs.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
    });
    const selectedBtn = categoryTabs.querySelector(`button[onclick="filterProducts('${category}')"]`);
    if (selectedBtn) selectedBtn.classList.add('active');

    productListContainer.innerHTML = '';
    
    let selectedProducts;
    if (category === 'all') {
        selectedProducts = Object.values(productsData).flat();
    } else {
        selectedProducts = productsData[category];
    }

    if (!selectedProducts || selectedProducts.length === 0) {
        productListContainer.innerHTML = `<p style="text-align: center; color: var(--text-light);">Tidak ada produk di kategori ini.</p>`;
        return;
    }

    selectedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="add-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.img}')">
                    <i class="material-icons-outlined" style="font-size: 1.2em; margin-right: 5px;">add_circle_outline</i>
                    Tambah
                </button>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });
}

function addToCart(id, name, price, img) {
    if (cart[id]) {
        cart[id].quantity++;
    } else {
        cart[id] = { id, name, price, img, quantity: 1 };
    }
    saveCart();
    showNotification(`${name} ditambahkan ke keranjang!`);
}

function renderCart() {
    const cartList = document.getElementById('cart-list');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (!cartList || !cartSummary || !emptyCartMessage) {
      return;
    }

    cartList.innerHTML = '';
    const cartItems = Object.values(cart);
    
    if (cartItems.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }

    emptyCartMessage.style.display = 'none';
    cartSummary.style.display = 'block';

    let subtotal = 0;
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="item-details">
                <b>${item.name}</b>
                <span>Rp ${item.price.toLocaleString('id-ID')}</span>
            </div>
            <div class="quantity-control">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="item-price">
                Rp ${itemTotal.toLocaleString('id-ID')}
            </div>
        `;
        cartList.appendChild(cartItemElement);
    });

    const cartTotalElement = document.getElementById('cart-total-price');
    if (cartTotalElement) {
        cartTotalElement.textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    }
}