webpack = require('webpack')
path = require('path')
postcssFlexbugsFixer = require('postcss-flexbugs-fixes')
postcssPresetEnv = require('postcss-preset-env')
MiniCssExtractPlugin = require('mini-css-extract-plugin')
CleanWebpackPlugin = require('clean-webpack-plugin')
getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
postcssImport = require('postcss-import')
cssvariables = require('postcss-css-variables')
SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
BrowserSyncPlugin = require('browser-sync-webpack-plugin')
TerserPlugin = require('terser-webpack-plugin')
HtmlWebpackPlugin = require('html-webpack-plugin')

const OUTPUT_FOLDER = 'public'
const ENTRY_FOLDER = 'resources'

const getStyleLoaders = (cssOptions, preProcessor) => {
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
    if (preProcessor) {
        if (Array.isArray(preProcessor)) {
            for (let i = 0; i < preProcessor.length; i++) {
                const element = preProcessor[i]

                if (typeof element === 'string') {
                    loaders.push(require.resolve(element))
                } else {
                    loaders.push(
                        Object.assign(element, {
                            loader: require.resolve(element.loader),
                        }),
                    )
                }
            }
        } else {
            loaders.push(require.resolve(preProcessor))
        }
    }
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
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
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
            },
            {
                exclude: [path.resolve(__dirname, './node_modules')],
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
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
                test: /\.eot|ttf|woff2?$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]',
                },
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            publicPath: `/img/`,
                        },
                    },
                    'svgo-loader',
                ],
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
        // put styles in one css file
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
        }),
        // corresponding plugin for svg-sprite-loader
        new SpriteLoaderPlugin(),
        // for reloading laravel server
        new webpack.HotModuleReplacementPlugin(),
    ],

    optimization: {
        minimizer: [],
    },
}
module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        // Plagins
        config.plugins.unshift(
            new CleanWebpackPlugin([`${OUTPUT_FOLDER}/img`], {
                root: __dirname,
                verbose: true,
                dry: false,
            }),
        )
        // config.plugins.push(
        //     new webpack.LoaderOptionsPlugin({
        //         minimize: true,
        //     }),
        // )

        // Minimizing
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin()],
        }
    } else {
        config.optimization.removeAvailableModules = false
        config.optimization.removeEmptyChunks = false
        config.optimization.splitChunks = false
        config.output.pathinfo = false;
    }

    return config
}
