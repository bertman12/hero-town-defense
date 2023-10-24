import { entities } from "../mapGenerator";
import { UNIT_IDS } from "../enums";
import { checkDestructablesInRegion } from "../utils/terrain";
import { Unit, Timer, Point } from "w3ts";
import { Players } from "w3ts/globals";
import { OrderId } from "w3ts/globals/order";

export function spawnDemonSeer(){
    for (let x = 0; x < entities.length; x++) {
        const entity = entities[x];
  
        if(entity.type === 'Town'){
          checkDestructablesInRegion(entity.origin, 400, true);
          let u = new Unit(Players[21], UNIT_IDS.demonSeer, 1000, entity.origin.x + 300, entity.origin.y + 300)
          let t = new Timer()
          
          u.color = PLAYER_COLOR_SNOW;

          u.issuePointOrder(OrderId.Attack, new Point(Math.cos(180*Math.random())*(GetCameraBoundMaxX() - 400) , Math.cos(180*Math.random())*(GetCameraBoundMaxY() - 400)));
          
          print("An Orcish Demon Seer is on the hunt...");
          
          //Every 20 seconds, order unit to change targeting direction
          t.start(20, true, () => {
            u.issuePointOrder(OrderId.Attack, new Point(Math.cos(180*Math.random())*(GetCameraBoundMaxX() - 400) , Math.cos(180*Math.random())*(GetCameraBoundMaxY() - 400)))
          });
          
          CreateMinimapIconOnUnit(u.handle, 255, 255, 255, 'UI\Minimap\MiniMap-Boss.mdl', FOG_OF_WAR_VISIBLE );

          break;
        }
        
      }
}

