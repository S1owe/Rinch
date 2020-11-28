<template>
  <div class="worker">
    <div class="worker__main">
      <div class="worker__left">
        <div class="worker__title">
          <h1 class="worker__title-text">{{ name }}</h1>
        </div>

        <div class="worker__interests">
          <span class="worker__interests-title">
            Исследовательские интересы:
          </span>

          <div class="worker__interests-list">
            <div
              v-for="(item, index) in interests"
              :key="index"
              class="worker__interest-item"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="worker__anchor">
          <a class="worker__anchor-link" href="#research-anchor">
            К исследованиям, с грантовым финансированием
          </a>
        </div>

        <div class="worker__topics">
          <div
            v-for="(item, index) in topics"
            :key="index"
            class="worker__topic-item"
          >
            <StatsCounter :count="item.count" :name="item.name" />
          </div>
        </div>

        <div class="worker__table">
          <b-table
            striped
            hover
            :items="table.items"
            :fields="table.fields"
          ></b-table>
        </div>
      </div>

      <div class="worker__right">
        <FilterComponent :filterMas="filter" />
      </div>
    </div>

    <div class="worker__researchs" id="research-anchor">
      <h3 class="worker__research-title">
        Исследования, получившие грантовое финансирование
      </h3>

      <div class="worker__timeline">
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="worker__timeline-item"
        >
          <div class="worker__timeline-item-wrap">
            <span class="worker__timeline-date">
              {{ item.date.toLocaleDateString("ru") }}
            </span>
            <span class="worker__timeline-title">{{ item.title }}</span>
            <span class="worker__timeline-desc-label">Краткое описание:</span>
            <span class="worker__timeline-description">
              {{ item.description }}
            </span>
            <router-link :to="item.link" class="worker__timelane-moreInfo">
              Подробнее
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCounter from "../components/StatsCouter";
import FilterComponent from "../components/FilterComponent";

