let phoneReg = /^1[3-9]\d{9}$/;
console.log(phoneReg.test("15803074145"));

let str = "       hello         ";
console.log(str);
console.log(str.replace(/^\s+|\s+$/g, ""));

let emailReg = /^\w{3,}(\.\w+)*@[a-z0-9A-Z]+(\.[a-zA-Z]{2,5}){1,2}$/;
console.log(emailReg.test("crazycatzhang@outlook.com"));