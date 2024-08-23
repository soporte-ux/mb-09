$(document).ready(function() {

    // Stage height
    if ($(window).width() > 640) $('#slider, .slide').height($(window).height());

    $(window).bind('resize', function() { $('#slider, .slide').animate({ height: $(window).height() }, 100); });

    // Backgrounds
    $('.promo, .img-bg, .slide').each(function() {
        if ($(this).find('img.hidden').length > 0) {
            var src = $(this).find('img.hidden').attr('src');
            $(this).css({ 'background-image': 'url(' + src + ')', opacity: '0' }).animate({ opacity: 1 }, 900);
        }
        if ($(this).attr('data-bgc')) $(this).css('background-color', '#' + $(this).attr('data-bgc'));
    });

    // Toggle buttons
    $('.btn-toggle').click(function() {
        $($(this).data('target')).slideToggle();
        $(this).toggleClass('open');
        if ($(this).data('body')) $('body').toggleClass($(this).data('body'));
    });
    $('.appclose').click(function() {
        var p = $(this).parent();
        p.slideUp(300, function() { p.remove(); });
    });
    $('.btn-login').click(function() {
        if ($('body').hasClass('open-over') === false) {
            $('body').toggleClass('open-over');
            /*$('.printSinIcon').css('display', 'block');*/
        }
    });
    $('#bajionet .icon-close').click(function() {
        $('.printSinIcon').removeAttr('style');
        $('body').removeClass('open-over');
    });
    // Fold button
    $('.fold-menu').click(function() {
        $('body').toggleClass('nopad folded');
        setTimeout(function() {
            $('#slider')[0].slick.refresh();
            $('.videoBG_wrapper, .videoBG').animate({ width: '100%' }, 300);
        }, 300);
    });

    // Search
    $('#search input').focus(function() {
        $('#search, #srch').addClass('open');
        $('#srch').removeClass('hidden');
        // $('#srch #promos').addClass('animated slideInRight');
        $('#srch input').focus().keydown(function() { $('#search input').val($(this).val()); });
    });

    $("#search input, #srch input").on("keypress", function(e) {
        tecla = (document.all) ? e.keyCode : e.which;
        if (tecla == 13) {
            searchResult();
        }
    });	
	
    $('.icon-search').click(function() {
        $('#search, #srch').addClass('open');
        $('#srch').removeClass('hidden');
        // $('#srch #promos').addClass('animated slideInRight');
        $('#srch input').focus().keydown(function() { $('#search input').val($(this).val()); });
    });

    $('#srch > .icon-close').on('click', function() {
        $('#search, #srch').removeClass('open');
        $('#srch #promos').removeClass('animated slideInRight');
        $('body').removeClass('open-overlay open-search');
        $('#srch').addClass('hidden');
    });
    $("#srch.overlay a.icon-search").on("click", function() {
        searchResult();
    });

    // Submenu
    $('nav').not('.sec').find('> ul > li').mouseover(function() { $('body').addClass('open-submenu'); });
    $('nav').not('.sec').mouseout(function() { $('body').removeClass('open-submenu'); });
    $('nav .social').click(function() { $(this).toggleClass('hover'); });
    if ($(window).width() < 769) {
        $('body').on('click', 'nav.main li:not(.hover)', function() {
            $('nav.main li').removeClass('hover').find('.submenu').slideUp();
            $(this).addClass('hover').find('.submenu').slideDown();
        });
        $('body').on('click', 'nav.main li.hover > a', function() { $(this).parent().find('.submenu').slideUp(300, function() { $('.open-menu nav li').removeClass('hover'); }); });
    }

    // Bajionet
    $('#bajionet .icon-down').click(function() {
        $('#login01').slideToggle();
        $('#bajionet').toggleClass('collapsed');
    });

    $('body').on('click', '.overlay .icon-close', function() {
        $('.overlay').removeClass('open');
        $('body').removeClass('open-overlay');
    });

    $(window).resize(function() {
        $('#slider').slick('refresh');
    });

    // Header mobile
    /*$('.btn-menu').click(function() { $('body').toggleClass('open-menu'); });*/
	$('.btn-menu').click(function() {
		$("body").removeClass('open-overlay').removeClass("open-over").removeClass("nopad").removeClass("folded").find(".submenu").css({ "display": "none" }).parents(".hover").removeClass("hover");
        $('#otras-cuentas .printSinIcon').removeAttr('style').siblings('.btn-toggle').removeClass('open');
        $(".submenu").removeAttr("style");
        $("body").find("#bajionet").css({ "display": "none" }).removeAttr("style");        
		$("body").find("#srch").removeClass("open");
        $('body').toggleClass('open-menu');
    });
	
	// Submenu
    $('nav').not('.sec').find('> ul > li').mouseover(function() { $('body').addClass('open-submenu'); });
    $('nav').not('.sec').mouseout(function() { $('body').removeClass('open-submenu'); });
    $('nav').on('click', '.social', function() { $(this).toggleClass('hover'); });
    $('body').on('click', 'nav.main li .a-black', function() { 
        if ($("aside").width() > 210 && $("aside").height() < 66) {
            if ($(this).parent('li').hasClass('hover')) {
                $(this).parent().find('.submenu').slideUp(300, function() {
                    $('.open-menu nav li').removeClass('hover');
                });
            } else {
                $('nav.main li').removeClass('hover').find('.submenu').slideUp();
                $(this).parent('li').addClass('hover').find('.submenu').slideDown();
            }
        }
    });
    $('body').on('click', 'nav.main li.hover > a', function() { 
        if ($("aside").width() > 210 && $("aside").height() < 66) {
            $(this).parent().find('.submenu').slideUp(300, function() { $('.open-menu nav li').removeClass('hover'); });
        }
    });
    //$("#menuFlotante").removeAttr("style");
    //$("#print_Float").css("top", "0" "important");
    //}
    /* // Reordena el menu 
    $('.submenu').each(function(){
    	var n=9, m=0,a=0, b=0, j=0, i=0, f="", id="";
    	$(this).attr("id", "sbmn-" + ($("nav").find("[id*='sbmn-']").length + 1));
    	id = "#" + $(this).attr("id") +" ";
    	a = $(this).find('li.lin2').length;
    	b = (a % n) == 0 ? (a / n) : Math.floor(a / n) + 1;
    	if(b > 1){
    		$(id + "ul.lin2:nth-child(1)").addClass("smn-0");
    		for(i; i < b; i++){
    			$(this).append("<ul class='smn-" + (i+1) + "'></ul>");
    			if(i > 1) {
    				$(id + ".smn-" + (i+1)).addClass("hidden");
    			}
    			m += n;
    			for(j; j < m; j++){
    				$( id + ".smn-0 li.lin2:nth-child(1)").appendTo(id + ".smn-" + (i + 1));	
    			}
    		}
    		$(id + ".smn-0").remove();
    		$(this).addClass("doble");
    	}else{
    		$(this).children().addClass("smn-1");
    	}
    });*/
    // Nav
    $('.btn-menu-rs a').click(function() { $('.menu-rs').toggleClass('open'); });
    //Closed App-descarga
    $("body").on("click", ".appclose", function() {
        var p = $('.appclose').parent();
        p.slideUp(300, function() {
            p.remove();
            $(".show-xs").removeClass("p10");
        });
    });

    $('body').on("click", ".dk-option", function() {
        var url = $(this).data('value');
        validaUrl(url);
    });
	
	// Header mobile
    $('.btn-login').click(function() {
        btnBajionet();
    });
	//Buscar Bajionet
    if (!$("body").find("#bajionet").length) {
        $(".btn-login").addClass("hidden");
        $(".show-sm .icon-search").addClass("msrch");
    }
	search();
});

