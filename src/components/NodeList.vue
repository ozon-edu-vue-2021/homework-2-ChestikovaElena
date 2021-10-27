<template>
  <div class="node-list-wrapper">
    <div
      @click="toggle(list.name)"
      :class="['node-list-title', {
        'node-list-title_disabled': isDisabled
      }]"
    >
      <icon v-if="!isOpened" iconType="folderOpen" />
      <icon v-if="isOpened" iconType="folderClose" />
      <span class="node-list-name">
        {{ list.name }}
      </span>
    </div>
    <ul
      v-if="isShowList"
      class="node-list"
    >
      <li
        v-for="(node, i) in list.contents"
        :key="`${node.type}-${i}`"
        @click="selectHandler(node, list.name, nesting, $event.target)"
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
import Icon from './Icons/Icon.vue';
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
    },
    isShowList() {
      return this.isOpened && this.list.contents && this.list.contents.length
    }
  },
  components: {
    NodeItem,
    Icon
  },
  methods: {
    toggle(parentName) {
      if (this.nesting <= MAX_NESTING) {
        this.isOpened = !this.isOpened;
      } else {
        console.warn("Превышен допустимый уровень вложенности")
      }

      if ((!this.isOpened && this.selectedItem.parentName === parentName) || 
        (!this.isOpened && (this.selectedItem.parentNesting > this.nesting))) {
          this.$emit('selected', {})
      }
    },
    selectHandler(node, parentName, nesting, eventTarget) {
      if (node.type !== 'directory') {
        if (this.selectedItem && this.selectedItem.node !== node) {
          this.$emit('selected', { node, parentName, nesting, eventTarget });
        } else {
          this.$emit('selected', {})
        }
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
