$(document).ready(function () {

    if($('.easy-pie-chart')[0]) {
        $('.easy-pie-chart').each(function () {
            var value = $(this).data('value');
            var size = $(this).data('size');
            var trackColor = $(this).data('track-color');
            var barColor = $(this).data('bar-color');

            $(this).find('.easy-pie-chart__value').css({
                lineHeight: (size - 2)+'px',
                fontSize: (size/5)+'px',
                color: barColor
            });

            $(this).easyPieChart ({
                easing: 'easeOutBounce',
                barColor: barColor,
                trackColor: trackColor,
                scaleColor: 'rgba(255,255,255,0.15)',
                lineCap: 'round',
                lineWidth: 1,
                size: size,
                animate: 3000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            })
        });
    }

});