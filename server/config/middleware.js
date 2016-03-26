const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackConfig =
  require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : '../../webpack.config');

const compiler = webpack(webpackConfig);

module.exports = (app, express) => {
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(require('webpack-dev-middleware')(compiler, {
    inline: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(path.resolve(__dirname, '../../public')));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin: http://localhost:8080');
    next();
  });
};
