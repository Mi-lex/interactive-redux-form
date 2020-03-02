const webpack = require('webpack')
const path = require('path')
const postcssFlexbugsFixer = require('postcss-flexbugs-fixes')
const postcssPresetEnv = require('postcss-preset-env')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const postcssImport = require('postcss-import')
const cssvariables = require('postcss-css-variables')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackLaravelMixManifest = require('webpack-laravel-mix-manifest')

const OUTPUT_FOLDER = 'public'
const ENTRY_FOLDER = 'resources'

const getStyleLoaders = cssOptions => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [postcssFlexbugsFixer, cssvariables, postcssImport, postcssPresetEnv()],
            },
        },
    ]
    return loaders
}

const config = {
    entry: {
        app: [`./${ENTRY_FOLDER}/ts/index.tsx`],
    },
    node: {
        fs: 'empty',
    },
    output: {
        path: path.resolve(__dirname, OUTPUT_FOLDER),
        filename: '[name].js',
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                // loader: 'source-map-loader',
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                loader: getStyleLoaders({ importLoaders: 2 }),
                sideEffects: true,
            },
            {
                test: /\.module\.css$/,
                use: getStyleLoaders({
                    importLoaders: 2,
                    modules: true,
                    getLocalIdent: getCSSModuleLocalIdent,
                }),
            },
            {
                test: /\.svg$/,
                loader: '@svgr/webpack',
            },
            {
                test: /\.eot|ttf|woff2?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]',
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './img/[name].[ext]',
                        },
                    },
                    'img-loader',
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, OUTPUT_FOLDER),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${ENTRY_FOLDER}/index.html`,
        }),
        // copy static assets
        // for reloading laravel server
        // new BrowserSyncPlugin({
        //     // browse to http://localhost:8000/ during development,
        //     // ./public directory is being served
        //     // server: { baseDir: ['public'] },
        //     proxy: 'http://127.0.0.1:8000',
        //     host: 'localhost',
        //     port: 8000,
        // }),

        new webpack.HotModuleReplacementPlugin(),
    ],

    optimization: {
        minimizer: [],
    },
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.output.filename = '[name].[hash].js'
        // Rules
        config.module.rules.push({
            test: /\.(ts|js)x?$/,
            exclude: [path.resolve(__dirname, './node_modules')],
            use: 'ts-loader',
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
            },
        })

        config.plugins.unshift(
            new CleanWebpackPlugin([`${OUTPUT_FOLDER}/img`], {
                root: __dirname,
                verbose: true,
                dry: false,
            }),
        )

        const productionPlugins = [
            // new CompressionPlugin({
            //     test: /\.js(\?.*)?$/i,
            // }),
            new BundleAnalyzerPlugin(),
            // put styles in one css file
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[hash].css',
                chunkFilename: '[name].chunk.css',
            }),

            new WebpackLaravelMixManifest(),
        ]

        config.plugins = [...config.plugins, ...productionPlugins]

        // Minimizing
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()],
        }
    } else {
        config.module.rules.push({
            test: /\.(ts|js)x?$/,
            exclude: [path.resolve(__dirname, './node_modules')],
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    },
                },
            ],
            resolve: {
                extensions: ['.ts', '.tsx', '.js'],
            },
        })
        config.optimization.removeAvailableModules = false
        config.optimization.removeEmptyChunks = false
        config.optimization.splitChunks = false
        config.output.pathinfo = false

        const devPlugins = [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].chunk.css',
            }),
        ]

        config.plugins = [...config.plugins, ...devPlugins]
    }

    return config
}
