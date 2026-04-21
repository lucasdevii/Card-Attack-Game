import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./routes/router"
import { getUserInfos } from "./composables/useAuth"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faHeart, faCircleUser, faKey, faUserTag} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "./assets/main.css"

await getUserInfos() // tenta obter informações do usuário ao iniciar o app, para manter a sessão ativa se possível

// adiciona ícones na biblioteca
library.add(faUser, faHeart, faCircleUser, faKey, faUserTag)

const app = createApp(App)
app.use(router)


// registra componente global
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
