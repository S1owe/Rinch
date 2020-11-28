<template>
    <div id="network">
        <h1>Публикационная активность сотрудников</h1>

        <transition name="fade">
            <div class="filter_background" v-if="filterShow">
                <div class="filter_container">
                    <svg @click="filterShow = false" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6277 20.7418L31.1129 12.2565L32.9986 14.1422L24.5133 22.6274L32.9986 31.1127L31.1129 32.9983L22.6277 24.5131L14.1424 32.9983L12.2568 31.1127L20.742 22.6274L12.2568 14.1422L14.1424 12.2565L22.6277 20.7418Z" fill="#2F73EA"/>
                    </svg>


                    <div class="title">Фильтр</div>

                    <div class="publish_container">
                        <div class="filter_title">Темы публикаций:</div>

                        <div class="filter_third_container" v-bind:class="{ filter_padding: filter.filter_subdivision_show}">

                            <div class="filter_third_check filter_third_first" v-bind:class="{ filter_third_padding: filter.filter_subdivision_show}">
                                <input type="checkbox" id="filter_check_all" @click="select_all()" ref="test" checked>
                                <label for="filter_check_all">
                                    <span class="checkbox__icon"></span>
                                    <a>Все</a>
                                </label>
                            </div>


                            <div class="filter_third_check" v-for="(types_of_publications, index) in filter.types_of_publication" :key="'filter_publish_' + index">

                                <div class="filter_third_check_cont"
                                     v-bind:class="{ disable_input: (index >= 3) && (!filter.filter_subdivision_show)}"
                                     v-if="((filter.filter_subdivision_show) || (index <= 3))"
                                >
                                    <input type="checkbox" :id="'filter_' + (index) + '_check'" :value="types_of_publications" @click="check_all_checked(types_of_publications)" v-model="filter.selected">

                                    <label :for="'filter_' + (index) + '_check'">
                                        <span class="checkbox__icon"></span>
                                        <a>{{types_of_publications}}</a>
                                    </label>
                                </div>

                            </div>


                        </div>

                        <div class="filter_btn_show_all" :class="{active: filter.filter_subdivision_show}" @click="subdivision_show()"><a>{{filter.btn_show_text}}</a></div>
                    </div>

                    <div class="btn_update_filter" @click="updateFilter">Обновить</div>

                </div>
            </div>
        </transition>

        <div class="network_container">
            <div class="filter_btn" @click="filterShow = true">
                <div class="filter_a">Фильтр</div>
                <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.92773 10.6264L15.8232 23.9597V38.2385L26.0192 34.4885V23.9597L37.9147 10.6264V6.66683C37.9147 4.82588 36.393 3.3335 34.516 3.3335H7.32643C5.44938 3.3335 3.92773 4.82588 3.92773 6.66683V10.6264ZM34.516 6.66682V8.33349H7.32644V6.66682H34.516ZM9.37206 11.6668H32.4704L23.5488 21.6668H18.2936L9.37206 11.6668ZM19.2219 25.0002V33.4285L22.6206 32.1785V25.0002H19.2219Z" fill="#2F73EA"/>
                </svg>
            </div>

            <network
                    class="wrapper" ref="network"
                    :nodes="nodes"
                    :edges="edges"
                    :options="options"
                    @select-edge="networkEvent()"
                    @click="onNodeSelected($event)"
            >
                >


            </network>
        </div>

        <div class="network_modal" :class="statusModal?'network_show':'network_hide'">
            <div class="close" @click="closeModal">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6277 20.7418L31.1129 12.2565L32.9986 14.1422L24.5133 22.6274L32.9986 31.1127L31.1129 32.9983L22.6277 24.5131L14.1424 32.9983L12.2568 31.1127L20.742 22.6274L12.2568 14.1422L14.1424 12.2565L22.6277 20.7418Z" fill="#2F73EA"/>
                </svg>
            </div>

            <h3>{{titleModal}}</h3>
            <div class="author_container">
                <div class="author" v-for="(people, index) in author" :key="'people_' + index">
                    {{people.name}}, {{people.rank}}
                </div>
            </div>


            <div class="main__table">
               <div class="headerTable" :class="(table.items.length > 8)?'headerTablePadding':''">
                   <div class="item" v-for="(item, i) in table.fields" :key="'table_h_' + i">{{item.label}}</div>
               </div>
                <div class="contentTable">
                    <div class="row" v-for="(item, i) in table.items" :key="'table_r_' + i">
                        <div class="item">{{item.number}}</div>
                        <div class="item">{{removeTitle(item.title)}}</div>
                        <div class="item">{{item.date}}</div>
                        <div class="item">{{item.citations}}</div>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>
    import { Network } from "vue-vis-network";
  
    import people from '../assets/people.png';

    export default {
        name: "Network",
        data() {
            return {
                statusModal: false,
                filterShow: false,

                filter: {
                    filter_subdivision_show: false, // visibility расширенного списка подразделений
                    btn_show_text: "Показать всё",
                    types_of_publication: ['BigDate','Front-end','Ux','UI','Algorithm','Сборник статей, трудов','Статья','Издательство1','Статья1','Тестовое имя1', 'Книга'],
                    selected: ['BigDate','Front-end','Ux','UI','Algorithm','Сборник статей, трудов','Статья','Издательство1','Статья1','Тестовое имя1', 'Книга'],
                    check_filter_publication_all: true,   // показать все / скрыть все
                },

                author: [
                    {name: 'Митрохин Максим Александрович', rank: 'к.т.н., доцент'},
                    {name: 'Митрохина Наталья Юрьевна', rank: 'к.т.н., доцент'}
                ],

                table: {
                    fields: [
                        { key: "number", label: "№" },
                        { key: "title", label: "Название" },
                        { key: "date", label: "Дата публикации" },
                        {key: "citations", label: "Кол-во цитирований"},
                    ],

                    items: [
                        {
                            number: 1,
                            title: 'Semisupervised learning in pattern recognitio',
                            date: '21.01.20',
                            citations: 1695,
                        },
                        {
                            number: 2,
                            title: 'Formalization of Organization of Signaling Pr',
                            date: '01.01.20',
                            citations: 106,
                        },
                        {
                            number: 3,
                            title: 'Deep learning approach for QRS wave detection',
                            date: '10.02.20',
                            citations: 36,
                        },
                        {
                            number: 4,
                            title: 'Investigation of models for prognosis of critir of models for prognosis 1421',
                            date: '06.03.20',
                            citations: 10,
                        },
                        {
                            number: 5,
                            title: 'Use of the mass service theory elements while',
                            date: '03.03.20',
                            citations: 6,
                        },
                        {
                            number: 6,
                            title: 'Semisupervised learning in pattern recognitio',
                            date: '01.04.20',
                            citations: 3,
                        },
                        {
                            number: 1,
                            title: 'Semisupervised learning in pattern recognitio',
                            date: '21.01.20',
                            citations: 1695,
                        },
                        {
                            number: 2,
                            title: 'Formalization of Organization of Signaling Pr',
                            date: '01.01.20',
                            citations: 106,
                        },
                        {
                            number: 3,
                            title: 'Deep learning approach for QRS wave detection',
                            date: '10.02.20',
                            citations: 36,
                        },
                        {
                            number: 4,
                            title: 'Investigation of models for prognosis of critir of models for prognosis 1421',
                            date: '06.03.20',
                            citations: 10,
                        },
                        {
                            number: 5,
                            title: 'Use of the mass service theory elements while',
                            date: '03.03.20',
                            citations: 6,
                        },
                        {
                            number: 6,
                            title: 'Semisupervised learning in pattern recognitio',
                            date: '01.04.20',
                            citations: 3,
                        },
                    ],
                },

                nodes: [
                    {id: 1, shape: "image", image: people,  label: 'Митрохин М.А.'},
                    {id: 2, shape: "image",  image: people,  label: 'Митрохина Т.А.'},
                    {id: 3, shape: "image", image: people,  label: 'Балашов М.Ю.'},
                    {id: 4, shape: "image", image: people,  label: 'Дурнев А.Ю.'},
                    {id: 5, shape: "image", image: people,  label: 'Мишутина В.А.'},
                    {id: 6, shape: "image", image: people,  label: 'Татьянена Н.И.'},
                    {id: 7, shape: "image", image: people,  label: 'Шутов П.А.'},
                    {id: 8, shape: "image", image: people,  label: 'Прошин Т.А.'},
                    {id: 9, shape: "image", image: people,  label: 'Прошин Т.А.'},
                    {id: 10, shape: "image", image: people,  label: 'Прошин Т.А.'},
                    {id: 11, shape: "image", image: people,  label: 'Митрохин М.А.'},
                    {id: 12, shape: "image",  image: people,  label: 'Митрохина Т.А.'},
                    {id: 13, shape: "image", image: people,  label: 'Балашов М.Ю.'},
                    {id: 14, shape: "image", image: people,  label: 'Дурнев А.Ю.'},
                    {id: 15, shape: "image", image: people,  label: 'Мишутина В.А.'},
                    {id: 16, shape: "image", image: people,  label: 'Татьянена Н.И.'},
                    {id: 17, shape: "image", image: people,  label: 'Шутов П.А.'},
                    {id: 18, shape: "image", image: people,  label: 'Прошин Т.А.'},
                    {id: 19, shape: "image", image: people,  label: 'Прошин Т.А.'},
                    {id: 20, shape: "image", image: people,  label: 'Прошин Т.А.'},
                ],
                edges: [
                    {id: 91, from: 1, to: 2, value: 3},
                    {id: 92, from: 1, to: 9, value: 2},
                    {id: 93, from: 2, to: 3, value: 1},
                    {id: 94, from: 2, to: 4, value: 3},
                    {id: 95, from: 2, to: 5, value: 7},
                    {id: 96, from: 5, to: 6, value: 2},
                    {id: 97, from: 5, to: 7, value: 1},
                    {id: 98, from: 6, to: 8, value: 1},
                    {id: 99, from: 7, to: 10, value: 4},
                    {id: 910, from: 1, to: 20, value: 3},
                    {id: 911, from: 2, to: 9, value: 2},
                    {id: 912, from: 4, to: 3, value: 1},
                    {id: 913, from: 14, to: 4, value: 3},
                    {id: 914, from: 2, to: 15, value: 7},
                    {id: 915, from: 11, to: 6, value: 2},
                    {id: 916, from: 19, to: 18, value: 1},
                    {id: 917, from: 16, to: 8, value: 1},
                    {id: 918, from: 17, to: 10, value: 4},
                ],
                options: {
                    nodes: {
                        borderWidth: 2,
                    },
                    edges: {
                        color: '#2F73EA',
                    }
                }
            }
        },

        beforeCreate() {


        },

        created() {
            
        },

        watch: {

        },

        methods: {

            updateFilter() {
              this.filterShow = false;
            },

            select_all() {
                this.filter.check_filter_publication_all = !this.filter.check_filter_publication_all;

                if (this.filter.check_filter_publication_all === false) {
                    this.filter.selected = [];
                } else {
                    for (let i in this.filter.types_of_publication) {
                        this.filter.selected.push(this.filter.types_of_publication[i]);
                    }
                }

            },

            subdivision_show() {
                if (this.filter.filter_subdivision_show === false) {
                    this.filter.filter_subdivision_show = true;
                    this.filter.btn_show_text = "Скрыть";
                } else {
                    this.filter.filter_subdivision_show = false;
                    this.filter.btn_show_text = "Показать всё"
                }

            },

            check_all_checked(value) {
                let include = this.filter.selected.indexOf(value);

                if (include !== -1) {
                    this.filter.selected.splice(include, 1);
                } else {
                    this.filter.selected.push(value);
                }

                (this.filter.selected.length !== this.filter.types_of_publication.length)?(this.filter.check_filter_publication_all = false):(this.filter.check_filter_publication_all = true);

                if (this.filter.selected.length === this.filter.types_of_publication.length) {
                    this.filter.check_filter_publication_all = true;
                    document.getElementById('filter_check_all').checked = true;      // disable checkbox
                } else {
                    this.filter.check_filter_publication_all = false;
                    document.getElementById('filter_check_all').checked = false;      // enable checkbox
                }

            },

            removeTitle(title) {
              if (title.length > 50) {
                  return (title.substr(0, 50) + '...')
              } else {
                  return title
              }

            },

            closeModal() {
                this.statusModal = false;
            },

            onNodeSelected(a) {
                console.log(a);
            },

            networkEvent() {
                this.statusModal = true;
            }

        },

        computed: {
            titleModal() {
                if (this.author.length > 1) {
                    return 'Авторы:'
                } else {
                    return 'Автор:'
                }
            },
        },

        components: {
            network: Network
        }

    }
