function handleRegister(event) {
    event.preventDefault();
    const storeName = document.getElementById('store-name').value;
    const ownerName = document.getElementById('owner-name').value;
    const businessCategory = document.getElementById('business-category').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    localStorage.setItem('store_name', storeName);
    document.getElementById('verification-email-target').textContent = email;
    showNotification('Registrasi berhasil! Silakan cek email Anda untuk kode verifikasi.', 'success');
    showPage('otp-verification-page');
}