<?php

echo PHP_EOL."Input reading...";
$contentJson = file_get_contents('./cards.collectible.json');
//$contentJson = iconv("CP1257","UTF-8", $contentJson);
$cardList = json_decode($contentJson, true);
$filteredCards = array();
$filteredHeroes = array(
	'demon_hunter' => array(), 'druid' => array(), 'hunter' => array(), 'mage' => array(), 'paladin' => array(), 
	'priest' => array(), 'rogue' => array(), 'shaman' => array(), 'warlock' => array(), 'warrior' => array(),
);
$heroCounter = 0;
if (!$contentJson) {
    echo PHP_EOL."Fail to read input";
    exit;
}
if (!count($cardList)) {
    echo PHP_EOL."Error in JSON decode: ".json_last_error_msg();
    exit;
}
echo PHP_EOL."Filtering ".count($cardList)." cards...";

$debug = array('sets' => array(), 'names' => array());
foreach($cardList as $card) {
	$debug['sets'][$card['set']] = true;
	if(strpos($card['id'], 'CORE_') !== false) continue;
	if(strpos($card['id'], 'VAN_') !== false) continue;
	if(strpos($card['id'], 'tt_') !== false) continue;
	if($card['set'] == 'HERO_SKINS') {
		$heroCounter++;
		switch(true) {
			case (strpos($card['id'], 'HERO_01') !== false): $heroClass = 'warrior'; break;
			case (strpos($card['id'], 'HERO_02') !== false): $heroClass = 'shaman'; break;
			case (strpos($card['id'], 'HERO_03') !== false): $heroClass = 'rogue'; break;
			case (strpos($card['id'], 'HERO_04') !== false): $heroClass = 'paladin'; break;
			case (strpos($card['id'], 'HERO_05') !== false): $heroClass = 'hunter'; break;
			case (strpos($card['id'], 'HERO_06') !== false): $heroClass = 'druid'; break;
			case (strpos($card['id'], 'HERO_07') !== false): $heroClass = 'warlock'; break;
			case (strpos($card['id'], 'HERO_08') !== false): $heroClass = 'mage'; break;
			case (strpos($card['id'], 'HERO_09') !== false): $heroClass = 'priest'; break;
			case (strpos($card['id'], 'HERO_10') !== false): $heroClass = 'demon_hunter'; break;
			default: $heroClass = ''; break;
		}
		$filteredHeroes[$heroClass][$card['id']] = $card['name'];
	} else {
		$filteredCards[$card['id']] = $card['name'];
	}
}
asort($filteredCards);
ksort($filteredHeroes);

//echo PHP_EOL."Debugging...";
//echo PHP_EOL.implode("; ", array_keys($debug['sets']));
//echo PHP_EOL;

echo PHP_EOL."Generating output files...";
echo PHP_EOL."   => ".count($filteredCards)." cards...";
file_put_contents('filteredCards.json', json_encode($filteredCards, JSON_PRETTY_PRINT));
echo PHP_EOL."   => ".$heroCounter." heroes...";
file_put_contents('filteredHeroes.json', json_encode($filteredHeroes, JSON_PRETTY_PRINT));
echo PHP_EOL."Files generated";
echo PHP_EOL;
