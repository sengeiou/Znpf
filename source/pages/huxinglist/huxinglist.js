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
    // options.id = 4;
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
      id: this.Base.options.id
    }, (info) => {
      var housing = info.housing;
      var typelist = [];
      for (var i = 0; i < housing.length; i++) {

        if (typelist.indexOf(housing[i]) == -1) {
          typelist.push({
            id: housing[i].areatype_id,
            name: housing[i].areatype_name
          })
        }

      }

      this.Base.setMyData({
        info,
        typeid: info.housing[0].areatype_id,
        typelist
      })
      this.housing();
    })

    premisesapi.shoucanglist({premises_id:this.Base.options.id},(shoucanglist)=>{
      if(shoucanglist!=null&&shoucanglist!=undefined&&shoucanglist!=""){
         this.Base.setMyData({sc:'A'})
      }else{
        this.Base.setMyData({sc:'B'})
      }
    })

  }

  housing(e) {
    var that = this;
    var typeid = this.Base.getMyData().typeid;
    var premisesapi = new PremisesApi();

    premisesapi.housinglist({
      areatype_id: typeid,
      premises_id: this.Base.options.id
    }, (housinglist) => {
      if (housinglist.length>0){
        for (var i = 0; i < housinglist.length; i++) {
          housinglist[i].grade = new Number(housinglist[i].grade).toFixed(1);
        }

        this.Base.setMyData({
          housinglist
        })
      }
     
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