<template>
  <div class="edit" contenteditable="true">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.edit {
  padding: 18px 22px;

  color: red;

  font-size: 14px;
  line-height: 28px;
  background-color: #888;
}
</style>