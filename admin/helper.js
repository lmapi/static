/**
 * 更新一条数据
 * @param  {[type]} data [description]
 * @param  {String} url  [description]
 * @param  {String} type [description]
 * @return {[type]}      [description]
 */
function update(data,url='/curd/update',type='post') {
    $.ajax({
        url:url,
        type:type,
        data:data,
        success:function(re){
            layer.msg(re.msg); 
        },
        error:function(e){
            layer.msg('接口异常');  
        }
    }); 
}
/**
 * 删除一条或多条数据
 * @param  {Boolean} table [description]
 * @param  {[type]}  data  [description]
 * @param  {String}  url   [description]
 * @param  {String}  type  [description]
 * @return {[type]}        [description]
 */
function dels(table=false,data,url='/curd/dels',type='post') {
    if (table) {
        if(data.length > 0){
            $.ajax({
                url:url,
                type:type,
                data:{'table':table,'data':data},
                success:function(re){
                    layer.msg(re.msg)
                }
            });
        } else {
          layer.msg("请选择需要删除的数据！");
        }
    } else {
       layer.msg("缺少指定的数据表！"); 
    }
}
/**
 * 插入数据到数据库
 * @param  {Boolean} data [description]
 * @param  {String}  url  [description]
 * @param  {String}  type [description]
 * @return {[type]}       [description]
 */
function insert(data=false,url='/curd/insert',type='post') {
    if (data) {
        $.ajax({
            url:url,
            type:type,
            data:data,
            success:function(e){
                layer.msg(e.msg);
            },
            error:function(e){
                layer.msg('接口异常');
            }
        });
    } else {
        layer.msg("缺少数据！"); 
    }
}
/**
 * 弹出一个layer层
 * @param  {Boolean} url    [description]
 * @param  {String}  width  [description]
 * @param  {String}  height [description]
 * @return {[type]}         [description]
 */
function olay(url=false,width='200px',height='350px') {
    if (url) {
        layer.open({
            title:'添加',
            type: 2,
            shade: 0,
            area: [width,height],
            content:url,
            zIndex: layer.zIndex, 
            success: function(layero){
                layer.setTop(layero); 
            }
        });
    } else {
        layer.msg("缺少指定表单！"); 
    }

}

/**
 * 动态获取菜单列表
 * @return {[type]} [description]
 */
function menu() {
    layui.use(['form'], function(){
        var form = layui.form;
        $.ajax({url:"/data/menu?pid=`0`",
            success:function(result){
                 var html = '<select name="pid"  lay-filter="select_menu" >';
                    html+='<option value="">顶级分类</option>';
                    for(var i = 0; i < result.data.length; i++) {
                        html += '  <option value="' + result.data[i].id + '">' + result.data[i].name + '</option>';
                    }
                    html+='</select>';
                $("#menu").html(html);
                form.render('select');
            }
        });
    });
}
/**
 * 动态获取系统配置列表
 * @return {[type]} [description]
 */
function system() {
    layui.use(['form'], function(){
        var form = layui.form;
        $.ajax({url:"/data/system?pkey=top",
            success:function(result){
                 var html = '<select name="pkey"  lay-filter="select_system" >';
                    html+='<option value="top">配置项</option>';
                    for(var i = 0; i < result.data.length; i++) {
                        html += '  <option value="' + result.data[i].key + '">' + result.data[i].value + '</option>';
                    }
                    html+='</select>';
                $("#system").html(html);
                form.render('select');
            }
        });
    });
}

/**
 * 动态获取站点列表
 * @return {[type]} [description]
 */
function site() {
    layui.use(['form'], function(){
        var form = layui.form;
        $.ajax({url:"/data/site?status=1",
            success:function(result){
                var html = '<select name="site_id"  lay-filter="select_site" lay-verify="required">';
                    html+='<option value="">站点</option>';
                    for(var i = 0; i < result.data.length; i++) {
                        html += '  <option value="' + result.data[i].site_id + '">' + result.data[i].site_name + '</option>';
                    }
                    html+='</select>';
                $("#site").html(html);
                form.render('select');
            }
        });
    });
}
/**
 * 动态获取渠道列表
 * @param  {String} site [description]
 * @return {[type]}      [description]
 */
function qudao(site='') {
    layui.use(['form'], function(){
        var form = layui.form;
        $.ajax({url:"/data/qudao?status=1&site_id="+site,
            success:function(result){
                var html= '<select name="qudao_id"  lay-filter="select_qudao" lay-verify="required">';
                    html+='<option value="">渠道</option>';
                    for(var i = 0; i < result.data.length; i++) {
                        html += '  <option value="' + result.data[i].qudao_id + '">' + result.data[i].qudao_name + '</option>';
                    }
                    html+='</select>';
                $("#qudao").html(html);
                form.render('select');
            }
        });
    });
}

/**
 * 获取昨天的年月日
 * @return {[type]} [description]
 */
function getdate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate()-1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}