layui.use(['layer','element'], function(){
    var layer = parent.layer === undefined ? layui.layer : top.layer,
        element = layui.element;
    $("#nav p").click(function(){
        layer.open({
            type: 2
            ,title:$(this).text()
            ,id:$(this).text()
            ,shade: 0
            ,maxmin:true
            ,resize:true
            ,area: [$(this).attr('width')+'px',$(this).attr('height')+'px']
            ,content: $(this).attr('url')
            // ,btn: ['刷新']
            // ,btn1: function(index){
            //     console.log('layui-layer-iframe'+index)
            //     window['layui-layer-iframe'+index].location.reload();//刷新当前层数据
            //     return false //禁制关闭本层
            // }
            ,zIndex: layer.zIndex //重点1
            ,success: function(layero){
                layer.setTop(layero); //重点2
            }
            // ,end:function(){
            //     parent.location.reload()
            // }
        });
    });
})

$("#nav").css("height",$(window).height()-56);
$("#wrap").css("height",$(window).height()-56);
$("#wrap").css("width",$(window).width()-168);
$(window).resize(function(){
    $("#nav").css("height",$(window).height()-56);
    $("#wrap").css("height",$(window).height()-56);
    $("#wrap").css("width",$(window).width()-168);
});
$("dt:first").addClass("this")
$("dt:first~dd").addClass("show")
$("#nav dt").click(function () {
    $(this).toggleClass("this")
    $(this).nextAll().toggleClass("show")
})
$("#nav dd").click(function () {
    $("#nav dd").removeClass("this")
    $(this).toggleClass("this")
})

$("#refresh").click(function () {
    parent.location.reload()
})
