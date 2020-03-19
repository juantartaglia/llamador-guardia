export const state = () => ({
  counter: 0
});

export const mutations = {
  idle(state) {
    state.counter = 0;
  },
  busy(state) {
    state.counter = 1;
  }
};

export const actions = {};
