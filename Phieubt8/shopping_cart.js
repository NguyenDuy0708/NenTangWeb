function createCart() {
  let items = []; // { id, name, price, quantity }
  let discount = { type: null, value: 0 };

  function findIndex(productId) {
    return items.findIndex(it => it.id === productId);
  }

  function formatMoney(v) {
    return v.toLocaleString('vi-VN') + 'đ';
  }

  return {
    addItem(product, quantity = 1) {
      const idx = findIndex(product.id);
      if (idx >= 0) {
        items[idx].quantity += quantity;
      } else {
        items.push({ id: product.id, name: product.name, price: product.price, quantity });
      }
    },

    removeItem(productId) {
      items = items.filter(it => it.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      const idx = findIndex(productId);
      if (idx >= 0) {
        if (newQuantity <= 0) items.splice(idx, 1);
        else items[idx].quantity = newQuantity;
      }
    },

    getTotal() {
      const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
      let total = subtotal;
      if (discount.type === 'percent') total = Math.round(total * (1 - discount.value));
      else if (discount.type === 'fixed') total = Math.max(0, total - discount.value);
      return total;
    },

    applyDiscount(code) {
      if (code === 'SALE10') { discount = { type: 'percent', value: 0.10 }; }
      else if (code === 'SALE20') { discount = { type: 'percent', value: 0.20 }; }
      else if (code === 'FREESHIP') { discount = { type: 'fixed', value: 30000 }; }
      else discount = { type: null, value: 0 };
    },

    printCart() {
      if (items.length === 0) {
        console.log('Giỏ hàng rỗng');
        return;
      }

      // Table header
      console.log('┌─────────────────────────────────────────────────────────────────────────┐');
      console.log('│ # │ Sản phẩm                │ SL  │ Đơn giá        │ Tổng               │');
      console.log('├─────────────────────────────────────────────────────────────────────────┤');
      items.forEach((it, i) => {
        const idx = (i + 1).toString().padEnd(2, ' ');
        const name = it.name.padEnd(22, ' ');
        const qty = it.quantity.toString().padStart(3, ' ');
        const price = it.price.toLocaleString('vi-VN').padStart(13, ' ');
        const lineTotal = (it.price * it.quantity).toLocaleString('vi-VN').padStart(17, ' ');
        console.log(`│ ${idx}│ ${name} │ ${qty} │ ${price} │ ${lineTotal} │`);
      });
      console.log('├─────────────────────────────────────────────────────────────────────────┤');
      const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
      const total = this.getTotal();
      const subtotalStr = subtotal.toLocaleString('vi-VN') + 'đ';
      const totalStr = total.toLocaleString('vi-VN') + 'đ';
      console.log(`│ Tổng cộng: ${' '.repeat(35 - subtotalStr.length)}${subtotalStr} │`);
      if (discount.type) {
        console.log(`│ Sau giảm giá: ${' '.repeat(33 - totalStr.length)}${totalStr} │`);
      } else {
        console.log(`│ Tổng (không giảm): ${' '.repeat(29 - totalStr.length)}${totalStr} │`);
      }
      console.log('└─────────────────────────────────────────────────────────────────────────┘');
    },

    getItemCount() {
      return items.reduce((s, it) => s + it.quantity, 0);
    },

    clearCart() {
      items = [];
      discount = { type: null, value: 0 };
    }
  };
}

// === TEST ===
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // 2

module.exports = { createCart };
