<template>
  <div>
    <div class="card col-12">
      <div class="card-block">
        <h4 class="card-title">My Information</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th>Username</th>
              <th>Roles</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{selfUser.username}}</td>
              <td>
                <a  v-for="(role, index) in selfUser.roles" :key="index">
                  {{role.name+";"}}
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card col-12">
      <div class="card-block">
        <h4 class="card-title">User List</h4>
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th>Username</th>
              <th>Roles Manage</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{user.username}}</td>
              <td>
                <a class="btn btn-warning" @click="editRoles($event, index)"><span style="color: white">Check/Edit</span></a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card rolesCard"
         :style="'left: '+rolesCardX+
         ';top: '+rolesCardY+';'"
         v-show="showRolesCard">
      <div class="card-block">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th>Roles</th>
              <th>On/Off</th>
            </tr>
            </thead>
            <tbody v-for="(role,index) in rolesList" :key="index">
            <tr>
              <td>{{role.name}}</td>
              <td>
                <input type="checkbox" class="checkbox" v-model="rolesList[index].checked"/>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col-5">
              <a class="btn btn-success"><span style="color: white">Submit</span></a>
            </div>
            <div class="col-5">
              <a class="btn btn-danger" @click="hideRoles"><span style="color: white">Cancel</span></a>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<script>
  import axios from 'axios'
  import store from '../store/store'

  export default {
    name: 'UserManagement',
    data(){
      return{
        users: [],           //用户列表
        selfUser:{},        //管理员自己
        showRoleUser:{},    //当前选中用户
        showRolesCard: false,
        rolesList:[],
        rolesCardX: 0+'px',
        rolesCardY: 0+'px',
      }
    },
    mounted() {

      this.testInit()//正式部署时删除

      this.getRemoteInfo()
      // this.getUsersInfo()
      // let allUsers = resp.data.obj
      // let i = 0
      // for(let user in allUsers){
      //   if(allUsers[user].username !== this.selfUser.username){
      //     this.users[i] = allUsers[user]
      //     i+=1
      //   }
      // }
    },
    methods:{
      async getRemoteInfo(){
        this.getSelfUser()
        let allUsers = await (this.getUsersInfo())


      },
      //取得自己数据
      getSelfUser(){
        this.selfUser = store.state.users
      },
      //获取所有其他用户数据
      getUsersInfo(){

        const URL_allUsers = ''

        return axios.get(URL_allUsers)
          .then(resp=>resp.data.obj)
      },

      //正式部署时删除
      testInit(){
        let allUsers = [
          {
            username:'Star Platinum',
            roles:[
              {name:'VIP1'},
              {name:'VIP2'},
              {name:'VIP3'},
            ]
          },
          {
            username:'The World',
            roles:[
            ]
          },
          {
            username:'Golden Exprience',
            roles:[
              {name:'VIP1'},
              {name:'VIP2'}
            ]
          },
          {
            username:'Sticky Finger',
            roles:[
              {name:'VIP1'},
              {name:'VIP2'}
            ]
          },
          {
            username:'Magician\'s Red',
            roles:[
              {name:'VIP1'},
              {name:'VIP2'}
            ]
          },
          {
            username:'King Crimson',
            roles:[
              {name:'VIP1'},
              {name:'VIP2'}
            ]
          },
        ]
        this.selfUser = allUsers[0]
        let i = 0
        for(let user in allUsers){
          if(allUsers[user].username !== this.selfUser.username){
            this.users[i] = allUsers[user]
            i+=1
          }
        }

        this.showRoleUser = this.users[0]
        this.rolesList = [
          {name:'VIP1',checked:false},
          {name:'VIP2',checked:false},
          {name:'VIP3',checked:false},
        ]
      },
      editRoles: function (e, index) {
        //设置所选用户当前用户
        this.showRoleUser = this.users[index]
        //修改rolesCard位置
        this.rolesCardX = e.target.getBoundingClientRect().left + 'px'
        this.rolesCardY = e.target.getBoundingClientRect().top - 250 + 'px'

        //初始化已选列表
        for (let i in this.rolesList) {
          this.rolesList[i].checked = false
        }
        //修改rolesCard内容
        if(this.showRoleUser.roles.length>0 && this.rolesList.length>0){
          let j = 0
          for (let i in this.rolesList) {
            if (this.rolesList[i].name === this.showRoleUser.roles[j].name) {
              this.rolesList[i].checked = true
              j += 1
              if (j >= this.showRoleUser.roles.length) {
                break
              }
            }
          }
        }

        this.showRolesCard = true
      },
      hideRoles(){
        this.showRolesCard = false
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

  .rolesCard{
    position: absolute;
    width: 200px;
  }

</style>
