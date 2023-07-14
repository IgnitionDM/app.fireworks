function geten(str){
     if(str == null) return 0;
     if(typeof str != "string"){
       str += "";
      }
     return str.replace(/[^\x00-\xff]/g,"01").length;
}
sessionStorage.setItem("fenleian1",0);
sessionStorage.setItem("fenleian2",0);
function fenleian(fid,cals){
      var fids = "#"+fid;
      var calss = "."+cals;
      var btns = new Array();
           $(calss).each(function(key,value){
           btns[key] = $(this).html();
      });
      var leng = $(calss).length;
      var lens = leng*32;
      var btnss = btns.join("");
      var jies = geten(btnss);
      var jie2 = jies*10;
      var zoinc = lens+jie2;
      if($(fids).width() == 0){
            $("#scroller").width($("#scroller").width() + zoinc);
            $(fids).animate({width:zoinc},300);
            $(calss).fadeIn(300);
			loaded();
			var fidsh = sessionStorage.getItem("fenleian1");
			var calssh = sessionStorage.getItem("fenleian2");
            $(fidsh).animate({width:"0px"},100);
            $(calssh).hide();
              }else{
            $(fids).animate({width:"0px"},100);
            $(calss).hide();
            $("#scroller").width($("#scroller").width() - zoinc);
      }
	  sessionStorage.setItem("fenleian1",fids);
      sessionStorage.setItem("fenleian2",calss);
}
sessionStorage.setItem("pfid",0);
function clased(pfid){
	  var pfens = sessionStorage.getItem("pfid");
	  var cpsh = '#cp'+pfens;
      $('.sprid').hide();
	  var cnei = '.c'+pfid;
      $(cnei).show();
	  var cps = '#cp'+pfid;
	  $(cpsh).css({"color":"#fff","font-size":"15px"});
      $(cps).css({"color":"#f00","font-size":"20px"});
	  sessionStorage.setItem("pfid",pfid);
}

function dingd(pid,pname){
      $("#zhezhao").show();
	  $("#gouws").show();
      $("#pnamesa").val(pname);
      $("#gwshu").val('1'); 
	 
      $("#qrtj").attr("href","javascript:acart("+pid+")"); 
}

function gbsp(){
      $("#zhezhao").hide();
	  $("#cpship").html('');
	  $("#gouws").hide();
	 
}

function xjian(shu){
         var shus = $("#gwshu").val()+shu;
         $("#gwshu").val(shus); 
   }
    function jians(){
         var shus = $("#gwshu").val();
         var shus=shus.substring(0,shus.length-1);
         $("#gwshu").val(shus); 
   }
function kansp(ptu,pvido){
      $("#zhezhao").show();
	  $("#cpship").show();
      var shipszhi = "<video controls='controls' poster='"+ptu+"' style='width:100%;height:100%;' id='video' loop='loop'><source src='"+pvido+"' type='video/mp4' /></video>";
      $("#cpship").html(shipszhi);
}

function acart(str){
       var ids = parseFloat(str);
       var names = $("#pnamesa").val();
       var nums = $("#gwshu").val();
       var product =  {  
       'id': ids,        
       'name': names,  
       'num': nums,  
       'price':1  
};    
      cart.addproduct(product);  
      var productlist=cart.getproductlist();//取出购物车商品 
      var strsv = '';
      $(function () {
            $.each(productlist, function (index, item){
            var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
            strsv += vstr;
            });
        });
       $("#zhezhao").fadeOut(200);
	   $("#cpship").html('');
	   $("#gouws").hide();
       $('#dingds').html(strsv); 
	   $('#goumaiw').show(); 
}

