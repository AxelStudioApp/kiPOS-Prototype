// 1. Add/Edit/Delete Products in Product Management
function renderProductManagement() {
    const productList = document.getElementById('manage-product-list');
    if (!productList) return;

    productList.innerHTML = '';

    const allProducts = Object.values(productsData).flat();
    if (allProducts.length === 0) {
        productList.innerHTML = `<p style="text-align: center; color: var(--text-light);">Belum ada produk.</p>`;
        return;
    }

    allProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="details">
                <div class="name">${product.name}</div>
                <div class="price">Rp ${product.price.toLocaleString('id-ID')}</div>
            </div>
            <div class="action-buttons">
                <button class="edit" onclick="openEditProductModal(${product.id}, '${product.category}')"><i class="material-icons-outlined">edit</i></button>
                <button class="delete" onclick="deleteProduct(${product.id}, '${product.category}')"><i class="material-icons-outlined">delete</i></button>
            </div>
        `;
        productList.appendChild(item);
    });

    // Pindahkan event listener ke sini
    const productForm = document.getElementById('product-form');
    if (productForm && !productForm.dataset.listenerAttached) {
        productForm.addEventListener('submit', handleProductFormSubmit);
        productForm.dataset.listenerAttached = 'true';
    }
}

function handleProductFormSubmit(event) {
    event.preventDefault();
    const id = document.getElementById('product-id').value;
    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value;
    const price = parseInt(document.getElementById('product-price').value);
    const img = document.getElementById('product-img-url').value || 'https://via.placeholder.com/150';

    if (id) {
        // Edit existing product
        const oldCategory = Object.keys(productsData).find(cat => productsData[cat].some(p => p.id == id));
        if (oldCategory && oldCategory !== category) {
            productsData[oldCategory] = productsData[oldCategory].filter(p => p.id != id);
            if (!productsData[category]) productsData[category] = [];
            productsData[category].push({ id: parseInt(id), name, price, img, category });
        } else {
            const productIndex = productsData[category].findIndex(p => p.id == id);
            if (productIndex > -1) {
                productsData[category][productIndex] = { id: parseInt(id), name, price, img, category };
            }
        }
        showNotification('Produk berhasil diubah!');
    } else {
        // Add new product
        const newId = Date.now();
        if (!productsData[category]) productsData[category] = [];
        productsData[category].push({ id: newId, name, price, img, category });
        showNotification('Produk berhasil ditambahkan!');
    }
    saveProducts();
    renderProductManagement();
    closeModal('add-edit-product-modal');
}

function openAddProductModal() {
    const form = document.getElementById('product-form');
    if (form) form.reset();
    
    const title = document.getElementById('modal-title');
    if (title) title.textContent = translations[currentLang].addNewProduct;
    
    const submitBtn = document.getElementById('modal-submit-btn');
    if (submitBtn) submitBtn.textContent = translations[currentLang].save;
    
    const productIdInput = document.getElementById('product-id');
    if (productIdInput) productIdInput.value = '';
    
    const modal = document.getElementById('add-edit-product-modal');
    if (modal) modal.classList.add('active');
}

function openEditProductModal(productId, category) {
    const product = productsData[category].find(p => p.id === productId);
    if (!product) return;
    
    const title = document.getElementById('modal-title');
    if (title) title.textContent = translations[currentLang].editProductModal;
    
    const submitBtn = document.getElementById('modal-submit-btn');
    if (submitBtn) submitBtn.textContent = translations[currentLang].saveChanges;
    
    const productIdInput = document.getElementById('product-id');
    if (productIdInput) productIdInput.value = product.id;
    
    const productCategorySelect = document.getElementById('product-category');
    if (productCategorySelect) productCategorySelect.value = category;
    
    const productNameInput = document.getElementById('product-name');
    if (productNameInput) productNameInput.value = product.name;
    
    const productPriceInput = document.getElementById('product-price');
    if (productPriceInput) productPriceInput.value = product.price;
    
    const productImgUrlInput = document.getElementById('product-img-url');
    if (productImgUrlInput) productImgUrlInput.value = product.img;

    const modal = document.getElementById('add-edit-product-modal');
    if (modal) modal.classList.add('active');
}

function deleteProduct(productId, category) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        productsData[category] = productsData[category].filter(product => product.id !== productId);
        saveProducts();
        renderProductManagement();
        showNotification('Produk berhasil dihapus!');
    }
}