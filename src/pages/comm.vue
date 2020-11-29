<template>
  <Loading v-if="!is_show" />
    <div v-else class="commercialization">
        <h1>{{title}}</h1>
        
        <div class="containerM">
            <div class="containerM_info">Тематика исследования:</div>
            <div class="containerM_content">{{theme}}</div>
        </div>

        <div class="containerM">
            <div class="containerM_info">Дата публикации:</div>
            <div class="containerM_content">{{date}}</div>
        </div>

        <div class="main__table">
            <div class="headerTable">
                <div class="item" v-for="(item, i) in table.fields" :key="'table_h_' + i">{{item.label}}</div>
            </div>
            <div class="contentTable">
                <div class="row" v-for="(item, i) in table.items" :key="'table_r_' + i" style="cursor: default;">
                    <div class="item">{{item.number}}</div>
                    <div class="item">{{removeTitle(item.title)}}</div>
                    <div class="item">{{removeTitle(item.address)}}</div>
                    <div class="item">{{item.tel}}</div>
                    <div class="item">{{item.email}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import http from "@/services/httpService";
import Loading from "@/components/Loading";

    export default {
        name: "comm",
      props: ['id'],
        data() {
            return {
              is_show: false,
                title: 'Semisupervised learning in pattern',
                theme: 'BigData',
                date: '20.20.19',

                table: {
                    fields: [
                        { key: "number", label: "№" },
                        { key: "title", label: "Название" },
                        { key: "address", label: "Адрес" },
                        { key: "tel", label: "Телефон"},
                        { key: "email", label: "Email"},
                    ],

                    items: [
                        // {
                        //     number: 1,
                        //     title: 'Производственная компания «Новочеркасский электровозостроительный завод» (ПК «НЭВЗ»)',
                        //     address: '344064, Россия, Ростовская область, г. Ростов-на-Дону, ул. Вавилова, 68/1',
                        //     tel: '22-99-24',
                        //     email: 'info@fdpro.com',
                        // },
                        // {
                        //     number: 2,
                        //     title: 'Производственная компания «Новочеркасский электровозостроительный завод» (ПК «НЭВЗ»)',
                        //     address: '344064, Россия, Ростовская область, г. Ростов-на-Дону, ул. Вавилова, 68/1',
                        //     tel: '22-99-24',
                        //     email: 'info@fdpro.com',
                        // },
                        // {
                        //     number: 3,
                        //     title: 'Производственная компания «Новочеркасский электровозостроительный завод» (ПК «НЭВЗ»)',
                        //     address: '344064, Россия, Ростовская область, г. Ростов-на-Дону, ул. Вавилова, 68/1',
                        //     tel: '22-99-24',
                        //     email: 'info@fdpro.com',
                        // },
                        // {
                        //     number: 4,
                        //     title: 'Производственная компания «Новочеркасский электровозостроительный завод» (ПК «НЭВЗ»)',
                        //     address: '344064, Россия, Ростовская область, г. Ростов-на-Дону, ул. Вавилова, 68/1',
                        //     tel: '22-99-24',
                        //     email: 'info@fdpro.com',
                        // }
                    ],
                },
            }
        },

        beforeCreate() {

        },

        created() {
          http.post('/api/api.php', {
            module: 'get_offers',
            id: this.id
          }).then(response => {
            this.title = response.data.article.title;
            this.theme = response.data.article.theme;
            this.date = response.data.article.date;
            let number = 1;
            this.table.items = response.data.offers.map(o => {
              return {
                number: number++,
                title: o.name,
                address: o.address,
                tel: o.tel,
                email: o.email
              }
            });
            this.is_show = true;
          });
        },

        methods: {
            removeTitle(title) {
                if (title.length > 50) {
                    return (title.substr(0, 100) + '...')
                } else {
                    return title
                }

            },
        },

        components: {
          Loading

        }
    }
</script>

<style scoped lang="scss">
    $text_color: #2F73EA;

    .commercialization {
        display: flex;
        flex-direction: column;
        padding: 70px 120px;
    }

    .containerM {
        display: flex;
        flex-direction: row;
        margin-bottom: 16px;

        .containerM_info {
            color: #2F73EA;
            font-size: 22px;
        }

        .containerM_content {
            margin-left: 10px;
            color: #C4C4C4;
            font-size: 22px;
        }
    }

    h1 {
        font-size: 38px;
        color: $text_color;
        margin-bottom: 28px;
    }

    .main__table {
        display: flex;
        flex-direction: column;
        border: 2px solid #E5E7E9;
        margin-top: 10px;
        width: 100%;

    .headerTable {
        height: 88px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: #2F73EA;
        color: white;
        font-size: 20px;
        padding: 0 40px;

    .item:nth-child(1) {
        width: 6%;
    }

    .item:nth-child(2) {
        width: 34%;
        text-align: center;
    }

    .item:nth-child(3) {
        width: 30%;
        text-align: center;
        flex-wrap: wrap;
        word-spacing: 60px;
    }

    .item:nth-child(4) {
        width: 15%;
        text-align: center;
    }

    .item:nth-child(5) {
        width: 15%;
        text-align: center;
    }
    }

    .headerTablePadding {
        padding-right: calc(40px + 18px);
    }

    .contentTable {
        display: flex;
        flex-direction: column;
        font-size: 18px;
        color: #7C8793;

    .row {
        margin: 0;
        padding: 24px 40px;
        align-items: center;
        border-top: 1px solid #E5E7E9;

        .item:nth-child(1) {
            width: 6%;
        }

        .item:nth-child(2) {
            width: 34%;
            text-align: center;
        }

        .item:nth-child(3) {
            width: 30%;
            text-align: center;
            flex-wrap: wrap;
        }

        .item:nth-child(4) {
            width: 15%;
            text-align: center;
        }

        .item:nth-child(5) {
            width: 15%;
            text-align: center;
        }
    }

    .row:nth-child(2n + 1) {
        background-color: rgba(0, 0, 0, 0.05);
    }

    .row:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.09);
    }
    }

    }
</style>