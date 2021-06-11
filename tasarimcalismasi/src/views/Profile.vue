<template>
  <div class="profile">
    <!-- Componentlar profile ekranında gösterildi -->
    <Profileview :userinfo="userinfo" :date="date" :suggestiontests="suggestiontests" :favoritetests="favoritetests" :lastsolved="lastsolved"/>
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
  },
  data () {
    return {
      userinfo: [],
      index: 0,
      date: '',
      suggestiontests: [],
      favoritetests: [],
      lastsolved: []
    }
  },
  async created () {
    await fetch('http://localhost:8081/profileinfo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localStorage.username
      })
    })
      .then(res => res.json())
      .then(data => {
        this.userinfo = data
        this.date = data[0].userCreateTime.split('T')
      })
    await fetch('http://localhost:8081/getsuggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localStorage.username
      })
    })
      .then(res => res.json())
      .then(data1 => {
        this.suggestiontests = data1
      })
    await fetch('http://localhost:8081/getfavorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localStorage.username
      })
    })
      .then(res => res.json())
      .then(data2 => {
        this.favoritetests = data2
      })
    await fetch('http://localhost:8081/getlastsolved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localStorage.username
      })
    })
      .then(res => res.json())
      .then(data2 => {
        this.lastsolved = data2
      })
  }
}
</script>
