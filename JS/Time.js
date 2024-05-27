(function(){
    const date = new Date();
    const Y = String(date.getFullYear());
    const M = String(date.getMonth()+1);
    const D = String(date.getDate());
    const Clock = document.getElementById('Clocks')
    window.onload = function () {
        setInterval(function () {
            Clock.innerHTML = Y + "/" + M + "/" + D ;
        },1000)
    }
    
}());