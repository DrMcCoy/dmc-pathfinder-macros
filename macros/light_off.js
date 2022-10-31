const scene = canvas.scene;
if (!scene)
	return;

const tokens = canvas.tokens.controlled;

tokens.forEach(t => {
	const update = {
		light: {
			dim: 0,
			bright: 0
		}
	};

	t.document.update(update).then(t.refresh());
});
