<template>
  <div class="profileview">
    <div class="profilecontent">
      <div class="profileinfo">
        <li>
          <ul style="margin-right: 15px">
            <!-- Olası kullanıcı resmi gösterildi -->
            <img src="@/assets/city.jpg" width="250" height="200" class="profileimage">
          </ul>
          <!-- Kullanıcı bilgileri gösterildi -->
          <ul>
            <p>AD: Harun Reşit</p>
            <p>SOYAD: KARAHAN</p>
            <p>E-posta: asdjasd@hotmail.com</p>
          </ul>
        </li>
      </div>
      <div class="profilesolvedtests">
        <!-- Favori testler listelendi -->
        <p align="left">FAVORİ TESTLER</p>
        <li class="favoritetests">
          <template v-for="(item,index) in test">
          <router-link to="/tests" :key="index">
            <ul class="favorite">
                <h5>TEST1</h5>
                <li>
                    <ul class="p-0" style="font-size: 16px;color: white;">
                            - Spor
                    </ul>
                    <ul class="p-0" style="font-size: 16px;color: white;">
                            - Zor
                    </ul>
                </li>
            </ul></router-link>
      </template>
        </li>
        <!-- Son çözülen testler listelendi -->
        <p align="left">SON ÇÖZÜLENLER</p>
        <li class="favoritetests">
          <template v-for="(item,index) in test">
          <router-link to="/tests" :key="index">
            <ul class="favorite">
                <h5>TEST1</h5>
                <li>
                    <ul class="p-0" style="font-size: 16px;color: white;">
                            - Spor
                    </ul>
                    <ul class="p-0" style="font-size: 16px;color: white;">
                            - Zor
                    </ul>
                </li>
            </ul></router-link>
      </template>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Profileview',
  props: {
  },
  data () {
    return {
      test: ['', '', '', '']
    }
  }
}
</script>
