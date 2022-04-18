import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

const app = createApp({
  data() {
    return {
      keyArray: [],
      audioArray: []
    }
  },
  methods: {
    playSound (e) {
      this.keyArray.forEach(item => {
        if (item.dataset.key == e.keyCode) {
          item.classList.add('playing')
        }
      })
      this.audioArray.forEach(item => {
        if (item.dataset.key == e.keyCode) {
          item.currentTime = 0;
          item.play()
        }
      })
    },
    removeProperty (e) {
      this.keyArray.forEach(item => {
        item.classList.remove('playing')
      })
    }
  },
  mounted() {
    const keyArray = document.querySelectorAll('.key');
    this.keyArray = [...keyArray]
    const audioArray = document.querySelectorAll('audio')
    this.audioArray = [...audioArray]
  }
})

app.mount('#app');  