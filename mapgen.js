const ljf = require( "load-json-file" );
const wjf = require( "write-json-file" );
const regions = [
	{
		name: "north",
		id: "JzKStMojAGA"
	},
	{
		name: "central",
		id: "SgkhNupCR4x"
	},
	{
		name: "highland",
		id: "bJ55F4lb3WJ"
	},
	{
		name: "South",
		id: "T6shP0GyRuQ"
	}
]

//change the uid to region north JzKStMojAGA, central SgkhNupCR4x, highland bJ55F4lb3WJ, south T6shP0GyRuQ
//const filter = feature => feature.properties.parent === "T6shP0GyRuQ";

const jsonTransformMapWithFilterFn = (data, region) => {
	data.features = data.features.filter( feature => feature.properties.parent === region.id );
	jsonTransformMap( data, region );
}

const jsonTransformMap = (data, region) => {
  outputJson( data.features.map( feature => {
    return {
      id: feature.id,
      coordinates: feature.geometry.coordinates,
      geometryType: feature.geometry.type,
      code: feature.properties.code,
      level: feature.properties.level,
      name: feature.properties.name,
	  parent: feature.properties.parent
    };
  } ), region )
};

const outputJson = (features, region) => {
	wjf.sync( `./data/${region.name}regionmap.json`, features, {indent: 2} );
}

regions.forEach(region => {jsonTransformMapWithFilterFn(ljf.sync( "./data/vnProv.json" ),region);});


// change the outputfile name based on the region
//wjf.sync( "./data/southregionmap.json", o, {indent: 2} );