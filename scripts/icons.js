// Create the marker icons
var iconBuriedTreasure = generateIcon("icon-buried-treasure");
var iconArenaObelisk = generateIcon("icon-arena-obelisk");
var iconFishingSpot = generateIcon("icon-fishing-spot");
var iconWishingWell = generateIcon("icon-wishing-well");
var iconMythTablet = generateIcon("icon-myth-tablet");
var iconFabricator = generateIcon("icon-fabricator");
var iconLinkTower = generateIcon("icon-link-tower");
var iconAudioLog = generateIcon("icon-audio-log");
var iconFarmable = generateIcon("icon-farmable");
var iconTerminal = generateIcon("icon-terminal");
var iconCampfire = generateIcon("icon-campfire");
var iconFixable = generateIcon("icon-fixable");
var iconHatch = generateIcon("icon-hatch");
var iconQuest = generateIcon("icon-quest");
var iconRadio = generateIcon("icon-radio");
var iconChest = generateIcon("icon-chest");
var iconEntryway = generateIcon("icon-entryway");
var iconBoss = generateIcon("icon-boss");
var iconTomb = generateIcon("icon-tomb");
var iconRift = generateIcon("icon-rift");
var iconLock = generateIcon("icon-lock");
var iconLock1 = generateIcon("icon-lock1");
var iconLock2 = generateIcon("icon-lock2");
var iconLock3 = generateIcon("icon-lock3");

function generateIcon(name) {
	return L.icon({
		iconUrl: `images/icons/${name}.png`,
		iconSize:	[32,32],
		iconAnchor: [16,16],
		popupAnchor:	[0, -10]
	});
}