
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

function findIndex(list, predicate) {
    for ( var i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i])) return i;
    }
    return -1;
}

console.log(findIndex(users, bmatch({ age:27 })));

_.map = function(list,iteratee) {
    var new_list = [];
    for (var i = 0, len=list.length; i<len; i++) {
        new_list.push(iteratee(list[i],i,list));
    }
    return new_list;
};

_.filter = function(list, predicate) {
    var new_list = [];
    for (var i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i], i, list)) new_list.push(list[i]);
    }
    return new_list;
};

_.find = function(list,predicate) {
    for(var i = 0, len = list.length; i < len; i++) {
        if (predicate(list[i],i,list)) return list[i];
    }
};

_.findIndex = function(list,predicate) {
    for (var i = 0, len = list.length; i < len; i++) {
        if(predicate(list[i], i, list)) return i;
    }
    return -1;
};

console.log(_.filter([1,2,3,4], function(val,idx) {
    return idx > 0; })
);

console.log(_.filter([1,2,3,4], function(val,idx) {
    return idx % 2 == 0;    
}));

// 1-31
_.identity = function(v) { return v; }
var a = 10;
console.log(_.identity(a));

// 1-32
console.log(_.filter([true, 0, 10, 'a', null],_.identity)); // identity를 통해서 잘못된 값을 필터링했다.
// console = true,10,'a'

_.falsy = function(v) { return !v; };
_.truthy = function(v) { return !!v; };

// 1-33

_.some = function(list) {
    return !!_.find(list,_.identity);
};

_.every = function(list) {
    return _.filter(list, _.identity).length == list.length;
};

console.log(_.some([0,null,2]));
console.log(_.some([0,null,false]));

console.log(_.every(0, null, 2)); // 모든 리스트의 값을 체크
console.log(_.every([{},true,2]));

// 1-34

function not(v) { return !v; }
function beq(a) {
    return function(b) {
        return a === b;
    }
}

// 1-35

_.some = function(list) {
    return !!_.find(list, _.identity);
};

_.every = function(list) {
    return beq(-1)(_.findIndex(list,not));
};

console.log(_.some([0,null,2]));
console.log(_.some([0,null,false]));
console.log(_.every([0,null,2]));
console.log(_.every([{},true,2]));

function positive(list) {
    return _.find(list, _.identity);
}

function negativeIndex(list) {
    return _.findIndex(list, not);
}

/*_.some = function(list) {
    return not(not(positive(list)));
}

_.every = function(list) {
    return beq(-1)(negativeIndex(list));
}*/

console.log(not(positive([0,null,2])));

console.log(_.some([0,null,2]));
console.log(_.some([0,null,false]));
console.log(_.every([0,null,2]));
console.log(_.every([{},true,2]));

// 1-37

_.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this,result);
        return result;
    };
};

var greet = function(name) { return "hi: " + name };
var exclaim = function(statement) { return statement.toUpperCase() + "!"; };
var welcome = _.compose(greet, exclaim);
console.log(welcome("moe"));

_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);

// 1-39

function f1() {}
var a = typeof f1 == 'function' ? f1 : function() {};

function f2() {
    return function() {};
}

console.log((function(a,b){ return a + b; })(10,5));

function callAndAdd(a,b) {
    return a() + b();
}
callAndAdd(function() { return 10; }, function() { return 5; });