export default {
  name: "Worker",
  components: { StatsCounter, FilterComponent },

  data() {
    return {
      name: "Митрохин Максим Александрович",

      topics: [
        { count: 23, name: "Всего статей" },
        { count: 12, name: "Кол-во цитирований" },
        { count: 5, name: "Индекс Хирша" },
      ],

      interests: [
        "Computer Networks",
        "Information Systems",
        "Electronic Engineering",
        "Software",
        "Hardware and Architecture",
        "Artificial Intelligence",
      ],

      table: {
        fields: [
          { key: "index", label: "№" },
          { key: "name", label: "Название" },
          { key: "location", label: "Место публикации" },
          { key: "date", label: "Дата публикации" },
          { key: "citationsCount", label: "Кол-во цитирований" },
          { key: "authorshipShare", label: "Доля авторства" },
        ],

        items: [
          {
            index: 1,
            name: "Semisupervised learning in pattern recognitio",
            location: "Semisupervised learning in pattern recognitio",
            date: "01.03.20",
            citationsCount: 5,
            authorshipShare: 0.33,
          },
          {
            index: 2,
            name: "Formalization of Organization of Signaling Pr",
            location: "Moscow Workshop on Electronic and N",
            date: "01.03.20",
            citationsCount: 6,
            authorshipShare: 0.6,
          },
          {
            index: 3,
            name: "Deep learning approach for QRS wave detection",
            location: "11th IEEE International Conference ",
            date: "10.04.19",
            citationsCount: 10,
            authorshipShare: 0.4,
          },
          {
            index: 4,
            name: "Investigation of models for prognosis of crit",
            location: "Conference of Open Innovation Assoc",
            date: "08.01.18",
            citationsCount: 3,
            authorshipShare: 0,
          },
          {
            index: 5,
            name: "Use of the mass service theory elements while",
            location: "Journal of Advanced Research in Dyn",
            date: "01.01.18",
            citationsCount: 4,
            authorshipShare: 0,
          },
          {
            index: 6,
            name: "Intelligent data processing scheme for",
            location: "Proceedings of 2017 20th IEEE Inter",
            date: "06.07.17",
            citationsCount: 6,
            authorshipShare: 0,
          },
        ],
      },

      timelineItems: [
        {
          date: new Date(),
          title:
            "Разработка интерактивной веб-панели для отслеживания COVID-19 в режиме реального времени",
          description:
            "Мы разработали интерактивную веб-панель управления (статический снимок, показанный выше), размещенную в Центре системных наук и инженерии (CSSE) в Университете Джона Хопкинса, для визуализации и отслеживания зарегистрированных случаев в режиме реального времени.",
          link: "/asd",
        },
        {
          date: new Date(),
          title:
            "Разработка интерактивной веб-панели для отслеживания COVID-19 в режиме реального времени",
          description:
            "Мы разработали интерактивную веб-панель управления (статический снимок, показанный выше), размещенную в Центре системных наук и инженерии (CSSE) в Университете Джона Хопкинса, для визуализации и отслеживания зарегистрированных случаев в режиме реального времени.",
          link: "/asd",
        },
        {
          date: new Date(),
          title:
            "Разработка интерактивной веб-панели для отслеживания COVID-19 в режиме реального времени",
          description:
            "Мы разработали интерактивную веб-панель управления (статический снимок, показанный выше), размещенную в Центре системных наук и инженерии (CSSE) в Университете Джона Хопкинса, для визуализации и отслеживания зарегистрированных случаев в режиме реального времени.",
          link: "/asd",
        },
        {
          date: new Date(),
          title:
            "Разработка интерактивной веб-панели для отслеживания COVID-19 в режиме реального времени",
          description:
            "Мы разработали интерактивную веб-панель управления (статический снимок, показанный выше), размещенную в Центре системных наук и инженерии (CSSE) в Университете Джона Хопкинса, для визуализации и отслеживания зарегистрированных случаев в режиме реального времени.",
          link: "/asd",
        },
      ],

      filter: {
        page: "employee",
        types_of_publication: [
          "Журнал",
          "Монография, изданная зарубежными издательствами (наличие ISBN)",
          "Научная конференция с очным участием (с публикацией сборника в РИНЦ)",
          "Научные материалы",
          "Обзор",
          "Сборник статей, трудов",
          "Статья",
          "Издательство1",
          "Статья1",
          "Тестовое имя1",
          "Книга",
        ],
        count_citation: "10",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.worker {
  box-sizing: border-box;

  &__main {
    padding: 74px 120px 0px 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 96px;
  }

  &__researchs {
    padding: 74px 120px 180px 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f9f9f9;
  }

  &__research-title {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    color: #2f73ea;
  }

  &__timeline {
    position: relative;
    padding: 20px 0px;
    box-sizing: border-box;

    &:before {
      position: absolute;
      left: calc(50% - 1px);
      top: -15px;
      height: calc(100% + 40px);
      width: 2px;
      background: #2f73ea;
      content: "";
    }
  }

  &__timeline-item {
    width: 100%;
    display: flex;

    &:nth-child(1n) {
      justify-content: flex-end;
      text-align: left;

      & .worker__timeline-item-wrap {
        transform: translate(-120px, 0px);

        &::after {
          position: absolute;
          right: auto;
          left: -48px;
          top: 10px;
          height: 2px;
          width: 28px;
          background: #2f73ea;
          content: "";
        }
      }
    }

    &:nth-child(2n) {
      justify-content: flex-start;
      text-align: right;

      & .worker__timeline-item-wrap {
        transform: translate(120px, 0px);

        &::after {
          position: absolute;
          left: auto;
          right: -48px;
          top: 10px;
          height: 2px;
          width: 28px;
          background: #2f73ea;
          content: "";
        }
      }
    }
  }

  &__anchor {
    margin-bottom: 14px;
  }

  &__anchor-link {
    font-size: 22px;
    line-height: 140%;
    color: #2f73ea;
  }

  &__timeline-item-wrap {
    position: relative;
    max-width: 40%;

    & span {
      display: block;
    }
  }

  &__timeline-date {
    font-weight: bold;
    font-size: 18px;
    line-height: 140%;
    color: #2f73ea;
    margin-bottom: 12px;
  }

  &__timeline-title {
    font-weight: bold;
    font-size: 18px;
    line-height: 140%;
    color: #2f73ea;
    margin-bottom: 16px;
  }

  &__timeline-desc-label {
    font-weight: 600;
    font-size: 18px;
    line-height: 140%;
    color: #7c8793;
  }

  &__timeline-description {
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    color: #7c8793;
    margin-bottom: 16px;
  }

  &__timelane-moreInfo {
    display: inline-block;
    border: 2px solid #7c8793;
    padding: 8px 16px;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 140%;
    color: #7c8793;
  }

  &__left {
    width: 1250px;
  }

  &__right {
    width: 390px;
  }

  &__title {
    margin-bottom: 32px;
  }

  &__title-text {
    font-weight: normal;
    font-size: 38px;
    line-height: 45px;
    color: #2f73ea;
  }

  &__topics {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  &__topic-item {
    margin-right: 16px;
    margin-bottom: 5px;

    &:last-child {
      margin-right: 0px;
    }
  }

  &__interests {
    margin-bottom: 24px;
  }

  &__interests-title {
    display: block;
    font-weight: normal;
    font-size: 22px;
    line-height: 140%;
    color: #2f73ea;
    margin-bottom: 12px;
  }

  &__interests-list {
    display: flex;
    flex-wrap: wrap;
  }

  &__interest-item {
    border: 2px solid #2f73ea;
    padding: 8px 16px;
    box-sizing: border-box;
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
    color: #2f73ea;
    margin-right: 16px;
    margin-bottom: 5px;

    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>

<!-- table styles -->
<style lang="scss">
.worker {
  &__table {
    & thead {
      background: #2f73ea;
      border: 2px solid #e5e7e9;
      box-sizing: border-box;

      & th {
        font-weight: normal;
        text-align: center;
        vertical-align: middle !important;
        font-size: 20px;
        color: #ffffff;
        padding: 32px 10px;

        &:first-child {
          padding: 32px 50px;
        }
      }
    }

    & tbody {
      & tr {
        border: 2px solid #e5e7e9;
        box-sizing: border-box;
      }

      & td {
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        font-size: 18px;
        color: #827c93;
        padding: 20px 10px;

        &:nth-child(2),
        &:nth-child(3) {
          text-align: left;
        }
      }
    }
  }
}
</style>