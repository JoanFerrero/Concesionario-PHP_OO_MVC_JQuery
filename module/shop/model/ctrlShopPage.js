$(document).ready(function () {
    loadContent();
    click_details();
    click_like();
    localStorage.setItem('zone', 'shop');
    console.log(localStorage);
});

function loadContent(){ 
    if (localStorage.getItem('details') == "true") {
        localStorage.setItem('details', "false");
        load_details();
        click_details();
    }else {
        loadfilters();
        load_pagination();
        click_details();
    }
}

function loadfilters() {

        $('<div></div>').attr('class',"").appendTo(".filters").html(
            '<label for="" class="label_filter">Ordenar Por</label>'+
            '<select name="order" class="select_filter" id="checkOrder">'+
                '<option value="ALL" id="order">Toda</option>'+
                '<option value="1" id="order">Precio</option>'+
                '<option value="2" id="order">Km</option>'+
            '</select>'+
            '<label for="" class="label_filter">Marca</label>'+
            '<select name="brand" class="select_filter" id="checkBrand">'+
                '<option value="ALL" id="brand">Todas las marcas</option>'+
                '<option value="1" id="brand">Mercedes</option>'+
                '<option value="2" id="brand">Audi</option>'+
                '<option value="3" id="brand">BMW</option>'+
                '<option value="4" id="brand">Lamborguini</option>'+
                '<option value="5" id="brand">Porche</option>'+
                '<option value="6" id="brand">Tesla</option>'+
                '<option value="7" id="brand">VolksWagen</option>'+
            '</select>'+
            '<label for="" class="label_filter">Kilometros</label>'+
            '<select name="kilometros" class="select_filter" id="checkKilometros">'+
                '<option value="ALL" id="kilometros">Desde</option>'+
                '<option value="2500" id="kilometros">Hasta 2500</option>'+
                '<option value="5000" id="kilometros">Hasta 5000</option>'+
                '<option value="10000" id="kilometros">Hasta 10000</option>'+
                '<option value="20000" id="kilometros">Hasta 20000</option>'+
                '<option value="30000" id="kilometros">Hasta 30000</option>'+
                '<option value="50000" id="kilometros">Hasta 50000</option>'+
                '<option value="100000" id="kilometros">Hasta 100000</option>'+
            '</select>'+
            '<label for="" class="label_filter">Combustible</label>'+
            '<select name="type" class="select_filter" id="checkType">'+
                '<option value="ALL" id="type">Todos los combustibles</option>'+
                '<option value="1" id="type">Gasolina</option>'+
                '<option value="3" id="type">Electico</option>'+
                '<option value="2" id="type">Hibrido</option>'+
            '</select>'+
            '<label for="" class="label_filter">Cambio</label>'+
            '<select name="setting" class="select_filter" id="checkSetting">'+
                '<option value="ALL" id="setting">Todos</option>'+
                '<option value="1" id="setting">Manual</option>'+
                '<option value="2" id="setting">Automatico</option>'+
            '</select>'+
            '<div class="button_filter">'+
            '<input type="button" id="filter" value="Filtrar" onclick="filters()"></input>'+
            '</div>'    
        )
        loadcars();
}

