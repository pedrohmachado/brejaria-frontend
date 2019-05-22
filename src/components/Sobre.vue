<template>
  <div class="sobre">
    <div class="timeline-info">
      <h1>O que é a Brejaria?</h1>
      <template>
        <v-timeline>
          <v-timeline-item v-for="quadro in quadros" :key="quadro.titulo" color="red lighten-2" large>
            <template v-slot:opposite>
              <span>{{quadro.oposto}}</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="headline">{{quadro.titulo}}</v-card-title>
              <v-card-text>{{quadro.info}}</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quadros: [
        {
          titulo: "Brejaria",
          info: "Facilitando a interação entre produtor e consumidor",
          oposto: "É simples"
        },
        {
          titulo: "Produtores",
          info:
            "Impulsione a divulgação de seus produtos através de eventos, você também terá um portfólio com os seus produtos"
        },
        {
          titulo: "Consumidores",
          info:
            "Conheça e avalie toda a variedade de produtos e seus produtores, você também pode criar e participar de eventos"
        },
        {
          titulo: "Eventos",
          info: "Os eventos são a ponte entre os produtores e consumidores",
          icon: "mdi-calendar-text"
        }
      ]
    };
  }
};
</script>

<style scoped>
.timeline-info {
  width: 100%;
  max-width: 900px;
  margin: auto;
  margin-bottom: 50px !important;
  margin-top: 50px !important;
  padding: 5px;
}
</style>
