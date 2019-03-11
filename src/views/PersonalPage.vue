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
    <router-view/>

  </div>
</template>

<script>
  import * as types from '../store/types'
  import store from '../store/store'

  export default {
    name: 'personalPage',
  }
</script>

<style scoped>

</style>
