const scene = canvas.scene;
if (!scene)
	return;

const tokens = canvas.tokens.controlled;

tokens.forEach(t => {
	t.data.light.dim = 0;
	t.data.light.bright = 0;

	scene.updateEmbeddedDocuments(Token.embeddedName, [t.data]);
});
