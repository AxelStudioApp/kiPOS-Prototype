// Data Global
const products = {
    'Makanan': [
        { id: 1, name: 'Nasi Goreng Spesial', price: 20000, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', category: 'Makanan' },
        { id: 2, name: 'Ayam Bakar Madu', price: 25000, img: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500', category: 'Makanan' },
        { id: 3, name: 'Sate Ayam Bumbu Kacang', price: 18000, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', category: 'Makanan' },
    ],
    'Minuman': [
        { id: 4, name: 'Es Teh Manis', price: 5000, img: 'https://images.unsplash.com/photo-1521587765099-ef13a693c06e?w=500', category: 'Minuman' },
        { id: 5, name: 'Kopi Susu Gula Aren', price: 12000, img: 'https://images.unsplash.com/photo-1551028150-64b9f398f67e?w=500', category: 'Minuman' },
        { id: 6, name: 'Jus Jeruk Segar', price: 10000, img: 'https://images.unsplash.com/photo-1579737207905-ac1ae933f7ed?w=500', category: 'Minuman' },
    ],
    'Snack': [
        { id: 7, name: 'Kentang Goreng Keju', price: 15000, img: 'https://images.unsplash.com/photo-1628178129037-184514ac8f25?w=500', category: 'Snack' },
        { id: 8, name: 'Roti Bakar Coklat', price: 12000, img: 'https://images.unsplash.com/photo-1558961363-fa14f3299a9a?w=500', category: 'Snack' },
    ]
};

const translations = {
    en: {
        welcome: 'Point of Sales solution for your business',
        login: 'Login',
        register: 'Register',
        dashboard: 'Dashboard',
        sales: 'Sales',
        products: 'Products',
        history: 'History',
        reports: 'Reports',
        cart: 'Cart',
        payment: 'Payment',
        addProduct: 'Add Product',
        editProduct: 'Edit Product',
        delete: 'Delete',
        all: 'All',
        food: 'Food',
        drink: 'Drink',
        snack: 'Snack',
        totalSalesToday: 'Today\'s Total Sales',
        totalProfitToday: 'Today\'s Total Profit',
        weeklySales: 'Weekly Sales',
        topProducts: 'Top Selling Products',
        productManagement: 'Product Management',
        addNewProduct: 'Add New Product',
        editProductModal: 'Edit Product',
        productName: 'Product Name',
        price: 'Price',
        imageURL: 'Image URL',
        save: 'Save',
        saleHistory: 'Sale History',
        noSaleHistory: 'No sale history yet.',
        monthlySales: 'Monthly Sales',
        settings: 'Settings',
        userProfile: 'User Profile',
        darkMode: 'Dark Mode',
        changeLanguage: 'Change Language',
        logout: 'Logout',
        saveChanges: 'Save Changes',
        emptyCart: 'Your cart is empty.',
        total: 'Total:',
        payNow: 'Pay Now',
        backToCart: 'Back to Cart',
        paymentTitle: 'Payment',
        subtotal: 'Subtotal',
        discount: 'Discount',
        totalPayment: 'Total Payment',
        selectMethod: 'Select Payment Method',
        cash: 'Cash',
        confirmPayment: 'Confirm Payment',
        offlineMessage: 'You are offline. Data will be synced when you\'re back online.',
    },
    id: {
        welcome: 'Solusi Point of Sales untuk bisnis Anda',
        login: 'Masuk',
        register: 'Daftar',
        dashboard: 'Dashboard',
        sales: 'Penjualan',
        products: 'Produk',
        history: 'Riwayat',
        reports: 'Laporan',
        cart: 'Keranjang',
        payment: 'Pembayaran',
        addProduct: 'Tambah Produk',
        editProduct: 'Edit Produk',
        delete: 'Hapus',
        all: 'Semua',
        food: 'Makanan',
        drink: 'Minuman',
        snack: 'Snack',
        totalSalesToday: 'Total Penjualan Hari Ini',
        totalProfitToday: 'Keuntungan Hari Ini',
        weeklySales: 'Penjualan Mingguan',
        topProducts: 'Produk Terlaris',
        productManagement: 'Manajemen Produk',
        addNewProduct: 'Tambah Produk Baru',
        editProductModal: 'Ubah Produk',
        productName: 'Nama Produk',
        price: 'Harga',
        imageURL: 'URL Gambar',
        save: 'Simpan',
        saleHistory: 'Riwayat Penjualan',
        noSaleHistory: 'Belum ada riwayat penjualan.',
        monthlySales: 'Penjualan Bulan Ini',
        settings: 'Pengaturan',
        userProfile: 'Profil Pengguna',
        darkMode: 'Mode Gelap',
        changeLanguage: 'Ganti Bahasa',
        logout: 'Keluar',
        saveChanges: 'Simpan Perubahan',
        emptyCart: 'Keranjang belanja Anda kosong.',
        total: 'Total:',
        payNow: 'Bayar Sekarang',
        backToCart: 'Kembali ke Keranjang',
        paymentTitle: 'Pembayaran',
        subtotal: 'Total Belanja',
        discount: 'Diskon',
        totalPayment: 'Total Pembayaran',
        selectMethod: 'Pilih Metode Pembayaran',
        cash: 'Tunai',
        confirmPayment: 'Konfirmasi Pembayaran',
        offlineMessage: 'Anda sedang offline. Data akan disinkronkan saat online.',
    }
};

let currentLang = localStorage.getItem('language') || 'id';
let cart = JSON.parse(localStorage.getItem('kipos_cart')) || {};
let saleHistory = JSON.parse(localStorage.getItem('kipos_sale_history')) || [];
let currentPage = 'kipos-loader';
const pageHistory = [];
let productsData = JSON.parse(localStorage.getItem('kipos_products')) || products;

const isVerifiedDevice = localStorage.getItem('is_verified_device') === 'true';

document.addEventListener('DOMContentLoaded', async () => {
    document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
    if(document.getElementById('dark-mode-toggle')) {
      document.getElementById('dark-mode-toggle').checked = localStorage.getItem('theme') === 'dark';
    }
    
    setLanguage(currentLang);
    await loadPage('kipos-loader');
    setTimeout(async () => {
        await loadPage(isVerifiedDevice ? 'dashboard-page' : 'landing-page');
    }, 2000); 

    window.addEventListener('online', syncData);
    window.addEventListener('offline', () => {
        const offlineNotif = document.getElementById('offline-notification');
        if (offlineNotif) offlineNotif.style.display = 'flex';
        showNotification(translations[currentLang].offlineMessage, 'error');
    });
    if (!navigator.onLine) {
        const offlineNotif = document.getElementById('offline-notification');
        if (offlineNotif) offlineNotif.style.display = 'flex';
    }
});

async function loadPage(pageName) {
    const pageId = pageName;
    const container = document.getElementById('app-content');
    const pagePath = `pages/${pageId}.html`;

    try {
        const response = await fetch(pagePath);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');
        const html = await response.text();
        container.innerHTML = html;
        showPage(pageId);
        
        // Inisialisasi skrip spesifik setelah halaman dimuat
        initializePageScripts(pageId);

    } catch (error) {
        console.error('Gagal memuat halaman:', error);
        showNotification('Gagal memuat halaman. Mohon coba lagi.', 'error');
    }
}

function initializePageScripts(pageId) {
    if (pageId === 'dashboard-page') {
        renderDashboard();
    } else if (pageId === 'home-page') {
        renderHomePage();
    } else if (pageId === 'product-list-page') {
        filterProducts('all'); // Inisialisasi daftar produk
    } else if (pageId === 'cart-page') {
        renderCart();
    } else if (pageId === 'manage-products-page') {
        renderProductManagement();
    } else if (pageId === 'payment-page') {
        updatePaymentPage();
    } else if (pageId === 'sale-history-page') {
        renderSaleHistory();
    } else if (pageId === 'report-page') {
        renderReports();
    }
}

function showAppUI(show) {
    const header = document.getElementById('app-header');
    const footer = document.getElementById('app-footer-nav');
    if (header) header.style.display = show ? 'flex' : 'none';
    if (footer) footer.style.display = show ? 'flex' : 'none';
}

function saveProducts() {
    localStorage.setItem('kipos_products', JSON.stringify(productsData));
}

function saveCart() {
    localStorage.setItem('kipos_cart', JSON.stringify(cart));
    updateCartCount();
}

function saveSaleHistory() {
    localStorage.setItem('kipos_sale_history', JSON.stringify(saleHistory));
}

function showPage(pageId) {
    const pageElement = document.getElementById(pageId);
    if (!pageElement) return;

    const flow = pageElement.getAttribute('data-flow');
    
    if (flow === 'app') {
        showAppUI(true);
    } else {
        showAppUI(false);
    }

    if (pageId !== currentPage && flow === document.getElementById(currentPage)?.getAttribute('data-flow') && pageId !== 'general-loader' && pageId !== 'kipos-loader') {
         pageHistory.push(currentPage);
    } else if (flow !== document.getElementById(currentPage)?.getAttribute('data-flow')) {
         pageHistory.length = 0;
    }

    const container = document.getElementById('app-content');
    Array.from(container.children).forEach(child => child.style.display = 'none');
    pageElement.style.display = 'block';

    document.querySelectorAll('.footer-nav button').forEach(btn => btn.classList.remove('active'));
    const footerBtn = document.getElementById(pageId.replace('-page', '-btn'));
    if(footerBtn) {
        footerBtn.classList.add('active');
    }

    const header = document.querySelector('.header');
    if (header) {
      if (flow === 'app' && pageId !== 'home-page') {
          header.classList.add('app-mode');
      } else {
          header.classList.remove('app-mode');
      }
    }
    
    currentPage = pageId;
}

function goBack() {
    if (pageHistory.length > 0) {
        const prevPage = pageHistory.pop();
        loadPage(prevPage);
    } else {
        loadPage('dashboard-page');
    }
}

function showPageWithLoader(pageId) {
    loadPage('general-loader');
    setTimeout(() => {
        loadPage(pageId);
    }, 1000);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function updateQuantity(id, change) {
    if (cart[id]) {
        cart[id].quantity += change;
        if (cart[id].quantity <= 0) {
            delete cart[id];
        }
    }
    saveCart();
    renderCart(); // Tambahkan ini agar tampilan keranjang diperbarui
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    // Panggil ulang render fungsi untuk memperbarui teks
    if (currentPage === 'dashboard-page') renderDashboard();
    if (currentPage === 'manage-products-page') renderProductManagement();
    if (currentPage === 'sale-history-page') renderSaleHistory();
    if (currentPage === 'report-page') renderReports();
    showNotification(`Bahasa diubah menjadi ${lang.toUpperCase()}`);
}
