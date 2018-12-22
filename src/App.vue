<template>
  <div>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer'
export default {
  components: {
    Footer
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
