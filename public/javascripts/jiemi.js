var token = require("../../libs/token.js");
console.log(token);
let crypto = "eyJkYXRhIjp7InVzZXIiOiJsZW1vbiIsIm1pbWEiOiIxMjMifSwiY3JlYXRlZCI6MTU0NzI3Mzg3MywiZXhwIjo2MH0=.0VmhzD1sf7Mlon2mownaaWEZda+2qTrYrORu0ErRLxA=";
console.log(token.decodeToken(crypto))
console.log(token.checkToken(crypto))