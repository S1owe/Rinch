<template>
  <div class="filter_container">
    <div class="title">Фильтр</div>

    <div class="gate_container">
      <div class="filter_title">Дата выгрузки:</div>
      <div class="gate_input_container">
        <datepicker class="filter_second_date" name="date1" :readonly="true" :value="filter.date_first" @remove="filter.date_first = $event" ></datepicker>
        <div class="gate_input_t"></div>
        <datepicker class="filter_second_date"  name="date2" :readonly="true" :value="filter.date_second" @remove="filter.date_second = $event" ></datepicker>
      </div>
    </div>

    <div class="publish_container">
      <div class="filter_title">Тип публикации:</div>

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

    <div class="citations_container" v-if="filterMas.page === 'employee'">
        <div class="filter_title">Цитирований от:</div>
        <input type="number" name="filter_citation_search" placeholder="0" v-model="filter.count_citation">
    </div>
    <div class="type_graph">
      <div class="filter_title">Тип графика</div>

      <div class="filter_graph_select">
        <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 6L13.9282 0H0.0717969L7 6Z" fill="#E5E7E9"/>
        </svg>
        <select v-model="filter.type_graph">
          <option value="pie">Круговая диаграмма</option>
          <option value="bar">Столбчатая диаграмма</option>
<!--          <option value="line">Линейная диаграмма</option>-->
         <!-- <option value="horizontalBar">Полосовая диаграмма</option>
          <option value="polarArea">Фигурная диаграмма</option>-->
        </select>
      </div>
    </div>

    <!--<div class="unit_container" v-if="filterMas.page === 'graph'">
      <div class="filter_title">Выберите подразделения:</div>

      <div class="filter_third_container" v-bind:class="{ filter_padding: filter.unit_filter_subdivision_show}">

        <div class="filter_third_check filter_third_first" v-bind:class="{ filter_third_padding: filter.unit_filter_subdivision_show}">
          <input type="checkbox" id="unit_filter_check_all" @click="selectUnit_all()" checked>
          <label for="unit_filter_check_all">
            <span class="checkbox__icon"></span>
            <a>Все</a>
          </label>
        </div>


        <div class="filter_third_check" v-for="(types_of_publications, index) in filter.unit_types_of_publication" :key="'unit_filter_publish_' + index">

          <div class="filter_third_check_cont"
               v-bind:class="{ disable_input: (index >= 3) && (!filter.unit_filter_subdivision_show)}"
               v-if="((filter.unit_filter_subdivision_show) || (index <= 3))"
          >
            <input type="checkbox" :id="'unit_filter_' + (index) + '_check'" :value="types_of_publications" @click="checkUnit_all_checked(types_of_publications)" v-model="filter.unit_selected">

            <label :for="'unit_filter_' + (index) + '_check'">
              <span class="checkbox__icon"></span>
              <a>{{types_of_publications}}</a>
            </label>
          </div>

        </div>


      </div>

      <div class="filter_btn_show_all" :class="{active: filter.unit_filter_subdivision_show}" @click="subdivisionUnit_show()"><a>{{filter.unit_btn_show_text}}</a></div>

    </div>-->

    <div class="btn_update_filter" @click="updateFilter">Обновить</div>

  </div>
</template>

<script>

import datepicker from '../components/vue-date-picker';

