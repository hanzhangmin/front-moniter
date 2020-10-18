/**
 * 监控请求错误
 * 重写一下XMLHttpRequest对象的open和send方法，
 */

import tranker from '../traker/traker'

export function injectXHR() {

    let XMLHttpRequest = window.XMLHttpRequest;

    let myOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async) {
        if (!url.match(/logstores/) && !url.match(/sockjs/)) {
            this.logData = {
                method,
                url,
                async
            }
        }
        return myOpen.apply(this, arguments);
    }

    let mySend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        if (this.logData) {
            let startDate = Date.now();
            let hander = (type) => (event) => {
                let duration = Date.now() - startDate;
                tranker.send({
                    kind: "stability",
                    type: "xhr",
                    eventype: type,
                    duration,
                    statusText: this.statusText,
                    pathName: this.logData.url,
                    status: this.status,
                    response: this.response ? JSON.stringify(this.response) : "",
                    params: body || ''
                })
            }
            this.addEventListener('load', hander('load'), false);
            this.addEventListener('error', hander('error'), false);
            this.addEventListener('abort', hander('abort'), false);
        }
        return mySend.apply(this, arguments);
    }

}


// 在这里还可以拦截fetch请求

export function injectFetch() {
    let oldFetch = window.fetch;
    // 重写fetch方法
    window.fetch = function(url, opts) {
        let startTime = Date.now();
        let duration;
        let log;
        return new Promise((resolve, reject) => {
            if (opts) {
                var timeout = opts.timeout;
                if (timeout) {
                    setTimeout(() => {
                        reject(new Error("fetch timeout"));
                    }, timeout)
                }
            }
            oldFetch(url, opts).then(res => {
                duration = Date.now() - startTime;
                log = {
                    kind: "stability",
                    type: "fetch",
                    duration,
                    statusText: res.statusText,
                    pathName: res.url,
                    status: res.status,
                    params: opts ? opts.body : '',
                    response: undefined
                }

                return res.json()

            }).then(data => {
                log.response = JSON.stringify(data);
                tranker.send(log);
                resolve(data);
            }, err => {
                tranker.send(log);
                reject(err);
            })
        })
    }
}