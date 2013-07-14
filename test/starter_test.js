(function ($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    module('jQuery#starter', {
        setup: function () {
            this.elems  = $('#qunit-fixture').children();
            this.elem   = $('#qunit-fixture').children().eq(0);
        }
    });

    test('is chainable', function () {
        strictEqual(this.elems.starter('plugin'), this.elems, 'should be chainable for collections');
        ok(this.elem.starter('plugin').eq(0), 'should be chainable for one element');
    });

    test('bad start', function() {
        throws(function () {
            this.elems.eq(0).starter();
        }, Error, 'should trow error...');
    });

    test('should start "plugin"', function() {
        equal(typeof this.elem.starter('plugin').data('plugin'), 'object', '"plugin" started');
    });

    test('provide options', function() {
        var options = {
            firstKey   : 42,
            secondKey  : 'string value'
        };

        this.elems.eq(0).attr({
            'data-first-key'    : 42,
            'data-second-key'   : 'string value',
            'data-starter'      : 'plugin'
        });

        this.elems.eq(1).attr({
            'data-first-key'    : 42,
            'data-second-key'   : 'string value'
        });

        deepEqual(this.elems.eq(0).starter().data('plugin')._provided_options, options, 'should clear provided options');
        deepEqual(this.elems.eq(1).starter('plugin').data('plugin')._provided_options, options, 'should clear provided options');
    });
}(jQuery));
