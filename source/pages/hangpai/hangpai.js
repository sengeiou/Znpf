// pages/hangpai/hangpai.js
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
    // options.id=4;
    super.onLoad(options);
    this.Base.setMyData({nowidx:0,premisesid:this.Base.options.id})
  }
  onMyShow() {
    var that = this;
    var premisesapi=new PremisesApi();

    premisesapi.entrancelist({premises_id:this.Base.options.id,orderby:'r_main.id'},(entrancelist)=>{ 
 
      for (var i = 0; i < entrancelist.length; i++) {
        entrancelist[i].pingji = new Number(entrancelist[i].pingji).toFixed(1);
        entrancelist[i].jinguan = new Number(entrancelist[i].jinguan).toFixed(1);
        entrancelist[i].daolu = new Number(entrancelist[i].daolu).toFixed(1);
        entrancelist[i].qita = new Number(entrancelist[i].qita).toFixed(1);
      }
       this.Base.setMyData({entrancelist})
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