// pages/content/content.js
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
    //options.id=5
    this.Base.setMyData({
      show: "fy",
    })
  }
  onMyShow() {
    var that = this;
    var premisesapi = new PremisesApi;
    premisesapi.list({
      premisestype_id: 2
    }, (ret) => {
        this.Base.setMyData({
          list: ret
        })
    })
    premisesapi.list({
    }, (ret) => {
      this.Base.setMyData({
        list2: ret
      })
    })

  }
  bindshow(e) {
    var type=e.currentTarget.dataset.type;
    if(type=="fy"){
      this.Base.setMyData({
        show:"fy"
      })
    }
    if (type == "esf") {
      this.Base.setMyData({
        show: "esf"
      })
    }
    if (type == "gw") {
      this.Base.setMyData({
        show: "gw"
      })
    }

  }

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindshow = content.bindshow;
Page(body)