/**
 * 需要监控的数据类型
 * 1. 全局错误 ,资源加载异常
 * 2. promise错误
 */

import {
    getline,
    getSelctor
} from '../utils/index'
import getLastEvent from '../utils/getLastEvent'
import tranker from '../traker/traker'
// 注入js错误
export function injectJsError() {
    // 监听全局未捕获错误     // 捕获资源加载异常
    window.addEventListener("error", (err) => {
        let lastEvent = getLastEvent(); //获取最后一个交互事件
        let log;
        // 说明这是一个脚本加载错误
        if (err.target && (err.target.href || event.target.src)) {
            log = {
                kind: "stability",
                type: "error",
                errorType: "resourceError",
                filename: err.target.href || event.target.src,
                tagName: err.target.tagName,
                // stack: getline(err.error.stack),
                selector: getSelctor(err.target)
            }
        } else {
            log = {
                kind: "stability",
                type: "jsError",
                errorType: err.type,
                message: err.message,
                filename: err.filename,
                position: `${err.lineno}行${err.colno}列`,
                stack: getline(err.error.stack),
                selector: getSelctor(lastEvent)
            }
        }
        tranker.send(log);
    }, true);
    // 捕获promise异常
    window.addEventListener("unhandledrejection", function(err) {
        let lastEvent = getLastEvent(); //获取最后一个交互事件
        let message;
        let reason = err.reason;
        let stack, filename, position;
        if (typeof reason === "string") {
            message = reason
        } else if (typeof reason === "object") {
            message = reason.message
            if (reason.stack) {
                stack = getline(reason.stack);
                let matstr = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                filename = matstr[1];
                position = `${matstr[2]}行${matstr[3]}列`;
            }
        }
        let log = {
            kind: "stability",
            type: "jsError",
            errorType: err.type,
            message,
            stack,
            filename,
            position,
            selector: getSelctor(lastEvent)
        }

        tranker.send(log);
    }, true)


}