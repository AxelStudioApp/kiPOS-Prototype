function toggleDarkMode() {
    const root = document.documentElement;
    const isDarkMode = root.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function confirmLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('is_verified_device');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');
        localStorage.removeItem('theme');
        localStorage.removeItem('language');
        showPage('landing-page');
    }
}
