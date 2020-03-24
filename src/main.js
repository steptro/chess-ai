import Vue from 'vue';
import App from './App.vue';
import chessBoard from './components/Chessboard';
import Buefy from 'buefy';

import 'buefy/dist/buefy.css';
import './assets/board.css';
import './assets/theme.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.component('chessboard', chessBoard);

new Vue({
  render: h => h(App),
}).$mount('#app');
