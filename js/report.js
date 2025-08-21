let monthlyChart;

function renderReports() {
    const monthlySalesLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthlySalesData = [6500000, 5900000, 8000000, 8100000, 5600000, 5500000, 4000000, 7000000, 7500000, 6800000, 9000000, 8500000];
    const monthlyCtx = document.getElementById('monthly-sales-chart').getContext('2d');
    if (monthlyChart) monthlyChart.destroy();
    monthlyChart = new Chart(monthlyCtx, {
        type: 'line',
        data: {
            labels: monthlySalesLabels,
            datasets: [{
                label: 'Penjualan',
                data: monthlySalesData,
                fill: true,
                borderColor: 'rgba(56, 161, 105, 1)',
                backgroundColor: 'rgba(56, 161, 105, 0.2)',
                tension: 0.3
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