function loadcars(items_page = 2, total_prod = 0) {
    $(".cat_cars").empty();
    $(".texto_higtlike").empty();
    $(".Delete_hisgtlike").empty();
    $(".higtlike").empty();
    $(".map_list_car").empty();
    var filtersSolucion = "";
    var filtersSolucion_search = 0;
    filtersSolucion = localStorage.getItem('filtersSolucion') || false;
    var brand = localStorage.getItem('brand') || false;
    var kilometros = localStorage.getItem('kilometros') || false;
    var type = localStorage.getItem('type') || false;
    var setting = localStorage.getItem('setting') || false;
    var category = localStorage.getItem('category') || false;
    var category_search = localStorage.getItem('category_search') || false;
    var brand_search = localStorage.getItem('brand_search') || false;
    var autocom_search = localStorage.getItem('autocom_search') || false;
    var order = localStorage.getItem('order') || false;
    filtersSolucion_search = localStorage.getItem('filtersSolucion_search') || false;
    if(category == false) {
        category = "ALL";
        localStorage.setItem('category', JSON.stringify(category));
    }
    if(filtersSolucion != 0){ 
        var url = 'module/shop/ctrl/ctrl_shop.php?op=filters_search&brand=' + brand + '&kilometros=' + kilometros + 
                                                                    '&type=' + type + '&setting=' + setting + 
                                                                    '&category=' + category + '&order=' + order +
                                                                    '&items_page=' + items_page + '&total_prod=' + total_prod;                                      
    }else if(filtersSolucion_search != 0){
        var url = 'module/shop/ctrl/ctrl_shop.php?op=search_Menu&brand_search='+ brand_search +
                                                                '&category_search=' + category_search + 
                                                                '&autocom_search=' + autocom_search +
                                                                '&items_page=' + items_page + '&total_prod=' + total_prod;                                                                                                            
    }else{
        var url = 'module/shop/ctrl/ctrl_shop.php?op=allcars&items_page=' + items_page + '&total_prod=' + total_prod;  
    }
    selectFilters();
    ajaxPromise(url,
    'GET', 'JSON')
    .then (function(data) {
        console.log(data);
        for (row in data) {
            $('<div></div>').attr('class',"mt-ListAds").appendTo(".cat_cars").html(
                "<div class='details' id='"+ data[row].id +"'>"+
                "<div class='mt-AnimationFadeOut mt-ListAds-item mt-CardAd mt-CardBasic'><div>"+
                "<div class='sui-AtomCard sui-AtomCard--responsive' role='button'><div class='sui-AtomCard-media'>"+         
                "<picture><img class='sui-ImageSlider-image' alt='' aria-selected='true' src='"+data[row].img_car+"'>"+
                "</picture></div></div></div></div>"+
                "<div class='sui-AtomCard-info container_junto'>"+
                "<h5 class='mt-CardAd-attrItem'>Precio</h5>"+
                "<h3 class='mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor'>"+ data[row].price+"&nbsp;€</h3>"+
                "<h2 class='mt-CardBasic-title' data-testid='card-ad-title'>"+data[row].brand_name+" "+data[row].model_name+"</h2><ul class='mt-CardAd-attr'>"+
                "<li class='mt-CardAd-attrItem'>"+data[row].province+"</li><li class='mt-CardAd-attrItem'>"+data[row].category_name+"</li><li class='mt-CardAd-attrItem'>"+data[row].fecha+"</li><li class='mt-CardAd-attrItem'>"+data[row].kilometres+" km</li>"+
                "</ul></div></div></div></div><div><div class='list__heart' id='"+data[row].id+"'><i id='like_"+data[row].id+"' class='fas fa-heart fa-heart_like'></i></div>"
            )
        }
        if(data.length==0) {
            $('<div></div>').attr('class',"mt-ListAds").appendTo(".cat_cars").html(
                "<div><h3>No hay coches</h3></div>"
            )
        }

        load_Map_list(data);
        load_like();

    }).catch(function() {
    //window.location.href = 'index.php?module=exceptions&op=503&error=error_allcars';
    });  
}

function count() {
    var id = localStorage.getItem('id_car') || false;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=update_count&id_count='+ id,
    'GET', 'JSON')
}

function load_Map_list(data) {
    $('<div></div>').attr('class',"").appendTo(".map_list_car").html(
        '<div id="map" class="mt-Map-aside"></div>'
    )
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmZlcnJlcm8iLCJhIjoiY2t6eWhqb2VyMDBkYjNqcXBnaHN6MjB6bSJ9.zpFPnjEX0wwofE3XkiQvMw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-3.6949319255831123, 40.62639425934758],
        zoom: 4
    });

    for (row in data) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<div class='details' id='"+ data[row].id +"'>"+
            "<img class='img_mapbox' src='"+ data[row].img_car+"'><h3 class='mt-TitleBasic-title_map '>"+ data[row].price+"&nbsp;€</h3>"+
            "<h2 class='mt-CardBasic-title data-testid='card-ad-title'>"+data[row].brand_name+" "+data[row].model_name+"</h2><ul class='mt-CardAd-attr'>"+
            "<li class='mt-CardAd-attrItem'>"+data[row].province+"</li><li class='mt-CardAd-attrItem'>"+data[row].category_name+"</li><li class='mt-CardAd-attrItem'>"+data[row].fecha+"</li>"+
            "</ul></div></div></div></div></div>"
        ); 

        const ubicacion0 = data[row].lon;
        const ubicacion1 =  data[row].lat;

        const market = new mapboxgl.Marker()
        .setLngLat([ubicacion0 , ubicacion1])
        .setPopup(popup)
        .addTo(map);
    }
}

