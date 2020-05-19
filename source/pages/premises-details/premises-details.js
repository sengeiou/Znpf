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
    //options.id=5;
    super.onLoad(options);
  }
  
  onMyShow() {
    var that = this;

    var premisesapi=new PremisesApi();

    premisesapi.info({id:1},(info)=>{
       this.Base.setMyData({info})
    })

    this.Base.setMyData({
      order: "A"
    });

  }


  bindorder(e) {
    var orderid = e.currentTarget.dataset.order;
    //console.log(orderid, "选中的节点值");
  
    this.Base.setMyData({
      order: orderid
    }); 
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