Vue.component('input-component', {
    props: ['placeholder', 'type', 'name', 'required'],
    template: `
        <div class="input-wrapper">
            <input 
            :type="type" 
            :name="name"
            class="input" 
            :class="type" 
            :placeholder="placeholder"
            :required="required"
            @change="checkRequiredStyle($event)"
            >
            <div class="label-required">
                Обязательное поле
            </div>
        </div>
    `,
    methods: {
        checkRequiredStyle(event) {
            if (event.target.value != '') {
                event.target.classList.remove('error')
            }
        }
    }
})

Vue.component('password-component', {
    props: ['placeholder', 'name', 'required'],
    data: function () {
        return {
            test: '',
            visibility: false,
        }
    },
    template: `
        <div class="password-wrapper">
            <input 
            type="password" 
            class="input password" 
            :placeholder="placeholder"
            :name="name"
            :required="required"
            @change="checkRequiredStyle($event)"
            >

            <div class="label-required">
                Обязательное поле
            </div>

            <div class="password-icon hided" @click="changeVisibility($event)">
                <img src="./icons/hided.svg" alt="hided">
            </div>
            <div class="password-icon showed" @click="changeVisibility($event)">
                <img src="./icons/showed.svg" alt="showed">
            </div>
        </div>
    `,
    methods: {
        changeVisibility(event) {
            let wrap = event.target.closest('.password-wrapper');

            if (wrap) {
                if (!this.visibility) {
                    this.visibility = true;
                    wrap.querySelector('input').setAttribute('type', 'text');
                } else {
                    this.visibility = false;
                    wrap.querySelector('input').setAttribute('type', 'password');
                }
            }
        },

        checkRequiredStyle(event) {
            if (event.target.value != '') {
                event.target.classList.remove('error');
            }
        }

    },
})

Vue.component('select-component', {
    props: ['placeholder', 'type', 'name', 'required'],
    data: function () {
        return {
            items: [
                { 
                    value: 1, 
                    name: 'Младщий специалист' 
                },

                { 
                    value: 2, 
                    name: 'Менеджер' 
                },

                { 
                    value: 3, 
                    name: 'Руководитель' 
                },
            ]
        }
    },
    template: `
        <div class="select-wrapper">
            <select class="input select" :name="name" :required="required" @change="checkRequiredStyle($event)">
                <option value="" disabled selected>{{placeholder}}</option>

                <template v-for="item in items">
                    <option :value="item.value">{{item.name}}</option>
                </template>
                
            </select>

            <div class="label-required">
                Обязательное поле
            </div>
        </div>
    `,
    methods: {
        checkRequiredStyle(event) {
            if (event.target.value != '') {
                event.target.classList.remove('error')
            }
        }
    }
})

Vue.component('switch-component', {
    props: ['name'],
    template: `
        <div class="switcher-wrapper">
            <div class="switcher">
                <label class="input switch">
                    <input type="checkbox" value="true" :name="name">
                    <span class="slider"></span>
                </label>
            </div>

            <div class="row-info">
                <div class="title">Хотите чтобы Ваш профиль видели другие участники платформы?</div>
                <div class="subtitle">Включает профиль для просмотра другими пользователями по ссылке</div>
            </div>
        </div>
    `,
})

Vue.component('checkbox-component', {
    props: ['name', 'checked', 'required'],
    template: `

        <div class="checkbox-wrapper">
            <div class="checkbox">
                <input 
                type="checkbox" 
                class="input checkbox hidden"
                :id="name"
                :name="name"
                :checked="checked"
                :required="required"
                value="1"
                @click="checkRequiredStyle($event)"
                >
            </div>

            <div class="row-info">
                <div class="title">Регистрируясь, Вы соглашаетесь с <a href="#">политикой конфиденциальности</a> и обработкой <a href="#"></a>персональных данных</a> </div>
            </div>
        </div>
        
    `,
    methods: {
        checkRequiredStyle(event) {
            if (event.target.value != '') {
                event.target.classList.remove('error')
            }
        }
    }
})




new Vue({
    el: '#app',
    data: function () {
        return {
            registered: false
        }
    },
    template: `
        <div class="register">
            <div class="heading">
                <h2>Регистрация</h2>
            </div>

            <form class="form" id="registerForm" v-if="this.registered == false">

                <div class="fields">
                    <div class="title">Заполните Ваши данные</div>

                    <div class="row">
                        <input-component 
                        type="text" 
                        placeholder="Имя"
                        name="name"
                        required="true"
                        ></input-component>

                        <input-component 
                        type="email" 
                        placeholder="Email"
                        name="email"
                        required="true"></input-component>
                    </div>
                    
                    <div class="row flex-end">
                        <select-component 
                        name="position"
                        required="true"
                        placeholder="Должность"></select-component>
                    </div>

                    <div class="row">
                        <password-component 
                        name="password"
                        required="true"
                        placeholder="Пароль"></password-component>

                        <password-component 
                        name="password_repeat"
                        required="true"
                        placeholder="Повторите пароль"></password-component>
                    </div>
                </div>

                <div class="buttons">

                    <div class="row">
                        <div class="switcher">
                            <switch-component
                            name="public"
                            ></switch-component>
                        </div>
                    </div>

                    <div class="row">
                        <checkbox-component
                        name="policy"
                        checked="true"
                        required="true"
                        ></checkbox-component>

                        <button class="button blue" @click="submitForm($event)">Зарегистрироваться</button>
                    </div>
                </div>
            </form>

            <div class="ok" v-else-if="this.registered === 'ok'">
                <h3>Регистрация завершена</h3>

                <a href="./index.html"> Ещё раз </a>
            </div>

            <div class="ok" v-else>
                <h3>Ошибка</h3>

                <a href="./index.html"> Ещё раз </a>
            </div>
        </div>
    `,
    methods: {
        async submitForm(event) {
            event.preventDefault();
            let form = document.forms.registerForm

            if (!this.checkRequiredFields(form)) {
                return
            }
            

            
            let formData = new FormData(form);

            if (formData && document.querySelector('#policy').checked) {
    
                let public = formData.get('public')
                if (public === null) {
                    public = false
                }
    
                let username = formData.get('name')
                let role = formData.get('position')
                if (role === null) {
                    role = -1
                }
    
                let email = formData.get('email')
                let password = formData.get('password')
                let password_repeat = formData.get('password_repeat')
    
    
                let response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                body: JSON.stringify({
                    public: public,
                    username: username,
                    role: role,
                    email: email,
                    password: password,
                    password_repeat: password_repeat,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                });
                if (response.ok) {
                    this.registerComplete('ok')
                } else {
                    this.registerComplete('error')
                }

            }

        },
        checkRequiredFields(form) {
            let required_inputs = form.querySelectorAll('[required]')
            let return_form = false
            required_inputs.forEach( (input) => {
                input.classList.remove('error')
                if (input.value == '') {
                    input.classList.add('error')
                    return_form = true
                }
                if (input.type == 'checkbox' && input.checked == false) {
                    input.classList.add('error')
                    return_form = true
                }
            })
            return !return_form
        },
        registerComplete(status) {
            this.registered = status
        }
    }
})
