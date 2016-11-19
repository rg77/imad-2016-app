var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
const crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session'); 

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'rg77',
  port:'5432',
  database: 'rg77',
  password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(session({
 
  secret: crypto.randomBytes(64).toString('hex'),
  
  cookie: { maxAge: 1000*60*60*24*30 }
}));





function createMainPageTemplate(username,quote,author)
{

var message =`
<h3>${quote}<h3>
<br/>
<h2>${author}<h2>
`;

var htmlTemplate =`
<!DOCTYPE html>
<html>
<head>
  <title>INK IT</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/ui/bootstrap.min.css" >
  <link href='https://fonts.googleapis.com/css?family=Itim|Lobster' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="/ui/main2.css">
</head>


<body>
  <header class="container">
  	
  	
  	<div class="row text-center" style="
    margin-left: 0px;
    margin-right: 0px;"> 
      <div class="col-sm-4" style="background: rgba(33, 255, 112, 0.79);">
            <h2  id="logo_font" >INK IT</h2>
       </div>

       
       <div class="col-sm-8" id="dashboard">
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

                 
       </div>   
 
   </div>
   <br>
   <div class="navbar">
     <div class="row text-center">
       <nav nav  class="col-sm-12">
        	<div class="row text-center">
        	    <p id="home"> <a href="/" class="list-group-item active" id="nav_menu"> HOME <span class="glyphicon glyphicon-home"></span> </a></p> 
        	    <p> <a href="/categories/web" class="list-inline-item" id="nav_menu"> WEB </a>  </p>
        	    <p><a href="/categories/technology" class="list-inline-item" id="nav_menu"> TECHNOLOGY </a></p>
        	    <p> <b> <a href="/categories/personal" class="list-inline-item" id="nav_menu"> PERSONAL </a> </b></p>
            </div>
        </nav>
     </div>    
   </div>


</header>
<div class=row>
    <div class="col-sm-8">
        <section class="jumbotron"> 
  
            <div class ="container">
  	            <div class="row text-center" >
    	                <h2 id="tagline">
    	                     Canvas For Your Thoughts
    	                </h2>
                </div>
            </div>
        </section>
    </div>
    
    <section id="signup_area"> 
        ${message}
    </section>

</div>  
    <script type="text/javascript" src="/ui/main2.js"></script>
  
  </body>
</html>

`;



return htmlTemplate;

}



app.get('/ui/footer.jpg', function (req, res) {
   
  res.sendFile(path.join(__dirname, 'ui', 'footer.jpg'));
          
});



app.get('/profile', function (req, res) {
   
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
          
});


app.get('/ui/profile.jpg', function (req, res) {
   
  res.sendFile(path.join(__dirname, 'ui', 'profile.jpg'));
          
});


app.get('/ui/profile.css', function (req, res) {
   
  res.sendFile(path.join(__dirname, 'ui', 'profile.css'));
          
});


app.get('/', function (req, res) {
  if(req.session && req.session.auth && req.session.auth.userId ){//id user already logged in
   
   
   var def_quote="Be the change that you wish to see in the world";//defaut display
   var def_author="Mahatma Gandhi";
   
   pool.query('select username from "user" where id = $1',[req.session.auth.userId],function(err, result) {
          // handle an error from the query
          if(err) {
              res.status(500).send(err.toString());        
          }
          else {
             
         var username = result.rows[0].username;
         pool.query('select count(*) from quotes',function(err, result) {
          // handle an error from the query
          if(err) {
                 //create template with default quote and author     
                res.send(createMainPageTemplate(result.rows[0].username,def_quote,def_author)); 
               
          }
          else {
                 
                  var maxCount = (result.rows[0].count);
                   var quote_id = Math.floor((Math.random() * maxCount)) + 1;
                   pool.query('select * from quotes where id = $1',[quote_id],function(err, result) {
                          // handle an error from the query
                          if(err) {
                              
                                //create template with default quote and author
                                res.send(createMainPageTemplate(result.rows[0].username,def_quote,def_author)); 
               
                          }
                          else {
                                //res.send(quote + author);
                           
                           //create template with randomly generated quote and author 
                           res.send(createMainPageTemplate(username,result.rows[0].quote,result.rows[0].author)); 
                           }
                     });                                           
                    
           }
 
     });
    
        
     
      }
   });
   
   }      
   else{//if not logged in
      
  res.sendFile(path.join(__dirname, 'ui', 'index2.html'));
          
      }
  
  
  
}); 


