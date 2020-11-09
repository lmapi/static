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

function s(argument) {
    res = document.querySelectorAll(argument);
    if (res.length=1) {return res[0]}else{return res}
}


function searchV() {
    searchClear();
    // $('.so>input').bind('input propertychange', e=>{console.log(e)});
    $('.so>input').on('search',function(){search()});
    $('p').html(function(k,v){return v.replace(key,'<b>'+key+'</b>')})
}
//清除搜索关键字
function searchClear() { $('[type="search"]').val() ? $('.so>i').show() : $('.so>i').hide();}
//执行搜索
function search() {let key = $(".so>input").val();if(key){window.location.href="/search/"+key}}


s('input').onsearch=function(){
    if (this.value) {
        window.location.href="/search/"+this.value
    }
};


$('.choice li').click(function(){
    console.log(this.value)
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

