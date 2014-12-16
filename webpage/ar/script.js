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
		$('html, body').stop().animate({scrollTop: $(this).data('center') + 'px'}, 1200);
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

	/*Characters */
	$('#jackpic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Jack</h1>The Protagonist of our story is Jack Wynand. Little is known of his past but through progression of the story more we learn more than he ever did. Jack is a young man in his twenties whom was simply on a plane trip for work when the plane crashes in the atlantic ocean and he gets dragged into the mess of Rapture. He survives the crash and finds a lighthouse with an elevator inside. The elevator brings him to Rapture and unravels a story with many revelations. The player chooses a path for Jack which definitively leads him to a positive or negative destination. Along the way they will need to fight of the many horrors of Rapture and interact with its remaining semi-sane population. <br><br> But who is Jack? <br><br> That is for the players to find out along their epic journey through Rapture.').show().siblings('div').hide();
    }});

	$('#fontainepic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Frank Fontaine</h1>Fontaine is the businessman whom backed Lambs projects and research into the magical Adam. He made his way up through rootlesness and some dabbling in illegal activities such as smuggling and dealing adam. Andrew Ryan referred to Fontaine as “the most dangerous type of hoodlum... the kind with vision”. A criminal mastermind and nemesis to the people of Rapture. Frank Fontaine is the smuggler, mobster  and businessman who rose to power in Rapture society and challenged Andrew Ryan in claim over the city.<br><br> A malevolent genius in all aspects, Fontaine’s story is an interesting one: he learnt of Rapture while living on the surface and saw this utopian society as the perfect opportunity for a long but big-payoff con.<br><br>There is more to this antagonist than meets the eye…. ').show().siblings('div').hide();
    }});
	
	$('#ryanpic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Andrew Ryan</h1> Andrew Ryan is the founder of Rapture and the owner of Ryan Industries. The figure-head of Rapture, and one of the main antagonists in Bioshock. Andrew Ryan shaped the underwater city through unflinching will and charisma into his ideal society. A society where no kings or gods exist – only man. Ryan believed that morals are a hindrance. Rules, governments, traditions. They are all obstacles in the way towards advancement.<br><br>Ryan achieved the impossible and built Rapture far from the ravenings and politics of those bound by their false ideals. It was not impossible to build Rapture under the sea, but to build it anywhere else. A perfect society. <br><br>Or so it would seem…').show().siblings('div').hide();
    }});
	
	$('#tenenbaumpic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Brigid Tenenbaum</h1>Dr. Brigid Tenenbaum is the geneticist responsible for the discovery of ADAM. An incident in Rapture led her to the discovery of a substance that has the capability of healing and resurrecting dead cells. This “ADAM” allowed people to splice their DNA, opening up the possibility of giving them superpowers through the use of Plasmids and expanded abilities using Gene Tonics. <br><br>But this new discovery came at a great cost: A way was needed to mass produce ADAM. This led to the horrific experiments which led to the creation of the Little Sisters. Young girls transformed into walking ADAM factories. In time, guilt weighed heavily on her conscience for creating the Little Sisters. Thus, she looked after them as she would her own daughters, and became obsessed with their safety. <br><br>It was inadvertently the discovery of ADAM that fundamentally changed Rapture and hastened its demise.  How and why, that is left to the players to find out.').show().siblings('div').hide();
    }});
	
	$('#sisterpic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>The Little Sisters</h1>The story of the Little Sisters is a sad one and follows a series of many unfortunate events. They are the creations of Dr. Brigid Tenenbaum; young females implanted by the ADAM producing sea slug to symbiotically produce this substance. They produce ADAM in large quantities which makes them highly resilient to harm and granting them superhuman regeneration. They still keep some of the primary characteristics of children, such as laughing, crying, singing and playing. <br><br>They were orphans, originally. Used and exploited for tests on ADAM, and found to be the only suitable hosts. When the need for ADAM became greater, scientists devised new ways to increase the production of ADAM. The Little Sisters became the subjects of many mental and physical conditioning to harvest ADAM from dead denizens. This made them targets for Splicers, and thus led to research into the Alpha Series: a pair bonding of the little sisters to a heavily modified and spliced human, protector of Little Sisters. They are simply referred to as “Big Daddy”, and they are the only bond Little Sisters can comprehend.').show().siblings('div').hide();
    }});
	
	$('#daddypic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Big Daddy</h1>Big Daddies, are the biological protectors of the Little Sisters.  These towering adversaries are genetically enhanced superhumans, who have underwent numerous experiments and mental conditioning for the soul purpose of protecting the Little Sisters with their lives. The main terror of Rapture, and an overpowering foe.<br><br>When Little Sisters were made to gather ADAM from dead splicers, it became evident that they needed protection. The result was the Alpha Series; modified splicers genetically engineered and bond to a single Little Sister.<br><br>The Big Daddies followed failed research into the Alpha Series. The Big Daddies are not bond to a single Little Sister, and will defend any Little Sister under threat with their lives.  Big Daddies communicate by uttering haunting sounds similar to that of whale calls. Production model Big Daddies have a bio-luminescent chemical substance which fills the helmet, displaying its state of emotion or mind, which serve as a way to warn assailants.').show().siblings('div').hide();
    }});
	
	$('#atlaspic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Atlas</h1>Not much is known about him… he is known only as the “revolutionary” who led many Rapture citizens in the opposition against Andrew Ryan during the Civil War, which officially started after the New Year’s Eve Riots on 1958.<br><br>Society was collapsing… the one perfect utopia has been reduced to a socially divided and increasingly ADAM craving populace. Atlas roused the disillusioned of Rapture into a revolt, leading raiding parties that attacked the wealthy of Rapture, as well as Big Daddies and Little Sisters for ADAM. Atlas claims that he is no liberator, and that the people of Rapture will liberate themselves.<br><br>He is the first to contact Jack, and guides him throughout Rapture using shockwave radio messages. Strangely found of repeating the “would you, kindly” statement when talking to Jack...').show().siblings('div').hide();
    }});
	
	$('#splicerpic').on('click',function(){
    if($('#textbox').css('display')!='none'){
    $('#textbox').html('<h1>Splicers</h1>The Civil War drove many to abusive consumption of ADAM, which deformed their bodies and minds beyond repair. Crazed remnants of the human population who murdered most of the sane population of the city. They wonder he corridors and tunnels of Rapture, always searching for ADAM… <br><br>They have become dependent on the substance, both mentally and physically. Many of them still wear Masquerade Ball masks, perhaps to hide their deformed identities out of shame.<br><br>Although the term Splicer can be applied to anyone who has altered their genetic structure with ADAM, it has since become the term used only to describe those who have become addicted to the substance, and have lost their sanity and became physically deformed from the addiction.<br><br>They will attack the player without hesitation, and always hunt Little Sisters for their ADAM.').show().siblings('div').hide();
    }});
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