function loadSlider() {
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homePageSlide', 
    'GET', 
    'JSON')
    .then (function(data) {
        for (row in data) {
            
            $('<div></div>').attr('class',"carousel__elements").attr('id', data[row].id_brand).appendTo(".carousel__list").html( 
                "<img class='carousel__img' id='' src='"+ data[row].brand_img +"' alt='' style = 'max-width: 100%; max-height: 200px;'>"
            )
        }

        new Glider(document.querySelector('.carousel__list'),{ 
            slidesToShow: 4,
            dots: '.carousel__indicator',
            draggable: true,
            arrows: {
                prev: '.carousel__prev',
                next: '.carousel__next'
            }
        });
    }).catch(function() {
        window.location.href = "index.php?module=exceptions&op=503&error=error_loadSlider";
    });
}

function loadCategory() {
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homeBrands', 
    'GET', 
    'JSON')
    .then (function(data) {
        for (row in data) {
            $('<div></div>').attr('class',"card card_category").attr('id', data[row].id_category).appendTo(".cat").html( 
                "<figure><img src='"+ data[row].category_img +"'></figure>"+        
                "<div class='contenido'><h3>"+ data[row].category_name +"</h3>"+
                "</div>"
                
            )
        }
    }).catch(function() {
        window.location.href = 'index.php?module=exceptions&op=503&error=error_loadCategory';
    });
}

function loadType() {
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=homeType', 
    'GET', 
    'JSON')
    .then(function(data) {
        for (row in data) {
            $('<div></div>').attr('class',"card car_type").attr('id', data[row].id_type).appendTo(".type").html( 
                "<figure><img src='"+ data[row].type_img +"'></figure>"+        
                "<div class='contenido'><h3>"+ data[row].type_name +"</h3>"+
                "</div>"
            )
        }
    }).catch(function() {
        window.location.href = 'index.php?module=exceptions&op=503&error=error_loadType';
    });
}

function clicks(){

    $(document).on("click",'div.carousel__elements', function (){
        var brand = $(this).attr('id');
        var type="ALL";
        var kilometros="ALL";
        var setting="ALL";
        var category="ALL";
        var filtersSolucion = 1;

        localStorage.setItem('filtersSolucion', JSON.stringify(filtersSolucion));
        localStorage.setItem('filtersSolucionFilters', JSON.stringify(filtersSolucion));
        localStorage.setItem('brand', JSON.stringify(brand));
        localStorage.setItem('kilometros', JSON.stringify(kilometros));
        localStorage.setItem('type', JSON.stringify(type));
        localStorage.setItem('setting', JSON.stringify(setting));
        localStorage.setItem('category', JSON.stringify(category));
        
            setTimeout(function(){ 
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            }, 300);
    });
    $(document).on("click",'div.card_category', function (){
        var brand="ALL";
        var type="ALL";
        var kilometros="ALL";
        var setting="ALL";
        var category = $(this).attr('id');
        var filtersSolucion = 1;
        localStorage.setItem('filtersSolucion', JSON.stringify(filtersSolucion));
        localStorage.setItem('filtersSolucionFilters', JSON.stringify(filtersSolucion));
        localStorage.setItem('brand', JSON.stringify(brand));
        localStorage.setItem('kilometros', JSON.stringify(kilometros));
        localStorage.setItem('type', JSON.stringify(type));
        localStorage.setItem('setting', JSON.stringify(setting));
        localStorage.setItem('category', JSON.stringify(category));
            setTimeout(function(){ 
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            }, 300);
    });
    $(document).on("click",'div.car_type', function (){
        var brand="ALL";
        var type = $(this).attr('id');
        var kilometros="ALL";
        var setting="ALL";
        var category="ALL";
        var filtersSolucion = 1;

        localStorage.setItem('filtersSolucion', JSON.stringify(filtersSolucion));
        localStorage.setItem('filtersSolucionFilters', JSON.stringify(filtersSolucion));
        localStorage.setItem('brand', JSON.stringify(brand));
        localStorage.setItem('kilometros', JSON.stringify(kilometros));
        localStorage.setItem('type', JSON.stringify(type));
        localStorage.setItem('setting', JSON.stringify(setting));
        localStorage.setItem('category', JSON.stringify(category));
            setTimeout(function(){ 
                window.location.href = 'index.php?module=ctrl_shop&op=list';
            }, 300);
    });
}

function loadsuggestions() {
    var limit = 4;
    $(document).on("click", '.redireccion', function () {
        $('.rowa').empty();
        limit = limit + 4;
        
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: "https://www.googleapis.com/books/v1/volumes?q=search+terms+cars",
        }).done(function (data) {
            var DatosJson = JSON.parse(JSON.stringify(data));
            console.log(data);
            for (i = 0; i < limit; i++) {
                $('<div></div>').attr('class',"").appendTo(".rowa").html( 
                    '<div class="col-lg-3 col-md-6a">'+
                    '<div class="team-item"><div class="team-img"><img src="' + data["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"] + '" alt="Team Image" style = "max-width: 100%; max-height: 200px;">'+
                    '</div><div class="team-text" style = "max-width: 100%; height: 100px;"><h2>' + DatosJson.items[i].volumeInfo.authors +'</h2>'+
                    '<div class="team-social"><a href=""><i class="fab fa-twitter"></i></a>'+
                    '<a href=""><i class="fab fa-facebook-f"></i></a><a href=""><i class="fab fa-linkedin-in"></i></a>'+
                    '<a href=""><i class="fab fa-instagram"></i></a>'+
                    '</div></div></div></div>'
                )
            }
            $('<div></div>').attr('class',"").appendTo("#loadsugest").html(
                '<div class="redireccion"><a>MoreBooks</a></div>'
            )
            console.log(limit);
            if (limit === 8) {
                $('#loadsugest').empty();
                $('<div></div>').attr('class',"").appendTo("#loadsugest").html(
                    '<div><a>No hay mas tendencia</a></div>'
                )
                console.log("hola");
            }
        });
    })
}

function getSuggestions() {
    limit = 4;
    $('.featured_button').empty();

    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "https://www.googleapis.com/books/v1/volumes?q=search+terms+cars",

    }).done(function (data) {
        var DatosJson = JSON.parse(JSON.stringify(data));
        DatosJson.items.length = limit;
        
        for (i = 0; i < DatosJson.items.length; i++) {
            $('<div></div>').attr('class',"").appendTo(".rowa").html( 
                '<div class="col-lg-3 col-md-6a">'+
                '<div class="team-item"><div class="team-img"><img src="' + data["items"][i]["volumeInfo"]["imageLinks"]["thumbnail"] + '" alt="Team Image" style = "max-width: 100%; max-height: 200px;">'+
                '</div><div class="team-text" style = "max-width: 100%; height: 100px;"><h2>' + DatosJson.items[i].volumeInfo.authors +'</h2>'+
                '<div class="team-social"><a href=""><i class="fab fa-twitter"></i></a>'+
                '<a href=""><i class="fab fa-facebook-f"></i></a><a href=""><i class="fab fa-linkedin-in"></i></a>'+
                '<a href=""><i class="fab fa-instagram"></i></a>'+
                '</div></div></div></div>'
            )
        }

        $('<div></div>').attr('class',"").appendTo(".rowa").html(
            '<br>'
        )
        $('<div></div>').attr('class',"").appendTo("#loadsugest").html(
            '<div class="redireccion"><a>MoreBooks</a></div>'
        )
    });
    loadsuggestions();
}

$(document).ready(function () {
    clicks();
    loadSlider();
    loadCategory();
    loadType();
    getSuggestions();
    localStorage.setItem('zone', 'home');
});