function click_details() {
    $(document).on('click','.details',function () {
        localStorage.setItem('details', true);
        localStorage.setItem('id_car',  $(this).attr('id'));
        location.reload();
    });
}

function load_details(){
    
    $(".map_list_car").empty();
    $(".cat_cars").empty();
    $(".filters").empty();
    $(".higtlike").empty();
    $(".texto_higtlike").empty();
    $(".Delete_hisgtlike").empty();
    
    var id = localStorage.getItem('id_car') || false;
    count();
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=onecar&modal=' + id,
    'GET', 'JSON')
    .then (function(data) {
        for (row in data) {
            $('<div></div>').attr('class',"carousel__elements").attr('id', data[0][0].id).appendTo(".carousel__shop").html( 
                "<img class='carousel__img' id='' src='"+ data[1][0][row].img_car +"' alt='' style = 'max-width: 100%; max-height: 600px;'>"
            )
        }

        new Glider(document.querySelector('.carousel__shop'), { 
            slidesToShow: 1,
            dots: '.carousel__indicator',
            draggable: true,
            arrows: {
                prev: '.carousel__prev',
                next: '.carousel__next'
            }
        });
        
        $('<div></div>').attr('class',"mt-Detail-panelAdInfoWrapper").attr('id', data[0][0].id).appendTo(".view_information_car").html(        
            '<div class="mt-PanelAdInfo"><div class="mt-PanelAdInfo-title">'+
            '<div class="mt-TitleBasic-titleWrapper mt-TitleBasic-titleWrapper--black mt-TitleBasic-titleWrapper--left">'+
            '<h1 class="mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--black">'+ data[0][0].brand_name +" "+ data[0][0].model_name+'</h1>'+
            '</div></div><div class="mt-PanelAdInfo-price">'+
            '<div class="mt-CardAdPrice mt-CardAdPrice--extended CardAdInformacionleft">'+
            '<div class="mt-CardAdPrice-cash"><span class="mt-CardAdPrice-cashLabel">Precio al contado</span>'+
            '<div class="mt-CardAdPrice-cashAmount" data-testid="card-adPrice-price div class="mt-TitleBasic-titleWrapper mt-TitleBasic-titleWrapper--currentColor mt-TitleBasic-titleWrapper--left">'+
            '<h3 class="mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor">'+ data[0][0].price + " €" +'</h3>'+
            '</div></div><span class="mt-CardAdPrice-cashFooter mt-CardAdPrice-cashFooter--withTaxes">IVA incluido</span>'+
            '</div><div class="mt-CardAdPrice mt-CardAdPrice--extended CardAdInformacionleft CardAdInformacionmarginleft">'+
            '<div class="mt-CardAdPrice-cash"><span class="mt-CardAdPrice-cashLabel">Cuota desde</span>'+
            '<div class="mt-CardAdPrice-cashAmount" data-testid="card-adPrice-price div class="mt-TitleBasic-titleWrapper mt-TitleBasic-titleWrapper--currentColor mt-TitleBasic-titleWrapper--left">'+
            '<h3 class="mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor">295&nbsp;€/mes</h3></div></div>'+
            '<span class="mt-CardAdPrice-cashFooter mt-CardAdPrice-cashFooter--withTaxes">Importe mínimo</span></div>'+
            '<div class="mt-CardAdPrice mt-CardAdPrice--extended CardAdInformacionleft CardAdInformacionmarginleft">'+
            '<div class="mt-CardAdPrice-cash"><span class="mt-CardAdPrice-cashLabel">Garantía 1 año</span>'+
            '<div class="mt-CardAdPrice-cashAmount" data-testid="card-adPrice-price div class="mt-TitleBasic-titleWrapper mt-TitleBasic-titleWrapper--currentColor mt-TitleBasic-titleWrapper--left">'+
            '<h3 class="mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor">1 año</h3></div></div>'+
            '<span class="mt-CardAdPrice-cashFooter mt-CardAdPrice-cashFooter--withTaxes">12 meses</span></div></div>'+
            '<div class="mt-TitleBasic-titleWrapper mt-TitleBasic-titleWrapper--currentColor mt-TitleBasic-titleWrapper--left icon_shop">'+
            '<h3 class="mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor"><img src="view/img/icons/location.png" style = "max-width: 100%; max-height: 50px;">'+ data[0][0].province + " " + data[0][0].town + "  "+'<img src="view/img/icons/door_car.png" style = "max-width: 100%; max-height: 50px;">'+ "  " + data[0][0].puertas +'</h3><div class="list__heart_details"><div class="list__heart" id="'+data[0][0].id+'"><i id="like_'+data[0][0].id+'" class="fas fa-heart fa-heart_like"></i></div></div>'+
            '</div></div></div>'+
            '<div id="map_modal" class="mt-Map-aside_modal"></div>'+
            '</div></section>'
        )
            
        $('<div></div>').attr('class',"").attr('id', data[0].id).appendTo(".Form_Aside_Car").html( 
            "<div id='form-contact-seller-id' class='mt-FormContactSeller'>"+
            "<div class='mt-FormContactSeller-callSeller'>"+
            "<p class='mt-LeadPhoneCall-link' data-testid='lead-phone-call-link' arial-label='Ver teléfono'>"+
            "<span class='mt-LeadPhoneCall-linkText mt-LeadPhoneCall-linkText--medium'>Ver teléfono</span>"+
            "</p></div><form aria-label='contact form' class='formulario_car'><div class='mt-FormContactSeller-formField'>"+
            "<div class='sui-MoleculeField-labelContainer'><div class='sui-MoleculeField-nodeLabelContainer'>"+
            "<lab for='Contacta con el anunciante' class='sui-AtomLabel'>Contacta con el anunciante</label>"+
            "</div></div><div class='sui-MoleculeField-inputContainer'>"+
            "<textarea class='tot textarea' id='Contacta con el anunciante' placeholder='Estoy interesado/a en este vehículo...' tabindex='0' class='sui-AtomTextarea sui-AtomTextarea--short'>"+
            "</textarea></div></div><div class='mt-FormContactSeller-formField'><div class='sui-MoleculeField'>"+
            "<div class='sui-MoleculeField-inputContainer'><input class='sui-AtomInput-input sui-AtomInput-input-m' tabindex='0' id='Tu nombre' placeholder='Nombre' value=''>"+
            "</div></div></div><div class='mt-FormContactSeller-formField'><div class='sui-MoleculeField'>"+
            "<div class='sui-MoleculeField-inputContainer'><input class='sui-AtomInput-input sui-AtomInput-input-m' tabindex='0' id='Tu email' placeholder='Email' type='email' value=''>"+
            "</div></div></div><div class='mt-FormContactSeller-formField'><div class='sui-MoleculeField'><div class='sui-MoleculeField-inputContainer'>"+
            "<input class='sui-AtomInput-input sui-AtomInput-input-m' tabindex='0' id='Tu teléfono' placeholder='Teléfono' type='tel' value=''>"+
            "</div></div></div><div class='mt-FormContactSeller-formField'><div class='sui-MoleculeCheckboxField'>"+
            "<div class='sui-MoleculeField sui-MoleculeField--inline sui-MoleculeField--inline-reverse'>"+
            "<div class='sui-MoleculeField-labelContainer'><label class='sui-AtomCheckbox sui-AtomCheckbox--medium'>"+
            "<input type='checkbox' id='terms_and_conditions' name='terms_and_conditions' intermediate=''>"+
            "</label><div class='sui-MoleculeField-nodeLabelContainer'><label class='mt-FormContactSeller-termsAndConditions' for='terms_and_conditions' name='terms_and_conditions'>Acepto las "+
            "<a href='/condiciones-de-uso/' class='mt-FormContactSeller-link' target='_blank'>condiciones de uso</a> y la"+
            "<a href='/condiciones-de-uso/#proteccion-datos' class='mt-FormContactSeller-link' target='_blank'>información básica de protección de datos</a>."+
            "</label></div></div><div class='sui-MoleculeField-inputContainer sui-MoleculeField-inputContainer--aligned'>"+
            "</div></div></div></div><div class='mt-FormContactSeller-contactButton mt-FormContactSeller-contactButtonGroup'>"+
            "<div class='mt-FormContactSeller-submit'><button shape='circular' class='sui-AtomButton sui-AtomButton--accent sui-AtomButton--solid sui-AtomButton--center sui-AtomButton--large sui-AtomButton--fullWidth sui-AtomButton--circular'>"+
            "<span class='sui-AtomButton-inner'>Contactar</span></button></div>"+
            "<div class='mt-FormContactSeller-callMeBackButton'>"+
            "<button id='6hzkt5upuvyovm0' shape='circular' class='sui-AtomButton sui-AtomButton--primary sui-AtomButton--outline sui-AtomButton--center sui-AtomButton--large sui-AtomButton--fullWidth sui-AtomButton--circular'>"+
            "<span class='sui-AtomButton-inner'>Llamadme</span></button></div></div></form></div>"
        )

        $('<div></div>').attr('class',"").attr('id', data[0].id).appendTo(".more_related").html( 
            '<section class="more_related" id="brands">'+
                '<h3 class="brand__title">Marcas que son tendencia</h3>'+
                '<div class="results"></div><div class="brand__button">'+
                '<button class="load_more button" id="load_more_button">load More</button>'+
            '</div></section>'
        )
        
        mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmZlcnJlcm8iLCJhIjoiY2t6eWhqb2VyMDBkYjNqcXBnaHN6MjB6bSJ9.zpFPnjEX0wwofE3XkiQvMw';
        const map = new mapboxgl.Map({
            container: 'map_modal',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-3.6949319255831123, 40.62639425934758],
            zoom: 4
        }); 
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            "<div class='details' id='"+ data[0][0].id +"'>"+
            "<img class='img_mapbox' src='"+ data[0][0].img_car+"'><h3 class='mt-TitleBasic-title mt-TitleBasic-title--s mt-TitleBasic-title--currentColor'>"+ data[0][0].price+"&nbsp;€</h3>"+
            "<h2 class='mt-CardBasic-title' data-testid='card-ad-title'>"+data[0][0].brand_name+" "+data[0][0].model_name+"</h2><ul class='mt-CardAd-attr'>"+
            "<li class='mt-CardAd-attrItem'>"+data[0][0].province+"</li><li class='mt-CardAd-attrItem'>"+data[0][0].category_name+"</li><li class='mt-CardAd-attrItem'>"+data[0][0].fecha+"</li>"+
            "</ul></div></div></div></div></div>"
        );

        const market = new mapboxgl.Marker()
        .setLngLat([data[0][0].lon , data[0][0].lat])
        .setPopup(popup)
        .addTo(map);
        
        load_more(data[0][0].category_name, data[0][0].id);
        load_like();

        
    }).catch(function(){
        window.location.href = 'index.php?module=exceptions&op=503&error=error_onecar';
    });
};

