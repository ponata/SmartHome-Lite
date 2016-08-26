function open(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

window.onload = function() {
    //Tabs
    var tabs = document.querySelectorAll(".tablinks");
    tabs[0].onclick = function(){
        open(event, "current");
    }
    tabs[1].onclick = function(){
        open(event, "screen");
    }
    tabs[0].dispatchEvent(new Event("click"));
    
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
            interval+=((start < end? 1: -1)*4);
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
        switchMode(40, 4 * (11 - document.getElementById("speed-input").value));
    }
    document.getElementById("off").onclick = function() {
        switchMode(4 * (11 - document.getElementById("speed-input").value), 40);
    }
    var off = document.getElementById("off");
    document.getElementById("speed-input").onchange = function() {
        if(!off.checked) {
            clearInterval(spin);
            spin = setInterval(rotate, 4 * (11 - document.getElementById("speed-input").value));
        }
    }
}