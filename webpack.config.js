const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    entry: "./src/main.js",
    context: process.cwd(),
    output: {
        filename: "moniter.js",
        path: path.resolve(__dirname, "./dist")
    },
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        // 这里配置一个express服务器
        before(router) {
            router.get("/success", function(req, res) {
                res.json({
                    id: 1
                });
            })
            router.post("/error", (req, res) => {
                res.sendStatus(500);
            })
            router.get("/fetchTest", (req, res) => {
                res.json({
                    id: 1,
                    name: "韩张敏",
                    age: 18
                })
            })
            router.get("/fetchTestError", (req, res) => {
                res.sendStatus(500);
            })
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head"
        })
    ]
}