function highlightFilters(){

    var filtersSolucion = 0;
    filtersSolucion = localStorage.getItem('filtersSolucion') || false;
    var brand_highlike = localStorage.getItem('brand_highlightFilters') || false;
    var kilometros_highlike = localStorage.getItem('kilometros_highlightFilters') || false;
    var type_highlike = localStorage.getItem('type_highlightFilters') || false;
    var setting_highlike = localStorage.getItem('setting_highlightFilters') || false;
    var category_highlightFilters = localStorage.getItem('category_highlightFilters') || false;
    var order_highlightFilters = localStorage.getItem('order_highlightFilters') || false;
    var order_kilometros_highlightFilters = localStorage.getItem('order_kilometros_highlightFilters') || false;

    var brand = localStorage.getItem('brand') || false;
    var kilometros = localStorage.getItem('kilometros') || false;
    var type = localStorage.getItem('type') || false;
    var setting = localStorage.getItem('setting') || false;
    var category = localStorage.getItem('category') || false;
    var order = localStorage.getItem('order') || false;

    if(filtersSolucion != 0) {
        $('<div></div>').attr('class',"mt-SearchTags-label").appendTo(".texto_higtlike").html( 
            '<div class="mt-SearchSidebar-tags">'+
            '<p class="mt-SearchTags-label">Tu búsqueda</p>'
        )
        if(brand_highlike){
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose brand").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ brand_highlike.replace(/['"]+/g, '') +'</span>' 
            )
        }
        if (brand == '"ALL"'){
            $(".brand").empty();
        }
        if(kilometros_highlike){
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose kilometros").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ kilometros_highlike.replace(/['"]+/g, '') +'</span>'                
            )
        }
        if(kilometros == '"ALL"'){
            $(".kilometros").empty();
        }
        if(type_highlike){
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose type").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ type_highlike.replace(/['"]+/g, '') +'</span>'
            )
        }
        if(type == '"ALL"') {
            $(".type").empty();
        }
        if(setting_highlike){
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose setting").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ setting_highlike.replace(/['"]+/g, '') +'</span>'
            )
        }
        if(setting == '"ALL"') {
            $(".setting").empty();
        }
        if(category_highlightFilters){
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose category").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ category_highlightFilters.replace(/['"]+/g, '') +'</span>'
            )
        }
        if(category == '"ALL"'){
            $(".category").empty();
        }

        if(order_highlightFilters){
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose order").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ order_highlightFilters.replace(/['"]+/g, '') +'</span>'
            )
        }

        if(order_kilometros_highlightFilters){
            $(".order").empty();
            $('<div></div>').attr('class',"sui-AtomTag sui-AtomTag-small sui-AtomTag--responsive sui-AtomTag--white sui-AtomTag-hasClose order").appendTo(".higtlike").html( 
                '<span class="sui-AtomTag-label">'+ order_kilometros_highlightFilters.replace(/['"]+/g, '') +'</span>'
            )
        }
        if(order == '"ALL"'){
            $(".order").empty();
        }
        $('<div></div>').attr('class',"mt-SearchTags-reset").appendTo(".Delete_hisgtlike").html( 
            '<a role="button" class="sui-AtomButton " onclick="removefilters()">'+
            '<span type="button" class="sui-AtomButton-inner" >Delete filters</span>'+
            '</a>'
        )
    }
}

