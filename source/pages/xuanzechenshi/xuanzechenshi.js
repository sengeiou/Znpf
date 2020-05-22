// pages/city/city.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";

import { MemberApi } from "../../apis/member.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }

  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }

  onMyShow() {
    var that = this;
    var instapi = new InstApi();
   
    var memberapi = new MemberApi();
    
    this.Base.setMyData({CurrentName:AppBase.CITYNAME});
  var address=this.Base.getMyData().address;
   console.log(address);
      // var citycode = address.ad_info.adcode.substr(0, 4) + "00";
      // this.Base.setMyData({ locationCityCode: citycode});
      instapi.citylist({},(usecitylist)=>{
      this.Base.setMyData({ usecitylist: usecitylist });
    });
  }
  setCity(e){
    console.log("进来了啊");
    var id=e.currentTarget.id;
    var memberinfo=this.Base.getMyData().memberinfo;
     
    var citylist=this.Base.getMyData().usecitylist;
      
        AppBase.CITYID = citylist[id].id;
        AppBase.CITYNAME = citylist[id].name;
        AppBase.CITYSET = true;
      
      
  
    
    wx.navigateBack({
      
    })
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.setCity = content.setCity;
Page(body)