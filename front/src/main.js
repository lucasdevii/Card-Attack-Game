import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./routes/router"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHeart, faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "./assets/main.css"

// 👇 adiciona ícones na biblioteca
library.add(faUser, faHeart, faCircleUser)

const app = createApp(App)
app.use(router)

// 👇 registra componente global
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
