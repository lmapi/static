let $ = function(selector, context) {
    return new $.fn.init(selector,context);
};
$.fn = $.prototype;
$.fn.init = function(selector, context) {
    var nodeList = [];
    if (typeof (selector) == 'string') {
        nodeList = (context || document).querySelectorAll(selector);
    } else if (selector instanceof Node) {
        nodeList[0] = selector;
    } else if (selector instanceof NodeList || selector instanceof Array) {
        nodeList = selector;
    }
    this.length = nodeList.length;
    for (var i = 0; i < this.length; i += 1) {
        this[i] = nodeList[i];
    }
    return this;
}
;
$.fn.init.prototype = $.fn;
$.fn.each = function(cb_fun, need_ret) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        res[i] = cb_fun.call(this[i]);
    }
    if (need_ret) {
        if (res.length == 1) {
            res = res[0];
        }
        return res;
    }
    return this;
}
$.fn.click = function(f) {
    //click改为监听事件，
    if (typeof (f) == "function") {
        //重载，若含有参数就注册事件，无参数就触发事件
        this.each(function() {
            this.addEventListener("click", f);
        });
    } else {
        this.each(function() {
            var event = document.createEvent('HTMLEvents');
            event.initEvent("click", true, true);
            this.dispatchEvent(event);
        });
    }
}

$.fn.click = function(f) {
    //click改为监听事件，
    if (typeof (f) == "function") {
        //重载，若含有参数就注册事件，无参数就触发事件
        this.each(function() {
            this.addEventListener("click", f);
        });
    } else {
        this.each(function() {
            var event = document.createEvent('HTMLEvents');
            event.initEvent("click", true, true);
            this.dispatchEvent(event);
        });
    }
}


// let li = document.querySelectorAll('.list li');
// for (var i = li.length - 1; i >= 0; i--) {
//     li[i].onmouseover=function () {
//         console.log('in')
//         this.children[2].insertAdjacentHTML('afterend','<div id="mk"><i><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 16 32"><path d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z"></path></svg></i></div>');
//     }
//     li[i].onmouseout=function () {
//         // document.querySelector('#mk').remove();
//         // this.children[3].remove()
//         console.log('out')
//     }
//     console.log(li[i]);
// }

$('.choice li').click(function(){
    console.log(this)
});

tabs();
function tabs(active=false) {
    let tabs = $('.tabs');
    if (tabs.length==0) {return 0;}
    for (var i = tabs.length - 1; i >= 0; i--) {
        let t = tabs[i].children[1].children;
        let r = tabs[i].children[2].children;  
        for (var n = t.length - 1; n >= 0; n--) {
            t[n].onclick=function(){
                for (var m = t.length - 1; m >= 0; m--) {
                    if (t[m]==this) {
                        console.log(t[m])
                        this.classList.add("active")
                        r[m].classList.add("active")
                    } else {
                        t[m].classList.remove("active")
                        r[m].classList.remove("active")
                    }
                }

            }
        }
    }
}

