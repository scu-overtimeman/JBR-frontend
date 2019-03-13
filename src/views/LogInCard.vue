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
              <input type="text" placeholder="用户名" class="form-control form-control-line" v-model="logInForm.user_name">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">Password</label>
            <div class="col-md-12">
              <input type="password" placeholder="密码" class="form-control form-control-line" v-model="logInForm.password">
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
              <a class="btn btn-success col" @click="testLogIn"><span style="color: white;">log in</span></a>
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
          user_name : '',
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
        // this.recaptId = 1
      }
    },
    methods:{
      toRegist(){
        this.$router.push({name:'RegistCard'})
      },

      submitUserForm(){
        if(!(this.logInForm.user_name && this.logInForm.password)){
          this.alertMsg = '用户名或密码不能为空！'
        }
        else if(grecaptcha.getResponse(this.recaptId).length === 0){
          this.alertMsg = '请完成身份验证！'
        }
        else{
          this.alertMsg = ''
          this.postUserForm()
        }
      },
      postUserForm() {
        //Post User Message
        const URL = ''
        const CODE_SUCCESS = 200
        const CODE_FAIL = 500
        const CODE_ERROR = 500
        const CODE_NO_LOGIN = 300

        console.log('发送登录请求')

        axios.post(URL,this.encodeForm
        ).then(function (response) {
          console.log(response)
          const respCode = response.data.status
          // const respCode = 200
          const respUserObj = response.data.obj

          if(respCode === CODE_SUCCESS){
            this.alertMsg = ''
            //更新令牌,本地储存用户信息
            this.$store.commit(types.LOGIN, JSON.stringify(respUserObj))
            this.jumpToHomePage()
          }
          else {
            this.alertMsg = '用户名或密码错误!'
          }
        }).catch(function (err) {
          console.log(err)
          alert('连接错误：'+err.message)
        })
      },

      jumpToHomePage(){
        console.log('跳转至主页面')
        this.$router.replace({name: 'Home'})
        location.reload()
      },

      //测试用登录入口,正式部署时删除
      testLogIn: function () {
        const URL = 'http://localhost:8080/user/test'
        // axios.get(URL)
        //   .then(function (response) {
        //     const obj = response.data.obj
        //     store.commit(types.LOGIN, JSON.stringify(obj))
        //   })
        //   .catch(function (err) {
        //     console.log("err:" + err)
        //     alert('连接错误：' + err.message)
        //   })

        store.commit(types.LOGIN,JSON.stringify({
          "username":"zhangsan",
          "roles":[
            {"name":"ROLE_ADMIN"},
            {"name":"ROLE_VIP"}
            ]
        }))
        this.jumpToHomePage()
      }

    },

    computed:{
        encodeForm(){
        const hashPassword = md(this.logInForm.password)
        return {
          user_name: this.logInForm.user_name,
          password: hashPassword,
          rem_me_check: this.checkOnOff
        }
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
