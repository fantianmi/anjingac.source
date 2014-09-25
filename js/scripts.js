jQuery(document).ready(function ($) {

	jQuery.cookie = function(name, value, options) {
	    if (typeof value != 'undefined') {
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options = $.extend({}, options);
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString();
	        }
	        var path = options.path ? '; path=' + (options.path) : '';
	        var domain = options.domain ? '; domain=' + (options.domain) : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	        } else {
	            var cookieValue = null;
	            if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};

	/***************************************************
	 回到顶部功能
	 ***************************************************/
	if ($(window).scrollTop() != "0")
		$(".scroll-to-top").fadeIn(1200)
	var scrollDiv = $(".scroll-to-top");

	$(window).scroll(function () {
		if ($(window).scrollTop() == "0")
			$(scrollDiv).fadeOut(350)
		else
			$(scrollDiv).fadeIn(1200)
	});

	$(".scroll-to-top").click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600)
	})

	/***************************************************
	 下拉菜单效果
	 ***************************************************/

	$('.menu-item-has-children').hover(function () {
		$(this).children('.sub-menu').fadeIn();
	});

	$('.menu-item-has-children').mouseup(function () {
		$(this).children('.sub-menu').fadeOut();
	});


	/***************************************************
	 选项卡
	 ***************************************************/
	$('.mx-tabs').each(function () {
		var el = $(this);
		el.find('.tab-content').hide();
		el.find('.tab-content:first').show();
		el.find('.tab-nav li:first').addClass('active');
	});
	$('.mx-tabs .tab-nav a').click(function () {
		var el = $(this), parent = el.closest('.mx-tabs'), activetab = el.attr('href');
		parent.find('.tab-nav li').removeClass('active');
		el.closest('li').addClass('active');
		parent.find('.tab-content').hide();
		parent.find(activetab).show(); // Use show instead of nicer looking fade to avoid jumping
		return false;
	});

	/***************************************************
	 鼠标滑过图片的效果
	 ***************************************************/
	$('.lightbox').hover(
		function () {
			$(this).children('img').stop().animate({opacity: 0.2});
		},
		function () {
			$(this).children('img').stop().animate({opacity: 1});
		}
	);


	/***************************************************
	 图片相册过滤效果
	 ***************************************************/

	if (($.Isotope) && ($('#galleryContainer').length > 0)) {
		// gallery isotope

		jQuery(window).load(function () {

			var $container = jQuery('#galleryContainer'), // object that will keep track of options
				isotopeOptions = {}, // defaults, used if not explicitly set in hash
				defaultOptions = {
					filter       : '*',
					itemSelector : '.galleryItem',
					sortBy       : 'original-order',
					layoutMode   : 'sloppyMasonry',
					sortAscending: true,
					resizable    : false, // disable normal resizing
					// set columnWidth to a percentage of container width
					masonry      : { }
				};


			$(window).smartresize(function () {
				$container.isotope({
					// update columnWidth to a percentage of container width
					masonry: { }
				});
			});

			// set up Isotope
			$container.isotope(defaultOptions);

			var $optionSets = jQuery('#galleryFilters'), isOptionLinkClicked = false;

			// switches selected class on buttons
			function changeSelectedLink($elem) {
				// remove selected class on previous item
				$elem.parents('.option-set').find('.pure-button-primary').removeClass('pure-button-primary');
				// set selected class on new item
				$elem.addClass('pure-button-primary');
			}


			$optionSets.find('a').click(function () {
				var $this = jQuery(this);
				// don't proceed if already selected
				if ($this.hasClass('pure-button-primary')) {
					return;
				}
				changeSelectedLink($this);
				// get href attr, remove leading #
				var href = $this.attr('href').replace(/^#/, ''), // convert href into object
				// i.e. 'filter=.inner-transition' -> { filter: '.inner-transition' }
					option = jQuery.deparam(href, true);
				// apply new option to previous
				jQuery.extend(isotopeOptions, option);
				// set hash, triggers hashchange on window
				jQuery.bbq.pushState(isotopeOptions);
				isOptionLinkClicked = true;
				return false;
			});


			var hashChanged = false;

			jQuery(window).bind('hashchange', function (event) {
				// get options object from hash
				var hashOptions = window.location.hash ? jQuery.deparam.fragment(window.location.hash, true) : {}, // do not animate first call
					aniEngine = hashChanged ? 'best-available' : 'none', // apply defaults where no option was specified
					options = jQuery.extend({}, defaultOptions, hashOptions, { animationEngine: aniEngine });
				// apply options from hash
				$container.isotope(options);
				// save options
				isotopeOptions = hashOptions;

				// if option link was not clicked
				// then we'll need to update selected links
				if (!isOptionLinkClicked) {
					// iterate over options
					var hrefObj, hrefValue, $selectedLink;
					for (var key in options) {
						hrefObj = {};
						hrefObj[ key ] = options[ key ];
						// convert object into parameter string
						// i.e. { filter: '.inner-transition' } -> 'filter=.inner-transition'
						hrefValue = jQuery.param(hrefObj);
						// get matching link
						$selectedLink = $optionSets.find('a[href="#' + hrefValue + '"]');
						changeSelectedLink($selectedLink);
					}
				}

				isOptionLinkClicked = false;
				hashChanged = true;
			})// trigger hashchange to capture any hash data on init
				.trigger('hashchange');

		});
	} //图片相册过滤效果

});

