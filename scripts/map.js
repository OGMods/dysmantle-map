 // The [-384, 768] numbers are the map width(24,576) and height(12,288) projected to the map unit when the zoom is set to 5
const maxBounds = [[0, 0], [-384, 768]];
const mapMinZoom = 1;
const mapMaxZoom = 7;
const mapNativeMaxZoom = 5;

// Create the leaflet map object and setting it up
const map = new L.Map('map', {
	crs: L.CRS.Simple,
	maxZoom: mapMaxZoom,
	minZoom: mapMinZoom,
	maxBounds: maxBounds,
	maxBoundsViscosity: 0.6,
	attributionControl: false,
});

L.tileLayer('tiles/{z}/{x}/{y}.jpg', {
	minZoom: mapMinZoom, maxZoom: mapMaxZoom,
	maxNativeZoom:mapNativeMaxZoom,
	bounds: maxBounds,
	tms: false,
}).addTo(map);

map.fitBounds([
	[-384, 0], // SW
	[0, 768]  // NE
]);

// listen for zoom event to change the location name font-size
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
		var area;
		borderPolygons.forEach(b => {
			if(area==null && b.polygon.contains(e.latlng))
				area=b.name;
			
		});
		return `Point: ${lng}°, ${lat}°` + (area!=null?`<br>${area}`:"");
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
var createSub = () => L.featureGroup.subGroup(clusterGroup).addTo(map);
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
var groupHatch = createSub();
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
var groupCities1 = L.layerGroup().addTo(map);
var groupCities2 = L.layerGroup().addTo(map);
var groupCities3 = L.layerGroup().addTo(map);
var groupBorders = L.layerGroup().addTo(map);

// Array that contains all polygons and their area name
var borderPolygons = [];

//https://commerce.coinbase.com/
//https://codepen.io/bennettfeely/pen/WXWKGW
//https://codepen.io/rainner/pen/bxpGBb

// Layer Options
var groupedOverlays = {
	"Borders": {
		"Tower Borders":groupBorders
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
		[`${getIcon("icon-hatch")} Shelter`]: groupHatch,
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
				data.forEach(marker => {
					var pos = map.unproject([marker.x, marker.y], mapNativeMaxZoom);
					if (marker.type == "poi") {
						// Adding a marker if it's a POI
						L.marker(pos, {
							icon: eval(marker.icon),
						}).bindPopup(marker.description).addTo(eval(marker.group));
					} else if (marker.type == "loc") {
						// Adding a label if it's a location
						L.marker(pos, { opacity: 0.0 , interactive:false })
							.bindTooltip(marker.name, { permanent: true, direction: "center", className: `city${marker.size}`, offset: [0.5, 0.5] })
							.addTo(eval(`groupCities${marker.size}`));
					}else if(marker.type == "area"){
						var polygon = L.polygon(eval(marker.border), {color: 'white', fill:false, weight:2,opacity:0.5,interactive:false}).addTo(groupBorders);
						borderPolygons.push({name:marker.tower,polygon});
					}
				});
			}
		},
		error: function () {
			alert("Error fetching data");
		}
	});
});

function getIcon(file) {
	return `<img src='images/icons/${file}.png' width='16' height='16'></img>`;
}