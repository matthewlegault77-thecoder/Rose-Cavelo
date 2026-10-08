// One entry point, so the start-up order is explicit: the engine mounts first
// (it pins the acts and publishes their progress), then each section wires up.
import './scrollcraft.js';
import { initBuilds } from './builds.js';
import { initListings } from './listings.js';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initIntro } from './intro.js';

window.ScrollCraft.mount(document.body);
initBuilds();
initListings();
initNav();
initHero();
initIntro();
