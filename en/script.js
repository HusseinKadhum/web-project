$('document').ready(function(){
	
	/* Delayed Image Loading */
	
	$('.dl').each(function(){
		$(this).attr('src', $(this).data('delayedsrc'));
	});
	
	/* Overlay */
	
	$('#zoomer .image').bind('click', function(){
		$('#overlay #content').html('');
		$('#overlay').data('current', $(this).index());
		if($(this).data('type') == 'image'){
			$('#overlay #content').html('<img src="images/' + $(this).data('content') + '">');
		} else if ($(this).data('type') == 'youtube'){
			$('#overlay #content').html('<iframe width="640" height="448" src="//www.youtube-nocookie.com/embed/CoYorK3E4aM' + $(this).data('content') + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
		}
		$('#overlay').fadeIn(300);
	});
	
	$('#overlay').bind('click', function(){
		$('#overlay #content').html('');
		$('#overlay').fadeOut(300);
	});
	
	$(document).bind('keydown', function(e) {
		var code = e.keyCode || e.which;
		if(code == 27) { //Escape
			$('#overlay #content').html('');
			$('#overlay').fadeOut(300);
		} else if (code == 37) { //Left
			$('#overlay').data('current', $('#overlay').data('current') - 1);
			if ($('#overlay').data('current') < 0){
				$('#overlay').data('current', $('#zoomer .image').size() - 1);
			}
			UpdateOverlay();
		} else if (code == 39) { //Right
			$('#overlay').data('current', $('#overlay').data('current') + 1);
			if ($('#overlay').data('current') > $('#zoomer .image').size() - 1){
				$('#overlay').data('current', 0);
			}
			UpdateOverlay();
		}
	});
	
	UpdateOverlay = function(){
	
		var currentItem = $('#zoomer .image').eq($('#overlay').data('current'));
		
		if(currentItem.data('type') == 'image'){
			$('#overlay #content').html('<img src="images/' + currentItem.data('content') + '">');
		} else if (currentItem.data('type') == 'youtube'){
			$('#overlay #content').html('<iframe width="640" height="448" src="//www.youtube-nocookie.com/embed/CoYorK3E4aM' + currentItem.data('content') + '?rel=0" frameborder="0" allowfullscreen></iframe>');
		}
		
	}
	
	/* Navigation */
	
	UpdateOffsets = function(){
		var wHeight = $(window).height();
		$('nav ul li').each(function(){
			var section = $('article').eq($(this).index());
			offset = section.offset().top - ((wHeight - section.height()) / 2);
			if (offset < 0) offset = 0;
			$(this).data('center', offset);
		});
	}
	
	$(window).resize(function(){
		UpdateOffsets();
	});
	
	$(window).bind('scroll', function(){
		SetActiveNav();
	});
	
	$('nav ul li').bind('click', function(){
		$('html, body').stop().animate({scrollTop: $(this).data('center') + 'px'}, 300);
	});
	
	SetActiveNav = function(){
		$('nav ul li').each(function(){
			var section = $('article').eq($(this).index());			
			if($(window).scrollTop() >= $(this).data('center') - section.height() / 2 && $(window).scrollTop() <= $(this).data('center') + section.height() / 2 ){
				$('nav ul li').removeClass('active');
				$(this).addClass('active');
			}
		});
	}
	
	UpdateOffsets();
	SetActiveNav();
	
	
	
	/* Info Navigation */
	
	var infoActivePage = 0;
	var infoNumberOfPages = $('.panel_info ul li').size() - 1;
		
	UpdateInfoNav = function(){
		
		$('.panel_info ul li').css('display', 'none');
		$('.panel_info ul li').eq(infoActivePage).css('display', 'block');
	
		if (infoActivePage == infoNumberOfPages) {
			$('.panel_info .right').removeClass('active');
		} else {
			$('.panel_info .right').addClass('active');
		}
		if (infoActivePage == 0) {
			$('.panel_info .left').removeClass('active');
		} else {
			$('.panel_info .left').addClass('active');
		}
	}
	
	$('.panel_info .right').bind('click', function(){
		infoActivePage++;
		infoActivePage = Clamp(infoActivePage, 0, infoNumberOfPages);
		UpdateInfoNav();
	});
	
	$('.panel_info .left').bind('click', function(){
		infoActivePage--;
		infoActivePage = Clamp(infoActivePage, 0, infoNumberOfPages);
		UpdateInfoNav();
	});
	
	/* Media */
	
	var numberOfImages = $('#zoomer .container').children().size();
	var width = 641;
	var evenWidths;
	
	EvenlySpace = function(mouseOver){
		evenWidths = $('#zoomer').width() / numberOfImages;
		if(mouseOver)
			evenWidths = ($('#zoomer').width() - width) / (numberOfImages - 1);
		var pos = 0;
		$('#zoomer .image').each(function(){
			$(this).css('left', pos + 'px');
			pos += evenWidths;
			$(this).children().css('background-position', ((width / 2) * -1 + (evenWidths / 2)) + 'px 0');
		});
	}
	
	FreezePositions = function(){
		$('#zoomer .image').each(function(){
			$(this).css('left', $(this).css('left'));
		});
	}
	
	$(window).resize(function(){
		EvenlySpace(false);
	});
	
	$('#zoomer').bind('mouseleave', function(){
		//EvenlySpace(false);
		$('nav').css('opacity', '1');
		
		EvenlySpace(true);
		$('#zoomer .image').eq(8).children().css('background-position', '0 0');
		$($('#zoomer .image').eq(8).nextAll('.image')).each(function(){
			var leftElements = numberOfImages - $(this).nextAll('.image').size() - 2;
			var leftOffset = evenWidths * leftElements;
			leftOffset += width;
			$(this).css('left', leftOffset + 'px');
		});
		
	});
	
	$('#zoomer .image').bind('mouseover', function(){
		
		EvenlySpace(true);
		$('nav').css('opacity', '0.5');
		$(this).children().css('background-position', '0 0');
		$($(this).nextAll('.image')).each(function(){
			var leftElements = numberOfImages - $(this).nextAll('.image').size() - 2;
			var leftOffset = evenWidths * leftElements;
			leftOffset += width;
			$(this).css('left', leftOffset + 'px');
		});
	});
	
	//EvenlySpace(false);
	EvenlySpace(true);
	$('#zoomer .image').eq(8).children().css('background-position', '0 0');
	$($('#zoomer .image').eq(8).nextAll('.image')).each(function(){
		var leftElements = numberOfImages - $(this).nextAll('.image').size() - 2;
		var leftOffset = evenWidths * leftElements;
		leftOffset += width;
		$(this).css('left', leftOffset + 'px');
	});
	
	/* General */
	
	Clamp = function(value, min, max){
		if (value > max)
			value = max;
		else if (value < min)
			value = min;
		return value;
	}
	
	});