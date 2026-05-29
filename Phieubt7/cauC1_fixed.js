// Fixed version of the buggy function from Câu C1
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Ensure inputs are numbers
    giaBan = Number(giaBan);
    phanTramGiam = Number(phanTramGiam);

    if (isNaN(giaBan) || giaBan < 0) {
        return "Giá bán không hợp lệ";
    }

    if (isNaN(phanTramGiam) || phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    var giamGia = giaBan * phanTramGiam / 100;
    let giaSauGiam = giaBan - giamGia;

    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

// Tests
const gia = tinhGiaGiamGia("100000", 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

// Demonstrate closure fix: use let in loop so each timeout prints its own index
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
