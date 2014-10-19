var Digit = function(options){
    this.value = options.value;
    this.el = document.createElement('span');
    this.el.className = 'digit ';
};

Digit.prototype.setValue = function setValue(value){
    if (this.value !== value) {
        this.value = value;
        // this.queueUpdate();
    }
    
    this.render();
}

Digit.prototype.render = function render (){
    this.el.innerHTML = this.value;
    this.el.setAttribute('data-value', this.value);
};

Digit.prototype.destroy = function(){
    if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
    }
}

var Counter = function(options){
    
    this.value = options.value;
    this.size = options.size;
    this.digits = [];

    this.el = document.createElement('div');
    this.el.className = 'mech-counter';
    this.reset();
    this.initialize(options);
};

Counter.prototype.initialize = function(options){};

Counter.prototype.remove = function(){
    if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
    }
}

Counter.prototype.reset = function(){
  
    // reset digits    
    this.setupDigits();
};

Counter.prototype.setupDigits = function(){
    this.digits.forEach(function(digit){
        digit.destroy();
    });
    this.digits = [];
    var counter = this.size;
    while(counter) {

        var digit = new Digit({
            value: counter
        });

        this.digits.push(digit);
        this.el.appendChild(digit.el)
        counter--;
    }
};

function getZeros(num){
    var zeros = '';
    while (num) {
        zeros += '0';
        num--
    }
    return zeros;
}

Counter.prototype.render = function(){
    var parentNode = this.el.parentNode;
    var stringValue = this.value.toString(10);
    if (stringValue.length < this.size) {
        var numToPad = this.size - stringValue.length;
        stringValue = getZeros(numToPad) + stringValue;
    }


    // this.remove();

    this.digits.forEach(function(digit,idx){
        var val = stringValue[idx] || 0;
        setTimeout(function(){
            digit.setValue(val);    
        }, idx*100)
        
    });

    // if (parentNode) {
    //     parentNode.appendChild(this.el);
    // }
    return this.el;
}


module.exports = Counter;