$(document).click(function(event) {
    if (!$(event.target).closest('aside').length && !$(event.target).is('aside')) {
        if ($('body').hasClass('open-menu')) $('body').removeClass('open-menu');
    }
});

function btnBajionet() {
    $("body").removeClass("open-menu").find("#srch").removeClass("open"); //movil uno a uno
    $('#clsBanjionet').remove();
    $('#bajionet .a-right').prepend('<a id="clsBanjionet" class="icon icon-close close-login"></a>');
    $('body').addClass('open-overlay open-over');
    $(".btn-toggle").addClass('open');
    $("#otras-cuentas ul").css({ 'display': 'block' });
	$("#otras-cuentas-icon").css({ 'display': 'none' });
    $('#bajionet .icon-close').on('click', function() {
        $('body').removeClass('open-overlay open-over');
        $(".btn-toggle").removeClass('open');
        $("#otras-cuentas ul").removeAttr("style");
        $("#bajionet").css({ "display": "none" }).removeAttr("style").removeClass("on").removeClass("off");
        $('#bajionet .close-login').remove();
        $("html").removeClass("overflow");
		$("#otras-cuentas-icon").css({ 'display': 'block' });
    });
}

function searchResult() {
    $("#results").empty();
    $('#results').append('<div style="display:none;"></div>');
	/*('#results').append('<div style="display:none;"></div><span class="loader big"></span>');*/
    setTimeout(getInfoPages(busqueda), 2000);
}

