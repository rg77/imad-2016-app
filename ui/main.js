console.log("js");
var button = document.getElementById("counter");
var counter=0;
alert("button not clicked clicked");
button.onCLick = function() {
    alert("button clicked");
    var span=document.getElementById("count");
    counter+=1;
    span.innerHTML =counter.toString();
};