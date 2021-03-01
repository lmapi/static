//cookie
!function(e){var n;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var t=window.Cookies,o=window.Cookies=e();o.noConflict=function(){return window.Cookies=t,o}}}(function(){function f(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function a(e){return e.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function e(u){function c(){}function t(e,n,t){if("undefined"!=typeof document){"number"==typeof(t=f({path:"/"},c.defaults,t)).expires&&(t.expires=new Date(1*new Date+864e5*t.expires)),t.expires=t.expires?t.expires.toUTCString():"";try{var o=JSON.stringify(n);/^[\{\[]/.test(o)&&(n=o)}catch(e){}n=u.write?u.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var r="";for(var i in t)t[i]&&(r+="; "+i,!0!==t[i]&&(r+="="+t[i].split(";")[0]));return document.cookie=e+"="+n+r}}function n(e,n){if("undefined"!=typeof document){for(var t={},o=document.cookie?document.cookie.split("; "):[],r=0;r<o.length;r++){var i=o[r].split("="),c=i.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var f=a(i[0]);if(c=(u.read||u)(c,f)||a(c),n)try{c=JSON.parse(c)}catch(e){}if(t[f]=c,e===f)break}catch(e){}}return e?t[e]:t}}return c.set=t,c.get=function(e){return n(e,!1)},c.getJSON=function(e){return n(e,!0)},c.remove=function(e,n){t(e,"",f(n,{expires:-1}))},c.defaults={},c.withConverter=e,c}(function(){})});

function lu(s) {
    this.nodeList = document.querySelectorAll(s);
    this.get = function(e=false) {
        if (e===false) {
            if (this.nodeList.length==1) {
                return this.nodeList[0];
            } else {
                return this.nodeList;
            }
        } else {
            if (e===true) {
                return this.nodeList;
            } else {
                return this.nodeList[e];
            }
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
}

function ss(sss){
    return new lu(sss);
}

function post(url, data, call) {
    let opt = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: Object.entries(data).map(([key,value])=>`${key}=${value}`).join('&')
    }
    fetch(url, opt).then(response=>response.text()).then(ret=>{
        try {
            let tmp = JSON.parse(ret)
            call(tmp);
        } catch (err) {
            call(ret);
        }

    }
    ).catch(e=>console.log(e))
}
function html(t,h='',c=null) {
    let html = document.createElement(t);
    if (c) {html.classList.add(c);}
    html.innerHTML=h;
    document.body.appendChild(html);
    return html;
}
function video(data=[],call=false) {
let source={'ky':'酷云','zd':'最大','ok':'OK','youku':'优酷','iqiyi':'奇艺','qq':'腾讯','miguvideo':'咪咕','cctv6':'央视','bilibili':'哔哩'},
    url=false,
    play=location.href.match(/\d+/g),
    html = '<div class="tabs"><h2>播放列表</h2><ul class="tab">';
    for (var i = 0; i <=data.source.length - 1; i++) {
        if (play[1]==i||(i==0&&!play[1])) {
            html+='<li class="active"><img src="/vod/'+data.source[i]+'.png">'+source[data.source[i]]+'</li>';
        }else{
            html+='<li><img src="/vod/'+data.source[i]+'.png">'+source[data.source[i]]+'</li>';
        }
    }
    html+='</ul><ul class="content">';
    for (var i = 0; i <= data.playlist.length - 1; i++) {
        let j=data.playlist[i].split('#');
        (i==0&&!play[1])||(play[1]==i)?html+='<li class="active">':html+='<li>'
        for (var n = 0; n <= j.length - 1; n++) {
            let c=j[n].split('$');
            if ((play[1]==i &&play[2]==n)) {
                html+='<a class="active" href="/phtlay/'+d.id+'-'+i+'-'+n+'.html">'+c[0]+'</a>';
                url = c[1];
                continue;
            }
            if (!play && n==0) {
                html+='<a class="active" href="/phtlay/'+d.id+'-'+i+'-'+n+'.html">'+c[0]+'</a>';
                continue;
            }
            html+='<a  href="/play/'+d.id+'-'+i+'-'+n+'.html">'+c[0]+'</a>'; 
        }
        html+='</li>';
    }
    html+='</ul></div>';
    ss('section').get().insertAdjacentHTML('afterbegin', html);
    return url;
}
function msg(v,code=200) {
    let html = document.createElement('q');
        html.innerHTML=v;
    if (code!=200) {html.classList.add('err');}
    document.body.appendChild(html)
    setTimeout(function(){html.remove()},2000);
}


// ------------------------上面是公用方法------------------------------

var mhost = location.host.substr(location.host.indexOf('.')+1),
    api='//json.'+mhost+'/';
console.log(api)
console.log(mhost)
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
        case 'register':
            let lay = html('dialog','<em>×</em><ul class="content"><li class="active"><input type="text"name="user"placeholder="用户名"><input type="password"name="password"placeholder="密码"><button type="button"data-act="login">注册</button></li></ul>','tabs');
            ss('dialog>em').click(function(){
                this.parentNode.remove()
            });
            ss('dialog button').click(function(){
                let t = this.parentNode.children;
                let data={'user':t.user.value,'password':t.password.value}
            console.log(api+'register')
            post(api+'register',data,function(e) {
                console.log(e)
                msg(e.msg,e.code);
                if (e.code==200) {
                    console.log(e)
                    msg('注册成功，开始下载',200);
                    window.open("http://106.53.77.222/kan.apk")
                    // http://106.53.77.222/kan.apk
                    // Cookies.set('user', e.data,{expires:30});
                    setTimeout(()=>{lay.remove();},2000)
                }
            })
            });
        break;
        case 'user':
            let user = (u=Cookies.get('user'))?JSON.parse(u):false;
            if (user) {
                console.log(user);
                location.href='/user';
                break;
            }
            let dialog = html('dialog','<em>×</em><ul class="tab"><li class="active">登陆</li><li>注册</li></ul><ul class="content"><li class="active"><input type="text"name="user"placeholder="用户名"><input type="password"name="password"placeholder="密码"><button type="button"data-act="login">登陆</button></li><li><input type="text"name="user"placeholder="用户名"><input type="password"name="password"placeholder="密码"><button type="button"data-act="register">注册</button></li></ul>','tabs');
            
            // let dialog = document.createElement('dialog');
            //     dialog.classList.add('tabs')
            //     dialog.innerHTML='<em>×</em><ul class="tab"><li class="active">登陆</li><li>注册</li></ul><ul class="content"><li class="active"><input type="text"name="user"placeholder="用户名"><input type="password"name="password"placeholder="密码"><button type="button"data-act="login">登陆</button></li><li><input type="text"name="user"placeholder="用户名"><input type="password"name="password"placeholder="密码"><button type="button"data-act="register">注册</button></li></ul>';
            // document.body.appendChild(dialog)
            tabs();
            ss('dialog>em').click(function(){
                this.parentNode.remove()
            });
            ss('dialog button').click(function(){
                let t = this.parentNode.children;
                let data={'user':t.user.value,'password':t.password.value}
            console.log(api+this.dataset['act'])
            post(api+this.dataset['act'],data,function(e) {
                console.log(e)
                msg(e.msg,e.code);
                if (e.code==200) {
                    Cookies.set('user', e.data,{expires:30});
                    setTimeout(()=>{dialog.remove();},2000)
                }
            })
            });
        break;
        case 'search':
            window.location.href="/search/";
        break;
    }
})

function searchV() {
    searchClear();
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


function swiper(e="swiper", t=800) {
    let o, n = 0, r = 0, i = "", s = document.querySelectorAll("#" + e + ">*"), a = document.createElement("ul");
    a.id = "li",
    document.getElementById(e).appendChild(a);
    for (var c = 0; c < s.length; c++)
        i += "<li></li>";
    document.getElementById("li").innerHTML = i;
    let u = document.querySelectorAll("#" + e + ">ul>*");
    function l(e) {
        e >= 0 ? r = e : 0 == n ? r++ : (r--,
        n = 0),
        r >= u.length && (r = 0),
        r < 0 && (r = u.length - 1);
        for (var t = 0; t < u.length; t++)
            u[t].className = "",
            s[t].className = "";
        u[r].className = "on",
        s[r].className = "curr"
    }
    s[r].className = "curr",
    u[r].className = "on";
    for (c = 0; c < u.length; c++)
        u[c].index = c,
        u[c].onclick = function() {
            o = this.index,
            l(o)
        }
        ;
    timer = setInterval(l, t)
} 

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

