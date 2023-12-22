$(document).ready(function () {

    // Realtime visitors widget map
    if($('.map-visitors')[0]) {
        $('.map-visitors').vectorMap({
            map: 'world_en',
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,0.2)',
            hoverOpacity: 1,
            selectedColor: 'rgba(255,255,255,0.9)',
            enableZoom: false,
            showTooltip: true,
            normalizeFunction: 'polynomial',
            selectedRegions: ['US', 'EN', 'NZ', 'CN', 'JP', 'SL', 'BR', 'AU', 'EG', 'BA'],
            onRegionClick: function (event) {
                event.preventDefault();
            }
        });
    }

    // All maps
    if($('.jqvmap')[0]) {
        $('.jqvmap').each(function () {
            var map = $(this).data('map');

            $(this).vectorMap({
                map: map,
                backgroundColor: 'rgba(0,0,0,0)',
                color: 'rgba(255,255,255,0.5)',
                borderColor: 'rgba(255,255,255,0.5)',
                hoverColor: 'rgba(255,255,255,0.75)',
                selectedColor: '#fff',
                enableZoom: true
            });
        });
    }
});