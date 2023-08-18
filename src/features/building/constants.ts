// LOCAL FILES
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// images & Images
import {
  building001ExteriorImage,
  building001InteriorImage,
  building001SketchImage,
  building002ExteriorImage,
  building002InteriorImage,
  building002SketchImage,
  building003ExteriorImage,
  building003InteriorImage,
  building003SketchImage,
  building004ExteriorImage,
  building004InteriorImage,
  building004SketchImage,
  building005ExteriorImage,
  building005InteriorImage,
  building005SketchImage,
  building006ExteriorImage,
  building006InteriorImage,
  building006SketchImage,
  building007ExteriorImage,
  building007InteriorImage,
  building007SketchImage,
  building008ExteriorImage,
  building008InteriorImage,
  building008SketchImage,
  building009ExteriorImage,
  building009InteriorImage,
  building009SketchImage,
  building010ExteriorImage,
  building010InteriorImage,
  building010SketchImage,
  building011ExteriorImage,
  building011InteriorImage,
  building011SketchImage,
  building012ExteriorImage,
  building012InteriorImage,
  building012SketchImage,
  building013ExteriorImage,
  building013InteriorImage,
  building013SketchImage,
  building014ExteriorImage,
  building014InteriorImage,
  building014SketchImage,
  building015ExteriorImage,
  building015InteriorImage,
  building015SketchImage,
  building016ExteriorImage,
  building016InteriorImage,
  building016SketchImage,
  building017ExteriorImage,
  building017InteriorImage,
  building017SketchImage,
  building018ExteriorImage,
  building018InteriorImage,
  building018SketchImage,
  building019ExteriorImage,
  building019InteriorImage,
  building019SketchImage,
  building020ExteriorImage,
  building020InteriorImage,
  building020SketchImage,
  building021ExteriorImage,
  building021InteriorImage,
  building021SketchImage,
  building022ExteriorImage,
  building022InteriorImage,
  building022SketchImage,
  building023ExteriorImage,
  building023InteriorImage,
  building023SketchImage,
  building024ExteriorImage,
  building024InteriorImage,
  building024SketchImage,
  building025ExteriorImage,
  building025InteriorImage,
  building025SketchImage,
  building026ExteriorImage,
  building026InteriorImage,
  building026SketchImage,
  building027ExteriorImage,
  building027InteriorImage,
  building027SketchImage,
  building028ExteriorImage,
  building028InteriorImage,
  building028SketchImage,
  building029ExteriorImage,
  building029InteriorImage,
  building029SketchImage,
  building030ExteriorImage,
  building030InteriorImage,
  building030SketchImage,
  buildingIcon,
} from "assets/building";
// Interfaces & Types
import type {
  Building,
  BuildingRequirements,
} from "features/building/types";
// Utility functions
import { getBuildingRequirements } from "features/building/utils";
import { getResources } from "features/resource/utils";

export const NO_BUILDING_REQUIREMENTS: BuildingRequirements = {
  tier: 1,
  buildingIds: [],
  villagerIds: [],
};

export const BUILDING_ID_CARTROGRAPHER = 36;
export const BUILDING_ID_MARKET = 42;

