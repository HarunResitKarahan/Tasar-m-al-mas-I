<template>
  <div class="register">
    <!-- <h2>Modal Example</h2>
    <button @click="btn" id="myBtn">Open Modal</button>
    <div id="myModal" class="modal" :class="number === 1 ? 'open' : ''">
        <div class="modal-content">
            <span @click="span" class="close">&times;</span>
            <p>Some text in the Modal..</p>
        </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Register',
  props: {
  },
  data () {
    return {
      number: Number
    }
  },
  methods: {
    btn () {
      this.number = 1
    },
    span () {
      this.number = 0
    }
  }
}
</script>
