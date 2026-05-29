// Simple restaurant bill generator

function formatVnd(n) {
    return n.toLocaleString('vi-VN') + 'đ';
}

function calcBill(items, options = {}) {
    // items: [{name, price, qty}]
    // options: { day: 'Wednesday', tip: true }
    const day = options.day || '';
    const wantTip = !!options.tip;

    const lines = items.map((it, idx) => {
        const price = Number(it.price);
        const qty = Number(it.qty);
        const lineTotal = price * qty;
        return { idx: idx + 1, name: it.name, price, qty, lineTotal };
    });

    let subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);

    // Discount tiers
    let discountRate = 0;
    if (subtotal > 1000000) discountRate = 15;
    else if (subtotal > 500000) discountRate = 10;

    // Extra Wednesday discount
    if (day.toLowerCase() === 'wednesday' || day.toLowerCase() === 'thr 4' ) {
        // accept 'Wednesday' or localized, but primarily check english
        discountRate += 5;
    }

    const discountAmount = Math.round(subtotal * discountRate / 100);
    const afterDiscount = subtotal - discountAmount;

    const VAT_RATE = 8; // percent
    const vatAmount = Math.round(afterDiscount * VAT_RATE / 100);

    const afterVat = afterDiscount + vatAmount;

    let tipAmount = 0;
    if (wantTip) {
        tipAmount = Math.round(afterVat * 5 / 100);
    }

    const totalPay = afterVat + tipAmount;

    return {
        lines, subtotal, discountRate, discountAmount, vatAmount, tipAmount, totalPay
    };
}

function printInvoice(result) {
    const width = 40;
    const pad = (s, w) => s + ' '.repeat(Math.max(0, w - s.length));

    console.log('╔' + '═'.repeat(width) + '╗');
    console.log('║' + pad('        HÓA ĐƠN NHÀ HÀNG', width) + '║');
    console.log('╠' + '═'.repeat(width) + '╣');

    result.lines.forEach(l => {
        const left = `${l.idx}. ${l.name}`;
        const qty = `x${l.qty}`;
        const at = `@${(l.price/1000).toFixed(0)}k`;
        const eq = formatVnd(l.lineTotal);

        const line = pad(left, 16) + pad(qty, 6) + pad(at, 8) + pad(eq, 10);
        console.log('║ ' + line + ' ║');
    });

    console.log('╠' + '═'.repeat(width) + '╣');
    console.log('║ ' + pad('Tổng cộng:', 24) + pad(formatVnd(result.subtotal), 14) + ' ║');
    console.log('║ ' + pad(`Giảm giá (${result.discountRate}%):`, 24) + pad(formatVnd(result.discountAmount), 14) + ' ║');
    console.log('║ ' + pad('VAT (8%):', 24) + pad(formatVnd(result.vatAmount), 14) + ' ║');
    console.log('║ ' + pad('Tip (5%):', 24) + pad(formatVnd(result.tipAmount), 14) + ' ║');
    console.log('╠' + '═'.repeat(width) + '╣');
    console.log('║ ' + pad('THANH TOÁN:', 24) + pad(formatVnd(result.totalPay), 14) + ' ║');
    console.log('╚' + '═'.repeat(width) + '╝');
}

// Sample run
const items = [
    { name: 'Phở bò', price: 65000, qty: 2 },
    { name: 'Trà đá', price: 5000, qty: 3 },
    { name: 'Bún chả', price: 55000, qty: 1 },
];

const res = calcBill(items, { day: 'Wednesday', tip: true });
printInvoice(res);
