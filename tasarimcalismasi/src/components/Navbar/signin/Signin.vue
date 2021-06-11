<template>
    <ul class="search mt-2" align="right">
        <b-nav-form>
            <!-- Arama Yeri oluşturuldu -->
            <!-- <b-form-input class="mr-sm-2" placeholder="Search.." style="display: none; position: absolute;background: white;margin-bottom: 4px"></b-form-input>
            <b-icon-search id="searchbutton" style="color: white;margin-bottom:3px;margin-right: 8px;width: 23px;height: 100%;cursor: pointer"/> -->
            <router-link style="margin-left: 8px;margin-right: 8px" to="/profile" :style="issignin === 'Giriş Başarılı' ? 'display: inline' : 'display: none;'"><span>Hoşgeldin: {{localusername}}</span></router-link>
            <a href="#" class="dropdown">
              <!-- Profile ulaşmak için profile butonu oluşturuldu -->
              <b-icon-person-fill id="btn" class="person"/>
              <b-icon-caret-down-fill class="chevron-down"/>
              <div class="dropdown-content" align="left">
                <a @click="btn" :style="issignin === 'Giriş Başarılı' ? 'display: none' : ''"> Oturum aç</a>
                <router-link to="/profile" style="display: none;" :style="issignin === 'Giriş Başarılı' ? 'display: block' : ''">Profile</router-link>
                <a @click="register" href="#" :style="issignin === 'Giriş Başarılı' ? 'display: none' : ''">Kayıt ol</a>
                <a @click="signout" href="#" :style="issignin === 'Giriş Başarılı' ? '' : 'display: none'">Çıkış</a>
              </div>
            </a>
          </b-nav-form>
          <div class="signin">
            <div id="myModal" class="modal" :class="number === 1 ? 'open' : ''">
                <div class="modal-content" :class="$route.name">
                  <span @click="span" class="close">&times;</span>
                    <b-icon-person-fill class="sign-in-person"/>
                    <p>Kullanıcı Adı:</p>
                    <input v-model="username" class="input" placeholder="Kullanıcı Adı">
                    <p>Şifre:</p>
                    <input v-model="password" class="input" type="password" placeholder="Şifre">
                    <button @click="signinbutton(username,password), signinclose" class="button">Oturum Aç</button>
                    <span class="issignin" :class="issignin === 'Giriş Başarılı' ? 'success' : 'failed'" :style="number == 2 ? 'display: none;' : ''">{{issignin}}</span>
                    <a @click="register" href="#">Üye değil misiniz ? Üye olun</a>
                </div>
            </div>
          </div>
          <div class="register">
            <div id="myModal" class="modal" :class="number === 2 ? 'open' : ''">
                <div class="modal-content" :class="$route.name">
                  <span @click="span" class="close">&times;</span>
                    <b-icon-person-fill class="sign-in-person"/>
                    <p>Kullanıcı Adı</p>
                    <span class="isregistered" :class="isregistered === 'nickNameBulundueMailBulundu' || isregistered === 'nickNameBulundueMailBulunmadı' || isregistered === '' ? 'failed': ''" :style="isregistered === 'nickNameBulunmadıeMailBulundu' || isregistered === 'nickNameBulunmadıeMailBulunmadı' || isregistered === '' ? 'display: none;': ''">*Kullanıcı adı sistemde kayıtlı.</span>
                    <input v-model="nick" class="input" placeholder="Kullanıcı Adı">
                    <p>Ad</p>
                    <input v-model="name" class="input" placeholder="Ad">
                    <p>Soyad</p>
                    <input v-model="surname" class="input" placeholder="Soyad">
                    <span class="isregistered" :class="isregistered === 'nickNameBulundueMailBulundu' || isregistered === 'nickNameBulunmadıeMailBulundu' ? 'failed': ''" :style="isregistered === 'nickNameBulundueMailBulunmadı' || isregistered === 'nickNameBulunmadıeMailBulunmadı' || isregistered === '' ? 'display: none;': ''">*E-posta sistemde kayıtlı.</span>
                    <p>E-posta:</p>
                    <input v-model="email" class="input" placeholder="E-posta">
                    <p>Şifre:</p>
                    <input v-model="registerpassword" class="input" type="password" placeholder="Şifre">
                    <button @click="registerbutton(nick, name, surname, email, registerpassword)" class="button">Üye Ol</button>
                     <template v-if="isregistered !== 'nickNameBulundueMailBulundu' && isregistered !== ''">
                        <p class="isregistered success" >Kayıt Başarılı.</p>
                        <p @click="btn" class="isregistered girisekrani" style="color: rgba(255, 255, 255, 0.514);cursor: pointer;">Giriş Ekranına Dönün.</p>
                    </template>
                    <a href="#" @click="signin">Üye misiniz ? Oturum Açınız</a>
                </div>
            </div>
          </div>
    </ul>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Signin',
  props: {
  },
  data () {
    return {
      number: '',
      issignin: '',
      isregistered: '',
      localpassword: '',
      localusername: ''
    }
  },
  created () {
    this.localusername = localStorage.username
    this.issignin = localStorage.issignin
  },
  mounted () {
    this.$nextTick(function () {
      $(document).ready(function () {
        $('#searchbutton').click(function () {
          $('.mr-sm-2').animate({ right: '85px' }).show(300)
        })
      })
    })
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
      this.issignin = ''
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
        .then(data => {
          this.issignin = data
          if (this.issignin === 'Giriş Başarılı') {
            localStorage.username = nick
            localStorage.issignin = this.issignin
            this.localusername = localStorage.username
            setInterval(function () { location.reload() }, 500)
          }
        })
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
      setInterval(function () { location.reload() }, 500)
    },
    signout () {
      localStorage.removeItem('username')
      localStorage.removeItem('issignin')
      this.localusername = ''
      this.issignin = ''
      setInterval(function () { location.reload() }, 500)
    }
  }
}
</script>
