// js/login.js

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email === 'admin@kipos.com' && password === 'password') {
        const isVerifiedDevice = localStorage.getItem('is_verified_device') === 'true';
        if (!isVerifiedDevice) {
            // KIRIM DATA EMAIL SEBAGAI ARGUMEN
            loadPage('otp-verification-page', { emailToDisplay: email });
        } else {
            showPageWithLoader('onboarding-page');
        }
    } else {
        showNotification('Email atau password salah!', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const storeName = document.getElementById('store-name').value;
    const ownerName = document.getElementById('owner-name').value;
    const businessCategory = document.getElementById('business-category').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    localStorage.setItem('store_name', storeName);
    showNotification('Registrasi berhasil! Silakan cek email Anda untuk kode verifikasi.', 'success');
    // KIRIM DATA EMAIL SEBAGAI ARGUMEN
    loadPage('otp-verification-page', { emailToDisplay: email });
}

function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;
    // KIRIM DATA EMAIL SEBAGAI ARGUMEN
    loadPage('otp-verification-page', { emailToDisplay: email });
    showNotification('Kode OTP untuk reset password sudah dikirim ke email Anda.', 'success');
}

function handleOtpVerification(event) {
    event.preventDefault();
    const otpInputs = document.querySelectorAll('#otp-verification-page .otp-inputs input');
    const otp = [...otpInputs].map(input => input.value).join('');

    if (otp === '123456') {
        localStorage.setItem('is_verified_device', 'true');
        showNotification('Verifikasi berhasil!', 'success');
        showPageWithLoader('onboarding-page');
    } else {
        showNotification('Kode OTP salah!', 'error');
    }
}

function moveToNext(currentInput) {
    if (currentInput.value.length === 1) {
        const nextInput = currentInput.nextElementSibling;
        if (nextInput) {
            nextInput.focus();
        }
    }
}