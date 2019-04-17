<template>
<div>
  <div v-if="user" class="header">
    <div>
      <h2>{{user.name}}</h2>
    </div>
    <div class="button">
      <p><button @click=" logout" class="pure-button pure-button-primary">Logout</button></p>
    </div>
  </div>
  <div v-if="user">
      <p>Total Correct: {{user.correctValue}} </p>
      <p>Total Incorrect: {{user.incorrectValue}} </p>
      <p>Current Streak: {{user.currentStreak}} </p>
      <p>Longest Streak: {{user.longestStreak}} </p>
  </div>
  <div v-else>
    <p>If you would like to upload photos, please register for an account or login.</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'mypage',
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        return error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.pure-button {
  margin: 0px 20px;
}

.header {
  display: flex;
}

.header .button {
  margin-left: 50px;
  order: 2;
}
</style>
