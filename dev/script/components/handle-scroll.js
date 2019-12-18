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
    $(window).scroll(function () {
      windowScroll.scrollHeader();
    });
  }
};