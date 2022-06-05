from https://hearthstonejson.com/
last api version (https://api.hearthstonejson.com/v1/ ?)
Here you'll find a folder for each game version, so target the last one, and sub-folder enUS. Inside, grab 'cards.collectible.json' file content and put it in local file JSON_HearthSim.json. Check that you have all the last cards.

Then, run the script:
php ./_filter.php

Get representative cards from filteredCards.json, and put it in TS
