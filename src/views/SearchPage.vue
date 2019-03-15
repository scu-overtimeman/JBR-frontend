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
            <div class="col-auto align-self-center">
              <i class="mdi mdi-magnify"
                 @click="searchSubmit"
                 @mouseover="searchActive($event)"
                 @mouseout="removeSearchActive($event)"></i>
            </div>

            <!--search input by modes-->
            <div v-if="searchMod===allSearchMods[0]" class="col-11">
              <input type="text" placeholder="Please enter information of positions you'd like to know"
                     v-model="searchBox" class="col-12 form-control form-control-line" @keyup.enter="searchSubmit"
              />
            </div>

            <div v-if="searchMod===allSearchMods[1]" class="col-11">
              <div class="row col">
                <input type="text" v-model="searchSalaryRange.floor" class="col-5 form-control form-control-line"
                       @keyup.enter="searchSubmit"/>
                <a class="col align-self-center">to</a>
                <input type="text" v-model="searchSalaryRange.ceiling" class="col-5 form-control form-control-line"
                       @keyup.enter="searchSubmit"/>
              </div>
            </div>

            <div v-if="searchMod===allSearchMods[2]" class="col-11">
              <city-chooser @cityChosen="getCity"/>
            </div>

          </div>
        </div>

        <div class="card-block col-lg-4 col-sm-12">
          <div class="row">
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
        <div class="table-responsive">

          <table v-if="chartModType===allSearchMods[0]" class="table">
            <thead>
            <tr>
              <th>Position</th>
              <th>Organization</th>
              <th>Salary</th>
              <th>Education demand</th>
              <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i, index) in fuzzyResult" :key="index">
              <td>{{i.name}}</td>
              <td>{{i.org}}</td>
              <td>{{i.salary.floor}}-{{i.salary.ceiling}}</td>
              <td>{{i.edu}}</td>
              <td>{{i.location}}</td>
            </tr>
            </tbody>
          </table>

          <table v-else-if="chartModType===allSearchMods[1]" class="table">
            <thead>
            <tr>
              <th>Position</th>
              <th>Organization</th>
              <th>Salary</th>
              <th>Education demand</th>
              <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i, index) in salaryResult" :key="index">
              <td>{{i.name}}</td>
              <td>{{i.org}}</td>
              <td>{{i.salary.floor}}-{{i.salary.ceiling}}</td>
              <td>{{i.edu}}</td>
              <td>{{i.location}}</td>
            </tr>
            </tbody>
          </table>

          <table v-else-if="chartModType===allSearchMods[2]" class="table">
            <thead>
            <tr>
              <th>Position</th>
              <th>Employees</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i, index) in regionResult" :key="index">
              <td>{{i.name}}</td>
              <td>{{i.employees}}</td>
            </tr>
            </tbody>
          </table>

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
        URL_FUZZY: '',
        URL_SALARY: '',
        URL_REGION: '',

        //alertMsg
        alertMsg : '',

        //Search modes
        allSearchMods: ["Fuzzy Search", "Salary Range", "Region Hot Positions"],
        searchMod: "",

        //Search Input
        searchBox: '',
        searchSalaryRange: {
          ceiling: 0,
          floor: 0
        },
        searchRegion: {
          province: '',
          city: ''
        },

        //Search Output
        fuzzyResult: [
          {
            name: '',
            org: '',
            salary: {
              floor: '',
              ceiling: ''
            },
            edu: '',
            location: ''
          }
        ],
        salaryResult:[],
        regionResult:[],

        chartModType: '',
      }
    },
    mounted(){
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
      // submitFuzzy(){
      //   if(this.fuzzySubmitCheck===false){
      //     return
      //   }
      //   const that = this
      //   axios.post(this.URL_FUZZY, this.searchBox)
      //     .then(resp=>{
      //       if(resp.data.obj){
      //         that.chartModType = that.searchMod
      //         that.fuzzyResult = resp.data.obj
      //       }
      //       else {
      //         alert("Searching Fail!")
      //       }
      //     })
      //     .catch(err=>{
      //       console.log(err.message)
      //       alert("Searching Fail: "+err.message)
      //     })
      // },
      // submitSalary(){
      //   if(this.salarySubmitCheck===false){
      //     return
      //   }
      //   const that = this
      //   axios.post(this.URL_SALARY, this.searchSalaryRange)
      //     .then(resp=>{
      //       if(resp.data.obj){
      //         that.chartModType = that.searchMod
      //         that.salaryResult = resp.data.obj
      //       }
      //       else {
      //         alert("Searching Fail!")
      //       }
      //     })
      //     .catch(err=>{
      //       console.log(err.message)
      //       alert("Searching Fail: "+err.message)
      //     })
      // },
      // submitRegion(){
      //   const that = this
      //   axios.post(this.URL_REGION, this.searchRegion)
      //     .then(resp=>{
      //       if(resp.data.obj){
      //         that.chartModType = that.searchMod
      //         that.regionResult = resp.data.obj
      //       }
      //       else {
      //         alert("Searching Fail!")
      //       }
      //     })
      //     .catch(err=>{
      //       console.log(err.message)
      //       alert("Searching Fail: "+err.message)
      //     })
      // },

      //submit methods for test, remove when deploy
      submitFuzzy(){
        if(this.fuzzySubmitCheck===false){
          return
        }
        this.chartModType = this.searchMod
        this.fuzzyResult = [
          {
            name: 'Miko',
            org: 'HakureiJinja',
            salary: {
              floor: '0',
              ceiling: '100000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
          {
            name: 'Magician',
            org: 'KirisameMahoumise',
            salary: {
              floor: '1000',
              ceiling: '1000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
          {
            name: 'Maid',
            org: 'Koumakan',
            salary: {
              floor: '20000',
              ceiling: '30000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
          {
            name: 'Witch',
            org: 'Koumakan',
            salary: {
              floor: '20000',
              ceiling: '30000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
        ]
      },
      submitSalary(){
        if(this.salarySubmitCheck===false){
          return
        }
        this.chartModType = this.searchMod
        this.salaryResult = [
          {
            name: 'Miko',
            org: 'HakureiJinja',
            salary: {
              floor: '0',
              ceiling: '100000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
          {
            name: 'Magician',
            org: 'KirisameMahoumise',
            salary: {
              floor: '1000',
              ceiling: '1000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
          {
            name: 'Maid',
            org: 'Koumakan',
            salary: {
              floor: '20000',
              ceiling: '30000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
          {
            name: 'Witch',
            org: 'Koumakan',
            salary: {
              floor: '20000',
              ceiling: '30000'
            },
            edu: 'no damand',
            location: 'Gensoukyou'
          },
        ]
      },
      submitRegion(){
        this.chartModType = this.searchMod
        this.regionResult = [
          {
            name: 'Miko',
            employees: 2
          },
          {
            name: 'Magician',
            employees: 2
          },
          {
            name: 'Maid',
            employees: 1
          },
          {
            name: 'Witch',
            employees: 3
          },
        ]
      },

      searchActive(e){
        e.target.className = "mdi mdi-magnify activeMagnify"
      },
      removeSearchActive(e){
        e.target.className = "mdi mdi-magnify"
      },
      getCity(province, city){
        this.searchRegion.province = province
        this.searchRegion.city = city
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
        if(this.searchBox.length <= 0){
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
</style>
