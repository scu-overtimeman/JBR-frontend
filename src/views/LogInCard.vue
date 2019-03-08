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
              <p style="color: red">{{alert_msg}}</p>
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
            <label class="col-md-6">Remember Me</label>
            <div class="col-md-6">
              <label>
                123
                <input type="checkbox" class="checkbox">
              </label>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-6">
              <!--<button class="btn btn-success col" @click="submitUserForm">log in</button>-->
              <button class="btn btn-success col" @click="jumpToHomePage">log in</button>
            </div>
            <div class="col-6">
              <button class="btn btn-success col" @click="toRegist">Regist</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../store/types'
  export default {
    name: 'LogInCard',

    data(){
      return{
        logInForm :{
          user_name : '',
          password : '',
          check_box : false
        },
        alert_msg : ''
      }
    },
    mounted(){
      //初始化Vuex.store
      this.$store.commit(types.TITLE, 'logInToken')
    },
    methods:{
      toRegist(){
        this.$router.push({name:'RegistCard'})
      },

      submitUserForm(){
        if(!(this.logInForm.user_name && this.logInForm.password)){
          this.alert_msg = '用户名或密码不能为空！'
        }
        else{
          this.alert_msg = ''
          this.postUserForm()
        }
      },
      postUserForm(){
        //Post User Message
        const URL = ''
        const CODE_SUCCESS = 200
        const CODE_FAIL = 500
        const CODE_ERROR = 500
        const CODE_NO_LOGIN = 300

        this.axios.post(URL,this.encodeForm()
        ).then(function (response) {
          console.log(response)
          const respCode = response.data.code
          const respMsg = response.data.msg

          if(respCode==CODE_SUCCESS){
            console.log(respMsg)
            this.alert_msg = ''
            // this.getToken()
            this.jumpToHomePage()
          }
          else {
            console.log(respMsg)
            this.alert_msg = '用户名或密码错误!'
          }
        }).catch(function (err) {
          console.log(err)
          alert('连接错误：'+err)
        })
      },

      jumpToHomePage(){
        this.getToken()
        console.log('跳转至主页面')
        this.$router.replace({name: 'Home'})
      },
      //取得令牌
      getToken(){
        console.log('修改token')
        this.$store.commit(types.LOGIN, this.encodeForm)
      }
    },

    computed:{
      encodeForm(){
        const bcrypt = require('bcryptjs')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(this.logInForm.password, salt)
        return {
          user_name: this.logInForm.user_name,
          password: hash
        }
      }

    }

  }
</script>

<style scoped>

</style>
