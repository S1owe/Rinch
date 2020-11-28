<template>
  <div class="main">
    <div class="main__left">
      <div class="main__title">
        <h1 class="main__title-text">Экономическая безопасность</h1>
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
          :items="table.items"
          :fields="table.fields"
        ></b-table>
      </div>
    </div>
    <div class="main__right">
      <FilterComponent :filterMas="filter" />
    </div>
  </div>
</template>

<script>
import StatsCounter from "../components/StatsCouter";
import FilterComponent from "../components/FilterComponent";

export default {
  name: "Main",
  components: { StatsCounter, FilterComponent },

  data() {
    return {
      topics: [
        { count: 135, name: "Всего авторов" },
        { count: 3155, name: "Всего статей" },
        { count: 1621, name: "Статей подразделений" },
        { count: 8071, name: "Кол-во цитирований" },
      ],
      table: {
        fields: [
          { key: "subdivision", label: "Подразделение" },
          { key: "totalAuthors", label: "Всего авторов" },
          { key: "totalArticlesByAuthor", label: "Всего статей авторов" },
          {
            key: "totalSubdivisionsArticles",
            label: "Всего статей подразделений",
          },
        ],

        items: [
          {
            subdivision: "Факультеты (институты)",
            totalAuthors: 291,
            totalArticlesByAuthor: 2939,
            totalSubdivisionsArticles: 1695,
          },
          {
            subdivision: "НР и ИД",
            totalAuthors: 10,
            totalArticlesByAuthor: 158,
            totalSubdivisionsArticles: 106,
          },
          {
            subdivision:
              "Управление стратегического развития и системы качества",
            totalAuthors: 2,
            totalArticlesByAuthor: 36,
            totalSubdivisionsArticles: 36,
          },
          {
            subdivision: "Филиалы",
            totalAuthors: 1,
            totalArticlesByAuthor: 10,
            totalSubdivisionsArticles: 10,
          },
          {
            subdivision: "Первый проректор",
            totalAuthors: 2,
            totalArticlesByAuthor: 6,
            totalSubdivisionsArticles: 6,
          },
          {
            subdivision: "В и СР",
            totalAuthors: 1,
            totalArticlesByAuthor: 7,
            totalSubdivisionsArticles: 3,
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