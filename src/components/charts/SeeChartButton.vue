<template>
    <router-link :to="{ name: routeName }" class="btn btn-info">
        <icon name="bar-chart" />
        See charts
    </router-link>
</template>


<script>
  export default {
    props: {
      routeName: {
        type: String
      }
    }
  }
</script>
