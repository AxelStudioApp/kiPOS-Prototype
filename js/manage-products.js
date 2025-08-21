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
}

function openAddProductModal() {
    document.getElementById('product-form').reset();
    document.getElementById('modal-title').textContent = translations[currentLang].addNewProduct;
    document.getElementById('modal-submit-btn').textContent = translations[currentLang].save;
    document.getElementById('product-id').value = '';
    document.getElementById('add-edit-product-modal').classList.add('active');
}

function openEditProductModal(productId, category) {
    const product = productsData[category].find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modal-title').textContent = translations[currentLang].editProductModal;
    document.getElementById('modal-submit-btn').textContent = translations[currentLang].saveChanges;
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-category').value = category;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-img-url').value = product.img;

    document.getElementById('add-edit-product-modal').classList.add('active');
}

document.getElementById('product-form').addEventListener('submit', function(event) {
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
});

function deleteProduct(productId, category) {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        productsData[category] = productsData[category].filter(product => product.id !== productId);
        saveProducts();
        renderProductManagement();
        showNotification('Produk berhasil dihapus!');
    }
}