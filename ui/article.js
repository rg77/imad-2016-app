var link = document.getElementsByClassName("article_title");

for(i=0;i<link.length;i++)
{
    
    
link[i].onclick = function() {
    
    linkName = link[i].innerHTML ; 
    
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
    request.open('GET', 'http://rg77.imad.hasura-app.io/articles/' +  linkName,true);
    request.send(null);
    
    
    };
}
    
