// CONFIGURATION
// If one or more tokens are selected, those will be used instead of the listed actors
// Leave the actorNames array empty to guess the players
// Example actorNames: 'actorNames: ["Bob", "John"],'
const c = {
	actorNames: [],
	skills: ["acr", "apr", "blf", "clm", "dev", "dip", "dis", "esc", "hea", "int", "lin", "per", "sen", "spl", "ste", "sur", "swm", "umd"],
};
// END CONFIGURATION

const tokens = canvas.tokens.controlled;
let actors = tokens.map(o => o.actor);
if (!actors.length && c.actorNames.length) actors = game.actors.filter(o => c.actorNames.includes(o.name));
if (!actors.length) actors = game.actors.filter(o => o.type == "character" && o.testUserPermission(game.user, "OWNER"));
actors = actors.filter(o => o.testUserPermission(game.user, "OWNER"));

if (!actors.length) ui.notifications.warn("No applicable actor(s) found");
else {
	const _roll = async function(type) {
		let madeSound = false;
		for (let a = 0;a < actors.length; a++) {
			let o = actors[a];
			let info = o.getSkillInfo(type);
			if (!info) continue;
			await o.rollSkill(type, { event: new MouseEvent({}), skipDialog: true, noSound: madeSound, });
			madeSound = true;
		}
	};

	const buttons = c.skills.reduce((cur, s) => {
		let info;
		for (let o of actors) {
			info = o.getSkillInfo(s);
			if (info) break;
		}
		if (!info) return cur;
		let label = info.name;
		cur[s] = {
			label: label,
			callback: () => _roll(s),
		};
		return cur;
	}, {});

	const msg = `Choose a skill to roll for the following actor(s): <strong>${actors.map(o => o.name).join("</strong>, <strong>")}</strong>`;

	new Dialog({
		title: "Roll skill",
		content: `<p>${msg}</p>`,
		buttons: buttons,
	}).render(true);
}
