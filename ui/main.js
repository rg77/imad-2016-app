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

var submit_btn = document.getElementById("submit_btn");

submit_btn.onclick = function() {
    
  
    
    
    //create request object
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
            var names= request.responseText;
            name = JSON.parse(names);
            var list='';            
            for(var i=0;i<names.length;i++)
            {
                    list+='<li>' + names[i] + '</li>';
            }
            
            var ul = document.getElementById("namelist");
            ul.innerHTML =list;
            }
    
        }
    
    
    };

    //make a request
     var nameInput  = document.getElementById("name");
    var name = nameInput.value; 
    request.open('GET', 'http://rg77.imad.hasura-app.io/submit-name?name=' + name,true);
    request.send(null);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  var names=["name1","name3","name3","name4"];  
    var list='';
    for(var i=0;i<names.length;i++)
    {
        
        list+='<li>' + names[i] + '</li>';
    }
    
    var ul = document.getElementById("namelist");
    ul.innerHTML =list;

    
};


