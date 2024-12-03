const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const imageTall = `https://picsum.photos/500/800`;
const imageWide = `https://picsum.photos/800/500`;

accounts = [
    {
        universal: {
            name: standardizeLower(`Lux`),
            id: parseInt(`1`),
            groupID: parseInt(`4`),
            groupName: standardizeLower(`Admin`),
            imageTall: imageTall,
            imageWide: imageWide,
            type: standardizeLower(`Writer`),
            parentID: parseInt(`0`),
            posts: parseInt(`1000`),
            dates: {
                joined: `August 7, 2022`,
                lastActive: `August 7, 2022`,
                lastPost: `August 7, 2022`
            }
        },
        character: {
            species: standardizeLower(``),
            speciesRaw: standardizeLower(``),
            speciesClass: standardizeLower(cleanText(``)),
            extraSpeciesData: standardizeLower(``),
            pronouns: standardizeLower(``),
            relationship: standardizeLower(``),
            relationshipClass: standardizeLower(cleanText(``)),
            age: parseInt(``),
            ageClass: ``,
            location: ``,
            locationClass: standardizeLower(cleanText(``)),
            overview: ``,
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Lux`)),
            alias: standardizeLower(`Lux`),
            age: parseInt(`32`),
            pronouns: standardizeLower(`she/her`),
            timezone: standardizeLower(`GMT-04:00`),
            contact: standardizeLower(`Discord`),
            triggers: lipsum,
        }
    },
    {
        universal: {
            name: standardizeLower(`Spyder`),
            id: parseInt(`2`),
            groupID: parseInt(`4`),
            groupName: standardizeLower(`Admin`),
            imageTall: imageTall,
            imageWide: imageWide,
            type: standardizeLower(`Writer`),
            parentID: parseInt(`0`),
            posts: parseInt(`100`),
            dates: {
                joined: `August 7, 2022`,
                lastActive: `August 7, 2022`,
                lastPost: `August 7, 2022`
            }
        },
        character: {
            species: standardizeLower(``),
            speciesRaw: standardizeLower(``),
            speciesClass: standardizeLower(cleanText(``)),
            extraSpeciesData: standardizeLower(``),
            pronouns: standardizeLower(``),
            relationship: standardizeLower(``),
            relationshipClass: standardizeLower(cleanText(``)),
            age: parseInt(``),
            ageClass: ``,
            location: ``,
            locationClass: standardizeLower(cleanText(``)),
            overview: ``,
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Spyder`)),
            alias: standardizeLower(`Spyder`),
            age: parseInt(`26`),
            pronouns: standardizeLower(`They/Them`),
            timezone: standardizeLower(`GMT-05:00`),
            contact: standardizeLower(`Discord`),
            triggers: lipsum,
        }
    },
    {
        universal: {
            name: standardizeLower(`Fiore Amoretti`),
            id: parseInt(`685`),
            groupID: parseInt(`37`),
            groupName: standardizeLower(`Bumbleberry`),
            imageTall: imageTall,
            imageWide: imageWide,
            type: standardizeLower(`Character`),
            parentID: parseInt(`1`),
            posts: parseInt(`567`),
            dates: {
                joined: `August 7, 2023`,
                lastActive: `August 7, 2023`,
                lastPost: `August 7, 2023`
            }
        },
        character: {
            species: standardizeLower(`Born Muse, Turned Vampire`),
            speciesRaw: standardizeLower(`Hybrid`),
            speciesClass: standardizeLower(`Hybrid`) !== `unset` && standardizeLower(cleanText(`Hybrid`)),
            extraSpeciesData: standardizeLower(`Born Muse, Turned Vampire`),
            pronouns: standardizeLower(`He/Him`),
            relationship: standardizeLower(`It's Complicated`),
            relationshipClass: standardizeLower(cleanText(`It's Complicated`)),
            age: parseInt(`170`),
            ageClass: `101500 immortal`,
            location: `Sydney, NS`,
            locationClass: standardizeLower(cleanText(`Sydney, NS`)),
            overview: lipsum,
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Lux`)),
            alias: standardizeLower(`Lux`),
            age: parseInt(`32`),
            pronouns: standardizeLower(`she/her`),
            timezone: standardizeLower(`GMT-04:00`),
            contact: standardizeLower(`Discord`),
            triggers: lipsum,
        }
    },
    {
        universal: {
            name: standardizeLower(`Emily Lawry`),
            id: parseInt(`4`),
            groupID: parseInt(`15`),
            groupName: standardizeLower(`Amaranth`),
            imageTall: imageTall,
            imageWide: imageWide,
            type: standardizeLower(`Character`),
            parentID: parseInt(`2`),
            posts: parseInt(`652`),
            dates: {
                joined: `August 9, 2022`,
                lastActive: `August 9, 2022`,
                lastPost: `August 9, 2022`
            }
        },
        character: {
            species: standardizeLower(`Werecreature (Wolf)`),
            speciesRaw: standardizeLower(`Werecreature`),
            speciesClass: standardizeLower(`Werecreature`) !== `unset` && standardizeLower(cleanText(`Werecreature`)),
            extraSpeciesData: standardizeLower(`Wolf`),
            pronouns: standardizeLower(`She/her`),
            relationship: standardizeLower(`Dating`),
            relationshipClass: standardizeLower(cleanText(`Dating`)),
            age: parseInt(`54`),
            ageClass: `4655 mortal`,
            location: `Temperance, NS`,
            locationClass: standardizeLower(cleanText(`Temperance, NS`)),
            overview: lipsum,
        },
        writer: {
            aliasClass: standardizeLower(cleanText(`Spyder`)),
            alias: standardizeLower(`Spyder`),
            age: parseInt(`26`),
            pronouns: standardizeLower(`They/Them`),
            timezone: standardizeLower(`GMT-05:00`),
            contact: standardizeLower(`Discord`),
            triggers: lipsum,
        }
    },
];