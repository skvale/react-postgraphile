const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')

const paths = {
  appSrc: path.join(__dirname, 'src'),
  appPublic: path.join(__dirname, 'public')
}

/* 
Without this plugin Tailwind's default css creates a large artifact
File sizes after gzip:
58.38 KB  build/static/css/main.15b71095.chunk.css

With this plugin it is much smaller
File sizes after gzip:
1.4 KB   build/static/css/main.15b71095.chunk.css
*/

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || []
  }
}
module.exports = {
  webpack: function(config, env) {
    if (env === 'production') {
      config.plugins.push(
        new PurgecssPlugin({
          paths: [
            ...glob.sync(`${paths.appPublic}/**/*`, { nodir: true }),
            ...glob.sync(`${paths.appSrc}/**/*`, { nodir: true })
          ],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ['tsx', 'html']
            }
          ]
        })
      )
    }
    return config
  }
}
