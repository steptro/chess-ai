import Vue from 'vue';
import App from './App.vue';
// import chessBoard2 from 'vue-chessboard';
import chessBoard from './components/Chessboard';
import Buefy from 'buefy';

import 'buefy/dist/buefy.css';
import './assets/board.css';
import './assets/theme.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
// Vue.use(chessBoard2);
Vue.component('chessboard2', chessBoard);

new Vue({
  render: h => h(App),
}).$mount('#app');
