(function($) {
    $(function() {
        var jcarousel = $('.jcarousel');

        jcarousel
            .on('jcarousel:reload jcarousel:create', function () {
                var width = jcarousel.innerWidth();

                if (width >= 600) {
                    width = width / 4;
                } else if (width >= 350) {
                    width = width / 2;
                }

                $('.jcarousel .fancy').css('width', width + 'px');
            })
            .jcarousel({
                wrap: 'circular'
            });

        $('.jcarousel-control-prev')
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .jcarouselControl({
                target: '+=1'
            });
    });


	$(function() {
		var jcarousel = $('.jcarousel2');

		jcarousel
			.on('jcarousel:reload jcarousel:create', function () {
				var width = jcarousel.innerWidth();

				if (width >= 600) {
					width = width / 3;
				} else if (width >= 350) {
					width = width / 2;
				}

				$('.fancy1').css('width', width + 'px');
			})
			.jcarousel({
				wrap: 'circular'
			});

		$('.jcarousel-control-prev')
			.jcarouselControl({
				target: '-=1'
			});

		$('.jcarousel-control-next')
			.jcarouselControl({
				target: '+=1'
			});
	});
})(jQuery);
