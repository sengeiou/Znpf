// pages/search/search.js
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
    api.wenzhan({},(wenzhan)=>{
      this.Base.setMyData({wenzhan});
    })
  }

  bindval(e){
    var val=e.detail.value;
    this.Base.setMyData({val})
  }
  
  bindsearch(e){
    var premisesapi = new PremisesApi;
    var val=this.Base.getMyData().val;
    premisesapi.list({name:val},(list)=>{
      this.Base.setMyData({list})
    })
  }
 

}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindsearch = content.bindsearch;
body.bindval = content.bindval;
Page(body)