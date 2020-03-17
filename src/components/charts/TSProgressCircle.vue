<template>
    <div>
        <progress-circle :completed-steps="completedSteps"
                         :total-steps="totalSteps"
                         :diameter="60"
                         :startColor="startColor"
                         :stopColor="stopColor"
                         circleColor="#DDDDDD">
            <p class="innerProgressCircle">{{ innerText }}</p>
        </progress-circle>
    </div>
</template>


<script>
  import { ProgressCircle } from 'vue-progress-circle'

  export default {
    props: {
      completedSteps: {
        type: Number,
        default: 0
      },
      totalSteps: {
        type: Number,
        default: 1
      },
      startColor: {
        type: String,
        default: '#FFFFFF'
      },
      stopColor: {
        type: String,
        default: '#000000'
      },
      innerText: {
        type: String,
        default: ''
      }
    },
    components: {ProgressCircle}
  }
</script>


<style lang="scss" scoped>

    .circle-progress-container {
        position: relative;
        margin: 0 auto;

        &:before {
            content:'';
            width: 38px;
            height:38px;
            position: absolute;
            background-color: var(--white);
            border-radius: 50%;
            left: 11px;
            top: 11px;
        }

    }

    p.innerProgressCircle {
        margin-top: 7px;
        font-size: 20px;
        display: block;
        font-weight: bold;
    }


</style>
