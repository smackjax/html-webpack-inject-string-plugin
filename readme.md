# HTML WEBPACK INJECT STRING PLUGIN
## What's this?
A dead simple plugin that searches each file output by html-webpack-plugin for a custom string(like a '\</body\>' tag) and prepends, replaces, or appends a another custom string by injecting it, then returning the completed template.

## Config default options 
```javascript
// For example, searching for '</body>'
{
    // String to search for
    search: "",
    // String to inject
    inject: ""
    
    // Injects before found string
    prepend: true
    // Replaces found string with injection
    replace: false
    // Injects after found string
    append: false
    
    // Adds 'r\n\' before or after injection string
    newline: { before: true, after: true }
    // Enables console.log messages
    dev: false
}
```

## Usage 
```javascript
const htmlWebpackInjectStringPlugin = require(html-webpack-inject-string-plugin);

{
/* EXAMPLE BASE CODE:
    <div id='replace-me'></div>
</body>
*/

{ // USAGE EXAMPLE 1
    plugins: [
        
        // Simple
        new htmlWebpackInjectStringPlugin({
            search: "</body>",
            inject: "<script>alert('injected')</script>"
            // Defaults to prepending before search string
        }),
        /* Results:
            <div id='replace-me'></div>

            <script>alert('injected')</script>

        </body>
        */
    ]
}
 
{ // USAGE EXAMPLE 2
    plugins: [
        // More complex
        new htmlWebpackInjectStringPlugin({
            search: "<div id='replace-me'></div",
            inject: "<a>I'm a replacement</a>",
            prepend: false,
            replace: true,
            append: true,
            newline: {
                before: false,
                after: false
            }
        }),
        /* Results:
            <a>I'm a replacement</a><a>I'm a replacement</a> <--- replaced and appended, so two injected
        </body>
        */
    ]
}
```

## Notes
* `html-webpack-plugin@next` is a peer dependency, but might cause issues if it isn't the only version installed.
* Backslashes may need to be escaped twice(three slashes total), because it's run through a compiler first. 

## Wait, isn't this a little dangerous?
Yep! 

## So why would I use it?
Because sometimes it's just incredibly helpful. 

For instance I needed to inject a browser-sync script into each html-webpack file with that contained a closing body tag.
I didn't want the boilerplate of having to add it individually and conditionally(only needed in development) to each page.

So I made this plugin to add it automatically and only where it was needed. 

## I really like this! But it could be better. Can I contribute?
Of course! I just ask that any direct pull requests against here be as unopinionated as possible.
If you have a great idea that's more opinionated, feel free to fork this as a starting point.
