<template>
  <Loading :times="300" v-if="!is_show" />
  <div class="team" v-else>
    <div class="team__header">
      <h1 class="team__header-title">{{ name }}</h1>

      <span class="team__topics-label">Темы научных исследований:</span>
      <div class="team__topics">
        <div
          v-for="(item, index) in topics"
          :key="index"
          class="team__topic-item"
        >
          {{ item }}
        </div>
      </div>

      <span class="team__members-label">Текущая команда:</span>
      <div class="team__members">
        <div
          v-for="(item, index) in members"
          :key="index"
          class="team__member-item"
        >
          <h6 class="team__member-name">{{ item.name }}</h6>
          <hr class="team__member-hr-line" />
          <span class="team__member-position">{{ item.position }}</span>
        </div>
      </div>

      <span class="team__desc-label">Описание:</span>
      <p class="team__description">{{ description }}</p>
    </div>

    <div class="team__publication-activity">
      <h3 class="team__publication-activity-title">
        Публикационная активность:
      </h3>

      <div class="team__heatmap">
        <CalendarHeatmap :values="heatmap.values" :endDate="heatmap.endDate" />
      </div>

      <div class="team__history">
        <PublicationsBlock :publications="publications" />
      </div>
    </div>

    <div class="team__network">
      <h3 class="team__network-title">Проектная активность сотрудников:</h3>

      <div class="team__network-graph">
        <network
          class="wrapper"
          ref="network"
          :nodes="nodes"
          :edges="edges"
          :options="options"
        ></network>
      </div>
    </div>
  </div>
</template>

<script>
import { Network } from "vue-vis-network";
import { CalendarHeatmap } from "vue-calendar-heatmap";
import PublicationsBlock from "../components/PublicationsBlock";
import http from "@/services/httpService";

import people from "../assets/people.png";
import Loading from "@/components/Loading";

export default {
  name: "Team",
  components: {Loading, CalendarHeatmap, PublicationsBlock, Network },
  props: ['id'],

  data() {
    return {
      is_show: false,
      name: "",

      topics: [
        // "Сетевое моделирование",
        // "Пространственная эпидемиология",
        // "Транспортные системы",
        // "Artificial Intelligence",
        // "Software",
        // "Hardware and Architecture",
      ],

      members: [
        // {
        //   name: "Митрохин Максим Александрович",
        //   position: "Кандидат технических наук Доцент",
        // },
        // {
        //   name: "Митрохин Максим Александрович",
        //   position: "Доктор технических наук Профессор",
        // },
        // {
        //   name: "Митрохин Максим Александрович",
        //   position: "Старший научный сотрудник",
        // },
        // {
        //   name: "Митрохина Наталья Юрьевна",
        //   position: "Кандидат технических наук Доцент",
        // },
      ],

      description: "",
        // "Мое исследование сосредоточено на продвижении современных достижений в области планирования эпидемий на основе данных и принятия решений с целью предоставления рекомендаций по оценке и контролю вспышек на основе наилучших имеющихся данных. В частности, я возглавляю работу над интерактивной веб-панелью мониторинга, которую органы общественного здравоохранения, исследователи и широкая общественность во всем мире используют для отслеживания вспышки нового коронавируса в 2020 году.",

      heatmap: {
        values: [
          { date: "2020-9-22", count: 6 },
          { date: "2020-10-12", count: 7 },
          { date: "2020-10-21", count: 3 },
          { date: "2020-11-28", count: 5 },
          { date: "2020-11-9", count: 1 },
          { date: "2020-11-11", count: 3 },
          { date: "2020-11-18", count: 5 },
          { date: "2020-11-19", count: 1 },
          { date: "2020-11-1", count: 3 },
          { date: "2020-10-25", count: 7 },
          { date: "2020-10-30", count: 4 },
          { date: "2020-10-19", count: 3 },
          { date: "2020-10-14", count: 2 },
        ],
        endDate: new Date(),
      },

      publications: [
        // {
        //   date: "2020-9-22",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2020-10-22",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2019-9-22",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2018-10-22",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2020-10-25",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2020-10-22",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2019-10-25",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
        // {
        //   date: "2019-11-25",
        //   name:
        //     "Symmetric guided electromagnetic waves in a shielded slab filled with anisotropic dielectric",
        // },
      ],

      options: {
        nodes: {
          borderWidth: 2,
        },
        edges: {
          color: "#2F73EA",
        },
      },
      edges: [
        { id: 91, from: 1, to: 2, value: 3 },
        { id: 92, from: 1, to: 9, value: 2 },
        { id: 93, from: 2, to: 3, value: 1 },
        { id: 94, from: 2, to: 4, value: 3 },
        { id: 95, from: 2, to: 5, value: 7 },
        { id: 96, from: 5, to: 6, value: 2 },
        { id: 97, from: 5, to: 7, value: 1 },
        { id: 98, from: 6, to: 8, value: 1 },
        { id: 99, from: 7, to: 10, value: 4 },
        { id: 910, from: 1, to: 20, value: 3 },
        { id: 911, from: 2, to: 9, value: 2 },
        { id: 912, from: 4, to: 3, value: 1 },
        { id: 913, from: 14, to: 4, value: 3 },
        { id: 914, from: 2, to: 15, value: 7 },
        { id: 915, from: 11, to: 6, value: 2 },
        { id: 916, from: 19, to: 18, value: 1 },
        { id: 917, from: 16, to: 8, value: 1 },
        { id: 918, from: 17, to: 10, value: 4 },
      ],
      nodes: [
        { id: 1, shape: "image", image: people, label: "Митрохин М.А." },
        { id: 2, shape: "image", image: people, label: "Митрохина Т.А." },
        { id: 3, shape: "image", image: people, label: "Балашов М.Ю." },
        { id: 4, shape: "image", image: people, label: "Дурнев А.Ю." },
        { id: 5, shape: "image", image: people, label: "Мишутина В.А." },
        { id: 6, shape: "image", image: people, label: "Татьянена Н.И." },
        { id: 7, shape: "image", image: people, label: "Шутов П.А." },
        { id: 8, shape: "image", image: people, label: "Прошин Т.А." },
        { id: 9, shape: "image", image: people, label: "Прошин Т.А." },
        { id: 10, shape: "image", image: people, label: "Прошин Т.А." },
        { id: 11, shape: "image", image: people, label: "Митрохин М.А." },
        { id: 12, shape: "image", image: people, label: "Митрохина Т.А." },
        { id: 13, shape: "image", image: people, label: "Балашов М.Ю." },
        { id: 14, shape: "image", image: people, label: "Дурнев А.Ю." },
        { id: 15, shape: "image", image: people, label: "Мишутина В.А." },
        { id: 16, shape: "image", image: people, label: "Татьянена Н.И." },
        { id: 17, shape: "image", image: people, label: "Шутов П.А." },
        { id: 18, shape: "image", image: people, label: "Прошин Т.А." },
        { id: 19, shape: "image", image: people, label: "Прошин Т.А." },
        { id: 20, shape: "image", image: people, label: "Прошин Т.А." },
      ],
    };
  },
  created() {
    http.post('api/api.php', {
      module: 'get_team',
      id: this.id
    }).then(response => {
      console.log(response.data);
      this.name = response.data.info.title;
      this.topics = response.data.topics;
      this.members = response.data.members;
      this.description = response.data.info.description;
      this.publications = response.data.activity.map(a => {
        return {
          id: a.id,
          name: a.title,
          date: a.year
        }
      });
      this.nodes = response.data.nodes.map(n => {
        return {
          id: n.id,
          label: n.label,
          shape: "image",
          image: people
        }
      });
      this.edges = response.data.edges;
      this.is_show = true;
    });
  }
};
</script>

