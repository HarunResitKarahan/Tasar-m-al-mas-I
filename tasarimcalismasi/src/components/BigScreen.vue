<template>
  <div class="bigscreen">
    <!-- Manşet görüntüsü oluşturuldu -->
      <b-container class="bv-example-row" fluid>
        <b-row>
            <b-col cols="0"></b-col>
            <b-col cols="12" align="center">
                <p class="bigtext">Daha iyi bir düşünce yapısı için test çöz</p>
                <p class="minitext">Modern görünüş ile Test çöz</p>
                </b-col>
            <b-col cols="0"></b-col>
        </b-row>
    </b-container>
    <li>
          <ul class="miniheader turkce ml-3">
            <router-link to="/turkcecategory" style="color: #ff4545;text-decoration: none"><div style="margin-bottom: 5px">Türkçe <div class="underline turkceunderline"></div> </div></router-link>
          </ul>
          <ul class="miniheader matematik">
            <router-link to="/matematikcategory" style="color: #05aeff;text-decoration: none"><div style="margin-bottom: 5px">Matematik <div class="underline matematikunderline" style="background: #05aeff"></div> </div></router-link>
          </ul>
          <ul class="miniheader fen">
            <router-link to="/fencategory" style="color: #0dea0d;text-decoration: none"><div style="margin-bottom: 5px">Fen bilimleri <div class="underline fenunderline" style="background: #0dea0d"></div> </div></router-link>
          </ul>
          <ul class="miniheader sosyal">
            <router-link to="/sosyalbilimlercategory" style="color: #ff7600;text-decoration: none"><div style="margin-bottom: 5px">Sosyal Bilimler <div class="underline sosyalunderline" style="background: #ff7600"></div> </div></router-link>
          </ul>
          <ul class="miniheader yabanci">
            <router-link to="/yabancidil" style="color: #9d92ff;text-decoration: none"><div style="margin-bottom: 5px">Yabancı Dil <div class="underline yabanciunderline" style="background: #9d92ff"></div> </div></router-link>
          </ul>
    </li>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'BigScreen',
  props: {
  },
  mounted () {
    $(document).ready(function () {
      $('.turkce').mouseenter(function () {
        $('.turkceunderline').animate({ width: '100%', left: '0' }, 100, function () {
          $('.turkce').mouseleave(function () { $('.underline').animate({ width: '0', left: '50%' }, 0) })
        })
      })
      $('.matematik').mouseenter(function () {
        $('.matematikunderline').animate({ width: '100%', left: '0' }, 100, function () {
          $('.matematik').mouseleave(function () { $('.underline').animate({ width: '0', left: '50%' }, 0) })
        })
      })
      $('.fen').mouseenter(function () {
        $('.fenunderline').animate({ width: '100%', left: '0' }, 100, function () {
          $('.fen').mouseleave(function () { $('.underline').animate({ width: '0', left: '50%' }, 0) })
        })
      })
      $('.sosyal').mouseenter(function () {
        $('.sosyalunderline').animate({ width: '100%', left: '0' }, 100, function () {
          $('.sosyal').mouseleave(function () { $('.underline').animate({ width: '0', left: '50%' }, 0) })
        })
      })
      $('.yabanci').mouseenter(function () {
        $('.yabanciunderline').animate({ width: '100%', left: '0' }, 100, function () {
          $('.yabanci').mouseleave(function () { $('.underline').animate({ width: '0', left: '50%' }, 0) })
        })
      })
    })
  }
}
</script>
