<template>
  <div
    :class="['node-wrapper', {
        'node-wrapper_selected': isSelected
      }]"
    @click="selectHandler"
  >
    <icon-file v-if="node.type === 'file'" />
    <icon-link v-if="node.type === 'link'" />
    <span class="node-label">{{ node.name }}</span>
  </div>
</template>

<script>
import IconFile from './Icons/IconFile.vue';
import IconLink from './Icons/IconLink.vue';

export default {
  name: 'NodeItem',
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isSelected: false,
  }),
  components: {
    IconFile,
    IconLink
  },
  methods: {
    selectHandler() {
      this.isSelected = !this.isSelected;
    }
  }
}
</script>

<style scoped>
.node-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.node-wrapper:hover,
.node-wrapper_selected {
  color: blue;
}

.node-wrapper:hover svg,
.node-wrapper_selected svg {
  stroke: blue;
}

.node-label {
  padding-left: 10px;
  padding: 10px 0 10px 10px;
}
</style>
