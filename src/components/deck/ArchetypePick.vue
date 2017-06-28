<template>
    <span>
        <button class="btn btn-default" @click="openArchetypeSpread()">{{ btnText }}</button>

        <sweet-modal ref="modalArchetypePick" overlay-theme="dark" title="Pick archetype">
            <div class="container-fluid">
                <div class="col-xs-6 col-sm-3 archetypePick" v-for="archetype in archetypes">
                    <div @click="archetypeClick(archetype)">
                        {{ archetype }}
                    </div>
                </div>
            </div>
        </sweet-modal>
    </span>

</template>


<script>

  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'

  export default {
    components: { SweetModal },
    data () {
      return {
        pick: ''
      }
    },
    computed: {
      ...mapGetters(['archetypes']),
      btnText () {
        if (this.pick) return this.pick
        return 'Choose archetype...'
      }
    },
    methods: {
      openArchetypeSpread () {
        this.$refs.modalArchetypePick.open()
      },
      archetypeClick (key) {
        this.pick = key
        this.$refs.modalArchetypePick.close()
        this.$emit('pick-archetype', key)
      }
    }
  }

</script>

<style>
    .archetypePick {
        border: 1px solid transparent;
        cursor: pointer;
    }

    .archetypePick:hover {
        border: 1px solid #D3921F;
    }

</style>
