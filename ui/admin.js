
var detailsForm =`
<div class="col-sm-1"></div>
              <div class="col-sm-10"> 
                     <form>
                          <div class="form-group">
                            <label for="articleTitle">Article Title:</label>
                            <input type="text" class="form-control" id="articleTitle" label="Title">
                          </div>
                          <br/>
                          <label >Article Category:</label>
                          <label class="radio-inline"><input type="radio" name="optradio" id="web">Web</label>
                          <label class="radio-inline"><input type="radio" name="optradio" id="technology">Technology</label>
                          <label class="radio-inline"><input type="radio" name="optradio" id="personal">Personal</label>
                           
                           <br/>
                           <br/>
                          <div class="form-group">
                          <label for="articleContent">Article Content:</label>
                          <textarea class="form-control" rows="5" id="articleContent" label="Content"></textarea>
                          </div>
                                                    
                          <button type="button" class="btn btn-default navbar-btn" id="submit_btn" onclick="submitArticle()">Submit</button>
                     </form>
              </div>
       

`;

var prev_dashboard  = `
<form class="navbar-form navbar-right">
                    <div class="form-group">
                        <input type="text" class="form-control" id="sign-in_username" placeholder="username">
                        <input type="password" class="form-control" id="sign-in_password" placeholder="password">
                        <button type="button" class="btn btn-default navbar-btn" id="signin_btn" onclick="signin()">Sign in</button>
                    </div>
                </form>
`;


//to submit article data
 function submitArticle() {

    var articleTitle  = document.getElementById("articleTitle").value;
         
    var optradio = document.getElementsByName('optradio');
    var articleCategory;
    
    for(var i = 0; i < optradio.length; i++){
        if(optradio[i].checked){
             articleCategory = optradio[i].id;
            
        }
    }

    var articleContent  = document.getElementById("articleContent").value;
         
    if(articleTitle!=='' && articleCategory!=='' && articleContent!=='')
    {
        
                //create request object
                var request =  new XMLHttpRequest();
                
                request.onreadystatechange = function() {
                    if (request.readyState === XMLHttpRequest.DONE) {
                    // everything is good, the response is received
                        if(request.status === 200) {
                            
                            alert(request.responseText);
                            document.getElementById("detailsForm").innerHTML =  detailsForm;
                                          
                                       
                            
                        }
                        else if(request.status === 403) {
                            alert(request.responseText);
                            document.getElementById("detailsForm").innerHTML = '';
                            document.getElementById("dashboard").innerHTML = prev_dashboard ;
                            
                                                                            
                        }
                        else if(request.status === 500) {
                            alert("something went wrong on the server!");
                        }
                    }
                
                
                };

                
                request.open('POST', 'http://rg77.imad.hasura-app.io/admin/post-article',true);
                request.setRequestHeader('Content-Type','application/json');
                request.send(JSON.stringify({articleTitle: articleTitle,articleCategory: articleCategory,articleContent : articleContent}));
                
    
   
    
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
    
    if(password!=='' && username!=='')
    {
            //create request object
        var request =  new XMLHttpRequest();
        
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
            // everything is good, the response is received
                if(request.status === 200) {
                    
                    alert("you have been logged in!");
                    var span_dashboard = document.getElementById("dashboard")
                    span_dashboard.innerHTML = `
                                                <form class="navbar-form navbar-right">
                                                    <div class="form-group">
                                                      <button type="button" class="btn btn-default navbar-btn" id="logout_btn" onclick="logout()">logout</button>
                                                    </div>
                                                </form>

                                    
                                                `; 
                    
                    
                    
                    var adminDetailsForm = document.getElementById("detailsForm");
                    adminDetailsForm.innerHTML = detailsForm  ; 
                               
                    
                }
               else if(request.status === 403) {
                    alert(request.responseText);
                
                }
      
               
               else if(request.status === 500) {
                    alert("something went wrong on the server!");
                }
            }
        
        
        };
        
                
       
        request.open('POST', 'http://rg77.imad.hasura-app.io/admin/login',true);
        request.setRequestHeader('Content-Type','application/json');
        request.send(JSON.stringify({username: username, password: password}));
     
        
        
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
                var span_dashboard = document.getElementById("dashboard");

                span_dashboard.innerHTML =  prev_dashboard ; 

                document.getElementById("detailsForm").innerHTML = '';

                
                alert('You have been successfully logged out !');
            }
          else if(request.status === 500) {
                alert("something went wrong on the server!");
            }
          
         }
         };
          
    request.open('GET', 'http://rg77.imad.hasura-app.io/logout',true);
    request.send(null);        



}      
    

