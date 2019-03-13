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
              <p class="text-danger">{{alertMsg}}</p>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-12">User Name</label>
            <div class="col-md-12">
              <input type="text" placeholder="用户名:[6-20位数字/大小写字符/下划线]" class="form-control form-control-line" v-model="registForm.username">
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
            <label class="col-auto">
              <div class="col g-recaptcha" :data-sitekey="recaptKey"></div>
            </label>
          </div>

          <div class="form-group row">
            <div class="col-sm-12">
              <a class="btn btn-success col-6" @click="submitUserForm"><span style="color: white">Complete</span></a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import md from 'md5'
  import axios from 'axios'

  export default {
    name: 'RegistCard',

    data(){
      return{
        registForm:{
          username : '',
          password : '',
          rep_passw : '',
        },
        alertMsg : '',
        recaptKey : '6LcghpYUAAAAAPDOU5N8RjAsBY6bBiYCVugI_X5f',
        recaptId : 0,
      }
    },
    mounted(){
      //初始化reCAPTCHA
      if (window.grecaptcha) {
        this.recaptId = grecaptcha.render( $('.g-recaptcha')[0], { sitekey : this.recaptKey });
      }
    },

    methods:{
      submitUserForm(){
        const rex = /^[a-zA-Z0-9_]{6,20}$/
        if(!(this.registForm.username && this.registForm.password && this.registForm.rep_passw)){
          this.alertMsg='输入不能为空!'
        }
        else if(!rex.test(this.registForm.username)){
          this.alertMsg='您输入的用户名不合法!'
        }
        else if(!rex.test(this.registForm.password)){
          this.alertMsg='您输入的密码不合法!'
        }
        else if(this.registForm.password!=this.registForm.rep_passw){
          this.alertMsg='两次密码输入不一致!'
        }
        else if(grecaptcha.getResponse(this.recaptId).length === 0){
          this.alertMsg = '请完成身份验证！'
        }
        else {
          this.alertMsg=''
          this.postUserForm()
        }
      },
      postUserForm(){
        //Post User Message
        const URL = ''
        const CODE_SUCCESS = 200
        const CODE_FAIL = 500
        const CODE_ERROR = 500
        const CODE_ALREADYRIGIST = 250
        const CODE_NO_LOGIN = 300

        axios.post(URL,this.encodeForm
        ).then(function (response){
          console.log(response)
          const respCode = response.data.code
          const respMsg = response.data.msg

          if(respCode==CODE_SUCCESS){
            console.log(respMsg)
            alert('注册成功')
            this.$router.replace({name: 'LogInCard'})
          }
          else if (respCode==CODE_ALREADYRIGIST){
            alert('注册失败：用户名已存在')
          }
          else {
            console.log(respMsg)
            alert('注册失败!')
          }

        }).catch(function (err) {
          console.log(err)
          alert('连接错误!'+err.message)
        })
      }

    },

    computed:{
      encodeForm(){
        const hashPassword = md(this.registForm.password)
        return {
          username: this.registForm.username,
          password: hashPassword
        }
      }
    }

  }
</script>

<style scoped>

</style>
