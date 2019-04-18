<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/page/layout/_taglibs.jsp" %>
<fis:extends name="">
    <fis:block name="body">
        <div id="J_holiday_notice" class="holiday-notice">
            <div id="J_holiday_notice_mask" class="holiday_notice_mask"
                 style=""></div>
            <div id="J_holiday_notice_content" class="holiday_notice_content"
                 style="">
                <div></div>
                <i id="J_holiday_closeed" class="closeed"
                   style="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z"/>
                        <path fill="#fff"
                              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                    </svg>
                </i>
            </div>
        </div>
        <style>

            .holiday-notice {
                position: fixed;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 99999;
                display: none;
            }

            .holiday-notice.transition .holiday_notice_mask, .holiday-notice.transition .holiday_notice_content, .holiday-notice .closeed {
                transition: all .3s;
            }

            .holiday_notice_mask {
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .5);
                z-index: 999999;
            }

            .holiday_notice_content {
                width: 865px;
                height: 405px;
                position: fixed;
                margin: auto;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background: rgba(231, 117, 127, .8) url(/static/images/holiday-notice.jpg) no-repeat center;
                z-index: 999999;
                padding: 5px;
                border: 5px solid #f5d29c;
            }

            .holiday-notice .closeed {
                opacity: .8;
                background: rgba(0, 0, 0, .5);
                position: absolute;
                right: -55px;
                top: -5px;
                width: 50px;
                height: 50px;
                overflow: hidden;
                cursor: pointer;
            }

            .holiday-notice .closeed:hover {
                opacity: .9;
            }
        </style>
        <script>

            !function () {
                var toDay = new Date()
                var currDate = +('' + toDay.getFullYear() + (toDay.getMonth() + 1) + toDay.getDate());
                if (currDate >= 2019211) {
                    var J_holiday_notice = document.getElementById('J_holiday_notice');
                    J_holiday_notice.parentNode.removeChild(J_holiday_notice);
                    return false;
                }

                (function () {
                    var lastTime = 0;
                    var vendors = ['ms', 'moz', 'webkit', 'o'];
                    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
                    }
                    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
                        var currTime = new Date().getTime();
                        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                        var id = window.setTimeout(function () {
                            callback(currTime + timeToCall);
                            lastTime = currTime + timeToCall;
                        }, timeToCall);
                        return id;
                    };
                    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
                        clearTimeout(id);
                    };
                })();


                var load = function (back) {
                    window.requestAnimationFrame(function () {
                        back && back.call(window);
                    });
                }


                //获取前缀
                var vendor = (function () {
                    var transformNames = {
                        webkit: 'webkitTransform',
                        Moz: 'MozTransform',
                        O: 'OTransform',
                        ms: 'msTransform',
                        standard: 'transform'
                    };
                    for (var key in transformNames) {
                        if (document.body.style[transformNames[key]] !== undefined) {
                            return key;
                        }
                    }
                    return false;
                })();

                //设置带前缀的属性
                function prefixStyle(style) {
                    if (vendor === false) {
                        return false;
                    }
                    if (vendor === 'standard') {
                        return style;
                    }

                    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
                }

                var t = 500;
                var istransitionend;
                var transitionendFn;


                var J_holiday_notice = document.getElementById('J_holiday_notice');
                var J_holiday_notice_content = document.getElementById('J_holiday_notice_content');
                var J_holiday_notice_mask = document.getElementById('J_holiday_notice_mask');
                var J_holiday_closeed = document.getElementById('J_holiday_closeed');

                var showNotice = function () {
                    J_holiday_notice_mask.style.opacity = 1;
                    J_holiday_notice_content.style.opacity = '1';
                    J_holiday_notice_content.style[prefixStyle('transform')] = 'scale(1)';
                }
                var hideNotice = function () {
                    J_holiday_notice_mask.style.opacity = 0;
                    J_holiday_notice_content.style.opacity = '0';
                    J_holiday_notice_content.style[prefixStyle('transform')] = 'scale(.2)';
                }

                var leaveBackCall = function () {
                    J_holiday_notice.className = 'holiday-notice';
                    J_holiday_notice_content.className = 'holiday_notice_content';
                    J_holiday_notice.style.display = 'none';
                };
                var entryBackCall = function () {
                    J_holiday_notice.className = 'holiday-notice';
                    J_holiday_notice_content.className = 'holiday_notice_content';
                };

                var transitionEndCall = function (target) {
                    if (target == J_holiday_notice_content && J_holiday_notice_content.className.indexOf('entry') > -1) {
                        istransitionend = true;
                        entryBackCall();
                    }
                    if (target == J_holiday_notice_content && J_holiday_notice_content.className.indexOf('leave') > -1) {
                        istransitionend = true;
                        leaveBackCall();
                    }
                }

                var transitionLoad = function () {
                    hideNotice();
                    J_holiday_notice.style.display = 'block';
                    J_holiday_notice.className = 'holiday-notice';
                    J_holiday_notice_content.className = 'holiday_notice_content';
                    load(function () {
                        J_holiday_notice.className = 'holiday-notice transition';
                        J_holiday_notice_content.className = 'holiday_notice_content entry';
                        showNotice();
                    });
                    transitionendFn = setTimeout(function () {
                        if (istransitionend)
                            return;
                        transitionEndCall(J_holiday_notice_content);
                    }, t);
                };

                setTimeout(function () {
                    transitionLoad();
                }, 200);


                J_holiday_closeed.addEventListener('click', function () {
                    J_holiday_notice.className = 'holiday-notice';
                    J_holiday_notice_content.className = 'holiday_notice_content';
                    load(function () {
                        J_holiday_notice.className = 'holiday-notice transition';
                        J_holiday_notice_content.className = 'holiday_notice_content leave';
                        hideNotice();
                    });
                    transitionendFn = setTimeout(function () {
                        if (istransitionend)
                            return;
                        transitionEndCall(J_holiday_notice_content);
                    }, t);
                });
                J_holiday_notice.addEventListener(prefixStyle("TransitionEnd"), function (event) {
                    transitionEndCall(event.target);
                }, false);
            }();
        </script>
    </fis:block>
</fis:extends>