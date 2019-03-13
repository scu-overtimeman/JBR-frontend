<template>
  <div class="row">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-12">
      <div class="card">
        <div class="card-block">
          <form class="form-horizontal form-material">

            <div class="form-group">
              <label class="col-md-12 ">User Name</label>
              <div class="col-md-12">
                <input type="text" class="form-control form-control-line" v-model="userInfoForm.username"/>
              </div>
            </div>

            <div class="form-group col">
              <div class="row">
                <div class="col-6">
                  <a class="btn btn-success col-12" @click="update"><span style="color: white;">Update</span></a>
                </div>
                <div class="col-6">
                  <a class="btn btn-success col-12" @click="jumpBack"><span style="color: white;">Cancel</span></a>
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
  import store from '../store/store'
  import axios from 'axios'

  export default {
    name: 'UserInfoCard',
    data(){
      return{
        userInfoForm:{}
      }
    },
    mounted(){
      this.userInfoForm = store.state.user
    },
    methods:{
      update(){
        const CODE_SUCCESS = 200
        const CODE_ALREADYRIGIST = 250
        const URL = ''

        axios.post(URL, this.userInfoForm)
          .then(function (response) {
            if(response.data.status===CODE_SUCCESS){
              alert("个人信息修改成功")
              localStorage.flag = true
            }
            else if(response.data.status===CODE_ALREADYRIGIST){
              alert("用户名已注册")
            }
            else {
              alert("注册失败")
            }
          })
          .catch(function (err) {
            alert("个人信息修改失败"+err.message)
          })

        if(localStorage.getItem('flag')){
          this.jumpBack()
        }
      },
      jumpBack(){
        this.$router.replace({name:'UserInfoCard'})
      }
    }
  }
</script>

<style scoped>

</style>
