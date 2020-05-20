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
    //options.id=5;
    super.onLoad(options);
    var name = options.name;
    var title = options.title;
    this.Base.setMyData({ name, title });

  }
  onMyShow() {
    var that = this;
    var api = new InstApi;
    api.indexbanner({
      orderby: 'r_main.seq'
    }, (indexbanner) => {
      this.setData({
        indexbanner: indexbanner
      }, () => {

        this.Base.setMyData({ showSkeleton: false })

      });
    });
    this.getloupan();
  }
  getloupan() {
    var json = {};
    var name = this.Base.getMyData().name;
    console.log(name);
    if (name != undefined) {
      json.premisestype_id = name;
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