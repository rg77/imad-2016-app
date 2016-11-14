    var articleLink =null;
    var prevLink; 

    //highlighting the category menu
    var title = document.getElementById("title");
    var category = title.innerHTML.toLowerCase();
    document.getElementById('nav_menu_' + category).className = "list-group-item active";
    
    
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


var postCommentBox =`

  <div class="well" style="background: #44CAE8;"><h5 style="text-align:left;"><b>LEAVE A COMMENT: </b></h5>
                
                <br>
                <div id="comment_box">
                    <div class="form-group" >
                        <label form="comment"> </label>
                        <textarea class="form-control" rows="5" id="comment" placeholder="comment"></textarea>
                    </div>
                </div>      
                <button type="button" class="btn btn-default navbar-btn" onclick="postComment()">ENTER</button>
            </div>
`; 



function postComment()
{
    
    //create request object
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                            
                 fetchComments(articleLink);
            }
           else if(request.status === 403) {
                alert(request.responseText);
            
            }
  
           
           else if(request.status === 500) {
                alert("something went wrong on the server!Try again!");
            }
        }
    
    
    };
    
    
     var comment  = document.getElementById("comment").value;
    
   
    request.open('POST', 'http://rg77.imad.hasura-app.io/post-comment',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({articleId: articleLink.id,comment: comment}));
 
   


}




function fetchCommentBox(link) {
    
    articleName = link.innerHTML ; 
    
    //create request object
    var request =  new XMLHttpRequest();
     
     request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                
                var loggedin = request.responseText;
                
                if(loggedin === '1'){
                    document.getElementById("postCommentBlock").innerHTML = postCommentBox;
                }                           
             }
        }
            
      };     
        request.open('GET', 'http://rg77.imad.hasura-app.io/check-login',true);
        request.send(null);
    
    

}












function fetchComments(link) {
    
    //create request object
    var request =  new XMLHttpRequest();
    var comments='';
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                
                var data = request.responseText;
                data = JSON.parse(data);
                console.log(data.length);  
                var span1=document.getElementById("commentsSection");
                
                for(i =0;i<data.length;i++) { 
    
                    comments += "<div class='panel panel-default'> <div class='panel-body'>" + 
                            data[i].comment +
                             "</div> <div class='panel-heading'><h4 >" +                                       
                              data[i].username +
                              "</h4><h5 >" +
                               data[i].timestamp +
                               "</h5> </div></div>";
                                   
                }
             
                span1.innerHTML = comments;
             
             }
        }
            
        fetchCommentBox(link);    
    };

    id = link.id.toString();
    
    //make a request
    request.open('GET', 'http://rg77.imad.hasura-app.io/get-comments?articleid=' + id,true);
    request.send(null);
    

}


function fetchArticle(link) {
    
    articleName = link.innerHTML ; 
    prevLink = articleLink; 
    articleLink = link;
    
    
    //create request object
    var request =  new XMLHttpRequest();
    
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                
                var data = request.responseText;
                data = JSON.parse(data);
                
                var span1=document.getElementById("articleTitle");
                span1.innerHTML =data.title.toString();
                
                
                var span2=document.getElementById("articleDate");
                span2.innerHTML =data.date.toString();
                 
                var span3=document.getElementById("articleContent");
                span3.innerHTML =data.content.toString();
                
                 document.getElementById( link.id.toString()).className = 'list-group-item active';//highlighting the active article link
                fetchComments(link); 
            }
                document.getElementById( prevLink.id.toString()).className = 'list-group-item';//undoing highlighting of prev active  article link
               
    
        }
    
    
    };
    id = link.id.toString();
    
    //make a request
    request.open('GET', 'http://rg77.imad.hasura-app.io/articles/' + id,true);
    request.send(null);
    
    
    
}
    
    
    
    
 function logout() {
          var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                var span_dashboard = document.getElementById("dashboard")

                span_dashboard.innerHTML =  prev_dashboard ; 
                document.getElementById("postCommentBlock").innerHTML ='';     
                
                signin_btn = document.getElementById("signin_btn");
           
                
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
    
    
    
    //for sign-in
 
  function signin() {
    
     var username  = document.getElementById("sign-in_username").value;
    var password  = document.getElementById("sign-in_password").value;
    
    if(username!=='' && password!=='')
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
                    if(articleLink != null )
                    {
                        fetchCommentBox(articleLink);                    
                    }                
                    
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
                                            <h5 style="font-size:17px"><span class="glyphicon glyphicon-user"></span><span id="loggedInUser"> ${username}</span></h5>
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