export default {
  name: "FilterComponent",
  props: {
      filterMas: Object,   // page: employee - стр. сотр. graph - стр. графа, unit - стр. подразделений
    types: Array
  },

  data() {
      return {
          filter: {
              date_first: '',
              date_second: '',
              filter_subdivision_show: false, // visibility расширенного списка подразделений
              btn_show_text: "Показать всё",
              types_of_publication: ['Журнал','Монография, изданная зарубежными издательствами (наличие ISBN)','Научная конференция с очным участием (с публикацией сборника в РИНЦ)','Научные материалы','Обзор','Сборник статей, трудов','Статья','Издательство1','Статья1','Тестовое имя1', 'Книга'],
              selected: ['Журнал','Монография, изданная зарубежными издательствами (наличие ISBN)','Научная конференция с очным участием (с публикацией сборника в РИНЦ)','Научные материалы','Обзор','Сборник статей, трудов','Статья','Издательство1','Статья1','Тестовое имя1', 'Книга'],
              check_filter_publication_all: true,   // показать все / скрыть все
              count_citation: '', // кол-во цитирований

              // unit
              unit_filter_subdivision_show: false, // visibility расширенного списка подразделений
              unit_btn_show_text: "Показать всё",
              unit_types_of_publication: ['В и СР','Военный учебный центр','Институт непрерывного образования', 'Институт физической культуры и спорта','Институт экономики и управления','Кафедра "Автоматика и телемеханика"','Кафедра "Английский язык"','Кафедра "Внутренние болезни"','Кафедра "Государственно-правовые дисциплины"','Кафедра "Зоология и экология"','Кафедра "Общая психология"', 'Кафедра "Правосудие"'],
              unit_selected: ['В и СР','Военный учебный центр','Институт непрерывного образования', 'Институт физической культуры и спорта','Институт экономики и управления','Кафедра "Автоматика и телемеханика"','Кафедра "Английский язык"','Кафедра "Внутренние болезни"','Кафедра "Государственно-правовые дисциплины"','Кафедра "Зоология и экология"','Кафедра "Общая психология"', 'Кафедра "Правосудие"'],
              unit_check_filter_publication_all: true,   // показать все / скрыть все

              // график
              type_graph: "pie",
          },
      }
  },


    beforeCreate() {

    },

    created() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        this.filter.date_first = (year - 5) + '-01-01';
        this.filter.date_second = year + '-' + month + '-' + day;

        console.log(this.filterMas.page);

        this.filter.types_of_publication = this.types.map(t => t.label);
        this.filter.selected = this.types.map(t => t.label);

        if (this.filterMas.page === 'graph') {
            this.filter.unit_types_of_publication = this.filterMas.unit_types_of_publication;
            this.filter.unit_selected = this.filterMas.unit_types_of_publication;
        } else if (this.filterMas.page === 'employee') {
            this.filter.count_citation = this.filterMas.count_citation
        }

    },

    watch: {
      'filter.type_graph'(after) {
            console.log(after);
        }
    },

    methods: {

        updateFilter() {
            if (this.filterMas.page === 'graph') {
                this.$emit('typechart', this.filter.type_graph)
            }

            this.$emit('update-filter', this.filter)
        },
        // выбрать все / снять выделения "выбрать все"
        select_all() {
            this.filter.check_filter_publication_all = !this.filter.check_filter_publication_all;

            if (this.filter.check_filter_publication_all === false) {
                this.filter.selected = [];
                /* for (let i = 0; i < this.filter.types_of_publication.length; i++) {
                     document.getElementById('filter_' + i + '_check').checked = false;      // disable checkbox
                 }*/
            } else {
                for (let i in this.filter.types_of_publication) {
                    this.filter.selected.push(this.filter.types_of_publication[i]);
                }
                /*for (let i = 0; i < this.filter.types_of_publication.length; i++) {
                    document.getElementById('filter_' + i + '_check').checked = true;      // enable checkbox
                }*/
            }

            // console.log(this.selected);
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

            console.log(this.filter.selected);
            console.log("include = " + include);
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

        // unit

        selectUnit_all() {
            this.filter.unit_check_filter_publication_all = !this.filter.unit_check_filter_publication_all;

            if (this.filter.unit_check_filter_publication_all === false) {
                this.filter.unit_selected = [];
                /* for (let i = 0; i < this.filter.unit_types_of_publication.length; i++) {
                     document.getElementById('unit_filter_' + i + '_check').checked = false;      // disable checkbox
                 }*/
            } else {
                for (let i in this.filter.unit_types_of_publication) {
                    this.filter.unit_selected.push(this.filter.unit_types_of_publication[i]);
                }
                /* for (let i = 0; i < this.filter.unit_types_of_publication.length; i++) {
                     document.getElementById('unit_filter_' + i + '_check').checked = true;      // enable checkbox
                 }*/
            }

            // console.log(this.selected);
        },

        checkUnit_all_checked(value) {
            let include = this.filter.unit_selected.indexOf(value);

            if (include !== -1) {
                this.filter.unit_selected.splice(include, 1);
            } else {
                this.filter.unit_selected.push(value);
            }

            (this.filter.unit_selected.length !== this.filter.unit_types_of_publication.length)?(this.filter.unit_check_filter_publication_all = false):(this.filter.unit_check_filter_publication_all = true);

            if (this.filter.unit_selected.length === this.filter.unit_types_of_publication.length) {
                this.filter.unit_check_filter_publication_all = true;
                document.getElementById('unit_filter_check_all').checked = true;      // disable checkbox
            } else {
                this.filter.unit_check_filter_publication_all = false;
                document.getElementById('unit_filter_check_all').checked = false;      // enable checkbox
            }

            console.log(this.filter.unit_selected);
            console.log("include = " + include);
        },

        subdivisionUnit_show() {
            if (this.filter.unit_filter_subdivision_show === false) {
                this.filter.unit_filter_subdivision_show = true;
                this.filter.unit_btn_show_text = "Скрыть"
            } else {
                this.filter.unit_filter_subdivision_show = false;
                this.filter.unit_btn_show_text = "Показать всё"
            }

        },

    },

    components: {
        datepicker
    }
};
</script>

<style lang="scss" scoped>

  $text_color: #2F73EA;

  // filter

  .filter_container {
    width: 380px;
    padding: 38px 38px 38px 38px;
    border: 2px solid #E5E7E9;
    background: #F9F9FA;

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

</style>