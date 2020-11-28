<template>
  <b-modal v-model="val" modal-class="custom-modal-block">
    <template #modal-header><div></div></template>

    <template #default="{ok}">
      <div class="d-flex flex-column">
        <button @click="ok()" class="close-btn">
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6277 20.7418L31.1129 12.2565L32.9986 14.1422L24.5133 22.6274L32.9986 31.1127L31.1129 32.9983L22.6277 24.5131L14.1424 32.9983L12.2568 31.1127L20.742 22.6274L12.2568 14.1422L14.1424 12.2565L22.6277 20.7418Z" fill="#2F73EA"/>
          </svg>
        </button>
        <div class="head">
          <h2>Создание команды</h2>
        </div>
        <span class="title">Название</span>
        <input type="text" placeholder="Название" v-model="name" />
        <span class="title">Описание</span>
        <textarea placeholder="Описание" v-model="name" ></textarea>
        <span class="title">Темы исследований</span>
        <b-checkbox-group class="d-flex flex-column researching" :class="{active: is_show_all_thees}" v-model="select_theme">
          <b-check v-for="theme in themes" :key="theme.value" :value="theme.value">{{theme.text}}</b-check>
        </b-checkbox-group>
        <span class="title" style="font-size: 16px; cursor: pointer;" @click="is_show_all_thees = !is_show_all_thees">{{is_show_all_thees ? 'Скрыть' : 'Показать все'}}</span>
        <div class="search-authors d-flex flex-column">
          <div class="d-flex select-type">
            <button class="w-50" :class="{active: is_search_manual}" @click="is_search_manual = true">Поиск участников</button>
            <button class="w-50" :class="{active: !is_search_manual}" @click="is_search_manual = false">Сгенерировать команду</button>
          </div>
          <transition name="global" mode="out-in" appear>
            <div class="table-container" :key="is_search_manual">
              <div class="search w-100" v-if="is_search_manual">
                <input type="text" class="w-100" placeholder="Введите  ФИО или ID участника" v-model="search_authors">
                <button>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33366 14.9998C4.65176 14.9998 1.66699 12.0151 1.66699 8.33317C1.66699 4.65127 4.65176 1.6665 8.33366 1.6665C12.0156 1.6665 15.0003 4.65127 15.0003 8.33317C15.0003 9.87376 14.4778 11.2923 13.6002 12.4212L18.0896 16.9106L16.9111 18.0891L12.4217 13.5997C11.2928 14.4773 9.87425 14.9998 8.33366 14.9998ZM13.3337 8.33317C13.3337 11.0946 11.0951 13.3332 8.33366 13.3332C5.57224 13.3332 3.33366 11.0946 3.33366 8.33317C3.33366 5.57175 5.57224 3.33317 8.33366 3.33317C11.0951 3.33317 13.3337 5.57175 13.3337 8.33317Z" fill="#7C8793" fill-opacity="0.5"/>
                  </svg>
                </button>
              </div>
              <div class="search w-100 d-flex" v-else>
                <span class="mr-2" style="color: #7C8793;">Кол-во участников: </span>
                <input type="text" style="width: 60px; padding: 0;" v-model="count_authors" />
              </div>
              <table class="text-center w-100" v-if="search_table_users.length > 0">
                <tr>
                  <th>№</th>
                  <th>ФИО</th>
                  <th>Рейтинг</th>
                  <th></th>
                </tr>
                <tr v-for="(user, index) in search_table_users" :key="user.id">
                  <td>{{index+1}}</td>
                  <td class="text-left">{{user.name}}</td>
                  <td>{{user.rating}}</td>
                  <td>
                    <button @click="add_command(user)">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 5.5H11V6.5H6.5V11H5.5V6.5H1V5.5H5.5V1H6.5V5.5Z" fill="#0094FF"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </table>
              <span class="title text-right" style="font-size: 12px; cursor: pointer; display: block; margin-top: 10px;"
                    v-if="!is_include_current_author"
                    @click="add_current_author">Добавить меня</span>
            </div>
          </transition>
        </div>
        <div class="search-authors result d-flex flex-column">
          <div class="table-container">
            <span class="title" style="font-size: 16px; margin-bottom: 8px; display: inline-block">Итоговая команда:</span>
            <table class="text-center w-100" v-if="result_command.length > 0">
              <tr>
                <th>№</th>
                <th>ФИО</th>
                <th>Рейтинг</th>
                <th></th>
              </tr>
              <tr v-for="(user, index) in result_command" :key="user.id">
                <td>{{index+1}}</td>
                <td class="text-left">{{user.name}}</td>
                <td>{{user.rating}}</td>
                <td>
                  <button @click="remove_command(user)">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 5.5V6.5H1V5.5H11Z" fill="#FF0000"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <button class="create-command mx-auto" @click="send">Создать команду</button>
      </div>
    </template>

    <template #modal-footer><div></div></template>
  </b-modal>
</template>

