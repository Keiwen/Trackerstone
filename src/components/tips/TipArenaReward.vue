<template>
    <div class="reward container">

        <select v-model="winCount">
            <option value="0">0 win</option>
            <option value="1">1 win</option>
            <option value="2">2 wins</option>
            <option value="3">3 wins</option>
            <option value="4">4 wins</option>
            <option value="5">5 wins</option>
            <option value="6">6 wins</option>
            <option value="7">7 wins</option>
            <option value="8">8 wins</option>
            <option value="9">9 wins</option>
            <option value="10">10 wins</option>
            <option value="11">11 wins</option>
            <option value="12">12 wins</option>
        </select>


        <table>
            <tr>
                <th>Guaranteed rewards</th>
                <th>Random reward pool</th>
            </tr>
            <tr v-if="winCount == 0">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">25-40</li>
                        <li class="reward rewardDust">25-40</li>
                        <li class="reward rewardCard">Common card</li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 1">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">30-50</li>
                        <li class="reward rewardDust">25-50</li>
                        <li class="reward rewardCard">Common card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 2">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">35-60</li>
                        <li class="reward rewardDust">40-50</li>
                        <li class="reward rewardCard">Common card</li>
                        <li class="reward rewardCard">Rare card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 3">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">25-35</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">20-25</li>
                        <li class="reward rewardDust">10-25</li>
                        <li class="reward rewardCard">Rare card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 4">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">40-60</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">20-30</li>
                        <li class="reward rewardDust">10-25</li>
                        <li class="reward rewardCard">Rare card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 5">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">45-60</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">45-60</li>
                        <li class="reward rewardDust">45-60</li>
                        <li class="reward rewardCard">Rare card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 6">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">75-85</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">45-60</li>
                        <li class="reward rewardDust">45-60</li>
                        <li class="reward rewardCard">Rare card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 7">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">150-160</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">20-30</li>
                        <li class="reward rewardDust">10-25</li>
                        <li class="reward rewardCard">Rare card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 8">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">150-160</li>
                        <li class="reward rewardRandom">Random reward</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">20-50</li>
                        <li class="reward rewardDust">15-25</li>
                        <li class="reward rewardCard">Golden common card</li>
                        <li class="reward rewardCard">Golden or regular rare to legendary card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 9">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">150-165</li>
                        <li class="reward rewardRandom">Random reward</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">20-120</li>
                        <li class="reward rewardDust">10-50</li>
                        <li class="reward rewardCard">Golden common card</li>
                        <li class="reward rewardCard">Golden or regular rare to legendary card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 10">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">150-185</li>
                        <li class="reward rewardRandom">Random reward</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">65-125</li>
                        <li class="reward rewardDust">65-95</li>
                        <li class="reward rewardCard">Golden common card</li>
                        <li class="reward rewardCard">Golden or regular rare to legendary card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 11">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">195-210</li>
                        <li class="reward rewardRandom">Random reward</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">65-205</li>
                        <li class="reward rewardDust">60-95</li>
                        <li class="reward rewardCard">Golden common card</li>
                        <li class="reward rewardCard">Golden or regular rare to legendary card</li>
                        <li class="reward rewardPack"></li>
                    </ul>
                </td>
            </tr>
            <tr v-if="winCount == 12">
                <td>
                    <ul>
                        <li class="reward rewardPack"></li>
                        <li class="reward rewardGold">215-225</li>
                        <li class="reward rewardGold">25-35</li>
                        <li class="reward rewardRandom">Random reward</li>
                        <li class="reward rewardRandom">Random reward</li>
                    </ul>
                </td>
                <td>
                    <ul>
                        <li class="reward rewardGold">65-185</li>
                        <li class="reward rewardCard">Golden common or rare card</li>
                        <li class="reward rewardCard">Golden or regular epic or legendary card</li>
                        <li class="reward rewardPack">Pack</li>
                    </ul>
                </td>
            </tr>
        </table>



    </div>
</template>


<script>
  export default {
    data () {
      return {
        winCount: 0
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

    .rewardPack {
        color: transparent;
    }

    .rewardPack::after {
        height: 40px;
        width: 40px;
        background: url('../../assets/pack.png');
        background-size: cover;
        margin-left: 0;
    }

    .rewardRandom::after {
        height: 0;
        width: 0;
        margin-left: 0;
    }

</style>
