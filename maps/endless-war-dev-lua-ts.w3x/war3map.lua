gg_snd_PursuitTheme = ""
gg_snd_SargerasLaugh = nil
gg_snd_SargerasRoar = nil
gg_snd_FrostmourneChant1 = nil
gg_snd_TheHornOfCenarius = nil
gg_snd_CharmTarget1 = nil
function InitGlobals()
end

function InitSounds()
gg_snd_PursuitTheme = "PursuitTheme"
gg_snd_SargerasLaugh = CreateSound("Sound/Ambient/DoodadEffects/SargerasLaugh.flac", false, true, true, 0, 0, "DefaultEAXON")
SetSoundParamsFromLabel(gg_snd_SargerasLaugh, "SargerasLaugh")
SetSoundDuration(gg_snd_SargerasLaugh, 3326)
SetSoundVolume(gg_snd_SargerasLaugh, 127)
gg_snd_SargerasRoar = CreateSound("Sound/Ambient/DoodadEffects/SargerasRoar.flac", false, true, true, 0, 0, "DefaultEAXON")
SetSoundParamsFromLabel(gg_snd_SargerasRoar, "SargerasRoar")
SetSoundDuration(gg_snd_SargerasRoar, 4481)
SetSoundVolume(gg_snd_SargerasRoar, 127)
gg_snd_FrostmourneChant1 = CreateSound("Sound/Ambient/DoodadEffects/FrostmourneChant1.flac", false, false, false, 0, 0, "DefaultEAXON")
SetSoundParamsFromLabel(gg_snd_FrostmourneChant1, "FrostmourneChantSound")
SetSoundDuration(gg_snd_FrostmourneChant1, 5038)
SetSoundVolume(gg_snd_FrostmourneChant1, 100)
gg_snd_TheHornOfCenarius = CreateSound("Sound/Ambient/DoodadEffects/TheHornOfCenarius.flac", false, false, false, 0, 0, "DefaultEAXON")
SetSoundParamsFromLabel(gg_snd_TheHornOfCenarius, "HornOfCenariusSound")
SetSoundDuration(gg_snd_TheHornOfCenarius, 12120)
SetSoundVolume(gg_snd_TheHornOfCenarius, 127)
gg_snd_CharmTarget1 = CreateSound("Abilities/Spells/Items/AIco/CharmTarget1.flac", false, true, true, 0, 0, "SpellsEAX")
SetSoundParamsFromLabel(gg_snd_CharmTarget1, "Charm")
SetSoundDuration(gg_snd_CharmTarget1, 2681)
SetSoundVolume(gg_snd_CharmTarget1, 127)
end

function CreateNeutralPassive()
local p = Player(PLAYER_NEUTRAL_PASSIVE)
local u
local unitID
local t
local life

u = BlzCreateUnitWithSkin(p, FourCC("n00D"), -91.8, -393.6, 261.985, FourCC("n00D"))
u = BlzCreateUnitWithSkin(p, FourCC("U001"), 67.1, -402.6, 284.430, FourCC("U001"))
SetHeroLevel(u, 30, false)
SelectHeroSkill(u, FourCC("AUdc"))
SelectHeroSkill(u, FourCC("AUdc"))
SelectHeroSkill(u, FourCC("AUdc"))
SelectHeroSkill(u, FourCC("ANrf"))
SelectHeroSkill(u, FourCC("ANrf"))
SelectHeroSkill(u, FourCC("ANrf"))
SelectHeroSkill(u, FourCC("AHbn"))
SelectHeroSkill(u, FourCC("AHbn"))
SelectHeroSkill(u, FourCC("AHbn"))
SelectHeroSkill(u, FourCC("ANtm"))
u = BlzCreateUnitWithSkin(p, FourCC("Hblm"), 7146.3, 1551.4, 118.710, FourCC("Hblm"))
end

function CreatePlayerBuildings()
end

function CreatePlayerUnits()
end

function CreateAllUnits()
CreatePlayerBuildings()
CreateNeutralPassive()
CreatePlayerUnits()
end

