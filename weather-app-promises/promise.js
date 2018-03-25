// const promise = new Promise((resolve, reject) => {
//   // resolve('Using promises!!!!');
//   reject('Error!!!!');
// });

// promise.then((msg) => {
//   console.log(`The return result is: ${msg}`);
// }, (msg) => {
//   console.log(`${msg}`);
// })

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') resolve(a + b);
      else reject('Arguments must be numbers!');
    }, 2000);
  });
}

add('3', 9)
  .then((result) => {
    console.log(result);
    return add(result, result);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })