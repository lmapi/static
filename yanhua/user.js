
function getStor(type,key,call) {

	if (type=='del') {
		window.frames[0].postMessage(JSON.stringify({type:type,key:key,value:call}),'*');
		return false;
	} 

    window.onload = function(){
        window.frames[0].postMessage(JSON.stringify({type:type,key:key}),'*');
    }
    window.addEventListener('message', e=>{
    	call(e);
    }, false);
}

switch(action){

	case 'member':
		http(api+'pull',{sup:uinfo.id},e=>{vfor('tbody',e.data);
			$('#user td>i').click(e=>{
				console.log(e.target.dataset);
				let html ='<div class="layer_b"></div><form class="layer_f">';

				if (u.type==5) {
					html+='<div><span>类型</span><select name="type"><option value="">默认</option><option value="3">渠道</option><option value="4">代理</option></select></div>';
					html+='<div><span>扣量</span><input type="text" name="kl" value="'+e.target.dataset.kl+'"></div>';
				}
				if (u.type==4) {
					html+='<div><span>类型</span><select name="type"><option value="">默认</option><option value="3">渠道</option></select></div>';
				}
				html+='<div><span>分成</span><input type="text" name="fc" value="'+e.target.dataset.fc+'"></div>';
				html+='<button type="button">确定</button>';
				html+='</form>';
				$('body').append(html)

				$('button').click(function(){
					let up = $("form").serializeArray()
					
					where = {'id':e.target.dataset.id}
					let fc = parseInt($("input[name=fc]").val());
					if ( fc > u.fc) {
						msg('分成最大不能超过:'+u.fc);
					} else {
						http(api+'push',up,r=>{
							console.log(r);
							if (r.code==200) {
								$('.layer_b').remove()
								$('.layer_f').remove()
								msg('设置成功',true,1)
							}
						},{table:'user',where:JSON.stringify(where)})
					}
				})

			});
		},{table:'user',cols:'id,nickname,type,create_time,fc,kl',after:'user',page:1});

	break;

	case 'favorite':
	getStor('get','favorite',e=>{
        var data = e.data.split(',').slice(0,-1);
        console.log(data);
		let html='<tbody>';
		for(i of data){
			let v = i.split('|');
            html +='<tr><td><a href="//novel.'+mhost+'/novel/'+v[0]+'">'+v[1]+'</a></td>';
            html +='<td>'+v[2]+'</td>';
            html +='<td class="del" data-v="'+i+'">删除</td></tr>';
		}
        html +='</tbody>';
        $('thead').after(html);

        $('.del').click(function(e){

        	$(this.parentNode).remove();
        	getStor('del','favorite',e.target.dataset.v);
        });
	})
	break;
	case 'history':
		getStor('get','history',e=>{
	        var history = e.data.split(',').slice(0,-1);
			for(i of history){
				let v = i.split('|');
		        let html ='<li><a href="//novel.'+mhost+'/chapter/'+v[0]+'/'+v[1]+'"><img src="'+v[4]+'"></a>';
		        html +='<a href="//novel.'+mhost+'/chapter/'+v[0]+'/'+v[1]+'">';
		        html +='<p>'+v[5].substring(0,119)+' <span>2小时</span></p>';
		        html +='<em>'+v[3]+' | '+v[2]+'K字</em>';
		        html +='<em>阅读到 : '+v[7]+'</em>';
		        html +='<em>更新到 : '+v[6]+'</em></a></li>';
		        $('ul').append(html)
			}
		})
	break;
	case 'points':
	http(api+'pull',{uid:uinfo.id,type:get('type')},e=>{vfor('tbody',e.data);},{table:'points',after:'points',page:1});
	break;
	case 'subs':
	http(api+'pull',{sup:uinfo.id},e=>{vfor('tbody',e.data);},{table:'user',cols:'id,nickname,type,create_time',after:'user',page:1});
	break;
	case 'orders':
	http(api+'pull',{uid:uinfo.id},e=>{vfor('tbody',e.data);},{table:'rebate',page:1});
	break;
	case 'withdraw':
	http(api+'pull',{uid:uinfo.id},e=>{vfor('tbody',e.data);},{table:'withdraw_log',after:'wd',page:1});
	break;
}

function editinfo() {

	let	d = $("form").serializeArray();
	let data={};
	for(var i of d){
		data[i['name']]=i['value']
	}

	http(api+'push',data,e=>{
		if (e.code==200) {
			Cookies.set('user',e.data,{expires:0.5,domain:mhost});
			msg('修改成功',true,1)
		} else {
			msg(e.msg);
		}
	},{table:'user',before:'checkuser',where:JSON.stringify({id:uinfo.id})})
}

function eye(e) {
	$(e).toggleClass('icon-eye1');
	if ($(e).attr('class').search("eye1") != -1) {
		$("input[name='password']").attr('type','text')
	} else {
		$("input[name='password']").attr('type','password')
	}
}

