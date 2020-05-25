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
     options.id=1;
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

       info.pingji=new Number(info.pingji).toFixed(1);
       info.school=new Number(info.school).toFixed(1); 
       info.supermarket=new Number(info.supermarket).toFixed(1); 
       info.hospital=new Number(info.hospital).toFixed(1);  
       info.jingguan=new Number(info.jingguan).toFixed(1); 

       this.Base.setMyData({info})
    })

    premisesapi.typelist({orderby:'r_main.id'},(typelist)=>{ 
      this.Base.setMyData({typelist,nowid:typelist[0].id})
   })

    this.Base.setMyData({
      order: "A"
    });

  }

  bindorder(e) { 
    var nowidx = e.currentTarget.id;
    var nowid= e.currentTarget.dataset.id;
    this.Base.setMyData({nowidx: nowidx,nowid})
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