function getInfoPages(callback) {
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'js/infopages.txt', true);
    var text;
    xhr.onload = function() {
		text = xhr.responseText;
		callback(xhr.responseText);
    };
    xhr.send(null);
}

function resultHtml(n, parent, link, titulo) {
    var html = '<li data-num="' + (n < 10 ? "0" + n : n) + '"><h6><strong>(' + parent + ')</strong></h6>';
    html += '<h3><a class="b-result" href="https://www.bb.com.mx/webcenter' + link.replace("/pages_", "/") + '"><strong>' + titulo + '</strong></a></h3>';
    html += '<p class="show-xs"></p></li>';
    return html;
}

function search() {
    $("#srch.overlay a.icon-search").on("click", function() {
        searchResult();
    });

    $("#search input, #search a, aside .icon-search ").on("click", function() {
        $("body").removeClass("open-menu").removeClass("open-over").removeClass("open-overlay").find("#bajionet").css({ "display": "none" }).removeAttr("style").find(".btn-toggle").removeClass("open");
        $("#bajionet").find(".printSinIcon").removeAttr("style");
        $('body').addClass('open-search');
        /*$('#search input').attr('disabled','disabled')*/ ;
        $('html, body').addClass("overflow");
        setTimeout(function() {
            $('#search, #srch').addClass('open');
            $('#srch input').focus().keyup(function() { $('#search input').val($(this).val()); });
        }, 100);
    });
    $('#srch form').submit(function() {
        $('#results').append('<div style="display:none;">' + data + '</div><span class="loader big"></span>');
        setTimeout(function() {
            $('#results > div').slideDown();
            $('.loader').remove();
        }, 3000);
        return false;
    });
    $('#srch > .icon-close').on('click', function() {
        $('#search, #srch').removeClass('open');
        $('#srch #promos').removeClass('animated slideInRight');
        $('body').removeClass('open-overlay').removeClass('open-search');
        $('#search input').removeAttr('disabled', 'disabled');
        $('#results').empty();
        $('#search input').val("");
        $('#srch  input').val("");
        $("html, body").removeClass("overflow");
        $('#srch #results').empty();
    });
}

