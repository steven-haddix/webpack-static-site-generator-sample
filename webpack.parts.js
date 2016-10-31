const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

exports.generateSite = function(asset, paths, props, scope) {
    return {
        plugins: [
            new StaticSiteGeneratorPlugin(asset, paths, props, scope),
        ]
    }
}

exports.loadJSX = function(include) {
    return {
        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    // Enable caching for extra performance
                    loaders: ['babel?cacheDirectory'],
                    include: include
                }
            ]
        }
    };
}

exports.loadFonts = function() {
    return {
        module: {
            loaders: [
                { test: /\.(woff|woff2)$/,loader: 'url', query: { name: 'font/[hash].[ext]', limit: 5000, mimetype: 'application/font-woff'} },
                { test: /\.(ttf|eot|svg)$/, loader: 'file', query: { name: 'font/[hash].[ext]' }},
            ]
        }
    }
}

exports.loadJSON = function() {
    return {
        module: {
            loaders: [
                { test: /\.json$/, loader: 'json-loader' }
            ]
        }
    }
}

exports.setupCSS = function(paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css/,
                    loaders: ['style', 'css'],
                    include: paths
                }
            ]
        }
    };
}

exports.extractCSS = function(paths) {
    return {
        module: {
            loaders: [
                // Extract CSS during build
                {
                    test: /\.css/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader') ,
                    include: paths
                }
            ]
        },
        plugins: [
            // Output extracted CSS to a file
            new ExtractTextPlugin('[name].[chunkhash].css')
            // new ExtractTextPlugin('style.css')
        ]
    };
}

exports.extractBundle = function(options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files. Manifest is
            // needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest'],

                // options.name modules only
                minChunks: Infinity
            })
        ]
    };
}

exports.clean = function(path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
}

exports.enableReactPerformanceTools = function() {
    return {
        module: {
            loaders: [
                {
                    test: require.resolve('react'),
                    loader: 'expose?React'
                }
            ]
        }
    };
}

exports.devServer = function(options) {
    const ret = {
        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };

    if(options.poll) {
        ret.watchOptions = {
            // Delay the rebuild after the first change
            aggregateTimeout: 300,
            // Poll using interval (in ms, accepts boolean too)
            poll: 1000
        };
    }

    return ret;
}

exports.minify = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
}

exports.setFreeVariable = function(key, value) {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
}
