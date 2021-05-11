<template>
  <div class="tests">
    <!-- Componentlar profile ekranında gösterildi -->
    <Footer />
    <div>
      <!-- Quiz componentına serverdan çekilen veriler gönderildi -->
      <Quiz :optiontext="question"/>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// Componentlar import edildi
import Quiz from '@/components/Quiz.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Tests',
  // Tests.vue 'un kapsadığı componentlar belirtildi.
  components: {
    Footer,
    Quiz
  },
  data () {
    return {
      question: []
    }
  },
  // Serverdan Test ekranı için veriler çekildi
  created () {
    fetch('http://localhost:8081/tests', {
      method: 'get'
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonData) => {
        for (let i = 0; i < 10; i++) {
          this.question = jsonData.recordsets[0]
        }
      })
  }
}
</script>
