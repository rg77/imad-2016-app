var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  host: 'db.imad.hasura-app.io',
  user: 'rg77',
  port:'5432',
  database: 'rg77',
  password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index2.html'));
}); 


//app.get('/personal', function (req, res) {
 // res.sendFile(path.join(__dirname, 'ui', 'personal.html'));
//}); 

/*
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
}); 
*/



var pool = new Pool(config);
 
app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test', function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(counter.toString());
      }
      else {
          res.send(JSON.stringify(result.rows));
      }
   });
}); 

 


app.get('articles/:articleName',function (req,res) {
      
      
      var article = req.params.articleName;
      pool.query("SELECT * FROM article WHERE title = $1", [articleName] ,function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(counter.toString());
      }
      else {
          if(result.rows.length === 0){
            res.status(404).send('Article Not Found');
              
          }
          else {
            
            //var articleData = result.rows[0];        
           res.send(JSON.stringify(result.rows));
              
          }
          
      }
   });
      
});





app.get('/ui/main2.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main2.css'));
});

app.get('/ui/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'bootstrap.min.css'));
});

app.get('/ui/ink.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'ink.jpg'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
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



/*
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
*/

var counter =0;
app.get('/counter',function(req,res) { 
counter += 1;
res.send(counter.toString());
});



var names = [];
//app.get('/submit-name/:name', function(req,res) {
app.get('/submit-name', function(req,res) { // URL: /submit-name?name=xxxxxx

//get name from request
//var name = req.params.name;
var name = req.query.name;


names.push(name);    
//JSON: javascript object notation
res.send(JSON.stringify(names));
    
} );


var articles = {
    'article-one':{
            title:'article one',
    heading:'article one',
    content:`<p>
                content for first article.content for first article.content for first article.content 
                for first article.content                 for             first           article.content for first article.content for         first article. content for first article.content for first article.content for first article.content for first article.content for first article.      
        </p>
        <p>
            content for first article.content for first article.content for first article.content for first article.content for first article.content for first article.content for first article. content for first article.content for first article.content for first article.content for first article.content for first article.      
        </p>
        <p>
            content for first article.content for first article.content for first article.content for first article.content for first article.content for first article.content for first article. content for first article.content for first article.content for first article.content for first article.content for first article.      
        </p>
        <p>
            content for first article.content for first article.content for first article.content for first article.content for first article.content for first article.content for first article. content for first article.content for first article.content for first article.content for first article.content for first article.      
        </p>
        <p>
            content for first article.content for first article.content for first article.content for first article.content for first article.content for first article.content for first article. content for first article.content for first article.content for first article.content for first article.content for first article.      
        </p>
        <p>
            content for first article.content for first article.content for first article.content for first article.content for first article.content for first article.content for first article. content for first article.content for first article.content for first article.content for first article.content for first article.      
        </p>`

     },
    'article-two':{
        title:'article two',
        heading:'article two',
        content:    'content for second article.'
    },
    'article-three':{
          title:'article two',
          heading:'article two',
          content:    'content for second article.'
    }
};

function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
       
    var htmlTemplate =  `<html>
    <head>
        <title>
            ${title}
        </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/ui/style.css" rel="stylesheet" />
    
    </head>
    

<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    
    <hr/>
    
    <h3>
        ${heading}
    </h3>
    
    <div>
        ${content}
    </div>
</div>
</body>

</html>`;

return htmlTemplate;
}



