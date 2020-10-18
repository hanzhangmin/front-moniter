let endpoint = "cn-huhehaote.log.aliyuncs.com";
let project = "hzmmoniter";
let logstoreName = "moniter-store";
const userAgent = require("user-agent");

let extraDate = {
    title: document.title,
    url: location.href,
    timeStamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name
}
let url = `http://${project}.${endpoint}/logstores/${logstoreName}/track`;
class sendTraker {
    constructor() {
        this.url = url; //错误信息提交地址
        this.xhr = new XMLHttpRequest();

    }
    send(data = {}) {
        let log = {
            ...data,
            ...extraDate
        }
        for (const key in log) {
            if (typeof log[key] === 'number') {
                log[key] = `${log[key] }`
            }
        }
        let logs = {
            __logs__: [log]
        }
        let body = JSON.stringify(logs);
        this.xhr.open("POST", this.url, true);
        this.xhr.setRequestHeader("content-type", "application/json");
        this.xhr.setRequestHeader("x-log-apiversion", "0.6.0");
        this.xhr.setRequestHeader("x-log-bodyrawsize", body.length);
        this.xhr.onload = () => {
            // console.log(this.xhr.require);
            console.log(log);

        }
        this.xhr.onerror = (e) => {
            console.log("error", e);
        }
        this.xhr.send(body);
    }
}
export default new sendTraker()