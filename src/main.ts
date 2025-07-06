import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faPenToSquare, faXmark, faImage } from '@fortawesome/free-solid-svg-icons'

library.add( faPlus, faPenToSquare, faXmark, faImage )

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
