import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'
import '@left4code/tw-starter/dist/js/dropdown'
import '@left4code/tw-starter/dist/js/modal'
Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false,
      },
      hide: { enabled: false },
    },
  },
})

Vue.component('Tippy', TippyComponent)
