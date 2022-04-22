// import '@babel/polyfill'

function add(a, b) {
  return a + b;
}

console.log(add(1, 2));


const promise = new Promise(resolve => {
  setTimeout(() => {
    resolve('定时器执行完成')
  }, 1000);
}).then(str => {
  console.log(str)
});

console.log(promise)