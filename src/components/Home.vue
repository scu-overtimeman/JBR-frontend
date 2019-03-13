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
                <a v-show="showTitle" style="color: white; font-family: 黑体; font-size: 32px">加班人才大数据分析平台</a>
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
                  {{user_name}}
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
                <router-link :to="{name:'PersonalPage'}" class="waves-effect waves-dark" aria-expanded="false">
                  <i class="mdi mdi-account"></i>
                  <span class="hide-menu">Personal Page</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'PersonalPage'}" class="waves-effect waves-dark" aria-expanded="false">
                  <i class="mdi mdi-account"></i>
                  <span class="hide-menu">Personal Page</span>
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'AnalysisPage'}" class="waves-effect waves-dark" aria-expanded="false">
                  <i class="mdi mdi-account"></i>
                  <span class="hide-menu">Analysis</span>
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
      <!-- ============================================================== -->
      <!-- Page wrapper  -->
      <!-- ============================================================== -->
      <div class="page-wrapper">
        <router-view></router-view>

        <!-- ============================================================== -->
        <!-- End Container fluid  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- footer -->
        <!-- ============================================================== -->
        <footer class="footer">© 2019 加 班 人</footer>
        <!-- ============================================================== -->
        <!-- End footer -->
        <!-- ============================================================== -->
      </div>
      <!-- ============================================================== -->
      <!-- End Page wrapper  -->
      <!-- ============================================================== -->
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Home',
    data(){
      return{
        user_name : 'Over Working Man',
        screenWidth : window.innerWidth,
      }
    },
    computed:{
      showFullLogo(){
        return this.screenWidth > 1169;
      },
      showTitle(){
        return this.screenWidth > 720;
      },
    },
    mounted() {
      "use strict";
      $(function() {
        $(".preloader").fadeOut();
      });

      // ==============================================================
      // This is for the top header part and sidebar part
      // ==============================================================
      var set = function() {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        var topOffset = 70;
        if (width < 1170) {
          $("body").addClass("mini-sidebar");
          $('.navbar-brand span').hide();
          $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible");
          $(".sidebartoggler i").addClass("ti-menu");
        } else {
          $("body").removeClass("mini-sidebar");
          $('.navbar-brand span').show();
          //$(".sidebartoggler i").removeClass("ti-menu");
        }

        var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
          $(".page-wrapper").css("min-height", (height) + "px");
        }
      };
      $(window).ready(set);
      $(window).on("resize", set);

      // topbar stickey on scroll
      $(".fix-header .topbar").stick_in_parent({});

      // this is for close icon when navigation open in mobile views
      $(".nav-toggler").click(function() {
        $("body").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
        $(".nav-toggler i").addClass("ti-close");
      });
      $(".sidebartoggler").on('click', function() {
        //$(".sidebartoggler i").toggleClass("ti-menu");
      });
      $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
        $(".app-search").toggle(200);
      });

      // ==============================================================
      // Auto select left navbar
      // ==============================================================
      $(function() {
        var url = window.location;
        var element = $('ul#sidebarnav a').filter(function() {
          return this.href === url;
        }).addClass('active').parent().addClass('active');
        while (true) {
          if (element.is('li')) {
            element = element.parent().addClass('in').parent().addClass('active');
          } else {
            break;
          }
        }
      });
      // ==============================================================
      //tooltip
      // ==============================================================
      $(function() {
        $('[data-toggle="tooltip"]').tooltip()
      })
      // ==============================================================
      // Sidebarmenu
      // ==============================================================
      $(function() {
        $('#sidebarnav').metisMenu();
      });
      // ==============================================================
      // Slimscrollbars
      // ==============================================================
      $('.scroll-sidebar').slimScroll({
        position: 'left',
        size: "5px",
        height: '100%',
        color: '#dcdcdc'
      });
      // ==============================================================
      // Resize all elements
      // ==============================================================
      $("body").trigger("resize");


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
        // if(!this.timer){
        //   this.screenWidth = val
        //   this.timer = true
        //   let that = this
        //   setTimeout(function () {
        //     console.log(that.screenWidth)
        //     that.init()
        //     that.timer = false
        //   }, 400)
        //
        // }
      }
    }
  }
</script>

<style scoped>


</style>
