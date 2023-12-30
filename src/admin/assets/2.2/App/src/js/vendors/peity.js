$(document).ready(function () {
    // Bar
    if($('.peity-bar')[0]) {
        $('.peity-bar').each(function() {
            var peityWidth = ($(this).attr('data-width')) ? $(this).attr('data-width') : 65;

            $(this).peity('bar', {
                height: 36,
                fill: ['rgba(255,255,255,0.85)'],
                width: peityWidth,
                padding: 0.2
            });
        });
    }

    // Line
    if($('.peity-line')[0]) {
        $('.peity-line').each(function() {
            var peityWidth = ($(this).attr('data-width')) ? $(this).attr('data-width') : 65;

            $(this).peity('line', {
                height: 50,
                fill: 'rgba(255,255,255,0.8)',
                stroke: 'rgba(255,255,255,0)',
                width: peityWidth,
                padding: 0.2
            });
        });
    }

    // Pie
    if($('.peity-pie')[0]) {
        $('.peity-pie').each(function() {
            $(this).peity('pie', {
                fill: ['#fff', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)'],
                height: 50,
                width: 50
            });
        });
    }

    // Donut
    if($('.peity-donut')[0]) {
        $('.peity-donut').each(function() {
            $(this).peity('donut', {
                fill: ['#fff', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.2)'],
                height: 50,
                width: 50
            });
        });
    }
});