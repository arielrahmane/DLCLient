// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue';

// Import F7 Style
import Framework7CSS from 'framework7/css/framework7.bundle.min.css';

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css';

// Import Material Icons
import MaterialIcons from 'material-design-icons/iconfont/material-icons.css';

// Import Fontawesome Theme Styles
import FontAwesome from '@fortawesome/fontawesome-free/css/all.min.css';
/*import 'font-awesome/fonts/fontawesome-webfont.eot'
import 'font-awesome/fonts/fontawesome-webfont.svg'
import 'font-awesome/fonts/fontawesome-webfont.ttf'
import 'font-awesome/fonts/fontawesome-webfont.woff'
import 'font-awesome/fonts/fontawesome-webfont.woff2'
import 'font-awesome/fonts/fontAwesome.otf'
import 'font-awesome/css/font-awesome.min.css'*/

// Import fastClick
import FastClick from 'fastclick';

//Import Vue-Bus
import VueBus from 'vue-bus';

//import NPM packages

// Import App Custom Styles
// import AppStyles from './assets/sass/main.scss'

// Import App Component
import app from './main.vue';

import Routes from './routes';


// Import Vuex Storage
import store from './assets/vuex/storage.js';


// Different F7-Vue plugin initialization with f7 v3.0
Framework7.use(Framework7Vue);
Vue.use(Framework7Vue);
Vue.use(FontAwesome);


// Init Vue App for browser
export default new Vue({
  // Root Element
  el: '#app',
  store,
  framework7: {
    root: '#app',
    // Uncomment to enable Material theme:
    // material: true,
    routes: Routes,
    swipePanel: 'left'
  },
  render: c => c('app'),
  components: {
    app
  },
  mounted() {
    document.addEventListener('backbutton', this.onBackButton, false);
    window.addEventListener('load', () => {
        // run after everything is in-place
        FastClick.attach(document.body);
    });
  },
  methods: {
    onBackButton () {
      let l = this.$f7.mainView.history.length
      let history = this.$f7.mainView.history
      if (l > 2 &&
          !history[l - 2].includes('login')) {
        this.$f7.mainView.router.back()
      } // TODO : else it should ask for a second tap on back to quit the app
    }
  },
});


/*
// init app for device dev
export default Vue.cordova.on('deviceready', () => {
  // eslint-disable no-new, indent 
    new Vue({
      el: '#app',
      store,
      // Init Framework7 by passing parameters here
      framework7: {
        root: '#app',
        // Uncomment to enable Material theme:
        // material: true,
        routes: Routes,
        swipePanel: 'left'
      },
      mounted () {
        document.addEventListener('backbutton', this.onBackButton, false);
        window.addEventListener('load', () => {
            // run after everything is in-place
            FastClick.attach(document.body);
        });
      },
      methods: {
        onBackButton () {
          let l = this.$f7.mainView.history.length
          let history = this.$f7.mainView.history
          if (l > 2 &&
              !history[l - 2].includes('login')) {
            this.$f7.mainView.router.back()
          } // TODO : else it should ask for a second tap on back to quit the app
        }
      },
      render: c => c('app'),
      // Register App Component
      components: {
        app
      }
    })
  })
*/