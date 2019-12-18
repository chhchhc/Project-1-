// windowScroll
var windowScroll = {

  // scrollHeader
  scrollHeader: function () {
    var windscroll = $(window).scrollTop();
    var headerHeight = $('.c-navigation-bar').height();

    if (windscroll > headerHeight) {
      $('.c-navigation-bar').addClass('on-scroll');
    } else {
      $('.c-navigation-bar').removeClass('on-scroll');
    }
  },

  init: function () {
    var $window = $(window);

    $(window).on("resize", function () {
      if ($window.width() < 780) {
        $('.c-navigation-bar').addClass('on-scroll');
      }
      else {
        $(window).scroll(function () {
          if ($window.width() < 780) {
            $('.c-navigation-bar').addClass('on-scroll');
          }
          else{
            windowScroll.scrollHeader();
          }
        });
      }
    });

    $window.trigger('resize');
  }
};