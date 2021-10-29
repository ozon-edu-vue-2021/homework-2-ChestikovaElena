<template>
  <div
    class="node-wrapper"
    tabindex=-1
    data-type="list"
    @keydown.enter="enterListHandler"
    @keydown.esc="escListHandler"
    @keydown.down="downListHandler"
    @keydown.up="upListHandler"
  >
    <div
      @click="toggle(list.name)"
      :class="['node-list-title', {
        'node-list-title_disabled': isDisabled
      }]"
      tabindex=-1
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
        @keydown.enter="enterNodeHandler(node, $event)"
        tabindex=-1
        class="node-item"
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
import { findListInElement, findNextSibling, findPreviousSibling } from '../utils/functionForDOM.js';

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
    toggle(parentName, key = null) {
      if (this.nesting <= MAX_NESTING) {
        this.isOpened = key ? false : !this.isOpened;
      } else {
        console.warn("Превышен допустимый уровень вложенности")
      }

      if ((!this.isOpened && this.selectedItem.parentName === parentName) || 
        (!this.isOpened && (this.selectedItem.parentNesting > this.nesting))) {
          this.$emit('selected', {})
      }
    },
    selectHandler(node, parentName, nesting, eventTarget) {
      eventTarget.focus();
      if (node.type !== 'directory') {
        if (this.selectedItem && this.selectedItem.node !== node) {
          this.$emit('selected', { node, parentName, nesting, eventTarget });
        } else {
          this.$emit('selected', {})
        }
      }
    },
    enterListHandler(event) {
      event.stopPropagation();
      const element = event.target;
      if (element.dataset.type && element.dataset.type === 'list') {
        this.toggle(this.list.name);
      }
    },
    enterNodeHandler(node, event) {
      event.stopPropagation();
      const element = event.target;
      if (element.dataset.type && element.dataset.type === 'item') {
        this.selectHandler(node, this.list.name, this.nesting, element);
      }
    },
    escListHandler(event) {
      event.stopPropagation();
      const element = event.target;
      if (element.dataset.type && element.dataset.type === 'list') {
        this.toggle(this.list.name, 'esc');
      }
    },
    downListHandler(event) {
      event.stopPropagation();
      let element = event.target;
      const listInElement = findListInElement(element);
      if (listInElement) {
        listInElement.focus();
      } else {
        let { sibling, isRootElement } = findNextSibling(element);
        if (isRootElement) {
          console.warn('Соседа снизу у элемента нет')
        } else {
          if (sibling) {
            sibling.focus();
          } else {
            while (!sibling) {
              element = element.closest('li').closest('.node-wrapper');
              sibling = findNextSibling(element).sibling;
            }
            sibling.focus();
          }
        }
      }
    },
    upListHandler(event) {
      event.stopPropagation();
      const element = event.target;
      const { sibling, isRootElement } = findPreviousSibling(element);
      if (isRootElement) {
        console.warn('Это корневой элемент');
      } else {
        if (sibling) {
          sibling.focus();
        }
      }
    }
  }
}
</script>

<style>
.node-item:focus-visible > .node-wrapper > .node-label,
.node-wrapper:focus-visible > .node-label,
.node-wrapper:hover > .node-label {
  color: blue;
}

.node-item:focus-visible > .node-wrapper > svg,
.node-wrapper:focus-visible > svg,
.node-wrapper:hover > svg{
  stroke: blue;
}

</style>

<style scoped>
.node-wrapper:focus-visible {
  outline: none;
}

.node-wrapper:focus-visible > .node-list-title,
.node-list-title:hover {
  color: blue;
}

.node-wrapper:focus-visible > .node-list-title > svg,
.node-list-title:hover > svg {
  stroke: blue;
}

.node-list-title {
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0;
  cursor: pointer;
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
