<template>
  <div class="col-12">
    <div class="col-10 offset-1 card">
      <div class="card-block">
        <form class="form-horizontal form-material">

          <div class="form-group row">
            <div class="col-12">
              <h1 class="text-themecolor">LOG IN</h1>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p class="text-danger">{{alertMsg}}</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">User Name</label>
            <div class="col-md-12">
              <input type="text" placeholder="Your username" class="form-control form-control-line" v-model="logInForm.username">

            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">Password</label>
            <div class="col-md-12">
              <input type="password" placeholder=" Your password" class="form-control form-control-line" v-model="logInForm.password">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-6 align-self-center">
              <a>Remember Me</a>
              <input type="checkbox" class="checkbox offset-1" v-model="logInForm.rem_me_check"/>
            </label>
            <label class="col-auto">
              <div class="col g-recaptcha" :data-sitekey="recaptKey"></div>
            </label>
          </div>

          <div class="form-group row">
            <div class="col-6">
              <!--<a class="btn btn-success col" @click="submitUserForm"><span style="color: white;">log in</span></a>-->
              <a class="btn btn-success col" @click="submitUserForm"><span style="color: white;">log in</span></a>
            </div>
            <div class="col-6">
              <a class="btn btn-success col" @click="toRegist"><span style="color: white;">Regist</span></a>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../store/types'
  import axios from 'axios'
  import store from '../store/store'
  import md from 'md5'

  export default {
    name: 'LogInCard',

    data(){
      return{
        logInForm :{
          username : '',

          password : '',
          rem_me_check : false
        },
        alertMsg : '',
        recaptKey : '6LcghpYUAAAAAPDOU5N8RjAsBY6bBiYCVugI_X5f',
        recaptId : 0,
      }
    },
    mounted(){
      //初始化Vuex.store
      this.$store.commit(types.TITLE, 'logInToken')
      //初始化reCAPTCHA
      if (window.grecaptcha) {
        this.recaptId = grecaptcha.render( $('.g-recaptcha')[0], { sitekey : this.recaptKey });
      }
    },
    methods:{
      toRegist(){
        this.$router.push({name:'RegistCard'})
      },

      submitUserForm(){
        if(!(this.logInForm.username && this.logInForm.password)){
          this.alertMsg = 'Input cannot be empty！'
        }
        else if(grecaptcha.getResponse(this.recaptId).length === 0){
          this.alertMsg = 'Please complete the authentication!'
        }
        else{
          this.alertMsg = ''
          this.postUserForm()
        }
      },
      postUserForm() {
        //Post User Message
        const URL = '/userlogin'
        const CODE_SUCCESS = 200
        const CODE_DISMATCH = 500
        const CODE_ERROR = 500
        const CODE_NO_LOGIN = 300
        const that = this

        console.log('发送登录请求')


        axios.post(URL,this.encodeForm
        ).then((response)=> {
          const respCode = response.data.status
          const respUserObj = response.data.obj
          if(respCode===CODE_SUCCESS){
            that.alertMsg = ''
            //更新令牌,本地储存用户信息
            that.$store.commit(types.LOGIN, JSON.stringify(respUserObj))
            that.jumpToHomePage()
          }
          else {
            that.alertMsg = response.data.msg
            alert(response.data.msg)
          }
        }).catch(function (err) {
          if(err.status===CODE_DISMATCH){
            that.alertMsg="Your username and password don't match!"
          }
        })
      },

      jumpToHomePage(){
        console.log('跳转至主页面')
        this.$router.replace({name: 'Home'})
        location.reload()
      },

      //测试用登录入口,正式部署时删除
      async testLogIn() {
        let user = await this.getUser()
        if(user){
          store.commit(types.LOGIN, JSON.stringify(user))
        }
        this.jumpToHomePage()
      },
      //测试用登录入口,正式部署时删除
      getUser(){
        const URL = 'http://localhost:8080/user/test'
        return axios.get(URL)
          .then(response => response.data.obj)
          .catch(err=>{
            alert("Fail to log in:"+err.message)
          })
      }
    },

    computed:{
      encodeForm(){
        const hashPassword = md(this.logInForm.password)
        let formData = new FormData()
        formData.append('username',this.logInForm.username)
        formData.append('password',hashPassword)
        formData.append('remember',this.checkOnOff)
        return formData
      },
      checkOnOff(){
        if(this.logInForm.rem_me_check){
          return 'On'
        }
        else {
          return 'Off'
        }
      }
    }

  }
</script>

<style scoped>
  .checkbox{
    left: auto;
    opacity: initial;
    width: 18px;
    height: 18px;
  }
</style>
