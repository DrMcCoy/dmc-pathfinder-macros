// CONFIGURATION
// If one or more tokens are selected, those will be used instead of the listed actors
// Leave the actorNames array empty to guess the players
// Example actorNames: 'actorNames: ["Bob", "John"],'
const c = {
	actorNames: []
};
// END CONFIGURATION

const tokens = canvas.tokens.controlled;
let actors = tokens.map(o => o.actor);
if (!actors.length && c.actorNames.length) actors = game.actors.entities.filter(o => c.actorNames.includes(o.name));
if (!actors.length) actors = game.actors.entities.filter(o => o.isPC && o.testUserPermission(game.user, "OWNER"));
actors = actors.filter(o => o.testUserPermission(game.user, "OWNER"));

if (!actors.length) ui.notifications.warn("No applicable actor(s) found");
else {
	let madeSound = false;
	for (let a = 0;a < actors.length; a++) {
		let o = actors[a];
		o.rollCL("primary", { noSound: madeSound, });
		madeSound = true;
	}
}