function filters() {
    var filtersSolucion = 0;
    var brand;
    var kilometros;
    var type;
    var setting;

    $.each($("option[id='brand']:checked"), function(){      
        brand = $(this).val();
        filtersSolucion = 1;
    });
    
    $.each($("option[id='kilometros']:checked"), function(){     
        kilometros = $(this).val();
        filtersSolucion = 1;
    });

    $.each($("option[id='type']:checked"), function(){     
        type = $(this).val();
        filtersSolucion = 1;
    });


    $.each($("option[id='setting']:checked"), function(){     
        setting = $(this).val();
        filtersSolucion = 1;
    });

    $.each($("option[id='order']:checked"), function(){     
        order = $(this).val();
        filtersSolucion = 1;
    });

    localStorage.setItem('filtersSolucion', JSON.stringify(filtersSolucion));
    localStorage.setItem('filtersSolucionFilters', JSON.stringify(filtersSolucion));
    localStorage.setItem('brand', JSON.stringify(brand));
    localStorage.setItem('kilometros', JSON.stringify(kilometros));
    localStorage.setItem('type', JSON.stringify(type));
    localStorage.setItem('setting', JSON.stringify(setting));
    localStorage.setItem('order', JSON.stringify(order));

    document.form_filter.submit();
    document.form_filter.action="index.php?module=ctrl_shop&op=list";
}

