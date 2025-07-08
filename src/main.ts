import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faPenToSquare, faXmark, faImage, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

library.add( faPlus, faPenToSquare, faXmark, faImage, faTrash, faCheck )

app.use(Toast, {
  timeout: 3000,
  position: 'top-right',
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
})

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
