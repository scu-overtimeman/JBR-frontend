<template>
  <div class="container-fluid">
    <!--bread crumb-->
    <div class="row page-titles">
      <div class="col-md-5 col-8 align-self-center">
        <h3 class="text-themecolor m-b-0 m-t-0">Personal Page</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a>Home</a></li>
          <li class="breadcrumb-item active">Personal Page</li>
        </ol>
      </div>
    </div>
    <!--Profile Card-->
    <div class="row">
      <div class="col-lg-6 col-xl-6 col-md-8 col-sm-12">
        <div class="card">
          <div class="card-block">
            <form class="form-horizontal form-material">
              <div class="form-group">
                <label class="col-md-12">Full Name</label>
                <div class="col-md-12">
                  <input type="text" placeholder="Johnathan Doe" class="form-control form-control-line">
                </div>
              </div>
              <div class="form-group">
                <label for="example-email" class="col-md-12">Email</label>
                <div class="col-md-12">
                  <input type="email" placeholder="johnathan@admin.com" class="form-control form-control-line" name="example-email" id="example-email">
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">Password</label>
                <div class="col-md-12">
                  <input type="password" value="password" class="form-control form-control-line">
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">Phone No</label>
                <div class="col-md-12">
                  <input type="text" placeholder="123 456 7890" class="form-control form-control-line">
                </div>
              </div>
              <div class="form-group">
                <label class="col-md-12">Message</label>
                <div class="col-md-12">
                  <textarea rows="5" class="form-control form-control-line"></textarea>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-12">Select Country</label>
                <div class="col-sm-12">
                  <select class="form-control form-control-line">
                    <option>London</option>
                    <option>India</option>
                    <option>Usa</option>
                    <option>Canada</option>
                    <option>Thailand</option>
                  </select>
                </div>
              </div>
              <div class="form-group col">
                <div class="row">
                  <div class="col-6">
                    <button class="btn btn-success col-12">Update Profile</button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-warning col-12" @click="logOut">Log Out</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../store/types'
  import store from '../store/store'

  export default {
    name: 'personalPage',
    methods:{
      logOut(){
        console.log('修改token')
        this.$store.commit(types.LOGOUT)
        this.jumpToLogInPage()
      },
      //跳转至登录页
      jumpToLogInPage(){
        this.$router.replace({name:'LogInCard'})
      }
    }
  }
</script>

<style scoped>

</style>