function InitCustomPlayerSlots()
SetPlayerStartLocation(Player(0), 0)
ForcePlayerStartLocation(Player(0), 0)
SetPlayerColor(Player(0), ConvertPlayerColor(0))
SetPlayerRacePreference(Player(0), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(0), false)
SetPlayerController(Player(0), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(1), 1)
ForcePlayerStartLocation(Player(1), 1)
SetPlayerColor(Player(1), ConvertPlayerColor(1))
SetPlayerRacePreference(Player(1), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(1), false)
SetPlayerController(Player(1), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(2), 2)
ForcePlayerStartLocation(Player(2), 2)
SetPlayerColor(Player(2), ConvertPlayerColor(2))
SetPlayerRacePreference(Player(2), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(2), false)
SetPlayerController(Player(2), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(3), 3)
ForcePlayerStartLocation(Player(3), 3)
SetPlayerColor(Player(3), ConvertPlayerColor(3))
SetPlayerRacePreference(Player(3), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(3), false)
SetPlayerController(Player(3), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(4), 4)
ForcePlayerStartLocation(Player(4), 4)
SetPlayerColor(Player(4), ConvertPlayerColor(4))
SetPlayerRacePreference(Player(4), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(4), false)
SetPlayerController(Player(4), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(5), 5)
ForcePlayerStartLocation(Player(5), 5)
SetPlayerColor(Player(5), ConvertPlayerColor(5))
SetPlayerRacePreference(Player(5), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(5), false)
SetPlayerController(Player(5), MAP_CONTROL_USER)
SetPlayerStartLocation(Player(9), 6)
ForcePlayerStartLocation(Player(9), 6)
SetPlayerColor(Player(9), ConvertPlayerColor(9))
SetPlayerRacePreference(Player(9), RACE_PREF_HUMAN)
SetPlayerRaceSelectable(Player(9), false)
SetPlayerController(Player(9), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(20), 7)
ForcePlayerStartLocation(Player(20), 7)
SetPlayerColor(Player(20), ConvertPlayerColor(20))
SetPlayerRacePreference(Player(20), RACE_PREF_UNDEAD)
SetPlayerRaceSelectable(Player(20), false)
SetPlayerController(Player(20), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(21), 8)
ForcePlayerStartLocation(Player(21), 8)
SetPlayerColor(Player(21), ConvertPlayerColor(21))
SetPlayerRacePreference(Player(21), RACE_PREF_ORC)
SetPlayerRaceSelectable(Player(21), false)
SetPlayerController(Player(21), MAP_CONTROL_COMPUTER)
SetPlayerStartLocation(Player(22), 9)
ForcePlayerStartLocation(Player(22), 9)
SetPlayerColor(Player(22), ConvertPlayerColor(22))
SetPlayerRacePreference(Player(22), RACE_PREF_NIGHTELF)
SetPlayerRaceSelectable(Player(22), false)
SetPlayerController(Player(22), MAP_CONTROL_COMPUTER)
end

