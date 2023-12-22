$(document).ready(function () {
    if($('.rating')[0]) {
        $('.rating').each(function () {
            var rating = $(this).data('rating');

            $(this).rateYo({
                rating: rating,
                normalFill: 'rgba(255,255,255,0.3)',
                ratedFill: '#ffc107'
            });
        });
    }
});