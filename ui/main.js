console.log("js");
var button = document.getElementById("counter");


button.onclick = function() {
    
    //create request object
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                var counter = request.responseText;
                var span=document.getElementById("count");
                counter+=1;
                span.innerHTML =counter.toString();
            }
    
        }
    
    
    };

    //make a request
    request.open('GET', 'http://rg77.imad.hasura-app.io/counter',true);
    request.send(null);
    
    
};