function InitCustomTeams()
SetPlayerTeam(Player(0), 0)
SetPlayerTeam(Player(1), 0)
SetPlayerTeam(Player(2), 0)
SetPlayerTeam(Player(3), 0)
SetPlayerTeam(Player(4), 0)
SetPlayerTeam(Player(5), 0)
SetPlayerAllianceStateAllyBJ(Player(0), Player(1), true)
SetPlayerAllianceStateAllyBJ(Player(0), Player(2), true)
SetPlayerAllianceStateAllyBJ(Player(0), Player(3), true)
SetPlayerAllianceStateAllyBJ(Player(0), Player(4), true)
SetPlayerAllianceStateAllyBJ(Player(0), Player(5), true)
SetPlayerAllianceStateAllyBJ(Player(1), Player(0), true)
SetPlayerAllianceStateAllyBJ(Player(1), Player(2), true)
SetPlayerAllianceStateAllyBJ(Player(1), Player(3), true)
SetPlayerAllianceStateAllyBJ(Player(1), Player(4), true)
SetPlayerAllianceStateAllyBJ(Player(1), Player(5), true)
SetPlayerAllianceStateAllyBJ(Player(2), Player(0), true)
SetPlayerAllianceStateAllyBJ(Player(2), Player(1), true)
SetPlayerAllianceStateAllyBJ(Player(2), Player(3), true)
SetPlayerAllianceStateAllyBJ(Player(2), Player(4), true)
SetPlayerAllianceStateAllyBJ(Player(2), Player(5), true)
SetPlayerAllianceStateAllyBJ(Player(3), Player(0), true)
SetPlayerAllianceStateAllyBJ(Player(3), Player(1), true)
SetPlayerAllianceStateAllyBJ(Player(3), Player(2), true)
SetPlayerAllianceStateAllyBJ(Player(3), Player(4), true)
SetPlayerAllianceStateAllyBJ(Player(3), Player(5), true)
SetPlayerAllianceStateAllyBJ(Player(4), Player(0), true)
SetPlayerAllianceStateAllyBJ(Player(4), Player(1), true)
SetPlayerAllianceStateAllyBJ(Player(4), Player(2), true)
SetPlayerAllianceStateAllyBJ(Player(4), Player(3), true)
SetPlayerAllianceStateAllyBJ(Player(4), Player(5), true)
SetPlayerAllianceStateAllyBJ(Player(5), Player(0), true)
SetPlayerAllianceStateAllyBJ(Player(5), Player(1), true)
SetPlayerAllianceStateAllyBJ(Player(5), Player(2), true)
SetPlayerAllianceStateAllyBJ(Player(5), Player(3), true)
SetPlayerAllianceStateAllyBJ(Player(5), Player(4), true)
SetPlayerAllianceStateVisionBJ(Player(0), Player(1), true)
SetPlayerAllianceStateVisionBJ(Player(0), Player(2), true)
SetPlayerAllianceStateVisionBJ(Player(0), Player(3), true)
SetPlayerAllianceStateVisionBJ(Player(0), Player(4), true)
SetPlayerAllianceStateVisionBJ(Player(0), Player(5), true)
SetPlayerAllianceStateVisionBJ(Player(1), Player(0), true)
SetPlayerAllianceStateVisionBJ(Player(1), Player(2), true)
SetPlayerAllianceStateVisionBJ(Player(1), Player(3), true)
SetPlayerAllianceStateVisionBJ(Player(1), Player(4), true)
SetPlayerAllianceStateVisionBJ(Player(1), Player(5), true)
SetPlayerAllianceStateVisionBJ(Player(2), Player(0), true)
SetPlayerAllianceStateVisionBJ(Player(2), Player(1), true)
SetPlayerAllianceStateVisionBJ(Player(2), Player(3), true)
SetPlayerAllianceStateVisionBJ(Player(2), Player(4), true)
SetPlayerAllianceStateVisionBJ(Player(2), Player(5), true)
SetPlayerAllianceStateVisionBJ(Player(3), Player(0), true)
SetPlayerAllianceStateVisionBJ(Player(3), Player(1), true)
SetPlayerAllianceStateVisionBJ(Player(3), Player(2), true)
SetPlayerAllianceStateVisionBJ(Player(3), Player(4), true)
SetPlayerAllianceStateVisionBJ(Player(3), Player(5), true)
SetPlayerAllianceStateVisionBJ(Player(4), Player(0), true)
SetPlayerAllianceStateVisionBJ(Player(4), Player(1), true)
SetPlayerAllianceStateVisionBJ(Player(4), Player(2), true)
SetPlayerAllianceStateVisionBJ(Player(4), Player(3), true)
SetPlayerAllianceStateVisionBJ(Player(4), Player(5), true)
SetPlayerAllianceStateVisionBJ(Player(5), Player(0), true)
SetPlayerAllianceStateVisionBJ(Player(5), Player(1), true)
SetPlayerAllianceStateVisionBJ(Player(5), Player(2), true)
SetPlayerAllianceStateVisionBJ(Player(5), Player(3), true)
SetPlayerAllianceStateVisionBJ(Player(5), Player(4), true)
SetPlayerTeam(Player(20), 1)
SetPlayerTeam(Player(21), 1)
SetPlayerAllianceStateAllyBJ(Player(20), Player(21), true)
SetPlayerAllianceStateAllyBJ(Player(21), Player(20), true)
SetPlayerAllianceStateVisionBJ(Player(20), Player(21), true)
SetPlayerAllianceStateVisionBJ(Player(21), Player(20), true)
SetPlayerTeam(Player(22), 2)
SetPlayerTeam(Player(9), 3)
end

