<template>
  <div class="row">
    <div class="col-lg-6 col-xl-6 col-md-8 col-sm-12">
      <div class="card">
        <div class="card-block">
          <form class="form-horizontal form-material">

            <div class="form-group">
              <label class="col-md-12 ">User Name</label>
              <div class="col-md-12">
                <label class="form-control form-control-line">{{userInfoForm.username}}</label>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-12">Roles</label>
              <div class="col-md-12">
                <label class="form-control form-control-line" v-for="role in userInfoForm.roles">{{role.name}}<br></label>
              </div>
            </div>

            <div class="form-group col">
              <div class="row">
                <div class="col-6">
                  <a class="btn btn-success col-12" @click="jumpToEdit"><span style="color: white;">Edit</span></a>
                </div>
                <div class="col-6">
                  <a class="btn btn-warning col-12" @click="logOut"><span style="color: white;">Log Out</span></a>
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
  import * as types from '../store/types'
  import store from '../store/store'

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
      logOut(){
        //清除token
        this.$store.commit(types.LOGOUT)
        this.jumpToLogInPage()
      },
      //跳转至登录页
      jumpToLogInPage(){
        this.$router.replace({name:'LogInCard'})
      },
      //跳转至编辑页
      jumpToEdit(){
        this.$router.replace({name:'UserInfoEditCard'})
      }
    }
  }
</script>

<style scoped>

</style>
