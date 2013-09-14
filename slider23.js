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

      self.measureList();
    },

    measureList: function() {
      var self = this;

      self.toggleElementForMeasure();

      self.getDimensionListElements(function(dimensions) {

      });

      self.toggleElementForMeasure();
    },

    toggleElementForMeasure: function() {
      var self = this;

      if(self.$element.hasClass('visibleForMeasure'))
        self.$element.removeClass('visibleForMeasure');
      else
        self.$element.addClass('visibleForMeasure');
    },

    getDimensionListElements: function(callback) {
      var self = this;

      var fullWidth, numOfListElements, maxHeight, dimensions;

      numOfListElements = self.$listElements.length;

      fullWidth = 0;
      maxHeight = 0;
      self.$listElements.each(function(index) {
        var $listElement, listWidth, maxHeight;

        $listElement = $(this);

        listWidth = $listElement.outerWidth(true);
        listElementHeight = $listElement.outerHeight(true);

        if(listElementHeight > maxHeight)
          maxHeight = listElementHeight;

        fullWidth += listWidth;

        dimensions = {
          'maxHeight': maxHeight,
          'fullWidth': fullWidth
        };

        if(index+1 == numOfListElements)
          callback(dimensions);
      });
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