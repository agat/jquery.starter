# jQuery Starter

A jQuery plugin to start another jQuery plugin.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/agat/jquery.starter/master/dist/jquery.starter.min.js
[max]: https://raw.github.com/agat/jquery.starter/master/dist/jquery.starter.js

In your web page include jQuery, Starter and others you needed plugins (Bootstrap Tooltips plugin as example):

```html
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="jquery.starter.min.js"></script>
...
<script src="bootstrap-tooltip.js"></script>
```

If you needed run Tooltips plugin on DOM element, simply add `data-starter="tooltip"` attribute for him.

```html
<a href="#" data-starter="tooltip" title="first tooltip">hover over me</a>
```

Try on jsfiddle - [jQuery Starter plugin demo](http://jsfiddle.net/agat/3LtPH/1/).

### Passing arguments to started plugin
All `data-` attributes(except `data-starter`) converted to object and pass to the started plugin.
```html
<a href="#" data-starter="tooltip" data-placement="top">hover over me</a>
```
Passed data to the plugin:
```json
{
    "placement": "top"
}
```

Same:
```js
$('a').tooltip({
    placement: 'top'
});
```
If you have to pass the **nested object**:
```html
<a href="#" data-starter="plugin" data-nested-object='{ "childObject": { "key": "value" } }'>some text</a>
```
Attention to the _quotes_. Passed data to the plugin:
```json
{
    "nestedObject": {
    	"childObject": {
            "key": "value"
        }
    }
}
```

## Options
### plugin {string}
Started jQuery plugin name.
```js
$('div').starter({
    plugin: 'tooltip'
});
```

### arguments {object}
Arguments for started jQuery plugin.
```js
$('div').starter({
    plugin: 'tooltip',
    arguments: {
        animation: false
    }
});
```
Simpe string argument:
```js
$('div').starter({
    plugin: 'tooltip',
    arguments: 'show'
});
```
