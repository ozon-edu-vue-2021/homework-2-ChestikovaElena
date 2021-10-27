<template>
  <div class="node-list-wrapper">
    <div
      @click="toggle(list.name)"
      :class="['node-list-title', {
        'node-list-title_disabled': isDisabled
      }]"
    >
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
        @click="selectHandler(node, list.name)"
      >
        <node-list
          v-if="node.type === 'directory'"
          :list="node"
          :nesting="nesting + 1"
          @selected="(payload) => $emit('selected', payload)"
          :selectedItem = "selectedItem"
        />
        <node-item
          v-else
          :node="node"
          :selectedItem = "selectedItem"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import NodeItem from './NodeItem.vue';
import IconFolderClose from './Icons/IconFolderClose.vue';
import IconFolderOpen from './Icons/IconFolderOpen.vue';
import { MAX_NESTING } from '../utils/constants.js';

export default {
  name: 'NodeList',
  props: {
    list: {
      type: Object,
      default: () => ({})
    },
    selectedItem: {
      type: Object,
      default: () => ({})
    },
    nesting: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    isOpened: false,
  }),
  computed: {
    isDisabled() {
      return this.nesting > MAX_NESTING
    }
  },
  components: {
    NodeItem,
    IconFolderClose,
    IconFolderOpen
  },
  methods: {
    toggle(parentName) {
      if (this.nesting <= MAX_NESTING) {
        this.isOpened = !this.isOpened;
      } else {
        console.warn("Превышен допустимый уровень вложенности")
      }
      if (!this.isOpened && this.selectedItem.parentName === parentName) {
        this.$emit('selected', {}, '')
      }
    },
    selectHandler(node, parentName) {
      if (node.type !== 'directory') {
        this.$emit('selected', { node, parentName });
      }
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

.node-list-title_disabled {
  color: grey
}

.node-list-title_disabled:hover {
  color: grey
}

.node-list-title_disabled svg {
  stroke: grey
}

.node-list-title_disabled:hover svg {
  stroke: grey
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
