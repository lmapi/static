function lu(s) {
    this.nodeList = document.querySelectorAll(s);
    this.get = function(e=false) {
        if (e) {return this.nodeList;}
        if (this.nodeList.length==1) {
            return this.nodeList[0];
        } else {
            return this.nodeList;
        }
    };
    this.each=function(f){
        for (var i = 0; i < this.nodeList.length; i++) {
            f.call(this.nodeList[i]);
        }
        return this;
    }
    this.click=function(f){
        this.each(function() {
            this.addEventListener("click", f);
        });
    }
    // this.on=function(e){
    //     this.each(function() {
    //         this.on+e;
    //     });
    // }
}
function ss(sss){
    return new lu(sss);
}

ss('[act]').click(function(){
    console.log(this.getAttribute('act'))
    switch(this.getAttribute('act')){
        case 'more':
        if (this.parentElement.classList.value.indexOf('show')!=-1) {
           this.innerHTML='更多'
           this.parentElement.classList.remove("show")
        } else {
            this.parentElement.classList.add("show")
            this.innerHTML='收起'
        }
        break;
        case 'menu':
        break;
        case 'search':
            window.location.href="/search/";
        break;

    }
})

function searchV() {
    searchClear();
    // $('.so>input').bind('input propertychange', e=>{console.log(e)});
    $('nav>input').on('search',function(){search()});
    $('p').html(function(k,v){return v.replace(key,'<b>'+key+'</b>')})
}
//清除搜索关键字
function searchClear() { $('[type="search"]').val() ? $('.so>i').show() : $('.so>i').hide();}
//执行搜索
function search() {let key = $("nav>input").val();if(key){window.location.href="/search/"+key}}


ss('input').get().onsearch=function(){
    if (this.value) {
        window.location.href="/search/"+this.value
    }
};


tabs();
function tabs(active=false) {
    let tabs = ss('.tabs').get(true)
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