function register() {
	data = $("form").serializeArray();
	data.push({name:'sup',value:sup});
	post(api+'/register',data,e=>{
		console.log(e);
		msg(e.msg);
		if (e.code==200) {
			if (e.data.type<3) {
				Cookies.set('last',(new Date()).getTime(),{expires:30,domain:mhost});
				Cookies.set('sup',e.data['id'],{expires:30,domain:mhost});
				Cookies.set('user',e.data,{expires:0.5,domain:mhost});
				msg(e.msg,'/');
			} 
		}
	})
}

function login() {
	let data = $("form").serializeArray();
    let last = (new Date()).getTime();


   //  $.ajax({
   //      type: 'post',
   //      url: api+'login',
   //      headers:{last:last},
   //      dataType: 'json',
   //      data: data,
   //      beforeSend:function(xhr){
   //          $('body').append('<div class="loading"><div class="sk-bounce-1 sk-child"></div><div class="sk-bounce-2 sk-child"></div><div class="sk-bounce-3 sk-child"></div></div>');
   //      },
   //      success:e => {
   //          $(".loading").remove();
			// if (e.code==200 ) {
			// 	Cookies.set('sup',e.data['id'],{expires:30,domain:mhost});
			// 	Cookies.set('last',last,{expires:30,domain:mhost});
			// 	Cookies.set('user',e.data,{expires:0.5,domain:mhost});
			// 	msg(e.msg,'/');
			// } else {
			// 	msg(e.msg);
			// }
   //      },
   //  });




	post(api+'login',data,e=>{
		if (e.code==200 ) {
			Cookies.set('sup',e.data['id'],{expires:30,domain:mhost});
			Cookies.set('last',last,{expires:30,domain:mhost});
			Cookies.set('user',e.data,{expires:0.5,domain:mhost});
			msg(e.msg,'/');
		} else {
			msg(e.msg);
		}
	},{last:last})
}

function logout() {
	Cookies.remove('last',{domain:mhost});
	Cookies.remove('sup',{domain:mhost});
	Cookies.remove('user',{domain:mhost});
	msg('注销成功',false,1);
	location.href = '//novel.'+mhost
}

function exchange() {
	http(api+'exchange',{uid:uinfo.id},e=>{msg(e.msg)});
}

function withdraw() {
	http(api+'withdraw',{uid:uinfo.id},e=>{
        if (e.code==200) {msg(e.msg,true,1)}
        if (e.code==222) {msg(e.msg,'info',1)}
        if (e.code==-1) {msg(e.msg,false,1)}
	})
}


function pay2(gid,name,amount,days) {
let pay_bankcode = $('input:checked').val(),str='';
if (pay_bankcode==undefined) {msg('请选择支付渠道');return;} 
let con = {
    pay_amount:amount,
    pay_applydate:getDate(),
    pay_bankcode:pay_bankcode,
    pay_callbackurl:"http://user."+mhost+"/payed",
    pay_memberid:'10070',
    pay_notifyurl:"http://api."+mhost+"/payed",
    pay_orderid:uinfo.phone+'-'+(new Date()).valueOf().toString().slice(-5),
}
for(var i in con) {
    str+= i+'='+con[i]+'&';
};
str+='key=vqljp03dueox5xigt1wqamsa6jmq5ig5';
con.pay_md5sign = md5(str).toUpperCase();
con.pay_attach = uinfo.id+'|'+gid+'|'+pay_bankcode+'|'+days;
con.pay_productname =name;

PostJump('http://jh.yujindz.cn/Pay_Index.html',con)
}



function vip(gid,amount) {
	let gp_type = $('input:checked').val()
	let order = (new Date()).valueOf();
	if (gp_type==undefined) {
		msg('请选择支付方式')
	} else {
		let data = {uid:uinfo.id,type:1,gid:gid,price:amount,gp_type:gp_type,order:order}
		http(api+'pay',data,e=>{
    		if (e.code!==200) {
    			msg(e.msg);
    		} else {
	        	data = JSON.parse(e.data);
	        	$('#user').append('<div class="mask"><div class="code"><img src="http://www.liantu.com/api.php?el=M&m=10&w=240&text='+data['qrcode']+'"/><p style="color:red">本次支付金额为 <b>'+parseInt(data['money'])/100+' </b>元</p><p>务必在3分钟内完成支付</p><p>请扫码支付，或者截屏后支付</p></div>')
	        	let timer = window.setInterval(function(){
	        		if (parseInt((new Date()).valueOf()) >= parseInt(order)+60*1000) {
	        			console.log(parseInt(order))
	        			clearInterval(timer);
	        			$('.mask').remove()
	        			msg('支付超时')
	        			document.referrer == ""?location.href = "/user":location.href=document.referrer;
	        		} else {
	        		http(api+'order',{order:order},e=>{
	        			console.log(e)
	        			if (e.data=='1') {
							$('.mask').remove()
	        				clearInterval(timer);
	        				pullUser(function(r){
	        					console.log(r)
	        					msg('支付成功');
	        					document.referrer == ""?location.href = "/user":location.href=document.referrer;
	        				});
	        			} else {
	        				console.log('待支付')
	        			}
	        		},false,false);
	        		}
	        	}, 5000);
    		}
		});
	} 
}