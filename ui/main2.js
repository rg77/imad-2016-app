//maintain orig_value
var prev_dashboard  = `
<form class="navbar-form navbar-right">
                    <div class="form-group">
                        <input type="text" class="form-control" id="sign-in_username" placeholder="username">
                        <input type="password" class="form-control" id="sign-in_password" placeholder="password">
                        <button type="button" class="btn btn-default navbar-btn" id="signin_btn" onclick="signin()">Sign in</button>
                    </div>
                </form>
`;

var prev_signup = `
 <div class="col-sm-3 signup_font ">
           <section>
            <h3  >Don't have an account? It's easy to make one!</h3>
            <h2  >Sign-up</h2>
            <form>
                <div class="form-group">
                        <input type="text" class="form-control" id="sign-up_username" placeholder="user-name">
                </div>
                <div class="form-group">       
                        <input type="password" class="form-control" id="sign-up_password" placeholder="password">
                </div>
                <button type="button" class="btn btn-default navbar-btn" id="signup_btn" onclick="signup()">Create Account</button>
              
            </form>
        </div>

`;


 
 //for-sign-up
 function signup()  {
    
     var username  = document.getElementById("sign-up_username").value;
     var password  = document.getElementById("sign-up_password").value;
     
    if(username!=='' && password!=='')
    {
        
                //create request object
                var request =  new XMLHttpRequest();
                
                request.onreadystatechange = function() {
                    if (request.readyState === XMLHttpRequest.DONE) {
                    // everything is good, the response is received
                        if(request.status === 200) {
 
                            alert("your account has been created");
                            document.getElementById("dashboard").innerHTML =  userDashboard;
                            document.getElementById("signup_area").innerHTML =  welcomeMessage;
                                          
                                       
                            
                        }
                        else if(request.status === 403) {
                            alert("Oops! This username already exists! Try some another username!");
                        }
                        else if(request.status === 500) {
                            alert("something went wrong on the server!");
                        }
                    }
                
                
                };

                //make a request
                 
                 
                //making user dashboard
                var userDashboard =`

                   <div class="col-sm-6"></div> <!--blank space-->       
                                     <!-- dash_start -->
                                <div class="col-sm-6" >
                                     
                                         <div class="well well-sm" id="user_dashboard"   >
                                             <div class="row" >     
                                                     <p> </p>                     
                                                    <h5 style="font-size:17px"><span class="glyphicon glyphicon-user"></span> ${username} </h5>
                                                    <p> </p> 
                             <a href="#" onclick='logout()' ><h5 style="font-size:17px"><span class="glyphicon glyphicon-log-out"></span> Log-out </h5> </a>
                                                     
                                                         
                                                 
                                             </div>                        
                                       </div>  
                                </div><!-- dash _end -->
            `;

                
                
                var welcomeMessage=`    <div class="col-sm-3 signup_font ">
                       
                        <h1><img src="/ui/hi.jpg" alt="Smiley face" style="float:left;width:150px;height:150px;">
                       <br/><br/>Hi ${username} ! 
                        </h1>
                        
                        <h3><br/><br/>We are happy to have you!</h3>
                        
                    </div>
               `; 
             
                request.open('POST', 'http://rg77.imad.hasura-app.io/sign-up',true);
                request.setRequestHeader('Content-Type','application/json');
                request.send(JSON.stringify({username: username,password: password}));
                
    
    
    
    }
    else
    {
        alert('Some fields are missing! Fill in the missing fields and try again!');
    }
    
}



//for sign-in
 function signin() {
    
    var username  = document.getElementById("sign-in_username").value;
    var password  = document.getElementById("sign-in_password").value;
    
    if(username!=='' && password!='')
    {
            //create request object
        var request =  new XMLHttpRequest();
        
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
            // everything is good, the response is received
                if(request.status === 200) {
                    
                    alert("you have been logged in!");
                    var span_dashboard = document.getElementById("dashboard")
                    span_dashboard.innerHTML = userDashboard; 
                    var span_signup = document.getElementById("signup_area")
                                   
                    span_signup.innerHTML =  request.responseText;//to display the info/message recieved from the server 
                               
                 }
               else if(request.status === 403) {
                    alert(request.responseText);
                
                }
      
               
               else if(request.status === 500) {
                    alert("something went wrong on the server!");
                }
            }
        
        
        };
        
        
        //making user dashboard
        var userDashboard =`

           <div class="col-sm-6"></div> <!--blank space-->       
                             <!-- dash_start -->
                        <div class="col-sm-6" >
                             
                                 <div class="well well-sm" id="user_dashboard"   >
                                     <div class="row" >     
                                             <p> </p>                     
                                            <h5 style="font-size:17px"><span class="glyphicon glyphicon-user"></span><span id="loggedInUser"> ${username}</span> </h5>
                                            <p> </p> 
                     <a href="#" onclick='logout()' ><h5 style="font-size:17px"><span class="glyphicon glyphicon-log-out"></span> Log-out </h5> </a>
                                             
                                                 
                                         
                                     </div>                        
                               </div>  
                        </div><!-- dash _end -->
    `;

        
        request.open('POST', 'http://rg77.imad.hasura-app.io/login',true);
        request.setRequestHeader('Content-Type','application/json');
        request.send(JSON.stringify({username: username,password: password}));
     
        
        
    }
    else
    {
        alert('Some fields are missing! Fill in the missing fields and try again!');
    }
    
    
}




    
 function logout() {
 
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                var span_dashboard = document.getElementById("dashboard")

                span_dashboard.innerHTML =  prev_dashboard ; 

                var span_signup = document.getElementById("signup_area")

                span_signup.innerHTML =  prev_signup; 
                
                alert('You have been successfully logged out !');
            }
          else if(request.status === 500) {
                alert("something went wrong on the server!");
            }
          
         }
         };
          
    request.open('GET', 'http://rg77.imad.hasura-app.io/logout',true);
    request.send(null);        



};      
    
    
