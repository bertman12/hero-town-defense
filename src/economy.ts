import { economyUnitSet } from './enums';
import { Group, Timer, Trigger } from 'w3ts';
import { Players } from "w3ts/globals";

export function initEconomy(){
    passiveIncomeSetup();
    giveTownGold();
}

function passiveIncomeSetup(){
    const timer = new Timer()
    timer.start(1, true, distributeGold)
}

function distributeGold(){
    Players.forEach(player => {
        player.setState(PLAYER_STATE_RESOURCE_GOLD, (player.getState(PLAYER_STATE_RESOURCE_GOLD) + 1));
    });  
}

/**
 * Gives gold based on number of towns owned.
 */
function giveTownGold(){
    let t = Timer.create();

    t.start(60, true, () => {
        Players.forEach(player => {
            let g = Group.create();
            let totalIncome = 0;
            let unitTypeIncomeTotal = new Map<string, number>();

            g?.enumUnitsOfPlayer(player, () => {
                let u = Group.getFilterUnit();
                
                economyUnitSet.forEach(obj => {
                    if(u && obj.code === u.typeId){
                        player.setState(PLAYER_STATE_RESOURCE_GOLD, (player.getState(PLAYER_STATE_RESOURCE_GOLD) + obj.income));
                        totalIncome += obj.income;

                        let currIncomeCount = unitTypeIncomeTotal.get(obj.alias) ?? 0; 
                        currIncomeCount += obj.income;

                        //Increment the count
                        unitTypeIncomeTotal.set(obj.alias, currIncomeCount++)
                    }
                });

                return true;
            });

            DisplayTextToPlayer(player.handle, 0, 0, '===== Income Report =====' );
            DisplayTextToPlayer(player.handle, 0, 0, `Total Income: ${totalIncome}` );
            unitTypeIncomeTotal.forEach((val, key) => {
                DisplayTextToPlayer(player.handle, 0, 0, `${key}: ${val}`);
            });
            DisplayTextToPlayer(player.handle, 0, 0, '=====================' );

        });
    });
}





