<template>
  <div class="middlefield" align="left">
      <!-- Favori testler kısmı için testler görüntülendirildi -->
      <p>FAVORİ TESTLER</p>
      <li class="favoritetests">
      <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
          <router-link to="/tests" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
            <ul class="favorite">
                <h5>{{tests[index].testName}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                <li>
                    <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                            - Spor
                    </ul>
                    <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                            - {{tests[index].testDifficulty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                    </ul>
                    <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                            - Tıklanma Sayısı: {{tests[index].testClickNumber}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                    </ul>
                </li>
            </ul></router-link>
      </template>
      </li>
      <!-- Önerilen testler kısmı için testler görüntülendirildi -->
      <p class="mt-5">SİZE ÖNERİLENLER</p>
      <li class="favoritetests">
            <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
                <router-link to="/tests" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                    <ul class="favorite">
                        <h5>{{tests[index].testName}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                        <li>
                            <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                                    - Spor
                            </ul>
                            <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                                    - {{tests[index].testDifficulty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                            </ul>
                            <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                                    - Tıklanma Sayısı: {{tests[index].testClickNumber}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                            </ul>
                        </li>
                    </ul></router-link>
            </template>
      </li>
      <!-- Son eklenen testler kısmı için testler görüntülendirildi -->
      <p class="mt-5">SON EKLENENLER</p>
      <li class="favoritetests">
          <template v-for="(item,index) in test"> <!-- Test sayısı kadar test oluşturuldu -->
                <router-link to="/tests" :key="index"> <!-- Teste tıklandığında soru çözme ekranına yönlendirildi -->
                    <ul class="favorite">
                        <h5>{{tests[index].testName}}</h5> <!-- Testin adı database den gelen veriye göre ayarlandı -->
                        <li>
                            <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                                    - Spor
                            </ul>
                            <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                                    - {{tests[index].testDifficulty}} <!-- Testin zorluğu database den gelen veriye göre ayarlandı -->
                            </ul>
                            <ul class="p-0" style="font-size: 16px;color: #1F2833;">
                                    - Tıklanma Sayısı: {{tests[index].testClickNumber}} <!-- Testin tıklanma sayısı database den gelen veriye göre ayarlandı -->
                            </ul>
                        </li>
                    </ul></router-link>
            </template>
      </li>
  </div>
</template>

<script>
export default {
  name: 'MiddleField',
  props: {
    tests: Array
  },
  data () {
    return {
      test: ['TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1', 'TEST1'],
      index: 1
    }
  }
}
</script>
