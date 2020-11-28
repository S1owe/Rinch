<template>
  <div class="search">
    <div class="search__title">
      <h1 class="search__title-text">Поиск сотрудников</h1>
    </div>

    <div class="search__main">
      <div class="search__input-wrap">
        <span class="search__input-label">Введите ФИО или ID сотрудника</span>

        <div class="d-flex">
          <b-input-group class="search__input-group">
            <template #append>
              <div class="search__input-icon">
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
              @change="change"
              v-model="searchText"
              placeholder="Иванов Иван Иванович"
              class="search__search-input"
            ></b-form-input>
          </b-input-group>
          <b-button variant="outline-info" class="ml-3" @click="change">Поиск</b-button>
        </div>
      </div>

      <transition name="fade" mode="out-in">
        <div class="search__base-cap" key="cap" v-if="!showResults">
          <span class="search__base-cap-text">Поиск сотрудников</span>
        </div>

        <div class="search__search-results" key="results" v-if="showResults && GET_USERS.length > 0">
          <b-table
            striped
            hover
            fixed
            :items="GET_USERS"
            :fields="results.fields" :selectable="true"
            @row-clicked="handleClick"
          ></b-table>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",

  data() {
    return {
      searchText: "",
      showResults: false,

      results: {
        fields: [
          { key: "name", label: "Сотрудники" },
          { key: "count", label: "Кол-во статей" },
          { key: "cit", label: "Кол-во цитирований" },
          { key: "hirsh", label: "Индекс Хирша" },
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["GET_USERS"]),
  },

  methods: {
    ...mapActions(["FETCH_USERS"]),
    change(value) {
      this.FETCH_USERS(value).then(() => {
        this.showResults = !!value.trim();
      });
    },
    handleClick(item) {
      this.$router.push(`/worker/${item.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 70px 120px 180px 120px;
  box-sizing: border-box;

  &__title {
    margin-bottom: 28px;
  }

  &__title-text {
    font-weight: normal;
    font-size: 38px;
    line-height: 45px;
    color: #2f73ea;
  }

  &__main {
    width: 1250px;
  }

  &__input-wrap {
    width: 810px;
    margin-bottom: 24px;
  }

  &__input-label {
    display: block;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #2f73ea;
    margin-bottom: 20px;
  }

  &__search-input {
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

  &__base-cap {
    width: 100%;
    border: 2px solid #e5e7e9;
    box-sizing: border-box;
    height: 512px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__base-cap-text {
    font-weight: normal;
    font-size: 38px;
    line-height: 140%;
    color: #e5e7e9;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<!-- table styles -->
<style lang="scss">
.search {
  &__search-results {
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
        padding: 32px 0px;
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
      }
    }
  }
}
</style>