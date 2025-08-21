function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (email === 'admin@kipos.com' && password === 'password') {
        const isVerifiedDevice = localStorage.getItem('is_verified_device') === 'true';
        if (!isVerifiedDevice) {
            document.getElementById('verification-email-target').textContent = email;
            showPage('otp-verification-page');
        } else {
            showPageWithLoader('onboarding-page');
        }
    } else {
        showNotification('Email atau password salah!', 'error');
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;
    document.getElementById('verification-email-target').textContent = email;
    showNotification('Kode OTP untuk reset password sudah dikirim ke email Anda.', 'success');
    showPage('otp-verification-page');
}

function handleOtpVerification(event) {
    event.preventDefault();
    const otp = [...document.querySelectorAll('#otp-verification-page .otp-inputs input')].map(input => input.value).join('');
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