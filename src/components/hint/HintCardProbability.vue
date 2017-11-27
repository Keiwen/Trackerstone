<template>
    <div class="container">

        <enhanced-toggle labelOn="Single card" labelOff="Double card"
                         styleOn="primary" styleOff="success"
                         v-model="singleCard" :rounded="true" >
        </enhanced-toggle>

        <table>
            <tr>
                <td class="nocell"></td>
                <th>First player</th>
                <th>Second player</th>
            </tr>
            <tr>
                <th>Starting hand</th>
                <td>
                    <span v-if="singleCard">10.0&nbsp;%</span>
                    <span v-else>19.3&nbsp;%</span>
                    <span>(3 cards)</span>
                </td>
                <td>
                    <span v-if="singleCard">13.3&nbsp;%</span>
                    <span v-else>25.3&nbsp;%</span>
                    <span>(4 cards)</span>
                </td>
            </tr>
            <tr>
                <th>Starting hand + draw</th>
                <td>
                    <span v-if="singleCard">13.3&nbsp;%</span>
                    <span v-else>25.3&nbsp;%</span>
                    <span>(4 cards)</span>
                </td>
                <td>
                    <span v-if="singleCard">16.7&nbsp;%</span>
                    <span v-else>31.0&nbsp;%</span>
                    <span>(5 cards)</span>
                </td>
            </tr>
            <tr>
                <th>Full mulligan</th>
                <td>
                    <span v-if="singleCard">20.0&nbsp;%</span>
                    <span v-else>36.6&nbsp;%</span>
                    <span>(6 cards)</span>
                </td>
                <td>
                    <span v-if="singleCard">26.7&nbsp;%</span>
                    <span v-else>46.9&nbsp;%</span>
                    <span>(8 cards)</span>
                </td>
            </tr>
            <tr>
                <th>Full mulligan + draw</th>
                <td>
                    <span v-if="singleCard">23.0&nbsp;%</span>
                    <span v-else>41.3&nbsp;%</span>
                    <span>(7 cards)</span>
                </td>
                <td>
                    <span v-if="singleCard">29.5&nbsp;%</span>
                    <span v-else>51.0&nbsp;%</span>
                    <span>(9 cards)</span>
                </td>
            </tr>
        </table>

    </div>
</template>


<script>
  import { EnhancedToggle } from 'vue-enhanced-check'

  export default {
    components: {EnhancedToggle},
    data () {
      return {
        singleCard: true
      }
    }
  }
</script>

<style lang="scss">
    .enhancedToggle {
        margin: 5px auto;
    }
</style>
