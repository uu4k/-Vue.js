export default {
  state: {
    count: 2
  },
  mutations: {
    update(state) {
      state.count += 100
    }
  }
}