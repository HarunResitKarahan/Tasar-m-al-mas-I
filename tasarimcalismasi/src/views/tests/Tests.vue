<template>
  <div class="tests">
    <!-- Componentlar profile ekranında gösterildi -->
    <TestNavbar />
    <Footer />
    <div>
      <!-- Quiz componentına serverdan çekilen veriler gönderildi -->
      <Quiz :optiontext="question" :category="category" :path="$attrs.path" :testIndex="testIndex" :testname="testname"/>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// Componentlar import edildi
import Quiz from '@/components/Quiz.vue'
import Footer from '@/components/Footer.vue'
import TestNavbar from '@/components/tests/TestNavbar.vue'

export default {
  name: 'Tests',
  // Tests.vue 'un kapsadığı componentlar belirtildi.
  components: {
    TestNavbar,
    Quiz,
    Footer
  },
  data () {
    return {
      question: Array,
      testIndex: -1,
      category: -1,
      testname: ''
    }
  },
  // Serverdan Test ekranı için veriler çekildi
  created () {
    this.testIndex = this.$attrs.index
    this.category = this.$attrs.category
    this.testname = this.$attrs.testname
    if (!(this.$attrs.index === undefined)) {
      localStorage.testIndex = this.testIndex
      localStorage.category = this.category
    } else {
      this.testIndex = localStorage.testIndex
      this.category = localStorage.category
    }
    fetch('http://localhost:8081/tests', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        indexOfTest: this.testIndex
      })
    })
      .then((response) => response.json())
      .then(data => {
        this.question = data
      })
  }
}
</script>
