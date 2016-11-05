var i;
var link = document.getElementsByClassName("article_title");

console.log("link length:" + link.length);

for(i=0;i<link.length;i++)
{
    console.log(link[i].innerHTML);
    
    
}

for(i=0;i<link.length;i++)
{
    
    console.log("in loop: " + link[i].innerHTML);
link[i].onclick = function() {
    
    console.log("link clicked");
    console.log(link[i].innerHTML);
    
    articleName = link[i].innerHTML ; 
    
    //create request object
    var request =  new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                var data = JSON.parse(request.responseText);
                
                var span1=document.getElementById("articleTitle");
                span1.innerHTML =data.title.toString();
                
                var span2=document.getElementById("articleContent");
                span2.innerHTML =data.content.toString();
                
                
            }
    
        }
    
    
    };

    //make a request
    request.open('GET', 'http://rg77.imad.hasura-app.io/articles/' +  articleName,true);
    request.send(null);
    
    
    };
}
    
