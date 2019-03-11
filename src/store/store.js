/**
 * 令牌存储的Vuex对象接口
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: null,
        title: '',
        user: null
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            localStorage.token = 'token';
            state.token = "token";
            localStorage.user = data
            state.user = JSON.parse(data);
            console.log(state.user.roles[0].name);
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
            state.user  = null;
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})
