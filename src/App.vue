<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
    mounted:function(){
        console.log(this.GLOBAL.domainUrl);

    }

}
</script>

<style>

</style>
