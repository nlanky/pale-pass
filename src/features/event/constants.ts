// LOCAL FILES
// Assets
import {
  event1Image,
  event2Image,
  event3Image,
  event4Image,
  event5Image,
} from "assets/event";
// Constants
import { NO_RESOURCES } from "features/resource/constants";
// Interfaces & Types
import type { Event, EventRequirements } from "features/event/types";
// Utility functions
import { getEventRequirements } from "features/event/utils";
import { getResources } from "features/resource/utils";

export const DAYS_PER_EVENT = 12;
export const EVENT_PROBABILITY = 0.1; // Probability of an event triggering on a day
export const NO_EVENT_REQUIREMENTS: EventRequirements = {
  tier: 1,
  resources: NO_RESOURCES,
  buildingIds: [],
  villagerIds: [],
};

export const ID_TO_EVENT: Record<number, Event> = {
  1: {
    id: 1,
    image: event1Image,
    requirements: NO_EVENT_REQUIREMENTS,
    introductionText:
      "In a matter of hours you have set up your tent, caught fish and stoked a small but merry fire in the middle of a beautiful clearing. This would make a fine start for a town, plentiful fish in the water, golden rye and wheat growing in the clearings nearby, strong pine trees reaching for the sky. What's more, there is a small outcropping of stone nearby that would be perfect for building - it might even contain some ores if your cursory survey proves correct! Full of flaky fish and content with your new outpost, you slip into sleep thinking about the future. On waking, you splash your face with crystal clear water and turn your eyes on your camp. It seems you will need to manage several resources to grow - what would you like to focus on first?",
    choices: [
      {
        text: "I should focus on wood, we will need a steady supply for housing and cooking.",
        outcomes: [
          {
            text: "A good amount of wood for a day's work. This should help us build quickly.",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Wood: 1 }),
            buildings: [],
            villagers: [],
            probability: 0.95,
          },
          {
            text: "A disaster! The tree you have carefully spent the day felling splits unexpectedly and falls into the river! A few branches snag on the shore but all you can do is watch the trunk float away and try again tomorrow.",
            resources: getResources({ Wood: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.05,
          },
        ],
      },
      {
        text: "I should focus on stone, we will need sturdy walls. Who knows what is in the forest?",
        outcomes: [
          {
            text: "A sturdy block of granite stands proudly alongside the tent. We can cut this when needed quickly and easily.",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Stone: 1 }),
            buildings: [],
            villagers: [],
            probability: 0.95,
          },
          {
            text: "A disaster! With the final blow of your pick the ground quakes and the block you have spent the day so carefully extracting crumbles into hundreds of useless chunks! Oh, well, at least you'll have plenty of loose stones for the firepits!",
            resources: getResources({ Stone: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.05,
          },
        ],
      },
    ],
  },
  2: {
    id: 2,
    image: event2Image,
    requirements: getEventRequirements({ villagerIds: [5] }),
    introductionText:
      "As you make your way through a dense forest, you stumble upon a small hole in the ground. Upon closer inspection, you notice a pair of eyes peering back at you from inside the hole. You manage to translate the slurred, broken English and copious amounts of swearing in the individual's speech to learn that this is Jaakko, a Finnish man hiding from the quartermaster.\n\nHe tells you that he was falsely accused of a crime and doesn't want to return to the town out of fear that he will be reprimanded.\n\nDespite his drunken state and rough exterior, Jaakko is knowledgeable about the local area and offers the limited resources he has gathered in exchange for a place to stay in your town. His drinking and unpredictable behaviour could prove to be a liability though, not to mention the potential for the quartermaster to find out about your actions. What do you do?",
    choices: [
      {
        text: "Offer Jaakko a hideout in the town",
        outcomes: [
          {
            text: "Jaakko is relieved to hear your offer and swiftly exits the hole, carrying with him resources in a hemp sack.",
            resources: getResources({ Wood: 10, Stone: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "healthy" }],
            probability: 0.5,
          },
          {
            text: 'Jaakko accompanies you back to the town, telling numerous stories of his prowess. Upon questioning him about the resources promised, he shrugs and mutters "beta cuck" under his breath.',
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "healthy" }],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Return to the town and notify the quartermaster about where Jaakko is hiding",
        outcomes: [
          {
            text: "The quartermaster grants you some spare resources in exchange for the information. Later that day, you see Jaakko's lifeless corpse being wheeled back into town on the back of a wagon. It appears negotiations were short.",
            resources: getResources({ Wood: 10, Stone: 10 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "dead" }],
            probability: 0.5,
          },
          {
            text: 'While returning to your abode in the evening, you hear a rustle in a bush nearby. Unperturbed, you put the noise down to the local wildlife. However, just as you go to open your front door, you could have sworn you heard the words "dumb cunt" muttered from the same bush. Did Jaakko survive his encounter with the quartermaster?',
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 31, state: "injured" }],
            probability: 0.5,
          },
        ],
      },
    ],
  },
  3: {
    id: 3,
    image: event3Image,
    requirements: getEventRequirements({ buildingIds: [13] }),
    introductionText:
      "After a busy day listening to villager grievances with your trusted advisor Glados, you pop down to the bakery to seek out some delicious treats. As you approach the door, you remember that Glados has a severe nut allergy and that you should ask the baker if their cakes contain any nuts.\n\n\"Good afternoon my lord! It's a fine day with you around! What can I do for you today? Perhaps you'd care to try one of my moist muffins or beautiful baps? You won't find any soggy bottoms here my lord!\"",
    choices: [
      {
        text: "Just looking for a cake without nuts, thank you",
        outcomes: [
          {
            text: 'The baker picks up a cake and holds it up to his ear. "The cake contains... no nuts". With a bemused look on your face, you depart, cake in hand, and head back to Glados. The two of you tuck in to some lovely, fluffy cake. The next day, you feel much more productive!',
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: 1,
              Stone: 1,
              Iron: 1,
            }),
            buildings: [],
            villagers: [],
            probability: 0.95,
          },
          {
            text: 'The baker picks up a cake and holds it up to his ear. "The cake contains... no nuts". With a bemused look on your face, you depart, cake in hand, and head back to Glados. As the two of you tuck into the cake, Glados suddenly drops her fork to the ground. Her throat closes up and she passes into the shadow. The cake contained nuts. You have lost your best advisor.',
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
              Iron: -1,
            }),
            buildings: [],
            villagers: [],
            probability: 0.05,
          },
        ],
      },
      {
        text: "I'll take the lot!",
        outcomes: [
          {
            text: '"My lord, what about the other villagers?" You stare at the baker for what seems like minutes. "Of course, my lord. Right away, my lord!" You leave the bakery and load pies, cakes, rolls and more onto a wagon. Some villagers pop their heads out and look appalled at your actions.',
            resources: getResources({
              Wood: 50,
              Stone: 50,
              Iron: 50,
            }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.9,
          },
          {
            text: "\"My lord, I can't satisfy such a request. There would be a revolt among the villagers!\" You know that the baker's words hold some truth despite your greedy intentions. You can't stand the awkard silence any longer and swiftly exit without any baked goods.",
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.1,
          },
        ],
      },
    ],
  },
  4: {
    id: 4,
    image: event4Image,
    requirements: getEventRequirements({
      buildingIds: [11],
      villagerIds: [9],
    }),
    introductionText:
      "As you stroll through the bustling town and out the town gate, you come across the friendly face of Jason, tending to his chickens. When he spots you, he immediately drops the bucket of feed he was holding and rushes over. The chickens seem delighted, pecking away at the abundance of food they now have access to.\n\n\"Milord! Milord! I've got a unique opportunity just for you! You see those things over there? They're made of chicken! If you kill it, you've got free chicken. Or don't kill it, you've got free eggs!\"\n\nYou stand there bemused, wondering if Jason has always been like this. I suppose it doesn't matter as long as the resources keep coming in.\n\nJason continues. \"Here's my offer. You make a small investment in my farm and I'll guarantee you I'll triple it. You've seen the secret of my success now. We can't lose!\"",
    choices: [
      {
        text: "Invest in Jason's farm",
        outcomes: [
          {
            text: "True to his word, Jason seeks you out the following week professing a large haul of eggs and chicken. He gives you back triple your investment, telling you to keep his secret while tapping his nose.",
            resources: getResources({
              Wood: 200,
              Stone: 200,
              Iron: 200,
              Steel: 200,
              Mythril: 200,
              Amethyst: 200,
            }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.05,
          },
          {
            text: "Jason seeks you out the following week, approaching with slumped shoulders, covered in bruises, and with cap in hand. He tells you that he borrowed chickens from a local trader but they didn't lay any eggs for a week. When he killed the chickens, the price of chicken had fallen so far that he couldn't pay the traders back and they sent mercenaries after him to collect. When Jason couldn't pay, they burned the grain fields and beat him to within an inch of his life. You won't be receiving any return on your investment.",
            resources: getResources({
              Wood: -100,
              Stone: -100,
              Iron: -100,
              Steel: -100,
              Mythril: -100,
              Amethyst: -100,
            }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [{ id: 11, state: "destroyed" }],
            villagers: [{ id: 9, state: "injured" }],
            probability: 0.95,
          },
        ],
      },
      {
        text: "Don't invest in Jason's farm",
        outcomes: [
          {
            text: "You're sceptical of Jason's masterplan and decide to observe his new enterprise. A week later, Jason comes up to you with a satisfied look on his face.\n\n\"I told you to invest milord! Luckily for you, I'm so wealthy, I can share some of it with the town.\"",
            resources: getResources({
              Wood: 100,
              Stone: 100,
              Iron: 100,
              Steel: 100,
              Mythril: 100,
              Amethyst: 100,
            }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.05,
          },
          {
            text: "Jason seeks you out the following week, approaching with slumped shoulders, covered in bruises, and with cap in hand. He tells you that, without your investment, he had to borrow chickens from a local trader but they didn't lay any eggs for a week. When he killed the chickens, the price of chicken had fallen so far that he couldn't pay the traders back and they sent mercenaries after him to collect. When Jason couldn't pay, they burned the grain fields and beat him to within an inch of his life. Perhaps an initial investment would have helped.",
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [{ id: 11, state: "destroyed" }],
            villagers: [{ id: 9, state: "injured" }],
            probability: 0.95,
          },
        ],
      },
    ],
  },
  5: {
    id: 5,
    image: event5Image,
    requirements: getEventRequirements({ villagerIds: [10] }),
    introductionText:
      "You're walking through the bustling streets of your town when your attention is drawn to a disheveled figure leaning against a wall. You recognise him as the chorister, Alistair. As you approach, you notice his trembling hands and the faint odour of decay on his breath.\n\nAlistair looks up, his eyes widening with anticipation as he spots you. \"Milord!\" he calls out, his voice strained. \"I... I need your help. Please, I beg of you, do you have any Dragon's Brew?\"\n\nThe name rings a bell. You've heard rumours of a notorious street drug that has entered the town through local traders. It's known for its potent effects and addictive properties. It is a dangerous substance that has already wreaked havoc on the lives of many in the town.",
    choices: [
      {
        text: "Find some of the drug to give to Alistair",
        outcomes: [
          {
            text: "Alistair's eyes widen with hope as you consider his request. \"You... you'd really help me?\" he stammers, his voice trembling with a mix of desperation and anticipation.\n\nYou embark on a quest to find Dragon's Brew, inquiring around town, discreetly asking for information about the dealers and locations where the drug might be available. You navigate the town's underworld, conversing with several unsavoury characters, before trading for a small amount of the drug.\n\nYou return to Alistair, your heart heavy with mixed emotions. Handing him the substance, you warn him about the dangers and urge him to seek help.\n\nAlistair experiences a temporary respite from his addiction. Your act of kindness gives him a momentary escape from his suffering. He expresses gratitude and promises to seek help after realising the fleeting nature of the drug's relief.",
            resources: getResources({ Wood: -50, Stone: -50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 10, state: "injured" }],
            probability: 0.5,
          },
          {
            text: "Alistair's eyes widen with hope as you consider his request. \"You... you'd really help me?\" he stammers, his voice trembling with a mix of desperation and anticipation.\n\nYou embark on a quest to find Dragon's Brew, inquiring around town, discreetly asking for information about the dealers and locations where the drug might be available. You navigate the town's underworld, conversing with several unsavoury characters, before trading for a small amount of the drug.\n\nYou return to Alistair, your heart heavy with mixed emotions. Handing him the substance, you warn him about the dangers and urge him to seek help.\n\nAlistair becomes even more deeply entrenched in his addiction. The provision of Dragon's Brew reinforces his dependency, making it harder for him to break free. He becomes consumed by the drug's effects, neglecting his responsibilities and spiraling further into a life of addiction.",
            resources: getResources({ Wood: -50, Stone: -50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 10, state: "dead" }],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Convince Alistair to go to rehab",
        outcomes: [
          {
            text: "Moved by Alistair's desperate plea, you decide that enabling his addiction is not the answer. Instead, you offer your assistance in getting him the help he needs.\n\nYou convene the town's healers and determine who would be the best person for helping Alistair in his recovery from addiction.\n\nYou return to Alistair and gently explain your decision, offering to accompany him to the healer, where he can receive the care and support necessary to overcome his addiction.\n\nAlistair willingly accepts the party's offer and undergoes successful rehabilitation. He receives the professional care, counselling, and support needed to overcome the addiction. After a period of recovery, Alistair emerges with a newfound determination to rebuild his life and becomes an advocate for addiction awareness in the town.",
            resources: getResources({ Wood: -25, Stone: -25 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.9,
          },
          {
            text: "Moved by Alistair's desperate plea, you decide that enabling his addiction is not the answer. Instead, you offer your assistance in getting him the help he needs.\n\nYou convene the town's healers and determine who would be the best person for helping Alistair in his recovery from addiction.\n\nYou return to Alistair and gently explain your decision, offering to accompany him to the healer, where he can receive the care and support necessary to overcome his addiction.\n\nAlistair willingly accepts the party's offer and undergoes successful rehabilitation. He receives the professional care, counselling, and support needed to overcome the addiction. After a period of recovery, Alistair emerges with a newfound determination to rebuild his life and becomes an advocate for addiction awareness in the town.",
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 10, state: "dead" }],
            probability: 0.1,
          },
        ],
      },
    ],
  },
  6: {
    id: 6,
    image: "",
    requirements: NO_EVENT_REQUIREMENTS,
    introductionText:
      'You come across two groups bickering on the side of the road. From the sounds of it, they are arguing about who should win a quiz.\n\n"Clearly \'Are You Enbious?\' are the winners because we won more of the trivia rounds!" says one voice from the group on the left. "No! \'One Team to Rule Them All\' had the same amount of points!" replies someone from the group to your right. Another voice who is in the middle of the conflict shouts in your direction. "You there! Perhaps you can settle our argument. These two teams have the same number of points at the end of our annual quiz. Who should be the winner?"',
    choices: [
      {
        text: "Come up with a tie breaker",
        outcomes: [
          {
            text: "You commend both teams on their remarkable knowledge and skill however you insist that there must be a true victor. You propose that both teams guess how long it will take you to climb a large tree nearby. The closest guess will win the quiz. The two groups deliberate for a moment before sharing their guesses and the tie breaker begins.\n\nAs you begin to climb the tree, you swear you can hear mariachi music. It must be your imagination. After several minutes scrambling through branches and leaves, you near the top of the tree. You realise that the only way to reach the highest branch is to jump. Psyching yourself up, you spring upwards and stick a hand out to grab the branch. You've made it to the top! You see the group that called themselves 'One Team to Rule Them All' whooping and hollering beneath you.\n\nWhen you get back down, 'One Team to Rule Them All' commend you on your climbing skills and offer some of their quiz winnings as a thank you.",
            resources: getResources({ Wood: 50, Stone: 50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.5,
          },
          {
            text: "You commend both teams on their remarkable knowledge and skill however you insist that there must be a true victor. You propose that both teams guess how long it will take you to climb a large tree nearby. The closest guess will win the quiz. The two groups deliberate for a moment before sharing their guesses and the tie breaker begins.\n\nAs you begin to climb the tree, you swear you can hear mariachi music. It must be your imagination. After several minutes scrambling through branches and leaves, you near the top of the tree. You realise that the only way to reach the highest branch is to jump. Psyching yourself up, you spring upwards and stick a hand out to grab the branch. However, you grasp at thin air, falling down through the branches and suffering many injuries. Is that pan pipes you can hear? Maybe you have some brain damage.\n\nIn the absence of a clear resolution to the quiz, the mood of the groups has soured further. They depart with a sense of disappointment, continuing to bicker and leaving you lying on your back, aching and bloodied. The healers will have a job to fix you up after this accident.",
            resources: getResources({ Wood: -50, Stone: -50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Declare both teams as winners",
        outcomes: [
          {
            text: "You declare that it is rare to see such an extraordinary display of knowledge and skill. In the spirit of camaraderie and the pursuit of knowledge, you declare both groups as joint winners.\n\nThe tension that had filled the air moments before your announcement immediately dissipates as both groups erupt into cheers, embracing each other, their rivalry now transformed into mutual respect and admiration. The joint victory will become a famous tale in the local area, forever etched in the memories of those present. Both groups agree that you should receive a share of the quiz winnings as a thank you for resolving their conflict.",
            resources: getResources({ Wood: 50, Stone: 50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.5,
          },
          {
            text: "You declare that it is rare to see such an extraordinary display of knowledge and skill. In the spirit of camaraderie and the pursuit of knowledge, you declare both groups as joint winners.\n\nThere is initially a feeling of confusion mingled with disappointment as the groups struggle to comprehend the lack of a decisive winner. These feelings quickly turn to anger and resentment as the groups set aside their feelings about the quiz to come together and attack you! You manage to escape but not after suffering many injuries. The healers will have a job to fix you up after this.",
            resources: getResources({ Wood: -50, Stone: -50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [],
            probability: 0.5,
          },
        ],
      },
    ],
  },
  8: {
    id: 8,
    image: "",
    requirements: NO_EVENT_REQUIREMENTS,
    introductionText:
      'A red sun rises in the town. Blood has been spilled this night. You exit your abode and shortly after come across a pair of detectives standing over a body covered by a hessian sack. One is a tall, sharp-eyed elf named Hawkeye, while the other, a scruffy gnome, introduces himself as Ratbrain. The detectives approach you with urgency.\n\nHawkeye clears her throat and begins, "Greetings, milord. We are in desperate need of your assistance. A murder has taken place in the town, and we are struggling to find any leads. Will you help us solve this heinous crime?"',
    choices: [
      {
        text: "Agree to help the detectives investigate the murder",
        outcomes: [
          {
            text: "The detectives allow you to remove the hessian sack. After inspecting the body, you notice a mysterious symbol among the victim's belongings depicting a skeletal hand reaching out from within a swirling vortex. Looking at the victim's wounds, you see a residue or faint glow around the edges. It seems arcane in nature. The crime scene exhibits an unnaturally cold atmosphere, even in the absence of any physical source of cold. You realise that all the signs point towards a necromancer!\n\nWorking with the detectives, you uncover a sinister plot orchestrated by a powerful necromancer who calls themselves Umbra. You find them hidden in an underground lair accessible from a cave near the town.\n\nUmbra pleads for your mercy. They explain that they only ever practiced on people who had already expired and it was only to improve their knowledge. They offer you their services in the form of healing if you let them go. You accept their offer but promise that any funny business will be rewarded with a one way ticket to jail. The detectives thank you for your assistance.",
            resources: NO_RESOURCES,
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 18, state: "healthy" }],
            probability: 0.5,
          },
          {
            text: "The detectives allow you to remove the hessian sack. After inspecting the body, you notice a mysterious symbol among the victim's belongings depicting a skeletal hand reaching out from within a swirling vortex. Looking at the victim's wounds, you see a residue or faint glow around the edges. It seems arcane in nature. The crime scene exhibits an unnaturally cold atmosphere, even in the absence of any physical source of cold. You realise that all the signs point towards a necromancer!\n\nWorking with the detectives, you uncover a sinister plot orchestrated by a powerful necromancer who calls themselves Umbra. You find them hidden in an underground lair accessible from a cave near the town.\n\nAs soon as you arrive, Umbra fires spells towards your party of three. After a long, draining battle, you manage to apprehend Umbra but at a great cost. Ratbrain is dead. Hawkeye cries out in anguish upon seeing Ratbrain's lifeless body. They didn't always manage to solve crimes but they were a damn, good team. Perhaps over time, Umbra could be persuaded to assist the town in some way.",
            resources: getResources({ Wood: -30, Stone: -30 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 18, state: "injured" }],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Decline to help the detectives",
        outcomes: [
          {
            text: "You decide that one death isn't that important. Hawkeye and Ratbrain sometimes manage to solve crimes so you're sure they can handle this investigation.\n\nSometime after the first body is found, the detectives approach you again. Several other corpses have turned up around town but the detectives say that none of the villagers recognise any of the victims. They have also discovered a few signs indicating a possible necromancer is to blame. There is a mysterious symbol among each victim's belongings depicting a skeletal hand reaching out from within a swirling vortex. The wounds on the victims also appear to have a reside or faint glow around the edge which seems arcane in nature. Furthermore, the detectives mention each crime scene has an unnaturally cold atmosphere. Hawkeye says she has found an underground lair accessible through a cave near the town that displays signs of being lived in recently.\n\nOn arrival, you find a necromancer who calls themself Umbra. Umbra pleads for your mercy. They explain that they only ever practiced on people who had already expired and it was only to improve their knowledge. They offer you their services in the form of healing if you let them go. You accept their offer but promise that any funny business will be rewarded with a one way ticket to jail. The detectives thank you for your assistance.",
            resources: getResources({ Wood: -25, Stone: -25 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 18, state: "healthy" }],
            probability: 0.5,
          },
          {
            text: "You decide that one death isn't that important. Hawkeye and Ratbrain sometimes manage to solve crimes so you're sure they can handle this investigation.\n\nSometime after the first body is found, the detectives approach you again. Several other corpses have turned up around town but the detectives say that none of the villagers recognise any of the victims. They have also discovered a few signs indicating a possible necromancer is to blame. There is a mysterious symbol among each victim's belongings depicting a skeletal hand reaching out from within a swirling vortex. The wounds on the victims also appear to have a reside or faint glow around the edge which seems arcane in nature. Furthermore, the detectives mention each crime scene has an unnaturally cold atmosphere. Hawkeye says she has found an underground lair accessible through a cave near the town that displays signs of being lived in recently.\n\nOn arrival, you find a necromancer who calls themself Umbra. After pleasantries are exchanged, Umbra immediately fires spells towards your party of three. After a long, draining battle, you manage to apprehend Umbra but at a great cost. Ratbrain is dead. Hawkeye cries out in anguish upon seeing Ratbrain's lifeless body. They didn't always manage to solve crimes but they were a damn, good team. Perhaps over time, Umbra could be persuaded to assist the town in some way.",
            resources: getResources({ Wood: -50, Stone: -50 }),
            resourcesPerDay: NO_RESOURCES,
            buildings: [],
            villagers: [{ id: 18, state: "injured" }],
            probability: 0.5,
          },
        ],
      },
    ],
  },
  11: {
    id: 11,
    image: "",
    requirements: getEventRequirements({
      resources: getResources({ Wood: 10, Stone: 10 }),
    }),
    introductionText:
      "With the main features of the camp up and running, you turn your attention to the mountains surrounding your little valley. If you had the proper tools you could really speed up your ability to exact resources. Perhaps it's time for a smithy? Albeit a simple one!",
    choices: [
      {
        text: "If I focus on building up the forge first I can make life much easier!",
        outcomes: [
          {
            text: "With a few hours work and a mighty amount of sweat you have put together a forge! It's basic but quick to warm, and will produce simple tools to help you mine and forest.",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Stone: 1 }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.9,
          },
          {
            text: "With a curse you kick another rock away from the limp pile in front of you! Damn it all, this is useless and the forge going to use far more wood than it should to stay hot!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.1,
          },
        ],
      },
      {
        text: "A sturdy foundation and walls are what is needed for a proper smithy - let's not rush to the end and fall over our feet!",
        outcomes: [
          {
            text: "With a few hours work and a mighty amount of sweat you stand upon a fresh laid floor of pine planks, surrounded by sturdy wooden and stone walls. A merry little forge stands in the corner, ready to help you assemble the first tools you will need!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Stone: 1 }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.9,
          },
          {
            text: "The sun falls behind the mountains and in the growing dark your ramshackle building sheds it's only remaining wall. How did it all go so wrong? The entire structure is lopsided and will need constant repairs in order to stay standing! At least the forge is functional, barely!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "built" }],
            villagers: [],
            probability: 0.1,
          },
        ],
      },
    ],
  },
  32: {
    id: 32,
    image: "",
    requirements: {
      tier: 2,
      resources: getResources({ Wood: 30, Stone: 30, Iron: 30 }),
      buildingIds: [19],
      villagerIds: [],
    },
    introductionText:
      "You wake with a start to the smell of smoke and the braying of your trusted donkey. Rosy light shines on your cieling and you quickly realise - fire! You run outside and see the blacksmith is up in flames!",
    choices: [
      {
        text: "Run for the building! We must save the tools!",
        outcomes: [
          {
            text: "With speed you didn't know you were capable of, you sprint to the blacksmiths and cover your mouth before diving into the haze. You start to throw the tools out of the window as quickly as possible!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
          {
            text: "You jog as quickly as your sleepy legs will carry you over to the blacksmiths. Running inside you spend most of your time choking on the smoke and manage to save very few of the tools!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
        ],
      },
      {
        text: "Run for the river! We need water now!",
        outcomes: [
          {
            text: "Bucket in hand you splash into the water, startling the dozing fish sleeping under the bank. Several such trips between the river and the blacksmiths manage to save the majority of the building! Although repairs will still be needed for some time!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({
              Wood: -1,
              Stone: -1,
            }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
          {
            text: "Bucket in hand you splash into the river, startling the sleeping fish! A particularly large sturgeon lashes your leg as you stand in the icy water and you fall flat on your face in shock! The water knocks the air from your lungs, and it's a spluttering, wet, mess of a person who eventually puts out the fire in the blacksmiths. It will take some time before it is repaired!",
            resources: NO_RESOURCES,
            resourcesPerDay: getResources({ Wood: -1, Stone: -1 }),
            buildings: [{ id: 19, state: "destroyed" }],
            villagers: [],
            probability: 0.5,
          },
        ],
      },
    ],
  },
};
