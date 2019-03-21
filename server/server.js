import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import model from "./model";
import path from "path";
import csshook from "css-modules-require-hook/preset";
import assethook from "asset-require-hook";

import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../src/app";
import reducers from "../src/reducer";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import staticPath from "../build/asset-manifest";
assethook({
  extensions: ["png"]
});

console.log(staticPath);

// react 组件 => div
const Chat = model.getModel("chat");
const app = express();
// work with express 和express配合,和http绑定
const server = require("http").Server(app);

const io = require("socket.io")(server);
io.on("connection", function(socket) {
  // socket 是当前这次链接
  // console.log('user login');
  socket.on("sendmsg", function(data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join("_");
    Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
      //console.log(doc);
      // doc._doc 和 doc 是一样的
      io.emit("recvmsg", Object.assign({}, doc._doc));
    });
    // 广播到全局
    // io.emit('recvmsg', data)
  });
});

const userRoute = require("./user");

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use((req, res, next) => {
  if (req.url.startsWith("/user/") || req.url.startsWith("/static/")) {
    return next();
  }

  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  let context = {}; // 路由有跳转context会告诉我们跳转
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // 做seo
  const seo = {
    "/msg": "React,redux,聊天",
    "/boss": "boss页面"
  };

  const Pagehtml = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <meta name="description" content=${seo[req.url]}>
                <link rel="manifest" href="/manifest.json">
                <link rel="shortcut icon" href="/favicon.ico">
                <title>React App</title>
                <link href="/${staticPath["main.css"]}" rel="stylesheet">
            </head>
            <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">${markup}</div>
            <script type="text/javascript" src="/${
              staticPath["main.js"]
            }"></script>
            </body>
            </html>`;

  res.send(Pagehtml);
  //return res.sendFile(path.resolve("build/index.html"));
});

// src 外层是根目录，外层下的build,所有静态资源访问的路径
app.use("/", express.static(path.resolve("build")));

server.listen("9093", () => {
  console.log("Node app start at 9093");
});