app.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'dashboard.html'));
//  res.sendFile(path.join(__dirname, 'ui', 'index.html'));

}); 




function hash(input,salt) {

var hashed = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
return ['pbkdf2','100000',salt,hashed.toString('hex')].join('$');
    
}
 

app.get('/hash/:input', function (req, res) {
var hashedString = hash(req.params.input,'this-is-some-random-string');
res.send(hashedString); 
    
}); 

app.post('/sign-up', function (req, res) {
    //user-name,password
    //post request: '{"username:" "ron","password:" "password"}'
    //JSON
    
  
//  res.send("hello");
    
    username = req.body.username;
    password = req.body.password;
    
    salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) values ($1,$2)',[username,dbString],function(err, result) {
          // handle an error from the query
          if(err) {
              res.status(500).send(err.toString());
          }
          else {
              
                  //checking for user id to create session
                  pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err, result) {
                      // handle an error from the query
                      if(err) {
                            res.status(500).send(err.toString());
                       }
                       else {
                      
                            //set the session id
                             req.session.auth = {userId: result.rows[0].id};
                             res.send("user successfully created:" + username);
       
                             //set cookie with session id
                             //internally on the server side, it maps the session id to an object
                             //{{auth:userId}}
                              
                      }
                 });
       
        }      
    });
  
}); 
 
 

