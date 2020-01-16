import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
Vue.use(Vuex);


// LANG
const LANG = {
    en: {
        "url": "js/data/translate/translate_en.json",
    },
    ua: {
        "url": "js/data/translate/translate_ua.json",
    },
    ru: {
        "url": "js/data/translate/translate_ru.json",
    }
}

// get current lang
function getLang() {
    const getRoot = document.querySelector('html');
    return getRoot.getAttribute('lang');
};

// get carrent lang translate (from json)
function currentLang() {
    const lang = getLang();
    const getUrl = LANG[lang].url;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', getUrl, false);
    xhr.send();
    if (xhr.status != 200) {
        console.log(xhr.status + ': ' + xhr.statusText);
    } else {
        return JSON.parse(xhr.responseText);
    }
};

// vuex translate
const translate = new Vuex.Store();
Vue.use(vuexI18n.plugin, translate);

// add lang
Vue.i18n.add(getLang(), currentLang());

// set lang
Vue.i18n.set(getLang());

export default translate;