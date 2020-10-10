; (function(designWidth, maxWidth) {
    let doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement("style"),
    tid;
    function refreshRem() {
        let width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 540;
        width > maxWidth && (width = maxWidth);
        let rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        let wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();
    win.addEventListener("resize",
    function() {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    },
    false);
    win.addEventListener("pageshow",
    function(e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    },
    false);
})(320, 750);

function ds(e) {
    return document.querySelector(e);
}

function getCookie(cname)
{
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) 
  {
    let c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
  return "";
}

function loads(cid)
{
    let
    timer=null,
    page=1,
    maxpage=10,
    baseurl='/load/'+cid+'/',
    wait=50,
    addNum=0,
    st=document.querySelector('dl'),
    innerWidth = window.innerWidth,
    innerHeight = window.innerHeight,
    body=document.body,
    more=ds('mark'),
    agent=getCookie('agent');

    fetch('/jres').then(res => {
        res.json().then((r)=>{
            let data =  r.data;  
            // 创建header元素
            createHeader(data['urls'],data['name']); 
            window.onresize=function(){
                innerWidth = window.innerWidth;
                createHeader(data['urls'],data['name']);
            };

            ds('input').onkeypress=function (event) {
                if (event.keyCode==13)
                {
                    console.log(this.value);
                    self.location.href = "/special/" + this.value
                    return false;
                }
            };
            
            if (data['ad']) {
                insertAd(data['ad']);
                showAd(data['ad']);
                window.addEventListener("scroll",
                    function() {
                        insertAd(data['ad']);
                });
            }
        })
    })
    delDd();
    if (more) {
        more.onclick = function() {
            more.parentNode.className='all';
            more.remove();
        }
    }
    window.addEventListener("scroll",
        function() {
            clearTimeout(timer); 
            timer = setTimeout(insertDd, 500);
            delDd();
        }
    );
    //删除DD元素
    function delDd() 
    {
        let em = document.querySelectorAll('dl b');
        if (em==null) {
            console.log('没有对应的删除按钮');
            return false
        }

        for(var i = 0;i<em.length;i++){
            em[i].index = i;
            em[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
    //创建header元素
    function createHeader(urls,name) 
    {
        let 
        header=ds('header'),
        aside=ds('aside');
        if (innerWidth>750  && body.id!="pc") {
            header.innerHTML='';
            aside.className='';
            body.id="pc";
            let nav = document.createElement("nav");
            nav.innerHTML='<span>性福的家</span>';
            for (i = 0; i < name.length; i++) {
                nav.innerHTML+='<a  href="/'+urls[i]+'" >'+name[i]+'</a>';
            }
            nav.innerHTML+='<input type="text" placeholder="搜索相关内容">';
            header.appendChild(nav);
            // console.log(body.id);
        } 
        if(innerWidth<=750 && body.id!="mobi") {
            header.innerHTML='';
            body.id="mobi";
            aside.className='hidden';
            let so = document.createElement("div");
            so.id='so';
            so.innerHTML+='<a href="/">首页</a><input type="text" placeholder="搜索相关内容" ><span>搜索</span>';
            let nav = document.createElement("nav");
            nav.id='nav';
            let container = document.createElement("div");
                container.className='swiper-container';
            let wrapper = document.createElement("div");
                wrapper.className='swiper-wrapper';
            for (i = 0; i < name.length; i++) {
                wrapper.innerHTML+='<a class="swiper-slide" href="/'+urls[i]+'" >'+name[i]+'</a>';
            }
            container.appendChild(wrapper);
            nav.appendChild(container);
            header.appendChild(so);
            header.appendChild(nav);
            // 如果cid不为数字则cid=0
            if (isNaN(cid)) {cid=0;}
            let swiperDo = document.createElement("script");
                swiperDo.innerHTML='var swiper = new Swiper(".swiper-container", {initialSlide:'+cid+',slidesPerView: "auto",spaceBetween: 0,loop: true,});'
            body.appendChild(swiperDo);     
        }
    }

    function showAd(ad) {
        let ads = createAd(ad,'dd');
        let t= null;
        if (window.innerWidth < 750) {
            let html = document.createElement("dialog");
            let sp = document.createElement("span");
                ads.appendChild(sp);

            setTimeout(show,5000);
            function show() {
                html.appendChild(ads);
                body.appendChild(html);
                t=setInterval(countDown,1000);

                ds('dialog b').onclick=function () {
                    body.removeChild(html); 
                    clearInterval(t);
                }
            }

            function countDown(){
                if (wait>0) {
                    ds('dialog span').innerHTML=wait+'秒后关闭';
                    wait--;
                } else {
                    body.removeChild(html); 
                    clearInterval(t);
                }
            }
        }
    }

    //插入广告
    function insertAd(ad) 
    {
        let dd = document.querySelectorAll('dd');
        if (innerWidth<=750) {

            for (var i = addNum*3; i < dd.length; i++) {
                if ((i+1)%3==0) {
                    addNum++;
                    dd[i].innerHTML='';
                    dd[i].appendChild(createAd(ad,'div'));
                    let b = document.createElement("b");
                    b.innerHTML='x';
                    dd[i].appendChild(b);
                    // console.log('正在加载第'+addNum+'条广告');
                }
                i++;
            }
        }
    }

    function createAd(ad,sp='div')
    {
        let r = ad[Math.floor(Math.random()*ad.length)];
        let rr = r.split('|');
        let html = document.createElement(sp);
        if (sp=='dd') {
            let b = document.createElement("b");
            b.innerHTML='x';
            html.appendChild(b);
        }
        let script = document.createElement("script");
            script.type="text/javascript";
        switch (rr[0]){
            case "1":
                script.src="//www.smucdn.com/smu0/o.js";
                script.setAttribute('smua',"d=m&s=b&u="+rr[1]+"&h=120");
                html.appendChild(script);
            break;
            case "2":
                script.src="https://static.apptrack.cn/js/b.js?id="+rr[1]+"&zz=1276002349";
                html.appendChild(script);
            break;
            case "3":
                script.innerHTML="var sogou_ad_id="+rr[1]+";var sogou_ad_content_height=120;";
                let script2=document.createElement("script");
                    script2.type="text/javascript";
                    script.src="https://theta.sogoucdn.com/wap/js/wp.js";
                html.appendChild(script);
                html.appendChild(script2);
            break;
        }
        return html;
    }

    //插入dd元素
    function insertDd() 
    {
        let height = st.offsetHeight + st.offsetTop-10;
        let scrollTop = (document.body.scrollTop || document.documentElement.scrollTop) + innerHeight;
         console.log(Math.ceil(scrollTop)+'->'+height);
        if (height <= Math.ceil(scrollTop) && page <= maxpage) {
            fetch(baseurl + page).then(res => {
                res.json().then((r)=>{
                    let data =  r.data.list; 
                    if (data) {
                        data.forEach((item, index, data) => { 
                            st.appendChild(createDd(item));
                        });
                    }
                })
            })
            page++;
        }
    }

    function createDd(data) 
    {
        let html = document.createElement("dd");
        if (agent) {
             html.innerHTML += '<a href="/article/' + data.id + '/'+agent+'.html"><h5>' + data.title + '</h5>';
        } else {
             html.innerHTML += '<a href="/article/' + data.id + '.html"><h5>' + data.title + '</h5>';
        }
        switch (data.i) {
        case '0':
            html.innerHTML += '<p>' + data.description + '</p>';
            html.innerHTML += '<i>' + data.update_time + '</i>';
            break;
        case '1':
            img = data.images.split(',');
            html.innerHTML += '<img  src="http://f.175.run/images/sex/' + img[0] + '!mobi">';
            html.innerHTML += '<span><p>' + data.description + '</p><i>' + data.update_time + '</i></span>';
            break;
        case '3':
            img = data.images.split(',');
            if (innerWidth>750) {
                html.innerHTML += '<img src="http://f.175.run/images/sex/' + img[0] + '!mobi">';
                html.innerHTML += '<span><p>' + data.description + '</p><i>' + data.update_time + '</i></span>';
            } else {
                for (i = 0; i < img.length; i++) {
                    html.innerHTML += '<img src="http://f.175.run/images/sex/' + img[i] + '!mobi">';
                }
                html.innerHTML += '<i>' + data.update_time + '</i>';
            }
            break;
        }
        html.innerHTML += '</a><b>×</b>';
        return html
    }
}
