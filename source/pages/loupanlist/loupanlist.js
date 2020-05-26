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
    var id=options.id;
    this.Base.setMyData({ name, title,id });

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
    var premisesapi = new PremisesApi;
    premisesapi.list({}, (list) => {
      this.Base.setMyData({ list });
      for(var i=0;i<list.length;i++){
        if (list.premisestype_id=="2"){
          this.Base.setMyData({
            list
          })
        }
      }
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