function gdingd(pid,pname,pshu){
	  $("#zhezhao").show();
	  $("#gouws").show();
	  $("#gouwucanniuq").show();
      $("#pnamesa").val(pname);
      $("#gwshu").val(pshu); 
      $("#qrtj").attr("href","javascript:queshue("+pid+")"); 
	  $("#gouwucanniuq").attr("href","javascript:dcart("+pid+")");
}
function calls(){
      localStorage.setItem("ShoppingCart",'');
      $('#dingds').html(''); 
}
function queshue(sid){
      var muns = $("#gwshu").val();
      cart.updateproductnum(sid,muns);
      var productlist=cart.getproductlist(); 
      var strsv = '';
      $(function(){
            $.each(productlist, function (index, item){
            var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
            strsv += vstr;
            });
      });
       $("#zhezhao").fadeOut(200);
	   $("#cpship").html('');
	   $("#gouws").hide();
       $('#dingds').html(strsv); 
}
function bgjx(){
	$('#goumaiw').hide();
}
function dcart(sid){
      cart.deleteproduct(sid);
      var productlist=cart.getproductlist();//取出购物车商品 
      var strsv = '';
      $(function () {
            $.each(productlist, function (index, item){
            var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
            strsv += vstr;
            });
       });
       $("#zhezhao").fadeOut(200);
	   $("#cpship").html('');
	   $("#gouws").hide();
       $('#dingds').html(strsv); 
}

function showproudsd(){
	    var proud = localStorage.getItem("ShoppingCart");
		if(proud != null && proud != ''){
        var productlist=cart.getproductlist();//取出购物车商品 
        var productln = orderdetail.totalNumber;
        var strsv = '';
            $(function () {
                     $.each(productlist, function (index, item){
                     var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
                     strsv += vstr;
            });
        });
        $('#dingds').html(strsv); 
		}
}

function showporsd(){
    var name = localStorage.getItem("name");
    if (name != null && name != '') { $("#name").val(name); }
    var phone = localStorage.getItem("phone");
    if (phone != null && phone != '') { $("#phone").val(phone); }
    var proud = localStorage.getItem("ShoppingCart");
    if (proud != null && proud != '') {
        var productlist = cart.getproductlist(); //取出购物车商品 
        //var productln = orderdetail.totalNumber;
        var strsv = '';
        $(function() {
            $.each(productlist, function(index, item) {
                var tui = item['id'];
                var czhi = "'" + item['id'] + "','" + item['name'] + "','" + item['num'] + "','" + item['img'] + "','" + item['price'] + "'";
                //var vstr = "<a href=" + '"' + "javascript:gaiwu(" + czhi + ")" + '"' + "><div class='oxis1'>"+item['img']+"&nbsp;&nbsp;"+item['name']+"</div><div class='oxis3'></div><div class='oxis2'>"+item['num']+"</div></a>";
				var vstr = "<li><div class='aui-car-box-list-item'><div class='aui-car-box-list-img'><a><img src='"+item['img']+"' ></a></div><div class='aui-car-box-list-text'><h4><a href='ui-product.html' style='color:#333'>"+item['name']+"</a></h4><div class='aui-car-box-list-text-brief'><span>数量："+item['num']+"</span></div><div class='gwcxx'><a href=" + '"' + "javascript:gaiwu(" + czhi + ")" + '"' + " >编辑</a>	<a href='javascript:dcarts(" + item['id'] + ")'>删除</a></div></div></div><div class='ui-dri'></div></li>";
				
                //var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
               strsv += vstr;
            })
            $('#shiwdin').html(strsv);
        });
    }
}

function showporsdi(){
    var name = localStorage.getItem("name");
    if (name != null && name != '') { $("#name").val(name); }
    var phone = localStorage.getItem("phone");
    if (phone != null && phone != '') { $("#phone").val(phone); }
    var proud = localStorage.getItem("ShoppingCart");
    if (proud != null && proud != '') {
        var productlist = cart.getproductlist(); //取出购物车商品 
        //var productln = orderdetail.totalNumber;
        var strsv = '';
        $(function() {
            $.each(productlist, function(index, item) {
                var tui = item['id'];
                var czhi = "'" + item['id'] + "','" + item['name'] + "','" + item['num'] + "'";
                //var vstr = "<a href=" + '"' + "javascript:gdingd(" + czhi + ")" + '"' + "><div class='dname'>&nbsp;&nbsp;"+item['name']+"</div><div class='oxis3'></div><div class='dshu'>"+item['num']+"</div></a>";
                var vstr = "<a href=" + '"' + "javascript:gdingd(" + czhi + ")" + '"' + "><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
                //var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
               strsv += vstr;
            })
            $('#dingds').html(strsv);
        });
    }
}


