const Guid = require("guid");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

const API_KEY = "";
const API_SECRET = "";

function generateToken(content) {
  return jwt.sign({
    jti: Guid.raw(),
    iss: API_KEY,
    sub: sha256(content),
    exp: Math.floor(Date.now() / 1000) + 10
  }, API_SECRET)
}

function generateTokenGet(content) {
  return jwt.sign({
    jti: Guid.raw(),
    iss: API_KEY,
    sub: sha256(content),
    exp: Math.floor(Date.now() / 1000) + 10
  }, API_SECRET)
}

const rnm = Math.floor((Math.random() * 999) + 1);

const exercices = [{
  "title": "Ouch! Fibonacci is broken!",
  "description": "Find what is wrong with the given 'n-th fibonacci number' function. The devil is in the details!",
  "definitions": [{
    "language": "javascript",
    "content": "function fib(n) { if (n < 2) { return n; } else { return fib(n-1) + fib(n);}}"
    }, {
   "language": "python",
   "content": "def fib(n):if n < 2: return n return fib(n-1) + fib(n)"
  }]
},
{
"title": "Ouch! Fibonacci is broken 2!",
"description": "Find what is wrong with the given 'n-th fibonacci number' function. The devil is in the details!",
"definitions": [{
  "language": "javascript",
  "content": "function fib(n) { if (n > 2) { return n; } else { return fib(n-1) + fib(n);}}"
  }, {
 "language": "python",
 "content": "def fib(n):if n > 2: return n return fib(n-1) + fib(n)"
}]
},
];

const payload = {
  "code": "MedinillaIngager123" + rnm,
  "title": "INgager Interview",
  "position" : {
    "code": "SIN-12345",
    "title":   "INgager",
    "Description": "Are you passionate about creating premier user experiences which are used by millions of people every single day? Do you want to be a part of working on a new application being developed as we speak? Are you interested in seeing the results of your work featured on all the prominent web sites on the Internet",
    "url": "https://careers.microsoft.com/jobdetails.aspx?ss=&pg=0&so=&rw=1&jid=305610&jlang=en&pp=ss"
  },
  "participants" : [
    { "name": "INgager", "email": "siya@wp2romantic.com", "role": "candidate" },
    { "name": "Christian Medinilla", "email": "cmedinilla@intersysconsulting.com", "role": "interviewer" }
  ],
  "capabilities": {
    "codeEditor": true,
    "notes": true,
    "skype": true
  },
  "skypeConfig": {
    "call": false,
    "lobby": false
  },
  "scheduling": {
    "duration": 1,
    "mode": null,
    "dateProposing": null
  },
  "tasks": exercices
}

console.log(generateToken(JSON.stringify(payload)));

fetch('https://interviews.skype.com/api/interviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + generateToken(JSON.stringify(payload))
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(console.log)


//
// fetch('https://interviews.skype.com/api/interviews/MedinillaIngager123618', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + generateTokenGet()
//   },
// })
// .then(res => res.json())
// .then(console.log)
