<template>
  <div class="row">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-12">
      <div class="card">
        <div class="card-block">
          <form class="form-horizontal form-material">

            <div class="form-group">
              <label class="col-md-12 ">User Name</label>
              <div class="col-md-12">
                <input type="text" class="form-control form-control-line" v-model="usernameEdit"/>
              </div>
            </div>

            <div class="form-group col">
              <div class="row">
                <div class="col-6">
                  <a class="btn btn-success col-12" @click="update"><span style="color: white;">Edit</span></a>
                </div>
                <div class="col-6">
                  <a class="btn btn-warning col-12" @click="jumpBack"><span style="color: white;">Cancel</span></a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from '../store/store'
  import * as types from '../store/types'

  export default {
    name: 'UserInfoCard',
    data(){
      return{
        userInfoForm:{},
        usernameEdit:''

      }
    },
    mounted(){
      this.userInfoForm = this.$store.state.user
      this.usernameEdit = this.userInfoForm.username
    },
    methods:{
      update(){
        const CODE_SUCCESS = 200
        const CODE_ALREADYRIGIST = 250
        const URL = ''
        const that = this

        const tempUsername = this.userInfoForm.username

        this.userInfoForm.username = this.usernameEdit
        axios.post(URL, this.userInfoForm)
          .then(function (response) {
            if(response.data.status===CODE_SUCCESS){
              alert("User information edit success")
              store.commit(types.LOGIN, JSON.stringify(that.userInfoForm))
              that.jumpBack()
            }
            else if(response.data.status===CODE_ALREADYRIGIST){
              this.userInfoForm.username = tempUsername
              alert("This username was already exist!")
            }
            else {
              this.userInfoForm.username = tempUsername
              alert("Username edit fail")
            }
          })
          .catch(function (err) {
            this.userInfoForm.username = tempUsername
            alert("Fail to edit user information:"+err.message)
          })
      },
      jumpBack(){
        this.$router.replace({name:'UserInfoCard'})
      }
    }
  }
</script>

<style scoped>

</style>
