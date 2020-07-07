// pages/content/content.js
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
    //options.id=5;
    super.onLoad(options);
    var list = [{
      name: '15公里',
      value: '15000'
    }, {
      name: '10公里',
      value: '10000'
    }, {
      name: '5公里',
      value: '5000'
    }];
    var index = 0;
    this.Base.setMyData({
      list,
      index
    })
  }
  onMyShow() {
    var that = this;
    this.Base.getAddress((res) => {
      console.log("res", res);
      var mylat = res.location.lat;
      var mylng = res.location.lng;

      this.loaddata(mylat, mylng);

    }, (failres) => {
      console.log("failres", failres);
    });

  }
  loaddata(mylat, mylng) {
    this.Base.setMyData({
      mylat,
      mylng
    });
    var index = this.Base.getMyData().index;
    var list1 = this.Base.getMyData().list;
    var circlelist = [];
    var arr = [];
    for (var i = 5000; i <= list1[index].value; i = i + 5000) {
      var circle = {
        latitude: mylat,
        longitude: mylng,
        fillColor: "#583A8033",
        radius: i,
        color: "#583A8033",
      };
      console.log(this.jisuan(mylat, mylng, i),'uuyyiioopp');
      var json = this.jisuan(mylat, mylng, i);
      json.name=i;
      arr.push(json);
      circlelist.push(circle);
    }
    this.Base.setMyData({
      circlelist
    });

    var premisesapi = new PremisesApi();
    premisesapi.list({
      mylat,
      mylng,
      orderby: "distance"
    }, (list) => {
      var markers = [];
      console.log("12e1232");
      console.log(list);
      for (var i = 0; i < list.length; i++) {
        console.log(list[i].distance);
        console.log(list1[index].value);
        console.log(list[i].distance < list1[index].value);
        if (parseInt(list[i].distance) < parseInt(list1[index].value)) {
          console.log("进来了");
          markers.push({
            id: list[i].id,
            latitude: list[i].lat,
            longitude: list[i].lng,
            iconPath: "/images/icons/a.png",
            width: 1,
            height: 1,
            title: list[i].name,
            callout: {
              content: list[i].name + "\n" + "¥" + list[i].avg_price,
              color: "#161616",
              fontSize: 11,
              borderRadius: 4,
              bgColor: "#FCE4D1",
              padding: 2,
              display: "ALWAYS",
              textAlign: "center"
            }
          });
        }
      }

      for(var k=0;k<arr.length;k++){
        arr[k].name=arr[k].name/1000+'公里';
        markers.push({
          // id: list[i].id,
          latitude: arr[k].x,
          longitude: arr[k].y,
          iconPath: "/images/icons/a.png",
          width: 1,
          height: 1,
          title: arr[k].name,
          callout: {
            content: arr[k].name,
            color: "#161616",
            fontSize: 11,
            borderRadius: 4,
            bgColor: "#FCE4D1",
            padding: 2,
            display: "ALWAYS",
            textAlign: "center"
          }
        })
      }

      this.Base.setMyData({
        markers
      });

    })
  }
  callouttap(e) {
    console.log(e);
    var markerId = e.detail.markerId;
    var markerlist = this.Base.getMyData().markers;

    for (var i = 0; i < markerlist.length; i++) {
      if (markerlist[i].id == markerId) {
        wx.showModal({
          content: '是否现在查看' + markerlist[i].title + "?",
          success: function(e) {
            if (e.confirm) {
              wx.navigateTo({
                url: '/pages/premises-details/premises-details?id=' + markerId,
              })
            }
          }
        })
        return;
      }
    }
  }
  bindleixin(e) {

    console.log(e);
    this.Base.setMyData({
      index: e.detail.value
    })
    this.onMyShow();
  }
  jisuan(x, y, gl) {
    console.log(x, y, gl);
    var gl = gl/1000;
    var x1 = x;
    var y1 = y;
    var dx=0;
    while (dx < gl) {
      x1 = x1 + 0.00001;
      y1 = y1 + 0.00001;
      dx = this.getjl(x,y,x1,y1).toFixed(1);
    }
    console.log(x1, y1, gl, 'jjkk');
    console.log(dx, gl, 'jjkk');
    var json={
      x:x1.toFixed(5),
      y: y1.toFixed(5)
    }
    return json;
   
  }

  getjl(lat1, lng1, lat2, lng2){
    var radLat1 = lat1 * Math.PI / 180.0
    var radLat2 = lat2 * Math.PI / 180.0
    var a = radLat1 - radLat2
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 ;
    s = Math.round(s * 10000) / 10000;
    return s
  }
}

var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.loaddata = content.loaddata;
body.callouttap = content.callouttap;
body.bindleixin = content.bindleixin;
body.jisuan = content.jisuan;
body.getjl = content.getjl;
Page(body)