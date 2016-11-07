//submit username,password to login
var submit_btn = document.getElementById("submit_btn");

submit_btn.onclick = function() {
    
  
    
    
    //create request object
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                console.log("user logged in");
                alert("successfully logged in");
            }
            else if(request.status === 403) {
                alert("user/password incorrect");
            }
            else if(request.status === 500) {
                alert("something went wrong on the server!");
            }
        }
    
    
    };

    //make a request
     var username  = document.getElementById("username").value;
     var password  = document.getElementById("password").value;
     
    console.log(username);
    console.log(password);
    
    //request.open('POST', 'http://rg77.imad.hasura-app.io/submit-name?name=' + name,true);
    request.open('POST', 'http://rg77.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username,password: password}));
 
 
};