function selectFilters(){

    var brand = localStorage.getItem('brand') || false;
    var kilometros = localStorage.getItem('kilometros') || false;
    var type = localStorage.getItem('type') || false;
    var setting = localStorage.getItem('setting') || false;
    var category = localStorage.getItem('category') || false;
    var order = localStorage.getItem('order') || false;

    if(brand != '"ALL"'){
        if(brand == '"1"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "1";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("Mercedes"));
        }
        if(brand == '"2"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "2";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("Audi"));
        }
        if(brand == '"3"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "3";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("BMW"));
        }
        if(brand == '"4"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "4";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("Lamborguini"));
        }
        if(brand == '"5"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "5";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("Porsche"));
        }
        if(brand == '"6"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "6";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("Tesla"));
        }
        if(brand == '"7"'){
            const $select = document.querySelector('#checkBrand');
            $select.value = "7";
            localStorage.setItem('brand_highlightFilters', JSON.stringify("Volkswagen"));
        }
            
    }
    if(kilometros != '"ALL"'){
        if(kilometros == '"2500"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "2500";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("2500"));
        }
        if(kilometros == '"5000"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "5000";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("5000"));
        }
        if(kilometros == '"10000"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "10000";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("10000"));
        }
        if(kilometros == '"20000"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "20000";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("20000"));
        }
        if(kilometros == '"30000"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "30000";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("30000"));
        }
        if(kilometros == '"50000"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "50000";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("50000"));
        }
        if(kilometros == '"100000"'){
            const $select = document.querySelector('#checkKilometros');
            $select.value = "100000";
            localStorage.setItem('kilometros_highlightFilters', JSON.stringify("100000"));
        }

    }
    if(type != '"ALL"'){
        if(type == '"1"'){
            const $select = document.querySelector('#checkType');
            $select.value = "1";
            localStorage.setItem('type_highlightFilters', JSON.stringify("Gasolina"));
        }
        if(type == '"2"'){
            const $select = document.querySelector('#checkType');
            $select.value = "2";
            localStorage.setItem('type_highlightFilters', JSON.stringify("Hibrido"));
        }
        if(type == '"3"'){
            const $select = document.querySelector('#checkType');
            $select.value = "3";
            localStorage.setItem('type_highlightFilters', JSON.stringify("Electrico"));
        }
    }
    if(setting != '"ALL"'){
        if(setting == '"1"'){
            const $select = document.querySelector('#checkSetting');
            $select.value = "1";
            localStorage.setItem('setting_highlightFilters', JSON.stringify("Manual"));
        }
        if(setting == '"2"'){
            const $select = document.querySelector('#checkSetting');
            $select.value = "2";
            localStorage.setItem('setting_highlightFilters', JSON.stringify("Automatico"));
        }
    }
    if(category != '"ALL"'){
        if(category == '"1"'){
            localStorage.setItem('category_highlightFilters', JSON.stringify("Km0"));
        }
        if (category == '"2"'){
            localStorage.setItem('category_highlightFilters', JSON.stringify("Nuevo"));
        }
        if (category == '"3"'){
            localStorage.setItem('category_highlightFilters', JSON.stringify("SegundaMano"));
        }
    }
    if(order != '"ALL"'){
        if(order == '"1"'){
            const $select = document.querySelector('#checkOrder');
            $select.value = "1";
            localStorage.setItem('order_highlightFilters', JSON.stringify("Precio"));
        }
        if (order == '"2"'){
            const $select = document.querySelector('#checkOrder');
            $select.value = "2";
            localStorage.setItem('order_kilometros_highlightFilters', JSON.stringify("kms DESC"));
        }
    }
    highlightFilters();
}

