<template>
  <div class="fix-header fix-sidebar card-no-border background" :style="'height:'+getWindowHeight+'px'">
    <!--<div class="preloader">-->
      <!--<svg class="circular" viewBox="25 25 50 50">-->
        <!--<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>-->
    <!--</div>-->

    <div id="main-wrapper">
      <!-- ============================================================== -->
      <!-- Topbar header - style you can find in pages.scss -->
      <!-- ============================================================== -->
      <header class="topbar">
        <nav class="col-md-12 justify-content-between navbar top-navbar navbar-toggleable-sm navbar-light">
        <!-- ============================================================== -->
        <!-- Logo -->
        <!-- ============================================================== -->

          <div class="col-auto navbar-header">
            <a class="navbar-brand">
              <b>
                <img src="../../static/images/logo_sm_light.png" alt="homepage" class="light-logo" />
              </b>
            </a>
          </div>

          <div class="col-lg-6 navbar-nav justify-content-end">
            <div class="row">
              <div class="col-6">
                <router-link :to="{name:'LogInCard'}" class="btn waves-effect waves-light btn-bs pull-right hidden-sm-down"> Log in</router-link>
              </div>
              <div class="col-6">
                <router-link :to="{name:'RegistCard'}" class="btn waves-effect waves-light btn-danger pull-right hidden-sm-down"> Regist</router-link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <!-- ============================================================== -->
      <!-- End Topbar header -->
      <!-- ============================================================== -->

      <div class="row">
        <div class="w-100"><img height="100px"/></div>
      </div>

      <div class="row">
        <div class="col-sm-4 offset-2">
          <img height="60px"/>
          <div class="row">
            <img src="../../static/images/titleImg.png" style=" width: 300px; height: 225px" class="offset-1"/>
          </div>
          <div>
            <br>
            <h1>加班人才大数据分析平台</h1>
            <br/>
          </div>

        </div>

        <!--Log in & register card-->
        <div class="col-sm-6">
          <router-view/>
        </div>

      </div>
    </div>
    <footer class="footer row-12">
      © 2019 加 班 人
    </footer>  </div>
</template>

<script>
  export default {
    name: 'LogIn',
    computed:{
      getWindowHeight(){
        return document.documentElement.clientHeight
      }
    }
  }
</script>

<style scoped>
  .background{
    background-color:#eef5f9
  }
</style>
