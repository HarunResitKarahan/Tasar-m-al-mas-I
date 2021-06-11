<template>
    <div class="matematikcategory">
        <CategoryNavbar />
        <CategoryMenu :tests="tests" :category="category" :shuffle="shuffle" :suggestion="suggestion"/>
        <Footer />
    </div>
</template>

<script>
import CategoryMenu from '@/components/CategoryMenu.vue'
import CategoryNavbar from '@/components/CategoryNavbar.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'MatematikCategory',
  components: {
    CategoryMenu,
    CategoryNavbar,
    Footer
  },
  data () {
    return {
      tests: [],
      category: String,
      index: 1,
      sirala: [],
      lastadded: [],
      shuffle: [],
      suggestion: []
    }
  },
  created () {
    if (localStorage.path) {
      localStorage.removeItem('path')
    }
    fetch('http://localhost:8081/matematik', {
      method: 'get'
    })
      .then((response) => response.json())
      .then(data => {
        this.tests = data
        this.category = data[0].categoryNo
      })
    fetch('http://localhost:8081/', {
      method: 'get'
    })
      .then((response) => response.json())
      .then(data => {
        this.sirala = data
        // tıklanma sayısına göre veriler çekildi
        for (var i = 0; i < this.sirala.length; i++) {
          var min = i
          for (var j = i + 1; j < this.sirala.length; j++) {
            if (this.sirala[j].countOfClick > this.sirala[min].countOfClick) {
              min = j
            }
          }
          var temp = this.sirala[i]
          this.sirala[i] = this.sirala[min]
          this.sirala[min] = temp
        }
        var lastadded = []
        for (i = 0; i < this.sirala.length; i++) {
          lastadded[i] = this.sirala[i]
        }
        this.lastadded = lastadded
        for (i = 0; i < this.lastadded.length; i++) {
          min = i
          for (j = i + 1; j < this.lastadded.length; j++) {
            if (this.lastadded[j].testNo > this.lastadded[min].testNo) {
              min = j
            }
          }
          temp = this.lastadded[i]
          this.lastadded[i] = this.lastadded[min]
          this.lastadded[min] = temp
        }
        var shuffle = []
        for (i = 0; i < this.sirala.length; i++) {
          shuffle[i] = this.sirala[i]
        }
        function funcshuffle (shuffle) {
          var currentIndex = shuffle.length
          var temporaryValue, randomIndex

          // While there remain elements to shuffle...
          while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            // And swap it with the current element
            temporaryValue = shuffle[currentIndex]
            shuffle[currentIndex] = shuffle[randomIndex]
            shuffle[randomIndex] = temporaryValue
          }

          return shuffle
        }
        this.shuffle = funcshuffle(shuffle)
      })
    if (localStorage.username) {
      fetch('http://localhost:8081/getsuggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: localStorage.username
        })
      })
        .then(res => res.json())
        .then(data => {
          this.suggestion = data
          var suggestion = []
          for (var i = 0; i < this.suggestion.length; i++) {
            suggestion[i] = this.suggestion[i]
          }
          function funcshuffle (suggestion) {
            var currentIndex = suggestion.length
            var temporaryValue, randomIndex

            // While there remain elements to shuffle...
            while (currentIndex !== 0) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex)
              currentIndex -= 1

              // And swap it with the current element
              temporaryValue = suggestion[currentIndex]
              suggestion[currentIndex] = suggestion[randomIndex]
              suggestion[randomIndex] = temporaryValue
            }

            return suggestion
          }
          this.suggestion = funcshuffle(suggestion)
        })
    }
  }
}
</script>
