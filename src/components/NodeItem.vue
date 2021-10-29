<template>
  <div
    :class="['node-wrapper', {
        'node-wrapper_selected': selectedItem && selectedItem.node === node
      }]"
    tabindex=-1
    data-type="item"
  >
    <icon :iconType='node.type' />
    
    <span class="node-label">{{ node.name }}</span>
  </div>
</template>

<script>
import Icon from './Icons/Icon.vue';

export default {
  name: 'NodeItem',
  props: {
    node: {
      type: Object,
      default: () => ({})
    },
    selectedItem: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Icon
  }
}
</script>

<style scoped>
.node-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.node-wrapper:hover > .node-label,
.node-wrapper_selected > .node-label {
  color: blue;
}

.node-wrapper:hover > svg,
.node-wrapper_selected > svg {
  stroke: blue;
}

.node-label {
  padding-left: 10px;
  padding: 10px 0 10px 10px;
}
</style>
