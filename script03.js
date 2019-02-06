
function User(id,name, age) {
    this.getId = function() {
        return id;
    };
    this.getName = function() {
        return name;
    };
    this.getAge = function() {
        return age;
    };
}

var user2 = [
    new User(1, "ID", 30),
    new User(2, "HA", 20),
    new User(3, "JA", 40),
    new User(4, "HY", 25),
    new User(5, "HI", 32)
];

function find(list, predicate) {
    for(var i=0, len = list.length; i<len; i++){
        if(predicate(list[i])) return list[i];
    }
}

console.log(
    find(user2, function(u) { return u.getAge() == 25; }).getName()
);

console.log(
    find(users, function(u) { return u.name.indexOf('I') != -1; })
);

console.log(
    find(user2, function(u) { return u.getAge() < 30; }).getName()
);

console.log(map(
    filter(user2, function(u) { return u.getAge() > 30 }),
    function(u) { return u.getName(); }));

function bmatch1(key,val) {
    return function(obj) {
        return obj[key] === val;
    }
}

console.log( find(users, bmatch1('id',1)) );
console.log( find(users, bmatch1('name','ID5')) );
console.log( find(users, bmatch1('age',32)) );
console.log(filter(users, bmatch1('age',32))); // 필터함수 활용

console.log(map(users, bmatch1('age',32)));