<style lang="scss" scoped>
.team {
  box-sizing: border-box;

  &__header {
    padding: 70px 120px 56px 120px;
  }

  &__header-title {
    font-weight: bold;
    font-size: 38px;
    line-height: 45px;
    color: #2f73ea;
    margin-bottom: 24px;
  }

  &__topics-label {
    display: block;
    font-size: 22px;
    line-height: 140%;
    color: #2f73ea;
    margin-bottom: 8px;
  }

  &__topics {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  &__topic-item {
    background: #2f73ea;
    padding: 8px 16px;
    font-size: 18px;
    line-height: 140%;
    color: #ffffff;

    margin-right: 8px;
    margin-bottom: 3px;
    &:last-child {
      margin-right: 0px;
    }
  }

  &__members-label {
    display: block;
    margin-bottom: 8px;
    font-size: 22px;
    line-height: 140%;
    color: #2f73ea;
  }

  &__members {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  &__member-item {
    width: 350px;
    background: #2f73ea;
    padding: 12px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin-right: 8px;
    margin-bottom: 5px;
    &:last-child {
      margin-right: 0px;
    }
  }

  &__member-name {
    font-weight: 600;
    font-size: 22px;
    line-height: 140%;
    color: #ffffff;
  }

  &__member-hr-line {
    border: none;
    margin: 6px 0px;
    color: #ffffff;
    background-color: #ffffff;
    width: 100%;
    height: 1px;
  }

  &__member-position {
    font-size: 14px;
    line-height: 140%;
    color: #ffffff;
  }

  &__desc-label {
    display: block;
    margin-bottom: 4px;
    font-size: 22px;
    line-height: 140%;
    color: #2f73ea;
  }

  &__description {
    font-size: 18px;
    line-height: 140%;
    color: #7c8793;
  }

  &__publication-activity {
    padding: 56px 120px;
    box-sizing: border-box;
    background: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__publication-activity-title {
    display: block;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
    line-height: 140%;
    text-align: center;
    color: #2f73ea;
  }

  &__heatmap {
    width: 1285px;
    height: 230px;
    margin-bottom: 24px;
  }

  &__history {
    width: 1150px;
  }

  &__network {
    padding-top: 56px;
  }

  &__network-title {
    display: block;
    margin-bottom: 25px;
    font-weight: 500;
    font-size: 24px;
    line-height: 140%;
    text-align: center;
    color: #2f73ea;
  }

  &__network-graph {
    width: 100%;
    height: 760px;
    & .wrapper {
      height: 100%;
    }
  }
}
</style>