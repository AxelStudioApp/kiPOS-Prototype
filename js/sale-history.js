function renderSaleHistory() {
    const historyList = document.getElementById('sale-history-list');
    if (!historyList) return;

    historyList.innerHTML = '';
    
    if (saleHistory.length === 0) {
        historyList.innerHTML = `<p style="text-align: center; color: var(--text-light);">${translations[currentLang].noSaleHistory}</p>`;
        return;
    }
    
    saleHistory.reverse().forEach(sale => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <div class="info">
                <h4>Transaksi #${sale.id.toString().slice(-6)}</h4>
                <span>${sale.date}</span>
            </div>
            <div class="total">
                Rp ${sale.total.toLocaleString('id-ID')}
            </div>
        `;
        historyList.appendChild(item);
    });
}