function gaiwu(pi, name, num,img) {
    $('.layer-content').show();

    var path = localStorage.getItem(pi);
    $('#gtu').attr('src', path);
    $('#gn').html(name);
    $('#gwshu').html(num);
	$("#simg").attr("src",img);
    $('#scs').attr("href", "javascript:dcarts(" + pi + ")");
    $('#quer').attr("href", "javascript:queshues(" + pi + ");");
}



function dcarts(sid) {
    cart.deleteproduct(sid);
    var productlist = cart.getproductlist(); //取出购物车商品 
    var strsv = '';
    $(function() {
        $.each(productlist, function(index, item) {
            var tui = item['id'];
                var czhi = "'" + item['id'] + "','" + item['name'] + "','" + item['num'] + "','" + item['img'] + "','" + item['price'] + "'";
                //var vstr = "<a href=" + '"' + "javascript:gaiwu(" + czhi + ")" + '"' + "><div class='oxis1'>"+item['img']+"&nbsp;&nbsp;"+item['name']+"</div><div class='oxis3'></div><div class='oxis2'>"+item['num']+"</div></a>";
				var vstr = "<li><div class='aui-car-box-list-item'><div class='aui-car-box-list-img'><a><img src='"+item['img']+"' ></a></div><div class='aui-car-box-list-text'><h4><a href='ui-product.html' style='color:#333'>"+item['name']+"</a></h4><div class='aui-car-box-list-text-brief'><span>数量："+item['num']+"</span></div><div class='gwcxx'><a href=" + '"' + "javascript:gaiwu(" + czhi + ")" + '"' + " >编辑</a>	<a href='javascript:dcarts(" + item['id'] + ")'>删除</a></div></div></div><div class='ui-dri'></div></li>";
            //var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
           strsv += vstr;
        })
        $('#shiwdin').html(strsv);
    });
 

}
function gb() {
    $('.layer-content').fadeOut(300);
    $('.zhe').fadeOut(300);
    $('#tij').hide();
    $('#jxm').hide();
    $("#tshi").html('');
    $("#gwshu").html('');

}
function queshues(sid) {
    var num = $("#gwshu").html();
    var muns = parseFloat(num);
    cart.updateproductnum(sid, muns);
    var productlist = cart.getproductlist();
    var strsv = '';
    $(function() {
        $.each(productlist, function(index, item) {
            var tui = item['id'];
                var czhi = "'" + item['id'] + "','" + item['name'] + "','" + item['num'] + "','" + item['img'] + "','" + item['price'] + "'";
                //var vstr = "<a href=" + '"' + "javascript:gaiwu(" + czhi + ")" + '"' + "><div class='oxis1'>"+item['img']+"&nbsp;&nbsp;"+item['name']+"</div><div class='oxis3'></div><div class='oxis2'>"+item['num']+"</div></a>";
				var vstr = "<li><div class='aui-car-box-list-item'><div class='aui-car-box-list-img'><a><img src='"+item['img']+"' ></a></div><div class='aui-car-box-list-text'><h4><a href='ui-product.html' style='color:#333'>"+item['name']+"</a></h4><div class='aui-car-box-list-text-brief'><span>数量："+item['num']+"</span></div><div class='gwcxx'><a href=" + '"' + "javascript:gaiwu(" + czhi + ")" + '"' + " >编辑</a>	<a href='javascript:dcarts(" + item['id'] + ")'>删除</a></div></div></div><div class='ui-dri'></div></li>";
            //var vstr = "<a href='javascript:gdingd("+item['id']+',"'+item['name']+'",'+item['num']+")'><div class='dinddd'><span class='dname'>"+item['name']+"</span><span class='dshu'>"+item['num']+"</span></div></a>";
           strsv += vstr;
        })
        $('#shiwdin').html(strsv);
    });
    $('.layer-content').hide();
	$(".zhe").fadeOut(200);


}

