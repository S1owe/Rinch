import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, logoutUser, checkUser } from '../services/authService';
import searchUser from '../services/searchService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem('token') || '',
    },
    users: [],
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    }
  },
  actions: {
    LOGIN_USER({ commit }, { login, password }) {
      return loginUser(login, password)
        .then(user => {
          commit('SET_USER', user);
          localStorage.setItem('token', user.token);
          return user;
        });
    },
    LOGOUT_USER({ commit }) {
      localStorage.removeItem('token');

      return logoutUser()
        .then(() => commit('SET_USER', {}))
        .catch((err) => console.error(err));
    },
    CHECK_USER({ state }) {
      if (state.user.token.trim())
        return checkUser(state.user.token)
      else
        return false;
    },
    FETCH_USERS({ commit }, query) {
      return searchUser(query)
        .then(res => {
          commit('SET_USERS', res);
          return res;
        });
    }
  },
  getters: {
    GET_USER({ user }) {
      return user;
    },
    GET_USERS({ users }) {
      return users;
    }
  }
});

export default store;