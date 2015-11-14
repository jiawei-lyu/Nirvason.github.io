/**
 * Created by Jiawei.Lv on 6/5/2015.
 */
// Setting background color for the divs
$(function() {
    var colors = ['#87A3A9', '#785C56', '#87A3A9', "#785C56", "#87A3A9"];
    $('.page').each(function(i) {
        $(this).css('background-color', colors[i]);
    })
});

// Show/hide menu & button on scroll
$(window).scroll(function() {
    if ($(this).scrollTop() >= 20) {
        $('button').fadeIn(200);
    } else {
        $('button').fadeOut(200);
    }
});


// Show hide top menu
$(document).ready(function(){
    $(this).scrollTop(0);
    $('button').click(function() {
        $('#navigation').slideToggle('slow');
    });

    $('li').click(function () {
        $('#navigation').slideUp('slow');
    });
});

// Smooth scroling ( https://css-tricks.com/snippets/jquery/smooth-scrolling/ )
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                event.preventDefault();
            }
        }
    });
});

// babel test
var arr = [1,2,3,4,5];
arr.forEach(v => {
    if (v > 2) {
        console.log(v);
    }
});
function f(x, y=12) {
    // y is 12 if not passed (or passed as undefined)
    return x + y;
};