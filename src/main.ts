import { Timer, Unit } from "w3ts";
import { Players } from "w3ts/globals";
import { W3TS_HOOK, addScriptHook } from "w3ts/hooks";
import { Units } from "@objectdata/units";
import { setupAbilityTriggers } from "./abilities";
import { generateWorld } from "./mapGenerator";
import { initEconomy } from "./economy";
import { initAttackerForces } from "./enemies";
import { playStartMusic } from "./music";
import { playerStates, PlayerState, setup_trackArtifactHolders } from "./player-utils/player-data";
import { forEachPlayerPlaying, initializePlayers } from "./player-utils/utils";

const BUILD_DATE = compiletime(() => new Date().toUTCString());
const TS_VERSION = compiletime(() => require("typescript").version);
const TSTL_VERSION = compiletime(() => require("typescript-to-lua").version);

compiletime(( { objectData, constants }) => {
  const unit = objectData.units.get(constants.units.Footman);

  if (!unit) {
    return;
  }
  
  unit.modelFile = "units\\human\\TheCaptain\\TheCaptain.mdl";

  objectData.save();
});

function tsMain() {
  try {
    print(`Build: ${BUILD_DATE}`);
    print(`Typescript: v${TS_VERSION}`);
    print(`Transpiler: v${TSTL_VERSION}`);
    print(" ");
    print("Welcome to TypeScript!");
    print("Map created by JediMindTrix/Nihilism_Is_Death");

    let startTimer = new Timer();

    SetDefaultDifficulty(MAP_DIFFICULTY_INSANE);

    print("The Good Lord Gaben said let there be light, and there was light!");

    // printTerrainTypes();

    startTimer.start(5, false, mapStart)

    // SetBlightRadiusLocBJ(true, Players[0].handle, Location(0,0), 500)

  } catch (e) {
    print(`An error occurred: ${e}`);
  }

  //Works
  // SetCameraBounds(-1200,-1200,-1200,1200, 1200, 1200, 1200, -1200);
}


function mapStart(){
  StopMusic(false);
  SetTimeOfDay(10);

  // const buttonFrame = new Frame("Button Test", Frame.fromOrigin(ORIGIN_FRAME_GAME_UI, 0), 0, 0, "GLUEBUTTON", "");
  // buttonFrame.setVisible(true);

  // BlzCreateFrame("Test", )
  
  // Players.forEach(p => {
  //   playerStates.set(p.id, new PlayerState(p));
  // });
  
  forEachPlayerPlaying((player) => {
    playerStates.set(player.id, new PlayerState(player));
  })

  playerStates.forEach(state => print("Player State Cached Player Name: ",state.player.name));
  setupAbilityTriggers();
  initializePlayers();
  initEconomy();
  generateWorld();
  setup_trackArtifactHolders();
  playStartMusic();

  new Timer().start(45, false, initAttackerForces);
}

addScriptHook(W3TS_HOOK.MAIN_AFTER, tsMain);
