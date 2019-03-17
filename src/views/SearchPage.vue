<template>
  <div class="container-fluid">
    <!--bread crumb-->
    <div class="row page-titles">
      <div class="col-md-5 col-8 align-self-center">
        <h3 class="text-themecolor m-b-0 m-t-0">Search Positions</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a>Home</a></li>
          <li class="breadcrumb-item active">Search Positions</li>
        </ol>
      </div>
    </div>

    <div class="card col-12">

      <div v-show="alertMsg.length>0" class="row">
        <div class="col">
          <a class="col" style="color: red">{{alertMsg}}</a>
        </div>
      </div>

      <div class="row">
        <div class="card-block col-lg-8 col-sm-12">
          <div class="row col">
            <div class="col-auto align-self-end">
              <i class="mdi mdi-magnify"
                 @click="searchSubmit"
                 @mouseover="searchActive($event)"
                 @mouseout="removeSearchActive($event)"></i>
            </div>

            <!--search input by modes-->
            <div v-if="searchMod===allSearchMods[0]" class="col-11">
              <h4>Key Word Fuzzy Search</h4>
              <input type="text" placeholder="Please enter information of positions you'd like to know"
                     v-model="searchBox.searchKeys" class="col-12 form-control form-control-line"
                     @keyup.enter="searchSubmit"/>
            </div>

            <div v-if="searchMod===allSearchMods[1]" class="col-11">
              <h4>Salary Range Search</h4>
              <div class="row col">
                <input type="text" v-model="searchSalaryRange.floor" class="col-5 form-control form-control-line"
                       @keyup.enter="searchSubmit"/>
                <a class="col align-self-center">to</a>
                <input type="text" v-model="searchSalaryRange.ceiling" class="col-5 form-control form-control-line"
                       @keyup.enter="searchSubmit"/>
              </div>
            </div>

            <div v-if="searchMod===allSearchMods[2]" class="col-11">
              <div class="col">City Hot Position Search</div>
              <city-chooser @cityChosen="getCity"/>
            </div>

          </div>
        </div>

        <div class="card-block col-lg-4 col-sm-12 align-self-end">
          <div class="row ">
            <div class="col">Search Mode</div>
            <div class="col-11">
              <select class="form-control form-control-line" v-model="searchMod">
                <option v-for="(mod,index) in allSearchMods" :key="index">
                  {{mod}}
                </option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div v-show="chartModType.length>0" class="card col-12">
      <div class="card-block">
        <h4 class="card-title">Searching Result</h4>

        <div v-if="chartModType===allSearchMods[0] && fuzzyResult.length>0" class="table-responsive">
          <table class="table">
            <tbody>
            <tr v-for="(prop, index) in fuzzyShowProp" :key="index">
              <td>{{prop.name}}</td>
              <td><input type="checkbox" class="checkbox col-1" v-model="prop.chosen"/></td>
            </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
              <tr>
                <th v-show="fuzzyShowProp[0].chosen">Position</th>
                <th v-show="fuzzyShowProp[1].chosen">Organization</th>
                <th v-show="fuzzyShowProp[2].chosen">Salary</th>
                <th v-show="fuzzyShowProp[3].chosen">Education demand</th>
                <th v-show="fuzzyShowProp[4].chosen">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in getChart(chartPageNum)" :key="index">
                <td v-show="fuzzyShowProp[0].chosen">{{i.name}}</td>
                <td v-show="fuzzyShowProp[1].chosen">{{i.org}}</td>
                <td v-show="fuzzyShowProp[2].chosen && i.salaryFloor!=='-1'">{{i.salaryFloor}}-{{i.salaryCeiling}}</td>
                <td v-show="i.salaryFloor==='-1'">面议</td>
                <td v-show="fuzzyShowProp[3].chosen">{{i.edu}}</td>
                <td v-show="fuzzyShowProp[4].chosen">{{i.location}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="chartModType===allSearchMods[1] && salaryResult.length>0" class="table-responsive">
          <table class="table">
            <tbody>
            <tr v-for="(prop, index) in salaryShowProp" :key="index">
              <td>{{prop.name}}</td>
              <td><input type="checkbox" class="checkbox col-1" v-model="prop.chosen"/></td>
            </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
              <tr>
                <th v-show="salaryShowProp[0].chosen">Position</th>
                <th v-show="salaryShowProp[1].chosen">Organization</th>
                <th v-show="salaryShowProp[2].chosen">Salary</th>
                <th v-show="salaryShowProp[3].chosen">Education demand</th>
                <th v-show="salaryShowProp[4].chosen">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(i, index) in getChart(chartPageNum)" :key="index">
                <td v-show="salaryShowProp[0].chosen">{{i.name}}</td>
                <td v-show="salaryShowProp[1].chosen">{{i.org}}</td>
                <td v-show="salaryShowProp[2].chosen && i.salaryFloor!=='-1'">{{i.salaryFloor}}-{{i.salaryCeiling}}</td>
                <td v-show="i.salaryFloor==='-1'">面议</td>
                <td v-show="salaryShowProp[3].chosen">{{i.edu}}</td>
                <td v-show="salaryShowProp[4].chosen">{{i.location}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else-if="chartModType===allSearchMods[2] && regionResult.length>0" class="table-responsive">
          <table class="table">
            <tbody>
            <tr v-for="(prop, index) in regionShowProp" :key="index">
              <td>{{prop.name}}</td>
              <td><input type="checkbox" class="checkbox col-1" v-model="prop.chosen"/></td>
            </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
            <tr>
              <th v-show="regionShowProp[0].chosen">Position</th>
              <th v-show="regionShowProp[1].chosen">Employees</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i, index) in getChart(chartPageNum)" :key="index">
              <td v-show="regionShowProp[0].chosen">{{i.location}}</td>
              <td v-show="regionShowProp[1].chosen">{{i.count}}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div v-else>
          <h3>Opps! No result found!</h3>
        </div>


        <!--footer: page number-->
        <div class="row justify-content-center" v-show="chartToShow.length>0">
          <div class="col-auto align-self-center">
            <a v-show="chartPageNum>0" class="btn" @click="toPrevPage">Prev</a>
          </div>
          <div class="col-auto align-self-center">
            <a class="">Page  {{chartPageNum+1}} / {{chartToShow.length}}</a>
          </div>
          <div class="col-auto align-self-center">
            <a v-show="chartPageNum+1 < chartToShow.length" class="btn" @click="toNextPage">Next</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import CityChooser from './CityChooser'
  import axios from 'axios'

  export default {
    name: 'SearchPage',
    components: {CityChooser},
    data(){
      return{

        URL_FUZZY: 'transaction/searchBox',
        URL_SALARY: 'transaction/searchSalaryRange',
        URL_REGION: 'transaction/searchRegion',

        //alertMsg
        alertMsg : '',

        //Search modes
        allSearchMods: ["Fuzzy Search", "Salary Range", "Region Hot Positions"],
        searchMod: "",

        //Search Input
        searchBox: {
          searchKeys: ''
        },
        searchSalaryRange: {
          floor: 0,
          ceiling: 0

        },
        searchRegion: {
          province: '',
          city: ''
        },

        //Search Output
        fuzzyResult: [],
        salaryResult:[],
        regionResult:[],

        //Result properties to show
        fuzzyShowProp:[
          {name: 'name', chosen: true},
          {name: 'org', chosen: true},
          {name: 'salary', chosen: true},
          {name: 'edu', chosen: true},
          {name: 'location', chosen: true},
        ],
        salaryShowProp:[
          {name: 'name', chosen: true},
          {name: 'org', chosen: true},
          {name: 'salary', chosen: true},
          {name: 'edu', chosen: true},
          {name: 'location', chosen: true},
        ],
        regionShowProp:[
          {name: 'name',chosen: true,},
          {name:'salary',chosen: true}
        ],

        //chart to show
        chartModType: '',
        chartToShow: [],
        chartPageNum: 0,
        ITEMS_PER_PAGE: 20,
      }
    },
    mounted(){
      //data initialization
      this.searchMod = this.allSearchMods[0]

    },
    methods:{
      searchSubmit(){
        const mod = this.searchMod
        if(mod === this.allSearchMods[0]){
          this.submitFuzzy()
        }
        else if(mod === this.allSearchMods[1]){
          this.submitSalary()
        }
        else{
          this.submitRegion()
        }
      },


      submitFuzzy(){
        if(this.fuzzySubmitCheck===false){
          return
        }
        const that = this
        axios({
          url:this.URL_FUZZY,
          method:'post',
          data: this.searchBox,
          headers:{
            'Content-Type':'application/json; charset=utf-8'
          }
        })
        .then(resp=>{
          if(resp.data.obj){
            alert("Success!")
            that.chartModType = that.searchMod
            that.fuzzyResult = resp.data.obj
            that.chartToShow = this.splitResult(this.fuzzyResult)
          }
          else {
            alert("Searching Fail!")
          }
        })
        .catch(err=>{
          console.log(err.message)
          alert("Searching Fail: "+err.message)
        })
      },
      submitSalary(){
        if(this.salarySubmitCheck===false){
          return
        }
        const that = this
        axios({
          url:this.URL_SALARY,
          method:'post',
          data: this.searchSalaryRange,
          headers:{
            'Content-Type':'application/json; charset=utf-8'
          }
        })
        .then(resp=>{
          if(resp.data.obj){
            alert("Success!")
            that.chartModType = that.searchMod
            that.salaryResult = resp.data.obj

            that.chartToShow = that.splitResult(that.salaryResult)

          }
          else {
            alert("Searching Fail!")
          }
        })
        .catch(err=>{
          console.log(err.message)
          alert("Searching Fail: "+err.message)
        })
      },
      submitRegion(){
        const that = this
        axios.post(this.URL_REGION, this.searchRegion)
          .then(resp=>{
            if(resp.data.obj){
              alert("Success!")
              that.chartModType = that.searchMod
              that.regionResult = resp.data.obj

              that.chartToShow = that.splitResult(that.regionResult)

            }
            else {
              alert("Searching Fail!")
            }
          })
          .catch(err=>{
            console.log(err.message)
            alert("Searching Fail: "+err.message)
          })
      },

      //submit methods for test, remove when deploy
      // submitFuzzy(){
      //   if(this.fuzzySubmitCheck===false){
      //     return
      //   }
      //   this.chartModType = this.searchMod
      //   this.fuzzyResult = [
      //     {
      //       name: 'Miko',
      //       org: 'HakureiJinja',
      //       salary: {
      //         floor: '0',
      //         ceiling: '100000'
      //       },
      //       edu: 'no damand',
      //       location: 'Gensoukyou'
      //     },
      //     {
      //       name: 'Magician',
      //       org: 'KirisameMahoumise',
      //       salary: {
      //         floor: '1000',
      //         ceiling: '1000'
      //       },
      //       edu: 'no damand',
      //       location: 'Gensoukyou'
      //     },
      //     {
      //       name: 'Maid',
      //       org: 'Koumakan',
      //       salary: {
      //         floor: '20000',
      //         ceiling: '30000'
      //       },
      //       edu: 'no damand',
      //       location: 'Gensoukyou'
      //     },
      //     {
      //       name: 'Witch',
      //       org: 'Koumakan',
      //       salary: {
      //         floor: '20000',
      //         ceiling: '30000'
      //       },
      //       edu: 'no damand',
      //       location: 'Gensoukyou'
      //     },
      //   ]
      //
      //   this.chartToShow = this.splitResult(this.fuzzyResult)
      //
      // },
      // submitSalary(){
      //   if(this.salarySubmitCheck===false){
      //     return
      //   }
      //   this.chartModType = this.searchMod
      //   this.salaryResult = []
      //   this.chartToShow = this.splitResult(this.salaryResult)
      // },
      // submitRegion(){
      //   this.chartModType = this.searchMod
      //   this.regionResult = [
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //     {
      //       name: 'Miko',
      //       employees: 2
      //     },
      //     {
      //       name: 'Magician',
      //       employees: 2
      //     },
      //     {
      //       name: 'Maid',
      //       employees: 1
      //     },
      //     {
      //       name: 'Witch',
      //       employees: 3
      //     },
      //   ]
      //   this.chartToShow = this.splitResult(this.regionResult)
      // },

      searchActive(e){
        e.target.className = "mdi mdi-magnify activeMagnify"
      },
      removeSearchActive(e){
        e.target.className = "mdi mdi-magnify"
      },
      getCity(province, city){
        this.searchRegion.province = province
        this.searchRegion.city = city
      },
      toPrevPage(){
        if(this.chartPageNum-1 >= 0){
          this.chartPageNum-=1
        }
      },
      toNextPage(){
        if(this.chartPageNum+1 < this.chartToShow.length){
          this.chartPageNum+=1
        }
      },

      //tool functions
      splitResult(array){
        const len = this.ITEMS_PER_PAGE
        let arrLen = array.length
        let result = []
        for(let i=0; i<arrLen; i+=len){
          result.push(array.slice(i,i+len))
        }
        return result
      },
      getChart(index){
        if(index >= this.chartToShow.length){
          return []
        }
        else {
          return this.chartToShow[index]
        }
      }
    },
    watch:{
      searchMod(){
        this.alertMsg = ''
      }
    },
    computed:{
      //legality check before searching submit
      fuzzySubmitCheck(){
        if(this.searchBox.searchKeys.length <= 0){
          this.alertMsg = 'Input cannot be empty!'
          return false
        }
        else {
          return true
        }
      },
      salarySubmitCheck(){
        if(this.searchSalaryRange.floor > this.searchSalaryRange.ceiling){
          this.alertMsg = 'Floor cannot be larger than ceiling!'
          return false
        }
        else {
          this.alertMsg = ''
          return true
        }
      },
    },
    component:{
      CityChooser
    }
  }
</script>

<style scoped>
  .activeMagnify{
    color: #00ccff;
    cursor : pointer;
  }
  .checkbox{
    left: auto;
    opacity: initial;
    width: 18px;
    height: 18px;
  }
</style>
