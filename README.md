[Underscores](https://underscores.me/) based WordPress theme starter boilerplate with SASS, Bootstrap and Webpack.
Enables quick theme development with hot reload functionality.

# Installation

1. Clone this repository 
    ```bash
    $ git clone -o boilerplate git@github.com:ivalkeen/wp-theme-boilerplate.git my_theme
    ```
1. Update `src/theme/readme.txt` file with more detailed description of your theme

1. Edit `themeConfig` object in the `build/app.config.js` file to specify your theme settings, including theme name, author etc.

# Development

1. Set `distPath` (in `build/app.config.js`) to a folder in your wordpress themes path (e.g. `...wp-content/themes/my_theme`) for convenient development with hot reload.
__Warning: `distPath` directory will be deleted before each build__.

1. Run 
    ```bash
    $ npm install
    ```
1. Run 
    ```bash
    $ npm run watch 
    ```
1. __(After first build only)__ Go to your wordpress themes and activate your new theme

1. Open your theme page on webpack: [http://localhost:3000](http://localhost:3000)

1. Put your SCSS files into `src/sass` and your javascripts into `src/js`. Make changes. 

1. See the change in your browser.

# Deployment

1. Set `distPath` (in `build/app.config.js`) to anything. You'll find your compiled theme there.
__Warning: `distPath` directory will be deleted before each build__.

1. Run 
    ```bash
    $ npm run production 
    ```
1. Find your compiled theme under `distPath` folder.

1. You can zip it now and deploy to you WordPress.


