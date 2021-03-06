// pages/premises-details/premises-details.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

import { PremisesApi } from "../../apis/premises.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=4;
    super.onLoad(options);
    this.Base.setMyData({nowidx:0});
  }

  onMyShow() {
    var that = this;

    var premisesapi=new PremisesApi();

    premisesapi.info({id:this.Base.options.id},(info)=>{
       var history=info.history;
       for(var i=0;i<history.length;i++){
        history[i].name=history[i].name.slice(0,4);
       }

       var zixunlist=info.zixun;
       var zxlabel=[];
       for(var i=0;i<zixunlist.length;i++){
        var labellist=zixunlist[i].label;
         for(var j=0;j<labellist.length;j++){
          zxlabel.push({
            id:labellist[j].id,
            name:labellist[j].name
          })
         }
       }
       info.zxlabel=zxlabel;

       info.pingji=new Number(info.pingji).toFixed(1);
       info.school=new Number(info.school).toFixed(1); 
       info.supermarket=new Number(info.supermarket).toFixed(1); 
       info.hospital=new Number(info.hospital).toFixed(1);  
       info.jingguan=new Number(info.jingguan).toFixed(1); 
      console.log("哈哈哈哈"+info)
       this.Base.setMyData({info})


      premisesapi.typelist({ orderby: 'r_main.id' }, (typelist) => {
        this.Base.setMyData({ typelist, nowid: typelist[0].id });


        var list = this.Base.getMyData().info.periphery;
        var markers = [];
        for (var i = 0; i < list.length; i++) {
          if (list[i].type_id == typelist[0].id) {
            markers.push({
              id: list[i].id,
              title: list[i].name,
              latitude: list[i].lat,
              longitude: list[i].lng
            });
          }
        }
        this.Base.setMyData({ markers });


      })

    })

    premisesapi.shoucanglist({premises_id:this.Base.options.id},(shoucanglist)=>{
      if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
         this.Base.setMyData({sc:'A'})
      }else{
        this.Base.setMyData({sc:'B'})
      }
    })

    premisesapi.huxinfenlei({
      premises_id: this.Base.options.id
    }, (fllist) => {
      var hxnum=0;
      for(var i=0;i<fllist.length;i++){
        
        var tuku=fllist[i].tuku;
        for(var j=0;j<tuku.length;j++){
          hxnum++
        }

      }
    this.Base.setMyData({hxnum})
    })


    this.Base.setMyData({
      order: "A"
    });

  }

  bindorder(e) { 
    var nowidx = e.currentTarget.id;
    var nowid= e.currentTarget.dataset.id;
    this.Base.setMyData({nowidx: nowidx,nowid});

    var list = this.Base.getMyData().info.periphery;
    var markers=[];
    for(var i=0;i<list.length;i++){
      if(list[i].type_id==nowid){
        markers.push({
          id:list[i].id,
          title:list[i].name,
          latitude: list[i].lat,
          longitude: list[i].lng
        });
      }
    }
    this.Base.setMyData({ markers});
  }

  // shoucang(e){
  //   var premisesapi=new PremisesApi();
  //   var id=e.currentTarget.id;
    
  //   premisesapi.shoucang({premises_id:id},ret=>{
  //     console.log(ret);
  //     if(ret.code==0){
  //       this.Base.toast('收藏成功');
  //     }else if(ret.code==1){
  //       this.Base.toast('取消收藏');
  //     }else{
  //       this.Base.toast('操作失败');
  //     }
      
  //     this.onMyShow();
  //   })

  // }

  guwen() {
    wx.navigateTo({
      url: '/pages/zhiyeguwen/zhiyeguwen?id='+this.Base.options.id,
    })
  }
  xiaoguo(e){
    var id = e.currentTarget.id;
    var list = this.Base.getMyData().info.periphery;
    var markers = [];
    for (var i = 0; i < list.length;i++){
      if (id == list[i].id){
        markers.push({
          id: list[i].id,
          title: list[i].name,
          latitude: list[i].lat,
          longitude: list[i].lng
        });
      }
    }
    this.Base.setMyData({ markers });
  }
  zaixian() {
    var instinfo = this.Base.getMyData().instinfo;
    var url = ApiConfig.GetUploadPath() + 'inst/' + instinfo.gzhewm;
    wx.previewImage({
      urls: [url],
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.guwen = content.guwen;
body.xiaoguo = content.xiaoguo;
body.zaixian = content.zaixian;

//body.shoucang = content.shoucang;
Page(body)