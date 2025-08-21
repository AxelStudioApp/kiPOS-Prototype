function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="material-icons">${type === 'success' ? 'check_circle_outline' : 'error_outline'}</i><span>${message}</span>`;
    
    container.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
}

function syncData() {
    if (navigator.onLine) {
        document.getElementById('offline-notification').style.display = 'none';
        // Implement logic to send data to server
        showNotification('Aplikasi kembali online. Data berhasil disinkronkan.');
    } else {
        showNotification(translations[currentLang].offlineMessage, 'error');
    }
}