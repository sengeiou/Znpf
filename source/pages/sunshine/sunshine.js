// pages/sunshine/sunshine.js
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

    premisesapi.entrancelist({premises_id:this.Base.options.id,orderby:'r_main.id'},(entrancelist)=>{ 
       this.Base.setMyData({entrancelist})
    })

  }

  bindorder(e) { 

    var nowidx = e.currentTarget.id;
    this.Base.setMyData({nowidx: nowidx})
   

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
Page(body)