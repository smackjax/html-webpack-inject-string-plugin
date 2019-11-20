const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackInjectStringPlugin {
    // NOTE: Fires on htmlWebpackPlugin 'beforeEmit' event
    // --- Defaults ---
    // append: false
    // prepend: true
    // replace: false
    // search: ""
    // inject: ""
    // newline: { before: true, after: true }
    // dev: false

    
    constructor(options) {
        // Initialize defaults

        if(!options.prepend && !options.replace && !options.append) options.prepend = true;

        this.options = { 
            prepend: (options.prepend || false),
            replace: (options.replace || false),
            append: (options.append || false),

            search: (options.search || ''),
            inject: (options.inject || ''),

            newline: options.newline || { before: true, after: true},
            dev: options.dev || false,
        };
    }

    apply(compiler) {
        if(this.options.dev) console.log("====== html-webpack-inject-string-plugin ======");

        compiler.hooks.compilation.tap('HtmlWebpackInjectStringPlugin', (compilation) => {

            // Static Plugin interface |compilation |HOOK NAME | register listener 
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'HtmlWebpackInjectStringPlugin',
                (data, cb) => {
                    // Validate
                    if(typeof this.options.search != 'string') throw Error("html-webpack-inject-string-plugin: { 'search' } must be a string");
                    if(!this.options.search) throw Error("html-webpack-inject-string-plugin: { 'search' } cannot be empty!");
                    if(typeof this.options.inject != 'string') throw Error("html-webpack-inject-string-plugin: { 'inject' } must be a string!");

                    // Searches for string
                    if(this.options.dev) console.log("Searching template for string: ", this.options.search);                    
                    const searchStringIndex = data.html.indexOf(this.options.search);

                    // Found string
                    if (searchStringIndex > -1) {
                        if(this.options.dev) console.log("Search string found! Injecting string: ", this.options.inject);

                        // Check for newlines
                        let stringToInject = this.options.inject;
                        if (this.options.newline && this.options.newline.before) {
                            if(this.options.dev) console.log("Adding newline before injection string"); 
                            stringToInject = '\r\n' + stringToInject;
                        }
                        if (this.options.newline && this.options.newline.after) {
                            if(this.options.dev) console.log("Adding newline after injection string");          
                            stringToInject = stringToInject + '\r\n';
                        }

                        
                        // Kudos to jAndy
                        // https://stackoverflow.com/a/4364902
                        const splitString = data.html.split(this.options.search);
                        splitString.splice(1, 0, this.options.search)

                        if(this.options.dev) console.log("HTML string was split into " + splitString.length + " elements");

                        // In the interest of being versatile, you can prepend, append and replace at the same time if you want. 
                        if(this.options.replace) {
                            if(this.options.dev) console.log("Replacing injection string");
                            splitString[1] = this.options.inject;
                        }
                        if(this.options.append) {
                            if(this.options.dev) console.log("Appending injection string");
                            splitString.splice(2, 0, this.options.inject);
                        }
                        if(this.options.prepend) {
                            if(this.options.dev) console.log("Prepending injection string");
                            splitString.splice(1, 0, this.options.inject);
                        }
                        
                        // Build new string
                        if(this.options.dev) console.log("Bulding new string from " + splitString.length + " elements");
                        data.html = splitString.join('');
                    } else {
                        if(this.options.dev) console.log("Couldn't find string matching search");
                    }
    
                    // Keep on keeping on
                    if(this.options.dev) console.log("===============================================");
                    cb(null, data);
                }
            )
        })
    }
   };




module.exports = HtmlWebpackInjectStringPlugin;