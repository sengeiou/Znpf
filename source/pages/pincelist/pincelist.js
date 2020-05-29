// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import { PremisesApi } from "../../apis/premises.api.js";
import { ApiUtil } from "../../apis/apiutil";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var name = options.name;
    var title = options.title;
    var id=options.id;
    this.Base.setMyData({ name, title,id });

  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.wenzhan({},(wenzhan)=>{
      wenzhan.map((item)=>{
        
        item.ToTime=ApiUtil.timestampToTime(item.time_timespan);

      })
      this.Base.setMyData({wenzhan});
    })
   
  }
  getloupan() {
    var json = {};
    var name = this.Base.getMyData().name;
    var id=this.Base.getMyData().id;
    console.log(name);
    if (name != undefined) {
      json.premisestype_id = name;
    }
    if (id != undefined) {
      json.xuanfantype = id;
    }
    var api = new PremisesApi;
    api.list( json , (list) => {

      this.Base.setMyData({ list });

    })


  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.getloupan = content.getloupan;
Page(body)