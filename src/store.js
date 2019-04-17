import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    pokemon: [],
    selectedPokemon: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      console.log("New User: " + user);
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
      console.log(pokemon);
    },
    setSelectedPokemon(state, selectedPokemon) {
      state.selectedPokemon = selectedPokemon;
      console.log(selectedPokemon);
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async getNewPokemonSet(context) {
      try {
        var pokemon = [];
        for (let i = 0; i < 4; i++) {
          let randomNumber = Math.floor((Math.random() * 807) + 1);
          await axios.get('https://pokeapi.co/api/v2/pokemon/' + randomNumber)
            .then(function (response) {
              let name = response.data.forms[0].name;
              let image = response.data.sprites.front_default;

              pokemon[i] = {
                image,
                name
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(pokemon[i]);
        }
        context.commit('setPokemon', pokemon);
        let randomIndex = Math.floor(Math.random() * 4);
        context.commit('setSelectedPokemon', pokemon[randomIndex]);
        return "";
      } catch (error) {
        return "";
      }
    },
    async updateUserWin(context) {
      try {
        await axios.put("/api/users/win");
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        console.log(error);
        return "";
      }
    },
    async updateUserLoss(context) {
      try {
        await axios.put("/api/users/lose");
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
      } catch (error) {
        console.log(error);
        return "";
      }
    },
  }
})
