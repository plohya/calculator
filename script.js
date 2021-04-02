var numberss = document.querySelectorAll(".number");
var operationss = document.querySelectorAll(".operator");
var decimass = document.getElementById("decimal");
var c = document.getElementById("c");
var ce = document.getElementById("ce");
var resulttt = document.getElementById("result");
var otriz = document.getElementById("otr");
const display = document.getElementById('display');
const sqrttt = document.getElementById('sqrt');
let MemoryCurrentNumber = 0;
let MemoryNewNumber = true;
let MemoryPendingOperation = '';

for (var i = 0; i < numberss.length; i++) {
  var number = numberss[i];
  number.addEventListener('click', function (e) {
    num_press(e.target.firstChild.data);
  });
}

for (var i = 0; i < operationss.length; i++) {
  var operation = operationss[i];
  operation.addEventListener('click', function (e) {
    oper(e.target.firstChild.data);
  });
}

c.addEventListener('click', function (e) {
  c_ce(e);
});

ce.addEventListener('click', function (e) {
  c_ce(e);
});

otriz.addEventListener('click', function (e) {
  if (display.value !== '0') {
    display.value = (+display.value)*(-1);
  }
});

sqrttt.addEventListener('click', function (e) {
  oper("=");
  if(MemoryCurrentNumber >= 0){
    MemoryCurrentNumber = Math.sqrt(MemoryCurrentNumber);
    display.value = +MemoryCurrentNumber.toFixed(6);
  } else {
    display.value = "Error"
  }
});

decimass.addEventListener('click', function (e) {
  decimal_point(e);
});

function num_press(argum) {
  if (MemoryNewNumber) {
    display.value = argum;
    MemoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = argum;
    } else {
      display.value += argum;
    }
  }
};

function oper(argum) {
  let localOperationMemory = display.value;
  if (MemoryNewNumber && MemoryPendingOperation !== '=') {
    display.value = MemoryCurrentNumber;
  } else {
    MemoryNewNumber = true;
    if (MemoryPendingOperation === '+') {
      MemoryCurrentNumber += +localOperationMemory;
    } else if (MemoryPendingOperation === '-') {
      MemoryCurrentNumber -= +localOperationMemory;
    } else if (MemoryPendingOperation === '*') {
      MemoryCurrentNumber *= +localOperationMemory;
    } else if (MemoryPendingOperation === '/') {
      MemoryCurrentNumber /= +localOperationMemory;
    } else if (MemoryPendingOperation === '^'){
      MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, +localOperationMemory);
    } else {
      MemoryCurrentNumber = +localOperationMemory;
    }
    MemoryPendingOperation = argum;
    display.value = +MemoryCurrentNumber.toFixed(6);
  }
};

function decimal_point(argum) {
  let localDecimalMemory = display.value;

  if (MemoryNewNumber) {
    localDecimalMemory = '0.';
    MemoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
};

function c_ce(argum) {
  if (argum.srcElement.id === 'ce') {
    display.value = '0';
    MemoryNewNumber = true;
  } else if (argum.srcElement.id === 'c') {
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendingOperation = '';
  }
};

