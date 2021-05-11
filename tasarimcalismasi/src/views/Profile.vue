<template>
  <div class="profile">
    <!-- Componentlar profile ekranında gösterildi -->
    <Footer />
    <Profileview />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// Componentlar import edildi
import Footer from '@/components/Footer.vue'
import Profileview from '@/components/Profileview.vue'

export default {
  name: 'Profile',
  //   Profile.vue 'un kapsadığı componentlar belirtildi.
  components: {
    Footer,
    Profileview
  }
}
</script>
