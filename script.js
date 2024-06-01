let invoices = [];
let salesComparisonChart;

function addInvoice() {
    let invoiceType = document.getElementById('invoiceType').value;
    let itemName = document.getElementById('itemName').value;
    let amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount)) {
        alert("لطفاً مقدار معتبر وارد کنید.");
        return;
    }

    invoices.push({ type: invoiceType, itemName: itemName, amount: amount });
    updateInvoicesList();
    calculateFinancialReport();
    updateSalesComparisonChart();
}

function updateInvoicesList() {
    let invoicesList = document.getElementById('invoicesList');
    invoicesList.innerHTML = "";
    invoices.forEach((invoice, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<span>فاکتور ${index + 1}: نوع: ${invoice.type}, نام کالا: ${invoice.itemName}, مقدار: ${invoice.amount}</span>
                              <button onclick="editInvoice(${index})">ویرایش</button>
                              <button onclick="deleteInvoice(${index})">حذف</button>`;
        invoicesList.appendChild(listItem);
    });
}

function calculateFinancialReport() {
    let totalPurchase = invoices.filter(invoice => invoice.type === 'purchase').reduce((acc, curr) => acc + curr.amount, 0);
    let totalSale = invoices.filter(invoice => invoice.type === 'sale').reduce((acc, curr) => acc + curr.amount, 0);
    let profit = totalSale - totalPurchase;
    let financialReport = document.getElementById('financialReport');
    financialReport.innerHTML = `کل خرید: ${totalPurchase}<br>کل فروش: ${totalSale}<br>سود/زیان: ${profit}`;
}

function updateSalesComparisonChart() {
    if (salesComparisonChart) {
        salesComparisonChart.destroy();
    }

    let purchaseTotal = invoices.filter(invoice => invoice.type === 'purchase').reduce((acc, curr) => acc + curr.amount, 0);
    let saleTotal = invoices.filter(invoice => invoice.type === 'sale').reduce((acc, curr) => acc + curr.amount, 0);

    let ctx = document.getElementById('salesComparisonChart').getContext('2d');
    salesComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['خرید', 'فروش'],
            datasets: [{
                label: 'مقدار',
                data: [خرید, فروش],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function editInvoice(index) {
    let editedType = prompt("نوع فاکتور را ویرایش کنید:", invoices[index].type);
    let editedItemName = prompt("نام کالا را ویرایش کنید:", invoices[index].itemName);
    let editedAmount = parseFloat(prompt("مقدار را ویرایش کنید:", invoices[index].amount));

    if (isNaN(editedAmount)) {
        alert("لطفاً مقدار معتبر وارد کنید.");
        return;
    }

    invoices[index] = { type: editedType, itemName: editedItemName, amount: editedAmount };
    updateInvoicesList();
    calculateFinancialReport();
    updateSalesComparisonChart();
}

function deleteInvoice(index) {
    if (confirm("آیا مطمئن هستید که می‌خواهید این فاکتور را حذف کنید؟")) {
        invoices.splice(index, 1);
        updateInvoicesList();
        calculateFinancialReport();
        updateSalesComparisonChart();
    }
}
