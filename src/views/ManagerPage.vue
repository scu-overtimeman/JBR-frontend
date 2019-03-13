<template>
  <div class="container-fluid">
    <!--bread crumb-->
    <div class="row page-titles">
      <div class="col-md-5 col-8 align-self-center">
        <h3 class="text-themecolor m-b-0 m-t-0">Manager Page</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a>Home</a></li>
          <li class="breadcrumb-item active">Manager Page</li>
        </ol>
      </div>
    </div>
    <div>
      <div class="card col-12">
        <div class="card-block">
          <div class="row">
            <div class="col-xl-4">
              <router-link :to="{name:'UserManagement'}" class="btn btn-success col" ><span style="color: white">Users Management</span></router-link>
            </div>
            <div class="col-xl-4">
              <a class="btn btn-success col" ><span style="color: white">Data Resource Management</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view/>

  </div>
</template>

<script>
  export default {
    name: 'ManagerPage'
  }
</script>

<style scoped>

</style>
