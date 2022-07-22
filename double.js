// const dbl = (num) => num * 2;

// console.log(dbl(process.argv[2]));

// console.log(global);

// // argument values
// console.log(process.argv[2]); //argument values
// or // const [, ,n] = process.argv;
// console.log(n);

const sum = (a,b) => { return a+b};
const [, , a,b] = process.argv;
console.log(sum(parseInt(a), parseInt(b)));