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
   //options.id=1;
    super.onLoad(options);
    this.Base.setMyData({nowidx:0})
  }

  onMyShow() {
    var that = this;

    var premisesapi=new PremisesApi();

    premisesapi.info({id:this.Base.options.id},(info)=>{
       var history=info.history;
       for(var i=0;i<history.length;i++){
        history[i].name=history[i].name.slice(0,4);
       }
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
      if(list[i].type_id=nowid){
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

  guwen() {
    wx.navigateTo({
      url: '/pages/zhiyeguwen/zhiyeguwen?id='+this.Base.options.id,
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.guwen = content.guwen;
Page(body)