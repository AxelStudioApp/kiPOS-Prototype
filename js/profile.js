function updateProfile(event) {
    event.preventDefault();
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;

    localStorage.setItem('user_name', name);
    localStorage.setItem('user_email', email);
    showNotification('Profil berhasil diperbarui!');
}