var Counter = require('./lib/counter');

var myCounter = window.mc = new Counter({
    value: 12345678,
    size: 10
});

myCounter.render();

document.body.appendChild(myCounter.el);

console.log(myCounter);

