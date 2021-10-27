import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {registerApplication, start} from 'single-spa' //注册应用和开启
Vue.config.productionTip = false;

async function loadScript(url){
    return new Promise((resolve,reject)=>{
        let script =document.createElement('script');
        script.src=url;
        script.onload =resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    })
}




registerApplication('myVueApp',async () => {
    console.log('123')
    await loadScript(`http://localhost:10000/js/chunk-vendors.js`);
    await loadScript(`http://localhost:10000/js/app.js`)
    return window.singleVue; 

},location => location.pathname.startsWith('/vue'))  //用户切换到/vue 的路径下，我需要加载刚才定义子应用

start();
 new Vue({
     router,
     render:h=>h(App)
 }).$mount('#app')
