<template>
<div class="pokemonlist">
  <div class="image" v-for="pokemon in pokemonlist" v-bind:key="pokemon.name">
    <img :src="pokemon.image" @click="choose(pokemon)"/>
  </div>
</div>
</template>

<script>

export default {
  name: 'Pokemon',
  props: {
    pokemonlist: Array
  },
  methods: {
    choose(pokemon) {
      this.$emit('pokemonChosen', pokemon);
    }
  },
}
</script>

<style scoped>

.pokemonlist {
  display: flex;
  justify-content: space-evenly;
}

.image {
  margin: 0 0 1.5em;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
