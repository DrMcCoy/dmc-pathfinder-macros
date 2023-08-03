const tokens = canvas.tokens.controlled;
const caster = tokens[0];

if (tokens.length !== 1) {
	ui.notifications.warn("Please select a token");
} else {
	let actor = tokens[0].actor;
	let spells = actor.system.attributes.spells;

	if (spells.usedSpellbooks.length < 1) {
		ui.notifications.warn("You don't cast.");
	} else if (spells.usedSpellbooks.length == 1) {
		rollCheck(actor, spells.usedSpellbooks[0]);
	} else {
		const buttons = {};

		spells.usedSpellbooks.forEach((type) => {
			let spellbook = getProperty(spells, `spellbooks.${type}`);

			buttons[spellbook.name] = {
				label: spellbook.name,
				callback: () => {
					rollCheck(actor, type);
				},
			}
		});

		new Dialog({
			title: "Roll Concentration!",
			content: `<p>Choose a spellbook for actor: <strong>${actor.name}</strong></p>`,
			buttons: buttons,
		}).render(true);

	}
}

function rollCheck(actor, spellbook) {
	actor.rollConcentration(spellbook);
}
