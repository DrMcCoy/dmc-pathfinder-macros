// CONFIGURATION
// If one or more tokens are selected, those will be used instead of the listed actors
// Leave the actorNames array empty to guess the players
// Example actorNames: 'actorNames: ["Bob", "John"],'
const c = {
	actorNames: [],
	abilities : ["str", "dex", "con", "int", "wis", "wis", "cha"],
};
// END CONFIGURATION

const tokens = canvas.tokens.controlled;
let actors = tokens.map(o => o.actor);
if (!actors.length && c.actorNames.length) actors = game.actors.filter(o => c.actorNames.includes(o.name));
if (!actors.length) actors = game.actors.filter(o => o.isPC && o.testUserPermission(game.user, "OWNER"));
actors = actors.filter(o => o.testUserPermission(game.user, "OWNER"));

if (!actors.length) ui.notifications.warn("No applicable actor(s) found");
else {
	const _roll = async function(type) {
		let madeSound = false;
		for (let a = 0;a < actors.length; a++) {
			let o = actors[a];
			await o.rollAbility(type, { noSound: madeSound, });
			madeSound = true;
		}
	};

	const buttons = c.abilities.reduce((cur, s) => {
		let label = s;
		for (let o of actors) {
			label = CONFIG.PF1.abilities[s];
		}
		cur[s] = {
			label: label,
			callback: () => _roll(s),
		};
		return cur;
	}, {});

	const msg = `Choose an ability to roll for the following actor(s): <strong>${actors.map(o => o.name).join("</strong>, <strong>")}</strong>`;

	new Dialog({
		title: "Roll ability",
		content: `<p>${msg}</p>`,
		buttons: buttons,
	}).render(true);
}