function randomWord(min){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

function chinckslogin(ssid){
	$.ajax({
		type : 'POST',
		url : 'chinckslogin.php',
		dataType:'json',
		data : {
			as:ssid
		},
		success : function (response , status , xhr) {
                if (response.uopen != null){
					var userss = JSON.stringify(response);
                    localStorage.setItem("users", userss);
			   }
		},
	});
}

function jiashu(){

				 var number = $("#gwshu").html();
                    number = parseInt(number) + 1;
                    $("#gwshu").html(number)
               
			   }

function jianshu(){
                    var number = $("#gwshu").html();
                    if(number > 1){
                        number = parseInt(number) - 1;
                    }else{
                        alert('商品数量不能少于1');
                    }
                   $("#gwshu").html(number)             
         }

function d1(pid,str,img,sguige,shl,jiage) {
	 $("#t_ok").hide();
    $('.layer-content').show();
    $('.zhe').show();
	$("#gwshu").html(1);
	$("#simg").attr("src",img);
	$("#sguige").html(sguige);
    $("#shl").html(shl);
	$("#jiage").html(jiage);
	$("#pnamesa").html(str);
    $("#qrtjs").attr("href","javascript:acarts("+pid+")"); 
}

function goback(){
	if(window.history.length > 1){ 
         window.history.go( -1 ); 
     }else{ 
         window.location.href = 'sp.php'; 
    } 	
}
function acarts(str) {
    var ids = parseFloat(str);
    var names = $("#pnamesa").html();
    var imgs = $("#simg").attr("src");
	var num = $("#gwshu").html();
	var price = $("#jiage").html();
    if (num == "") {
        $("#tshi2").html('产品数量不能为空！');
        return;
    };
    var nums = parseFloat(num);
    var product = {
        'id': ids,
        'name': names,
        'num': nums,
		'img': imgs,
        'price': price
    };
    cart.addproduct(product);
    $('.layer-content').fadeOut();
    $("#tshi").html('您选购的产品已经成功加入购物车！');
    $('#tij').show();
    $('#jxm').show();
	$('#t_ok').show();
    $("#pnamesa").html('');
    $("#gwshu").html('');
}
function logins(){
	  var url=location.href;
      var stl=url.length-7;
      var urls = url.substring(0,stl);
      $("#zhezhao").fadeIn(2000);
      var strs = urls+"ml.php?co=";
      var radstr = randomWord(12);
      //var radstr = 'sdfwefwe';
      var str =strs + radstr;
      $('#ermas').qrcode(str);
var sdsss = setInterval(function(){
	 $.ajax({
		type : 'POST',
		url : 'chinckslogin.php',
		dataType:'json',
		data : {
			as:radstr
		},
		success : function (response , status , xhr) {
                if (response.uopen != null){
					var userss = JSON.stringify(response);
                    localStorage.setItem("users", userss);
					$("#wxname").html(response.uname);
	                $("#touxiangsimg").attr("src",response.upic);
	                $('#chulidz').attr('href','mys.php?s=1&o='+response.uopen); 
	                $('#chulidw').attr('href','mys.php?s=2&o='+response.uopen);
					showporsd();
					$("#zhezhao").fadeOut(1000);
					clearInterval(sdsss);
			   }
		    },
	     });
     }, 100);
}



function seas(){
$('#zhezhaos').show();
}
function gbsps(){
$('#zhezhaos').hide();
}

function addorder(){
	    $('#zhezhaosa').fadeIn(2000);
		$('#zhezhaosa').html('<i class="iconfont icon-duigou"></i><br>提 交 成 功');
	    var productlist=cart.getproductlist();
		var puss = localStorage.getItem("users");
        var usaz = JSON.parse(puss);
		var usdi = usaz.id;
		var strsv = '';
		$(function () {
            $.each(productlist, function (index, item){
			var vstr = item['id']+","+item['name']+","+item['num']+"/";
            strsv += vstr;
            });
        });
     	$.ajax({
		type : 'POST',
		url : '/pc/orderok.asp',
		dataType:'json',
		data : {
			orde:strsv,
			us:usdi
		},
		success : function (response , status , xhr) {
                if (response){
					localStorage.setItem("ShoppingCart",'');
					location.href='mys.php?s=1&o='+usaz.uopen;
					$('#zhezhaosa').fadeOut(1000);
                    $('#dingdbiao').html(''); 
					$('#tijaos').hide();
					
			   }
		},
	});
}

function tjdds(){
	var puss = localStorage.getItem("users");
	if(puss != null){ 
         addorder(); 
     }else{ 
         window.location.href = 'mye.php'; 
    }

}

function bof(){
       //$('#myideo').play(); 
       document.getElementById('myideo').play();
   }


