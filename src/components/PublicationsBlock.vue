<template>
  <div class="publications-block" :class="classes">
    <div class="publications-block__left">
      <span class="publications-block__year-label">Публикации</span>
      <div
        v-for="(item, index) in sortedArr1"
        :key="index"
        class="publications-block__mounthCard"
      >
        <div class="publications-block__mounthCard-main">
          <div class="publications-block__mounthCard-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#F0F0F0" />
              <path
                opacity="0.15"
                d="M14.4043 31.7641L13 33.8815C13 33.8815 13.4681 36.0576 23.8245 35.9988C34.1809 35.94 35 33.8815 35 33.8815L33.0691 31.0583L27.1596 27L14.4043 31.7641Z"
                fill="black"
              />
              <path
                d="M46 22.6321L26.6223 31L3 22.6321L24.6538 13L35.2832 17.7962L35.664 17.9684L46 22.6321Z"
                fill="#2F73EA"
              />
              <path
                d="M14.6383 23.2839L13 34C13 34 24.7606 29.9027 35 34L33.4787 22.6536C33.4787 22.6536 19.7287 20.8255 14.6383 23.2839Z"
                fill="#2F73EA"
              />
            </svg>
          </div>
          <div class="publications-block__mounthCard-name">{{ item.name }}</div>
        </div>

        <div class="publications-block__mounthCard-date">{{ item.date }}</div>
      </div>

      <span class="publications-block__show-all" style="cursor: pointer;" @click="showAll">
        {{ showBtn }}
      </span>
    </div>

    <div class="publications-block__right">
      <div class="publications-block__select-year">
        <button
          v-for="(item, index) in yearsList"
          :key="index"
          :class="`publications-block__select-btn publications-block__select-btn--${
            selectedYear === item ? 'active' : 'inactive'
          }`"
          @click="() => handleSelectYear(item)"
        >
          {{ item }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicationsBlock",

  props: {
    publications: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      dateNow: new Date(),
      selectedYear: null,
      yearsList: [],
      sortedArr: [],
      showBtn: "Показать все",
      isShow: false,
    };
  },

  computed: {
    sortedArr1() {
      if (this.isShow) return this.sortedArr;
      else return this.sortedArr.slice(0, 2);
    },
    classes() {
      const prefix = "publications-block";

      return {
        [`${prefix}--is-open`]: this.isShow,
      };
    },
  },

  methods: {
    handleSelectYear(year) {
      this.selectedYear = year;

      this.sortedArr = this.publications.filter(
        (item) => new Date(item.date).getFullYear() === this.selectedYear
      );
    },
    showAll() {
      if (this.isShow) {
        this.showBtn = "Показать все";
        this.isShow = false;
      } else {
        this.showBtn = "Скрыть все";
        this.isShow = true;
      }
    },
  },

  mounted() {
    const year = this.dateNow.getFullYear();
    this.selectedYear = year;
    this.yearsList = [year, year - 1, year - 2];
    this.sortedArr = this.publications.filter(
      (item) => new Date(item.date).getFullYear() === this.selectedYear
    );
  },
};
</script>

<style lang="scss" scoped>
.publications-block {
  display: flex;

  &__left {
    position: relative;
    width: 100%;
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__select-btn {
    display: block;
    border: 2px solid #2f73ea;
    padding: 10px 30px;
    box-sizing: border-box;
    outline: none;
    background-color: transparent;
    margin-bottom: 15px;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
    color: #2f73ea;
    transition: all 0.35s ease;

    &--active {
      background-color: #2f73ea !important;
      color: #ffffff;
    }

    &:hover {
      background-color: rgba(#2f73ea, 0.8);
      color: #ffffff;
    }

    &:last-child {
      margin-bottom: 0px;
    }
  }

  &__mounthCard-main {
    display: flex;
    align-items: center;
  }

  &__mounthCard-icon {
    position: relative;
    display: block;
    margin-right: 20px;

    &:after {
      position: absolute;
      left: 24px;
      top: -32px;
      width: 1px;
      height: 28px;
      background: #7c8793;
      content: "";
    }

    &:before {
      position: absolute;
      left: 24px;
      bottom: -32px;
      width: 1px;
      height: 28px;
      background: #7c8793;
      content: "";
    }
  }

  &__mounthCard-name {
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    color: #2f73ea;
  }

  &__mounthCard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0px;
    }
  }

  &__mounthCard-name {
    max-width: 560px;
  }

  &__mounthCard-date {
    font-size: 16px;
    line-height: 140%;
    color: rgba(124, 135, 147, 0.7);
  }

  &__year-label {
    position: relative;
    display: block;
    margin-bottom: 15px;
    font-size: 18px;
    line-height: 140%;
    text-align: left;
    color: #7c8793;

    &:after {
      position: absolute;
      top: 13px;
      right: -5px;
      height: 1px;
      width: calc(100% - 115px);
      background: #7c8793;
      content: "";
    }
  }

  &__show-all {
    position: relative;
    display: block;
    margin-top: 15px;
    font-size: 18px;
    line-height: 140%;
    color: #2f73ea;

    &:after {
      position: absolute;
      top: 13px;
      right: -5px;
      height: 1px;
      width: calc(100% - 115px);
      background: #7c8793;
      content: "";
    }
  }
}
</style>