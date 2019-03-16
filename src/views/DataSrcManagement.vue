<template>
  <div class="card col-12">
    <div class="card-block">
      <h4 class="card-title">Data Source Management</h4>
      <div class="row">
        <div class="col-md-10">
        </div>
        <div class="col">
          <a class="btn btn-success" @click="update"><span style="color: white">Update</span></a>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th>Site Name</th>
              <th>Source Site</th>
              <th>Adopted</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(site, index) in allSrcSites" :key="index">
              <td>{{site.name}}</td>
              <td>{{site.url}}</td>
              <td>
                <input type="checkbox" class="checkbox" v-model="site.checked"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'DataSrcManagement',
    data(){
      return{
        allSrcSites: [],
      }
    },
    async mounted () {
      this.allSrcSites = await this.getSrcSites()

    },
    methods:{
      getSrcSites(){
        const URL_SRC_SITES = '/getAllDataSource'

        return axios.get(URL_SRC_SITES)
          .then(resp => resp.data.obj)
          .catch(err => {
            alert("Get data source fail: "+err.message)
          })

      },
      update(){
        const URL = '/updateDataSource'
        axios.post(URL,this.allSrcSites)
          .then(resp=>{
            if(resp.status===200){
              alert("Data source update success!")
            }
          })
          .catch(err=>{
            alert("Data source update fail: "+err.message)
          })
      },
    }
  }
</script>

<style scoped>
  .checkbox{
    left: auto;
    opacity: initial;
    width: 18px;
    height: 18px;
  }
</style>

