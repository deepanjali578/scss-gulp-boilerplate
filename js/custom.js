// For smooth scrolling in same page

jQuery(function($) {
  $(document).on("click", "a[href*=\\#]", function(event) {
    if ($(this.hash).length) {
      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 135 //can be adjusted according to requirement
        },
        500 //scroll anination duration
      );
    }
  });

  // smooth scrolls to a desired section on external page
  $(window).on("load", function() {
    var urlHash = window.location.href.split("#")[1];
    if (urlHash && $("#" + urlHash).length)
      $("html,body").animate(
        {
          scrollTop: $("#" + urlHash).offset().top - 135 //can be adjusted according to requirement
        },
        500
      );
  });
});