</script>

<style lang="scss" scoped>

    $text_color: #2F73EA;

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    .wrapper{
        min-height: 85vh;
        border: 1px solid #878787;
        background-color: #fff;
        padding: 10px;
        height: 85vh;
    }
    #network {
        padding: 70px 120px;
        position: relative;
        overflow: hidden;
    }

    h1 {
        font-size: 38px;
        color: $text_color;
        margin-bottom: 28px;
    }

    .network_modal {
        top: 0;
        right: 0;
        display: flex;
        position: absolute;
        flex-direction: column;
        width: 785px;
        height: 100%;
        background-color: #F9F9FA;
        border: 2px solid #E5E7E9;
        transition: 0.5s ease;
        padding: 70px 50px;

        h3 {
            font-size: 22px;
            color: $text_color;
            margin-bottom: 10px;
        }

        .author_container {
            font-size: 18px;
            color: #7C8793;
            margin-bottom: 24px;
        }
        
    }

    .close {
        position: absolute;
        top: 50px;
        right: 50px;
        cursor: pointer;
    }

    .network_hide {
        right: -800px;
    }

    .main__table {
        display: flex;
        flex-direction: column;
        border: 2px solid #E5E7E9;

        .headerTable {
            height: 70px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
            background-color: #2F73EA;
            color: white;
            font-size: 16px;
            padding: 0 40px;

            .item:nth-child(1) {
                width: 10%;
            }

            .item:nth-child(2) {
                width: 40%;
                text-align: center;
            }

            .item:nth-child(3) {
                width: 25%;
                text-align: center;
                flex-wrap: wrap;
                word-spacing: 60px;
            }

            .item:nth-child(4) {
                width: 25%;
                text-align: center;
            }
        }

        .headerTablePadding {
            padding-right: calc(40px + 18px);
        }

        .contentTable {
            display: flex;
            flex-direction: column;
            max-height: 650px;
            overflow: auto;
            color: #7C8793;

            .row {
                margin: 0;
                padding: 16px 40px;
                align-items: center;
                border-top: 1px solid #E5E7E9;

                .item:nth-child(1) {
                    width: 10%;
                }

                .item:nth-child(2) {
                    width: 40%;
                    text-align: start;
                }

                .item:nth-child(3) {
                    width: 25%;
                    text-align: center;
                    flex-wrap: wrap;
                    word-spacing: 60px;
                }

                .item:nth-child(4) {
                    width: 25%;
                    text-align: center;
                }
            }

            .row:nth-child(2n + 1) {
                background-color: white;
            }

            .row:hover {
                cursor: pointer;
                background-color: #f2f2f3;
            }
        }
    }

    .filter_btn {
        z-index: 5;
        margin-top: 20px;
        margin-left: 20px;
        position: absolute;
        width: 180px;
        height: 64px;
        border: 2px solid #2F73EA;
        color: #2F73EA;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        background-color: white;

        .filter_a {
            margin-right: 10px;
        }
    }

    .filter_btn:hover {
        cursor: pointer;
    }


    .filter_container {
        width: 380px;
        height: 600px;
        padding: 38px 38px 38px 38px;
        border: 2px solid #E5E7E9;
        background: #F9F9FA;
        position: relative;

        svg {
            position: absolute;
            top: 12px;
            right: 12px;
            cursor: pointer;
        }


        .title {
            color: $text_color;
            font-size: 28px;
            padding-bottom: 16px;
            text-align: center;
        }

        .citations_container {
            margin-top: 20px;

            input {
                display: flex;
                align-items: center;
                width: 100%;
                height: 42px;
                border: 1px solid #E5E7E9;
                background-color: white;
                color: #7C8793;
                padding: 0 16px;
                font-size: 18px;
            }
        }

        .filter_title {
            color: $text_color;
            font-size: 20px;
            margin-bottom: 16px;
        }

        .gate_input_container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 30px;
        }

        .gate_input_t {
            width: 16px;
            height: 2px;
            background-color: #7C8793;
        }

        .filter_third_first a, .filter_third_check a {
            font-size: 18px;
            color: #7C8793;
            margin-left: 10px;
        }

        .filter_third_first, .filter_third_check_cont {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            line-height: normal;
            margin-bottom: 16px;
        }

        input[type="checkbox"] {
            width: 18px;
            height: 18px;
            min-width: 18px;
            min-height: 18px;
            cursor: pointer;
            position: absolute;
            opacity: 0;
            z-index: -1;
        }

        input[type="checkbox"]:checked + label span {
            border: 1px solid #138EFF;
            //   vertical-align: middle;
            background-color: #138EFF;
            background-image: url(../assets/check.png);
            background-size: cover;
        }

        input[type="checkbox"] + label span {
            width: 18px;
            height: 18px;
            min-width: 18px;
            min-height: 18px;
            display: flex;
            border-radius: 2px;
            cursor: pointer;
            border: 1px solid #7C8793;
            background: rgba(19, 142, 255, 0);
        }


        label {
            display: flex;
            margin-bottom: 0;
            flex-direction: row;
            align-items: flex-start;
            line-height: normal;
        }

        .filter_padding {
            overflow: auto;
            max-height: 300px;
            margin-bottom: 16px;
        }

        .filter_btn_show_all {
            cursor: pointer;
            font-size: 18px;
            color: #2F73EA;
            width: 110px;
        }

        .filter_btn_show_all:hover {
            text-decoration: underline;
        }

        .unit_container {
            margin-top: 20px;
        }

        .btn_update_filter {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #2F73EA;
            color: white;
            font-size: 18px;
            font-weight: normal;
            height: 48px;
            margin-top: 24px;
            cursor: pointer;
            transition: 0.5s ease;
            border: 2px solid #2F73EA;
        }

        .btn_update_filter:hover {
            background-color: rgba(255, 255, 255, 0);
            color: #2F73EA;
        }

        .filter_graph_select {
            position: relative;
            svg {
                position: absolute;
                right: 16px;
                top: 18px;
            }
        }

        .type_graph {
            margin-top: 20px;

            select {
                display: flex;
                align-items: center;
                width: 100%;
                height: 42px;
                border: 1px solid #E5E7E9;
                background-color: white;
                color: #7C8793;
                padding: 0 16px;
                font-size: 18px;
                -webkit-appearance: none;
                -moz-appearance: none;
                -ms-appearance: none;
                appearance: none !important;
            }
        }


    }

    .filter_background {
        width: 100%;
        height: 100%;
        display: flex;
        padding-top: 200px;
        justify-content: center;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.76);
        z-index: 20;
        left: 0;
        top: 0;
    }

    
</style>