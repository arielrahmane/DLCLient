<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left back-link="atrás"></f7-nav-left>
      <div class="title">Data Nodo {{selectedNode.nodeID}}</div>
    </f7-navbar>

    <f7-swiper pagination scrollbar class="node-data-swiper">
      <f7-swiper-slide>
        <f7-block>
        <f7-block-title>Sensor A</f7-block-title>
          <f7-col>
            <f7-row class="text-align-center">
              <f7-gauge
                type="circle"
                :value="nodeData.tempA/50"
                :value-text="(nodeData.tempA) ? nodeData.tempA + '°C' : 'Error'"
                value-text-color="#e44d4d"
                border-color="#e44d4d"
                label-text="Temperatura"
                :label-font-weight="700"
                label-font-size="16"
              ></f7-gauge>
            </f7-row>
            <f7-row class="text-align-center">
              <f7-gauge
                type="circle"
                :value="nodeData.humidA/100"
                :value-text="(nodeData.humidA) ? nodeData.humidA + '%' : 'Error'"
                value-text-color="#3134e9"
                border-color="#3134e9"
                label-text="Humedad Relativa"
                :label-font-weight="700"
                label-font-size="16"
              ></f7-gauge>
            </f7-row>
          </f7-col>
        </f7-block>
      </f7-swiper-slide>

      <f7-swiper-slide>
        <f7-block-title>Sensor B</f7-block-title>
        <f7-block>
          <f7-col>
            <f7-row class="text-align-center">
              <f7-gauge
                type="circle"
                :value="nodeData.tempB/50"
                :value-text="(nodeData.tempB) ? nodeData.tempB + '°C' : 'Error'"
                value-text-color="#e44d4d"
                border-color="#e44d4d"
                label-text="Temperatura"
                :label-font-weight="700"
                label-font-size="16"
              ></f7-gauge>
            </f7-row>
            <f7-row class="text-align-center">
              <f7-gauge
                type="circle"
                :value="nodeData.humidB/100"
                :value-text="(nodeData.humidB) ? nodeData.humidB + '%' : 'Error'"
                value-text-color="#3134e9"
                border-color="#3134e9"
                label-text="Humedad Relativa"
                :label-font-weight="700"
                label-font-size="16"
              ></f7-gauge>
            </f7-row>
          </f7-col>
        </f7-block>
      </f7-swiper-slide>

      <f7-swiper-slide>
        <f7-block-title>Sensor C</f7-block-title>
        <f7-block>
          <f7-col>
            <f7-row class="text-align-center">
              <f7-gauge
                type="circle"
                :value="nodeData.tempC/50"
                :value-text="(nodeData.tempC) ? nodeData.tempC + '°C' : 'Error'"
                value-text-color="#e44d4d"
                border-color="#e44d4d"
                label-text="Temperatura"
                :label-font-weight="700"
                label-font-size="16"
              ></f7-gauge>
            </f7-row>
            <f7-row class="text-align-center">
              <f7-gauge
                type="circle"
                :value="nodeData.humidC/100"
                :value-text="(nodeData.humidC) ? nodeData.humidC + '%' : 'Error'"
                value-text-color="#3134e9"
                border-color="#3134e9"
                label-text="Humedad Relativa"
                :label-font-weight="700"
                label-font-size="16"
              ></f7-gauge>
            </f7-row>
          </f7-col>
        </f7-block>
      </f7-swiper-slide>

      <f7-swiper-slide>
        <f7-block-title>Sensor de Gas</f7-block-title>
        <f7-block>
          <f7-row>
            <f7-col class="text-align-center">
              <f7-gauge
                type="circle"
                :value="(nodeData.alcohol/10)"
                :value-text="(nodeData.alcohol) ? (nodeData.alcohol).toFixed(2) + 'mg/L' : 'Error'"
                value-text-color="#2de12d"
                border-color="#2de12d"
                label-text="Concentración Alcohol"
                :label-font-weight="700"
                label-font-size="14"
              ></f7-gauge>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-swiper-slide>
    </f7-swiper>
    
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button raised fill @click="slidePrev()">
            <f7-icon f7="chevron_left"></f7-icon>
          </f7-button>
        </f7-col>
        <f7-col>
          <f7-button raised fill @click="$f7router.navigate('/nodes/node/history')">Ver Historial</f7-button>
        </f7-col>
        <f7-col>
          <f7-button raised fill @click="slideNext()">
            <f7-icon f7="chevron_right"></f7-icon>
          </f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

  </f7-page>
</template>

<script>
  import { f7Page, f7Navbar, f7NavLeft, f7BlockTitle, f7Block, f7List, f7ListItem, f7Icon, 
          f7Button, f7Gauge, f7Row, f7Col, f7Swiper, f7SwiperSlide } from 'framework7-vue';
  import {get} from '../helpers/api';
  import {getSelectedNode} from '../helpers/globalVar';
  import testChart from '../components/charts/test';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7NavLeft,
      f7BlockTitle,
      f7Block,
      f7List,
      f7ListItem,
      f7Icon,
      f7Button,
      f7Gauge,
      f7Row, 
      f7Col,
      f7Swiper, 
      f7SwiperSlide,
      testChart
    },
    data () {
      return {
        nodeData: {
          tempA: 0.0,
          tempB: 0.0,
          tempC: 0.0,
          humidA: 0.0,
          humidB: 0.0,
          humidC: 0.0,
          alcohol: 0.0,
          date: "",
          time: ""
        },
        selectedNode: {},
        datacollection: null,
        testData: []
      }
    },
    beforeMount () {

    },
    mounted () {
      this.selectedNode = getSelectedNode();
      this.getLatestData(this.selectedNode.nodeID);
      console.log("Node data mounted");
    },
    created () {
      console.log("Node data created");
    },
    breforeDestroy () {
      console.log("Node data destroyed");
    },
    computed: {

    },
    methods: {
      getLatestData: function (node) {
        var self = this;
        self.$f7.dialog.preloader('Cargando Datos');
        var source = "nodes/" + String(node);
        get(
          source, 
          response => {
            self.$f7.dialog.close();
            this.nodeData.tempA = response.data.tempA;
            this.nodeData.tempB = response.data.tempB;
            this.nodeData.tempC = response.data.tempC;
            this.nodeData.humidA = response.data.humidA;
            this.nodeData.humidB = response.data.humidB;
            this.nodeData.humidC = response.data.humidC;
            this.nodeData.alcohol = response.data.alcohol;
            var createdAt = response.data.createdAt;
            this.nodeData.date = createdAt.slice(0, 10);
            this.nodeData.time = createdAt.slice(11, 19);
          },
          error => {
            self.$f7.dialog.close();
            console.log("Error al hacer http request: ", error);
          }
        )
      },
      print: function(value, text) {
        return String(value) + text;
      },
      isActive: function(value) {
        if (value) return "Activo";
        else return "Inactivo";
      },
      slideNext: function() {
        this.$f7.swiper.get('.node-data-swiper').slideNext();
      },
      slidePrev: function() {
        this.$f7.swiper.get('.node-data-swiper').slidePrev();
      }
    }
  };
</script>