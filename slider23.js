(function($){

  /**
   * slider23-Initialmethode
   * - Definiert die internen Optionen und Variablen
   * @author Ronny Neefe
   * @param  {HTML-object}  el      slider23-Element
   * @param  {HTML-Object}  options Options-Objekt
   */
  function slider23(el, options) {
    var self = this;

    // Defaults
    self.defaults = {

    };

    // Extending options
    self.opts = $.extend({}, self.defaults, options);

    // Privates
    self.$element = $(el);
    self.$list = $('ul', el);
    self.$listElements = $('li', self.$list);
    self.$window = $(window);
  }

  // Separate functionality from object creation
  slider23.prototype = {

    init: function() {
      var self = this;

      /*self.$listElements.each(function() {
        $
      });*/
    }
  };

  // The actual plugin
  $.fn.slider23 = function(options) {
    if(this.length) {
      this.each(function() {
        var rev = new slider23(this, options);
        rev.init();
        $(this).data('slider23', rev);
      });
    }
  };
})(jQuery);