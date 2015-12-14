A feature-filled and friendly way to take advantage of localStorage and sessionStorage
(JSON, namespacing, extensions, etc).

Download: [store2.min.js][prod]  or  [store2.js][dev] [![Build Status](https://travis-ci.org/nbubna/store.png?branch=master)](https://travis-ci.org/nbubna/store)  
[NPM][npm]: `npm install store2`  
Bower: `bower install store2`   
[NuGet][]: `Install-Package store2`  

[NuGet]: http://nuget.org/packages/store2/
[prod]: https://raw.github.com/nbubna/store/master/dist/store2.min.js
[dev]: https://raw.github.com/nbubna/store/master/dist/store2.js
[npm]: https://npmjs.org/package/store2


## Documentation
The main store function can handle ```set```, ```get```, ```setAll```, ```getAll``` and ```clear```
actions directly. Respectively, these are called like so:

```javascript
store(key, data);                 // sets stringified data under key
store(key);                       // gets and parses data stored under key
store({key: data, key2: data2});  // sets all key/data pairs in the object
store();                          // gets all stored key/data pairs as an object
store(false);                     // clears all items from storage
```

There are also more explicit and versatile functions available:

```javascript
store.set(key, data[, overwrite]); // === store(key, data);
store.setAll(data[, overwrite]);   // === store({key: data, key2: data});
store.get(key[, alt]);             // === store(key);
store.getAll();                    // === store();
store.clear();                     // === store(false);
store.has(key);                    // returns true or false
store.remove(key);                 // removes key and its data
store.each(callback);              // called with key and data args, return false to exit early
store.keys();                      // returns array of keys
store.size();                      // number of keys, not length of data
store.clearAll();                  // clears *ALL* areas (but still namespace sensitive)
```

Passing in ```false``` for the optional overwrite parameters will cause ```set``` actions to be skipped 
if the storage already has a value for that key. All ```set``` action methods return the previous value 
for that key, by default. If overwrite is ```false``` and there is a previous value, the unused new 
value will be returned.

All of these use the browser's localStorage (aka "local"). Using sessionStorage merely requires 
calling the same functions on ```store.session```:

```javascript
store.session("addMeTo", "sessionStorage");
store.local({lots: 'of', data: 'altogether'});// store.local === store :)
```
All the specific ```get```, ```set```, etc. functions are available on both ```store.session``` and ```store.local```, as well as any other storage facility registered via ```store.area(name, customStorageObject)``` by an extension, where customStorageObject must implement the [Storage interface][storage]. This is how [store.old.js][old] extends store.js to support older versions of IE and Firefox.

[storage]: http://dev.w3.org/html5/webstorage/#the-storage-interface

If you want to put stored data from different pages or areas of your site into separate namespaces, 
the ```store.namespace(ns)``` function is your friend:

```javascript
var cart = store.namespace('cart');
cart('total', 23.25);// stores in localStorage as 'cart.total'
console.log(store('cart.total') == cart('total'));// logs true
console.log(store.cart.getAll());// logs {total: 23.25}
cart.session('group', 'toys');// stores in sessionStorage as 'cart.group'
```

The namespace provides the same exact API as ```store``` but silently adds/removes the namespace prefix as needed.
It also makes the namespaced API accessible directly via ```store[namespace]``` (e.g. ```store.cart```) as long as it
does not conflict with an existing part of the store API.

The 'namespace' function is one of two "extra" functions that are also part of the "store API":

```javascript
store.namespace(prefix[, noSession]);// returns a new store API that prefixes all key-based functions
store.isFake();// is this storage persistent? (e.g. is this old IE?) 
```

If localStorage or sessionStorage are unavailable, they will be faked to prevent errors,
but data stored will NOT persist beyond the life of the current document/page. Use the 
[store.old.js][old] extension to add persistent backing for the store API in older browsers.

## Extensions
These mostly could use further documentation and abuse...er...testing.
Contributions are welcome!

#### Beta - Stable and definitely useful
* [store.old.js][old] - Add working localStorage and sessionStorage polyfills for older browsers
* [store.overflow.js][overflow] - Fall back to fake storage on quota errors (e.g. very useful for [Safari private mode][safari])
* [store.cache.js][cache] - To make data expire, pass a number of seconds as the overwrite (third) param on ```set()``` calls
* [store.on.js][on] - Superior storage event handling (per key, per namespace, etc in IE9+)

#### Alpha - Either incomplete or unstable or both
* [store.quota.js][quota] - Register callbacks to handle (and even cancel) quota errors
* [store.measure.js][measure] - Experimental extension for measuring space used and available (needs work)
* [store.onlyreal.js][onlyreal] - When only fake storage is available, silently fail instead of faking it.


[old]: https://raw.github.com/nbubna/store/master/src/store.old.js
[overflow]: https://raw.github.com/nbubna/store/master/src/store.overflow.js
[cache]: https://raw.github.com/nbubna/store/master/src/store.cache.js
[on]: https://raw.github.com/nbubna/store/master/src/store.on.js
[quota]: https://raw.github.com/nbubna/store/master/src/store.quota.js
[measure]: https://raw.github.com/nbubna/store/master/src/store.measure.js
[onlyreal]: https://raw.github.com/nbubna/store/master/src/store.onlyreal.js
[safari]: https://github.com/marcuswestin/store.js/issues/66

## Release History
* 2010-02-10 v0.1 (extraction from esha.js)
* 2010-05-25 v1.0 (internal release)
* 2013-04-09 [v2.0.3][] (public) - First GitHub release
* 2013-04-20 [v2.1.0][] (public) - Drops flawed/confusing/unused key(i) method, fixes extension problems.
* 2013-04-30 [v2.1.1][] (public) - Browserify (and friends) support (module.exports = store)
* 2013-05-30 [v2.1.2][] (public) - Component support (old component.json is now bower.json)
* 2013-09-08 [v2.1.3][] (public) - Remove unnecessary component.js shim
* 2014-03-01 [v2.1.4][] (public) - Package definition and store.overlow.js updates
* 2014-03-06 [v2.1.5][] (public) - AMD support and Component improvements
* 2014-03-10 [v2.1.6][] (public) - Fix AMD support flaw
* 2015-02-02 [v2.2.0][] (public) - Change store.cache.js to use seconds, not minutes.
* 2015-05-05 [v2.2.1][] (public) - node.js compatibility
* 2015-05-08 [v2.2.2][] (public) - Always expose global to allow extensions to always work.
* 2015-05-22 [v2.3.0][] (public) - Use fake storage for Safari private mode (instead of letting quota exceptions go)

[v2.0.3]: https://github.com/nbubna/store/tree/2.0.3
[v2.1.0]: https://github.com/nbubna/store/tree/2.1.0
[v2.1.1]: https://github.com/nbubna/store/tree/2.1.1
[v2.1.2]: https://github.com/nbubna/store/tree/2.1.2
[v2.1.3]: https://github.com/nbubna/store/tree/2.1.3
[v2.1.4]: https://github.com/nbubna/store/tree/2.1.4
[v2.1.5]: https://github.com/nbubna/store/tree/2.1.5
[v2.1.6]: https://github.com/nbubna/store/tree/2.1.6
[v2.2.0]: https://github.com/nbubna/store/tree/2.2.0
[v2.2.1]: https://github.com/nbubna/store/tree/2.2.1
[v2.2.2]: https://github.com/nbubna/store/tree/2.2.2
[v2.3.0]: https://github.com/nbubna/store/tree/2.3.0

## Store vs Store
When i went to publish this on NPM i discovered another [store.js][other] by Marcus Westin.
To my surprise, even our APIs had notable overlap. His has fewer features and includes superior support
for IE 6/7 in the main lib. I contacted him with the idea of merging the featuresets, but we agreed it wouldn't work.
He sees his library as a temporary polyfill meant to fade away with IE 6/7. This project is meant 
to always be useful, as a better way to use localStorage, with polyfilling as an extension.  I do hope
to incorporate IE 6/7 improvements from the other store.js into store.old.js at some point,
but it is not a priority.

To minimize confusion, i will be publishing the library as 'store2',
but the main function will always be `store`.
My apologies for the confusion caused while i was publishing this as another 'store'.

[other]: https://github.com/marcuswestin/store.js/


