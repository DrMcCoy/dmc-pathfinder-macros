// CONFIGURATION
// Leave the actorNames array empty to guess the players
// Example actorNames: 'actorNames: ["Bob", "John"],'
const c = {
	actorNames: [],
};
// END CONFIGURATION

const tokens = canvas.tokens.controlled;
let actors = tokens.map(o => o.actor);
if (!actors.length && c.actorNames.length) actors = game.actors.entities.filter(o => c.actorNames.includes(o.name));
if (!actors.length) actors = game.actors.entities.filter(o => o.isPC && o.testUserPermission(game.user, "OWNER"));
actors = actors.filter(o => o.testUserPermission(game.user, "OWNER"));

if (!actors.length) ui.notifications.warn("No applicable actor(s) found");
else {
	const _roll = async function(type) {
		for (let a = 0; a < actors.length; a++) {
			let o = actors[a];
			await o.rollSavingThrow(type, { event: new MouseEvent({}), noSound: a > 0, });
		}
	};

	const msg = `Choose a saving throw to roll for the following actor(s): <strong>${actors.map(o => o.name).join("</strong>, <strong>")}</strong>`;

	new Dialog({
		title: "Roll saving throw",
		content: `<p>${msg}</p>`,
		buttons: {
			fort: {
				label: "Fortitude",
				callback: () => _roll("fort"),
			},
			ref: {
				label: "Reflex",
				callback: () => _roll("ref"),
			},
			will: {
				label: "Will",
				callback: () => _roll("will"),
			},
		},
	}).render(true);
}
