<template>
    <div class="reward container">

        <select v-model="rankMilestone">
            <option value="1">Shieldbearer's Footlocker (20-16)</option>
            <option value="2">Guardian's Chest (15-11)</option>
            <option value="3">Ogre Magi's Stash (10-6)</option>
            <option value="4">Sea Giant's Treasure (5-1)</option>
            <option value="5">Sea Giant's Treasure (Legend)</option>
        </select>


        <table>
            <tr>
                <th>Common rewards</th>
                <th>Rank rewards</th>
            </tr>
            <tr v-if="rankMilestone === '1'">
                <td>
                    <ul>
                        <li class="reward">Card back</li>
                        <li class="reward rewardCard">Golden common card</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardDust">20: 5</li>
                        <li class="reward rewardDust">19: 10</li>
                        <li class="reward rewardDust">18: 15</li>
                        <li class="reward rewardDust">17: 20</li>
                        <li class="reward rewardDust">16: 25</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="rankMilestone === '2'">
                <td>
                    <ul>
                        <li class="reward">Card back</li>
                        <li class="reward rewardCard">Golden common card</li>
                        <li class="reward rewardCard">Golden rare card</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardDust">15: 5</li>
                        <li class="reward rewardDust">14: 10</li>
                        <li class="reward rewardDust">13: 15</li>
                        <li class="reward rewardDust">12: 20</li>
                        <li class="reward rewardDust">11: 25</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="rankMilestone === '3'">
                <td>
                    <ul>
                        <li class="reward">Card back</li>
                        <li class="reward rewardCard">2 golden common cards</li>
                        <li class="reward rewardCard">Golden rare card</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardDust">10: 5</li>
                        <li class="reward rewardDust">9: 10</li>
                        <li class="reward rewardDust">8: 15</li>
                        <li class="reward rewardDust">7: 20</li>
                        <li class="reward rewardDust">6: 25</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="rankMilestone === '4'">
                <td>
                    <ul>
                        <li class="reward">Card back</li>
                        <li class="reward rewardCard">2 golden common cards</li>
                        <li class="reward rewardCard">Golden epic card</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardDust">5: 5</li>
                        <li class="reward rewardDust">4: 10</li>
                        <li class="reward rewardDust">3: 15</li>
                        <li class="reward rewardDust">2: 20</li>
                        <li class="reward rewardDust">1: 25</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="rankMilestone === '5'">
                <td>
                    <ul>
                        <li class="reward">Card back</li>
                        <li class="reward rewardCard">3 golden common cards</li>
                        <li class="reward rewardCard">Golden epic card</li>
                    </ul>
                </td>
                <td>
                </td>
            </tr>
        </table>



    </div>
</template>


<script>
  export default {
    data () {
      return {
        rankMilestone: '1'
      }
    }
  }
</script>

<style lang="scss">
    @import '../../assets/scss/_import.scss';
    ul {
        list-style-type: none;
        padding-left: 0;
    }

    .reward::after {
        content: " ";
        display: inline-block;
        height: 15px;
        width: 15px;
        margin-left: 5px;
    }

    .rewardGold::after {
        background: url('../../assets/gold.png');
        background-size: cover;
    }

    .rewardDust::after {
        background: url('../../assets/dust.png');
        background-size: cover;
    }

    .rewardCard::after {
        background: url('../../assets/card.png');
        background-size: cover;
    }

</style>
