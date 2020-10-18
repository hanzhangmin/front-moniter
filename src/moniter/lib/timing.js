/**
 * 监控白屏错误
 * 选取屏幕上若干个点。判断其元素是否是document或者body
 */

import tranker from '../traker/traker'
import {
    onload
} from '../utils/index';
import getLastEvent from '../utils/getLastEvent'
import {
    getSelctor
} from '../utils/index'
export function timing() {
    if (performance) {
        onload(function() {
            // 得到的时间更加准确
            let FMP, LCP;
            new PerformanceObserver((entryList, observer) => {
                let perfEntries = entryList.getEntries();
                FMP = perfEntries[0];
                observer.disconnect(); //解除观察
            }).observe({
                entryTypes: ['element'] //观察页面中有意义的元素
            });
            new PerformanceObserver((entryList, observer) => {
                let perfEntries = entryList.getEntries();
                LCP = perfEntries[0];
                observer.disconnect(); //解除观察
            }).observe({
                entryTypes: ['largest-contentful-paint'] //观察页面中有意义的元素
            });

            // 监听用户交互事件延迟

            new PerformanceObserver((entryList, observer) => {
                let lastEvent = getLastEvent();
                let fristInput = entryList.getEntries()[0];
                console.log(lastEvent, fristInput);
                if (fristInput) {
                    let inputDelay = fristInput.processingStart - fristInput.startTime;
                    let duration = fristInput.duration;
                    console.log(inputDelay, duration);
                    if (inputDelay > 0 || duration > 0) {
                        tranker.send({
                            kind: "experience", //用户体验指标
                            type: 'fristInputDelay',
                            inputDelay,
                            duration,
                            startTime: fristInput.startTime,
                            selector: getSelctor(lastEvent)
                        })
                    }
                }
                observer.disconnect(); //不再观察
            }).observe({
                type: 'first-input',
                buffered: true
            })

            setTimeout(() => {
                const {
                    connectEnd,
                    connectStart,
                    domComplete,
                    domContentLoadedEventEnd,
                    domContentLoadedEventStart,
                    domInteractive,
                    domLoading,
                    domainLookupEnd,
                    domainLookupStart,
                    fetchStart,
                    loadEventEnd,
                    loadEventStart,
                    navigationStart,
                    redirectEnd,
                    redirectStart,
                    requestStart,
                    responseEnd,
                    responseStart,
                    secureConnectionStart,
                    unloadEventEnd,
                    unloadEventStart
                } = performance.timing;

                // 发送性能指标
                // console.log(performance.getEntries());

                let FP = window.performance.getEntriesByName('first-paint')[0];
                let FCP = window.performance.getEntriesByName('first-contentful-paint')[0];
                tranker.send({
                    kind: "experience", //用户体验指标
                    type: "timing",
                    connectTime: connectEnd - connectStart, //建立tcp链接时间
                    ttfbTime: responseStart - requestStart, //获取网络响应首字节时间
                    responseTime: responseEnd - responseStart, //响应数据传输耗时
                    parseDomTime: loadEventEnd - domLoading, //dom解析时间
                    domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
                    timeToInteractive: domInteractive - fetchStart, //首次可交互时间
                    FP: FP.startTime,
                    FCP: FCP.startTime,
                    FMP: FMP ? FMP.startTime : undefined,
                    LCP: LCP.startTime
                })
            }, 3000);
        })
    }
}


// Performance API
/**
 * es5引入的高精度时间戳，精确到毫秒的千分之一，是浏览器对象  目前，所有主要浏览器都已经支持performance对象，，包括Chrome 20+、Firefox 15+、IE 10+、Opera 15+。
 * 1. performance.timing属性指向一个对象，它包含了各种浏览器性能有关的时间数据，提供浏览器处理网页各个阶段的耗时。
 * 2. performance.now() 方法返回当前网页从performance.timing.navigationStart到当前时间之间的微秒数，其精度可达100万分之一秒。
 * 3. performance.mark() 方法用于为相应的视点做标记。
 * 4. performance.clearMarks方法用于清除标记，如果不加参数，则清除所有标记。
 * 5. performance.getEntries()浏览器获取网页时，会对网页中每一个对象，如js文件、css文件、图片文件等，发出一个HTTP请求。performance.getEntries方法以数组形式，返回这些请求的时间统计信息。
 * 6. performance.navigation对象 performance还可以提供用户行为信息，主要存放在performance.navigation对象上。
 * 7. performance.navigation.type 返回一个整数值，表示网页的加载来源，可能有以下4种：
 * 
 * 8. performance.navigation.redirectCount
 */