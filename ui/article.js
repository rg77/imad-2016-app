console.log("6-16;9:52 am");
function fetchArticle(link) {
    
    console.log("link clicked");
    
    console.log(link.innerHTML);
    
    articleName = link.innerHTML ; 
    
    //create request object
    var request =  new XMLHttpRequest();
    
    
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
        // everything is good, the response is received
            if(request.status === 200) {
                
                var data = request.responseText; 
                data = JSON.parse(data[0]);
                
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
    
    
    }
    

    