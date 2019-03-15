<template>
  <div>
    <div id="main-wrapper">
      <!-- ============================================================== -->
      <!-- Topbar header - style you can find in pages.scss -->
      <!-- ============================================================== -->
      <header class="topbar">
        <nav class="navbar top-navbar navbar-toggleable-sm navbar-light">
          <!-- ============================================================== -->
          <!-- Logo -->
          <!-- ============================================================== -->
          <div class="col-auto navbar-header">
            <a class="navbar-brand">
              <b>
                <img v-if="showFullLogo" src="../../static/images/logo_sm_light.png" alt="homepage" class="light-logo" />
                <img v-else src="../../static/images/logo_min_sm_light.png" alt="homepage" class="light-logo" />
              </b>
            </a>
          </div>
          <!-- ============================================================== -->
          <!-- End Logo -->
          <!-- ============================================================== -->
          <div class="navbar-collapse">
            <!-- ============================================================== -->
            <!-- toggle and nav items -->
            <!-- ============================================================== -->
            <ul class="navbar-nav mr-auto mt-md-0">
              <!-- This is  -->
              <li class="nav-item">
                <a class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark">
                  <i class="mdi mdi-menu"></i>
                </a>
              </li>
              <li class="align-self-center col-sm-auto offset-1">
                <a v-show="showTitle" style="color: white; font-family: BlinkMacSystemFont; font-size: 32px">Just a Bigdata Platform for Recruitment</a>
              </li>
            </ul>
            <!-- ============================================================== -->
            <!-- User profile and search -->
            <!-- ============================================================== -->
            <ul class="navbar-nav my-lg-0">
              <!-- ============================================================== -->
              <!-- Profile -->
              <!-- ============================================================== -->
              <li class="nav-item dropdown">
                <router-link :to="{name:'PersonalPage'}" class="nav-link dropdown-toggle text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="../../static/images/user_head.png" alt="user" class="profile-pic m-r-10" />
                  {{username}}
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <!-- ============================================================== -->
      <!-- End Topbar header -->
      <!-- ============================================================== -->
      <!-- ============================================================== -->
      <!-- Left Sidebar - style you can find in sidebar.scss  -->
      <!-- ============================================================== -->
      <aside class="left-sidebar">
        <!-- Sidebar scroll-->
        <div class="scroll-sidebar">
          <!-- Sidebar navigation-->
          <nav class="sidebar-nav">
            <ul id="sidebarnav">
              <li>
                <router-link :to="{name:'PersonalPage'}" class="waves-effect waves-dark" aria-expanded="false">
                  <i class="mdi mdi-account"></i>
                  <span class="hide-menu">Personal Page</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'ManagerPage'}" class="waves-effect waves-dark" aria-expanded="false">
                  <i class="mdi mdi-account-key"></i>
                  <span class="hide-menu">Manager Page</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'AnalysisPage'}" class="waves-effect waves-dark" aria-expanded="false">
                  <i class="mdi mdi-chart-arc"></i>
                  <span class="hide-menu">Analysis</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'SearchPage'}" class="waves-effect waves-dark" aria-expanded="false">
                <i class="mdi mdi-magnify"></i>
                <span class="hide-menu">Search Positions</span>
              </router-link>
            </li>
            </ul>
          </nav>
          <!-- End Sidebar navigation -->
        </div>
        <!-- End Sidebar scroll-->
      </aside>
      <!-- ============================================================== -->
      <!-- End Left Sidebar - style you can find in sidebar.scss  -->
      <!-- ============================================================== -->
      <div class="page-wrapper">
        <router-view/>
        <footer class="footer">© 加 班 人 2019</footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return{
        username : this.$store.state.user.username,
        screenWidth : window.innerWidth,
      }
    },
    computed:{
      showFullLogo(){
        return this.screenWidth > 1169;
      },
      showTitle(){
        return this.screenWidth > 1200;
      },
    },
    mounted() {
      import('../../static/js/custom')

      const that = this
      that.screenWidth = window.innerWidth
      window.onresize = function () {
        return (function () {
          window.screenWidth = window.innerWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    watch:{
      screenWidth(val){
        this.screenWidth = val
      }
    }
  }

</script>

<style scoped>

</style>
