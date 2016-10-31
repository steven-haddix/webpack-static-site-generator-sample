const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;

const PATHS = {
    app: path.join(__dirname, 'src'), style: [
        path.join(__dirname, 'src', 'styles.css'),
    ],
    build: path.join(__dirname, 'build'),
    test: path.join(__dirname, 'tests')
}

process.env.BABEL_ENV = TARGET;

const pkg = require('./package.json');

var common = merge(
    {
        // Entry accepts a path or an object of entries.
        // We'll be using the latter form given it's
        // convenient with more complex configurations.
        entry: {
            app: PATHS.app
        },
        target: 'web',
        output: {
            path: PATHS.build,
            filename: '[name].js',
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['', '.js', '.jsx']
        },
        externals: {
            'jquery': 'jQuery'
        },
        plugins: []
    },
    parts.loadJSX(PATHS.app),
    parts.loadJSON(),
    parts.loadFonts()
);

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common,
            {
                devtool: 'source-map',
                entry: {
                    style: PATHS.style
                },
                output: {
                    path: PATHS.build,
                    // filename: '[name].js',
                    filename: '[name].[chunkhash].js',
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractCSS(PATHS.style),
            parts.generateSite('app', ['/'], {}, {
                window: {},
                navigator: {},
                console: {}
            }),

            parts.extractBundle({
                name: 'vendor',
                entries: Object.keys(pkg.dependencies)
            })
    );
        break;
    default:
        config = merge(common, {});
}

module.exports = config;
