var button = document.getElementByID("button");
var counter=0;
button.onCLick = function() {
    
    var span=document.getElementById("count");
    count+=1;
    span.innerHtml =counter.toString();
}