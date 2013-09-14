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
      keyboardNavigation: true,
      moveDistanceInPx: 1000
    };

    // Extending options
    self.opts = $.extend({}, self.defaults, options);

    // Privates
    self.$wrapper = $(el);
    self.$list = $('ul', el);
    self.$listElements = $('li', self.$list);

    self.$window = $(window);
    self.$document =  $(document);

    self.movedX = 0;
  }

  // Separate functionality from object creation
  slider23.prototype = {

    init: function() {
      var self = this;

      self.bindKeyboard();

      self.enlargeList(function() {
        self.showSlider();
      });
    },

    bindKeyboard: function() {
      var self = this;

      if(self.opts.keyboardNavigation == false)
        return;

      self.$document.unbind("keydown");

      self.$document.on('keyup', function(e) {
        if(e.keyCode == 37)
          self.goLeft();

        if(e.keyCode == 39)
          self.goRight();
      });
    },

    moveSlider: function(x) {
      var self = this;

      self.$list.transition({ x: x });
    },

    goLeft: function() {
      var self = this;

      x = self.movedX + self.opts.moveDistanceInPx;

      self.moveSlider(x);

      self.movedX = x;
    },

    goRight: function() {
      var self = this;

      x = self.movedX - self.opts.moveDistanceInPx;

      self.moveSlider(x);

      self.movedX = x;
    },

    showSlider: function() {
      var self = this;

      self.$wrapper.fadeIn(1000);
    },

    enlargeList: function(callback) {
      var self = this;

      self.getDimensionsOfList(function(dimensions) {
        var fullWidth;

        fullWidth = dimensions.fullWidth;

        self.$list.width(fullWidth);

        self.$wrapper.hide();

        callback();
      });
    },

    getDimensionsOfList: function(callback) {
      var self = this;

      self.toggleElementForMeasure();

      self.getDimensionListElements(function(dimensions) {
        self.toggleElementForMeasure();
        callback(dimensions);
      });
    },

    toggleElementForMeasure: function() {
      var self = this;

      if(self.$wrapper.hasClass('visibleForMeasure'))
        self.$wrapper.removeClass('visibleForMeasure');
      else
        self.$wrapper.addClass('visibleForMeasure');
    },

    getDimensionListElements: function(callback) {
      var self = this;

      var fullWidth, numOfListElements, maxHeight, dimensions, safetyAddonPixel;

      numOfListElements = self.$listElements.length;

      fullWidth = 0;
      maxHeight = 0;
      safetyAddonPixel = 0;
      self.$listElements.each(function(index) {
        var $listElement, listWidth, maxHeight;

        $listElement = $(this);

        listWidth = $listElement.outerWidth(true);
        listElementHeight = $listElement.outerHeight(true);

        if(listElementHeight > maxHeight)
          maxHeight = listElementHeight;

        fullWidth += listWidth;

        if(index+1 != numOfListElements)
          return;

        if(navigator.userAgent.match(/msie/i))
          safetyAddonPixel = fullWidth/2000;
        else if(navigator.userAgent.match(/mozilla/i))
          safetyAddonPixel = fullWidth/5000;

        dimensions = {
          'maxHeight': maxHeight,
          'fullWidth': fullWidth + safetyAddonPixel
        };

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