<template>
  <div class="middlefield" align="left">
      <!-- Favori testler kısmı için testler görüntülendirildi -->
      <div class="mt-3" style="display: flex; align-items: center;justify-content: space-between; margin-bottom: 12px"> <div style="width: 43%;height: 5px; background: #ffffffd3; margin-right: 15px"></div> <div style="width: 14%;text-align: center"><p style="margin: 0;font-size: 1.2vw;">FAVORİ TESTLER</p></div> <div style="width: 43%;height: 5px; background: #ffffffd3; margin-left: 15px"></div> </div>
      <ul class="favoritetests">
        <VueSlickCarousel style="width: 100%" v-bind="settings">
          <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
              <li class="favorite" :key="index">
                <router-link class="test" @click="clickTest" :to="{ name: 'Tests', params: { index: tests[index].testNo,category: tests[index].categoryNo, testname: tests[index].testName, path: $route.path } }" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                  <h5 :class="'bckground' + tests[index].categoryNo">TEST {{index + 1}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                  <ul>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              <template v-if="tests[index].categoryNo == 1">Türkçe</template>
                                      <template v-if="tests[index].categoryNo == 2">Matematik</template>
                                      <template v-if="tests[index].categoryNo == 3">Fen Bilimleri</template>
                                      <template v-if="tests[index].categoryNo == 4">Sosyal Bilimler</template>
                                      <template v-if="tests[index].categoryNo == 5">Yabancı Dil</template>
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              {{tests[index].testDiffucilty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              Çözülme Sayısı: {{tests[index].countOfClick}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                      </li>
                  </ul>
                </router-link>
              </li>
          </template>
        </VueSlickCarousel >
      </ul>
      <!-- Önerilen testler kısmı için testler görüntülendirildi -->
      <div class="mt-5" style="display: flex; align-items: center;justify-content: space-between; margin-bottom: 12px"> <div style="width: 42%;height: 5px; background: #ffffffd3; margin-right: 15px"></div> <div style="width: 16%;text-align: center"><p style="margin: 0;font-size: 1.2vw">SİZE ÖNERİLENLER</p></div> <div style="width: 42%;height: 5px; background: #ffffffd3; margin-left: 15px"></div> </div>
      <ul class="favoritetests">
        <VueSlickCarousel style="width: 100%" v-bind="settings" :style="suggestion[0] == null ? '':'display:none' " >
          <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
              <li class="favorite" :key="index">
                <router-link :to="{ name: 'Tests', params: { index: shuffle[index].testNo,category: shuffle[index].categoryNo, testname: shuffle[index].testName, path: $route.path } }" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                  <h5 :class="'bckground' + shuffle[index].categoryNo">TEST {{index + 1}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                  <ul>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              <template v-if="shuffle[index].categoryNo == 1">Türkçe</template>
                                      <template v-if="shuffle[index].categoryNo == 2">Matematik</template>
                                      <template v-if="shuffle[index].categoryNo == 3">Fen Bilimleri</template>
                                      <template v-if="shuffle[index].categoryNo == 4">Sosyal Bilimler</template>
                                      <template v-if="shuffle[index].categoryNo == 5">Yabancı Dil</template>
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              {{shuffle[index].testDiffucilty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              Çözülme Sayısı: {{shuffle[index].countOfClick}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                      </li>
                  </ul>
                </router-link>
              </li>
          </template>
           </VueSlickCarousel >
          <VueSlickCarousel style="width: 100%" v-bind="settings" :style="suggestion[0] == null ? 'display:none':'' ">
          <template v-for="(item,index) in suggestion"> <!-- Test sayısı kadar test oluşturuldu -->
              <li class="favorite" :key="index">
                <router-link :to="{ name: 'Tests', params: { index: item[index].testNo,category: item[index].categoryNo, testname: item[index].testName, path: $route.path } }" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                  <h5 :class="'bckground' + item[index].categoryNo">TEST {{index + 1}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                  <ul>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              <template v-if="item[index].categoryNo == 1">Türkçe</template>
                                      <template v-if="item[index].categoryNo == 2">Matematik</template>
                                      <template v-if="item[index].categoryNo == 3">Fen Bilimleri</template>
                                      <template v-if="item[index].categoryNo == 4">Sosyal Bilimler</template>
                                      <template v-if="item[index].categoryNo == 5">Yabancı Dil</template>
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              {{item[index].testDiffucilty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                      </li>
                      <li class="p-0" style="font-size: 16px;color: #1F2833;">
                              Çözülme Sayısı: {{item[index].countOfClick}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                      </li>
                  </ul>
                </router-link>
              </li>
          </template>
          </VueSlickCarousel >
      </ul>
      <!-- Son eklenen testler kısmı için testler görüntülendirildi -->
      <div class="mt-5" style="display: flex; align-items: center;justify-content: space-between; margin-bottom: 12px"> <div style="width: 42%;height: 5px; background: #ffffffd3; margin-right: 15px"></div> <div style="width: 16%;text-align: center"><p style="margin: 0;font-size: 1.2vw">SON EKLENENLER</p></div> <div style="width: 42%;height: 5px; background: #ffffffd3; margin-left: 15px"></div> </div>
      <ul class="favoritetests">
        <VueSlickCarousel style="width: 100%" v-bind="settings">
          <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
                    <li class="favorite" :key="lastaddedtests[index].testNo" >
                      <router-link :to="{ name: 'Tests', params: { index: lastaddedtests[index].testNo, category: lastaddedtests[index].categoryNo, testname: lastaddedtests[index].testName, path: $route.path } }"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                        <h5 :class="'bckground' + lastaddedtests[index].categoryNo">TEST {{index + 1}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                        <ul>
                            <li class="p-0" style="font-size: 16px;color: #1F2833;">
                                    <template v-if="lastaddedtests[index].categoryNo == 1">Türkçe</template>
                                     <template v-if="lastaddedtests[index].categoryNo == 2">Matematik</template>
                                     <template v-if="lastaddedtests[index].categoryNo == 3">Fen Bilimleri</template>
                                     <template v-if="lastaddedtests[index].categoryNo == 4">Sosyal Bilimler</template>
                                     <template v-if="lastaddedtests[index].categoryNo == 5">Yabancı Dil</template>
                            </li>
                            <li class="p-0" style="font-size: 16px;color: #1F2833;">
                                     {{lastaddedtests[index].testDiffucilty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                            </li>
                            <li class="p-0" style="font-size: 16px;color: #1F2833;">
                                     Çözülme Sayısı: {{lastaddedtests[index].countOfClick}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                            </li>
                        </ul>
                        </router-link>
                    </li>
            </template>
        </VueSlickCarousel >
            </ul>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'MiddleField',
  props: {
    suggestion: Array,
    tests: Array,
    lastaddedtests: Array,
    shuffle: Array
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
        infinite: true,
        slidesToScroll: 3,
        swipeToSlide: true
      },
      test: ['TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1'],
      index: 1,
      issignin: '',
      solvesametestsusers: []
    }
  }
}
</script>
