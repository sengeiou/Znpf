// pages/dongtai/dongtai.js
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
    // options.id=1;
    super.onLoad(options);
    this.Base.setMyData({nowidx:0})
  }
  
  onMyShow() {
    var that = this;
    var premisesapi=new PremisesApi();

    premisesapi.info({id:this.Base.options.id},(info)=>{ 
       this.Base.setMyData({info})
    })

  }
 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
Page(body)