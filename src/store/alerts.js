const state = {
  alerts: [],
  id: 1,
};

const mutations = {
  create: (state, payload) => {
    state.alerts = [...state.alerts, payload];
  },
  reset: (state) => {
    state.alerts = [];
  },
  deleteById: (state, id) => {
    state.alerts = state.alerts.filter(n => n.id != id);
  },
  nextId: (state) => {
    state.id = state.id + 1;
  }
}

const actions = {
  create: ({ commit, state }, alert) => {
    let defaultAlert = {
      title: '',
      text: '',
      type: 'info',
      delay: 5
    };

    alert = { ...defaultAlert, ...alert };
    alert = { ...alert, id: state.id };
    commit('nextId');
    setTimeout(() => { commit('deleteById', alert.id) },
      alert.delay * 1000
    );
    commit('create', alert);
  },

  success: ({ dispatch }, { title, text }) => dispatch('create', { title, text, type: 'success' }),

  error: ({ dispatch }, { title, text }) => dispatch('create', { title, text, type: 'error' }),

  deleteById: ({commit}, id) => commit('deleteById', id),

  reset: ({commit}) => commit('reset'),
}

export const alerts = {
  namespaced: true,
  state,
  mutations,
  actions,
};
