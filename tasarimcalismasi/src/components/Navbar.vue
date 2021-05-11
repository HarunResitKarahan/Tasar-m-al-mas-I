<template>
  <div class="navbar">
    <!-- Navbar'da gösterilmek için katagori başlıkları oluşturuldu -->
      <li>
        <ul id="header1" class="header">
          <a href="">TestCoz.com</a>
          <ul class="miniheader ml-5">
            <a href="">Spor</a>
          </ul>
          <ul class="miniheader">
            <a href="">Coğrafya</a>
          </ul>
          <ul class="miniheader">
            <a href="">Tarih</a>
          </ul>
          <ul class="miniheader">
            <a href="">Türkçe</a>
          </ul>
        </ul>
        <ul class="search mt-2" align="right">
          <b-nav-form>
            <!-- Arama Yeri oluşturuldu -->
            <b-form-input class="mr-sm-2" placeholder="Search.."></b-form-input>
            <b-button type="submit" style="padding: 5px 13px;"><b-icon-search/></b-button>
            <a href="#" class="dropdown">
              <!-- Profile ulaşmak için profile butonu oluşturuldu -->
              <b-icon-person-fill @click="btn" class="person"/>
              <b-icon-caret-down-fill class="chevron-down"/>
              <div class="dropdown-content" align="left">
                <router-link to="/profile">Profile</router-link>
                <a href="">Çıkış</a>
              </div>
            </a>
          </b-nav-form>
          <div class="signin">
            <div id="myModal" class="modal" :class="number === 1 ? 'open' : ''">
                <div class="modal-content">
                  <span @click="span" class="close">&times;</span>
                    <b-icon-person-fill class="sign-in-person"/>
                    <p>Kullanıcı Adı:</p>
                    <input v-model="username" class="input" placeholder="Kullanıcı Adı">
                    <p>Şifre:</p>
                    <input v-model="password" class="input" placeholder="Şifre">
                    <button @click="signinbutton(username,password)" class="button">Oturum Aç</button>
                    <a @click="register" href="#">Üye değil misiniz ? Üye olun</a>
                </div>
            </div>
          </div>
          <div class="register">
            <div id="myModal" class="modal" :class="number === 2 ? 'open' : ''">
                <div class="modal-content">
                  <span @click="span" class="close">&times;</span>
                    <b-icon-person-fill class="sign-in-person"/>
                    <p>Kullanıcı Adı</p>
                    <input v-model="nick" class="input">
                    <p>Ad</p>
                    <input v-model="name" class="input">
                    <p>Soyad</p>
                    <input v-model="surname" class="input">
                    <p>E-posta:</p>
                    <input v-model="email" class="input">
                    <p>Şifre:</p>
                    <input v-model="registerpassword" class="input" type="password">
                    <button @click="registerbutton(nick, name, surname, email, registerpassword)" class="button">Üye Ol</button>
                    <a href="#" @click="signin">Üye misiniz ? Oturum Açınız</a>
                </div>
            </div>
          </div>
        </ul>
      </li>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
  },
  data () {
    return {
      number: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    btn () {
      this.number = 1
    },
    span () {
      this.number = 0
    },
    signin () {
      this.number = 1
    },
    register () {
      this.number = 2
    },
    signinbutton (nick, password) {
      this.nickname = nick
      this.password = password
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
        .then(data => console.log(data))
    }
  }
}
</script>
