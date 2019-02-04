var users = [
    { id: 1, name: "ID1", age: 32 },
    { id: 2, name: "ID2", age: 25 },
    { id: 3, name: "ID3", age: 32 },
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