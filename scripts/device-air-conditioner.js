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
            interval+=((start < end? 1: -1)*10);
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
    document.getElementById("on").onclick = function() {
        switchMode(40, 40 - 10 * (document.getElementById("speed-input").value - 1));
    }
    document.getElementById("off").onclick = function() {
        switchMode(40 - 10 * (document.getElementById("speed-input").value - 1), 40);
    }
    var off = document.getElementById("off");
    document.getElementById("speed-input").onchange = function() {
        if(!off.checked) {
            clearInterval(spin);
            spin = setInterval(rotate, 40 - 10 * (document.getElementById("speed-input").value - 1));
            console.log(40 - 10 * (document.getElementById("speed-input").value - 1));
        }
    }
}