function CreateAdminPage(loggedin)
{

var dashboard,detailsForm;


if(loggedin === 1)
{

    dashboard = `
                                                <form class="navbar-form navbar-right">
                                                    <div class="form-group">
                                                      <button type="button" class="btn btn-default navbar-btn" id="logout_btn" onclick="logout()">logout</button>
                                                    </div>
                                                </form>

                                    
                                                `; 
                                                
                                                
          
          
          detailsForm =`
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


}
else
{
dashboard= `
<form class="navbar-form navbar-right">
                    <div class="form-group">
                        <input type="text" class="form-control" id="sign-in_username" placeholder="username">
                        <input type="password" class="form-control" id="sign-in_password" placeholder="password">
                        <button type="button" class="btn btn-default navbar-btn" id="signin_btn" onclick="signin()">Sign in</button>
                    </div>
                </form>
`;


                                                
detailsForm='';
}




var htmlTemplate =`
<!DOCTYPE html>
<html>
<head>
  <title>INK IT</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/ui/bootstrap.min.css" >
  <link href='https://fonts.googleapis.com/css?family=Itim|Lobster' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="/ui/main2.css">
</head>


<body>
  <header class="container">
  	
  	
  	<div class="row text-center" style="
    margin-left: 0px;
    margin-right: 0px;"> 
     
      <div class="col-sm-4" style="background: rgba(33, 255, 112, 0.79);">
            <h2  id="logo_font" style='font-family: "Itim", cursive;' >INK IT</h2>
      </div>  
      
       <div class="col-sm-8" id="dashboard" >
            ${dashboard}
       </div>     
   </div>
   <br>
      <div class="navbar"></div>

</header>
 
 <div class="col-sm-10" id="detailsForm">${detailsForm}</div>      
        
    
    
    
    
    
    
    
    
    <script type="text/javascript" src="/ui/admin.js"></script>
  
  </body>
</html>



`;

return htmlTemplate;

}


app.get('/admin', function (req, res) {
   
      
       if(req.session && req.session.auth && req.session.auth.userId ){//check if logged in
         
            
      
      
      
      pool.query('SELECT * FROM admin WHERE id = $1',[req.session.auth.userId],function(err, result) {//check if elligible to post article
      // handle an error from the query
      if(err) {
          res.status(500).send(err.toString());
      }
      else {
          
          if(result.rows.length === 0){
              res.status(403).send('Access Denied!');
          }
          else{//admin is logged in
              
            res.send(CreateAdminPage(1));          
          
          
          
          }
      }
     });
    }
      
  else
  {
  
  res.send(CreateAdminPage(0));     
  }      
 
   
 });
 
 
app.get('/ui/admin.js', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'admin.js'));
 });
 
 
app.post('/admin/sign-up', function (req, res) {
    //user-name,password
    //post request: '{"username:" "ron","password:" "password"}'
    //JSON
    
  
//  res.send("hello");
    
    username = req.body.username;
    password = req.body.password;
    
    salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query('INSERT INTO admin (username,password) values ($1,$2)',[username,dbString],function(err, result) {
          // handle an error from the query
          if(err) {
              res.status(500).send(err.toString());
          }
          else {
                  res.send("admin successfully created:" + username);
       
                  //checking for user id to create session
                  pool.query('SELECT * FROM admin WHERE username = $1',[username],function(err, result) {
                      // handle an error from the query
                      if(err) {
                            res.status(500).send(err.toString());
                       }
                       else {
                      
                            //set the session id
                             req.session.auth = {userId: result.rows[0].id};
                             //set cookie with session id
                             //internally on the server side, it maps the session id to an object
                             //{{auth:userId}}
                              
                      }
                 });
       
        }      
    });
  
}); 
 
 
 app.post('/admin/post-article', function (req, res) {
    
    
     if(req.session && req.session.auth && req.session.auth.userId ){//check if logged in
         
            
      
      
      
      pool.query('SELECT * FROM admin WHERE id = $1',[req.session.auth.userId],function(err, result) {//check if elligible to post article
      // handle an error from the query
      if(err) {
          res.status(500).send(err.toString());
      }
      else {
          
          if(result.rows.length === 0){
              res.status(403).send('Access Denied!');
          }
          else{
              
            articleTitle = req.body.articleTitle;
            articleContent = req.body.articleContent;
            articleCategory = req.body.articleCategory;
            
            pool.query('INSERT INTO article (title,content,category,date) values ($1,$2,$3,now())',[articleTitle,articleContent,articleCategory],function(err, result) {
                  // handle an error from the query
                  if(err) {
                      res.status(500).send(err.toString());
                  }
                  else {
                       res.send('Article successfully posted !');
                   }
             });
          }
      }
     });
    }
      
  else
  {
  
  res.status(403).send('You are not authorised to post the article! Please login to continue!');
  }      
              
 });
  
 
 

app.post('/admin/login', function (req, res) {
      
//  res.send("hello");
    
    username = req.body.username;
    password = req.body.password;
       
       pool.query('SELECT * FROM admin WHERE username = $1',[username],function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(err.toString());
      }
      else {
          
          if(result.rows.length === 0){
              res.status(403).send('username/password is invalid');
          }
          else{
          //match the password
          var dbString = result.rows[0].password;
          var  salt = dbString.split('$')[2];
          var hashedPassword = hash(password,salt);
          //check if the password stored in the database matches the hashed password
          if(hashedPassword === dbString){
             
             
             //check if session id exists
             //if it exists, do nothing
             //else set the session id
             if(req.session && req.session.auth && req.session.auth.userId ){
              }
            else{
                 req.session.auth = {userId: result.rows[0].id};
            
            }
            res.send('1');
              
              
          }
          else{
                res.status(403).send('username/password is invalid');
              
          }
              
          }
          
      }
   });


} );

 
 
 
 
 
 
  
 
app.post('/login', function (req, res) {
    //user-name,password
    //post request: '{"username:" "ron","password:" "password"}'
    //JSON
       
    username = req.body.username;
    password = req.body.password;
    
      pool.query('SELECT * FROM "user" WHERE username = $1',[username],function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(err.toString());
      }
      else {
          
          if(result.rows.length === 0){
              res.status(403).send('username/password is invalid');
          }
          else{
          //match the password
          var dbString = result.rows[0].password;
          var  salt = dbString.split('$')[2];
          var hashedPassword = hash(password,salt);
          //check if the password stored in the database matches the hashed password
          if(hashedPassword === dbString){
             
             
           var message = `
                    <div class="col-sm-3 signup_font ">
                           <br/>
                           <h3>Welcome ${username} ! </h3>
                           <h3><br/><br/>Glad to see you !</h3>
                            
                        </div>   
                   `;
    
             
             //check if session id exists
             //if it exists, do nothing
             //else set the session id
             if(req.session && req.session.auth && req.session.auth.userId ){
              
              }
            else{
                 req.session.auth = {userId: result.rows[0].id};
            
            }
            res.send(message);
              
              
          }
          else{
                res.status(403).send('username/password is invalid');
              
          }
              
          }
          
      }
   });


} );


app.get('/check-login', function (req, res) {
 if(req.session && req.session.auth && req.session.auth.userId ){
     res.send('1');
 }
    else{
        res.send('0');
    }
});


app.get('/logout', function (req, res) {
 if(req.session && req.session.auth && req.session.auth.userId )
 {
      delete req.session.auth;
      res.send('u  r logged out');
  
 }
 else
 {
    res.send('You are already logged out!');
  
 }   

});




app.post('/post-comment', function (req, res) {
    
    if(req.session && req.session.auth && req.session.auth.userId ){//check if user is logged in
        articleId = req.body.articleId;
        comment = req.body.comment;
        userId = req.session.auth.userId
        pool.query('INSERT INTO comments (article_id,user_id,comment) values ($1,$2,$3)' ,[articleId, userId,comment],function(err, result) {
              // handle an error from the query
              if(err) {
                  res.status(403).send(err.toString());
              }
              else {
                                                 
                res.send('1');           
               }
        });
    }
    else{//if not logged in
        res.status(403).send('Please login to post the comment!');
    }
    
}); 
 


var pool = new Pool(config);
 
app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test', function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(err.toString());
      }
      else {
          res.send(JSON.stringify(result.rows));
      }
   });
}); 

 

app.get('/test-user', function (req, res) {

    
 pool.query('SELECT username FROM "user" WHERE id = $1',[req.session.auth.userId],function(err, result) {
                      // handle an error from the query
                      if(err) {
                            res.status(500).send(err.toString());
                       }
                       else {
                             username = result.rows[0].username;
                                
                      }
                 res.send("id:" +  username + "," + req.session.auth.userId);
  });
       


}); 


app.get('/articles/:articleId',function (req,res) {
      
      
      var articleId = parseInt(req.params.articleId);
    //  console.log("articleId: " + articleId);
      pool.query("SELECT * FROM article WHERE id = $1", [articleId] ,function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(err.toString());
      }
      else {
          if(result.rows.length === 0){
            res.status(404).send('Article Not Found');
              
          }
          else {
            
            var articleData = result.rows[0];        
           res.send(JSON.stringify(articleData));
              
          }
          
      }
   });
      
});


app.get('/ui/main2.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.js'));
});

app.get('/ui/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.css'));
});


app.get('/ui/ink.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ink.jpg'));
});

app.get('/ui/hi.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'hi.jpg'));
});


app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});


app.get('/ui/main2.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.css'));
});

app.get('/fonts/glyphicons-halflings-regular.woff2', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/fonts', 'glyphicons-halflings-regular.woff2'));
}); 

app.get('/fonts/glyphicons-halflings-regular.woff', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/fonts', 'glyphicons-halflings-regular.woff'));
}); 

app.get('/fonts/glyphicons-halflings-regular.tff', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/fonts', 'glyphicons-halflings-regular.tff'));
}); 


function createPageTemplate(data,category,username) {
   
   var dashboard;
   if(username === '-1') {
         dashboard =`
                        <form class="navbar-form navbar-right">
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="sign-in_username" placeholder="username">
                                        <input type="password" class="form-control" id="sign-in_password" placeholder="password">
                                        <button type="button" class="btn btn-default navbar-btn" id="signin_btn" onclick="signin()">Sign in</button>
                                    </div>
                           </form>
                        `; 
   
   }
   else//if user is logged in
   {     
                                
                      
         dashboard =`

                               <div class="col-sm-6"></div> <!--blank space-->       
                                                 <!-- dash_start -->
                                            <div class="col-sm-6" >
                                                 
                                                     <div class="well well-sm" id="user_dashboard"   >
                                                         <div class="row" >     
                                                                 <p> </p>                     
              <h5 style="font-size:17px"><span class="glyphicon glyphicon-user"></span> <span id="loggedInUser"> ${username}</span> </h5>
                                                                <p> </p> 
                                         <a href="#" onclick='logout()' ><h5 style="font-size:17px"><span class="glyphicon glyphicon-log-out"></span> Log-out </h5> </a>
                                                                 
                                                                     
                                                             
                                                         </div>                        
                                                   </div>  
                                            </div><!-- dash _end -->
                        `;
   
   }
   
   
   
   articleTitles='';
   
   for(i =0;i<data.length;i++) {
    
    
    articleTitles += "<a  href='#' class='list-group-item' id='" + data[i].id + "' onclick='fetchArticle(this)' >" + data[i].title + "</a> "; 
   
       
   }
   
   
   var htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <title id="title">${category.toUpperCase()}</title>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/ui/bootstrap.min.css" >
  <link href='https://fonts.googleapis.com/css?family=Itim|Lobster' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="/ui/main2.css">
</head>

<body>
  <header class="container">
  	
  	
  	  	<div class="row text-center" style="
    margin-left: 0px;
    margin-right: 0px;"> 
      <div class="col-sm-4" style="background: rgba(33, 255, 112, 0.79);">
            <h2  id="logo_font" >INK IT</h2>
       </div>
   
       <div class="col-sm-8" id="dashboard">
          ${dashboard}         
       </div>   
   </div>
   <br>

   <div class="navbar">
     <div class="row text-center">
       <nav nav  class="col-sm-12">
        	<div class="row text-center">
        	    <p id="home"> <a href="/" class="list-inline-item" > HOME <span class="glyphicon glyphicon-home"></span> </a></p> 
        	    <p> <a href="/categories/web" class="list-inline-item" id="nav_menu_web"> WEB </a>  </p>
        	    <p><a href="/categories/technology" class="list-inline-item" id="nav_menu_technology"> TECHNOLOGY </a></p>
        	    <p> <b> <a href="/categories/personal" class="list-inline-item" id="nav_menu_personal"> PERSONAL </a> </b></p>
            </div>
        </nav>
     </div>    
   </div>


</header> </div>


</header>

<section  class="container">
            
       <div class="col-sm-9" id="canvas" >
             <div class="panel panel-default">
                <div class="panel-heading"><h4  style="font-size: 40px;" id="articleTitle"> Article Title</h4>
                <br>
                <h3  style="font-size: 15px;" id="articleDate"> Article Date</h3>
                    
                </div>
                
                <div class="panel-body" id="articleContent">
                       CONTENT OF ARTICLE
                </div>
             </div>
      
        <div id="postCommentBlock"></div>  
      
      
      <div class="panel panel-default">
         <div class="panel-heading" style="background: #4FFF8D;">
            <h4  style="font-size: 40px;"> COMMENTS </h4>
         </div>
         <div class="panel-body">
                
                
                <div class="comment_section" id="commentsSection"></div>     
         </div>
         </div>
   
       
      
      </div>
    
        <div class="col-sm-3" style="background: rgba(33, 255, 112, 0.79);">
        <div class="panel panel-default">
            <div class="panel-heading" style="background: #4FFF8D;" id="articles_panel_heading"> <h4  style="font-size: 40px;"> ARTICLES </h4> </div>
            <div class="panel-body">
                <div class="list-group">
                    ${articleTitles}
                </div>
           </div>
           </div>
        </div>
  
</section>

   <script type="text/javascript" src="/ui/article.js"></script>
  

  
  </body>
</html>
`;
   
   
   
return htmlTemplate;
}


app.get('/categories/:categoryName',function (req,res) {
      
       var articleData;
      var username;
      var category = req.params.categoryName;
      pool.query("SELECT * FROM article WHERE category = $1", [category] ,function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(counter.toString());
      }
      else {
          if(result.rows.length === 0){
            res.status(404).send('Oops! There exist no article under this category!');
              
          }
          else {
                    
                 articleData = result.rows;//storing the result of articles fetch query
                    
                    
                //var articleData = result.rows[0];        
                if(req.session && req.session.auth && req.session.auth.userId ){//if user is logged in, send create template with user          dashboard
                    
                        
                        pool.query('SELECT username FROM "user" WHERE id = $1',[req.session.auth.userId],function(err, result) {
                                  // handle an error from the query
                                  if(err) {
                                        res.status(500).send(err.toString());
                                   }
                                   else {
                                         
                                         
                res.send(createPageTemplate(articleData,category,result.rows[0].username));
                           
                                  }      
                            
                            
                        });
                        
                }
                else{// else if user is not logged in, create template with sign in options
                    res.send(createPageTemplate(articleData,category,'-1'));
                }               
                          
              }
        }      
   
   });
      
});



app.get('/get-comments',function (req,res) {
      
       
      pool.query(`SELECT comments.*, "user".username FROM article, comments, "user" WHERE article.id = $1 AND article.id = comments.article_id AND comments.user_id = "user".id ORDER BY comments.timestamp DESC`, [req.query.articleid], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

