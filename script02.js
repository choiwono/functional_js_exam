var users = [
    { id: 1, name: "ID1", age: 32 },
    { id: 2, name: "ID2", age: 25 },
    { id: 3, name: "JM", age: 32 },
    { id: 4, name: "ID4", age: 28 },
    { id: 5, name: "ID5", age: 27 },
];

// 필터
function filter(list,predicate) {
    var new_list = []; // 반환값으로 사용할 리스트 선언
    for (var i=0, len = list.length; i<len; i++) { // 리스트 배열길이 만큼 반복
        if(predicate(list[i])) new_list.push(list[i]); // predicate에 조건에 따라서 new_list에 값을 저장
    }
    return new_list; // 값을 배열로 리턴해준다.
}

// 입력
function map(list, iteratee) { // 무조건 리스트 배열을 받아서 리스트 배열 숫자만큼 값을 입력받아서 리턴해준다.
    var new_list = [];
    for (var i=0, len=list.length; i<len; i++) {
        new_list.push(iteratee(list[i])); // list 변수값을 받은만큼 반복함
    }
    return new_list;
}

// 출력
function log_length(value) { // 값의 길이와, 값을 무조건 출력해준다
    console.log(value.length);
    return value;
}

console.log(log_length(
    map(filter(users, function(user){ return user.age < 30 }),
    function(user) { return user.name; })
))

function addMaker(a) {
    return function(b) {
        return a+b;
    }
}

function bvalue(key) {
    return function(obj) { // obj 자료형을 받아서 키값이 a인값을 리턴해준다.
        return obj[key];
    }
}

console.log(bvalue('a')({a:'hi',b:'hello'})); // 출력값 hi

console.log(log_length(
    map(filter(users, u => u.age < 30), u => u.age)));

var under_30 = u => u.age < 30;
var over_30 = u => u.age >= 30;

console.log(log_length(
    map(filter(users, under_30), u => u.age)
));

var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);

console.log(log_length(ages(filter(users,under_30))));
console.log(log_length(names(filter(users,under_30))));

var bvalues = key => list => map(list, v => v[key]);
var ages = bvalues('age');

var users = [
    { id: 1, name: "ID1", age: 32 },
    { id: 2, name: "ID2", age: 25 },
    { id: 3, name: "ID3", age: 32 },
    { id: 4, name: "ID4", age: 28 },
    { id: 5, name: "ID5", age: 27 },
];

console.log(
    filter(users, function(user) { return user.id == 3 })[0]
)

var user;
for (var i=0, len = users.length; i < len; i++) {
    if(users[i].id == 3) {
        user = users[i];
        break;
    }
}
console.log(user);

function findById(list, id) {
    for (var i = 0, len = list.length; i < len; i++) {
        if(list[i].id == id) return list[i];
    }
}
console.log(findById(users, 3));

function findBy(list, key, val) {
    for (var i=0, len=list.length; i<len; i++) {
        if(list[i][key] === val) return list[i];
    }
}

console.log(findBy(users,'id',5));