<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>全网通营销管理后台-移动版</title>
    <link rel="stylesheet" type="text/css" href="/static/js/layout/themes/bootstrap/easyui.css">
<!--    <link rel="stylesheet" type="text/css" href="/static/js/layout/themes/mobile.css">-->
    <link rel="stylesheet" type="text/css" href="/static/js/layout/themes/icon.css">
    <script type="text/javascript" src="/static/js/jquery.min.js"></script>
    <script type="text/javascript" src="/static/js/layout/jquery.easyui.min.js"></script>
<!--    <script type="text/javascript" src="/static/js/layout/jquery.easyui.mobile.js"></script>-->
    <script type="text/javascript" src="/static/js/layout/locale/easyui-lang-zh_CN.js"></script>
</head>
<body>


<table id="dg" title="游戏规则列表" class="easyui-datagrid" style="width:100%;height:100%"
       url="/editor/get_user_data"
       toolbar="#toolbar"
       rownumbers="true" fitColumns="true" singleSelect="true">
    <thead>
    <tr>
        <th field="id" width="50">id</th>
        <th field="gid" width="50">gid</th>
        <th field="title" width="100">标题</th>
        <th field="content" width="550">内容</th>
    </tr>
    </thead>
</table>
<div id="toolbar">
    <a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newGameRule()">增加规则</a>
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editGameRule()">编辑规则</a>
    <a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="deleteGameRule()">移除规则</a>
</div>


<div id="dlg" class="easyui-dialog" style="width:400px;height:280px;padding:10px 20px"
     closed="true" buttons="#dlg-buttons">
    <div class="ftitle">游戏规则</div>
    <form id="fm" method="post">
        <div class="fitem">
            <label>gid:</label>
            <input name="gid" class="easyui-validatebox" required="true">
        </div>
        <div class="fitem">
            <label>title:</label>
            <input name="title" class="easyui-validatebox" required="true">
        </div>
        <div class="fitem">
            <label>content:</label>
            <textarea name="content"></textarea>
        </div>
    </form>
</div>
<div id="dlg-buttons">
    <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="updateGameRule()">Save</a>
    <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">Cancel</a>
</div>

</body>
</html>
<script>




    var url = null;
    
    function newGameRule() {
        $('#dlg').dialog('open').dialog('setTitle','新游戏规则');
        $('#fm').form('clear');
        url = '/editor/create_game_data';
    }
    
    function editGameRule() {
        var row = $('#dg').datagrid('getSelected');
        if (row){
            $('#dlg').dialog('open').dialog('setTitle','编辑游戏规则');
            $('#fm').form('load',row);
            url = '/editor/update_game_data?id='+row.id;
        }
    }

    function deleteGameRule() {
        var row = $('#dg').datagrid('getSelected');
        var controUrl = '/editor/delete_game_data';
        $.messager.confirm('温馨提示', '确定删除该条数据吗？', function(r){
            if (r){

                $.ajax({
                    url: controUrl,// 跳转到 action
                    data: {
                        id: row.id
                    },
                    type: 'post', //用post方法
                    cache: false,
                    dataType: 'json',//数据格式为json,定义这个格式data不用转成对象
                    success: function (data) {
//                        data = eval('('+data+')');
                        if (data.code != 200){
                            $.messager.show({
                                title: 'Error',
                                msg: '异常'
                            });
                        } else {
                            $('#dg').datagrid('reload');	// reload the user data
                        }
                    },
                    error: function () {
                        alert(2);
                    }
                });

            }
        });
    }

    function updateGameRule() {
        $('#fm').form('submit',{
            url: url,
            onSubmit: function(){
                return $(this).form('validate');
            },
            success: function(data){

                data = eval('('+data+')');
                console.log(data);
                if (data.code != 200){
                    $.messager.show({
                        title: 'Error',
                        msg: '异常'
                    });
                } else {
                    $('#dlg').dialog('close');		// close the dialog
                    $('#dg').datagrid('reload');	// reload the user data
                }
            }
        });
    }
    
    
    
</script>