function sayHello(name, age) {
    console.log("Hello!!",name,"he is",age,"years old");
}

sayHello("Jung", 27);

//좀 바꿔보자!

function hello(name, age) {
    // console.log("Hello" + name + "you are" + age + "years old");
    // 벡틱 사용 ` 요거!
    // console.log(`Hello ${name} you are ${age} years old`);
    return `Hello ${name} you are ${age} years old`;
}
// hello("Jung Chang Yub", 27);
const getHello = hello("fuck", 17) //변수에 값을 넣기위해서는 함수에서 return 해줘야한다.

console.log(getHello)
const a = 10;
const b = 3;
const calulator = {
    plus : function(a, b){
        return a+b;
    },
    multi : function(a,b){
        return a*b;
    },
    division : function(a, b){
        return a/b;
    },
    minus : function(a, b){
        return a-b;
    },
    pow : function(a, b){
        return a**b;
    },
    mod : function(a, b){ //나머지값
        return a%b;
    }
}

const plus = calulator.plus(a, b)
const minus = calulator.minus(a, b)
const multi = calulator.multi(a, b)
const division = calulator.division(a, b)
const pow = calulator.pow(a, b)
const mod = calulator.mod(a, b)

console.log(`${a} + ${b} = ${plus}`)
console.log(`${a} - ${b} = ${minus}`)
console.log(`${a} * ${b} = ${multi}`)
console.log(`${a} / ${b} = ${division}`)
console.log(`${a} ** ${b} = ${pow}`)
console.log(`${a} % ${b} = ${mod}`)