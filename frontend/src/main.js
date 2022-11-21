import { createApp } from 'vue'
import App from './main-app.vue'
import router from './router'
import store from './store'

import './styles/styles.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')


