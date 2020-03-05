function getPosts() {
    return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
        req.open('GET', 'http://newsapi.org/v2/top-headlines?' + 'sources=bbc-news&' + 'apiKey=f6aac9d7150c454a98aa2d2949d39181');

        req.onload = function() {
        if (req.status == 200) {
            resolve(JSON.parse(req.response));
        }
        else {
            reject();
        }
        };

        req.send();
    })
}

var promises = [
    getPosts()
];

Promise.all(promises).then(results => {
    var articles = results[0].articles;

    for(var key in articles){
        var title = articles[key].title;
        var description = articles[key].description;
        var urlToImage = articles[key].urlToImage;
        
        var slider = document.getElementById("slider");
        slider.innerHTML = slider.innerHTML + '<li><div class="card text-center"><img class="card-img-top img-fluid" src="'+urlToImage+'" alt="Card image cap"><div class="card-block"><h4 class="card-title mt-3">'+title+'</h4><p class="card-text">'+description+'</p></div></div></li>';

    }
    
    $('ul').owlCarousel({
        loop:true,
        navigation: true,
        navigationText : ["<i class='fa fa-arrow-left' aria-hidden='true'></i>","<i class='fa fa-arrow-right' aria-hidden='true'></i>"],
        pagination: false,
        items: 5,
        addClassActive: true,
    });
})