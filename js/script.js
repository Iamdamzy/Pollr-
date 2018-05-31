'use strict'

//Preloader
var preloader = $('#spinner-wrapper');
$(window).on('load', function() {
    var preloaderFadeOutTime = 500;

    function hidePreloader() {
        preloader.fadeOut(preloaderFadeOutTime);
    }
    hidePreloader();
});

jQuery(document).ready(function($) {

    //Incremental Coutner
    if ($.isFunction($.fn.incrementalCounter))
        $("#incremental-counter").incrementalCounter();

    //For Trigering CSS3 Animations on Scrolling
    if ($.isFunction($.fn.appear))
        $(".slideDown, .slideUp").appear();

    $(".slideDown, .slideUp").on('appear', function(event, $all_appeared_elements) {
        $($all_appeared_elements).addClass('appear');
    });

    //For Header Appearing in Homepage on Scrolling
    var lazy = $('#header.lazy-load')

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 200) {
            lazy.addClass('visible');
        } else {
            lazy.removeClass('visible');
        }
    });

    //Initiate Scroll Styling
    if ($.isFunction($.fn.scrollbar))
        $('.scrollbar-wrapper').scrollbar();

    if ($.isFunction($.fn.masonry)) {

        // fix masonry layout for chrome due to video elements were loaded after masonry layout population
        // we are refreshing masonry layout after all video metadata are fetched.
        var vElem = $('.img-wrapper video');
        var videoCount = vElem.length;
        var vLoaded = 0;

        vElem.each(function(index, elem) {

            //console.log(elem, elem.readyState);

            if (elem.readyState) {
                vLoaded++;

                if (count == vLoaded) {
                    $('.js-masonry').masonry('layout');
                }

                return;
            }

            $(elem).on('loadedmetadata', function() {
                vLoaded++;
                //console.log('vLoaded',vLoaded, this);
                if (videoCount == vLoaded) {
                    $('.js-masonry').masonry('layout');
                }
            })
        });


        // fix masonry layout for chrome due to image elements were loaded after masonry layout population
        // we are refreshing masonry layout after all images are fetched.
        var $mElement = $('.img-wrapper img');
        var count = $mElement.length;
        var loaded = 0;

        $mElement.each(function(index, elem) {

            if (elem.complete) {
                loaded++;

                if (count == loaded) {
                    $('.js-masonry').masonry('layout');
                }

                return;
            }

            $(elem).on('load', function() {
                loaded++;
                if (count == loaded) {
                    $('.js-masonry').masonry('layout');
                }
            })
        });

    } // end of `if masonry` checking


    //Fire Scroll and Resize Event
    $(window).trigger('scroll');
    $(window).trigger('resize');
});

/**
 * function for attaching sticky feature
 **/

function attachSticky() {
    // Sticky Chat Block
    $('#chat-block').stick_in_parent({
        parent: '#page-contents',
        offset_top: 70
    });

    // Sticky Right Sidebar
    $('#sticky-sidebar').stick_in_parent({
        parent: '#page-contents',
        offset_top: 70
    });

}

// Disable Sticky Feature in Mobile
$(window).on("resize", function() {

    if ($.isFunction($.fn.stick_in_parent)) {
        // Check if Screen wWdth is Less Than or Equal to 992px, Disable Sticky Feature
        if ($(this).width() <= 992) {
            $('#chat-block').trigger('sticky_kit:detach');
            $('#sticky-sidebar').trigger('sticky_kit:detach');

            return;
        } else {

            // Enabling Sticky Feature for Width Greater than 992px
            attachSticky();
        }

        // Firing Sticky Recalculate on Screen Resize
        return function(e) {
            return $(document.body).trigger("sticky_kit:recalc");
        };
    }
});

// Fuction for map initialization
function initMap() {
  var uluru = {lat: 12.927923, lng: 77.627108};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru,
    zoomControl: true,
    scaleControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true
  });
  
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}


// Ben Scripting Starts
$.validator.setDefaults({
    submitHandler: function () {
        alert("submitted!");
    }
});

$(document).ready(function () {
    $("#registration_form").validate({
        rules: {
            fullName: "required",
            //					lastname1: "required",
            userName: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
            //					agree: "required"
        },
        messages: {
            fullName: "Please enter your full name",
            userName: {
                required: "Please enter a username",
                minlength: "Your username must contain at least 3 letters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            confirmPassword: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long",
                equalTo: "Please enter the same password"
            },
            email: {
                required: "Please enter email address",
                email: "Please enter a valid Email Address"
            }
            //					agree: "Please accept our Terms and Condition"
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element
            error.addClass("help-block");

            // Add `has-feedback` class to the parent div.form-group
            // in order to add icons to inputs
            element.parents(".col-sm-5").addClass("has-feedback");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }

            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!element.next("span")[0]) {
                $("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            }
        },
        success: function (label, element) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            if (!$(element).next("span")[0]) {
                $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
            $(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
            $(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        }
    });
});

//For Header Appearing in Homepage on Scrolling
var lazy = $('#header-inverse.lazy-load')

$(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
        lazy.addClass('visible');
    } else {
        lazy.removeClass('visible');
    }
});

     

// Ben Scripting Ends