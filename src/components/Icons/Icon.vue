<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    v-html="types[iconType]"
  >
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    iconType: {
      type: String,
      default: 'file'
    }
  },
  data: () => ({
    types: {
      file:
        `<path d="M6 22H18C19.1046 22 20 21.1046 20 20V9.82843C20 9.29799 19.7893 8.78929 19.4142 8.41421L13.5858 2.58579C13.2107 2.21071 12.702 2 12.1716 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13 2.5V9H19" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8 17H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8 13H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M8 9H9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
      link:
        `<path d="M17 2H22V7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M13 11L21.5 2.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
      folderClose:
        `<path d="M4 21H20C21.1046 21 22 20.1046 22 19V8C22 6.89543 21.1046 6 20 6H11L9.29687 3.4453C9.1114 3.1671 8.79917 3 8.46482 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
      folderOpen:
        `<path d="M4 21H20C21.1046 21 22 20.1046 22 19V8C22 6.89543 21.1046 6 20 6H11L9.29687 3.4453C9.1114 3.1671 8.79917 3 8.46482 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M12 10V16M9 13H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>`
    }
  })
}
</script>

<style scoped>
.icon {
  stroke: black;
}

</style>
