// pages/huxing/huxing.js 

import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  PremisesApi
} from "../../apis/premises.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  
  onLoad(options) {
    this.Base.Page = this;
    //options.id=6;
    super.onLoad(options);
    this.Base.setMyData({
      nowidx: 0
    })
  }

  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi();
    var areatypelist = [];
    premisesapi.housinginfo({
      id: this.Base.options.id
    }, (info) => {


      premisesapi.shoucanglist({premises_id:info.premises_id},(shoucanglist)=>{
        if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
           this.Base.setMyData({sc:'A'})
        }else{
          this.Base.setMyData({sc:'B'})
        }
      })

      var evaluating=info.evaluating;
      var shushi=0;
      var buzu=0;
      var zon=0
      for(var i=0;i<evaluating.length;i++){
        var xijie=evaluating[i].xijie;
         for(var j=0;j<xijie.length;j++){
            if(xijie[j].qufen=="N"){
              buzu++
            }else{
              shushi++
            }
            zon++
         }
      }

      info.pingji=new Number(info.pingji).toFixed(1);
      info.jinguan=new Number(info.jinguan).toFixed(1);  
      info.daolu=new Number(info.daolu).toFixed(1);  
      info.qita=new Number(info.qita).toFixed(1); 

        this.Base.setMyData({
          info,shushi,buzu,zon
        })

    })

    
  
  }


 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.housing = content.housing;
Page(body)