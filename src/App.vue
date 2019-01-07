<template>
  <div>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
  import Footer from './components/Footer/Footer'
export default {

  mounted(){
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getUser')
  },
  components: {
    Footer
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