function removefilters(){
    localStorage.removeItem('filtersSolucion');
    localStorage.removeItem('filters');
    localStorage.removeItem('brand');
    localStorage.removeItem('kilometros');
    localStorage.removeItem('type');
    localStorage.removeItem('setting');
    localStorage.removeItem('brand_highlightFilters');
    localStorage.removeItem('kilometros_highlightFilters');
    localStorage.removeItem('type_highlightFilters');
    localStorage.removeItem('setting_highlightFilters');
    localStorage.removeItem('category_highlightFilters');
    localStorage.removeItem('category');
    localStorage.removeItem('category_search');
    localStorage.removeItem('brand_search');
    localStorage.removeItem('autocom_search');
    localStorage.removeItem('filtersSolucion_search');
    localStorage.removeItem('order');
    localStorage.removeItem('autocom_search');
    localStorage.removeItem('order_highlightFilters');
    localStorage.removeItem('order_kilometros_highlightFilters');

    $(".map_list_car").empty();
    $(".filters").empty();
    $(".cat_cars").empty();
    $(".higtlike").empty();
    $(".texto_higtlike").empty();
    $(".Delete_hisgtlike").empty();
    loadfilters(); 
    highlightFilters();
}

function removefiltersHighLike(){
    $(".higtlike").empty();
    highlightFilters();
}

function load_pagination(){

    var filtersSolucion = "";
    var filtersSolucion_search = 0;
    filtersSolucion = localStorage.getItem('filtersSolucion') || false;
    filtersSolucion_search = localStorage.getItem('filtersSolucion_search') || false;
    var brand = localStorage.getItem('brand') || false;
    var kilometros = localStorage.getItem('kilometros') || false;
    var type = localStorage.getItem('type') || false;
    var setting = localStorage.getItem('setting') || false;
    var category = localStorage.getItem('category') || false;
    var category_search = localStorage.getItem('category_search') || false;
    var brand_search = localStorage.getItem('brand_search') || false;
    var autocom_search = localStorage.getItem('autocom_search') || false;
    var order = localStorage.getItem('order') || false;

    if(filtersSolucion != 0){ 
        console.log("Hola2");
        var url = 'module/shop/ctrl/ctrl_shop.php?op=count_filters_search&brand=' + brand + '&kilometros=' + kilometros + 
                                                                    '&type=' + type + '&setting=' + setting + 
                                                                    '&category=' + category + '&order=' + order;
    }else if(filtersSolucion_search != 0){
        var url = 'module/shop/ctrl/ctrl_shop.php?op=count_search_Menu&brand_search='+ brand_search +
                                                                '&category_search=' + category_search + 
                                                                '&autocom_search=' + autocom_search;
        filtersSolucion_search = 0;
        localStorage.setItem('filtersSolucion_search', JSON.stringify(filtersSolucion_search));                                                                                                                
    }else{
        var url = 'module/shop/ctrl/ctrl_shop.php?op=count_allcars';
    }

    ajaxPromise(url,
    'GET', 'JSON')
    .then (function(data) {
        var total_pages = 0;
        var total_prod = data[0].n_cars;
        if(total_prod >= 2){
            total_pages = total_prod / 2;
        }else{
            total_pages = 1;
        }

        $('#pagination_shop').bootpag({
            total: total_pages,
            page: 1,
            maxVisible: total_pages
        }).on('page', function(event, num){
            total_prod = 2 * (num - 1);
            loadcars(2, total_prod);
            $('html, body').animate({scrollTop: $(".cat_cars")});
        });
    }).catch(function() {
        console.log('error');
    //window.location.href = 'index.php?module=exceptions&op=503&error=error_allcars';
    });
}

