<template>
  <div class="m-main-header" @click="setIscollapseAction">
    <i :class="collapseicon"></i>
    <span class="u-collapse">{{ collapsetxt }}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["collapseicon", "collapsetxt"]),
  },
  methods: {
    ...mapActions(["setIscollapseAction"]),
  },
};
</script>

<style lang="less" scoped>
.m-main-header {
  float: left;
}
</style>