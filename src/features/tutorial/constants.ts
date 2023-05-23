// LOCAL FILES
// Interfaces & Types
import type { IntroductionScreen } from "features/tutorial/types";

export const SCREEN_ID_TO_SCREEN: Record<number, IntroductionScreen> =
  {
    1: {
      id: 1,
      text: "This is the valley of pale pass, far to the south of your home. You work as an expeditionary leader for your king, King Harold Halfdun - lord and ruler of the ancient mountain kingdom of Dunmoran. Dunmoran is surrounded on all sides by steep mountains and impassable ravines, isolating it from the outside world but for the gentle slopes descending into the pale pass.",
      image: "",
    },
    2: {
      id: 2,
      text: "Ages ago, the ancestors of clan Halfdun fled before an empire of beasts and retreated into the small mountain tower known as High Hammerand, now the capital of Dunmoran. It has been two hundred years since the last beast was sighted at the border of Dunmoran, and King Harold has decided that Dunmoran must expand if it is to survive.",
      image: "",
    },
    3: {
      id: 3,
      text: "The country is poor, food is scarce and materials are needed to repair the capital after every vicious flurry of snow. You are to be sent south with a pickaxe, a sword and a tent. Once you are established, more supplies will follow and your objective is to build the town and keep of pale pass into a new duchy of Dunmoran, and begin to send supplies up into the cold mountain reaches.",
      image: "",
    },
    4: {
      id: 4,
      text: "After tearful goodbyes, you set out, alone under the wide open sky. Two days gentle walk and you crest a hill, spread out before you - opportunity, riches, freedom! Will you build a fair and just society? Will you stay loyal to the weakened king Harold of Dunmoran? How will you deal with the other tribes and towns you are bound to encounter in the fecund valley?",
      image: "",
    },
  };
