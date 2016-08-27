window.onload = function() {
    //Functions
    var angle = 0;
    var svg = document.getElementById("device").contentDocument;
    var blade = svg.getElementById("blade");
    var spin = 0;
    function rotate(){
        blade.style.transform = "rotate(" + angle + "deg)";
        angle++;
        angle%=360;
    }
    function switchMode(start, end){
        var interval = start;
        var stop = setInterval(function() {
            interval+=((start < end? 1: -1)*1);
            clearInterval(spin);
            spin = setInterval(rotate, interval);
            
            if(interval == end) {
                if (start < end) {
                    clearInterval(spin);
                }
                clearInterval(stop);
            }
        }, 500);
    }
    var screen = document.getElementById("screen-output").contentDocument;
    function enterMask(mask, position){
        var d0 = screen.getElementById("d-" + (7 * position + 0));
        var d1 = screen.getElementById("d-" + (7 * position + 1));
        var d2 = screen.getElementById("d-" + (7 * position + 2));
        var d3 = screen.getElementById("d-" + (7 * position + 3));
        var d4 = screen.getElementById("d-" + (7 * position + 4));
        var d5 = screen.getElementById("d-" + (7 * position + 5));
        var d6 = screen.getElementById("d-" + (7 * position + 6));
        if(mask.charAt(0) == "0") {
            d0.classList.remove("screen-st1");
        } else {
            d0.classList.add("screen-st1");
        }
        if(mask.charAt(1) == "0") {
            d1.classList.remove("screen-st1");
        } else {
            d1.classList.add("screen-st1");
        }
        if(mask.charAt(2) == "0") {
            d2.classList.remove("screen-st1");
        } else {
            d2.classList.add("screen-st1");
        }
        if(mask.charAt(3) == "0") {
            d3.classList.remove("screen-st1");
        } else {
            d3.classList.add("screen-st1");
        }
        if(mask.charAt(4) == "0") {
            d4.classList.remove("screen-st1");
        } else {
            d4.classList.add("screen-st1");
        }
        if(mask.charAt(5) == "0") {
            d5.classList.remove("screen-st1");
        } else {
            d5.classList.add("screen-st1");
        }
        if(mask.charAt(6) == "0") {
            d6.classList.remove("screen-st1");
        } else {
            d6.classList.add("screen-st1");
        }
    }
    function enterSymbol(symbol, position){
        switch(symbol){
            case "": enterMask("0000000", position); break;
            case "-": enterMask("0000001", position); break;
            case "1": enterMask("0000110", position); break;
            case "2": enterMask("1110101", position); break;
            case "3": enterMask("1100111", position); break;
            case "4": enterMask("0001111", position); break;
            case "5": enterMask("1101011", position); break;
            case "6": enterMask("1111011", position); break;
            case "7": enterMask("1000110", position); break;
            case "8": enterMask("1111111", position); break;
            case "9": enterMask("1101111", position); break;
            case "0": enterMask("1111110", position); break;
            case "C": enterMask("1111000", position); break;
        }
    }
    //Events
    var speed = document.getElementById("speed-input");
    document.getElementById("on").onclick = function() {
        switchMode(40, 40 - 10 * (speed.value - 1));
    }
    document.getElementById("off").onclick = function() {
        switchMode(40 - 10 * (speed.value - 1), 40);
    }
    var prevSpeed = speed.value; 
    var off = document.getElementById("off");
    speed.onchange = function() {
        if(!off.checked) {
            switchMode(prevSpeed, speed.value);
            enterSymbol(speed.value.toString(),6)
            prevSpeed = speed.value;
        }
    }
    
    var temperature = document.getElementById("temperature-input");
    var prevTemp = parseInt(temperature.value);
    temperature.onchange = function() {
        var step = Math.sign(temperature.value - prevTemp);
        var temp = setInterval(function() {
            prevTemp+=step;
            if(prevTemp < 0){
                enterSymbol("-", 0);
            } else {
                enterSymbol("", 0);
            }
            enterSymbol(Math.trunc(Math.abs(prevTemp / 10)).toString(), 1);
            enterSymbol(Math.abs(prevTemp % 10).toString(), 2);
            if(prevTemp == temperature.value){
                clearInterval(temp);
            }
            
        }, 600);
    }
     var humidity = document.getElementById("humidity-input");
     var prevHumidity = parseInt(humidity.value);
     humidity.onchange = function() {
        var step = Math.sign(humidity.value - prevHumidity);
        var hum = setInterval(function() {
            prevHumidity+=step;
            enterSymbol(Math.trunc(Math.abs(prevHumidity / 10)).toString(), 8);
            enterSymbol(Math.abs(prevHumidity % 10).toString(), 9);
            if(prevHumidity == humidity.value){
                clearInterval(hum);
            }
            
        }, 600);
    }
}