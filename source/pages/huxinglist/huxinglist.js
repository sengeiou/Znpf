// pages/huxinglist/huxinglist.js
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
    // options.id=1;
    super.onLoad(options);
    this.Base.setMyData({
      nowidx: 0
    })
  }

  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi();
    var areatypelist = [];
    premisesapi.info({
      id: 1
    }, (info) => {
      var housing=info.housing;
      var typelist=[];
      for(var i=0;i<housing.length-1;i++){
        
         if(typelist.indexOf(housing[i]) == -1){
          typelist.push({
            id:housing[i].areatype_id,
            name:housing[i].areatype_name
          })
         }
         
      }

        this.Base.setMyData({
          info,typeid:info.housing[0].areatype_id,typelist
        })
        this.housing();
    })
  
  }

  housing(e) {
    var that = this;
    var typeid = this.Base.getMyData().typeid;
    var premisesapi = new PremisesApi();

    premisesapi.housinglist({
      areatype_id: typeid
    }, (housinglist) => {
      this.Base.setMyData({
        housinglist
      })
    })
  }

  bindorder(e) {
    var that = this;
    var nowidx = e.currentTarget.id;
    var typeid = e.currentTarget.dataset.typeid;

    this.Base.setMyData({
      nowidx: nowidx,
      typeid: typeid
    });

    this.housing();
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindorder = content.bindorder;
body.housing = content.housing;
Page(body)