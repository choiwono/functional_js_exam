function addMaker(a) {
    return function(b) {
        return a+b;
    }
}
console.log(addMaker(10)(5)); // 15

var add5 = addMaker(5);
console.log(add5(5)); // 10
console.log(add5(4)); // 9

var v1 = 100;
var v2 = function() {};
function f1() { return 100; } // 값을 리턴한다.
function f2() { return function() {}; } // 변수에 함수를 담을수있다.

console.log(f1()); // 100
console.log(f2()); // f2

var users = [
    { id: 1, name: "ID1", age: 32 },
    { id: 2, name: "ID2", age: 25 },
    { id: 3, name: "ID3", age: 32 },
    { id: 4, name: "ID4", age: 28 },
    { id: 5, name: "ID5", age: 27 },
];

function filter(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i<len; i++) {
        if(predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
}

var users_under_30 = filter(users, function(any) {return any.age < 30});
console.log(users_under_30);

var users_id = filter(users, function(any) { return any.id == 1 });
console.log(users_id);

function map(list, iteratee) {
    var new_list = [];
    for(var i =0, len = list.length; i<len; i++) {
        new_list.push(iteratee(list[i]));
    }
    return new_list;
}

var users_map_30 = filter(users, function(user) { return user.age<30 });
console.log(users_map_30);

var names = map(users_map_30, function(user) { return user.name });
console.log(names);

var ages = map(filter(
    users, function(user) { return user.age < 30 }),
    function(user) { return user.age; } 
)

console.log(ages);

var names = map(
    filter(users, function(user){ return user.age >= 30 }),
    function(user) { return user.name; });

console.log(names);    

function log_length(value) {
    console.log(value.length);
    return value;
}

console.log(log_length(
    map(
        filter(users, function(user) { return user.age<30 }),
        function(user) { return user.age; }
    )
))