function launch_search() {
    drop_category();
    drop_brands();
    $('#drop_category').on('change', function(){
        let category = $(this).val();
        if (category === 0) {
            load_categoria();
        }else {
            drop_brands(category);
        }
    });
}

function drop_category() {

    ajaxPromise('module/search/ctrl/ctrl_search.php?op=firstdrop',
    'GET', 'JSON')
    .then(function( data) {

        for (row in data) {
            $('#drop_category').append('<option value = "' + data[row].category_name + '">' + data[row].category_name + '</option>');
        }

    }).catch(function() {
        window.location.href = 'index.php?module=exceptions&op=503&error=drop_category';
    });  
}

function drop_brands(categoria) {
    ajaxPromise('module/search/ctrl/ctrl_search.php?op=seconddrop&category=' + categoria,
    'GET', 'JSON')
    .then(function(data) {
        $("#drop_brands").empty();
        $('#drop_brands').append('<option value="0">Select a brand</option>');
        for (row in data) {
            $('#drop_brands').append('<option value = "' + data[row].id_brand + '">' + data[row].brand_name + '</option>');
        }
    }).catch(function(){
        window.location.href = 'index.php?module=exceptions&op=503&error=drop_brands';
    }); 
}

function autocomplete(){
    $("#autocom").on("keyup", function () {
        var complet = $(this).val();
        if (($('#drop_category').val() != 0)){
            var drop_category = $('#drop_category').val();
            if(($('#drop_category').val() != 0) && ($('#drop_brands').val() != 0)){
                var drop_brands = $('#drop_brands').val();
            }
        }
        ajaxPromise('module/search/ctrl/ctrl_search.php?op=autocomplit&drop_category='+ drop_category + '&drop_brands=' + drop_brands +'&complet=' + complet,
        'GET', 'JSON')
        .then(function(data) {

            $('#search_auto').empty();
            for (row in data) {
                $('<div></div>').appendTo('#search_auto').html(data[row].town).attr({'class': 'searchElement', 'id': data[row].town});
            }
    
            $(document).on('click', '.searchElement', function() {
                $('#autocom').val(this.getAttribute('id'));
                $('#search_auto').fadeOut(200);
            });

            $(document).on('click scroll', function(event) {
                if (event.target.id !== 'autocom') {
                    $('#search_auto').fadeIn(10000000);
                    $('#search_auto').empty();
                }
            });
        }).catch(function(){
            window.location.href = 'index.php?module=exceptions&op=503&error=autocomplit';
        }); 
    });
}

function btn_search() {
    $('#search-btn').on('click', function() {
        var autocom = "";
        var category = "";
        var brand = "";

        if(($('#drop_category').val() == 0) && ($('#drop_brands').val() == 0)){
            if($('#autocom').val() != ""){
                autocom = $('#autocom').val();
            }
        }else if(($('#drop_category').val() != 0) && ($('#drop_brands').val() == 0)){
            if($('#autocom').val() != ""){
                autocom = $('#autocom').val();
            }
            category = $('#drop_category').val();
        }else if(($('#drop_category').val() == 0) && ($('#drop_brands').val() != 0)){
            if($('#autocom').val() != ""){
                autocom = $('#autocom').val();
            }
            brand = $('#drop_brands').val();
        }else{
            if($('#autocom').val() != ""){
                autocom = $('#autocom').val();
            }
            category = $('#drop_category').val();
            brand = $('#drop_brands').val();
        }
        var filtersSolucion = 1;
        localStorage.setItem('autocom_search', JSON.stringify(autocom));
        localStorage.setItem('category_search', JSON.stringify(category));
        localStorage.setItem('brand_search', JSON.stringify(brand));
        localStorage.setItem('filtersSolucion_search', JSON.stringify(filtersSolucion));

        window.location.href ="index.php?module=ctrl_shop&op=list";
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    btn_search();
});