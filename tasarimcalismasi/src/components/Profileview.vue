<template>
  <div class="profileview">
    <div class="leftmenu">
        <div class="user"><b-icon-person-fill class="icon" style="width: 30px;"/><p class="userp">{{userinfo[0].userNickname}}</p></div>
        <div style="display: flex; flex-direction: column;">
          <b-icon-star-fill class="icon" />
          <b-icon-lamp-fill class="icon"/>
          <b-icon-calendar3 class="icon"/>
        </div>
        <div style="display: flex; flex-direction: column">
          <router-link to="/"><b-icon-house-door-fill class="icon"/></router-link>
        </div>
    </div>
    <div class="content">
      <div class="head">
        <div class="userinfo" style="position: relative;">
          <p style="font-size: 2rem;line-height: 2rem;font-weight: 600; color: #323237;position: absolute; right: 0; top: 35px">Kullanıcı Bilgileri</p>
          <div class="usersinfo"><p style="font-family: Ringside Compressed,system-ui,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8B97A6;
    text-align: left;">İSİM: <strong style="margin-left: 5px"><b>{{userinfo[0].userName}}</b></strong></p>
    <p style="font-family: Ringside Compressed,system-ui,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8B97A6;
    text-align: left;">SOYİSİM: <strong style="margin-left: 5px"><b>{{userinfo[0].userSurname}}</b></strong></p>
    <p style="font-family: Ringside Compressed,system-ui,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8B97A6;
    text-align: left;">E-POSTA: <strong style="margin-left: 5px"><b>{{userinfo[0].userEmail}}</b></strong></p>
    <p style="font-family: Ringside Compressed,system-ui,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #8B97A6;
    text-align: left;">KAYIT TARİHİ: <strong style="margin-left: 5px"><b>{{date[0]}}</b></strong></p></div>
        </div>
      </div>
      <div class="middle">
        <p class="mt-5" style="font-size: 1rem;line-height: 2rem;font-weight: 600; color: #323237;">-FAVORİ TESTLER-</p>
        <VueSlickCarousel style="width: 100%" v-bind="settings" v-if="favoritetests.length > 0">
          <template v-for="(item,index) in favoritetests">
              <li class="favorite" :key="index">
                <router-link :to="{ name: 'Tests', params: { index: favoritetests[index].testNo,category: favoritetests[index].categoryNo, testname: favoritetests[index].testName, path: '/' } }" :key="index">
                  <h5 :class="'bckground' + favoritetests[index].categoryNo">TEST {{index + 1}}</h5>
                  <ul>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              <template v-if="test[index].categoryNo == 1">Türkçe</template>
                                      <template v-if="favoritetests[index].categoryNo == 2">Matematik</template>
                                      <template v-if="favoritetests[index].categoryNo == 3">Fen Bilimleri</template>
                                      <template v-if="favoritetests[index].categoryNo == 4">Sosyal Bilimler</template>
                                      <template v-if="favoritetests[index].categoryNo == 5">Yabancı Dil</template>
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              {{favoritetests[index].testDiffucilty}}
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              Çözülme Sayısı: {{favoritetests[index].countOfClick}}
                      </li>
                  </ul>
                </router-link>
              </li>
          </template>
          </VueSlickCarousel >
        <p class="mt-5" style="font-size: 1rem;line-height: 2rem;font-weight: 600; color: #323237">-ÖNERİLEN TESTLER-</p>
        <VueSlickCarousel style="width: 100%" v-bind="settings" v-if="suggestiontests.length > 0">
          <template v-for="(item,index) in suggestiontests">
              <li class="favorite" :key="index">
                <router-link :to="{ name: 'Tests', params: { index: suggestiontests[index].testNo,category: item.categoryNo, testname: suggestiontests[index].testName, path: '/' } }">
                  <h5 :class="'bckground' + item.categoryNo">TEST {{index + 1}}</h5>
                  <ul>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              <template v-if="item.categoryNo == 1">Türkçe</template>
                                      <template v-if="item.categoryNo == 2">Matematik</template>
                                      <template v-if="item.categoryNo == 3">Fen Bilimleri</template>
                                      <template v-if="item.categoryNo == 4">Sosyal Bilimler</template>
                                      <template v-if="item.categoryNo == 5">Yabancı Dil</template>
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              {{item.testDiffucilty}}
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              Çözülme Sayısı: {{item.countOfClick}}
                      </li>
                  </ul>
                </router-link>
              </li>
          </template>
          </VueSlickCarousel >
        <p class="mt-5" style="font-size: 1rem;line-height: 2rem;font-weight: 600; color: #323237">-SON ÇÖZÜLENLER-</p>
        <VueSlickCarousel style="width: 100%" v-bind="settings" v-if="lastsolved.length > 0">
          <template v-for="(items,index) in lastsolved">
              <li class="favorite" :key="index">
                <router-link :to="{ name: 'Tests', params: { index: lastsolved[index].testNo,category: lastsolved[index].categoryNo, testname: lastsolved[index].testName, path: $route.path } }" :key="index">
                  <h5 :class="'bckground' + lastsolved[index].categoryNo">TEST {{index + 1}}</h5>
                  <ul>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              <template v-if="lastsolved[index].categoryNo == 1">Türkçe</template>
                                      <template v-if="lastsolved[index].categoryNo == 2">Matematik</template>
                                      <template v-if="lastsolved[index].categoryNo == 3">Fen Bilimleri</template>
                                      <template v-if="lastsolved[index].categoryNo == 4">Sosyal Bilimler</template>
                                      <template v-if="lastsolved[index].categoryNo == 5">Yabancı Dil</template>
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              {{lastsolved[index].testDiffucilty}}
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              Çözülme Sayısı: {{lastsolved[index].countOfClick}}
                      </li>
                  </ul>
                </router-link>
              </li>
          </template>
          </VueSlickCarousel >
      </div>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'Profileview',
  props: {
    userinfo: Array,
    date: Array,
    suggestiontests: Array,
    favoritetests: Array,
    lastsolved: Array
  },
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      settings: {
        arrows: true,
        speed: 500,
        variableWidth: true,
        infinite: false,
        slidesToScroll: 3,
        swipeToSlide: true
      },
      test: ['TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1'],
      suggestiontestslength: 0,
      favoritetestslength: 0
    }
  }
}
</script>
