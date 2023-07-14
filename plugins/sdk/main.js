$(function(){
    var url = location.href.split('#')[0].toString();//url����д��
    $.ajax({
            type : "get",
            url : "https://app.fireworks-online.cn/sdk/share.asp",
            dataType : "json",
            async : false,
            data:{url:url},
            success : function(data) {

        wx.config({
                    debug: false,////����������Ҫ�ر�debugģʽ
                    appId: data.appId,//appIdͨ��΢�ŷ���ź�̨�鿴
                    timestamp: data.timestamp,//����ǩ����ʱ���
                    nonceStr: data.nonceStr,//����ǩ��������ַ���
                    signature: data.signature,//ǩ��
                    jsApiList: [//��Ҫ���õ�JS�ӿ��б�
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
						'scanQRCode',
                        'onMenuShareWeibo'
                    ]
                });
            },
            error:function(xhr, status, error){
            
            }
    })
    var meta = document.getElementsByTagName('meta'); 
    var share_desc = ''; 
    for(i in meta){ 
        if(typeof meta[i].name!="undefined"&&meta[i].name.toLowerCase()=="description"){ 
            share_desc = meta[i].content; //��ȡ��ҳ������Ϊ��������
        } 
    }
    var wstitle = document.title //�˴���д��������
    var wsdesc = share_desc; //�˴���д�������
    var wslink = url; //�˴���ȡ��������
    var wsimglink = document.getElementsByTagName('link');
    var wsimg = "";
    for(j in wsimglink){
        if(typeof wsimglink[j].rel!="undefined"&&wsimglink[j].rel.toLowerCase()=="shortcut icon")
            wsimg = wsimglink[j].href//�˴���ȡ��������ͼ
    }
	
	$("#scanQRCode").click(function(event){
	               wx.scanQRCode({
                desc: 'scanQRCode desc',
                needResult : 0, // Ĭ��Ϊ0��ɨ������΢�Ŵ�����1��ֱ�ӷ���ɨ������
                scanType : [ "qrCode", "barCode" ], // ����ָ��ɨ��ά�뻹��һά�룬Ĭ�϶��߶���
              //success : function(res) {
//					console.log("����ɨ��ɹ�",res);
//                    var result = res.resultStr; // ��needResult Ϊ 1 ʱ��ɨ�뷵�صĽ��
//                    $("#codeValue").val(result);//��ʾ���
//                    alert("ɨ����Ϊ��" + result);
//                },
//				error:function(res){
//					console.log(res)
//				  }
            });
	   })


    wx.ready(function () {

        // ����������Ȧ
        wx.onMenuShareTimeline({
                title: wstitle,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                        
                },
                cancel: function () {
                }
        });

        // ����������
        wx.onMenuShareAppMessage({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                    
                },
                cancel: function () {
                }
        });

        // ������QQ
        wx.onMenuShareQQ({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                        
                },
                cancel: function () {
                }
        });

        // ΢�ŵ���Ѷ΢��
        wx.onMenuShareWeibo({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                        
                },
                cancel: function () {
                }
        });

        // ������QQ�ռ�
        wx.onMenuShareQZone({
                title: wstitle,
                desc: wsdesc,
                link: wslink,
                imgUrl: wsimg,
                success: function () {
                        
                },
                cancel: function () {
                }
        });

    });

})