function InitAllyPriorities()
SetStartLocPrioCount(0, 1)
SetStartLocPrio(0, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(1, 1)
SetStartLocPrio(1, 0, 0, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(2, 3)
SetStartLocPrio(2, 0, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(2, 1, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(2, 2, 5, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(3, 3)
SetStartLocPrio(3, 0, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(3, 1, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(3, 2, 5, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(4, 3)
SetStartLocPrio(4, 0, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(4, 1, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(4, 2, 5, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(5, 3)
SetStartLocPrio(5, 0, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(5, 1, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(5, 2, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(6, 6)
SetStartLocPrio(6, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(6, 1, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(6, 2, 3, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(6, 3, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(6, 4, 5, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(6, 5, 7, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(8, 2)
SetStartLocPrio(8, 0, 1, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(8, 1, 5, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrioCount(8, 5)
SetEnemyStartLocPrio(8, 0, 4, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(8, 1, 5, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(8, 2, 7, MAP_LOC_PRIO_HIGH)
SetEnemyStartLocPrio(8, 3, 9, MAP_LOC_PRIO_HIGH)
SetStartLocPrioCount(9, 4)
SetStartLocPrio(9, 0, 2, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(9, 1, 3, MAP_LOC_PRIO_LOW)
SetStartLocPrio(9, 2, 4, MAP_LOC_PRIO_HIGH)
SetStartLocPrio(9, 3, 5, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrioCount(9, 2)
SetEnemyStartLocPrio(9, 0, 2, MAP_LOC_PRIO_LOW)
SetEnemyStartLocPrio(9, 1, 4, MAP_LOC_PRIO_HIGH)
end

function main()
SetCameraBounds(-17664.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), -17920.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM), 17664.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), 17408.0 - GetCameraMargin(CAMERA_MARGIN_TOP), -17664.0 + GetCameraMargin(CAMERA_MARGIN_LEFT), 17408.0 - GetCameraMargin(CAMERA_MARGIN_TOP), 17664.0 - GetCameraMargin(CAMERA_MARGIN_RIGHT), -17920.0 + GetCameraMargin(CAMERA_MARGIN_BOTTOM))
SetDayNightModels("Environment\\DNC\\DNCLordaeron\\DNCLordaeronTerrain\\DNCLordaeronTerrain.mdl", "Environment\\DNC\\DNCLordaeron\\DNCLordaeronUnit\\DNCLordaeronUnit.mdl")
NewSoundEnvironment("Default")
SetAmbientDaySound("LordaeronSummerDay")
SetAmbientNightSound("LordaeronSummerNight")
SetMapMusic("Music", true, 0)
InitSounds()
CreateAllUnits()
InitBlizzard()
InitGlobals()
end

function config()
SetMapName("TRIGSTR_003")
SetMapDescription("TRIGSTR_005")
SetPlayers(10)
SetTeams(10)
SetGamePlacement(MAP_PLACEMENT_TEAMS_TOGETHER)
DefineStartLocation(0, 0.0, -64.0)
DefineStartLocation(1, 0.0, -64.0)
DefineStartLocation(2, 0.0, -64.0)
DefineStartLocation(3, 0.0, -64.0)
DefineStartLocation(4, 0.0, -64.0)
DefineStartLocation(5, 0.0, -64.0)
DefineStartLocation(6, 0.0, -64.0)
DefineStartLocation(7, 0.0, -64.0)
DefineStartLocation(8, 0.0, -64.0)
DefineStartLocation(9, 0.0, -64.0)
InitCustomPlayerSlots()
InitCustomTeams()
InitAllyPriorities()
end
