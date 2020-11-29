<template>
  <div class="team-rating">
    <div class="team-rating__title">
      <h1 class="team-rating__title-text">Командный рейтинг</h1>
    </div>

    <div class="team-rating__controls">
      <div class="team-rating__input-wrap">
        <span class="team-rating__input-label">Введите название команды</span>

        <div class="d-flex">
          <b-input-group class="team-rating__input-group">
            <template #append>
              <div class="team-rating__input-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.3334 24.0001C7.44238 24.0001 2.66675 19.2245 2.66675 13.3334C2.66675 7.44238 7.44238 2.66675 13.3334 2.66675C19.2245 2.66675 24.0001 7.44238 24.0001 13.3334C24.0001 15.7984 23.164 18.068 21.7599 19.8743L28.9429 27.0572L27.0573 28.9429L19.8743 21.7599C18.068 23.164 15.7984 24.0001 13.3334 24.0001ZM21.3334 13.3334C21.3334 17.7517 17.7517 21.3334 13.3334 21.3334C8.91514 21.3334 5.33342 17.7517 5.33342 13.3334C5.33342 8.91514 8.91514 5.33341 13.3334 5.33341C17.7517 5.33341 21.3334 8.91514 21.3334 13.3334Z"
                    fill="#2F73EA"
                  />
                </svg>
              </div>
            </template>

            <b-form-input
              @keydown.enter="change"
              v-model="team"
              placeholder="Введите название команды"
              class="team-rating__input"
            ></b-form-input>
          </b-input-group>
          <b-button variant="outline-info" class="ml-3" @click="change">Поиск</b-button>
        </div>
      </div>

      <div class="team-rating__create-btn-wrap">
        <button class="team-rating__create-btn" @click="handleCreateTeam">
          + Создать команду
        </button>
      </div>
    </div>

    <div class="team-rating__table">
      <transition name="global" mode="out-in" appear>
        <b-table striped hover :items="table.items" :fields="table.fields" v-if="is_show"
                 @row-clicked="$router.push({name: 'team', params: {id: $event.id}})" :selectable="true">
          <!-- <template #cell(position)="data">
            {{ data.item.rating }}
          </template> -->
        </b-table>
      </transition>
    </div>

    <ModalCreateCommand v-model="is_show_modal" @send="create_team" />
  </div>
</template>

<script>

import http from "@/services/httpService";
import ModalCreateCommand from "@/components/ModalCreateCommand";

export default {
  name: "TeamRating",
  components: {ModalCreateCommand},
  data() {
    return {
      team: "",
      is_show_modal: false,
      is_show: false,

      table: {
        fields: [
          { key: "position", label: "Место" },
          { key: "name", label: "Наименование" },
          { key: "researchArea", label: "Область исследований" },
          { key: "publicationsCount", label: "Кол-во публикаций" },
          { key: "rating", label: "Рейтинг" },
        ],

        items: [
/*          {
            position: 1,
            name: "Procent",
            researchArea:
              "Антенны на основе периодических структур, Электромагнитные состояния в 2D-наноструктурах и материалах",
            publicationsCount: 25,
            rating: 100,
            id: 5
          },
          {
            position: 2,
            name: "Procent",
            researchArea:
              "Антенны на основе периодических структур, Электромагнитные состояния в 2D-наноструктурах и материалах",
            publicationsCount: 25,
            rating: 94,
          },
          {
            position: 3,
            name: "Procent",
            researchArea:
              "Антенны на основе периодических структур, Электромагнитные состояния в 2D-наноструктурах и материалах",
            publicationsCount: 25,
            rating: 82,
          },
          {
            position: 4,
            name: "Procent",
            researchArea:
              "Антенны на основе периодических структур, Электромагнитные состояния в 2D-наноструктурах и материалах",
            publicationsCount: 25,
            rating: 76,
          },*/
        ],
      },
    };
  },

  methods: {
    create_team: function (team_info) {
      http.post('api/api.php', {
        module: 'create_team',
        title: team_info.name,
        description: team_info.description,
        topics: team_info.select_theme,
        users: team_info.result_command.map(a => a.id)
      }).then(response => {
        this.table.items.push({
          position: this.table.items.length+1,
          name: response.data.title,
          researchArea: response.data.topic,
          rating: response.data.rating,
          publicationsCount: response.data.count,
          id: response.data.id
        });
      });
    },
    change() {
      this.loadData();
    },
    handleCreateTeam() {
      this.is_show_modal = true;
    },
    loadData: function (query = this.team) {
      this.is_show = false;
      http.post('api/api.php', {
        module: 'teams',
        query: query
      }).then((response) => {
        let position = 1;
        this.table.items.splice(0, this.table.items.length);
        this.table.items = response.data.teams.map((t) => {
          return {
            position: position++,
            name: t.title,
            researchArea: t.topic,
            publicationsCount: t.count,
            rating: t.rating,
            id: t.id
          }
        });
        this.is_show = true;
      });
    }
  },
  created() {
    this.loadData('Pro');
  }
};
</script>

<style lang="scss" scoped>
.team-rating {
  padding: 70px 120px 180px 120px;
  box-sizing: border-box;

  &__title {
    margin-bottom: 25px;
  }

  &__title-text {
    font-weight: normal;
    font-size: 38px;
    line-height: 45px;
    color: #2f73ea;
  }

  &__input-wrap {
    width: 810px;
  }

  &__input-label {
    display: block;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #2f73ea;
    margin-bottom: 20px;
  }

  &__input {
    padding: 25px 40px;
    color: #2f73ea;
    font-size: 18px;
    line-height: 21px;
    border: 2px solid #2f73ea;
    box-sizing: border-box;
    border-radius: 0px;

    &::placeholder {
      color: rgba(47, 115, 234, 0.45);
      font-size: 18px;
    }

    &:focus {
      color: #2f73ea;
      border: 2px solid #2f73ea;
      box-shadow: none;
    }
  }

  &__input-group {
    position: relative;
  }

  &__input-icon {
    position: absolute;
    top: 11px;
    right: 20px;
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 22px;
  }

  &__create-btn {
    display: block;
    outline: none;
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #2f73ea;
  }
}
</style>

<!-- table styles -->
<style lang="scss">
.team-rating {
  &__table {
    & thead {
      background: #2f73ea;
      border: 2px solid #e5e7e9;
      box-sizing: border-box;

      & th {
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        font-size: 20px;
        color: #ffffff;
        padding: 32px 20px;

        &:nth-child(3) {
          width: 580px;
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
        padding: 20px 0px;

        &:nth-child(3) {
          width: 580px;
          text-align: left;
        }
      }
    }
  }
}
</style>