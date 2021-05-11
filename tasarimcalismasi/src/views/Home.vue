<template>
  <div class="home">
    <!-- Componentlar home ekranında gösterildi -->
    <Register />
    <div class="bckgrndimage">
      <Navbar />
      <BigScreen />
    </div>
    <!-- Databaseden çekilen veriler MiddleField componentına gönderildi -->
    <MiddleField :tests="tests"/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// Componentlar import edildi
import Register from '@/components/Register.vue'
import Navbar from '@/components/Navbar.vue'
import BigScreen from '@/components/BigScreen.vue'
import MiddleField from '@/components/MiddleField.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  // Home.vue 'un kapsadığı componentlar belirtildi.
  components: {
    Register,
    Navbar,
    BigScreen,
    MiddleField,
    Footer
  },
  data () {
    return {
      tests: [],
      index: 1
    }
  },
  // Serverdan Anasayfa için veriler çekildi
  created () {
    fetch('http://localhost:8081/', {
      method: 'get'
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        for (let i = 0; i < 10; i++) {
          this.tests = jsonData.recordsets[0]
        }
      })
  }
}
</script>