function load_more(category, id) {
    
    var id_Car = id;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=count_related&category=' + category + '&id=' + id_Car, 
    'POST', 'JSON')
    .then(function(data) {
        console.log(data);
        total_items = data[0].n_cars;
        more_related(category, id_Car);
        $(document).on("click",'button.load_more', function (){
            var items = $('.car_content').length + 2;
            if (total_items <= items) {
            $('.brand__button').empty();
            }
            more_related(category, id, $('div.car_content').length);
        });
    }).catch(function() {
      console.log('error total_items');
    }); 
}

function more_related(category, id, loadeds = 0){
    let items = 2;
    let loaded = loadeds;

    console.log(category);
    console.log(id);
    ajaxPromise("module/shop/ctrl/ctrl_shop.php?op=more_related&category= " + category + '&id=' + id + '&items=' + items + '&loaded=' + loaded, 
    'POST', 'JSON')
    .then(function(data) {
        console.log(data);
        for (row in data) {
            $('<div></div>').attr('class',"car_content").appendTo(".results").html(
                '<div class="sui-CardArticle details" id="'+ data[row].id +'">'+
                '<div class="sui-CardArticle-media"><div class="sui-ImageLazyLoad sui-ImageLazyLoad--ratio-16-9">'+
                '<div class="sui-ImageLazyLoad-imageWrap">'+
                '<img alt="" class="sui-ImageLazyLoad-image" src="' + data[row].img_car + '">'+
                '</div></div></div>'+
                '<div class="sui-CardArticle-info"><div class="sui-CardArticle-infoInner">'+
                '<span class="sui-AtomTag-label" title="ACTUALIDAD">'+ data[row].category_name +'</span></a></div></div>'+
                '<div class="sui-CardArticle-content"><header class="sui-CardArticle-title">' + data[row].brand_name+" "+data[row].model_name  + '</header>'+
                '</div></div>'
            )
        }
    }).catch(function() {
        console.log('error_more_related');
        //window.location.href = 'index.php?page=error503';
    }); 
}

function load_like(){
    
    if(localStorage.getItem('token') != null){
        var token = localStorage.getItem('token');
        ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=load_likes',
        'POST', 'JSON', {token: token})
        .then(function(data) { 
            console.log(data);
            for (row in data) {
                if($("#like_"+data[row].id_vehiculo).hasClass("fa-heart_like")){
                    $("#like_"+data[row].id_vehiculo).removeClass("fa-heart_like").addClass("fxa-heart_like");
                }
            }
        }).catch(function() {
            console.log("error");
            //window.location.href = 'index.php?page=error503'
        }); 
    }
}

function click_like(){
    $(document).on('click','.list__heart',function () {
        if(localStorage.getItem('token') != null){
            var id = this.getAttribute('id');
            var token = localStorage.getItem('token');
            ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=control_likes', 
            'POST', 'JSON', {token: token, id: id})
            .then(function(data) { 
                console.log(data);
            }).catch(function() {
                console.log("error_click_like");
            });  

            if($(this).children("i").hasClass("fa-heart_like")){
                $(this).children("i").removeClass("fa-heart_like").addClass("fxa-heart_like");
            }else{
                $(this).children("i").removeClass("fxa-heart_like").addClass("fa-heart_like");
            }
        }else{
            console.log("registrate");
            var time = 0;
            if (time == 0){
                toastr["warning"]("Necesitas registrate.");
                time++;
            }
            setInterval(function(){
                window.location.href = "index.php?module=ctrl_login&op=login_view";
            }, 5000);
        }
    });
}