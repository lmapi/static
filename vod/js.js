let $ = function(selector, context) {
    return new $.fn.init(selector,context);
};
$.fn = $.prototype;
$.fn.init = function(selector, context) {
    var nodeList = [];
    if (typeof (selector) == 'string') {
        nodeList = (context || document).querySelectorAll(selector);
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
    return this;
}
$.fn.click = function(f) {
    if (typeof (f) == "function") {
        this.each(function() {
            this.addEventListener("click", f);
        });
    }
}

function s(argument) {
    return document.querySelectorAll(argument);
}

function lu(s) {
    this.nodeList = document.querySelectorAll(s);
    this.get = function() {
        console.log(this.nodeList)
    };
    this.each=function(cb_fun){
        for (var i = 0; i < this.nodeList.length; i++) {
            cb_fun.call(this.nodeList[i]);
        }
        return this;
    }
    this.click=function(f){
        this.each(function() {
            this.addEventListener("click", f);
        });
    }
}

function ss(sss){
    return new lu(sss);
}

ss('[act=more]').click(function(){
    // console.log(this.getAttribute('act'))
    if (this.parentElement.classList.value.indexOf('show')!=-1) {
       this.innerHTML='更多'
       this.parentElement.classList.remove("show")
    } else {
        this.parentElement.classList.add("show")
        this.innerHTML='收起'
    }
})

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
// s('[act]')
// console.log($('[act]'))


// console.log($('header'))

// $('[act]').click(function(){
//     console.log(this.getAttribute('act'))
//     if (this.parentElement.classList.value.indexOf('choiceshow')!=-1) {
//        this.innerHTML='更多'
//        this.parentElement.classList.remove("choiceshow")
//     } else {
//         this.parentElement.classList.add("choiceshow")
//         this.innerHTML='收起'
//     }
// });

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

