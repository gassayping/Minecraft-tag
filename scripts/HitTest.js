import { world } from "@minecraft/server";

const overworld = world.getDimension("overworld");

world.events.entityHit.subscribe(event => (entityHitEvent(event)));

function entityHitEvent(eventData) {
	let attacker = eventData.entity;
	try {
		let victim = eventData.hitEntity;
		if (victim.typeId == "minecraft:player" && attacker.typeId == "minecraft:player" && attacker.hasTag("it")) {
			world.say(`§a${victim.nameTag}§b is it!`);
			overworld.runCommandAsync(`title ${victim.nameTag} title §c${attacker.nameTag}§e\ntagged you!`);
			victim.addTag("it");
			attacker.removeTag("it");
		}
	} catch { }
}
