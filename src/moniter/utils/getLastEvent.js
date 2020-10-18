let lastEvent;
['click', '', 'keydown', 'mouseover', 'touchstart', 'mousedown'].forEach(eventType => {
    document.addEventListener(eventType, (event) => {
        lastEvent = event
    }, {
        capture: true, //该事件在捕获阶段执行
        passive: true //不阻止默认事件
    })
})

export default function () {
    return lastEvent
}