// pages/peitao/peitao.js
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
    //  options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
      nowidx: 0
    })
  }

  onMyShow() {
    var that = this;
    var premisesapi=new PremisesApi();

    premisesapi.info({id:this.Base.options.id},(info)=>{


      var peitaolist=info.periphery;
      var ptlist = {};
      for (var i = 0; i < peitaolist.length; i++) {
        var list = peitaolist[i];
        if (!ptlist[list.type_id]) {
          ptlist[list.type_id] = [];
        }
        ptlist[list.type_id].push(list)
      }
      var list = [];
      for (var key in ptlist) {
        list.push({
          type_id: key,
          type_name:ptlist[key][0].typename,
          list: ptlist[key]
        })
     
      }
      this.Base.setMyData({
        list,info
      });
 
    })

    premisesapi.typelist({orderby:'r_main.id'},(typelist)=>{ 
      this.Base.setMyData({typelist,nowid:typelist[0].id})
   })

  }

  bindorder(e) { 
    var nowidx = e.currentTarget.id;
    var nowid= e.currentTarget.dataset.id;
    this.Base.setMyData({nowidx: nowidx,nowid})
  }



 
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.housing = content.housing;
Page(body)