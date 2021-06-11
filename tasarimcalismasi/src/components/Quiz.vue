<template>
  <div class="quiz" :class="'bckgrnd' + category">
    <div class="questions mb-2" :style="isitend == 1 ? 'display: none' : ''">
      <div class="testheader p-1" :class="'background' + category">
        <div class="questionnumber p-1 ml-3">
          <p class="m-0">{{index+1}}/20</p>
        </div>
        <p class="m-0 p-1">TEST {{testIndex}}: {{testname}}</p>
        <div id="seconds-counter" class="p-1" :class="username == '' ? 'mr-1' : 'mr-5'" :style="seconds < 10 && minute >= 10 ? '' : 'display: none;'">00:{{minute}}:0{{seconds}}</div>
        <div id="seconds-counter" class="p-1" :class="username == '' ? 'mr-1' : 'mr-5'" :style="seconds < 10 && minute < 10 ? '' : 'display: none;'">00:0{{minute}}:0{{seconds}}</div>
        <div id="seconds-counter" class="p-1" :class="username == '' ? 'mr-1' : 'mr-5'" :style="seconds >= 10 && minute >= 10 ? '' : 'display: none;'">00:{{minute}}:{{seconds}}</div>
        <div id="seconds-counter" class="p-1 " :class="username == '' ? 'mr-1' : 'mr-5'" :style="seconds >= 10 && minute < 10 ? '' : 'display: none;'">00:0{{minute}}:{{seconds}}</div>
        <template v-if="username != ''">
        <b-icon-star @mouseover="hover = true" @mouseleave="hover = false" style="position: absolute;
    margin-left: 15px;
    top: 8.2px;
    right: 16px;
    color: white;
    width: 22px;
    height: 22px;
    cursor: pointer;" :style="hover === true && starclick === false ? 'display: none' : ''"/>
    <b-icon-star-fill @click="addfavorite" @mouseover="hover = true" @mouseleave="hover = false" style="position: absolute;
    margin-left: 15px;
    top: 8.2px;
    right: 16px;
    color: white;
    width: 22px;
    height: 22px;
    cursor: pointer;" :style="hover === true || starclick === true ? '' : 'display: none'"/>
        </template>
      </div>
      <!-- Soru gösterildi -->
      <!-- Şıklar gösterildi -->
      <div class="answers">
        <div class="option">
          <h6 class="p-4 m-0">{{optiontext[index].question}}</h6>
          <li>
            <ul @click="setSelectedOption(1)" :class="selectedArray[index] === 1 || selectedoption === 1 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
              {{option[0]}}{{optiontext[index].optionA}} <!--Databasedeki şık A gösterildi-->
            </ul>
            <ul @click="setSelectedOption(2)" :class="selectedArray[index] === 2 || selectedoption === 2 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
              {{option[1]}}{{optiontext[index].optionB}} <!--Databasedeki şık B gösterildi-->
            </ul>
            <ul @click="setSelectedOption(3)" :class="selectedArray[index] === 3 || selectedoption === 3 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
              {{option[2]}}{{optiontext[index].optionC}} <!--Databasedeki şık C gösterildi-->
            </ul>
            <ul @click="setSelectedOption(4)" :class="selectedArray[index] === 4 || selectedoption === 4 ? 'selectedOption' : ''"> <!--Tıklanan şıkka göre şık işaretlendi-->
              {{option[3]}}{{optiontext[index].optionD}} <!--Databasedeki şık D gösterildi-->
            </ul>
          </li>
        </div>
        <div class="fastchange" :style="isitend == 1 ? 'display: none' : ''">
          <template v-for="(item, index) in items">
            <p @click="setindex(index)" class="change" :key="item.message" :class="index + 1 === currentQuestion ? 'currentchange ' + 'background' + category : 'change' + category">{{ item }}</p>
          </template>
          <div class="exit">
            Testi Bitir.
            <b-icon-door-open @click="results" class="door" :class="'background' + category"/>
          </div>
        </div>
      </div>
      <div class="navigator">
        <!-- İleri geri yön tuşları mevcut soruya göre aktif yada pasif olarak ayarlandı -->
        <template v-if="index <= 0">
          <button class="backward" style="background: #80808077;" :disabled="true"></button>
          <button @click="next" class="forward" :class="'background' + category"></button>
        </template>
        <template v-else-if="index >= 19">
          <button @click="back" class="backward" :class="'background' + category"></button>
          <button class="forward" style="background: #80808077;" :disabled="true"></button>
        </template>
        <template v-else>
          <button @click="back" class="backward" :class="'background' + category"></button>
          <button @click="next" class="forward" :class="'background' + category"></button>
        </template>
      </div>
    </div>
    <!-- Testin sağındaki hızlı soru değiştirme menüsü gösterildi -->
    <div class="results" :style="isitend == 1 ? 'display: block' : ''">
      <p align="center" style="font-size: 24px;margin-top: 7px;">TESTİ BİTİRDİNİZ</p>
      <div class="line"></div>
      <div class="result">
        <ul>
          <li>
            <div :style="currentseconds < 10 && currentminute >= 10 ? '' : 'display: none;'">Bitirme Süresi: {{currentminute}}:0{{currentseconds}}</div>
            <div :style="currentseconds < 10 && currentminute < 10 ? '' : 'display: none;'">Bitirme Süresi: 0{{currentminute}}:0{{currentseconds}}</div>
            <div :style="currentseconds >= 10 && currentminute >= 10 ? '' : 'display: none;'">Bitirme Süresi: {{currentminute}}:{{currentseconds}}</div>
            <div :style="currentseconds >= 10 && currentminute < 10 ? '' : 'display: none;'">Bitirme Süresi: 0{{currentminute}}:{{currentseconds}}</div>
          </li>
          <li>
            Doğru Sayısı: {{puan / 5}}
          </li>
          <li>
            Yanlış Sayısı: {{20 - ((puan / 5) + emptyquestions)}}
          </li>
          <li>
            Boş Sayısı: {{emptyquestions}}
          </li>
          <li>
            PUAN: {{puan}}/100
          </li>
        </ul>
      </div>
      <router-link :to="backtopath"><b-icon-door-open class="door" style="color: white;"/></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    optiontext: Array,
    category: String,
    path: String,
    testIndex: Number,
    testname: String
  },
  data () {
    return {
      option: ['A-) ', 'B-) ', 'C-) ', 'D-) '],
      selectedoption: 0,
      selectedArray: [],
      currentQuestion: 1,
      index: 0,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      isitend: 0,
      puan: 0,
      emptyquestions: 0,
      seconds: 0,
      minute: 0,
      currentminute: 0,
      currentseconds: 0,
      backtopath: '',
      hover: false,
      starclick: false,
      username: ''
    }
  },
  mounted () {
    setInterval(() => {
      this.seconds++
      if (this.seconds === 60) {
        this.seconds = 0
        this.minute++
      }
    }, 1000)
  },
  created () {
    if (!localStorage.path) {
      localStorage.path = this.path
    }
    if (localStorage.username) {
      this.username = localStorage.username
      fetch('http://localhost:8081/checkfavorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: localStorage.username,
          testno: this.testIndex
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          this.starclick = data
        })
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
    },
    results () {
      for (var i = 0; i < this.optiontext.length; i++) {
        if (this.selectedArray[i] === this.optiontext[i].correctOption && this.selectedArray[i] !== undefined) {
          this.puan += 5
        } else if (this.selectedArray[i] === undefined) {
          this.emptyquestions += 1
        }
      }
      this.backtopath = localStorage.path
      this.currentminute = this.minute
      this.currentseconds = this.seconds
      this.isitend = 1
      if (localStorage.username) {
        fetch('http://localhost:8081/suggestion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: localStorage.username,
            categoryno: this.category,
            testno: this.testIndex,
            point: this.puan
          })
        })
          .then(res => res.json())
          .then(data => console.log(data))
      }
      fetch('http://localhost:8081/countOfClick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          indexOfTest: this.testIndex
        })
      })
        .then(response => response.json())
        .then(data => { console.log(data) })
    },
    addfavorite () {
      if (this.starclick === true) {
        this.starclick = false
      } else {
        this.starclick = true
      }
      fetch('http://localhost:8081/favoritetests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: localStorage.username,
          starclick: this.starclick,
          testno: this.testIndex
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
    }
  }
}
</script>
