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
    document.getElementById("speed-input").onchange = function() {
        if(!off.checked) {
            switchMode(prevSpeed, speed.value);
            prevSpeed = speed.value;
        }
    }
}