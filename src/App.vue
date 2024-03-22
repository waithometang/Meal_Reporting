<template>
  <div id="app">
    <alert v-if="ShowConfirm"></alert>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>
<script>
import alert from "@/Pages/alert"
export default {
  components: {
    alert
  },
  computed: {
    ShowConfirm () {
      return this.$store.state.ShowConfirm
    }
  },
  name: "App",
  mounted() {
    setTimeout(() => {
      document.body.removeChild(document.getElementById("Loading"));
    }, 1000);
  }
};
</script>

<style>
body {
  margin: 0;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
