import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, logoutUser, checkUser } from '../services/authService';
import searchUser from '../services/searchService';
import { getWorker, getPublicationsTypes } from '../services/workerService';
import getDepartments from '../services/mainService';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {
      token: localStorage.getItem('token') || '',
    },
    users: [],
    worker: {},
    departs: [],
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
    SET_WORKER: (state, worker) => {
      state.worker = worker;
    },
    CLEAR_WORKER: (state) => {
      state.worker = {};
    },
    SET_DEPARTS: (state, departs) => {
      state.departs = departs;
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
    },
    FETCH_WORKER({ commit }, options) {
      return getWorker(options)
        .then(res => {
          commit('SET_WORKER', res);
          return res;
        });
    },
    FETCH_PUB_TYPES() {
      return getPublicationsTypes();
    },
    FETCH_DEPARTS({ commit }) {
      return getDepartments().then((res) => {
        commit('SET_DEPARTS', res);
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
    },
    GET_WORKER({ worker }) {
      return worker;
    },
    GET_DEPARTS({ departs }) {
      return departs;
    }
  }
});

export default store;