const displayArticle = function(search_term) {

    const newsTitle1 = document.querySelector("#title1");
    const url1 = document.querySelector("#url1");
    const image1 = document.querySelector("#image1");

    const newsTitle2 = document.querySelector("#title2");
    const url2 = document.querySelector("#url2");
    const image2 = document.querySelector("#image2");

    const newsTitle3 = document.querySelector("#title3");
    const url3 = document.querySelector("#url3");
    const image3 = document.querySelector("#image3");

    const newsTitle4 = document.querySelector("#title4");
    const url4 = document.querySelector("#url4");
    const image4 = document.querySelector("#image4");

    const newsTitle5 = document.querySelector("#title5");
    const url5 = document.querySelector("#url5");
    const image5 = document.querySelector("#image5");

    const newsTitle6 = document.querySelector("#title6");
    const url6 = document.querySelector("#url6");
    const image6 = document.querySelector("#image6");
        
    if (search_term) {
        //news box 1
        newsTitle1.textContent = search_term.data.results[0].title;
        image1.setAttribute("src", search_term.data.results[0].image);
        url1.setAttribute("href", search_term.data.results[0].url);
        url1.setAttribute("target", "_blank");

        newsTitle2.textContent = search_term.data.results[1].title;
        image2.setAttribute("src", search_term.data.results[1].image);
        url2.setAttribute("href", search_term.data.results[1].url);
        url2.setAttribute("target", "_blank");

        newsTitle3.textContent = search_term.data.results[2].title;
        image3.setAttribute("src", search_term.data.results[2].image);
        url3.setAttribute("href", search_term.data.results[2].url);
        url3.setAttribute("target", "_blank");

        newsTitle4.textContent = search_term.data.results[3].title;
        image4.setAttribute("src", search_term.data.results[3].image);
        url4.setAttribute("href", search_term.data.results[3].url);
        url4.setAttribute("target", "_blank");

        newsTitle5.textContent = search_term.data.results[4].title;
        image5.setAttribute("src", search_term.data.results[4].image);
        url5.setAttribute("href", search_term.data.results[4].url);
        url5.setAttribute("target", "_blank");

        newsTitle6.textContent = search_term.data.results[5].title;
        image6.setAttribute("src", search_term.data.results[5].image);
        url6.setAttribute("href", search_term.data.results[5].url);
        url6.setAttribute("target", "_blank");
        
    }
};


const getNews = function() {
    const apiUrl = fetch("https://webit-news-search.p.rapidapi.com/search?q=coding&language=en", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "feec356023msh7d505f582747ea5p199c91jsnd5a1909fc40a",
            "x-rapidapi-host": "webit-news-search.p.rapidapi.com"
        }
    })

    apiUrl.then(function(response) {
        if(response.ok) {
           response.json().then(function(data) {
               console.log("news", data);
               console.log(data.data.results[0].title);
               displayArticle(data);
           })
        }
    })

};

getNews();
