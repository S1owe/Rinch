<template>
    <div id="graph">
        <h1>Публикационная активность</h1>
        <h3>Всего работ: {{allPublications}}</h3>
        <div class="main_container">
            <div class="graph_container">
                <div class="graph" v-if="showGraph">

                </div>
                <div class="graph" v-else>
                    <div class="graph_disable_text">
                        Укажите подразделения и параметры графика
                    </div>
                </div>
            </div>

            <FilterComponent :filterMas="filter"></FilterComponent>
        </div>
    </div>
</template>

<script>
    import FilterComponent from '../components/FilterComponent'

    export default {
        name: "graph",
        data() {
            return {
                allPublications: 0,
                showGraph: false,
                filter: {
                    page: 'graph',
                    types_of_publication: ['Журнал','Монография, изданная зарубежными издательствами (наличие ISBN)','Научная конференция с очным участием (с публикацией сборника в РИНЦ)','Научные материалы','Обзор','Сборник статей, трудов','Статья','Издательство1','Статья1','Тестовое имя1', 'Книга'],
                    count_citation: '',
                    unit_types_of_publication: ['В и СР','Военный учебный центр','Институт непрерывного образования', 'Институт физической культуры и спорта','Институт экономики и управления','Кафедра "Автоматика и телемеханика"','Кафедра "Английский язык"','Кафедра "Внутренние болезни"','Кафедра "Государственно-правовые дисциплины"','Кафедра "Зоология и экология"','Кафедра "Общая психология"', 'Кафедра "Правосудие"'],
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


        },

        components: {
            FilterComponent
        }
    }
</script>

<style lang="scss" scoped>

    $text_color: #2F73EA;

    #graph {
        padding: 70px 120px;
    }

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
        height: 80px;
        border: 2px solid #7C8793;
        display: flex;
        align-items: center;
        justify-content: center;

        .graph {
            color: #7C8793;
            font-size: 24px;
        }
    }


</style>