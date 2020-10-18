/**
 * 监控白屏错误
 * 选取屏幕上若干个点。判断其元素是否是document或者body
 */

import tranker from '../traker/traker'
import {
    onload
} from '../utils/index';

export function whiteScreen() {
    let wrapperElement = ['body', 'html', '#container', '.content'];
    let emptyElment = 0;

    function getSelctor(element) {
        if (element.id) {
            return element.id
        } else if (element.className) {
            let classes = element.className.split(/\s+/).join('.');
            return `.${classes}`
        } else {
            return element.nodeName.toLowerCase()
        }
    }

    function iswrapper(element) {
        let selector = getSelctor(element);
        if (wrapperElement.indexOf(selector) != -1) {
            emptyElment++;
        }
    }
    // 以供18
    onload(function() {
        for (let index = 1; index < 10; index++) {
            let elementsx = document.elementsFromPoint(window.innerWidth * index / 10, window.innerHeight / 2);
            let elementsy = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * index / 10);
            iswrapper(elementsx[0]);
            iswrapper(elementsy[0]);
        }
        // 只要大于16我们就认为网页是白屏
        if (emptyElment > 16) {
            let centerElement = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)[0];
            // console.log("白屏");
            tranker.send({
                kind: "stability",
                type: 'blank',
                emptyElment,
                screen: window.screen.width + 'x' + window.screen.height,
                viewPoint: window.innerWidth + "x" + window.innerHeight,
                selector: getSelctor(centerElement)
            })
        }
    })
}