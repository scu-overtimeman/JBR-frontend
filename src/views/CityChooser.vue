<template>
    <div>
      <select class="form-control form-control-line col-5" v-model="provinceChosen">
        <option v-for="(province, index) in allCitys" :key="index">
          {{province.province}}
        </option>
      </select>
      <select class="form-control form-control-line col-5" v-model="cityChosen">
        <option v-for="(city, index) in cityListOfProvChosen.citys" :key="index">
          {{city.city}}
        </option>
      </select>
    </div>
</template>

<script>
  export default {
    name: 'CityChooser',
    data(){
      return{
        provinceChosen: '',
        cityChosen: '',
        allCitys: [
          {
            citys: [
              {
                city: "石家庄市"
              },
              {
                city: "邯郸市"
              },
              {
                city: "唐山市"
              },
              {
                city: "保定市"
              },
              {
                city: "秦皇岛市"
              },
              {
                city: "邢台市"
              },
              {
                city: "张家口市"
              },
              {
                city: "承德市"
              },
              {
                city: "沧州市"
              },
              {
                city: "廊坊市"
              },
              {
                city: "衡水市"
              },
              {
                city: "辛集市"
              },
              {
                city: "晋州市"
              },
              {
                city: "新乐市"
              },
              {
                city: "遵化市"
              },
              {
                city: "迁安市"
              },
              {
                city: "霸州市"
              },
              {
                city: "三河市"
              },
              {
                city: "定州市"
              },
              {
                city: "涿州市"
              },
              {
                city: "安国市"
              },
              {
                city: "高碑店市"
              },
              {
                city: "泊头市"
              },
              {
                city: "任丘市"
              },
              {
                city: "黄骅市"
              },
              {
                city: "河间市"
              },
              {
                city: "冀州市"
              },
              {
                city: "深州市"
              },
              {
                city: "南宫市"
              },
              {
                city: "沙河市"
              },
              {
                city: "武安市"
              }
            ],
            province: "河北省"
          },
          {
            citys: [
              {
                city: "太原市"
              },
              {
                city: "大同市"
              },
              {
                city: "朔州市"
              },
              {
                city: "阳泉市"
              },
              {
                city: "长治市"
              },
              {
                city: "晋城市"
              },
              {
                city: "忻州市"
              },
              {
                city: "吕梁市"
              },
              {
                city: "晋中市"
              },
              {
                city: "临汾市"
              },
              {
                city: "运城市"
              },
              {
                city: "古交市"
              },
              {
                city: "潞城市"
              },
              {
                city: "高平市"
              },
              {
                city: "原平市"
              },
              {
                city: "孝义市"
              },
              {
                city: "汾阳市"
              },
              {
                city: "介休市"
              },
              {
                city: "侯马市"
              },
              {
                city: "霍州市"
              },
              {
                city: "永济市"
              },
              {
                city: "河津市"
              }
            ],
            province: "山西省"
          },
          {
            citys: [
              {
                city: "呼和浩特市"
              },
              {
                city: "包头市"
              },
              {
                city: "乌海市"
              },
              {
                city: "赤峰市"
              },
              {
                city: "呼伦贝尔市"
              },
              {
                city: "通辽市"
              },
              {
                city: "乌兰察布市"
              },
              {
                city: "鄂尔多斯市"
              },
              {
                city: "巴彦淖尔市"
              },
              {
                city: "满洲里市"
              },
              {
                city: "扎兰屯市"
              },
              {
                city: "牙克石市"
              },
              {
                city: "根河市"
              },
              {
                city: "额尔古纳市"
              },
              {
                city: "乌兰浩特市"
              },
              {
                city: "阿尔山市"
              },
              {
                city: "霍林郭勒市"
              },
              {
                city: "锡林浩特市"
              },
              {
                city: "二连浩特市"
              },
              {
                city: "丰镇市"
              }
            ],
            province: "内蒙古自治区"
          },
          {
            citys: [
              {
                city: "沈阳市"
              },
              {
                city: "大连市"
              },
              {
                city: "朝阳市"
              },
              {
                city: "阜新市"
              },
              {
                city: "铁岭市"
              },
              {
                city: "抚顺市"
              },
              {
                city: "本溪市"
              },
              {
                city: "辽阳市"
              },
              {
                city: "鞍山市"
              },
              {
                city: "丹东市"
              },
              {
                city: "营口市"
              },
              {
                city: "盘锦市"
              },
              {
                city: "锦州市"
              },
              {
                city: "葫芦岛市"
              },
              {
                city: "新民市"
              },
              {
                city: "瓦房店市"
              },
              {
                city: "庄河市"
              },
              {
                city: "北票市"
              },
              {
                city: "凌源市"
              },
              {
                city: "调兵山市"
              },
              {
                city: "开原市"
              },
              {
                city: "灯塔市"
              },
              {
                city: "海城市"
              },
              {
                city: "凤城市"
              },
              {
                city: "东港市"
              },
              {
                city: "大石桥市"
              },
              {
                city: "盖州市"
              },
              {
                city: "凌海市"
              },
              {
                city: "北镇市"
              },
              {
                city: "兴城市"
              }
            ],
            province: "辽宁省"
          },
          {
            citys: [
              {
                city: "长春市"
              },
              {
                city: "吉林市"
              },
              {
                city: "白城市"
              },
              {
                city: "松原市"
              },
              {
                city: "四平市"
              },
              {
                city: "辽源市"
              },
              {
                city: "通化市"
              },
              {
                city: "白山市"
              },
              {
                city: "德惠市"
              },
              {
                city: "榆树市"
              },
              {
                city: "磐石市"
              },
              {
                city: "蛟河市"
              },
              {
                city: "桦甸市"
              },
              {
                city: "舒兰市"
              },
              {
                city: "洮南市"
              },
              {
                city: "大安市"
              },
              {
                city: "双辽市"
              },
              {
                city: "公主岭市"
              },
              {
                city: "梅河口市"
              },
              {
                city: "集安市"
              },
              {
                city: "临江市"
              },
              {
                city: "延吉市"
              },
              {
                city: "图们市"
              },
              {
                city: "敦化市"
              },
              {
                city: "珲春市"
              },
              {
                city: "龙井市"
              },
              {
                city: "和龙市"
              },
              {
                city: "扶余市"
              }
            ],
            province: "吉林省"
          },
          {
            citys: [
              {
                city: "哈尔滨市"
              },
              {
                city: "齐齐哈尔市"
              },
              {
                city: "黑河市"
              },
              {
                city: "大庆市"
              },
              {
                city: "伊春市"
              },
              {
                city: "鹤岗市"
              },
              {
                city: "佳木斯市"
              },
              {
                city: "双鸭山市"
              },
              {
                city: "七台河市"
              },
              {
                city: "鸡西市"
              },
              {
                city: "牡丹江市"
              },
              {
                city: "绥化市"
              },
              {
                city: "尚志市"
              },
              {
                city: "五常市"
              },
              {
                city: "讷河市"
              },
              {
                city: "北安市"
              },
              {
                city: "五大连池市"
              },
              {
                city: "铁力市"
              },
              {
                city: "同江市"
              },
              {
                city: "富锦市"
              },
              {
                city: "虎林市"
              },
              {
                city: "密山市"
              },
              {
                city: "绥芬河市"
              },
              {
                city: "海林市"
              },
              {
                city: "宁安市"
              },
              {
                city: "安达市"
              },
              {
                city: "肇东市"
              },
              {
                city: "海伦市"
              },
              {
                city: "穆棱市"
              },
              {
                city: "东宁市"
              },
              {
                city: "抚远市"
              }
            ],
            province: "黑龙江省"
          },
          {
            citys: [
              {
                city: "南京市"
              },
              {
                city: "徐州市"
              },
              {
                city: "连云港市"
              },
              {
                city: "宿迁市"
              },
              {
                city: "淮安市"
              },
              {
                city: "盐城市"
              },
              {
                city: "扬州市"
              },
              {
                city: "泰州市"
              },
              {
                city: "南通市"
              },
              {
                city: "镇江市"
              },
              {
                city: "常州市"
              },
              {
                city: "无锡市"
              },
              {
                city: "苏州市"
              },
              {
                city: "常熟市"
              },
              {
                city: "张家港市"
              },
              {
                city: "太仓市"
              },
              {
                city: "昆山市"
              },
              {
                city: "江阴市"
              },
              {
                city: "宜兴市"
              },
              {
                city: "溧阳市"
              },
              {
                city: "扬中市"
              },
              {
                city: "句容市"
              },
              {
                city: "丹阳市"
              },
              {
                city: "如皋市"
              },
              {
                city: "海门市"
              },
              {
                city: "启东市"
              },
              {
                city: "高邮市"
              },
              {
                city: "仪征市"
              },
              {
                city: "兴化市"
              },
              {
                city: "泰兴市"
              },
              {
                city: "靖江市"
              },
              {
                city: "东台市"
              },
              {
                city: "邳州市"
              },
              {
                city: "新沂市"
              }
            ],
            province: "江苏省"
          },
          {
            citys: [
              {
                city: "杭州市"
              },
              {
                city: "宁波市"
              },
              {
                city: "湖州市"
              },
              {
                city: "嘉兴市"
              },
              {
                city: "舟山市"
              },
              {
                city: "绍兴市"
              },
              {
                city: "衢州市"
              },
              {
                city: "金华市"
              },
              {
                city: "台州市"
              },
              {
                city: "温州市"
              },
              {
                city: "丽水市"
              },
              {
                city: "临安市"
              },
              {
                city: "建德市"
              },
              {
                city: "慈溪市"
              },
              {
                city: "余姚市"
              },
              {
                city: "平湖市"
              },
              {
                city: "海宁市"
              },
              {
                city: "桐乡市"
              },
              {
                city: "诸暨市"
              },
              {
                city: "嵊州市"
              },
              {
                city: "江山市"
              },
              {
                city: "兰溪市"
              },
              {
                city: "永康市"
              },
              {
                city: "义乌市"
              },
              {
                city: "东阳市"
              },
              {
                city: "临海市"
              },
              {
                city: "温岭市"
              },
              {
                city: "瑞安市"
              },
              {
                city: "乐清市"
              },
              {
                city: "龙泉市"
              }
            ],
            province: "浙江省"
          },
          {
            citys: [
              {
                city: "合肥市"
              },
              {
                city: "芜湖市"
              },
              {
                city: "蚌埠市"
              },
              {
                city: "淮南市"
              },
              {
                city: "马鞍山市"
              },
              {
                city: "淮北市"
              },
              {
                city: "铜陵市"
              },
              {
                city: "安庆市"
              },
              {
                city: "黄山市"
              },
              {
                city: "滁州市"
              },
              {
                city: "阜阳市"
              },
              {
                city: "宿州市"
              },
              {
                city: "六安市"
              },
              {
                city: "亳州市"
              },
              {
                city: "池州市"
              },
              {
                city: "宣城市"
              },
              {
                city: "巢湖市"
              },
              {
                city: "桐城市"
              },
              {
                city: "天长市"
              },
              {
                city: "明光市"
              },
              {
                city: "界首市"
              },
              {
                city: "宁国市"
              }
            ],
            province: "安徽省"
          },
          {
            citys: [
              {
                city: "厦门市"
              },
              {
                city: "福州市"
              },
              {
                city: "南平市"
              },
              {
                city: "三明市"
              },
              {
                city: "莆田市"
              },
              {
                city: "泉州市"
              },
              {
                city: "漳州市"
              },
              {
                city: "龙岩市"
              },
              {
                city: "宁德市"
              },
              {
                city: "福清市"
              },
              {
                city: "长乐市"
              },
              {
                city: "邵武市"
              },
              {
                city: "武夷山市"
              },
              {
                city: "建瓯市"
              },
              {
                city: "永安市"
              },
              {
                city: "石狮市"
              },
              {
                city: "晋江市"
              },
              {
                city: "南安市"
              },
              {
                city: "龙海市"
              },
              {
                city: "漳平市"
              },
              {
                city: "福安市"
              },
              {
                city: "福鼎市"
              }
            ],
            province: "福建省"
          },
          {
            citys: [
              {
                city: "南昌市"
              },
              {
                city: "九江市"
              },
              {
                city: "景德镇市"
              },
              {
                city: "鹰潭市"
              },
              {
                city: "新余市"
              },
              {
                city: "萍乡市"
              },
              {
                city: "赣州市"
              },
              {
                city: "上饶市"
              },
              {
                city: "抚州市"
              },
              {
                city: "宜春市"
              },
              {
                city: "吉安市"
              },
              {
                city: "瑞昌市"
              },
              {
                city: "共青城市"
              },
              {
                city: "乐平市"
              },
              {
                city: "瑞金市"
              },
              {
                city: "德兴市"
              },
              {
                city: "丰城市"
              },
              {
                city: "樟树市"
              },
              {
                city: "高安市"
              },
              {
                city: "井冈山市"
              },
              {
                city: "贵溪市"
              }
            ],
            province: "江西省"
          },
          {
            citys: [
              {
                city: "济南市"
              },
              {
                city: "青岛市"
              },
              {
                city: "聊城市"
              },
              {
                city: "德州市"
              },
              {
                city: "东营市"
              },
              {
                city: "淄博市"
              },
              {
                city: "潍坊市"
              },
              {
                city: "烟台市"
              },
              {
                city: "威海市"
              },
              {
                city: "日照市"
              },
              {
                city: "临沂市"
              },
              {
                city: "枣庄市"
              },
              {
                city: "济宁市"
              },
              {
                city: "泰安市"
              },
              {
                city: "莱芜市"
              },
              {
                city: "滨州市"
              },
              {
                city: "菏泽市"
              },
              {
                city: "胶州市"
              },
              {
                city: "即墨市"
              },
              {
                city: "平度市"
              },
              {
                city: "莱西市"
              },
              {
                city: "临清市"
              },
              {
                city: "乐陵市"
              },
              {
                city: "禹城市"
              },
              {
                city: "安丘市"
              },
              {
                city: "昌邑市"
              },
              {
                city: "高密市"
              },
              {
                city: "青州市"
              },
              {
                city: "诸城市"
              },
              {
                city: "寿光市"
              },
              {
                city: "栖霞市"
              },
              {
                city: "海阳市"
              },
              {
                city: "龙口市"
              },
              {
                city: "莱阳市"
              },
              {
                city: "莱州市"
              },
              {
                city: "蓬莱市"
              },
              {
                city: "招远市"
              },
              {
                city: "荣成市"
              },
              {
                city: "乳山市"
              },
              {
                city: "滕州市"
              },
              {
                city: "曲阜市"
              },
              {
                city: "邹城市"
              },
              {
                city: "新泰市"
              },
              {
                city: "肥城市"
              }
            ],
            province: "山东省"
          },
          {
            citys: [
              {
                city: "郑州市"
              },
              {
                city: "开封市"
              },
              {
                city: "洛阳市"
              },
              {
                city: "平顶山市"
              },
              {
                city: "安阳市"
              },
              {
                city: "鹤壁市"
              },
              {
                city: "新乡市"
              },
              {
                city: "焦作市"
              },
              {
                city: "濮阳市"
              },
              {
                city: "许昌市"
              },
              {
                city: "漯河市"
              },
              {
                city: "三门峡市"
              },
              {
                city: "南阳市"
              },
              {
                city: "商丘市"
              },
              {
                city: "周口市"
              },
              {
                city: "驻马店市"
              },
              {
                city: "信阳市"
              },
              {
                city: "荥阳市"
              },
              {
                city: "新郑市"
              },
              {
                city: "登封市"
              },
              {
                city: "新密市"
              },
              {
                city: "偃师市"
              },
              {
                city: "孟州市"
              },
              {
                city: "沁阳市"
              },
              {
                city: "卫辉市"
              },
              {
                city: "辉县市"
              },
              {
                city: "林州市"
              },
              {
                city: "禹州市"
              },
              {
                city: "长葛市"
              },
              {
                city: "舞钢市"
              },
              {
                city: "义马市"
              },
              {
                city: "灵宝市"
              },
              {
                city: "项城市"
              },
              {
                city: "巩义市"
              },
              {
                city: "邓州市"
              },
              {
                city: "永城市"
              },
              {
                city: "汝州市"
              },
              {
                city: "济源市"
              }
            ],
            province: "河南省"
          },
          {
            citys: [
              {
                city: "武汉市"
              },
              {
                city: "十堰市"
              },
              {
                city: "襄阳市"
              },
              {
                city: "荆门市"
              },
              {
                city: "孝感市"
              },
              {
                city: "黄冈市"
              },
              {
                city: "鄂州市"
              },
              {
                city: "黄石市"
              },
              {
                city: "咸宁市"
              },
              {
                city: "荆州市"
              },
              {
                city: "宜昌市"
              },
              {
                city: "随州市"
              },
              {
                city: "丹江口市"
              },
              {
                city: "老河口市"
              },
              {
                city: "枣阳市"
              },
              {
                city: "宜城市"
              },
              {
                city: "钟祥市"
              },
              {
                city: "汉川市"
              },
              {
                city: "应城市"
              },
              {
                city: "安陆市"
              },
              {
                city: "广水市"
              },
              {
                city: "麻城市"
              },
              {
                city: "武穴市"
              },
              {
                city: "大冶市"
              },
              {
                city: "赤壁市"
              },
              {
                city: "石首市"
              },
              {
                city: "洪湖市"
              },
              {
                city: "松滋市"
              },
              {
                city: "宜都市"
              },
              {
                city: "枝江市"
              },
              {
                city: "当阳市"
              },
              {
                city: "恩施市"
              },
              {
                city: "利川市"
              },
              {
                city: "仙桃市"
              },
              {
                city: "天门市"
              },
              {
                city: "潜江市"
              }
            ],
            province: "湖北省"
          },
          {
            citys: [
              {
                city: "长沙市"
              },
              {
                city: "衡阳市"
              },
              {
                city: "张家界市"
              },
              {
                city: "常德市"
              },
              {
                city: "益阳市"
              },
              {
                city: "岳阳市"
              },
              {
                city: "株洲市"
              },
              {
                city: "湘潭市"
              },
              {
                city: "郴州市"
              },
              {
                city: "永州市"
              },
              {
                city: "邵阳市"
              },
              {
                city: "怀化市"
              },
              {
                city: "娄底市"
              },
              {
                city: "耒阳市"
              },
              {
                city: "常宁市"
              },
              {
                city: "浏阳市"
              },
              {
                city: "津市市"
              },
              {
                city: "沅江市"
              },
              {
                city: "汨罗市"
              },
              {
                city: "临湘市"
              },
              {
                city: "醴陵市"
              },
              {
                city: "湘乡市"
              },
              {
                city: "韶山市"
              },
              {
                city: "资兴市"
              },
              {
                city: "武冈市"
              },
              {
                city: "洪江市"
              },
              {
                city: "冷水江市"
              },
              {
                city: "涟源市"
              },
              {
                city: "吉首市"
              }
            ],
            province: "湖南省"
          },
          {
            citys: [
              {
                city: "广州市"
              },
              {
                city: "深圳市"
              },
              {
                city: "清远市"
              },
              {
                city: "韶关市"
              },
              {
                city: "河源市"
              },
              {
                city: "梅州市"
              },
              {
                city: "潮州市"
              },
              {
                city: "汕头市"
              },
              {
                city: "揭阳市"
              },
              {
                city: "汕尾市"
              },
              {
                city: "惠州市"
              },
              {
                city: "东莞市"
              },
              {
                city: "珠海市"
              },
              {
                city: "中山市"
              },
              {
                city: "江门市"
              },
              {
                city: "佛山市"
              },
              {
                city: "肇庆市"
              },
              {
                city: "云浮市"
              },
              {
                city: "阳江市"
              },
              {
                city: "茂名市"
              },
              {
                city: "湛江市"
              },
              {
                city: "英德市"
              },
              {
                city: "连州市"
              },
              {
                city: "乐昌市"
              },
              {
                city: "南雄市"
              },
              {
                city: "兴宁市"
              },
              {
                city: "普宁市"
              },
              {
                city: "陆丰市"
              },
              {
                city: "恩平市"
              },
              {
                city: "台山市"
              },
              {
                city: "开平市"
              },
              {
                city: "鹤山市"
              },
              {
                city: "四会市"
              },
              {
                city: "罗定市"
              },
              {
                city: "阳春市"
              },
              {
                city: "化州市"
              },
              {
                city: "信宜市"
              },
              {
                city: "高州市"
              },
              {
                city: "吴川市"
              },
              {
                city: "廉江市"
              },
              {
                city: "雷州市"
              }
            ],
            province: "广东省"
          },
          {
            citys: [
              {
                city: "南宁市"
              },
              {
                city: "桂林市"
              },
              {
                city: "柳州市"
              },
              {
                city: "梧州市"
              },
              {
                city: "贵港市"
              },
              {
                city: "玉林市"
              },
              {
                city: "钦州市"
              },
              {
                city: "北海市"
              },
              {
                city: "防城港市"
              },
              {
                city: "崇左市"
              },
              {
                city: "百色市"
              },
              {
                city: "河池市"
              },
              {
                city: "来宾市"
              },
              {
                city: "贺州市"
              },
              {
                city: "岑溪市"
              },
              {
                city: "桂平市"
              },
              {
                city: "北流市"
              },
              {
                city: "东兴市"
              },
              {
                city: "凭祥市"
              },
              {
                city: "宜州市"
              },
              {
                city: "合山市"
              },
              {
                city: "靖西市"
              }
            ],
            province: "广西壮族自治区"
          },
          {
            citys: [
              {
                city: "海口市"
              },
              {
                city: "三亚市"
              },
              {
                city: "三沙市"
              },
              {
                city: "儋州市"
              },
              {
                city: "文昌市"
              },
              {
                city: "琼海市"
              },
              {
                city: "万宁市"
              },
              {
                city: "东方市"
              },
              {
                city: "五指山市"
              }
            ],
            province: "海南省"
          },
          {
            citys: [
              {
                city: "成都市"
              },
              {
                city: "广元市"
              },
              {
                city: "绵阳市"
              },
              {
                city: "德阳市"
              },
              {
                city: "南充市"
              },
              {
                city: "广安市"
              },
              {
                city: "遂宁市"
              },
              {
                city: "内江市"
              },
              {
                city: "乐山市"
              },
              {
                city: "自贡市"
              },
              {
                city: "泸州市"
              },
              {
                city: "宜宾市"
              },
              {
                city: "攀枝花市"
              },
              {
                city: "巴中市"
              },
              {
                city: "达州市"
              },
              {
                city: "资阳市"
              },
              {
                city: "眉山市"
              },
              {
                city: "雅安市"
              },
              {
                city: "崇州市"
              },
              {
                city: "邛崃市"
              },
              {
                city: "都江堰市"
              },
              {
                city: "彭州市"
              },
              {
                city: "江油市"
              },
              {
                city: "什邡市"
              },
              {
                city: "广汉市"
              },
              {
                city: "绵竹市"
              },
              {
                city: "阆中市"
              },
              {
                city: "华蓥市"
              },
              {
                city: "峨眉山市"
              },
              {
                city: "万源市"
              },
              {
                city: "简阳市"
              },
              {
                city: "西昌市"
              },
              {
                city: "康定市"
              },
              {
                city: "马尔康市"
              }
            ],
            province: "四川省"
          },
          {
            citys: [
              {
                city: "贵阳市"
              },
              {
                city: "六盘水市"
              },
              {
                city: "遵义市"
              },
              {
                city: "安顺市"
              },
              {
                city: "毕节市"
              },
              {
                city: "铜仁市"
              },
              {
                city: "清镇市"
              },
              {
                city: "赤水市"
              },
              {
                city: "仁怀市"
              },
              {
                city: "凯里市"
              },
              {
                city: "都匀市"
              },
              {
                city: "兴义市"
              },
              {
                city: "福泉市"
              }
            ],
            province: "贵州省"
          },
          {
            citys: [
              {
                city: "昆明市"
              },
              {
                city: "曲靖市"
              },
              {
                city: "玉溪市"
              },
              {
                city: "丽江市"
              },
              {
                city: "昭通市"
              },
              {
                city: "普洱市"
              },
              {
                city: "临沧市"
              },
              {
                city: "保山市"
              },
              {
                city: "安宁市"
              },
              {
                city: "宣威市"
              },
              {
                city: "芒市"
              },
              {
                city: "瑞丽市"
              },
              {
                city: "大理市"
              },
              {
                city: "楚雄市"
              },
              {
                city: "个旧市"
              },
              {
                city: "开远市"
              },
              {
                city: "蒙自市"
              },
              {
                city: "弥勒市"
              },
              {
                city: "景洪市"
              },
              {
                city: "文山市"
              },
              {
                city: "香格里拉市"
              },
              {
                city: "腾冲市"
              }
            ],
            province: "云南省"
          },
          {
            citys: [
              {
                city: "西安市"
              },
              {
                city: "延安市"
              },
              {
                city: "铜川市"
              },
              {
                city: "渭南市"
              },
              {
                city: "咸阳市"
              },
              {
                city: "宝鸡市"
              },
              {
                city: "汉中市"
              },
              {
                city: "榆林市"
              },
              {
                city: "商洛市"
              },
              {
                city: "安康市"
              },
              {
                city: "韩城"
              },
              {
                city: "华阴"
              },
              {
                city: "兴平"
              }
            ],
            province: "陕西省"
          },
          {
            citys: [
              {
                city: "兰州市"
              },
              {
                city: "嘉峪关市"
              },
              {
                city: "金昌市"
              },
              {
                city: "白银市"
              },
              {
                city: "天水市"
              },
              {
                city: "酒泉市"
              },
              {
                city: "张掖市"
              },
              {
                city: "武威市"
              },
              {
                city: "庆阳市"
              },
              {
                city: "平凉市"
              },
              {
                city: "定西市"
              },
              {
                city: "陇南市"
              },
              {
                city: "玉门市"
              },
              {
                city: "敦煌市"
              },
              {
                city: "临夏市"
              },
              {
                city: "合作市"
              }
            ],
            province: "甘肃省"
          },
          {
            citys: [
              {
                city: "西宁市"
              },
              {
                city: "海东市"
              },
              {
                city: "格尔木市"
              },
              {
                city: "德令哈市"
              },
              {
                city: "玉树市"
              }
            ],
            province: "青海省"
          },
          {
            citys: [
              {
                city: "拉萨市"
              },
              {
                city: "日喀则市"
              },
              {
                city: "昌都市"
              },
              {
                city: "林芝市"
              },
              {
                city: "山南市"
              }
            ],
            province: "西藏自治区"
          },
          {
            citys: [
              {
                city: "银川市"
              },
              {
                city: "石嘴山市"
              },
              {
                city: "吴忠市"
              },
              {
                city: "中卫市"
              },
              {
                city: "固原市"
              },
              {
                city: "灵武市"
              },
              {
                city: "青铜峡市"
              }
            ],
            province: "宁夏回族自治区"
          },
          {
            citys: [
              {
                city: "台北市"
              },
              {
                city: "新北市"
              },
              {
                city: "桃园市"
              },
              {
                city: "台中市"
              },
              {
                city: "台南市"
              },
              {
                city: "高雄市"
              },
              {
                city: "基隆市"
              },
              {
                city: "新竹市"
              },
              {
                city: "嘉义市"
              }
            ],
            province: "台湾"
          },
          {
            citys: [
              {
                city: "北京市"
              }
            ],
            province: "北京市"
          },
          {
            citys: [
              {
                city: "天津市"
              }
            ],
            province: "天津市"
          },
          {
            citys: [
              {
                city: "上海市"
              }
            ],
            province: "上海市"
          },
          {
            citys: [
              {
                city: "重庆市"
              }
            ],
            province: "重庆市"
          },
          {
            citys: [
              {
                city: "香港特别行政区"
              }
            ],
            province: "香港"
          },
          {
            citys: [
              {
                city: "澳门特别行政区"
              }
            ],
            province: "澳门"
          },
          {
          citys: [
            {
              city: "乌鲁木齐市"
            },
            {
              city: "克拉玛依市"
            },
            {
              city: "吐鲁番市"
            },
            {
              city: "哈密市"
            },
            {
              city: "喀什市"
            },
            {
              city: "阿克苏市"
            },
            {
              city: "和田市"
            },
            {
              city: "阿图什市"
            },
            {
              city: "阿拉山口市"
            },
            {
              city: "博乐市"
            },
            {
              city: "昌吉市"
            },
            {
              city: "阜康市"
            },
            {
              city: "库尔勒市"
            },
            {
              city: "伊宁市"
            },
            {
              city: "奎屯市"
            },
            {
              city: "塔城市"
            },
            {
              city: "乌苏市"
            },
            {
              city: "阿勒泰市"
            },
            {
              city: "霍尔果斯市"
            },
            {
              city: "石河子市"
            },
            {
              city: "阿拉尔市"
            },
            {
              city: "图木舒克市"
            },
            {
              city: "五家渠市"
            },
            {
              city: "北屯市"
            },
            {
              city: "铁门关市"
            },
            {
              city: "双河市"
            },
            {
              city: "可克达拉市"
            },
            {
              city: "昆玉市"
            }
          ],
          province: "新疆维吾尔自治区"
        }
        ],
      }
    },
    mounted(){
      this.provinceChosen = this.allCitys[0].province
      this.cityChosen = this.allCitys[0].citys[0].city
    },
    methods:{
      getIndexOfAllCitys(province){
        let provinces = []
        for(let p in this.allCitys){
          provinces[p] = this.allCitys[p].province
        }
        return provinces.indexOf(province)
      }
    },
    computed:{
      cityListOfProvChosen(){
        if(this.allCitys[this.getIndexOfAllCitys(this.provinceChosen)]){
          return this.allCitys[this.getIndexOfAllCitys(this.provinceChosen)]
        }
        else {
          return {city: ''}
        }
      }
    },
    watch:{
      provinceChosen(val){
        this.cityChosen = this.allCitys[this.getIndexOfAllCitys(val)].citys[0].city
      },
      cityChosen(val){
        this.$emit('cityChosen',this.provinceChosen, val)
      }
    }
  }
</script>

<style scoped>

</style>


