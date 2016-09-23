var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
}); 

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


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


app.get('/:articleName',function (req,res) {
      var articleName = req.params.articleName;
      res.send(createTemplate(articles[articleName]));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});