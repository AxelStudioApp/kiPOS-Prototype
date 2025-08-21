let selectedPaymentMethod = 'tunai';
let discountPercentage = 0;

function applyDiscount() {
    const discountInput = document.getElementById('discount-input').value;
    discountPercentage = parseFloat(discountInput) || 0;
    if (discountPercentage > 100) discountPercentage = 100;
    if (discountPercentage < 0) discountPercentage = 0;
    
    document.getElementById('discount-input').value = discountPercentage;
    document.getElementById('discount-percentage-label').textContent = `${discountPercentage}%`;
    updatePaymentPage();
    showNotification(`Diskon ${discountPercentage}% berhasil diterapkan!`);
}

function updatePaymentPage() {
    const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discountPercentage) / 100;
    const totalAmount = subtotal - discountAmount;
    
    document.getElementById('payment-subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('payment-discount').textContent = `Rp ${discountAmount.toLocaleString('id-ID')}`;
    document.getElementById('payment-total-amount').textContent = `Rp ${totalAmount.toLocaleString('id-ID')}`;
    document.getElementById('discount-percentage-label').textContent = `${discountPercentage}%`;

    if (selectedPaymentMethod === 'qris') {
        generateQrCode();
    }
}

function selectPaymentMethod(element, method) {
    document.querySelectorAll('.method-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    selectedPaymentMethod = method;
    
    const qrContainer = document.getElementById('qr-code-container');
    if (method === 'qris') {
        qrContainer.style.display = 'flex';
        generateQrCode();
    } else {
        qrContainer.style.display = 'none';
    }
}

function generateQrCode() {
    const qrContainer = document.getElementById('qr-code-container');
    qrContainer.innerHTML = '';
    
    const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    const qrData = `KIOS|${Date.now()}|${subtotal}|${discountPercentage}`;

    new QRCode(qrContainer, {
        text: qrData,
        width: 150,
        height: 150,
    });
}

function completePayment() {
    if (Object.keys(cart).length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }

    const subtotal = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = (subtotal * discountPercentage) / 100;
    const transactionTotal = subtotal - discountAmount;

    const newTransaction = {
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: JSON.parse(JSON.stringify(cart)),
        subtotal: subtotal,
        discount: discountAmount,
        total: transactionTotal,
        paymentMethod: selectedPaymentMethod,
    };
    saleHistory.push(newTransaction);
    
    cart = {};
    discountPercentage = 0;
    saveCart();
    saveSaleHistory();
    
    showNotification('Pembayaran berhasil! Total: Rp ' + transactionTotal.toLocaleString('id-ID'));
    showPageWithLoader('home-page');
}