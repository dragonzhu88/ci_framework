function guid(){
	var S4=function(){return (((1+Math.random())*0x10000)|0).toString(16).substring(1);};
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()); 
}
//HTML5 Sortable
(function(e){var t,n=e();e.fn.sortable=function(r){var i=String(r);r=e.extend({connectWith:false},r);return this.each(function(){if(/^enable|disable|destroy$/.test(i)){var s=e(this).children(e(this).data("items")).attr("draggable",i=="enable");if(i=="destroy"){s.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s")}return}var o,u,s=e(this).children(r.items);var a=e("<"+(/^ul|ol$/i.test(this.tagName)?"li":"div")+' class="sortable-placeholder">');s.find(r.handle).mousedown(function(){o=true}).mouseup(function(){o=false});e(this).data("items",r.items);n=n.add(a);if(r.connectWith){e(r.connectWith).add(this).data("connectWith",r.connectWith)}s.attr("draggable","true").on("dragstart.h5s",function(n){if(r.handle&&!o){return false}o=false;var i=n.originalEvent.dataTransfer;i.effectAllowed="move";i.setData("Text","dummy");u=(t=e(this)).addClass("sortable-dragging").index()}).on("dragend.h5s",function(){if(!t){return}t.removeClass("sortable-dragging").show();n.detach();if(u!=t.index()){t.parent().trigger("sortupdate",{item:t})}t=null}).not("a[href], img").on("selectstart.h5s",function(){this.dragDrop&&this.dragDrop();return false}).end().add([this,a]).on("dragover.h5s dragenter.h5s drop.h5s",function(i){if(!s.is(t)&&r.connectWith!==e(t).parent().data("connectWith")){return true}if(i.type=="drop"){i.stopPropagation();n.filter(":visible").after(t);t.trigger("dragend.h5s");return false}i.preventDefault();i.originalEvent.dataTransfer.dropEffect="move";if(s.is(this)){if(r.forcePlaceholderSize){a.height(t.outerHeight())}t.hide();e(this)[a.index()<e(this).index()?"after":"before"](a);n.not(a).detach()}else if(!n.is(this)&&!e(this).children(r.items).length){n.detach();e(this).append(a)}return false})})}})(jQuery);

$.extend({  
	includePath: '',  
	include: function(file) {  
        var files = typeof file == "string" ? [file]:file;  
        for (var i = 0; i < files.length; i++) {  
            var name = files[i].replace(/^\s|\s$/g, "");  
            var att = name.split('.');  
            var ext = att[att.length - 1].toLowerCase();  
            var isCSS = ext == "css";  
            var tag = isCSS ? "link" : "script";  
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";  
            var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";  
            if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");  
        }  
	}  
});

$.include(['static/js/layout/plugins/jquery.toolbar.js','static/js/layout/plugins/datagrid-groupview.js','static/js/layout/plugins/datagrid-detailview.js']);
$.include(['static/js/datetime.js','static/js/ace/ace.js','static/js/base64.min.js']);
$.include(['static/js/plupload/plupload.full.min.js','static/js/plupload/jquery.plupload.queue/jquery.plupload.queue.min.js','static/js/plupload/jquery.plupload.queue/css/jquery.plupload.queue.css','static/js/plupload/i18n/zh_CN.js']);
$.include(['static/js/editor/ueditor.config.js','static/js/editor/ueditor.all.min.js']);
$.include(['static/js/bootstrap/css/bootstrap-tagsinput.css','static/js/bootstrap/js/bootstrap-tagsinput.min.js','static/js/bootstrap/js/typeahead.bundle.js','static/js/bootstrap/js/bootstrap-switch.min.js']);
//$.include(['static/js/aci-tree/css/aciTree.css','static/js/aci-tree/js/jquery.aciPlugin.min.js','static/js/aci-tree/js/jquery.aciTree.min.js','static/js/aci-tree/js/jquery.aciSortable.min.js']);
$.include(['static/js/mqttws.js','static/js/layer/layer.js','static/js/layer/extend/layer.ext.js','static/js/layer/laydate/laydate.js']);
$.include(['static/js/rs-plugin/js/jquery.themepunch.plugins.min.js','static/js/rs-plugin/js/jquery.themepunch.revolution.min.js','static/js/rs-plugin/css/pi.settings.css','static/css/common.css']);
$.include(['static/js/chart/highcharts.js','static/js/chart/highcharts-3d.js']);
$.include(['static/js/photoeditor/js/imglykit.min.js','static/js/photoeditor/css/imglykit-night-ui.min.css']);

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

$(function() {
	Core.init();
});
var Core={
	init: function(){
		$('#sysmenu').accordion({height:$(window).height()-140,border:false});
		this.updateMenu('public');
		this.openSocket();
	},
	contextMenu: function(){
		$('#task .tabs-inner').bind('contextmenu',function(e){
			e.preventDefault();
			$('#mm').menu('show', {
				left: e.pageX,
				top: e.pageY
			});
		});
	},
	openSocket: function(){
		var client, destination;
		var host = 'localhost';    
		var port = '61614';
		var clientId = Math.random().toString(36).slice(-12);
		destination = 'u/demo';
		client = new Messaging.Client(host, Number(port), clientId);
		client.onConnect = function(){
			console.log("connected to server");
			client.subscribe(destination);
		};
		client.onMessageArrived = function(message){
			console.log(message.payloadString);
			var m = eval('('+message.payloadString+')');
			//if($.inArray(m.to_user,ACCOUNTS)==-1) return;
			layer.open({type: 1,title:m.title,shade: [0],offset: 'rb',time: 3000,shift: 2,content: '<p style="padding:15px">'+m.name+'</p>'});
			/**if(m.title.indexOf('网页')==-1){return;
				Core.dialog('新消息','member/editinbox?id='+m.msg_id,function(){
					//$(__).datagrid('reload');
				},true,false,function(dlg){
					dlg.find('[name=reply_type]').val($('#reply_type').is(':checked')?1:2);
					var s=[];
					$.each($('.'+($('#reply_type').is(':checked')?'textBox':'textPicBox')).find('.panel'),function(i,d){
						var ue = dlg.find('[name=reply_type]').val()==1?UE.getEditor($(d).find('.text').attr('id')).getContent():$(d).find('.text').val();
						s.push({link:$(d).find('.link').val(),image:$(d).find('.image').length>0?$(d).find('.image').val():'',text:ue});		
					});
					dlg.find('[name=reply_text]').val(JSON.stringify(s));
					return true;
				});
			}**/
		};
		client.onConnectionLost = function(responseObject){
			console.log('disconnect from server');
		};
		client.connect({onSuccess:client.onConnect, onFailure:function(){
			console.log('can not connect to server');
		}}); 
	},
	changePlatform: function(e,v){
		$('.nav-platforms a').removeClass('active');
		$(e).addClass('active'); 
		Core.updateMenu(v);
	},
	
	//usage: Core.copy($('a.btn'), 'TEXT');
	copy:function(obj,txt){
		var client = new ZeroClipboard(obj);
		client.on('ready', function(event){
			client.on('copy', function(event) {
				event.clipboardData.setData('text/plain', txt);
			});
			client.on('aftercopy', function(event) {
				Core.ok('内容已经成功复制到剪贴板!',true);
			});
		});
	},
	removeMenu: function(){
		var panels = $('#sysmenu').accordion('panels'),s=[]; 
		$.each(panels,function(i,d){
			s.push(d.panel('options').title);
		});
		for(var i=s.length-1;i>=0;i--) $('#sysmenu').accordion('remove',s[i]);
	},
	//更新菜单
	updateMenu: function(type){
		var barr=[];
		$.getJSON('welcome/getmenu?type='+type,function(c){
			$.each(c,function(i,d){
				var arr=[];
				$.each(d.submenu,function(k,s){
					arr.push('<li><a href="javascript:;" url="'+s.url+'?auth='+s.auth+'" onclick="Core.browse(this)">'+s.name+'</a></li>');
				});
				$('<ul class="submenu fadein-left '+d.en_name+'">'+arr.join('')+'</ul>').appendTo('#submenu');
				barr.push('<a href="javascript:;" en_name="'+d.en_name+'">'+d.name+'</a>');
			});
			$('#menuList').html(barr.join(''));
			$('.submenu').eq(0).css('display','block');
			$('#menuList>a').click(function(){
				var _=$(this).attr('en_name');
				$('.submenu').css('display','none');
				$('.'+_).css('display','block');
				$('.submenu a').click(function(){$('.submenu a').css('color','#000000');$(this).css('color','red')});
			});
		});
	},
	refresh: function(){
		var tab = $('#task').tabs('getSelected');
		if(tab!=null){
			tab.panel('refresh');
		}
	},
	browse: function(e){
		var name = $(e).text();
		$('#sysmenu li.current').removeClass('current');
		$(e).addClass('current');
		this.addTab(name,$(e).attr('url'));
	},
	closeTab: function(title){
		$('#task').tabs('close',title);
	},
	closeCurrent: function(){
		var tab = $('#task').tabs('getSelected');
		$('#task').tabs('close',$('#task').tabs('getTabIndex',tab));
	},
	closeAll: function(){
		$('#task .tabs-close').each(function(){
			$(this).click();
		});
	},
	closeOthers: function(){
		var tab = $('#task').tabs('getSelected');
		$('#task .tabs-close').each(function(){
			if($(this).parent().text()!=tab.panel('options').title) $(this).click();
		});
	},
	addTab: function(name,url,ok,edit){
		var tabExist = $('#task').tabs('getTab',name);
		if(tabExist==null){
			$('#task').tabs('add',{
				title: name,
				cache: true,
				href:url,
				closable:true,
				onLoad:function(panel){
					var tab = $('#task').tabs('getSelected');
					Core.bindPostForm(tab,ok);
					Core.contextMenu();
				}
			});
		}else{
			$('#task').tabs('select',name);
			//this.refresh();
		}
	},
	bindPostForm: function(t,ok){
		var f=t.panel('body').find('form');
		f.find('[type=submit]').click(function(){
			f.form('submit',{
				ajax:true,
				url: f.attr('action'),
				onSubmit:function(){
					return $(this).form('enableValidation').form('validate');
				},
				success: function(c){
					if(ok!=undefined && typeof(ok)=='function') ok(t);
				}
			});
			return false;
		});
	},
	ok: function(msg,pos){
		layer.msg(msg,{shift:3});
	},
	error: function(msg,pos){
		layer.msg(msg,{shift:6});
	},
		dialog: function(title,url,callback,ajax,width,before,onLoad,dlgId,dismissFunc){
		var id = dlgId?dlgId:'modal';
		var dlg=$('#'+id);
		dlg.remove();
		if (typeof width == "boolean" && width) {
		    width = '80%';
        }
		dlg = $('<div class="modal fade" id="'+id+'" data-backdrop="static" >'+
				  '<div class="modal-dialog" style="'+(width?'width:'+width:'')+';margin-top:10%;">'+
				  '<div class="modal-content">'+
				  '<div class="modal-header">'+
				  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
				  '<h4 class="modal-title" style="text-align: center;">'+title+'</h4></div>'+
				  '<div class="modal-body"></div>'+
				  '<div class="modal-footer">'+
				  '<button class="btn btn-default dismiss cancel" type="button" data-dismiss="modal">取消</button>'+
				  '<button class="btn btn-danger save confirm" type="button">确定</button>'+
				  '</div></div></div></div>').appendTo('body');
		dlg.find('.modal-body').html(ajax?'Loading...':url);
		dlg.modal('show', {backdrop: 'static'});
		dlg.find('.dismiss').click(function(){
			if(typeof(dismissFunc)=='function') dismissFunc();
		});
		if(ajax){
			$.get(WEB+url+(url.indexOf('?')==-1?'?':'&')+'time='+new Date().getTime(),function(c){
				dlg.find('.modal-body').html(c);
				$.parser.parse(dlg.find('.modal-body'));
				dlg.find('button.save').unbind('click').bind('click',function(event){
					if(typeof before == 'function') if(!before(dlg)) return;
					if(dlg.find('form.validate').length<1){//不需要提交表单
						if(typeof callback == 'function') callback(dlg);
						dlg.modal('hide');
					}else{//需要提交表单
						dlg.find('form.validate').form('submit',{
							ajax:true,
							success: function(response){
								response=eval('('+response+')');
								if(response.status=='OK'){
									Core.ok('成功保存数据!',true);
									setTimeout(function(){
										dlg.modal('hide');
										if(typeof callback == 'function') callback(dlg);
									},500);
								}else{
									Core.error('保存数据失败 '+response.msg,true);
								}
							}
						});
					}
					event.preventDefault();
				});
				if(typeof onLoad =='function') onLoad(dlg);
			});
		}else{
			if(typeof onLoad =='function') onLoad(dlg);
			if(typeof before == 'function') if(!before(dlg)) return;
			dlg.find('button.save').unbind('click').bind('click',function(){
				if(typeof callback == 'function') if(callback(dlg)) dlg.modal('hide');
			});
		}
	},
	del: function(p){
		$.messager.confirm('温馨提示', '确定要删除选中记录？', function(r){
			if (r){
				var ss = [];
				var rows = $('#'+p.grid).datagrid('getSelections');
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
					ss.push(row.id);
				}
				$.post(p.url,{id:ss.join()},function(c){
					$('#'+p.grid).datagrid('reload');
				});
			}
		});
	},
	confirm:function(e,id,url,info){
		$.messager.confirm('温馨提示', (info==undefined?'确定要删除选中记录？':info), function(r){
			if (r){
				//$.post(p.url,{id:ss.join()},function(c){
					$('#'+e).datagrid('reload');
				//});
			}
		});
	},
	exit: function(){
		$.messager.confirm('温馨提示', '您确定退出吗？', function(r){
			if (r){
				$.get(WEB+'welcome/exit_sys',function(){setTimeout(function(){location.href=WEB;},200)});
			}
		});
	},
	//导出
	Export: function(param,url){
		$('#exportForm').remove();
		var input=[];
		if(typeof(param)=='string'){
			$.each(param.split('&'),function(i,d){
				var a=d.split('=');
				input.push('<input type=hidden name="'+a[0]+'" value="'+a[1]+'" />');
			});
		}else{
			for(var k in param){
				input.push('<input type=hidden name="'+k+'" value="'+param[k]+'" />');
			}
		}
		//layer.load('正在导出数据......');
		$('<div id="exportForm" style="display:none"><iframe name="exporter"></iframe><form method="post" target="exporter" action="'+WEB+url+'">'+input.join('')+'</form></div>').appendTo($('body')).find('form').submit();
	},
	/** Usage:
	Core.multiUploader('uploader',[{title : "Image files", extensions : "jpg,gif,png"}],'100mb',function(rs){
		alert(JSON.stringify(rs));
	});
	**/
	multiUploader: function(id,mime,maxSize,callback,resize){
		$("#"+id).pluploadQueue({
			runtimes : 'html5,flash,silverlight,html4',
			url : WEB+"/static/js/plupload/upload.php",
			chunk_size : '1mb',
			multi_selection:true,
			rename : false,
			dragdrop: true,
			filters : {max_file_size : maxSize,mime_types: mime},
			resize: resize,
			flash_swf_url : WEB+'/static/js/plupload/Moxie.swf',
			silverlight_xap_url : WEB+'/static/js/plupload/Moxie.xap',
			init:{
				FileUploaded: function(up, file, info){
					var rs = eval('('+info.response+')');
					if(rs.error!=undefined) tip(rs.error.message);
					else if(typeof(callback)=='function') callback(rs);
				}
			}
		});
	},
	/** Usage: 
	Core.singleUploader('uploadBtn',[{title : "Image files", extensions : "jpg,gif,png"}],'1mb',function(rs){
		alert(JSON.stringify(rs));
	},{width : 20,height : 20,quality : 100,crop: true});
	**/
	singleUploader: function(id,mime,maxSize,callback,resize){
		$('.fileList').remove();
		var fileList = $('<div class="fileList"></div>').appendTo($('#'+id).parent());
		var myUploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : id,
			multi_selection:false,
			resize: resize,
			url : WEB+"static/js/plupload/upload.php",
			filters : {max_file_size : maxSize,mime_types: mime},
			flash_swf_url : WEB+'/static/js/plupload/Moxie.swf',
			silverlight_xap_url : WEB+'/static/js/plupload/Moxie.xap',
			init: {
				FilesAdded: function(up, files) {
					plupload.each(files, function(file) {
						fileList.html('<span id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></span>');
					});
					myUploader.start();
				},
		 
				UploadProgress: function(up, file) {
					fileList.find('b').html('<span>' + file.percent + "%</span>");
				},
		 
				Error: function(up, err) {
					Core.error("\nError #" + err.code + ": " + err.message);
				},
				FileUploaded: function(up, file, info){
					var rs = eval('('+info.response+')');
					if(rs.error!=undefined) Core.error(rs.error.message);
					else{
						if(typeof(callback)=='function') callback(rs);
						if(rs.result.toLowerCase().indexOf('.jpg')!=-1 || rs.result.toLowerCase().indexOf('.jpeg')!=-1 || rs.result.toLowerCase().indexOf('.png')!=-1 || rs.result.toLowerCase().indexOf('.gif')!=-1 || rs.result.toLowerCase().indexOf('.bmp')!=-1){
							$.messager.confirm('编辑图片', '是否要编辑上传图片？', function(r){
								if(r){
									Core.editPhoto(rs.result);
								}
							});
						}
					}
					$('.fileList').remove();
				}
			}
		});
		myUploader.init();
	},
	editPhoto: function(rs){
		$('#dlgBox').remove();
		var dlg=$('<div id="dlgBox" class="easyui-dialog" title="编辑图片"><div id="altContent" style="width:750px;height:520px"></div></div>').appendTo('body');
		var kit;
		dlg.dialog({modal:true,onOpen:function(){
			var image = new Image();
			image.src = WEB+'../'+rs+'?'+new Date().getTime();
			image.onload = function () {
				container = document.querySelector("div#altContent");
				kit = new ImglyKit({
					image: image,
					container: container,
					assetsUrl: "static/js/photoeditor/assets",
					ui: {
						enabled: true,
						hideHeader:true,
						showExportButton: true,
						//export: {type: ImglyKit.ImageFormat.JPEG}
					},
					save: function(s){
						kit.render("data-url", "image/png").then(function (dataUrl) {
							$.ajax({type: "POST",url: WEB+"welcome/upload",data: {source:rs, image:dataUrl}}).done(function(o){
								$('img').each(function(){
									if($(this).attr('src').indexOf(rs)!=-1){
										$(this).attr('src',WEB+'../'+rs+'?'+new Date().getTime());
										return;
									}
								});
								setTimeout(function(){dlg.dialog('close');},200);
							});
						});
					}
				});
				kit.run();
			};
		}});
	}
};

(function($){
    var methods = {
        init: function(options){
			var params = $.extend({}, $.fn.DataSource.defaults, options);
			return this.each(function(){
				var __ = $(this);
				var config = {
					title: params.title?params.title:'',
					url: params.url,
					border:params.border?params.border:false,
					columns:params.fields,
					pagination:params.pagination==undefined?true:params.pagination,
					
					rownumbers:false,
					pageSize:50,
					singleSelect: params.edit?true:false,
					pageList:[50,100,150,200,300,400,500],
					idField:params.idField==undefined?'id':params.idField,
					sortName: params.sort==undefined ? 'id':params.sort,
					sortOrder:params.order==undefined ? 'desc':params.order,
					showFooter:params.footer==undefined ? false:params.footer,
					fit:params.height==undefined?true:false,
					height:params.height==undefined?'auto':params.height,
					frozenColumns:params.checkbox==undefined?[[{field:'ck',checkbox:true, hidden:params.noCheck?params.noCheck:false}]]:'',
					onClickRow: function(index,rs){
						if(typeof(params.onClickRow)=='function') params.onClickRow(index,rs);
					},
					dbclick: params.dbclick,
					onLoadSuccess:function(data){if(params.success) params.success($('#'+this.id),data)},
					onSelect:function(index,data){if(params.select) params.select(index,data)},
					onUnselect:function(index,data){if(params.unselect) params.unselect(index,data)},
					onRowContextMenu:function(e,index,data){if(params.onRowContextMenu) params.onRowContextMenu(e,index,data)}
				};
				if(config.dbclick==undefined || config.dbclick) config.onDblClickRow=function(index){
					$(this).datagrid('clearSelections').datagrid('selectRow',index);
					$(this).datagrid('getPanel').find('.icon-edit').parents('a').click();
				};
				$(this).datagrid(config).datagrid("addToolbarItem",{tools:params.tools,pager:params.pageTools});
			});
        },
		queryParams : function(){
			var obj=$(this);
			var arg = obj.datagrid('getPanel').find('.datagrid-toolbar form').serializeArray();
			var query = obj.datagrid('options').queryParams;
			$.each(arg,function(i,v){
				query[v.name]=v.value;
			});
			arg = obj.datagrid('getPanel').find('.datagrid-pager form').serializeArray();
			query = obj.datagrid('options').queryParams;
			$.each(arg,function(i,v){
				query[v.name]=v.value;
			});
			return query;
		},
		search: function(){
			var obj=$(this);
			obj.datagrid("clearSelections");
			obj.datagrid('loadData', {total:0,rows:[]}); //清空所有行
			var query=methods.queryParams.apply(this);
			obj.datagrid('options').queryParams=query;
			obj.datagrid('reload');	
		},
        add: function(args){
			args.add=false;
			methods.edit.apply(this,[args]);
		},
        edit: function(args){
			var row = $(this).datagrid('getSelected');
			if(args.add==undefined && !row){
				Core.error('请先选择要修改的条目！');return;
			}
			var id = !row?'':row.id;
			if(args.add==undefined && id==''){
				Core.error('此条目不支持编辑！',true);return;
			}
			var __ = this;
			Core.dialog(args.title,args.get+(args.get.indexOf('?')!=-1?'&':'?')+'id='+(args.add!=undefined?'':id),function(){
				$(__).datagrid('reload');
			},true,args.full?args.full:false,args.before,null,args.dlgId);
		},
        remove: function(args){
			var rows = $(this).datagrid('getSelections');
			if(!rows || rows.length<1){Core.error('请先选择要删除的条目！');return;}
			var id=[], __ = this;
			$.each(rows,function(i,d){id.push(d.id)});
			$.messager.confirm('温馨提示', '确实要删除已选中'+id.length+'条数据吗？', function(r){
				if (r){
					$.post(WEB+args.get,{id:id.join()},function(){
						Core.ok('成功删除数据！');
						$('#modal').modal('hide');
						$(__).datagrid('reload');
					});
				}
			});
		}
    };

    $.fn.DataSource = function(options) {
        if(methods[options]){
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof options==='object'||! options){
            return methods.init.apply( this, arguments );
        }else{
            $.error('Method '+ options +' does not exist on jQuery.tooltip');
        }    
    };
	$.fn.DataSource.defaults = {singleSelect:false};
})(jQuery);

(function($){
    var methods = {
        init: function(options){
			var params = $.extend({}, $.fn.authMenu.defaults, options);
			return this.each(function(){
				var __=$(this);
				__.html('');
				$.each(params.data,function(i,d){
					if(d.en_name!='STARTPAGE'){
						var isTopExist = false;
						$.each(params.auth,function(a,b){
							$.each(b,function(c,f){
								if(a==params.type && c==d.en_name){isTopExist = f;return;}
							});
						});
						var block = $('<div class="panel panel-default f_group" style="margin-bottom:10px"><div class="panel-heading" style="min-height:35px;border:1px solid #cecece"><div class="panel-title"> <input type=checkbox name="top_menu['+params.type+'][]" value="'+d.en_name+'" '+(isTopExist?'checked':'')+'> '+d.name+'</div></div><div class="panel-body"><table class="table"></table></div></div>').appendTo(__);
						$.each(d.submenu,function(k,s){
							var isSubExist = false;
							$.each(isTopExist,function(a,b){
								if(a==s.en_name){isSubExist = b;return;}
							});
							var tr = $('<tr><td class="r"><input type=checkbox name=sub_menu['+params.type+']['+s.en_name+'][] value="'+s.en_name+'" '+(isSubExist?'checked':'')+'> '+s.name+'</td><td></td></tr>').appendTo(block.find('table'));
							$.each(s.auth.split(','),function(t,v){
								var key;
								if(v=='EDIT')   key='编辑';
								if(v=='ADD')    key='新增';
								if(v=='READ')   key='读取';
								if(v=='DELETE') key='删除';
								if(v=='EXPORT') key='导出';
								if(v=='PRINT')  key='打印';
								var prop = false;
								$.each(isSubExist,function(a,b){
									if(b==v){prop=true;return;}
								});
								var td = $('<input type="checkbox" name=sub_menu['+params.type+']['+d.en_name+']['+s.en_name+'][] value="'+v+'" '+(prop?'checked':'')+'> <span>'+key+'</span> ').appendTo(tr.find('td:eq(1)'));
							});
						});
					}
				});
				__.find('table td:not(td:first) [type=checkbox]').on('click',function(event){//alert(1)
					if($(event.target).parent().index()==1){
						$(this).parents('tr').find('td:first [type=checkbox]').prop('checked', $(this).parent().find('[type=checkbox]:checked').length>0?true:false);
						$(this).parents('.panel-body').prev().find('[type=checkbox]').prop('checked', $(this).parents('table').find('[type=checkbox]:checked').length>0?true:false);
					}
				});
				__.find('table td [type=checkbox]').on('click',function(){
					if($(this).parent().index()==0){
						$(this).parents('tr').find('td:not(td:first) [type=checkbox]').prop('checked',$(this).is(':checked'));
						$(this).parents('.panel-body').prev().find('[type=checkbox]').prop('checked', $(this).parents('table').find('[type=checkbox]:checked').length>0?true:false);
					}
				});
				__.find('.panel-heading [type=checkbox]').on('click',function(){
					$(this).parents('.panel-heading').next().find('[type=checkbox]').prop('checked',$(this).is(':checked'));												
				});
			});
        }
    };
    $.fn.authMenu = function(options) {
        if(methods[options]){
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof options==='object'||! options){
            return methods.init.apply( this, arguments );
        }else{
            $.error('Method '+ options +' does not exist on jQuery.tooltip');
        }    
    };
	$.fn.authMenu.defaults = {};
})(jQuery);