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
    this.Base.setMyData({nowidx:0,premisesid:this.Base.options.id})
  }
  
  onMyShow() {
    var that = this;
    var premisesapi=new PremisesApi();

    premisesapi.entrancelist({premises_id:this.Base.options.id,orderby:'r_main.id'},(entrancelist)=>{ 
      if (entrancelist.length>0){
        if (this.Base.options.type == "D") {
          this.Base.setMyData({ entrancelist, nowid: this.Base.options.nowid, type: this.Base.options.type })
        } else {
          this.Base.setMyData({ entrancelist, nowid: entrancelist[0].id, type: "A" })
        }
      }
     

    })

    premisesapi.shoucanglist({premises_id:this.Base.options.id},(shoucanglist)=>{
      if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
         this.Base.setMyData({sc:'A'})
      }else{
        this.Base.setMyData({sc:'B'})
      }
    })

  }

  bindorder(e) { 
    var nowid=e.currentTarget.dataset.id;
    var nowidx = e.currentTarget.id;
    this.Base
    .setMyData({nowidx: nowidx,nowid:nowid})
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
Page(body)