/** Reference object for all buildings in the game */
export const ID_TO_BUILDING: Record<number, Building> = {
  1: {
    id: 1,
    name: "Small Cottages",
    text: {
      preBuild:
        "New faces are joining the village almost every day now. It's time people had a proper place to live! A row of small cottages can be put together quickly if we all work together.",
      postBuild:
        "A few days of labour and you stand before small, but cosy and warm cottages. Much better than the tents and shelters people were using! People are sure to work harder with a good roof over their heads.",
    },
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1 }),
    buildResources: getResources({ Wood: -50, Stone: -50 }),
    buildTime: 14,
    repairResources: getResources({ Wood: -25, Stone: -25 }),
    repairTime: 7,
    images: {
      exterior: building001ExteriorImage,
      interior: building001InteriorImage,
      sketch: building001SketchImage,
    },
  },
  2: {
    id: 2,
    name: "Houses",
    text: {
      preBuild:
        "Well! A few weeks of planning and storing up some spare resources has flown by and now you can proudly welcome families from those cramped cottages and offer them a house worth being proud off.",
      postBuild:
        "They seem overjoyed and plans for decorating quickly overtake the conversations at dinner!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 2,
      buildingIds: [1],
    }),
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({ Wood: -100, Stone: -130 }),
    buildTime: 26,
    repairResources: getResources({ Wood: -50, Stone: -75 }),
    repairTime: 15,
    images: {
      exterior: building002ExteriorImage,
      interior: building002InteriorImage,
      sketch: building002SketchImage,
    },
  },
  3: {
    id: 3,
    name: "Manor House",
    text: {
      preBuild:
        "Providing for the people of the town worked extremely well in terms of housing. The only problem is you also need a suitable home! A few stern words with a passing foreman and plans are quickly arranged.",
      postBuild:
        "A matter of days and a swarm of helpful and grateful townspeople are putting together the finishing touches on your new Manor, as befits your station. Lovely!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 3,
      buildingIds: [2],
    }),
    gatherResources: getResources({ Wood: -1, Stone: -1, Iron: 1 }),
    buildResources: getResources({
      Wood: -300,
      Stone: -300,
      Iron: -100,
      Steel: -50,
    }),
    buildTime: 40,
    repairResources: getResources({
      Wood: -150,
      Stone: -150,
      Iron: -50,
      Steel: -25,
    }),
    repairTime: 20,
    images: {
      exterior: building003ExteriorImage,
      interior: building003InteriorImage,
      sketch: building003SketchImage,
    },
  },
  4: {
    id: 4,
    name: "Keep",
    text: {
      preBuild:
        "If war is to come to the valley and your siblings are to be brought to heel then we must be able to defend ourselves.",
      postBuild:
        "A true keep is quickly erected on your orders, rising over the highest hill in the town and displaying to all your martial might!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 4,
      buildingIds: [3],
    }),
    gatherResources: getResources({ Stone: -1, Iron: -1, Steel: 1 }),
    buildResources: getResources({
      Wood: -500,
      Stone: -500,
      Iron: -300,
      Steel: -200,
    }),
    buildTime: 50,
    repairResources: getResources({
      Wood: -250,
      Stone: -250,
      Iron: -150,
      Steel: -100,
    }),
    repairTime: 25,
    images: {
      exterior: building004ExteriorImage,
      interior: building004InteriorImage,
      sketch: building004SketchImage,
    },
  },
  5: {
    id: 5,
    name: "Priest's House",
    text: {
      preBuild:
        "With a priest safely ensconced in the town, they'll require somewhere to live which is a little more than a town house or cottage. After all, can't allow the mouthpiece of the gods to wash their laundry with the towns people! With a wry smile you commission the builders of the town to put together an appropriate dwelling for the priest, including a generous library of religious texts!",
      postBuild:
        "The priest is as excited as a child on midwinter's eve when you show them around the building!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 2,
      villagerIds: [10],
    }),
    gatherResources: getResources({ Wood: -1, Stone: 1 }),
    buildResources: getResources({
      Wood: -70,
      Stone: -70,
    }),
    buildTime: 30,
    repairResources: getResources({
      Wood: -35,
      Stone: -35,
    }),
    repairTime: 15,
    images: {
      exterior: building005ExteriorImage,
      interior: building005InteriorImage,
      sketch: building005SketchImage,
    },
  },
  6: {
    id: 6,
    name: "Chapel",
    text: {
      preBuild:
        "The people seem to be lacking something. Their hands are busy but their hearts seem no longer in it. You rack your brains for days before realising that the people need greater purpose, more structure, as well as daily drudgery. You rush to the house of the Priest and have them put together plans for a modest chapel.",
      postBuild:
        "It isn't long before you are inspecting the newly completed building. Wonderful work, this should help give your people purpose!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 3,
      buildingIds: [5],
    }),
    gatherResources: getResources({ Wood: -1, Stone: 1, Iron: 1 }),
    buildResources: getResources({
      Wood: -150,
      Stone: -150,
      Iron: -100,
    }),
    buildTime: 60,
    repairResources: getResources({
      Wood: -75,
      Stone: -75,
      Iron: -50,
    }),
    repairTime: 30,
    images: {
      exterior: building006ExteriorImage,
      interior: building006InteriorImage,
      sketch: building006SketchImage,
    },
  },
  7: {
    id: 7,
    name: "Church",
    text: {
      preBuild:
        "Mass each week seems more and more full. People are standing in the aisles and children scurry underfoot between the pews, blatantly ignoring the fine work of our priest. This won't stand, we need more than a simple chapel for a town of our size. It's time to consecrate a decent church to venerate the gods.",
      postBuild:
        "Several months later, you preside over the opening ceremony - laying the final brick in the doorway of the new church. What better occassion than the opening of a new church to hold a fete? The people will surely be better able to deliver their work for the town now that they can be sure their souls will be saved and the gods will smile upon them!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 4,
      buildingIds: [6],
    }),
    gatherResources: getResources({
      Wood: -1,
      Stone: 1,
      Iron: 1,
      Steel: 1,
    }),
    buildResources: getResources({
      Wood: -250,
      Stone: -250,
      Iron: -150,
      Steel: -100,
    }),
    buildTime: 90,
    repairResources: getResources({
      Wood: -125,
      Stone: -125,
      Iron: -75,
      Steel: -50,
    }),
    repairTime: 45,
    images: {
      exterior: building007ExteriorImage,
      interior: building007InteriorImage,
      sketch: building007SketchImage,
    },
  },
  8: {
    id: 8,
    name: "Monastery",
    text: {
      preBuild:
        "Mass is ever more popular among the growing townsfolk, and now with so many children still too young to work and too young to sit through classes we need a guiding hand in the village around the services at the church. One of our oldest priests has put forth an idea, both as a place for priests to slow down their lives and as a useful place for the children to be kept while their parent's work. A monastery built in the grounds of our fine Church would not only serve both purposes but also be a lovely place to brew beer! Let's do it!",
      postBuild:
        "It was a lot of hard work for our builders. Hundreds of blocks of stone were quarried and rolled through town in order to construct the huge monastery that now sits proudly alongside our church. The swelling faith of our populace is something to be proud of!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 5,
      buildingIds: [6],
    }),
    gatherResources: getResources({
      Wood: -1,
      Stone: -1,
      Iron: 1,
      Steel: 1,
      Mythril: 1,
    }),
    buildResources: getResources({
      Wood: -300,
      Stone: -300,
      Iron: -200,
      Steel: -200,
      Mythril: -100,
    }),
    buildTime: 130,
    repairResources: getResources({
      Wood: -150,
      Stone: -150,
      Iron: -100,
      Steel: -100,
      Mythril: -50,
    }),
    repairTime: 65,
    images: {
      exterior: building008ExteriorImage,
      interior: building008InteriorImage,
      sketch: building008SketchImage,
    },
  },
  9: {
    id: 9,
    name: "Temple",
    text: {
      preBuild:
        "One fine morning a petitioner stands at your office doorway. 'Monarch, it's a fine church we have, and the priest tries to honour as many gods as possible, but to be honest with you we need a place that can be more than a church. A place for offerings, healing the sick, and for the priests to be able to minister more actively to the people. Like the temples in the old cities!'. That's not a bad idea, if we have a chance of combat, our priests more actively ministering to the sick could be very useful. A temple it is!",
      postBuild:
        "The first of the sick and feeble petitioners climbs the steps to the temple, into the waiting healing hands of the priests. It's a beautiful sight, seeing your people taken care of in this fashion, knowing that ailments will be cured and the blind will see again through the power of the gods. Probably shouldn't have put so many steps up to the doors though. We'll add a ramp next week.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 5,
      buildingIds: [7],
    }),
    gatherResources: getResources({ Steel: 1, Amethyst: 1 }),
    buildResources: getResources({
      Wood: -350,
      Stone: -350,
      Iron: -250,
      Steel: -200,
      Mythril: -100,
    }),
    buildTime: 150,
    repairResources: getResources({
      Wood: -250,
      Stone: -250,
      Iron: -150,
      Steel: -100,
      Mythril: -50,
    }),
    repairTime: 75,
    images: {
      exterior: building009ExteriorImage,
      interior: building009InteriorImage,
      sketch: building009SketchImage,
    },
  },
  10: {
    id: 10,
    name: "Graveyard",
    text: {
      preBuild:
        "It is an inevitable part of our lives. The bonfires outside of the city cannot keep up with the funerals, and some of our gloried dead shouldn't return to the earth so soon. Some must be preserved and remembered in stone, to allow our town the time it needs to grieve and hope that heroes will rise again. A graveyard where rememberance can be properly honoured would suit, certainly.",
      postBuild:
        "It was a huge undertaking. The ground had to be cleared, the headstones carved, the walls built, gates of iron and spells of peace cast around the hallowed ground to stop the dead rising. But at long last it is finally done, and our temple quarter is complete. Hope rises among the people, that although some may be lost, they will be remembered and honoured for time immemorial.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 5,
      buildingIds: [9],
    }),
    gatherResources: getResources({ Iron: 1, Mythril: 1 }),
    buildResources: getResources({
      Wood: -400,
      Stone: -400,
      Iron: -200,
      Steel: -200,
      Mythril: -100,
    }),
    buildTime: 200,
    repairResources: getResources({
      Wood: -200,
      Stone: -200,
      Iron: -100,
      Steel: -100,
      Mythril: -50,
    }),
    repairTime: 100,
    images: {
      exterior: building010ExteriorImage,
      interior: building010InteriorImage,
      sketch: building010SketchImage,
    },
  },
  11: {
    id: 11,
    name: "Grain Field",
    text: {
      preBuild:
        "The sun beats down as you inspect the area outlined by rough stakes. Surely this will be enough land, our people need vittles and our small vegetable patches are not filling bellies any longer. These few hectares will grow sufficient grain to keep our nascent town full of bread and beer for several seasons at least, giving us a foothold we sorely need in this valley.",
      postBuild:
        "Several long afternoons in the sun and the ground is turned, rocks have been removed and the land stands surrounded by a simple but effective stone wall. It's time for planting!",
    },
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({
      Wood: -35,
      Stone: -100,
    }),
    buildTime: 10,
    repairResources: getResources({
      Wood: -15,
      Stone: -50,
    }),
    repairTime: 5,
    images: {
      exterior: building011ExteriorImage,
      interior: building011InteriorImage,
      sketch: building011SketchImage,
    },
  },
  12: {
    id: 12,
    name: "Mill",
    text: {
      preBuild:
        "Food is becoming an issue in the town. Enough is grown but the speed of processing leaves much to be desired, and leaves much rotting in the fields! If you could make the food last longer it would be much easier to steady the food supply. Nothing for it but to order a Mill built so we can properly process the crops.",
      postBuild:
        "No more than a week later you hear the creak and crack of the great sails of the Mill turning for the first time in the wind. Excellent! On to the next crisis!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 2,
      buildingIds: [11],
    }),
    gatherResources: getResources({ Wood: 1, Stone: 1, Iron: 1 }),
    buildResources: getResources({
      Wood: -150,
      Stone: -250,
      Iron: -35,
    }),
    buildTime: 20,
    repairResources: getResources({
      Wood: -75,
      Stone: -125,
      Iron: -15,
    }),
    repairTime: 10,
    images: {
      exterior: building012ExteriorImage,
      interior: building012InteriorImage,
      sketch: building012SketchImage,
    },
  },
  13: {
    id: 13,
    name: "Bakery",
    text: {
      preBuild:
        "Walking home after a day of gathering resources you are led by your nose down a path you normally would not take. A scintilating smell pulls you along until you stop at a pie and a loaf of spiced bread cooling on a window sill. You are just about to take a bite of fruit pie when a firm smack with a rolling pin brings you to your senses. 'You listen here, king or not, you ask when you want a slice of my pie! If you want I'd be happy to make you your own, I'll make as many as the town needs but manners cost nothing!' Utterly ashamed and now utterly starving you rush to order a bakery put together for this fine woman so she can supply her treats to the whole town.",
      postBuild:
        "Days later you stand before a new bakery, eagerly awaiting your first pie!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 2,
      buildingIds: [12],
    }),
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({
      Wood: -60,
      Stone: -40,
    }),
    buildTime: 8,
    repairResources: getResources({
      Wood: -30,
      Stone: -20,
    }),
    repairTime: 4,
    images: {
      exterior: building013ExteriorImage,
      interior: building013InteriorImage,
      sketch: building013SketchImage,
    },
  },
  14: {
    id: 14,
    name: "Granary",
    text: {
      preBuild:
        "The bakery you ordered built has kept the people happy and pudgy, especially you and your quickly growing waist! Clearly though, it's not enough - this morning there was no bread or pie! The baker said that although we have plenty of grain in the fields and the Mill is working overtime, moving so much grain around the town is becoming an issue. We need a central granary to simplify it and allow grain to all who need it.",
      postBuild:
        "The new granary rises over the rooftops surrounding it and shines brightly in the morning sun. Beautiful, well organised and full of delicious grain ready to be turned into even more delicious cakes and pies! Wonderful!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 3,
      buildingIds: [13],
    }),
    gatherResources: getResources({ Iron: 1 }),
    buildResources: getResources({
      Wood: -100,
      Stone: -80,
      Iron: -20,
    }),
    buildTime: 16,
    repairResources: getResources({
      Wood: -50,
      Stone: -40,
      Iron: -10,
    }),
    repairTime: 8,
    images: {
      exterior: building014ExteriorImage,
      interior: building014InteriorImage,
      sketch: building014SketchImage,
    },
  },
  15: {
    id: 15,
    name: "Town Square",
    text: {
      preBuild:
        "As a fifteenth person tries to squeeze into your little office for a meeting, the rest shuffling and sneezing, you lose patience with this. \"Right! We're building up the town square, it's time for a proper meeting place where we can address the whole village at once! No other business until that ground is flattened, paved and ready for a stage!\"",
      postBuild:
        "It's only a short time later that you stand atop the stage and look out over the several hundred people who now call this town home. How quickly it's all happened! Stepping over to the centre of the stage you call, \"My good people! I happily declare this town square open and ready for use! Now, the first order of business...\"",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 2 }),
    gatherResources: getResources({ Stone: 1 }),
    buildResources: getResources({ Wood: -20, Stone: -90 }),
    buildTime: 10,
    repairResources: getResources({ Wood: -10, Stone: -45 }),
    repairTime: 5,
    images: {
      exterior: building015ExteriorImage,
      interior: building015InteriorImage,
      sketch: building015SketchImage,
    },
  },
  16: {
    id: 16,
    name: "Town Hall",
    text: {
      preBuild:
        'The muttering of the ground grows louder and you can barely hear what is being said by your council on stage in the town square. "Quiet!", you roar for the tenth time. Damn it, how loud three hundred whispers can be. You stand, forestalling the next comment from your council. "We must have a Town Hall. To register the births and deaths of this fine town, and as a place for the business of the town to be conducted in good order". You stride off, already shouting at nearby builders.',
      postBuild:
        "Ah, the smell of a ceremonial ribbon. Nothing like it. With a deft flick of your scissors, you declare the new town hall open and ready for business. The waiting crowd seems more bemused than happy, but they clap politely nonetheless.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 4,
      buildingIds: [15],
    }),
    gatherResources: getResources({ Iron: 1 }),
    buildResources: getResources({
      Wood: -100,
      Stone: -100,
      Iron: -100,
      Steel: -100,
    }),
    buildTime: 40,
    repairResources: getResources({
      Wood: -50,
      Stone: -50,
      Iron: -50,
      Steel: -50,
    }),
    repairTime: 20,
    images: {
      exterior: building016ExteriorImage,
      interior: building016InteriorImage,
      sketch: building016SketchImage,
    },
  },
  17: {
    id: 17,
    name: "Mint",
    text: {
      preBuild:
        "Opening the window to your office in the town hall, you are immediately assaulted by the roar of trade in the marketplace nearby. Not a bad roar, to hear so much active trade but it doesn't half give you a headache. Listening carefully, most of the shouting seems to be people setting terms and arguing over what they will trade in. We should standardise and introduce a proper coinage, not only is it good for our nacsent nation but it's good for your ears!",
      postBuild:
        "The mint is finally done. It's a quiet building full of artisans of metal carefully printing, stamping and chipping away at precious gold to make fine coins bearing your royal visage.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 5,
      buildingIds: [16],
    }),
    gatherResources: getResources({ Steel: 1 }),
    buildResources: getResources({
      Wood: -200,
      Stone: -200,
      Iron: -200,
      Steel: -200,
    }),
    buildTime: 80,
    repairResources: getResources({
      Wood: -100,
      Stone: -100,
      Iron: -100,
      Steel: -100,
    }),
    repairTime: 40,
    images: {
      exterior: building017ExteriorImage,
      interior: building017InteriorImage,
      sketch: building017SketchImage,
    },
  },
  18: {
    id: 18,
    name: "Bank",
    text: {
      preBuild:
        "A heavy clink rips you from your train of thought. Another bag of gold landing on the table. It's good that the people have taken so enthusiastically to your currency, but the sheer weight of some purses has people employing others simply to carry their wealth around! We need a place to store all of this gold, a central bank. With the smile of a shark you order for the builders to attend. You've got a plan...",
      postBuild:
        "A sunny day shines down as barrow after barrow of glistening coin is wheeled carefully into the newly finished bank. The money lenders are setting up shop nearby and the economy of the town is sure to ramp up now.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 5,
      buildingIds: [17],
    }),
    gatherResources: getResources({
      Iron: 1,
      Steel: 1,
      Mythril: 1,
      Amethyst: 1,
    }),
    buildResources: getResources({
      Wood: -400,
      Stone: -400,
      Iron: -400,
      Steel: -400,
      Mythril: -400,
    }),
    buildTime: 100,
    repairResources: getResources({
      Wood: -200,
      Stone: -200,
      Iron: -200,
      Steel: -200,
      Mythril: -200,
    }),
    repairTime: 50,
    images: {
      exterior: building018ExteriorImage,
      interior: building018InteriorImage,
      sketch: building018SketchImage,
    },
  },
  19: {
    id: 19,
    name: "Blacksmith",
    text: {
      preBuild: "",
      postBuild:
        "Proudly, you stand back in the cart track and look up at the new smithy. It's a fine building and will help produce excellent tools to gather the resources hidden in this lush valley.",
    },
    canBuild: false,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1, Stone: 1 }),
    buildResources: getResources({ Wood: -80, Stone: -90 }),
    buildTime: 25,
    repairResources: getResources({ Wood: -40, Stone: -45 }),
    repairTime: 15,
    images: {
      exterior: building019ExteriorImage,
      interior: building019InteriorImage,
      sketch: building019SketchImage,
    },
  },
  20: {
    id: 20,
    name: "Charcoal Maker",
    text: {
      preBuild:
        "A bang on the door rouses you from a peaceful slumber by the fire. Groggily you answer and are accosted by the smith! 'M'lord, it's no bloody good! We need better fuel if we're to keep up production - we're just going through too much wood!' Before a response can rise to your lips the smith is gone, returned to the wind and the night as quickly as they arrived.",
      postBuild:
        "Right-o, then! I've seen smoke over the trees near the far fields, tomorrow a guard is being sent to recruit those bloody charcoal makers and have them send their goods to town. Maybe then people around here will be able to sleep in peace!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 2,
      buildingIds: [19],
    }),
    gatherResources: getResources({ Wood: 1 }),
    buildResources: getResources({
      Wood: -50,
      Stone: -20,
      Iron: -5,
    }),
    buildTime: 5,
    repairResources: getResources({
      Wood: -25,
      Stone: -10,
      Iron: -3,
    }),
    repairTime: 2,
    images: {
      exterior: building020ExteriorImage,
      interior: building020InteriorImage,
      sketch: building020SketchImage,
    },
  },
  21: {
    id: 21,
    name: "Woodcutter",
    text: {
      preBuild:
        "The smell of fresh pine sap and drying racks of wood fills the air. With a smile and a huge noseful of the pleasant scent you check on the work of the Woodcutter. ",
      postBuild:
        "Quickly realising much more has been done than you thought you are presented with a large and industrious wood cutting shop - full of the tools and space needed to efficiently increase production in your burgeoning town!",
    },
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: getResources({ Wood: 1 }),
    buildResources: getResources({ Wood: -100, Stone: -100 }),
    buildTime: 10,
    repairResources: getResources({ Wood: -50, Stone: -50 }),
    repairTime: 5,
    images: {
      exterior: building021ExteriorImage,
      interior: building021InteriorImage,
      sketch: building021SketchImage,
    },
  },
  22: {
    id: 22,
    name: "Sawmill",
    text: {
      preBuild:
        "Walking down the street you are stopped in your tracks by pallet after pallet of raw wood and felled trees blocking your way. What is the meaning of this? Curiously you enter the nearby woodcutter's and ask what has happened. \"We can't keep up!\" comes the hasty reply before the apprentice scurries off to process another tree. Hmm, this won't do. Perhaps a full sawmill outside of the town will be better?",
      postBuild:
        "A veritable forest of industry surrounds you as you stand amid the roaring of sawblades, processing felled trees deftly and quickly. And importantly, not doing so inside the town any longer!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 3,
      buildingIds: [21],
    }),
    gatherResources: getResources({ Wood: 5 }),
    buildResources: getResources({
      Wood: -300,
      Stone: -100,
      Iron: -50,
    }),
    buildTime: 50,
    repairResources: getResources({
      Wood: -150,
      Stone: -50,
      Iron: -25,
    }),
    repairTime: 25,
    images: {
      exterior: building022ExteriorImage,
      interior: building022InteriorImage,
      sketch: building022SketchImage,
    },
  },
  23: {
    id: 23,
    name: "Fishery",
    text: {
      preBuild:
        "Gods! What a day in the village! The sun is high in the sky, and the waters are crystal clear in the river. Abundance surrounds you, and you notice for the first time that the number of fat slow fish in the river has increased steadily in your time here. Thoughts of fried fish on your mind you have a word with one of the lads nearby and send them running to fetch the builders. A proper fishery will help us take advantage of the blessings the gods of water have sent. And think of all the delicious fish!",
      postBuild:
        "Belly full and mouth greasy, you look at the crowd surrounding the new fishery. Happy, smiling faces everywhere you look! Another success!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 2 }),
    gatherResources: getResources({ Wood: 1, Stone: 1, Iron: 1 }),
    buildResources: getResources({
      Wood: -100,
      Stone: -50,
      Iron: -50,
    }),
    buildTime: 13,
    repairResources: getResources({
      Wood: -50,
      Stone: -25,
      Iron: -25,
    }),
    repairTime: 7,
    images: {
      exterior: building023ExteriorImage,
      interior: building023InteriorImage,
      sketch: building023SketchImage,
    },
  },
  24: {
    id: 24,
    name: "Brewery",
    text: {
      preBuild:
        "Small-scale brewing has been keeping the village watered for some time now, but a growing complaint among the people is the lack of variety and quantitiy of beverage. You have to agree, beer after beer is very repetitive, especially after a hard day at the quarry or the iron mine! You call for a builder and ask what it would take to put together a proper brewery. With a shy smile, the brewer informs you that work has already begun! Monarchs may command everything around them it seems, as long as the beer flows freely.",
      postBuild:
        "Before you know it the brewery is rolling out the first barrels of beer, cider, wine and schnapps. A very merry opening day was had by all, and the free alcohol did not hurt proceedings!",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: getResources({ Wood: 1, Stone: 1, Iron: 1 }),
    buildResources: getResources({
      Wood: -200,
      Stone: -200,
      Iron: -200,
    }),
    buildTime: 50,
    repairResources: getResources({
      Wood: -100,
      Stone: -100,
      Iron: -100,
    }),
    repairTime: 25,
    images: {
      exterior: building024ExteriorImage,
      interior: building024InteriorImage,
      sketch: building024SketchImage,
    },
  },
  25: {
    id: 25,
    name: "Mason",
    text: {
      preBuild:
        "The freshly trod dirt roads outlining the beating thoroughfares of your town are extremely cluttered. What you assumed to be gravel paths turns out to simply be chips and offcuts from the quarrymen! Two stubbed toes and a curse later you march into the stone yard and order a proper masons be built forthwith! ",
      postBuild:
        "The masons have been hard at work and, eager not to rouse your anger again, have carved themselves a fantastic workshop made of fine stone. They quickly and happily point out to you the deep offcut pits they have built for all of the spoilt bits of rock. Excellent.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: getResources({ Wood: -1, Stone: 10 }),
    buildResources: getResources({ Wood: -100, Stone: -500 }),
    buildTime: 50,
    repairResources: getResources({ Wood: -50, Stone: -250 }),
    repairTime: 25,
    images: {
      exterior: building025ExteriorImage,
      interior: building025InteriorImage,
      sketch: building025SketchImage,
    },
  },
  26: {
    id: 26,
    name: "Orchard",
    text: {
      preBuild:
        "The village lacks the vibrant abundance of fruit trees, leaving its residents longing for the taste of nature's sweet harvest. An orchard, with its bountiful array of apple, pear, and cherry trees, would bring color to the landscape and provide a vital source of nourishment. It would be a sanctuary where families gather, children play, and the fragrance of blossoms intermingles with the whispers of a community's dreams.",
      postBuild:
        "Within the village, a newfound sense of vibrancy and abundance fills the air. The once barren landscape has transformed into a flourishing orchard, bursting with life and color. Lush apple, pear, and cherry trees stand tall, their branches heavy with ripe fruits. The village now enjoys a bounty of nourishment and sustenance, bringing joy to the faces of its residents. Families gather beneath the shade of the trees, sharing laughter and stories as they savor the sweetness of nature's gifts. The orchard has become the heart of the community, a sanctuary of serenity and prosperity that uplifts the spirits of all who dwell within its embrace.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: building026ExteriorImage,
      interior: building026InteriorImage,
      sketch: building026SketchImage,
    },
  },
  27: {
    id: 27,
    name: "Barn",
    text: {
      preBuild:
        "In the heart of the village, a collective yearning for a shelter for their precious livestock and harvested crops echoes through the air. With each passing day, the need for a sturdy barn grows more evident. The village lacks a central space to store their provisions, protect their animals, and gather during inclement weather. The desire for a barn becomes a shared dream, where animals find refuge, bountiful harvests are preserved, and community bonds are strengthened. With the construction of a barn, the village would gain a symbol of resilience and unity, providing the foundation for their sustenance and prosperity.",
      postBuild:
        "Within the village, a sense of fulfillment and security emanates from the recently constructed barn. Its sturdy beams and thatched roof stand as a testament to the hard work and collective effort of the villagers. The barn is now a bustling hub of activity, with livestock finding shelter within its protective walls and bales of harvested crops neatly stored. Villagers gather within its warm confines, sharing stories and enjoying the fruits of their labor. The barn has become the heart of the community, providing a tangible symbol of abundance and resilience, ensuring a prosperous future for all who call the village home.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 2 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: building027ExteriorImage,
      interior: building027InteriorImage,
      sketch: building027SketchImage,
    },
  },
  28: {
    id: 28,
    name: "Tavern",
    text: {
      preBuild:
        "Nestled at the heart of the town, an unspoken longing emerges for a haven where laughter and camaraderie can flow freely, where weary travelers and locals alike can find solace. As days turn into nights, the absence of a welcoming tavern becomes increasingly apparent. The town lacks a central space to share stories, raise mugs in celebration, and seek refuge from the stormy weather. The yearning for a tavern evolves into a collective aspiration, a place where strangers become friends, and the spirit of the community finds its voice. With the establishment of a tavern, the town would gain a symbol of conviviality and togetherness, forming the cornerstone of their shared memories and prosperity.",
      postBuild:
        "Now standing proudly within the town, the newly erected tavern emanates an aura of contentment and belonging. Its rustic charm and welcoming facade stand as a tribute to the dedication and unity of the townspeople. The tavern hums with life, offering a haven for travelers to rest and locals to share tales. The interior is alive with the clink of glasses and the aroma of hearty meals, fostering an atmosphere of shared experiences and conviviality. The tavern has seamlessly woven itself into the fabric of the community, a tangible embodiment of unity and celebration, ensuring a harmonious future for all who consider the town their home.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: building028ExteriorImage,
      interior: building028InteriorImage,
      sketch: building028SketchImage,
    },
  },
  29: {
    id: 29,
    name: "Pasture",
    text: {
      preBuild:
        "Stretching across the outskirts of the hamlet, an unspoken yearning emerges for a lush expanse where animals can graze freely, and nature's beauty can unfold undisturbed. With each sunrise and sunset, the absence of a serene pasture becomes more palpable. The hamlet lacks a central space for livestock to roam, for nature to thrive, and for the community to gather in harmony with the land. The longing for a peaceful pasture evolves into a shared dream, a place where animals find nourishment, and townspeople find tranquility, strengthening their connection to the earth. With the creation of a pasture, the hamlet would embrace a symbol of nature's bounty and unity, forming the bedrock of their sustainable coexistence.",
      postBuild:
        "Embodied on the fringes of the hamlet, the newly established pasture exudes an air of serenity and vitality. Its sprawling grasses and gentle slopes stand as a tribute to the collective dedication and stewardship of the hamlet's residents. The pasture comes alive with the gentle movements of grazing animals and the whispers of the wind through the fields. Townspeople come to witness the harmonious dance of nature and connect with the land that sustains them. The pasture has seamlessly integrated itself into the fabric of the community, a living emblem of balance and symbiosis, ensuring a flourishing future for all who share a bond with the hamlet's landscapes.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 4 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: building029ExteriorImage,
      interior: building029InteriorImage,
      sketch: building029SketchImage,
    },
  },
  30: {
    id: 30,
    name: "Alchemist",
    text: {
      preBuild:
        "Hidden within the labyrinthine alleys of the city, a silent yearning takes shape for a haven where ancient knowledge and mystical concoctions can intertwine, where seekers of the arcane can quench their thirst for enlightenment. With each moon's cycle, the absence of a dedicated alchemist's abode becomes more apparent. The city lacks a central space for the curious minds to gather, for experiments to unfold, and for the secrets of the universe to be unraveled. The yearning for an alchemist's sanctum evolves into a shared vision, a place where potions bubble, and ancient texts whisper, forging a bond between the enigmatic and the inquisitive. Through the establishment of an alchemist's domain, the city would embrace a symbol of enlightenment and unity, laying the foundation for their journey into the realms of the unknown.",
      postBuild:
        "Nestled within the enigmatic quarter of the city, the newly founded alchemist's sanctum emanates an aura of mystery and discovery. Its ornate furnishings and shelves laden with rare ingredients stand as a testament to the tireless pursuit of knowledge by the city's alchemists. The sanctum hums with the energy of transformative experiments and the soft glow of alchemical apparatus. Seekers of wisdom and novices alike find themselves drawn to its allure, engaging in discussions that bridge the gap between science and magic. The alchemist's sanctum has seamlessly woven itself into the fabric of the city's consciousness, an emblem of exploration and innovation, ensuring a boundless future for all who dare to venture into the realm of the unknown.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: building030ExteriorImage,
      interior: building030InteriorImage,
      sketch: building030SketchImage,
    },
  },
  31: {
    id: 31,
    name: "Armoury",
    text: {
      preBuild:
        "Nestled at the heart of the fortress town, an unspoken yearning emerges for a bastion where the clank of steel and the art of warfare can merge, where defenders of the realm can hone their skills and find the tools of protection. With each passing battle, the absence of a dedicated armoury becomes increasingly pronounced. The town lacks a central space for weapons to be forged, for strategies to be planned, and for warriors to forge unbreakable bonds. The yearning for an armoury evolves into a shared aspiration, a place where blades gleam and shields stand ready, uniting the martial and the strategic. With the establishment of an armoury, the town would embrace a symbol of strength and unity, laying the groundwork for their defense and prosperity.",
      postBuild:
        "Towering within the fortress town, the newly erected armoury exudes an air of resilience and preparation. Its robust walls and racks of meticulously crafted weapons stand as a testament to the dedication and courage of the town's defenders. The armoury buzzes with activity as weapons are sharpened, armor is fitted, and battle strategies are discussed. Warriors, veterans, and aspiring guardians gather within its walls, sharing stories of valor and preparing to face the challenges that lie ahead. The armoury has seamlessly integrated itself into the fabric of the town's identity, an emblem of fortitude and camaraderie, ensuring a secure future for all who stand united within its walls.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 4 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  32: {
    id: 32,
    name: "Aviary",
    text: {
      preBuild:
        "Tucked away amidst the lush gardens of the estate, a silent longing takes flight for a sanctuary where vibrant plumes and melodious tunes can harmonize, where the beauty of avian creatures can be celebrated and protected. With each dawn's chorus, the absence of a dedicated aviary becomes more evident. The estate lacks a central space for exotic birds to spread their wings, for bird enthusiasts to commune, and for nature's melodies to fill the air. The yearning for an aviary evolves into a collective dream, a place where vibrant feathers catch the sunlight and songs echo through the foliage, bridging the realm of humans and winged creatures. Through the creation of an aviary, the estate would embrace a symbol of beauty and unity, nurturing a haven for both the avian world and those who admire it.",
      postBuild:
        "Nestled within the blooming oasis of the estate, the newly established aviary radiates an air of wonder and tranquility. Its intricately designed enclosures and lush foliage stand as a testament to the dedication and passion of the estate's caretakers. The aviary comes alive with the kaleidoscope of colors as exotic birds flit through the branches and serenade the visitors with their enchanting songs. Enthusiasts and curious souls alike find themselves drawn to this haven, sharing moments of awe and connection with the natural world. The aviary has seamlessly woven itself into the fabric of the estate's serenity, an emblem of biodiversity and harmony, ensuring a vibrant future for all who seek solace and inspiration in the company of feathered friends.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  33: {
    id: 33,
    name: "Barracks",
    text: {
      preBuild:
        "Enveloped within the heart of the military compound, an unspoken yearning emerges for a stronghold where discipline and camaraderie can meld seamlessly, where soldiers can find respite and sharpen their skills. With each training session and duty rotation, the absence of a dedicated barracks becomes increasingly palpable. The compound lacks a central space for soldiers to rest, for strategies to be discussed, and for the bonds of brotherhood to strengthen. The yearning for a barracks evolves into a shared vision, a place where armor can be donned, strategies can be refined, and the unity of the troops can be solidified. Through the establishment of a barracks, the compound would embrace a symbol of resilience and unity, fortifying the foundation of their defense and triumphs.",
      postBuild:
        "Rising proudly within the heart of the military compound, the newly constructed barracks exudes an aura of discipline and readiness. Its sturdy architecture and orderly bunks stand as a tribute to the dedication and valor of the soldiers who serve. The barracks hums with the camaraderie of soldiers in training and veterans swapping tales of battle. Within its walls, soldiers find rest, regroup, and forge unbreakable bonds that transcend the battlefield. The barracks has seamlessly integrated itself into the essence of the compound, an emblem of strength and collaboration, ensuring a steadfast future for all who stand united in the face of adversity.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 4 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  34: {
    id: 34,
    name: "Boathouse",
    text: {
      preBuild:
        "Nestled beside the tranquil waters of the lake, a subtle yearning emerges for a sanctuary where the dance of ripples and the call of the water can harmonize, where boats can find refuge, and sailors can prepare for their aquatic journeys. With each gentle breeze and shimmering reflection, the absence of a dedicated boathouse becomes increasingly noticeable. The lakeside lacks a central space for boats to be sheltered, for maritime tales to be shared, and for the connection between land and water to be nurtured. The yearning for a boathouse transforms into a collective dream, a place where vessels can rest upon calm waters and adventurers can chart their courses, weaving tales between the waves and the shoreline. Through the establishment of a boathouse, the lakeside would embrace a symbol of exploration and unity, fostering a haven for both the aquatic and the adventurous",
      postBuild:
        "Standing gracefully along the water's edge, the newly constructed boathouse exudes an air of maritime harmony and readiness. Its sturdy pillars and spacious docks stand as a testament to the dedication and passion of the lakeside's sailors and enthusiasts. The boathouse buzzes with activity as boats are secured, fishing gear is organized, and tales of aquatic escapades are recounted. Sailors, anglers, and nature enthusiasts gather within its shelter, sharing moments of tranquility and connection with the rhythmic tides. The boathouse has seamlessly melded with the essence of the lakeside, an emblem of serenity and aquatic camaraderie, ensuring a vibrant future for all who seek solace and adventure in the embrace of the water's embrace.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  35: {
    id: 35,
    name: "Carpenter",
    text: {
      preBuild:
        "Deep within the heart of the bustling town, a quiet yearning takes form for a haven where timber's embrace and skilled craftsmanship can intertwine, where the art of woodworking can thrive, and where the community can witness the birth of functional art. With each sunrise and the echo of hammers, the absence of a dedicated carpenter's workshop becomes increasingly apparent. The town lacks a central space for wood to be shaped, for creations to be born, and for aspiring artisans to learn from the seasoned hands. The yearning for a carpenter's haven evolves into a shared aspiration, a place where creativity takes root, and where the town's essence is carved into each piece. With the establishment of a carpenter's workshop, the town would embrace a symbol of ingenuity and unity, laying the foundation for their aesthetic and functional prosperity.",
      postBuild:
        "Nestled at the crossroads of craftsmanship and community, the newly opened carpenter's workshop exudes an aura of creativity and dedication. Its sturdy workbenches and aromatic stacks of lumber stand as a testament to the meticulousness and passion of the town's woodworkers. The workshop hums with the rhythm of saws and the melody of chisels carving intricate patterns. Seasoned carpenters and novice artisans gather within its walls, sharing techniques, tales of projects completed, and aspirations for future creations. The carpenter's workshop has seamlessly become woven into the fabric of the town's identity, an emblem of artistry and collaboration, ensuring a thriving future for all who find inspiration in the dance between timber and talent.",
    },
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  [BUILDING_ID_CARTROGRAPHER]: {
    id: BUILDING_ID_CARTROGRAPHER,
    name: "Cartographer",
    text: {
      preBuild:
        "Amidst the parchment-filled chambers of the learning institute, a silent yearning takes shape for a haven where imagination and geography can intertwine, where uncharted lands can be explored with ink and quill, and where the world's mysteries can be unveiled. With each compass needle's swing and the unfurling of maps, the absence of a dedicated cartographer's studio becomes more evident. The institute lacks a central space for maps to be meticulously crafted, for explorers to plan their journeys, and for the curious to be guided through the tapestry of the world. The yearning for a cartographer's haven evolves into a shared dream, a place where terrains take shape beneath skilled hands, and the wonders of distant shores come to life. Through the establishment of a cartographer's studio, the institute would embrace a symbol of discovery and unity, fostering a connection between the curious and the compass.",
      postBuild:
        "Perched at the intersection of knowledge and exploration, the newly inaugurated cartographer's studio exudes an air of discovery and meticulousness. Its walls adorned with intricate maps and shelves laden with atlases stand as a tribute to the dedication and curiosity of the institute's cartographers. The studio hums with the scratch of pens and the rustle of paper as cartographers bring to life lands both known and uncharted. Scholars, adventurers, and enthusiasts gather within its confines, sharing insights, tracing routes, and delving into the histories etched on parchment. The cartographer's studio has seamlessly integrated itself into the essence of the institute, an emblem of enlightenment and collaboration, ensuring an informed future for all who navigate the world's secrets, one stroke of ink at a time.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  37: {
    id: 37,
    name: "Tailor",
    text: {
      preBuild:
        "Nestled within the fabric of the town's bustling streets, a subtle yearning takes shape for a sanctuary where threads and artistry can intertwine, where garments can be woven with skill and elegance, and where the tapestry of fashion can be celebrated. With each needle's delicate dance and the unfurling of cloth, the absence of a dedicated tailor's atelier becomes increasingly noticeable. The town lacks a central space for fabrics to be transformed, for trends to be interpreted, and for townsfolk to adorn themselves in bespoke finery. The yearning for a tailor's haven evolves into a shared vision, a place where creativity takes form in stitches, and where the town's identity is woven into each garment. Through the establishment of a tailor's atelier, the town would embrace a symbol of style and unity, weaving together the threads of artistry and individuality.",
      postBuild:
        "Standing proudly amidst the town's vibrant market square, the newly opened tailor's atelier exudes an aura of elegance and craftsmanship. Its gleaming sewing machines and racks adorned with fabrics stand as a tribute to the dedication and vision of the town's tailors. The atelier hums with the rhythm of needles and the soft rustle of fabric as skilled hands transform swaths of cloth into stunning garments. Townspeople, fashion enthusiasts, and those seeking unique attire gather within its walls, sharing inspirations and marveling at the transformation of ideas into wearable art. The tailor's atelier has seamlessly become part of the town's cultural fabric, an emblem of creativity and collaboration, ensuring a stylish future for all who seek to express their individuality through finely crafted attire.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 2 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  38: {
    id: 38,
    name: "Council Chamber",
    text: {
      preBuild:
        "Encircled within the administrative heart of the city, a silent yearning takes form for a sanctuary where voices of leadership and civic discourse can intertwine, where decisions can be debated and the path of the city's destiny can be charted. With each session and the echoes of deliberations, the absence of a dedicated council chamber becomes more apparent. The city lacks a central space for officials to convene, for policies to be shaped, and for the collective wisdom of the city to be harnessed. The yearning for a council chamber evolves into a shared aspiration, a place where perspectives converge, and where the city's evolution is carved into each resolution. Through the establishment of a council chamber, the city would embrace a symbol of governance and unity, creating the nexus where the city's present and future are forged.",
      postBuild:
        "Dominating the civic center with an air of authority and purpose, the newly constructed council chamber stands as a testament to the city's commitment to thoughtful governance. Its grand architecture and dignified seating arrangements embody the gravitas of the decisions made within its walls. The council chamber resounds with impassioned speeches and meticulous discussions as representatives from diverse backgrounds convene to shape the city's trajectory. Citizens, policymakers, and thinkers gather within its bounds, witnessing the birth of policies that will shape the city's identity and progress. The council chamber has seamlessly integrated itself into the city's administrative fabric, an emblem of democracy and collaboration, ensuring an informed and harmonious future for all who contribute to the city's growth.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 4 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  39: {
    id: 39,
    name: "Fletcher",
    text: {
      preBuild:
        "Nestled within the heart of the village, a subtle yearning takes shape for a haven where feathers and precision can intertwine, where arrows can be crafted with skill and purpose, and where the art of archery can be celebrated. With each fletching and the twang of bowstrings, the absence of a dedicated fletcher's workshop becomes increasingly noticeable. The village lacks a central space for shafts to be honed, for bows to be strung, and for archers to find camaraderie and guidance. The yearning for a fletcher's haven evolves into a shared vision, a place where craftsmanship meets marksmanship, and where the village's connection to the art of the arrow is nurtured. Through the establishment of a fletcher's workshop, the village would embrace a symbol of precision and unity, weaving together the strands of tradition and mastery.",
      postBuild:
        "Standing humbly along the village's crossroads, the newly founded fletcher's workshop exudes an aura of craftsmanship and purpose. Its workbenches adorned with feathers and stacks of arrow shafts stand as a tribute to the dedication and expertise of the village's fletchers. The workshop resonates with the rhythmic sounds of fletching tools and the hum of bowstrings being tuned. Archers, hunters, and those intrigued by the art of the arrow gather within its walls, sharing tales of successful shots and refining their skills under the watchful eyes of experienced fletchers. The fletcher's workshop has seamlessly integrated itself into the village's heritage, an emblem of accuracy and collaboration, ensuring a skilled and united future for all who aim to hit their mark, both on and off the archery range.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  40: {
    id: 40,
    name: "Guildhall",
    text: {
      preBuild:
        "Positioned at the heart of the artisan district, a silent yearning takes form for a sanctuary where craftsmanship and camaraderie can intertwine, where skills can be honed and traditions can be passed down, and where the community's artisans can forge a collective identity. With each tool's clink and the symphony of creativity, the absence of a dedicated guildhall becomes more apparent. The district lacks a central space for artisans to gather, for techniques to be exchanged, and for the collective spirit of creativity to thrive. The yearning for a guildhall evolves into a shared dream, a place where talents converge, and where the district's cultural tapestry is woven anew with each masterpiece. Through the establishment of a guildhall, the district would embrace a symbol of artistry and unity, forming the cornerstone of their creative legacy and prosperity.",
      postBuild:
        "Commanding respect at the heart of the artisan district, the newly constructed guildhall stands as a testament to the devotion and craft of the community's artisans. Its grand façade and ornate interiors mirror the depth of passion that resides within its walls. The guildhall hums with the buzz of conversation and the rhythm of tools as artisans of various disciplines gather to share insights and collaborate on projects that bridge tradition and innovation. Craftspeople, creators, and enthusiasts come together within its halls, exchanging ideas and celebrating the district's rich cultural heritage. The guildhall has seamlessly integrated itself into the district's artistic tapestry, an emblem of mastery and collaboration, ensuring a vibrant future for all who contribute to the district's artistic legacy.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 4 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  41: {
    id: 41,
    name: "Infirmary",
    text: {
      preBuild:
        "Tucked away within the heart of the village, a subtle yearning takes form for a refuge where compassion and healing can intertwine, where ailments can be tended to with care and expertise, and where the health of the community can be safeguarded. With each tender touch and the echo of medical tools, the absence of a dedicated infirmary becomes increasingly noticeable. The village lacks a central space for ailments to be diagnosed, for wounds to be treated, and for the village's well-being to be nurtured. The yearning for an infirmary evolves into a shared vision, a place where expertise meets empathy, and where the village's resilience against illness and injury is fortified. Through the establishment of an infirmary, the village would embrace a symbol of wellness and unity, weaving together the threads of healthcare and community strength.",
      postBuild:
        "Nestled within the village's heart, the newly founded infirmary exudes an aura of compassion and expertise. Its pristine wards and modern medical equipment stand as a tribute to the dedication and knowledge of the village's healers. The infirmary resonates with the soft sounds of footsteps and the hum of medical devices as patients receive care and practitioners collaborate to diagnose and treat. Villagers, caregivers, and those in need of medical attention gather within its rooms, sharing stories of recovery and placing their trust in the skilled hands that tend to their well-being. The infirmary has seamlessly woven itself into the village's fabric, an emblem of health and solidarity, ensuring a resilient future for all who seek comfort and healing within its walls.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 4 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  [BUILDING_ID_MARKET]: {
    id: BUILDING_ID_MARKET,
    name: "Market",
    text: {
      preBuild:
        "Bustling at the crossroads of commerce, a silent yearning takes form for a gathering place where vendors and seekers can intertwine, where goods can exchange hands, and where the vibrant tapestry of trade can be celebrated. With each vendor's call and the haggling of prices, the absence of a dedicated market square becomes more apparent. The town lacks a central space for merchants to display their wares, for stories to be shared, and for the community's spirit of exchange to flourish. The yearning for a market evolves into a shared dream, a place where cultures converge, and where the town's identity is written anew with each transaction. Through the establishment of a market square, the town would embrace a symbol of diversity and unity, forming the nucleus of their economic vitality and cultural exchange.",
      postBuild:
        "Radiating life in the heart of the town, the newly inaugurated market square exudes an air of vibrancy and commerce. Its stalls laden with goods and colorful awnings stand as a testament to the entrepreneurial spirit of the town's merchants. The square resonates with the hubbub of activity as shoppers peruse, vendors make their pitches, and the scent of freshly cooked food mingles with the sounds of laughter. Townspeople, travelers, and curious souls gather within its bustling expanse, connecting over shared interests and engaging in the timeless dance of buyer and seller. The market square has seamlessly integrated itself into the town's daily rhythm, an emblem of enterprise and camaraderie, ensuring a thriving future for all who contribute to the dynamic tapestry of exchange and interaction.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 2 }),
    gatherResources: NO_RESOURCES,
    buildResources: getResources({ Wood: -10, Stone: -10 }),
    buildTime: 6,
    repairResources: getResources({ Wood: -5, Stone: -5 }),
    repairTime: 3,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  43: {
    id: 43,
    name: "Stables",
    text: {
      preBuild:
        "Nestled on the outskirts of the village, a quiet yearning takes shape for a haven where hoofbeats and care can intertwine, where horses can find shelter and nurturance, and where the bond between humans and their equine companions can be cherished. With each neigh and the rhythm of horseshoes, the absence of a dedicated stable becomes increasingly noticeable. The village lacks a central space for horses to be housed, for tack to be stored, and for equestrian knowledge to be shared. The yearning for stables evolves into a shared vision, a place where horse and rider come together, and where the village's connection to its equine partners is nurtured. Through the establishment of stables, the village would embrace a symbol of partnership and unity, forging the link between humans and these majestic creatures.",
      postBuild:
        "Anchored at the heart of the village's equestrian culture, the newly built stables exude an air of tranquility and horsemanship. Their well-designed stalls and well-kept grounds stand as a tribute to the dedication and expertise of the village's horse enthusiasts. The stables echo with the sounds of whinnies and the comforting rhythm of grooming as horses are cared for by skilled hands. Riders, trainers, and those who appreciate the grace of these animals gather within its shelter, exchanging tips, forging connections, and celebrating the unique bond between humans and their equine companions. The stables have seamlessly become an integral part of the village's identity, an emblem of partnership and fellowship, ensuring an enriching future for all who admire and engage in the world of horsemanship.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  44: {
    id: 44,
    name: "Stonemason",
    text: {
      preBuild:
        "Anchored within the heart of the city, a silent yearning takes form for a sanctuary where stone and craftsmanship can intertwine, where ancient materials can be sculpted into enduring works of art, and where the city's architectural heritage can be celebrated. With each chisel's strike and the shaping of stone, the absence of a dedicated stonemason's workshop becomes more evident. The city lacks a central space for stones to be carved, for structures to be embellished, and for the timeless stories of the city to be etched into stone. The yearning for a stonemason's haven evolves into a shared aspiration, a place where tradition and innovation meld, and where the city's character is immortalized in every piece. Through the establishment of a stonemason's studio, the city would embrace a symbol of artistry and unity, forming the cornerstone of their architectural and cultural legacy.",
      postBuild:
        "Situated at the crossroads of art and architecture, the newly founded stonemason's studio exudes an aura of craftsmanship and dedication. Its solid workbenches and intricately carved stones stand as a testament to the passion and skill of the city's stonemasons. The studio reverberates with the rhythmic sounds of tools meeting stone and the resonance of skilled hands shaping rock into delicate patterns. Architects, enthusiasts, and those captivated by the magic of stone gather within its walls, sharing insights, admiring intricate details, and discussing the evolution of the city's architectural landscape. The stonemason's studio has seamlessly integrated itself into the fabric of the city, an emblem of permanence and collaboration, ensuring an enduring future for all who seek to marry art and architecture through the transformative medium of stone.",
    },
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  45: {
    id: 45,
    name: "Warehouse",
    text: {
      preBuild:
        "Nestled within the logistics hub of the town, a silent yearning takes form for a sanctuary where goods and efficiency can intertwine, where supplies can be stored securely, and where the town's economic pulse can be protected. With each crate's placement and the hum of machinery, the absence of a dedicated warehouse becomes increasingly noticeable. The town lacks a central space for goods to be inventoried, for resources to be organized, and for the rhythm of commerce to be orchestrated. The yearning for a warehouse evolves into a shared vision, a place where trade and order converge, and where the town's prosperity finds its stronghold. Through the establishment of a warehouse, the town would embrace a symbol of organization and unity, fortifying the foundation of their economic vitality and shared progress.",
      postBuild:
        "Holding steadfast at the heart of the town's commercial operations, the newly constructed warehouse exudes an air of diligence and functionality. Its towering shelves and precisely labeled containers stand as a tribute to the meticulousness and dedication of the town's logistics professionals. The warehouse resounds with the echo of footsteps and the rumble of carts as supplies are received, inventoried, and dispatched. Traders, suppliers, and those involved in the town's economic engine gather within its expansive interior, exchanging goods, collaborating on inventory management, and ensuring the seamless flow of resources. The warehouse has seamlessly woven itself into the town's economic fabric, an emblem of efficiency and cooperation, ensuring a prosperous future for all who contribute to the well-oiled machinery of trade and commerce.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 2 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  46: {
    id: 46,
    name: "Well",
    text: {
      preBuild:
        "Perched upon the brink of the town's boundaries, a contemplative longing takes shape for a space where nature's majesty and human introspection can intertwine, where the sky's canvas can be painted with hues of day and night, and where the town's essence can be admired from a tranquil vantage point. With each sunrise and the quiet hush of twilight, the absence of a dedicated well becomes more apparent. The town lacks a central space for reflection, for water to be drawn, and for the passage of time to be contemplated. The yearning for a well evolves into a shared sentiment, a place where stories are whispered, where the universe's vastness is contemplated, and where the town's existence finds resonance. Through the establishment of a well, the town would embrace a symbol of sustenance and unity, deepening the connection between the town's spirit and the lifegiving element of water.",
      postBuild:
        "Standing as a humble sentinel at the heart of the town's crossroads, the newly restored well exudes an air of nostalgia and practicality. Its stone walls weathered by time and the gleam of a bucket suspended on a rope stand as a tribute to the town's reliance on this simple yet vital source of water. The well emanates the soft sounds of water drawn and the laughter of children playing nearby. Townspeople, travelers, and those in search of a moment's pause gather around its edge, sharing a sip of cool water and the companionship of a space that's witnessed generations come and go. The well has seamlessly integrated itself into the town's daily rhythm, an emblem of endurance and unity, ensuring a refreshed future for all who find solace and connection around its timeless presence.",
    },
    canBuild: true,
    requirements: NO_BUILDING_REQUIREMENTS,
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  47: {
    id: 47,
    name: "Wizard Tower",
    text: {
      preBuild:
        "Perched atop a mystical hill, a silent yearning takes form for a sanctuary where arcane knowledge and mystic energies can intertwine, where spells can be woven with precision, and where the realm of magic can be explored and respected. With each incantation and the shimmer of magical artifacts, the absence of a dedicated wizard tower becomes more evident. The land lacks a central space for wizards to convene, for scrolls to be deciphered, and for the mysteries of the arcane to be unveiled. The yearning for a wizard tower evolves into a shared aspiration, a place where the boundary between reality and the mystical is blurred, and where the pursuit of magic finds its pinnacle. Through the establishment of a wizard tower, the land would embrace a symbol of wisdom and unity, bridging the worlds of the ordinary and the extraordinary.",
      postBuild:
        "Rising elegantly against the horizon, the newly constructed wizard tower exudes an aura of enchantment and sagacity. Its tall spires and windows adorned with sigils stand as a tribute to the dedication and mastery of the realm's most skilled spellcasters. The wizard tower resonates with the echoes of ancient spells and the hum of arcane devices as magic is harnessed for both study and exploration. Wizards, scholars, and those intrigued by the mysteries of magic gather within its chambers, exchanging theories, casting spells, and delving into the secrets of the unseen realms. The wizard tower has seamlessly woven itself into the fabric of the land, an emblem of wonder and collaboration, ensuring an enlightened future for all who seek to unravel the mysteries of the universe through the art of magic.",
    },
    canBuild: false,
    requirements: getBuildingRequirements({
      tier: 5,
      villagerIds: [1],
    }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 10,
    repairResources: NO_RESOURCES,
    repairTime: 10,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  48: {
    id: 48,
    name: "Gatehouse",
    text: {
      preBuild:
        "Standing as a sentinel at the entrance of the fortified city, a silent yearning takes form for a stronghold where protection and passage can intertwine, where the grandeur of architecture can command respect, and where the city's gateway can be safeguarded. With each creak of the portcullis and the clang of armor, the absence of a dedicated gatehouse becomes increasingly noticeable. The city lacks a central space for guards to stand watch, for visitors to be welcomed, and for the city's security to be assured. The yearning for a gatehouse evolves into a shared vision, a place where tradition meets fortification, and where the city's legacy is inscribed into each stone. Through the establishment of a gatehouse, the city would embrace a symbol of strength and unity, reinforcing the nexus where outsiders and insiders converge.",
      postBuild:
        "Commanding attention at the city's entrance, the newly constructed gatehouse exudes an air of authority and protection. Its imposing archways and turrets stand as a tribute to the city's dedication to safeguarding its inhabitants and heritage. The gatehouse resonates with the calls of sentinels and the clatter of wagons as goods are inspected before entry. Citizens, travelers, and those intrigued by the city's history gather around its imposing structure, marveling at its grandeur and acknowledging the city's commitment to security and hospitality. The gatehouse has seamlessly integrated itself into the city's identity, an emblem of vigilance and collaboration, ensuring a secure future for all who enter and leave through its fortified archways.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({ tier: 3 }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  49: {
    id: 49,
    name: "City Walls",
    text: {
      preBuild:
        "Encircling the heart of the metropolis, a subtle yearning takes shape for ramparts where heritage and defense can intertwine, where history can be etched in stone, and where the city's resilience can stand as a testament to time. With each brick's placement and the echoes of history, the absence of dedicated city walls becomes increasingly apparent. The city lacks a central space for fortifications to be erected, for stories to be inscribed, and for the collective spirit of the city to be fortified. The yearning for city walls evolves into a shared sentiment, a place where generations find shelter, and where the city's identity is woven into its stones. Through the establishment of city walls, the metropolis would embrace a symbol of endurance and unity, forming the bulwark against both external threats and the passage of ages.",
      postBuild:
        "Standing resolutely as guardians of the urban landscape, the newly restored city walls exude an aura of history and protection. Their formidable structure and crenellations stand as a tribute to the city's commitment to preserving its past and safeguarding its future. The city walls resonate with the echoes of distant battles and the footsteps of pedestrians who now tread upon their ancient foundations. Locals, visitors, and historians gather around their parapets, sharing stories of bygone eras and admiring the panoramic views that extend beyond the city's limits. The city walls have seamlessly integrated themselves into the city's fabric, an emblem of heritage and solidarity, ensuring a preserved and fortified future for all who draw inspiration from the stones that have witnessed centuries of progress and resilience.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 4,
      buildingIds: [48],
    }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
  50: {
    id: 50,
    name: "Alarm Beacon",
    text: {
      preBuild:
        "Perched upon a strategic cliff overlooking the realm, a subtle yearning takes shape for a signal where urgency and vigilance can intertwine, where flames can pierce the darkness and rally the defenders, and where the call to arms can echo across the land. With each torch lit and the glow of the beacon, the absence of a dedicated alarm beacon becomes more evident. The realm lacks a central space for alerts to be raised, for messages to be conveyed swiftly, and for the collective spirit of defense to be united. The yearning for an alarm beacon evolves into a shared vision, a place where safety meets swiftness, and where the realm's guardians can rise to the occasion. Through the establishment of an alarm beacon, the realm would embrace a symbol of readiness and unity, forming the lighthouse that guides them through the challenges that lie ahead.",
      postBuild:
        "Standing steadfast as a guardian of the realm's safety, the newly erected alarm beacon exudes an aura of urgency and preparedness. Its towering structure and meticulously crafted torch holders stand as a tribute to the dedication and vigilance of the realm's defenders. The alarm beacon resonates with the crackle of flames and the flicker of light as its fiery message pierces the night sky. Sentinels, soldiers, and those committed to the realm's protection gather around its blazing signal, ready to respond to the call for aid or to stand united against any threat. The alarm beacon has seamlessly woven itself into the realm's defense strategy, an emblem of swift action and cooperation, ensuring a secure future for all who heed its fiery call and rally to protect the realm's prosperity.",
    },
    canBuild: true,
    requirements: getBuildingRequirements({
      tier: 4,
      buildingIds: [49],
    }),
    gatherResources: NO_RESOURCES,
    buildResources: NO_RESOURCES,
    buildTime: 1,
    repairResources: NO_RESOURCES,
    repairTime: 1,
    images: {
      exterior: buildingIcon,
      interior: buildingIcon,
      sketch: buildingIcon,
    },
  },
};
