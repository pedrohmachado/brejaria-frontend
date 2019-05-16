<template>
  <div class="hello">
    <h1>{{ titulo }}</h1>
    <p>{{ msg }}</p>

    
  </div>
</template>

<script>
export default {
  name: "helloWorld",
  props: {
    titulo: String,
    msg: String
  },
  data() {
    return {
      
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
