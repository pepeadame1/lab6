let texto = $("#video")
let buscar = $("#search")
let key1 = "AIzaSyBNjllGsCXxDh"
let key2 = "ZP79vuLugpc3WjbR040y8"
let lista = $("#lista")
let next = ""
let prev = ""
let botones = $("#botones")
let body = $("section")[0]

//buscar video
$(buscar).on("click",function(e){
    event.preventDefault();
    //checar valor nulo
    console.log(texto.val());
    if(texto.val().trim()!=''){
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search",
            method: 'GET',
            data: {
                part: 'snippet',
                q: texto.val(),
                maxResults: '10',
                key: key1+key2
            },
            dataType: 'jsonp',
            success: function(result){
                let videos = result["items"]
                console.log(result)
                videos.forEach(element => {
                    $(lista).append("<a target='blank' href='https://www.youtube.com/watch?v=" + element["id"]["videoId"] + "'> <h2>" + element["snippet"]["title"] + "</h2> </a>")
                    $(lista).append("<a target='blank' href='https://www.youtube.com/watch?v=" + element["id"]["videoId"] + "'> <img src='" + element["snippet"]["thumbnails"]["default"]["url"] + "'> </a>")
                });
                prev = result["prevPageToken"]
                next = result["nextPageToken"]
                if (prev != null){
                    $(botones).append("<span> <input class='changePage' id='" + prev + "' type='button' value='Pagina anterior'> </span>")
                }
                if (next != null){
                    $(botones).append("<span> <input class='changePage' id='" + next + "' type='button' value='Siguiente pagina'> </span>")
                }
            }
        })
    }
});

//cambiar de pagina
$(botones).on("click", ".changePage", function(event){
    event.preventDefault()
    $(lista).html("")
    $(botones).html("")

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search",
        method: 'GET',
        data: {
            part: 'snippet',
            pageToken: event.target.id,
            maxResults: '10',
            q: texto.val(),
            key: key1+key2
        },
        dataType: 'jsonp',
        success: function(result){
            let videos = result["items"]
            console.log(result)
            videos.forEach(element => {
                $(lista).append("<a target='blank' href='https://www.youtube.com/watch?v=" + element["id"]["videoId"] + "'> <h2>" + element["snippet"]["title"] + "</h2> </a>")
                $(lista).append("<a target='blank' href='https://www.youtube.com/watch?v=" + element["id"]["videoId"] + "'> <img src='" + element["snippet"]["thumbnails"]["default"]["url"] + "'> </a>")
            });
            prev = result["prevPageToken"]
            next = result["nextPageToken"]
          if (prev != null){
                $(botones).append("<span> <input class='changePage' id='" + prev + "' type='button' value='Pagina anterior'> </span>")
            }
            if (next != null){
                $(botones).append("<span> <input class='changePage' id='" + next + "' type='button' value='Siguiente pagina'> </span>")
            }
        }
    })
})