// The [-384, 768]=[(48 * -8), (96 * 8)] numbers are the map width(24,576) and height(12,288) projected to the map unit when the zoom is set to 5
const maxBoundsIsland = [[0, 0], [-384, 768]];
const maxBoundsUndercrown = [[0, 0], [(9 * -8), (14 * 8)]];
const mapNativeMaxZoom = 5;
var currentIsland = "island";
var lastBoundsIsland = [
	[maxBoundsIsland[1][0], 0], // SW
	[0, maxBoundsIsland[1][1]]  // NE
], lastBoundsUndercrown = [
	[maxBoundsUndercrown[1][0], 0], // SW
	[0, maxBoundsUndercrown[1][1]]  // NE
];

// Array that contains all polygons and their area name, array for the groups so we clear them later
var borderPolygons = [], groups = [];

// Create the leaflet map object and setting it up
const map = new L.Map('map', {
	crs: L.CRS.Simple,
	maxZoom: 7,
	minZoom: 1,
	maxNativeZoom: mapNativeMaxZoom,
	maxBounds: maxBoundsIsland,
	maxBoundsViscosity: 0.6,
	attributionControl: false,
});
map.fitBounds(lastBoundsIsland);

const mainLayer = L.tileLayer('tiles/{z}/{x}/{y}.jpg', {
	maxNativeZoom: mapNativeMaxZoom,
	bounds: maxBoundsIsland,
	tms: false,
}).addTo(map);

const undercrownLayer = L.tileLayer('tiles_undercrown/{z}/{x}/{y}.jpg', {
	maxNativeZoom: mapNativeMaxZoom,
	minNativeZoom: 3,
	bounds: maxBoundsUndercrown,
	tms: false,
});

$("#btnSwitch").click(function (event) {
	if (map.hasLayer(mainLayer)) {
		$("#btnSwitch").html("Island Map");
		lastBoundsIsland = map.getBounds();
		map.removeLayer(mainLayer);
		map.addLayer(undercrownLayer);
		currentIsland = "undercrown";
		updateBounds(maxBoundsUndercrown, lastBoundsUndercrown);
	} else {
		$("#btnSwitch").html("Undercrown Map");
		lastBoundsUndercrown = map.getBounds();
		map.removeLayer(undercrownLayer);
		map.addLayer(mainLayer);
		currentIsland = "island";
		updateBounds(maxBoundsIsland, lastBoundsIsland);
	}
	updateData();
});

// listen for zoom events to change the location name font-size
map.on('zoomend', function () {
	var zoomLevel = map.getZoom() * 2;
	document.documentElement.style.setProperty('--zoomlevel', `${zoomLevel}px`);
});

// Add the mouse postion control (bottom left) and update the cords
L.control.mousePosition({
	format: function (e) {
		var point = map.project(e.latlng, mapNativeMaxZoom);
		var lng = L.Util.formatNum(point.x / 12.8, 0); // 12.8 is the aspect ratio of map unit to game unit
		var lat = L.Util.formatNum(point.y / 12.8, 0);
		if (map.hasLayer(mainLayer)) {
			var area;
			borderPolygons.forEach(b => {
				if (area == null && b.polygon.contains(e.latlng))
					area = b.name;
			});
			return `Point: ${lng}°, ${lat}°` + (area != null ? `<br>${area}` : "");
		}
		else {
			return `Point: ${lng + 840}°, ${lat + 300}°<br>Undercrown`;
		}
	}
}).addTo(map);

// Create the marker cluster group
var clusterGroup = L.markerClusterGroup({
	chunkedLoading: true,
	showCoverageOnHover: false,
	spiderfyOnMaxZoom: false,
	disableClusteringAtZoom: 4,
}).addTo(map);

// Create the markers subgroups
var createSub = () => {
	const group = L.featureGroup.subGroup(clusterGroup).addTo(map);
	groups.push(group);
	return group;
};
var createLayerGroup = () => {
	const group = L.layerGroup().addTo(map);
	groups.push(group);
	return group;
};
var groupCampfire = createSub();
var groupQuest = createSub();
var groupRadio = createSub();
var groupBoss = createSub();
var groupBuriedTreasure = createSub();
var groupChest = createSub();
var groupFishingSpot = createSub();
var groupArenaObelisk = createSub();
var groupLinkTower = createSub();
var groupTomb = createSub();
var groupWishingWell = createSub();
var groupTerminal = createSub();
var groupEntryway = createSub();
var groupHatch = createSub();
var groupShelterLoudspeaker = createSub();
var groupAudioLog = createSub();
var groupMythTablet = createSub();
var groupFarmable = createSub();
var groupFixable = createSub();
var groupFabricator = createSub();
var groupRift = createSub();
var groupLock = createSub();
var groupLock1 = createSub();
var groupLock2 = createSub();
var groupLock3 = createSub();

