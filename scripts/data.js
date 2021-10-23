// Create the marker icons
var iconBuriedTreasure = generateIcon("icon-buried-treasure");
var iconArenaObelisk = generateIcon("icon-arena-obelisk");
var iconFishingSpot = generateIcon("icon-fishing-spot");
var iconWishingWell = generateIcon("icon-wishing-well");
var iconMythTablet = generateIcon("icon-myth-tablet");
var iconFabricator = generateIcon("icon-fabricator");
var iconLinkTower = generateIcon("icon-link-tower");
var iconLinkRelay = generateIcon("icon-link-relay");
var iconFuelCell = generateIcon("icon-fuel-cell");
var iconAudioLog = generateIcon("icon-audio-log");
var iconFarmable = generateIcon("icon-farmable");
var iconTerminal = generateIcon("icon-terminal");
var iconCampfire = generateIcon("icon-campfire");
var iconFixable = generateIcon("icon-fixable");
var iconHatch = generateIcon("icon-hatch");
var iconShelterLoudspeaker = generateIcon("icon-shelter-loudspeaker");
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
function getIconPath(icon) {
	var r;
	switch (icon) {
		case "iconBuriedTreasure": r = "icon-buried-treasure"; break;
		case "iconArenaObelisk": r = "icon-arena-obelisk"; break;
		case "iconFishingSpot": r = "icon-fishing-spot"; break;
		case "iconWishingWell": r = "icon-wishing-well"; break;
		case "iconMythTablet": r = "icon-myth-tablet"; break;
		case "iconFabricator": r = "icon-fabricator"; break;
		case "iconLinkTower": r = "icon-link-tower"; break;
		case "iconLinkRelay": r = "icon-link-relay"; break;
		case "iconFuelCell": r = "icon-fuel-cell"; break;
		case "iconAudioLog": r = "icon-audio-log"; break;
		case "iconFarmable": r = "icon-farmable"; break;
		case "iconTerminal": r = "icon-terminal"; break;
		case "iconCampfire": r = "icon-campfire"; break;
		case "iconFixable": r = "icon-fixable"; break;
		case "iconHatch": r = "icon-hatch"; break;
		case "iconShelterLoudspeaker": r = "icon-shelter-loudspeaker"; break;
		case "iconQuest": r = "icon-quest"; break;
		case "iconRadio": r = "icon-radio"; break;
		case "iconChest": r = "icon-chest"; break;
		case "iconEntryway": r = "icon-entryway"; break;
		case "iconBoss": r = "icon-boss"; break;
		case "iconTomb": r = "icon-tomb"; break;
		case "iconRift": r = "icon-rift"; break;
		case "iconLock":
		case "iconLock1":
		case "iconLock2":
		case "iconLock3": r = "icon-lock"; break;
		default:
			n = "";
	}
	if (r !== "") return `images/icons/${r}.png`;
	return "";
}
function getAreaName(area) {
	var n = "Unknown";
	switch (area) {
		case 1: n = "Capernaum"; break;
		case 2: n = "Canaveral"; break;
		case 3: n = "Fairwood"; break;
		case 4: n = "Hedgefield"; break;
		case 5: n = "Everglade"; break;
		case 6: n = "Borealis"; break;
		case 7: n = "Acrturus"; break;
		case 8: n = "Hibernus"; break;
		case 9: n = "Frore"; break;
		case 10: n = "Central"; break;
		case 11: n = "Narrows Vale"; break;
		case 12: n = "Sunburn Desert"; break;
		case 13: n = "Westport"; break;
		case 14: n = "Crown"; break;
		case 15: n = "Frost Horn"; break;
		case 16: n = "Vulcan"; break;
		case 17: n = "Solaris"; break;
		case 18: n = "Serpent's Crossing"; break;
		case 19: n = "Polaris"; break;
		case 20: n = "Undercrown"; break;
	}
	return n;
}