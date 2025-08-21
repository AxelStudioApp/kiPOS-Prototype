let weeklyChart;

function renderDashboard() {
    const todaySales = saleHistory
        .filter(sale => new Date(sale.id).toDateString() === new Date().toDateString())
        .reduce((sum, sale) => sum + sale.total, 0);

    const totalSalesEl = document.getElementById('total-sales');
    if (totalSalesEl) {
        totalSalesEl.textContent = `Rp ${todaySales.toLocaleString('id-ID')}`;
    }

    const totalProfitEl = document.getElementById('total-profit');
    if (totalProfitEl) {
        totalProfitEl.textContent = `Rp ${(todaySales * 0.3).toLocaleString('id-ID')}`; 
    }

    const weeklyCtx = document.getElementById('weekly-sales-chart')?.getContext('2d');
    if (weeklyCtx) {
        if (weeklyChart) weeklyChart.destroy();
        const weeklySalesLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
        const weeklySalesData = [100000, 150000, 200000, 180000, 250000, 300000, todaySales];
        
        weeklyChart = new Chart(weeklyCtx, {
            type: 'bar',
            data: {
                labels: weeklySalesLabels,
                datasets: [{
                    label: 'Penjualan',
                    data: weeklySalesData,
                    backgroundColor: 'rgba(56, 161, 105, 0.8)',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `Rp ${value.toLocaleString('id-ID')}`
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    renderTopProducts();
}

function renderTopProducts() {
    const topProducts = saleHistory.flatMap(sale => Object.values(sale.items))
        .reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {});

    const sortedProducts = Object.entries(topProducts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const topProductsContainer = document.getElementById('top-products');
    if (!topProductsContainer) return;

    topProductsContainer.innerHTML = '';
    if (sortedProducts.length === 0) {
        topProductsContainer.innerHTML = `<p style="text-align: center; color: var(--text-light);">Belum ada produk terlaris.</p>`;
        return;
    }

    sortedProducts.forEach(([name, quantity]) => {
        const productElement = document.createElement('li');
        productElement.innerHTML = `
            <span>${name}</span>
            <span>${quantity} terjual</span>
        `;
        topProductsContainer.appendChild(productElement);
    });
}