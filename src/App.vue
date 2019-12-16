<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    import axios from "./axios";
export default {
  name: 'App',
    mounted:function(){
        console.log(this.GLOBAL.domainUrl);
        axios.egGet({ data: 1 }, { id: 1 }, this.GLOBAL.domainUrl).then(response => {
            console.log(response);
        });
    }

}
</script>

<style>

</style>
