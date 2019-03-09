<template>
  <div class="col-12">
    <div class="col-10 offset-1 card">
      <div class="card-block">
        <form class="form-horizontal form-material">

          <div class="form-group row">
            <div class="col-12">
              <h1 class="text-themecolor">REGISTER</h1>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <p class="text-danger">{{alert_msg}}</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">User Name</label>
            <div class="col-md-12">
              <input type="text" placeholder="用户名:[6-20位数字/大小写字符/下划线]" class="form-control form-control-line" v-model="registForm.user_name">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">Password</label>
            <div class="col-md-12">
              <input type="password" placeholder="输入密码:[6-20位数字/大小写字符/下划线]" class="form-control form-control-line" v-model="registForm.password">
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">Comfirm Password</label>
            <div class="col-md-12">
              <input type="password" placeholder="确认密码" class="form-control form-control-line" v-model="registForm.rep_passw">
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-12">
              <button class="btn btn-success col-6" @click="submitUserForm">Complete</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LogInCard',

    data(){
      return{
        registForm:{
          user_name : '',
          password : '',
          rep_passw : '',
        },
        alertMsg : ''
      }
    },

    methods:{
      submitUserForm(){
        const rex = /^[a-zA-Z0-9_]{6,10}$/
        if(!(this.registForm.user_name && this.registForm.password && this.registForm.rep_passw)){
          this.alert_msg='输入不能为空'
        }
        else if(!rex.test(this.registForm.user_name)){
          this.alert_msg='您输入的用户名不合法'
        }
        else if(!rex.test(this.registForm.password)){
          this.alert_msg='您输入的密码不合法'
        }
        else if(this.registForm.password!=this.registForm.rep_passw){
          this.alert_msg='两次密码输入不一致'
        }
        else {
          this.alert_msg=''
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

        this.axios.$http.post(URL,this.encodeForm()
        ).then(function (response){
          console.log(response)
          const respCode = response.data.code
          const respMsg = response.data.msg

          if(respCode==CODE_SUCCESS){
            console.log(respMsg)
            this.alertMsg = ''
            alert('注册成功')
            this.$router.replace({name: 'LogInCard'})
          }
          else {
            console.log(respMsg)
            alert('注册失败!')
          }

        }).catch(function (err) {
          console.log(err)
          alert('提交错误!')
        })
      }

    },

    computed:{
      encodeForm(){
        const bcrypt = require('bcryptjs')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(this.registForm.password, salt)
        return {
          user_name: this.registForm.user_name,
          password: hash
        }
      }
    }

  }
</script>

<style scoped>

</style>
