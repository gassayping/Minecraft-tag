import "./ReloadScript";
import "./HitTest.js";
import {overworld} from '../Exports';
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
			try {overworld.runCommandAsync("tag @a remove it");} catch{}
			world.say("§2Tag Game Stopped");
			break;
		default: break;
	}
});

async function setup() {
	world.say("§bSetting up tag game \nCreated by Gassayping");
	try {await overworld.runCommandAsync("tag @a remove it");} catch{}
	await overworld.runCommandAsync("tag @r add it");
	await overworld.runCommandAsync("title @a times 1 7 3");
	await overworld.runCommandAsync("say §4§l@a[tag=it] is it!");
	playing = true;
}

world.events.tick.subscribe(async (e) =>{
	if(playing){
		let nearest;
		overworld.runCommandAsync("title @a[tag=!it] actionbar §e@a[tag=it] is it!");
		try{nearest = (await overworld.runCommandAsync("execute as @a[tag=it] run testfor @p[tag=!it]"))} catch (e) {console.warn(e)}
		overworld.runCommandAsync(`say ${nearest.nameTag}`);
	}
})