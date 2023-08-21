# Pale Pass

[Live Demo](https://nlanky.github.io/pale-pass/)

## Running locally
### Requirements:
* [Node.js](https://nodejs.org/en)
* [Git](https://git-scm.com/downloads)

### Steps
1. Decide where you want to clone the repository. Open a Node.js command prompt and run `git clone https://github.com/nlanky/pale-pass.git`. If this is the first time you've used GitHub, you'll probably need to authenticate with GitHub.
2. Run `cd pale-pass` in the same command prompt window you cloned the repository.
3. Run `npm install --global yarn` to install the Yarn package manager.
4. Run `yarn` to install dependencies.
5. Run `yarn dev`. This should open a browser tab with the app running!

## Adding a building
In order for a building to appear in the game, you must amend the `ID_TO_BUILDING` constant in `src/features/building/constants.ts`. There are already examples in there to follow but if you want to see a list of properties a building object requires, you can look at the interface definition in `src/features/building/types.ts`.

Here is a summary of those properties:
- `id` - A unique identifier for each building. We match this up to the # column in the Google Sheet.
- `name` - How you want the name of the building to appear in the UI.
- `text` - An object that allows us to set text that appears before a building is built(`preBuild`) and after it is built (`postBuild`). This is shown when you click on a building on the buildings view.
- `canBuild` - Whether the player can build this building by spending an amount of resources in the buildings view.
- `requirements` - What the building requires before the player can build it. An object with three properties - `tier`, `buildingIds`, and `villagerIds`. `tier` refers to the player's town tier. `buildingIds` and `villagerIds` are arrays of IDs. Make sure these match up to the correct IDs using the codebase or the Google Sheet.
- `gatherResources` - A `Resources` object (see `src/features/resource/types.ts`) that indicates the quantity of each resource this building will produce each day when built and undamaged.
- `buildResources` - A `Resources` object that indicates the fixed amount of each resource required to build the building.
- `buildTime` - The amount of days the building takes to build.
- `repairResources` - A `Resources` object that indicates the fixed amount of each resource required to repair the building.
- `repairTime` - The amount of days the building takes to repair.
- `images` - An object that maps each building image type to an image. There are three types: exterior, interior, and sketch. Interior is used in the building modal. Sketch is used for the building image if it has not been built yet. Otherwise, exterior is used.

When specifying requirements, you can use the `NO_BUILDING_REQUIREMENTS` constant if the building doesn't require anything to be built. This constant sets `tier` to 1 (the starting tier) and `buildingIds`/`villagerIds` to empty arrays.

When specifying resources, there are a couple of useful things to be aware of. If you want to create a `Resources` object with all the values set to 0, you can use the `NO_RESOURCES` constant. If you don't want to specify all the properties for the object, you can use the `getResources` function which will populate any missing properties with a value of 0. For example `getResources({ Wood: 1, Stone: 1 })` would return `{Wood: 1, Stone: 1, Iron: 0, Steel: 0, Mythril: 0, Amethyst: 0}`.

Note that if you set `canBuild` to false and the building does not appear as an event outcome, the player will never see it!

## Adding a villager
In order for a villager to appear in the game, you must amend the `ID_TO_VILLAGER` constant in `src/features/villager/constants.ts`. There are already examples in there to follow but if you want to see a list of properties a villager object requires, you can look at the interface definition in `src/features/villager/types.ts`.

Here is a summary of those properties:
- `id` - A unique identifier for each villager. We match this up to the # column in the Google Sheet.
- `name` - How you want the name of the villager to appear in the UI.
- `occupation` - This will be shown in several places in the UI to add some character to the villager.
- `description` - This is shown when you click on a villager on the villagers view.
- `specialty` - A villager can have one of six specialties: Builder (decreased build/repair times), Gatherer (increased resource gathering rates), Healer (decreased recovery times), Scout (allows exploring more map tiles), Soldier (increased military strength), or Spy (shows more enemy town stats).
- `canRecruit` - Whether the player can recruit this villager in the villagers view.
- `requirements` - See "Adding a building".
- `gatherResources` - See "Adding a building".
- `militaryStrength` - Each villager has a number that represents their strength in a type of combat - hand to hand, archery, and mounted. These values will have an impact on their usefulness when fighting other towns. If the villager's specialty is Soldier, we generally give them higher stats.
- `image` - A portrait image of the villager that is shown throughout the app.

When specifying requirements, you can use the `NO_VILLAGER_REQUIREMENTS` constant if the villager doesn't require anything to be recruited. This constant sets `tier` to 1 (the starting tier) and `buildingIds`/`villagerIds` to empty arrays.

The same resource utility functions mentioned in "Adding a building" can be used for `gatherResources` here too.

Note that if you set `canRecruit` to false and the villager does not appear as an event outcome, the player will never see them!

## Adding an event
In order for an event to appear in the game, you must amend the `ID_TO_EVENT` constant in `src/features/event/constants.ts`. There are already examples in there to follow but if you want to see a list of properties an event object requires, you can look at the interface definition in `src/features/event/types.ts`.

Here is a summary of those properties:
- `id` - A unique identifier for each event. We match this up to the # column in the Google Sheet.
- `image` - This image will display alongside `introductionText` and throughout the event. See below for how to add an image so it can be used here.
- `requirements` - This is the same as the property on the building and villager objects but includes an additional `resources` property where you can require that the player has an amount of each resource before the event can trigger.
- `introductionText` - The text that appears when an event triggers. You can add placeholders that will be filled in by variables. See "Placeholder Text".
- `choices` - A list of choices available to the player in response to the event. Although we can support a number of choices, we are sticking to two for now.

Each choice is specified as an object with these properties:
- `text` - The text that appears on the button for the player to click.
- `outcomes` - A list of outcomes that can occur based on the player's choice. Again, we can support a number of outcomes but we're sticking to two here as well.

Each outcome is specified as an object with these properties:
- `text` - The text displayed to the player if this outcome if reached.
- `resources` - The amount of each resource given to the player.
- `resourcesPerDay` - The amount of each resource the player will receive each day from now on.
- `buildings` - An array of building changes. A change is specified as an object with `id` and `state` properties. This allows you to specify the new state a building will be in (see `BuildingState` type).
- `villagers` - An array of villager changes. A change is specified as an object with `id` and `state` properties. This allows you to specify the new state a villager will be in (see `VillagerState` type).
- `probability` - The probability this outcome will occur given the player picked the choice related to this outcome. This is specified as a number between 0 and 1. All outcome probabilities must sum to 1!

When specifying requirements, you can use the `NO_EVENT_REQUIREMENTS` constant if the event doesn't require anything in order for it to trigger. This constant sets `tier` to 1 (the starting tier), `buildingIds`/`villagerIds` to empty arrays, and `resources` to `NO_RESOURCES`.

You can also use `NO_RESOURCES` and `getResources` here too as you can with buildings and villagers.

Events can trigger in two ways: exploring a map tile or randomly while in the town. If your new event triggers while in town, you don't need to do anything else after adding the event to the `ID_TO_EVENT` constant. It will just trigger once the requirements are met. If the event is related to a map tile, you will need to update another constant: `TILES` in `src/features/map/constants.ts`. The map tiles are generated using this constant. The top left of the map is where `x` is 0 and `y` is 0 and the bottom right is where `x` is 9 and `y` is 9 (it's a 10x10 map). Find the tile you want the event to trigger on - make sure it's not a town where `playerId` is not `null` - and then set the `eventId` property to the ID of your new event.

### Images
Go to the `src/assets/event` directory. You can see there are some examples of event images there already. Save your image in that directory with the event ID as the file name.

An image needs to be imported from its source file before you can start using it in an `<img>` tag elsewhere. This is why we have a file in each asset directory that imports all the images and re-exports them for ease of use. Open up `src/assets/event/index.ts`. Import your image in the same way as the others:

```
import event[event ID]Image from "assets/event/[event ID].[file extension]";
```

Then re-export it by adding the imported constant (which will end up compiling as a source string) to the exported object:

```
export { event[event ID]Image };
```

## Placeholder text
The player can set their name and preferred pronouns at the start of the game and this can feed in to your text for events or descriptions for buildings and villagers. Here is a list of placeholders you can add in your text string:
- `{player.name}` - Player's name
- `{second.subject}` - you, it
- `{second.object}` - you, it
- `{second.dependentPossessive}` - your, its
- `{second.independentPossessive}` - yours, its
- `{second.reflexiveSingular}` - yourself, itself
- `{second.reflexivePlural}` - yourselves, itself
- `{third.subject}` - he, she, it, they
- `{third.object}` - him, her, it, them
- `{third.dependentPossessive}` - his, her, its, their
- `{third.independentPossessive}` - his, hers, its, theirs
- `{third.reflexiveSingular}` - himself, herself, itself, themself
- `{third.reflexivePlural}` - himself, herself, itself, themselves
- `\n` - This is a carriage return character i.e. a line break. If you add two (`\n\n`), you can create something that resembles a paragraph in your text.
