# HTML WEBPACK INJECT STRING PLUGIN
## What's this?
A dead simple plugin that searches each file output by html-webpack-plugin for a custom string(like a '\</body\>' tag) and prepends, replaces, or appends a custom string by injecting it, then returning the completed template.

## Install
This(as of 2019-11-20) seems to need `html-webpack-plugin@next`, so if you run into problems try uninstalling the stable package and installing the `@next` version

`npm install -D html-webpack-inject-string-plugin html-webpack-plugin@next`

## Config default options 
```javascript

{
    // String to search for
    search: "",
    // String to inject
    inject: "",
    
    // (optional)Injects before found string
    prepend: true
    // (optional)Replaces found string with injection
    replace: false
    // (optional)Injects after found string
    append: false
    
    // (optional)Adds 'r\n\' before or after injection string
    newline: { before: true, after: true }
    // (optional)Enables console.log messages
    dev: false
}
```

## Usage (simple)
``` javascript
const htmlWebpackInjectStringPlugin = require('html-webpack-inject-string-plugin');
{   // ...webpack.config
    plugins: [
        // ...htmlWebpackPlugin({}),
         
        new htmlWebpackInjectStringPlugin({
            // String to search for
            search: "</body>",
            // String to inject
            inject: "<script>alert('injected')</script>"
            // Defaults to prepending injection before search string
        }),
    ]
}
```

## Usage (complex)
``` javascript
const htmlWebpackInjectStringPlugin = require('html-webpack-inject-string-plugin');
{   // ...webpack.config
    plugins: [
        // ...htmlWebpackPlugin({}),
        
        new htmlWebpackInjectStringPlugin({
            // String to search for
            search: "<div id='replace-me'></div>",
            // String to inject
            inject: "<script>alert('injected')</script>",
            
            // NOTE: All three of these can be used at the same time
            // which will inject the same string 3 times in a row
            prepend: true,
            replace: true,
            append: true,
            
            // Removes '\r\n' before and after the injection
            newline: false
            
            // Turns on console log messages if you want to see what it's doing
            dev: true
        }),
    ]
}
```

## Be aware
* `html-webpack-plugin@next`(2019-11-20) is a peer dependency, but might cause issues if it isn't the only version installed.
* Backslashes may need to be escaped twice(three slashes total), because it's run through a compiler first. 

## Wait, isn't this a little dangerous?
Yep! 

## So why would I use it?
Because sometimes it's just incredibly helpful. 

For instance I needed to inject a browser-sync script into each html-webpack file that contained a closing body tag.
I didn't want the boilerplate of adding it individually and conditionally(just in dev mode) to each page.

So I made this plugin to add it automatically and only where it was needed. 

## I really like this! But it could be better. Can I contribute?
Of course! I just ask that any direct pull requests against here be as unopinionated as possible. 
Part of the power for this plugin is in its being so basic.

But if you have a great idea that's more opinionated, feel free to fork this as a starting point.
