<template>
<div>
  <p>Which of these Pokemon is {{selectedPokemon.name}}?</p>
  <pokemon :pokemonlist="pokemon" v-on:pokemonChosen="pokemonChosen"/>

  <p>Check the My Score Page to see how you're doing</p>
  <p>Be sure to Log-in so we can track your game</p>
</div>
</template>


<script>
// @ is an alias to /src
import Pokemon from '@/components/Pokemon.vue'

export default {
  name: 'home',
  components: {
    Pokemon
  },
  computed: {
    pokemon() {
      return this.$store.state.pokemon;
    },
    selectedPokemon() {
      return this.$store.state.selectedPokemon;
    }
  },
  async created() {
    await this.$store.dispatch("getNewPokemonSet");
  },
  methods: {
    async pokemonChosen(pokemon) {
      if (pokemon.name === this.selectedPokemon.name) {
        console.log("Correct Answer");
        //Show the Correct modal
        //Add user correct
        await this.$store.dispatch("updateUserWin");
      } else {
        console.log("Incorrect Answer");
        //Show the incorrect modal
        //Add user incorrect
        await this.$store.dispatch("updateUserLoss");
      }
      //reload new image set
      this.$store.dispatch("getNewPokemonSet");
    },
  }
}
</script>
