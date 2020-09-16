function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}

Person.prototype.sayName = function () {
    console.log("Hello everybody, I am " + this.name);
};

Person.prototype.toString = function () {
    return "Person[ name = " + this.name + " age = " + this.age + " gender = " + this.gender + "]";
};

let person1 = new Person("CatZhang", 18, "Man");
let person2 = new Person("Jaslyn", 18, "Woman");
person1.sayName();
person2.sayName();
console.log(person1.toString());
console.log(person2.toString());
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));
console.log(person1.__proto__.__proto__ === Object.prototype);