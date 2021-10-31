import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iscollapse: false,
    collapseicon: "el-icon-s-fold",
    collapsetxt: "收起"
  },
  mutations: {
    setIscollapse(state) {
      state.iscollapse = !state.iscollapse;
      if (state.collapseicon === "el-icon-s-unfold") {
        state.collapseicon = "el-icon-s-fold"
      } else {
        state.collapseicon = "el-icon-s-unfold"
      }
      if (state.collapsetxt === "收起") {
        state.collapsetxt = "展开"
      } else {
        state.collapsetxt = "收起"
      }
    }
  },
  actions: {
    setIscollapseAction(context) {
      context.commit("setIscollapse")
    }
  },
  modules: {
  }
})
