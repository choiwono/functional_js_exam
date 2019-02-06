
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

function object(key,val) {
    var obj = {};
    obj[key] = val;
    return obj;
}

function match(obj, obj2) {
    for (var key in obj2) {
        if(obj[key] !== obj2[key]) return false;
    }
    return true;
}

function bmatch(obj2, val) {
    if(arguments.length == 2) obj2 = object(obj2, val);
    return function(obj) {
        return match(obj, obj2);
    }
}

console.log(
    match(find(users, bmatch('id',3)), find(users, bmatch('name','ID3')))
);

console.log(
    find(users, function(u) { return u.age == 32 && u.name == 'ID3' })
);

console.log(
    find(users, bmatch({ name: 'ID3', age:32 }))
);