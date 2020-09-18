function Person(name, age) {
    this.name = name;
    this.age = age;
}

let personArray = [new Person("孙悟空", 18),
    new Person("猪八戒", 28),
    new Person("沙和尚", 38),
    new Person("白骨精", 18),
    new Person("红孩儿", 8),
    new Person("蜘蛛精", 20)];

function getAdult(personArray) {
    let ageArray = [];
    for (let i = 0; i < personArray.length; i++) {
        if (personArray[i].age >= 18) {
            ageArray.push(personArray[i]);
        }
    }
    return ageArray;
}

console.log(getAdult(personArray));