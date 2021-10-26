<template>
  <div id="app">
    <h1 class="title">Дерево файлов</h1>
      <div class="tree-wrapper">
        <node-list
          :list="tree"
          :nesting=0
        />
    </div>
  </div>
</template>

<script>
import NodeList from "./components/NodeList.vue";
import tree from "../public/static/node_modules.json";

export default {
  name: 'App',
  data: () => ({
    tree
  }),
  components: {
    NodeList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.title {
  text-align: left;
}

.tree-wrapper {
  text-align: left;
}
</style>