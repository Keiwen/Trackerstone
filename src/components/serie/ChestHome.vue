<template>
    <div class="chesthome">
        <h2>Current chest</h2>
        <div class="row">
            <div class="col-xs-9" :class="'serieChest serieChest-' + currentChest.rank">
            </div>
            <div @click="showChestNote()" class="col-xs-3">
                <icon-info :noted="true"></icon-info>
            </div>
        </div>
        <div class="row">
            <p>
                Next chest in <strong>{{ winsToNextChest }}</strong>
                <span v-if="winsToNextChest === 1">win</span>
                <span v-else>consecutive wins</span>
            </p>
        </div>


        <sweet-modal ref="modalChest" modal-theme="dark" :title="currentChest.level + ' chest'">
            <h4>End of season rewards</h4>
            <div class="container reward-container">
                <div class="col-xs-4">
                    <div class="reward reward-pack" v-if="currentChest.pack">{{ currentChest.pack }}</div>
                </div>
                <div class="col-xs-4">
                    <div class="reward reward-rareCard" v-if="currentChest.rareCard">{{ currentChest.rareCard }}</div>
                </div>
                <div class="col-xs-4">
                    <div class="reward reward-epicCard" v-if="currentChest.epicCard">{{ currentChest.epicCard }}</div>
                </div>
            </div>
            <div class="container">
                <div class="col-xs-4">Card packs</div>
                <div class="col-xs-4">Rare cards</div>
                <div class="col-xs-4">Epic cards</div>
            </div>
            <hr/>
            <div v-if="currentChest.chestUpgrade">
                <h4>Next chest: {{ currentChest.nextLevel }}</h4>
                <div class="container reward-container">
                    <div class="col-xs-4">
                        <div class="reward reward-pack" v-if="currentChest.chestUpgrade.pack">+{{ currentChest.chestUpgrade.pack }}</div>
                    </div>
                    <div class="col-xs-4">
                        <div class="reward reward-rareCard" v-if="currentChest.chestUpgrade.rareCard">+{{ currentChest.chestUpgrade.rareCard }}</div>
                    </div>
                    <div class="col-xs-4">
                        <div class="reward reward-epicCard" v-if="currentChest.chestUpgrade.epicCard">+{{ currentChest.chestUpgrade.epicCard }}</div>
                    </div>
                </div>
            </div>
        </sweet-modal>

    </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { SweetModal } from 'sweet-modal-vue'
  import IconInfo from '@/components/singleElements/IconInfo'

  export default {
    components: {SweetModal, IconInfo},
    computed: {
      ...mapGetters(['winsToNextChest', 'getRankChest']),
      currentChest () {
        return this.getRankChest()
      }
    },
    methods: {
      showChestNote () {
        this.$refs.modalChest.open()
      }
    }
  }
</script>

<style lang="scss" scoped>

    .serieChest {
        height: 65px;
    }

    .reward-container {

        margin-bottom: 20px;

        .reward {
            height: 50px;
            width: 50px;
            margin: auto;
            font-size: 2em;
            text-shadow: 1px 1px black;
            text-align: center;

            &.reward-pack {
                background: url('../../assets/pack.png');
            }
            &.reward-rareCard {
                background: url('../../assets/rarity_gems_sprite.png');
                background-position: -50px 0;
            }
            &.reward-epicCard {
                background: url('../../assets/rarity_gems_sprite.png');
                background-position: -100px 0;
            }
        }

    }
</style>
