<template>
  <div class="main">
    <div class="main__left">
      <div class="main__title">
        <h1 class="main__title-text">РГЭУ (РИНХ)</h1>
      </div>

      <div class="main__topics">
        <div
          v-for="(item, index) in topics"
          :key="index"
          class="main__topic-item"
        >
          <StatsCounter :count="item.count" :name="item.name" />
        </div>
      </div>

      <div class="main__table">
        <b-table
          striped
          hover
          fixed
          :items="this.GET_DEPARTS.departments"
          :fields="table.fields"
        ></b-table>
      </div>
    </div>
    <div class="main__right">
      <FilterComponent :filterMas="filter" @update-filter="changeFilters" :without-graphic-type="true" />
    </div>
  </div>
</template>

<script>
import StatsCounter from "../components/StatsCouter";
import FilterComponent from "../components/FilterComponent";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Main",
  components: { StatsCounter, FilterComponent },

  data() {
    return {
      table: {
        fields: [
          { key: "name", label: "Подразделение" },
          { key: "authors", label: "Всего авторов" },
          { key: "authors_publish", label: "Всего статей авторов" },
          {
            key: "all_publish",
            label: "Всего статей подразделений",
          },
        ],
      },
      filter: {
        types_of_publication: [
          "Журнал",
          "Обзор",
          "Сборник статей, трудов",
          "Статья",
          "Тестовое имя1",
          "Книга",
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["GET_DEPARTS"]),

    topics() {
      return [
        { count: this.GET_DEPARTS.authors, name: "Всего авторов" },
        { count: +this.GET_DEPARTS.articles, name: "Всего статей" },
        { count: this.GET_DEPARTS.dep_articles, name: "Статей подразделений" },
        { count: this.GET_DEPARTS.citation, name: "Кол-во цитирований" },
      ];
    },
  },

  methods: {
    ...mapActions(["FETCH_DEPARTS"]),
    changeFilters() {
      this.FETCH_DEPARTS();
    },
  },

  mounted() {
    this.FETCH_DEPARTS();
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 74px 120px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  &__left {
    width: 74%;
  }

  &__right {
    width: 23%;
  }

  &__title {
    width: 100%;
    margin-bottom: 28px;
  }

  &__title-text {
    font-weight: normal;
    font-size: 38px;
    line-height: 45px;
    color: #2f73ea;
  }

  &__topics {
    display: flex;
    margin-bottom: 24px;
  }

  &__topic-item {
    margin-right: 16px;

    &:last-child {
      margin: 0px;
    }
  }
}
</style>

<style lang="scss">
.main {
  &__table {
    & thead {
      background: #2f73ea;

      & th {
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
        color: #ffffff;
        padding: 32px 0px;
      }

      & tr {
        border: 2px solid #e5e7e9;
        box-sizing: border-box;
      }
    }

    & tbody {
      & td {
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        font-size: 18px;
        color: #827c93;
        padding: 20px 0px;
      }

      & tr {
        border: 2px solid #e5e7e9;
        box-sizing: border-box;
      }
    }
  }
}
</style>