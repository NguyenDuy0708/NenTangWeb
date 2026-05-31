function calculate(a,op,b){
    switch(op){
        case "+": return a+b;
        case "-": return a-b;
        case "*": return a*b;
        case "/": 
            return b!==0?
                a/b : "Không thể chia cho 0";
        default: return "Phép toán không hợp lệ";
    }
}

console.log(calculate(5,"+",3));
console.log(calculate(5,"-",3));
console.log(calculate(5,"*",3));
console.log(calculate(5,"/",0));
console.log(calculate(5,"/",2));