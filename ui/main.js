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
                span.innerHTML =counter.toString();
            }
    
        }
    
    
    };

    //make a request
    request.open('GET', 'http://rg77.imad.hasura-app.io/counter',true);
    request.send(null);
    
    
};
var nameInput  = doucument.getElementById("name");
var name = nameInput.value; 

var submit_btn = doucument.getElementById("submit_btn");

submit_btn.onclick = function() {
    
  var names=["name1","name3","name3"];  
    var list='';
    for(var i=0;i<names.length;i++)
    {
        
        list+='<li>' + names[i] + '</li>';
    }
    
    var ul = doucument.getElementById("namelist");
    ul.innerHTML =list;

    
};


