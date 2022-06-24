const TORCH_LIGHT_METRIC = 6;
const TORCH_LIGHT_IMPERIAL = 20;

const scene = canvas.scene;
if (!scene)
	return;

let units = game.settings.get("pf1", "distanceUnits");
if (units === "default")
	units = game.settings.get("pf1", "units");

let torch_light = TORCH_LIGHT_IMPERIAL;
if (units === "metric")
	torch_light = TORCH_LIGHT_METRIC;

const tokens = canvas.tokens.controlled;

tokens.forEach(t => {
	t.data.light.dim = torch_light * 2;
	t.data.light.bright = torch_light;

	scene.updateEmbeddedDocuments(Token.embeddedName, [t.data]);
});
