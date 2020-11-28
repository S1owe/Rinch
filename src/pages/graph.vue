<template>
    <div id="graph">
        <h1>Публикационная активность</h1>
        <h3>Всего работ: {{allPublications}}</h3>
        <div class="main_container">
            <div class="graph_container">
                <div class="graphChart" v-if="showGraph">
                    <Chart
                            :def="def"
                            :data="data"
                    ></Chart>
                </div>
                <div class="graph" v-else>
                    <div class="graph_disable_text">
                        Укажите подразделения и параметры графика
                    </div>
                </div>
            </div>

            <FilterComponent @typechart="chartType" :filterMas="filter"></FilterComponent>
        </div>
    </div>
</template>

<script>
    import FilterComponent from '../components/FilterComponent';
    import Chart from 'vue-chartless'

    export default {
        name: "graph",
        data() {
            return {
                allPublications: 0,
                showGraph: true,
                filter: {
                    page: 'graph',
                    types_of_publication: ['Журнал','Монография, изданная зарубежными издательствами (наличие ISBN)','Научная конференция с очным участием (с публикацией сборника в РИНЦ)','Научные материалы','Обзор','Сборник статей, трудов','Статья','Издательство1','Статья1','Тестовое имя1', 'Книга'],
                    count_citation: '',
                    unit_types_of_publication: ['В и СР','Военный учебный центр','Институт непрерывного образования', 'Институт физической культуры и спорта','Институт экономики и управления','Кафедра "Автоматика и телемеханика"','Кафедра "Английский язык"','Кафедра "Внутренние болезни"','Кафедра "Государственно-правовые дисциплины"','Кафедра "Зоология и экология"','Кафедра "Общая психология"', 'Кафедра "Правосудие"'],
                },

                def : {
                    type : 'pie'
                },
                data : [
                    { label: 'London', value:'330' },
                    { label: 'Barcelona', value:'430' },
                    { label: 'Paris', value:'150' },
                    { label: 'London13', value:'330' },
                ]
            }
        },

        beforeCreate() {


        },

        created() {

        },

        watch: {

        },

        methods: {
            chartType(data) {
                this.def.type = data
            }

        },

        components: {
            FilterComponent,
            Chart

        }
    }
</script>

<style lang="scss">

    $text_color: #2F73EA;

    .vuec3-chart {
        max-height: 650px !important;

        svg {
            width: 700px;
            height: 650px;
        }
    }

    #graph {
        padding: 70px 120px;

    
        h1 {
            font-size: 38px;
            color: $text_color;
            margin-bottom: 28px;
        }

        h3 {
            font-size: 24px;
            color: $text_color;
            margin-bottom: 24px;
        }

        .main_container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .graph_container {
            width: 1250px;
            display: flex;
            justify-content: center;

            .graph {
                color: #7C8793;
                font-size: 24px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #7C8793;
                width: 100%;
            }

            .graph_disable_text {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .graphChart {
                color: #7C8793;
                font-size: 18px;
                height: 750px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #7C8793;
                width: 100%;
            }
        }
    }

</style>