function busqueda(text) {
    var items = (typeof text == 'string' && text != "") ? JSON.parse(text.replace(/},]/g, "}]")) : { "p": "" };
    var colFind = ["findProduct", "findBlog"];
    var cadena = getCleanedString(($("#search input").val()).toLowerCase());
    var index = 0;
    var result = "";
    for (var x1 in items.p) {
        var parent = items.p[x1].n;
		var item1 = items.p[x1],
			temp1 = getCleanedString((item1.n).toLowerCase());
		if (temp1.indexOf(cadena) >= 0 && item1.f != 'f') { result += resultHtml(index++, parent, item1.r, item1.n); }		
        for (var x2 in items.p[x1].h) {
            var item2 = items.p[x1].h[x2],
                temp2 = getCleanedString((item2.n).toLowerCase());
            if (temp2.indexOf(cadena) >= 0 && item2.f != 'f') { result += resultHtml(index++, parent, item2.r, item2.n); }
            for (var x3 in items.p[x1].h[x2].h) {
                var item3 = items.p[x1].h[x2].h[x3],
                    temp3 = getCleanedString((item3.n).toLowerCase());
                if (temp3.indexOf(cadena) >= 0 && item3.f != 'f') { result += resultHtml(index++, parent, item3.r, item3.n); }
                for (var x4 in items.p[x1].h[x2].h[x3].h) {
                    var item4 = items.p[x1].h[x2].h[x3].h[x4],
                        temp4 = getCleanedString((item4.n).toLowerCase());
                    if (temp4.indexOf(cadena) >= 0 && item4.f != 'f') { result += resultHtml(index++, parent, item4.r, item4.n); }
                    for (var x5 in items.p[x1].h[x2].h[x3].h[x4].h) {
                        var item5 = items.p[x1].h[x2].h[x3].h[x4].h[x5],
                            temp5 = getCleanedString((item5.n).toLowerCase());
                        if (temp5.indexOf(cadena) >= 0 && item5.f != 'f') { result += resultHtml(index++, parent, item5.r, item5.n); }
                        for (var x6 in items.p[x1].h[x2].h[x3].h[x4].h[x5].h) {
                            var item6 = items.p[x1].h[x2].h[x3].h[x4].h[x5].h[x6],
                                temp6 = getCleanedString((item6.n).toLowerCase());
                            if (temp6.indexOf(cadena) >= 0 && item6.f != 'f') { result += resultHtml(index++, parent, item6.r, item6.n); }
                            for (var x7 in items.p[x1].h[x2].h[x3].h[x4].h[x5].h[x6].h) {
                                var item7 = items.p[x1].h[x2].h[x3].h[x4].h[x5].h[x6].h[x7],
                                    temp7 = getCleanedString((item7.n).toLowerCase());
                                if (temp7.indexOf(cadena) >= 0 && item7.f != 'f') { result += resultHtml(index++, parent, item7.r, item7.n); }
                                for (var x8 in items.p[x1].h[x2].h[x3].h[x4].h[x5].h[x6].h[x7].h) {
                                    var item8 = items.p[x1].h[x2].h[x3].h[x4].h[x5].h[x6].h[x7].h[x8],
                                        temp8 = getCleanedString((item8.n).toLowerCase());
                                    if (temp8.indexOf(cadena) >= 0 && item8.f != 'f') { result += resultHtml(index++, parent, item8.r, item8.n); }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $('.loader').remove();
    if (result.trim() === "" || cadena.trim() === "") {
        var empty = "empty" + $("#search input").val().trim();
        var msg_error = "";
        if (empty != "empty" ) {
           	msg_error = "No se encontaron resultados.";
        } else if(empty != ""){
        	msg_error = "Ingrese palabra para buscar.";
        }
         $("#results").empty().append('<div class="container"><br/><br/><br/><h2 style="color:#E88B00;"><em>' + msg_error + '</em></h2></div>');
    } else {
        $("#results").empty().append('<div class="row"><div class="col6 sm-col12 sm-mb20" id="' + colFind[0] + '"><h2><em>Productos</em></h2><ul>' + result + '</ul></div><div class="col6 sm-col6" id="' + colFind[1] + '"><h2><em>Blog</em></h2></div></div>');
    }
}

function getCleanedString(cadena) {
    var salida = "";
    for (var i = 0; i < cadena.length; i++) {
        var aux = cadena.charAt(i).charCodeAt(0);
        var letra = cadena.charAt(i);
        switch (aux.toString()) {
            case "193":
                salida += "&Aacute;";
                break;
            case "225":
                salida += "&aacute;";
                break;
            case "201":
                salida += "&Eacute;";
                break;
            case "233":
                salida += "&eacute;";
                break;
            case "205":
                salida += "&Iacute;";
                break;
            case "237":
                salida += "&iacute;";
                break;
            case "211":
                salida += "&Oacute;";
                break;
            case "243":
                salida += "&oacute;";
                break;
            case "218":
                salida += "&Uacute;";
                break;
            case "250":
                salida += "&uacute;";
                break;
            case "209":
                salida += "&Ntilde;";
                break;
            case "241":
                salida += "&ntilde;";
                break;
            default:
                salida += letra;
                break;
        }
    }
    return salida;
}

function validaUrl(url) {
    if (url != "") {
        var go = url;
        if (url.indexOf("/BanBajio/") >= 0 || url.indexOf("/cs/") >= 0 || url.indexOf("#") >= 0) {
            if (url.indexOf(".pdf") >= 0 || url.indexOf(".xls") >= 0 || url.indexOf(".doc") >= 0 || url.indexOf(".ppt") >= 0 || url.indexOf(".jpg") >= 0 || url.indexOf(".jpeg") >= 0 || url.indexOf(".jpe") >= 0 || url.indexOf(".png") >= 0) {
                window.open(go);
            } else {

                parent.document.location.href = go;
            }
        } else {
            window.open(go);
        }
    }
}