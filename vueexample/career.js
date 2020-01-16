import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import VacancyApp from './career-components/VacancyApp.vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);



const i18n = new VueI18n({
    locale: getLang(),
    messages: {
        en: {
            "description_vacancy": "Description vacancy",
            "send_resume": "Send resume",
            "name": "First and last name",
            "email": "E-mail",
            "phone": "Phone",
            "download_resume": "Download resume",
            "message": "Cover letter",
            "send": "Send",
            "success_message": "Your resume has been successfully sent",
            "select_file": "Select file",
            "file": "File"
        },
        ua: {
            "description_vacancy": "Опис вакансії",
            "send_resume": "Відправити резюме",
            "name": "Ім'я та прізвище",
            "email": "E-mail",
            "phone": "Телефон",
            "download_resume": "Завантажити резюме",
            "message": "Супровідний лист",
            "send": "Надіслати",
            "success_message": "Ваше резюме успішно відправлено",
            "select_file": "Обрати файл",
            "file": "Файл"
        },
        ru: {
            "description_vacancy": "Описание вакансии",
            "send_resume": "Отправить резюме",
            "name": "Имя и фамилия",
            "email": "E-mail",
            "phone": "Телефон",
            "download_resume": "Загрузить резюме",
            "message": "Cопроводительное письмо",
            "send": "Отправить",
            "success_message": "Ваше резюме успешно отправлено",
            "select_file": "Выбрать файл",
            "file": "Файл"
        }
    }
});

const CAREER_PAGE = 'career-page';
const VACANCY_PAGE = 'vacancy-page';


// IS CAREER PAGE
if (isCareerPage()) {
    var links = document.querySelectorAll('.box__link');

    // if has links
    if (links.length !== 0 ) {
        let vacancies = vacanciesData;

        // add event all links
        Array.prototype.forEach.call(links, (link) => {
            link.addEventListener('click', function(e) {
                dialogVacancy.show();
                let d = getVacancyData(vacancies, this.dataset.id);
                vacancyStartVue(d);
                e.preventDefault();
            });
        });

        // get vacancy data
        function getVacancyData(data, id) {
            let v = Array.prototype.filter.call(data, (item) => {
                return item.id === +id;
            });
            return v[0];
        }
    }

    // if you come on career page from vacancy page
    if (sessionStorage.getItem('fromVacancyPage') === 'true') {
        sessionStorage.removeItem('fromVacancyPage');
        sectionsSlideTo('sectionVacancies');
    }
}


// IS VACANCY PAGE
if (isVacancyPage()) {
    vacancyStartVue(vacancyData);
}


// VACANCY APP
function vacancyStartVue(vacancyObj) {

    // router
    var router = new VueRouter({
        mode: 'history',
        routes: []
    });

    var vm = new Vue({
        el: '#vacancyVue',
        name: 'Vacancy',
        components: {
            VacancyApp
        },

        // template
        template: `
            <div id="vacancyVue">
                <vacancy-app
                    v-bind:vacancy="vacancy"
                ></vacancy-app>
            </div>
        `,

        // data
        data: function () {
            return {
                'isCareerPage': isCareerPage(),
                'isVacancyPage': isVacancyPage(),
                'currentPath': this.$router.history.current.path,
                'vacancy': vacancyObj
            }
        },

        // mounted
        created() {

        },

        // mounted
        mounted() {
            if (this.isCareerPage) this.$router.push('/' + this.vacancy['url'] + '.html');
        },

        // destroyed
        destroyed() {
            this.$router.push(this.currentPath);
        },

        // methods
        methods: {

        },

        // computed
        computed: {

        },

        router, i18n
    });

    if (isCareerPage()) {
        dialogVacancy.on('hide', function () {
            vm.$destroy();
        });
    }

    if (isVacancyPage()) {
        let c = document.querySelector('.dialog__nav-close');
        c.addEventListener('click', function() {
            sessionStorage.setItem('fromVacancyPage', 'true');
            window.location.href = "career.html";
        });
    }
}



// check if is career page
function isCareerPage() {
    let b = document.querySelector('body');
    return b.classList.contains(CAREER_PAGE);
}

// check if is vacancy page
function isVacancyPage() {
    let b = document.querySelector('body');
    return b.classList.contains(VACANCY_PAGE);
}

// get current lang
function getLang() {
    const getRoot = document.querySelector('html');
    return getRoot.getAttribute('lang');
};