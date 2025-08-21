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

    const fallbackImage = "data:image/svg+xml,%3Csvg xmlns=&quot;http://www.w3.org/2000/svg&quot; height=&quot;48&quot; width=&quot;48&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;%23cccccc&quot;%3E%3Cpath d=&quot;M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z&quot;/&gt;%3C/svg%3E";

selectedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img 
            src="${product.img}" 
            alt="${product.name}"
            onerror="this.onerror=null; this.src='${fallbackImage}';"
        >
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