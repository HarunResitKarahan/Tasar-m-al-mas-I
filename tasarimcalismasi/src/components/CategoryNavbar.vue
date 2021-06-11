<template>
    <div class="categorynavbar">
        <router-link to="/"><img src="../assets/test2.png" width="200px"></router-link>
        <Signin />
    </div>
</template>

<script>
import Signin from './Navbar/signin/Signin.vue'
export default {
  name: 'CategoryNavbar',
  components: {
    Signin
  },
  props: {
  },
  data () {
    return {
    }
  }
}
</script>
