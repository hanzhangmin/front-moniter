// 获取错误的 stack 数据

/**
 * 
 * @param {errorEvent 对象error属性的stack值} str 
 */
export function getline(str) {
    str = str.split(/\s* at\s*/g);
    str.shift();
    return str.join('^');
}




// 该函数会根据 event的path进行处理
// 0: button  1: div.content  2: div# container 3: body

/**
 * 
 * @param {*最后一个交互事件} event 
 */
export function getSelctor(event) {
    if (!event) {
        return ''
    }
    console.log(event);
    let path = event.path;
    if (Array.isArray(path)) {
        let selector = path.reverse().filter(item => {
                // return item.toString() !== '[object Window]' && item.toString() !== '[object HTMLDocument]'
                return item !== window && item !== document
            }).map(dom => {
                if (dom.id) {
                    return `#${dom.id}`
                } else if (dom.className) {
                    let classes = dom.className.split(/\s+/).join('.');
                    return `.${classes}`
                } else {
                    return `${dom.tagName}`
                }
            }).join('  ')
            // console.log(selector);
        return selector
    } else {
        // 有可能传过来的是一个对象
        let path = [];
        while (event && event !== document) {
            path.push(event);
            event = event.parentNode;
        }
        return path
    }
}

export function onload(callback) {
    if (document.readyState === "complete") {
        callback();
    } else {
        window.addEventListener('load', callback)
    }
}