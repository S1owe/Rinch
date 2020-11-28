<template>
    <div id="network">
        <h1>Публикационная активность сотрудников</h1>
        <div class="network_container">
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

    .wrapper{
        min-height: 85vh;
        border: 1px solid black;
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
    
</style>