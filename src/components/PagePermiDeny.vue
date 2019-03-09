<template>
  <!-- ============================================================== -->
  <!-- Main wrapper - style you can find in pages.scss -->
  <!-- ============================================================== -->
  <section id="wrapper" class="error-page">
    <div class="error-box">
      <div class="error-body text-center">
        <h1>500</h1>
        <h3 class="text-uppercase">Need Higher Authority!</h3>
        <p class="text-muted m-t-30 m-b-30">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
        <a @click="toHomePage" class="btn btn-info btn-rounded waves-effect waves-light m-b-40">Back to home</a> </div>
      <footer class="footer text-center">© 2019 加 班 人</footer>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PagePermiDeny',
    methods:{
      toHomePage(){
        this.$router.replace({name:'Home'})
      }
    }
  }

</script>

<style scoped>

</style>
