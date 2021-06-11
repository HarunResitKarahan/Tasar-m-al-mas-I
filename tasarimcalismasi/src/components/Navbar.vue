<template>
  <div class="navbar">
    <!-- Navbar'da gösterilmek için katagori başlıkları oluşturuldu -->
      <li>
        <ul id="header1" class="header">
          <a href=""><img src="../assets/TestCoz.png" width="200px" height="100%"></a>
        </ul>
          <Signin />
      </li>
  </div>
</template>

<script>
import Signin from './Navbar/signin/Signin.vue'
export default {
  name: 'Navbar',
  components: {
    Signin
  },
  props: {
    shuffle: Array,
    suggestion: Array
  },
  data () {
    return {
      number: '',
      issignin: '',
      isregistered: ''
    }
  },
  methods: {
    btn () {
      this.number = 1
    },
    span () {
      this.number = 0
      this.password = ''
      this.nick = ''
      this.name = ''
      this.surname = ''
      this.email = ''
      this.registerpassword = ''
      this.isregistered = ''
    },
    signin () {
      this.number = 1
      this.nick = ''
      this.name = ''
      this.surname = ''
      this.email = ''
      this.registerpassword = ''
    },
    register () {
      this.number = 2
      this.username = ''
      this.password = ''
    },
    signinbutton (nick, password) {
      fetch('http://localhost:8081/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nick,
          userpassword: password
        })
      })
        .then(response => response.json())
        .then(data => { this.issignin = data })
    },
    registerbutton (nick, name, surname, email, registerpassword) {
      fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nick,
          username: name,
          usersurname: surname,
          useremail: email,
          userpassword: registerpassword
        })
      })
        .then(response => response.json())
        .then(data => { this.isregistered = data })
    },
    signout () {
      localStorage.password = this.password
      console.log('now pretend I did more stuff...')
    }
  }
}
</script>