function createPageTemplate(data,category) {
   
   articleTitles='';
   
   for(i =0;i<data.length;i++) {
    
    
    articleTitles += "<a  href='#' class='article_title, list-group-item' >" + data[i].title + "</a> "; 
   
       
   }
   
   
   var htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <title>${category}</title>
  <meta charset="utf-8"/>
  <link rel="stylesheet" href="ui/bootstrap.min.css" >
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="/ui/main2.css">
  <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
</head>

<body>
  <header class="container">
  	
  	
  	<div class="row text-center" style="
    margin-left: 0px;
    margin-right: 0px;"> 
      <div class="col-sm-4" style="background: rgba(33, 255, 112, 0.79);">
            <h1  style="font-size: 120px;">INK IT</h1>
       </div>
   
   <!--<div class="col-sm-1">
            <p  style="font-size: 100px;color: #2B4750;">|<p>
       </div>   -->
       <div class="col-sm-7">
            <h1 style="
             background: #44CAE8;
             font-size: 50px;">  
                ${category} 
            </h1>         
       </div>   
   </div>
   <br>
   <div class="navbar">
     <div class="row text-center">
       <nav nav  class="col-sm-12">
        	<p id="home"> <a href="final_index.html"> HOME <span class="glyphicon glyphicon-home"></span> </a></p> 
        	<p> <a href="/web.html"> WEB </a>  </p>
        	<p><a href="/technology.html"> TECHNOLOGY </a></p>
        	<p> <b> <u><a href="/personal.html"> PERSONAL </a>  </u></b></p>
        </nav>
     </div>    
   </div>

</header>

<section  class="container">
            
       <div class="col-sm-9" id="canvas" >
             <div class="panel panel-default">
                <div class="panel-heading"><h4  style="font-size: 40px;" id="articleTitle"> TITLE OF ARTICLE</h4></div>
                <div class="panel-body" id="articleContent">
                       <b>Panel Content</b>
                        sdfsd dfdsfgsdfgsd
                        ffdfsgdfsg
                        sadfdfgdsfg
                        sddsfg
                        fsadfsg
                        dfdfg dsfgdsfg sdfgsdfg dsfgdfsg
                        dsdfg dsfgdfs dsfgdf dsfgdsf dsfgdsf gdsfgdsf
                        sadfs dsfgdf dsfgdfg dfgdfg dfsgdfg dfgdsfg dsfgdsfg dfgssdfg
                        adfdsgf sdfgdf dfsgdfg dfgsdfg dfgdsfg dsfgdfg
                        sdafdfgdf dfgdsf sdfg dsfg
                        sad dsf ssd sdfgdfgsdf
                        fdfg dfgdfg
                        sadfdsgf
                        sdaf dsfgdf
                        sdadfsg
                        f dsfg dsfgd
                        sdaf  dfgdfg dfgds
                        saddfsg dfg dfg 
                        fsd dfgdfg dsfg dsfg dfgd dsfg dfg
                        f dfg gdsfg gdsfg sddgfdf  dsfgd dsfg dsfgdf
                </div>
             </div>
      
       <div class="well" style="background: #44CAE8;"><h5><b>TAGS: </b></h5>
            tag1    tag2       
       </div>
      
      
        <div class="well" style="background: #44CAE8;"><h5><b>LEAVE A COMMENT: </b></h5>
            
            <br>
            <form class="form-inline">
                <div class="form-group" >
                    <label for="usr">NAME:</label>
                    <input type="text" class="form-control" id="name_comment">
                </div >
            </form>
            <br>
            <div id="comment_box">
            <div class="form-group" >
                <label form="comment"> <h5><b> COMMENT:</b></h5></label>
                <textarea class="form-control" rows="5" id="comment"></textarea>
            </div>
            </div>      
            <button type="button" class="btn btn-default navbar-btn">ENTER</button>
        </div>
      
      
      
      <div class="panel panel-default">
         <div class="panel-heading" style="background: #4FFF8D;">
            <h4  style="font-size: 40px;"> COMMENTS </h4>
         </div>
         <div class="panel-body">
                
                
                <div class="comment_section">
                    <div class="panel panel-default">
                    <div class="panel-body">
                            Panel Content
                            sdfsd dfdsfgsdfgsd
                            ffdfsgdfsg
                            sadfdfgdsfg
                            sddsfg
                            fsadfsg
                            dfdfg dsfgdsfg sdfgsdfg dsfgdfsg
                            dsdfg dsfgdfs dsfgdf dsfgdsf dsfgdsf gdsfgdsf
                            sadfs dsfgdf dsfgdfg dfgdfg dfsgdfg dfgdsfg dsfgdsfg dfgssdfg
                            adfdsgf sdfgdf dfsgdfg dfgsdfg dfgdsfg dsfgdfg
                            sdafdfgdf dfgdsf sdfg dsfg
                            sad dsf ssd sdfgdfgsdf
                            fdfg dfgdfg
                            sadfdsgf
                            sdaf dsfgdf
                            sdadfsg
                            f dsfg dsfgd
                            sdaf  dfgdfg dfgds
                            saddfsg dfg dfg 
                            fsd dfgdfg dsfg dsfg dfgd dsfg dfg
                            f dfg gdsfg gdsfg sddgfdf  dsfgd dsfg dsfgdf
                    </div>
                        <div class="panel-heading"><h4 > USER NAME </h4></div>
                    </div>
               </div>     
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
   
   
   
   
    /*var title = data.title;
    var heading = data.heading;
    var content = data.content;
       
    var htmlTemplate =  `<html>
    <head>
        <title>
            ${title}
        </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/ui/style.css" rel="stylesheet" />
    
    </head>
    

<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    
    <hr/>
    
    <h3>
        ${heading}
    </h3>
    
    <div>
        ${content}
    </div>
</div>
</body>

</html>`;
*/
return htmlTemplate;
}





app.get('/:categoryName',function (req,res) {
      
      
      var category = req.params.categoryName;
      pool.query("SELECT * FROM article WHERE category = $1", [category] ,function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(counter.toString());
      }
      else {
          if(result.rows.length === 0){
            res.status(404).send('Article Not Found');
              
          }
          else {
            
            //var articleData = result.rows[0];        
            res.send(createPageTemplate(result.rows,category));
              
          }
          
      }
   });
      
});








app.get('/articles/:articleName',function (req,res) {
      
      
       
      pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName] ,function(err, result) {
      // handle an error from the query
      if(err) {
          res.status(500).send(counter.toString());
      }
      else {
          if(result.rows.length === 0){
            res.status(404).send('Article Not Found');
              
          }
          else {
            var articleData = result.rows[0];        
            res.send(createTemplate(articleData));
              
          }
          
      }
   });
      
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

