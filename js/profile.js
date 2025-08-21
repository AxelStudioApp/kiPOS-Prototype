function updateProfile(event) {
    event.preventDefault();
    const nameInput = document.getElementById('profile-name');
    const emailInput = document.getElementById('profile-email');

    if (!nameInput || !emailInput) return;

    const name = nameInput.value;
    const email = emailInput.value;

    localStorage.setItem('user_name', name);
    localStorage.setItem('user_email', email);
    showNotification('Profil berhasil diperbarui!');
}