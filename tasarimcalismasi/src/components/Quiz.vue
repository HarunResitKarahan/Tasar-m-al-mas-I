<template>
  <div class="quiz">
    <div class="questions">
      <!-- Mevcut soruya göre soru numarası gösterildi -->
      <div class="questionnumber">
        <p class="m-0">{{index+1}}/20</p>
      </div>
      <!-- Soru gösterildi -->
      <h6 class="p-4">{{optiontext[index].question}}</h6>
      <!-- Şıklar gösterildi -->
      <div class="answers">
        <li>
          <ul @click="setSelectedOption(1)" :class="selectedArray[index] === 1 || selectedoption === 1 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
            {{option[0]}}{{optiontext[index].optionA}} <!--Databasedeki şık A gösterildi-->
          </ul>
          <ul @click="setSelectedOption(2)" :class="selectedArray[index] === 2 || selectedoption === 2 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
            {{option[1]}}{{optiontext[index].optianB}} <!--Databasedeki şık B gösterildi-->
          </ul>
          <ul @click="setSelectedOption(3)" :class="selectedArray[index] === 3 || selectedoption === 3 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
            {{option[2]}}{{optiontext[index].optianC}} <!--Databasedeki şık C gösterildi-->
          </ul>
          <ul @click="setSelectedOption(4)" :class="selectedArray[index] === 4 || selectedoption === 4 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
            {{option[3]}}{{optiontext[index].optianD}} <!--Databasedeki şık D gösterildi-->
          </ul>
        </li>
      </div>
      <div class="navigator">
        <!-- İleri geri yön tuşları mevcut soruya göre aktif yada pasif olarak ayarlandı -->
        <template v-if="index <= 0">
          <button class="backward" style="background: #80808077;" :disabled="true"></button>
          <button @click="next" class="forward"></button>
        </template>
        <template v-else-if="index >= 19">
          <button @click="back" class="backward"></button>
          <button class="forward" style="background: #80808077;" :disabled="true"></button>
        </template>
        <template v-else>
          <button @click="back" class="backward"></button>
          <button @click="next" class="forward"></button>
        </template>
      </div>
    </div>
    <!-- Testin sağındaki hızlı soru değiştirme menüsü gösterildi -->
    <div class="fastchange">
      <template v-for="(item, index) in items">
        <a @click="setindex(index)" href="#" class="change" :key="item.message" :class="index + 1 === currentQuestion ? 'currentchange' : ''">{{ item }}</a>
      </template>
      <div class="exit">
        Testi Bitir.
        <router-link to="/" style="color: white;"><b-icon-door-open class="door"/></router-link> <!--Test bitirme -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    optiontext: Array
  },
  data () {
    return {
      option: ['A-) ', 'B-) ', 'C-) ', 'D-) '],
      selectedoption: 0,
      selectedArray: [],
      currentQuestion: 1,
      index: 0,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }
  },
  methods: {
    // Mevcut Soru ilerletildi
    next () {
      this.index++
      this.selectedoption = 0
      this.currentQuestion = this.index + 1
    },
    // Mevcut Sorudan geriye gidildi
    back () {
      this.index--
      this.selectedoption = 0
      this.currentQuestion = this.index + 1
    },
    // Hızlı soru değiştirme menüsüne göre soru değiştirildi
    setindex (index) {
      this.index = index
      this.currentQuestion = index + 1
    },
    // Tıklanan şık işaretlendi
    setSelectedOption (index) {
      this.selectedoption = index
      this.selectedArray[this.index] = index
      this.selectedoption = 0
    }
  }
}
</script>
