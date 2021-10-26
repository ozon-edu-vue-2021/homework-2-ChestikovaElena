<template>
  <div class="node-list-wrapper">
    <div @click="toggle" class="node-list-title">
      <icon-folder-open v-if="!isOpened"/>
      <icon-folder-close v-if="isOpened"/>
      <span class="node-list-name">
        {{ list.name }}
      </span>
    </div>
    <ul
      v-if="isOpened && list.contents && list.contents.length"
      class="node-list"
    >
      <li
        v-for="(node, i) in list.contents"
        :key="`${node.type}-${i}`"
      >
        <node-list
          v-if="node.type === 'directory'"
          :list="node"
        />
        <node-item
          v-else
          :node="node"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import NodeItem from "./NodeItem.vue";
import IconFolderClose from './Icons/IconFolderClose.vue';
import IconFolderOpen from './Icons/IconFolderOpen.vue';

export default {
  name: 'NodeList',
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isOpened: false
  }),
  components: {
    NodeItem,
    IconFolderClose,
    IconFolderOpen
  },
  methods: {
    toggle() {
      this.isOpened = !this.isOpened;
    }
  }
}
</script>

<style scoped>
.node-list-title {
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0;
  cursor: pointer;
}

.node-list-title:hover {
  color: blue;
}

.node-list-title:hover svg {
  stroke: blue;
}

.node-list-name {
  margin-left: 10px;
}

.node-list {
  display: flex;
  flex-direction: column;
  align-items: start;
  list-style: none;
  margin: 0;
  padding-bottom: 10px;
}
</style>