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