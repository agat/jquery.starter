(function ($, window, document, undefined) {
    var pluginName = 'plugin',
        defaults = {
            default_property: 'value'
        };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {
        init: function () {
            console.info('Im started...');
            //console.dir(this.options);
        },
        method: function (el, options) {

        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };

    //console.info('plugin' in $.fn);

})(jQuery, window, document);