// Locations name groups & border group
var groupCities1 = createLayerGroup();
var groupCities2 = createLayerGroup();
var groupCities3 = createLayerGroup();
var groupBorders = createLayerGroup();

// Layer Options
var groupedOverlays = {
	"Borders": {
		"Tower Borders": groupBorders
	},
	"Locations": {
		"Huge Locations": groupCities1,
		"Medium Locations": groupCities2,
		"Small Locations": groupCities3,
	},
	"Points of Interest": {
		[`${getIcon("icon-campfire")} Campfire`]: groupCampfire,
		[`${getIcon("icon-quest")} Quest`]: groupQuest,
		[`${getIcon("icon-radio")} Radio`]: groupRadio,
		[`${getIcon("icon-boss")} Boss`]: groupBoss,
		[`${getIcon("icon-buried-treasure")} Buried Treasure`]: groupBuriedTreasure,
		[`${getIcon("icon-chest")} Timed Chest`]: groupChest,
		[`${getIcon("icon-fishing-spot")} Fishing Spot`]: groupFishingSpot,
		[`${getIcon("icon-arena-obelisk")} Arena Obelisk`]: groupArenaObelisk,
		[`${getIcon("icon-link-tower")} Link Tower`]: groupLinkTower,
		[`${getIcon("icon-tomb")} Tomb`]: groupTomb,
		[`${getIcon("icon-wishing-well")} Wishing Well`]: groupWishingWell,
		[`${getIcon("icon-terminal")} Terminal`]: groupTerminal,
		[`${getIcon("icon-entryway")} Entryway`]: groupEntryway,
		[`${getIcon("icon-hatch")} Shelter`]: groupHatch,
		[`${getIcon("icon-shelter-loudspeaker")} Shelter Loudspeaker`]: groupShelterLoudspeaker,
		[`${getIcon("icon-audio-log")} Audio Log`]: groupAudioLog,
		[`${getIcon("icon-myth-tablet")} Myth Tablet`]: groupMythTablet,
		[`${getIcon("icon-farmable")} Farmable`]: groupFarmable,
		[`${getIcon("icon-fixable")} Fixable`]: groupFixable,
		[`${getIcon("icon-fabricator")} Fabricator`]: groupFabricator,
		[`${getIcon("icon-rift")} Rift`]: groupRift,
		[`${getIcon("icon-lock")} Locked Door`]: groupLock,
		[`${getIcon("icon-lock1")} Locked Door - Basic Lockpick`]: groupLock1,
		[`${getIcon("icon-lock2")} Locked Door - Expert Lockpick`]: groupLock2,
		[`${getIcon("icon-lock3")} Locked Door - Maser Lockpick`]: groupLock3,
	}
};

var layerControl = L.control.groupedLayers(null, groupedOverlays, {
	groupCheckboxes: true
});
map.addControl(layerControl);

//Disable click through layer control
L.DomEvent.disableClickPropagation(layerControl._container);
var markersData;
// Call a method to fetch the markers data
$(function () {
	$.ajax({
		url: "./data.json",
		type: "GET",
		dataType: 'json',
		success: function (data) {
			if (data.error != undefined) {
				alert("Error fetching data");
				console.error(data);
			} else {
				markersData = data;
				updateData();
			}
		},
		error: function () {
			alert("Error fetching data");
		}
	});
});
// A method to update markers data depending on selected map
function updateData() {
	groups.forEach(group => {
		group.clearLayers();
	});
	markersData.forEach(marker => {
		var pos = map.unproject([marker.x, marker.y], mapNativeMaxZoom);
		if (currentIsland == marker.map || (marker.map == null && currentIsland == "island")) {
			if (marker.type == "poi") {
				// Adding a marker if it's a POI
				L.marker(pos, {
					icon: eval(marker.icon),
				}).bindPopup(marker.description).addTo(eval(marker.group));
			} else if (marker.type == "loc") {
				// Adding a label if it's a location
				L.marker(pos, { opacity: 0.0, interactive: false })
					.bindTooltip(marker.name, { permanent: true, direction: "center", className: `city${marker.size}`, offset: [0.5, 0.5] })
					.addTo(eval(`groupCities${marker.size}`));
			} else if (marker.type == "area") {
				var polygon = L.polygon(eval(marker.border), { color: 'white', fill: false, weight: 2, opacity: 0.5, interactive: false }).addTo(groupBorders);
				borderPolygons.push({ name: marker.tower, polygon });
			}
		}
	});
}
function updateBounds(maxBounds, fitBounds){
	map.setMaxBounds(maxBounds);
	map.fitBounds(fitBounds);
}
function getIcon(file) {
	return `<img src='images/icons/${file}.png' width='16' height='16'></img>`;
}