(function ($, undefined) {
    'use strict';

    // Plugin constructor
    var Starter = function (elem, options) {
            this.elem     = elem;
            this.$elem    = $(elem);
            this.options  = options;

            this.metadata = this.$elem.data();

            this._init();
        },
        namespace = 'starter';

    // The plugin prototype
    Starter.prototype = {
        version     : 0.1,

        // Plugin defaults options
        defaults    : {
            autoStart   : true,
            plugin      : ''
        },

        /**
         * Initialization procedures
         * @private
         */
        _init: function () {
            var starter         = this,
                arguments_key   = 'arguments',
                _arguments      = $.extend(true, {}, starter.metadata),
                plugin;

            if (typeof starter.options === 'string') {
                starter.config = $.extend(true, {}, starter.defaults, starter.metadata);
                plugin = starter.options;
            } else {
                starter.config = $.extend(true, {}, starter.defaults, starter.options, starter.metadata);
                plugin = starter.config[namespace];
            }

            if (typeof plugin === 'undefined') {
                starter._error('Nothing to start :(');
            }

            if (arguments_key in starter.config) {
                _arguments = starter.config[arguments_key];
            } else {
                // Clear arguments...
                delete _arguments[namespace + '_here'];
                delete _arguments[namespace];
                delete _arguments[arguments_key];

                $.each(starter.defaults, function (key) {
                    delete(_arguments[key]);
                });
            }

            if (plugin && plugin in $.fn) {
                starter.$elem[plugin](_arguments);
            } else {
                starter._error('Please add jQuery plugin "' + plugin + '" js-file to document.');
            }
        },

        /**
         * Show error message in console
         * @param {string} error_message
         * @private
         */
        _error: function (error_message) {
            if ('console' in window) {
                window.console.error(error_message);
            }

            throw new Error(error_message);
        }
    };

    $.fn[namespace] = function (options) {
        return this.each(function () {
            var $this       = $(this),
                plugin_here = namespace + '_here',
                data        = $this.data(plugin_here);

            if (!data) {
                $this.data(plugin_here, new Starter(this, options));
            }
        });
    };

    $.fn[namespace].Constructor   = Starter;
    $.fn[namespace].defaults      = Starter.prototype.defaults;

    // Plugin initialization on DOM ready event
    $(function () {
        if ($.fn[namespace].defaults.autoStart) {
            $('[data-' + namespace + ']')[namespace]();
        }
    });
})(window.jQuery);