<script>
export default {
  name: "ModalCreateCommand",
  props: ['value'],
  data: function () {
    return {
      name: '',
      themes: [
        {text: 'Транспортные системы', value: 1},
        {text: 'Сетевое моделирование', value: 2},
        {text: 'Пространственная эпидемиология', value: 3},
        {text: 'Software', value: 4},
        {text: 'Artificial intellegence', value: 5},
        {text: 'Mathematics', value: 6},
        {text: 'Media and communication', value: 7},
        {text: 'Art', value: 8}
      ],
      select_theme: [],
      is_show_all_thees: false,
      is_search_manual: true,
      search_table_users: [
        {id: 1, name: 'Митрохин Михаил Александрович', rating: 100},
        {id: 2, name: 'Митрохин Михаил Александрович', rating: 96},
        {id: 3, name: 'Митрохин Михаил Александрович', rating: 82}
      ],
      result_command: [
        {id: 4, name: 'Митрохин Михаил Александрович', rating: 72},
        {id: 5, name: 'Митрохин Михаил Александрович', rating: 68},
        {id: 6, name: 'Митрохин Михаил Александрович', rating: 54}
      ],
      count_authors: 0,
      search_authors: '',
      this_author: {id: 9, name: 'Текущий автор', rating: 46},
      is_include_current_author: false
    }
  },
  watch: {
    is_search_manual: function () {
      this.is_include_current_author =
          !(this.search_table_users.findIndex(s => s.id === this.this_author.id) === -1 &&
          this.result_command.findIndex(s => s.id === this.this_author.id) === -1);
    }
  },
  methods: {
    add_current_author() {
      if (this.is_include_current_author)
        return;
      this.is_include_current_author = true;
      this.search_table_users.push(this.this_author);
    },
    send: function () {
      this.$emit('send', {
        name: this.name,
        select_theme: this.select_theme,
        result_command: this.result_command
      });
      this.$emit('input', false);
    },
    add_command: function (user) {
      let index = this.search_table_users.findIndex(u => u.id === user.id);
      if (index !== -1)
        this.search_table_users.splice(index, 1);
      this.result_command.push(user);
    },
    remove_command: function (user) {
      let index = this.result_command.findIndex(u => u.id === user.id);
      if (index !== -1)
        this.result_command.splice(index, 1);
      this.search_table_users.push(user);
    }
  },
  computed: {
    val: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>

<style lang="scss">
.custom-modal-block .modal-dialog {
  width: 640px;
  max-width: 640px;
  background: #F9F9FA;
  border: 2px solid #E5E7E9;
  border-radius: 0;

  .global-enter-active, .global-leave-active {
    transition: opacity .3s ease;
  }

  .global-enter, .global-leave-to
    /* .component-fade-leave-active до версии 2.1.8 */
  {
    opacity: 0 !important;
  }

  .modal-content {
    border-radius: 0;
    background: inherit;

    .modal-header, .modal-footer {
      border: 0;
      display: none;
    }

    .modal-body {
      position: relative;
      padding: 20px;

      button {
        transition: opacity 0.2s ease, background 0.2s ease, border 0.2s ease;
        outline: none;
      }

      .close-btn {
        border: 0;
        padding: 0;
        position: absolute;
        top: 5px;
        right: 5px;
        background: inherit;
        outline: none;
      }

      .head h2 {
        font-size: 24px;
        color: #2F73EA;
        text-align: center;
      }

      .title {
        color: #2F73EA;
        font-size: 18px;
      }

      input, textarea {
        border: 1px solid #E5E7E9;
        padding: 0.2rem;
      }

      label {
        cursor: pointer;
      }

      .researching {
        color: #2F73EA;
        font-size: 16px;
        max-height: 170px;
        overflow: hidden;
        padding-left: 5px;

        > div {
          margin: 2px 0;
        }
      }

      .researching.active {
        overflow-y: auto;
      }

      .search-authors {
        margin-bottom: 16px;

        .select-type button {
          border: 1px solid #F9F9FA;
          font-size: 16px;
          color: #2F73EA;
          padding: 12px;
          background: #F9F9FA;
          opacity: 0.7;
        }

        .select-type button.active {
          background: #FFFFFF;
          border-color: #E5E7E9;
          opacity: 1;
        }

        .table-container {
          background-color: white;
          border: 1px solid #E5E7E9;
          padding: 20px;

          .search {
            margin-bottom: 8px;
            position: relative;

            button {
              position: absolute;
              border: 0;
              right: 0;
              top: 0;
              background: inherit;
              height: 100%;
              padding: 0 10px;
            }

            input {
              padding-right: 30px;
            }
          }

          table {
            border: 1px solid #E5E7E9;
            border-bottom: 0;

            th {
              background: rgba(47, 115, 234, 0.15);
            }

            th, td {
              color: rgba(124, 135, 147, 0.9);
              padding: 5px 9px;
              border-bottom: 1px solid #E5E7E9; ;
            }

            button {
              padding: 5px;
              border: 0;
              font-size: 12px;
              background: inherit;
            }
          }
        }
      }

      .search-authors.result {
        .table-container {
          background: inherit;
          border-color: #F9F9FA;
        }
      }

      button.create-command {
        width: 164px;
        padding: 9px 0;
        border: 0;
        background: #2F73EA;
        color: white;
      }

      button:hover {
        opacity: 0.8;
      }

      button:active {
        opacity: 0.7;
      }
    }
  }
}
</style>