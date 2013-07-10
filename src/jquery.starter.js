/*
 * jquery.starter
 * A jQuery plugin to start another jQuery plugin.
 *
 * Copyright (c) 2013 Aleksej Romanovskij
 * Licensed under the MIT license.
 */

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
            autoStart: true
        },

        /**
         * Initialization procedures
         * @private
         */
        _init: function () {
            var starter = this,
                _arguments,
                plugin;

            starter.config = $.extend(true, {}, starter.defaults, starter.options, starter.metadata);

            plugin = starter.config[namespace];

            if ('arguments' in starter.config) {
                _arguments = starter.config['arguments'];
            } else {
                _arguments = starter.config;
            }

            if (plugin && plugin in $.fn) {
                starter.$elem[plugin](_arguments);
            } else {
                starter._error("Please add jQuery plugin '%s' js-file to document.", plugin);
            }

            // console.dir(starter);
        },

        /**
         * Show error message in console
         * @private
         */
        _error: function () {
            if ('console' in window) {
                console.error.apply(console, arguments);
            }
        }
    };

    $.fn[namespace] = function (options) {
        return this.each(function () {
            var $this       = $(this),
                plugin_here = namespace + ' here',
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
