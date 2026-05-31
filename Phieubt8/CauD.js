function createCart(){
    let item = [];
    return {
        addItem(name,price){
            item.push({name,price});
        },
        getTotal(){
            return item.reduce(
                (sum, item) => sum + item.price, 0
            )
        },
        printCart(){
            console.log("Giỏ hàng:");
            item.forEach((item, index) => {
                console.log(`${index + 1}. ${item.name} - $${item.price}`);
            });
            console.log(`Tổng tiền: $${this.getTotal()}`);
        },
        removeItem(name){
            item = item.filter(item => item.name !== name);
        }
    }
}

const cart = createCart();
cart.addItem("Sản phẩm A", 100);
cart.addItem("Sản phẩm B", 200);


cart.removeItem("Sản phẩm A");
cart.printCart();