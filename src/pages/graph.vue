<template>
  <Loading :times="300" v-if="!is_show" />
    <div id="graph" v-else>
        <h1>Публикационная активность</h1>
        <h3>Всего работ: {{allPublications}}</h3>
        <div class="main_container">
            <div class="graph_container">
                <div class="graphChart" v-if="showGraph">
                    <Chart v-if="def.type !== 'line'"
                            :def="def"
                            :data="data"
                    ></Chart>

                    <div class="graphChartLine" v-else>
                        <div class="random">
                            <trend-chart :datasets="datasets" :grid="grid" :labels="labels" :min="0" :interactive="true" class="random-chart"></trend-chart>
                            <div id="pop" role="tooltip" ref="tooltip" class="tooltip" :class="{'is-active': tooltipData}">
                                <div class="tooltip-container" v-if="tooltipData">
                                    <strong>{{labels.xLabels[tooltipData.index]}}</strong>
                                    <div class="tooltip-data">
                                        <div class="tooltip-data-item tooltip-data-item--1">{{tooltipData.data[0]}}</div>
                                        <div class="tooltip-data-item tooltip-data-item--2">{{tooltipData.data[1]}}</div>
                                        <div class="tooltip-data-item tooltip-data-item--3">{{tooltipData.data[2]}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="graph" v-else>
                    <div class="graph_disable_text">
                        Укажите подразделения и параметры графика
                    </div>
                </div>
            </div>

            <FilterComponent @typechart="chartType" @filter_full_data="set_new_types" :filterMas="filter"></FilterComponent>
        </div>
    </div>
</template>

<script>
    import FilterComponent from '../components/FilterComponent';
    import Chart from 'vue-chartless';
    import TrendChart from "vue-trend-chart";
    import http from "@/services/httpService";
    import Loading from "@/components/Loading";

    export default {
        name: "graph",
        data() {
            return {
              is_show: false,

                allPublications: 0,
                showGraph: true,
                filter: {
                    page: 'graph',
                    types_of_publication: ['Журнал', 'Монография, изданная зарубежными издательствами (наличие ISBN)', 'Научная конференция с очным участием (с публикацией сборника в РИНЦ)', 'Научные материалы', 'Обзор', 'Сборник статей, трудов', 'Статья', 'Издательство1', 'Статья1', 'Тестовое имя1', 'Книга'],
                    count_citation: '',
                    unit_types_of_publication: ['В и СР', 'Военный учебный центр', 'Институт непрерывного образования', 'Институт физической культуры и спорта', 'Институт экономики и управления', 'Кафедра "Автоматика и телемеханика"', 'Кафедра "Английский язык"', 'Кафедра "Внутренние болезни"', 'Кафедра "Государственно-правовые дисциплины"', 'Кафедра "Зоология и экология"', 'Кафедра "Общая психология"', 'Кафедра "Правосудие"'],
                },

                def: {
                    type: 'pie'
                },
                data: [
                    // {label: 'London', value: '330'},
                    // {label: 'Barcelona', value: '430'},
                    // {label: 'Paris', value: '150'},
                    // {label: 'London13', value: '330'},
                ],

                // line graph
                datasets: [
                    {
                        data: [70, 100, 400, 180, 100, 300, 500],
                        smooth: true,
                        showPoints: true,
                        fill: true,
                        className: "curve1"
                    },
                    {
                        data: [150, 300, 350, 100, 350, 100, 15],
                        smooth: true,
                        showPoints: true,
                        className: "curve2"
                    },
                    {
                        data: [50, 150, 200, 50, 120, 250, 200],
                        smooth: true,
                        showPoints: true,
                        className: "curve3"
                    }
                ],
                grid: {
                    verticalLines: true,
                    horizontalLines: true
                },
                labels: {
                    xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    yLabels: 5,
                    yLabelsTextFormatter: val => Math.round(val * 100) / 100
                },
                tooltipData: null,
                popper: null,
                popperIsActive: true
            }
        },

        beforeCreate() {


        },

        created() {
          http.post('api/api.php', {
            module: 'graph'
          }).then(response => {
            this.data = response.data.graph.map(g => {
              return {
                label: g.type,
                value: g.cn
              }
            });
            this.is_show = true;
          });
        },

        watch: {

        },

        methods: {
          set_new_types(data) {
            http.post('api/api.php', {
              module: 'graph',
              start: data.date_first.slice(0, 4),
              end: data.date_second.slice(0, 4),
              type: data.types.map(t => t.id)
            }).then(responsse => {
              this.data = responsse.data.graph.map(g => {
                return {
                  label: g.type,
                  value: g.cn
                }
              });
            });
          },
            chartType(data) {
                this.def.type = data;
                
                console.log(this.def.type);
            },

        },

        components: {
          Loading,
            FilterComponent,
            Chart,
            TrendChart

        }
    }
</script>

<style lang="scss">

    $text_color: #2F73EA;

    .vuec3-chart {
        max-height: 650px !important;

        svg {
            width: 700px;
            height: 650px;
        }
    }

    #graph {
        padding: 70px 120px;

    
        h1 {
            font-size: 38px;
            color: $text_color;
            margin-bottom: 28px;
        }

        h3 {
            font-size: 24px;
            color: $text_color;
            margin-bottom: 24px;
        }

        .main_container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .graph_container {
            width: 1250px;
            display: flex;
            justify-content: center;

            .graph {
                color: #7C8793;
                font-size: 24px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #7C8793;
                width: 100%;
            }

            .graph_disable_text {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .graphChart {
                color: #7C8793;
                font-size: 18px;
                height: 750px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #7C8793;
                width: 100%;
            }

            .graphChartLine {
                width: 90%;
                height: 90%;

                .curve {
                   /* path:nth-child(1) {
                        fill: rgba(79, 134, 234, 0.31);
                    }*/
                }
            }

            .random {
                width: 100%;
                .vtc {
                    height: 500px;
                    font-size: 12px;
                    @media (min-width: 699px) {
                        height: 650px;
                    }
                }
                .labels {
                    stroke: rgba(0, 0, 0, 0.05);
                }
                .active-line {
                    stroke: rgba(0, 0, 0, 0.2);
                }
                .point {
                    stroke-width: 2;
                    transition: stroke-width 0.2s;
                }
                .point.is-active {
                    stroke-width: 5;
                }
                .curve1 {
                    .stroke {
                        stroke: #fbac91;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #fbac91;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #fbac91;
                        stroke: #fbac91;
                    }
                }
                .curve2 {
                    .stroke {
                        stroke: #fbe1b6;
                        stroke-width: 2;
                    }
                    .point {
                        fill: #fbe1b6;
                        stroke: #fbe1b6;
                    }
                }
                .curve3 {
                    .stroke {
                        stroke: #7fdfd4;
                        stroke-width: 2;
                    }
                    .point {
                        fill: #7fdfd4;
                        stroke: #7fdfd4;
                    }
                }
                .curve4 {
                    .stroke {
                        stroke: #fbf2a3;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #fbf2a3;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #fbf2a3;
                        stroke: #fbf2a3;
                    }
                }
                .curve5 {
                    .stroke {
                        stroke: #cefb9e;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #cefb9e;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #cefb9e;
                        stroke: #cefb9e;
                    }
                }
                .curve6 {
                    .stroke {
                        stroke: #a0fb84;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #a0fb84;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #a0fb84;
                        stroke: #a0fb84;
                    }
                }
                .curve7 {
                    .stroke {
                        stroke: #69fbbe;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #69fbbe;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #69fbbe;
                        stroke: #69fbbe;
                    }
                }
                .curve8 {
                    .stroke {
                        stroke: #67fbd3;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #67fbd3;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #67fbd3;
                        stroke: #67fbd3;
                    }
                }
                .curve9 {
                    .stroke {
                        stroke: #57e5fb;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #57e5fb;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #57e5fb;
                        stroke: #57e5fb;
                    }
                }
                .curve10 {
                    .stroke {
                        stroke: #78a7fb;
                        stroke-width: 2;
                    }
                    .fill {
                        fill: #78a7fb;
                        opacity: 0.05;
                    }
                    .point {
                        fill: #78a7fb;
                        stroke: #78a7fb;
                    }
                }

                .tooltip {
                    &:not(.is-active) {
                        display: none;
                    }
                    padding: 10px;
                    background: #fff;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                    pointer-events: none;
                    &-data {
                        display: flex;
                        &-item {
                            display: flex;
                            align-items: center;
                            &:not(:first-child) {
                                margin-left: 20px;
                            }
                            &:before {
                                content: "";
                                display: block;
                                width: 15px;
                                height: 15px;
                                margin-right: 5px;
                            }
                            &--1:before {
                                background: #fbac91;
                            }
                            &--2:before {
                                background: #fbe1b6;
                            }
                            &--3:before {
                                background: #7fdfd4;
                            }
                        }
                    }
                }
            }
        }
    }

</style>