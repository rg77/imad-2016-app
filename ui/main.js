var button = document.getElementByID("counter");
var counter=0;
button.onCLick = function() {
    
    var span=document.getElementById("count");
    counter+=1;
    span.innerHtml =counter.toString();
}