import "./ReloadScript";
import "./HitTest.js";

import {world} from "@minecraft/server";

let playing = false;
world.events.beforeChat.subscribe(async (eventData) => {
	switch (eventData.message) {
		case '!start':
			eventData.cancel = true;
			await setup();
			update();
			break;
		case '!stop':
			eventData.cancel = true;
			playing = false;
			try {world.getDimension("overworld").runCommandAsync("tag @a remove it");} catch{}
			world.say("§2Tag Game Stopped");
			break;
		default: break;
	}
});

async function setup() {
	world.say("§bSetting up tag game \nCreated by Gassayping");
	try {await world.getDimension("overworld").runCommandAsync("tag @a remove it");} catch{}
	await world.getDimension("overworld").runCommandAsync("tag @r add it");
	await world.getDimension("overworld").runCommandAsync("title @a times 1 7 3");
	await world.getDimension("overworld").runCommandAsync("say §4§l@a[tag=it] is it!");
	playing = true;
}

world.events.tick.subscribe(async (e) =>{
	if(playing){
		let nearest;
		world.getDimension("overworld").runCommandAsync("title @a[tag=!it] actionbar §e@a[tag=it] is it!");
		try{nearest = JSON.stringify((await world.getDimension("overworld").runCommandAsync("execute as @a[tag=it] run testfor @p[tag=!it]")))} catch (e) {console.warn(e)}
		world.getDimension("overworld").runCommandAsync(`say ${nearest.nameTag}`);
	}
})