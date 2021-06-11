<template>
    <div class="categorymenu">
        <div class="categorymenumiddlefield" align="left">
            <p class="mt-1" style="color: black">{{$route.name}}</p>
            <ul class="favoritetests">
            <template v-for="(item,index) in tests"> <!-- Test sayısı kadar test oluşturuldu -->
                    <li class="favorite" :key="tests[index].testNo">
                        <router-link :to="{ name: 'Tests', params: { index: tests[index].testNo, category, path: $route.path } }"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                            <h5 :class="$route.name">TEST {{index + 1}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
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
            </ul>
            <p class="mt-1" style="color: black">ÖNERİLENLER</p>
            <ul class="favoritetests">
              <VueSlickCarousel style="width: 100%" v-bind="settings" v-if="shuffle.length > 0" :style="suggestion[0] == null ? '':'display:none' " >
                <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
                    <li class="favorite" :key="index">
                      <router-link :to="{ name: 'Tests', params: { index: shuffle[index].testNo,category: shuffle[index].categoryNo, path: $route.path } }" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
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
                <VueSlickCarousel style="width: 100%" v-bind="settings" v-if="suggestion.length > 0" :style="suggestion[0] == null ? 'display:none':'' ">
                <template v-for="(item,index) in suggestion"> <!-- Test sayısı kadar test oluşturuldu -->
                    <li class="favorite" :key="index">
                      <router-link :to="{ name: 'Tests', params: { index: suggestion[index].testNo,category: suggestion[index].categoryNo, path: $route.path } }" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                        <h5 :class="'bckground' + suggestion[index].categoryNo">TEST {{index + 1}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                        <ul>
                            <li class="p-0" style="font-size: 16px;color: #1F2833;">
                                    <template v-if="suggestion[index].categoryNo == 1">Türkçe</template>
                                            <template v-if="suggestion[index].categoryNo == 2">Matematik</template>
                                            <template v-if="suggestion[index].categoryNo == 3">Fen Bilimleri</template>
                                            <template v-if="suggestion[index].categoryNo == 4">Sosyal Bilimler</template>
                                            <template v-if="suggestion[index].categoryNo == 5">Yabancı Dil</template>
                            </li>
                            <li class="p-0" style="font-size: 16px;color: #1F2833;">
                                    {{suggestion[index].testDiffucilty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                            </li>
                            <li class="p-0" style="font-size: 16px;color: #1F2833;">
                                    Çözülme Sayısı: {{suggestion[index].countOfClick}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                            </li>
                        </ul>
                      </router-link>
                    </li>
                </template>
                </VueSlickCarousel >
            </ul>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'CategoryMenu',
  props: {
    tests: Array,
    category: String,
    shuffle: Array,
    suggestion: Array
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
      index: 1
    }
  }
}
</script>
