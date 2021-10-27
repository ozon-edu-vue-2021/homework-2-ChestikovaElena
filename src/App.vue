<template>
  <div id="app">
    <h1 class="title">Дерево файлов</h1>
    <p class="path">
      {{ `Полный путь к выделенному файлу/ссылке: ${path}` }}
    </p>
    <div class="tree-wrapper">
      <node-list
        :list="tree"
        :selectedItem="selectedItem"
        :nesting=0
        @selected="updateSelectedItem"
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
    tree,
    selectedItem: {},
    eventTarget: null
  }),
  computed: {
    path() {
      let fullPath = '';
      if (this.eventTarget) {
        fullPath = `${this.eventTarget.textContent}`;
        let element = this.eventTarget;
        while (element && element.closest('ul')) {
          const parentElement = element.closest('ul').previousElementSibling;
          fullPath = `${parentElement.lastChild.textContent}/${fullPath}`;
          element = parentElement;
        }
        
      }
      return fullPath;
    }
  },
  components: {
    NodeList
  },
  methods: {
    updateSelectedItem(payload) {
      if ((Object.keys(payload).length == 0) || (payload && payload.node && payload.node.type !== 'directory')) {
        this.selectedItem = {
          node: payload.node,
          parentName: payload.parentName,
          parentNesting: payload.nesting,
        };
      }
      
      this.eventTarget = payload.eventTarget;
    }
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

.path {
  text-align: left;
}

.tree-wrapper {
  text-align: left;
}
</style>
