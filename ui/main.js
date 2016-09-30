var button = document.getElementById("counter");
var counter=0;
button.onCLick = function() {
    alert(button clicked);
    var span=document.getElementById("count");
    counter+=1;
    span.innerHTML =counter.toString();
}