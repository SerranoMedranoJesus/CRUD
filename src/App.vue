<template>
  <v-app>
    <Header/>
    <router-view/>
  </v-app>
</template>

<script>
import Header from './components/blocks/Header';

export default {
  components: {
    Header,
  }
};
</script>
