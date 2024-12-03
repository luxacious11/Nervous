/***** Reserve a Face ******/
document.querySelector('#form-reserve').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        alias = form.querySelector('#alias'),
        face = form.querySelector('#face');

    let data = {
        SubmissionType: 'reserve-face',
        Member: getStandardValue(alias),
        Face: getStandardValue(face),
        Extension: 0,
    }

    let staffDiscord = {
        title: `New Face Reservation`,
        text: `${capitalize(data.Member)} has reserved ${capitalize(data.Face)}`,
        hook: reserveLogs,
    }

    setFormStatus(form);

    checkClaims(form, data, staffDiscord);
});

/***** Reserve a Role *****/
document.querySelector('#form-reserve-plot').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        alias = form.querySelector('#alias'),
        plot = form.querySelector('#plot'),
        section = form.querySelector('#section'),
        role = form.querySelector('#role'),
        roleLimit = role.options[role.selectedIndex].dataset.limit;

    let data = {
        SubmissionType: 'reserve-role',
        Member: getStandardValue(alias),
        Plot: getSelectText(plot),
        Section: getSelectText(section),
        Role: getSelectText(role),
        Limit: roleLimit,
        Instances: 0,
        Extension: 0,
    };

    let staffDiscord = {
        title: `New Role Reservation`,
        text: `${capitalize(data.Member)} has reserved ${capitalize(data.Role)} (${capitalize(data.Section)}) from the ${capitalize(data.Plot)} subplot.`,
        hook: reserveLogs,
    };

    setFormStatus(form);
    
    if(data.Limit === 'unlimited') {
        sendAjax(form, data, successMessage, staffDiscord);
    } else {
        checkRoleLimit(form, data, successMessage, staffDiscord);
    }
});

/***** Request a Species *****/
document.querySelector('#form-request-species').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        alias = form.querySelector('#alias'),
        species = form.querySelector('#species'),
        physiology = form.querySelector('#physiology'),
        abilities = form.querySelector('#abilities'),
        weaknesses = form.querySelector('#weaknesses'),
        ideas = form.querySelector('#ideas'),
        resources = form.querySelector('#resources');

    setFormStatus(form);

    let staffDiscord = {
        title: `New Role Reservation`,
        text: `**Species:** ${getValue(species)}
\n\n**Physiology:**\n${getValue(physiology)}
\n\n**Abilities:**\n${getValue(abilities)}
\n\n**Weaknesses:**\n${getValue(weaknesses)}
\n\n**Ideas:**\n${getValue(ideas)}
\n\n**Resources:**\n${getValue(resources)}
\n\nReview collectively as staff and then, when ready, start a ticket in the public server with all staff and the member in order to discuss approval / edits / refusal. All staff should react to this request when it has been seen and read.`,
        hook: speciesLogs,
    };


	if(staffDiscord.text.length >= 2000) {
		let count = staffDiscord.text.length / 2000;
		for (let i = 0; i < count; i++) {
			setTimeout(function() {
				let start = i * 2000;
				let end = start + 1999;
                    sendDiscordMessage(`https://discord.com/api/webhooks/${staffDiscord.hook}`, `New Species Request by ${capitalize(getStandardValue(alias))}, Part ${i + 1} of ${Math.ceil(count)}`, start !== 0 ? staffDiscord.text.slice(start - 1, end) : staffDiscord.text.slice(start, end));
			}, 500);
		}
	} else {
        sendDiscordMessage(`https://discord.com/api/webhooks/${staffDiscord.hook}`, `New Species Request by ${capitalize(getStandardValue(alias))}`, staffDiscord.text);
	}

    setFormStatus(form, false, true);
});

/***** Add a Business *****/
let addBusiness = document.querySelector('#form-add-business');
let addBusinessHours = addBusiness.querySelector('#hours');
simpleFieldToggle(addBusinessHours, '.ifSetHours', 'set hours');
document.querySelector('#form-add-business').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        alias = form.querySelector('#alias'),
        id = form.querySelector('#id'),
        employer = form.querySelector('#employer'),
        category = form.querySelector('#category'),
        location = form.querySelector('#location'),
        locationId = form.querySelector('#location'),
        hiring = form.querySelector('#hiring'),
        wanted = form.querySelector('#wanted'),
        summary = form.querySelector('#summary'),
        hoursField = form.querySelector('#hours'),
        hours = [];

    if(getSelectValue(hoursField) === 'set hours') {
        let hourSets = form.querySelectorAll('.hours-wrap .row');
        hourSets.forEach(set => {
            let rangeStart = set.querySelector('.days-start select').options[set.querySelector('.days-start select').selectedIndex].value.trim();
            let rangeEnd = set.querySelector('.days-end select').options[set.querySelector('.days-end select').selectedIndex].value.trim();
            let timeStart =  capitalize(set.querySelector('.time-start input').value.toLowerCase().trim(), [' ']);
            let timeEnd = set.querySelector('.time-end input').value !== `` && capitalize(set.querySelector('.time-end input').value.toLowerCase().trim(), [' ']);

            hours.push({
                range: `${rangeStart} - ${rangeEnd}`.trim(),
                time: timeEnd ? `${timeStart} - ${timeEnd}`.trim() : timeStart.trim(),
            });
        });
    } else {
        hours.push({
            text: getSelectValue(hoursField),
        });
    }

    let data = {
        SubmissionType: 'add-business',
        Owner: JSON.stringify({
            alias: getStandardValue(alias),
            id: getAccountID(id)
        }),
        Employer: getStandardValue(employer),
        Category: getSelectText(category),
        Location: getSelectText(location),
        LocationID: getSelectValue(locationId),
        Summary: getValue(summary),
        Hours: JSON.stringify(hours),
        Hiring: getSelectValue(hiring),
        Wanted: getValue(wanted),
    }

    let staffDiscord = {
        title: `New Business Added: ${capitalize(data.Employer, [' ', '-'])}`,
        text: `**Submitted by:** ${capitalize(getStandardValue(alias), [' ', '-'])} (#${getAccountID(id)})
        **View here:** <https://wherethehellis.jcink.net/?act=Pages&kid=businesses#${cleanText(data.Employer)}>`,
        hook: businessLogs,
    }
    
    setFormStatus(form);

    console.log(data);

    sendAjax(form, data, staffDiscord);
});

/***** Add a Character *****/
let sortForm = document.querySelector('#form-sort');
let requestToggle = sortForm.querySelector('#requested');
let employedToggle = sortForm.querySelector('#employed');
let plotToggle = sortForm.querySelector('#subplot');
let firstToggle = sortForm.querySelector('#first');
simpleFieldToggle(requestToggle, '.ifRequest', 'y');
simpleFieldToggle(employedToggle, '.ifEmployed', 'y');
simpleFieldToggle(plotToggle, '.ifPlot', 'y');
simpleFieldToggle(firstToggle, '.ifFirst', 'y');
document.querySelector('#form-sort').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        character = form.querySelector('#character'),
        accountId = form.querySelector('#accountid'),
        group = form.querySelector('#group'),
        face = form.querySelector('#face'),
        requestDetails = form.querySelector('#request').value.trim(),
        alias = form.querySelector('#alias'),
        parentId = form.querySelector('#parentid'),
        pronouns = form.querySelector('#pronouns'),
        age = form.querySelector('#age'),
        timezone = form.querySelector('#timezone'),
        about = form.querySelector('#about'),
        triggers = form.querySelector('#triggers'),
        language = form.querySelector('#language'),
        sexualContent = form.querySelector('#sex'),
        violence = form.querySelector('#violence'),
        employed = getSelectValue(form.querySelector('#employed')) === 'y' ? true : false,
        subplot = getSelectValue(form.querySelector('#subplot')) === 'y' ? true : false,
        first = getSelectValue(form.querySelector('#first')) === 'y' ? true : false,
        jobs = [], roles = [], memberData = {};

    //jobs array
    if(employed) {
        let jobSets = document.querySelectorAll('.job-wrap');
        jobSets.forEach(job => {
            jobs.push({
                employer: getSelectText(job.querySelector('.employer select')),
                section: job.querySelector('.job-section input').value.toLowerCase().trim(),
                position: job.querySelector('.position input').value.toLowerCase().trim(),
            });
        });
    }

    //roles array
    if(subplot) {
        let roleSets = document.querySelectorAll('.role-wrap');
        roleSets.forEach(role => {
            roles.push({
                plot: getSelectText(role.querySelector('.plot select')),
                section: getSelectText(role.querySelector('.plot-section select')),
                role: getSelectText(role.querySelector('.role select')),
            });
        });
    }

    //set character data
    let characterData = {
        SubmissionType: 'add-claims',
        Member: getStandardValue(alias),
        Character: getStandardValue(character),
        AccountID: getAccountID(accountId),
        ParentID: getAccountID(parentId),
        Group: getSelectText(group),
        GroupID: getSelectValue(group),
        Face: getStandardValue(face),
        Jobs: jobs.length > 0 ? JSON.stringify(jobs) : '',
        Roles: roles.length > 0 ? JSON.stringify(roles) : '',
        Status: 'pending',
    }

    //set member data if first
    if(first) {
        memberData = {
            SubmissionType: 'add-member',
            Member: getStandardValue(alias),
            AccountID: getAccountID(parentId),
            Group: 'writer',
            GroupID: '6',
            Pronouns: getStandardValue(pronouns),
            Age: age.value.trim(),
            Timezone: getStandardValue(timezone),
            About: about.value.trim(),
            Triggers: triggers.value.trim(),
            Language: getSelectValue(language),
            Sex: getSelectValue(sexualContent),
            Violence: getSelectValue(violence),
        }
    }

    let requestMessage = ``;
    if(getSelectValue(form.querySelector('#requested')) === 'y') {
        requestMessage = `

        > ${requestDetails}`;
    }

    let publicRequestMessage = ``;
    if(getSelectValue(form.querySelector('#requested')) === 'y') {
        publicRequestMessage = `
        
        _This character fills one or more request. Members managing those requests will be contacted prior to character approval and sorting._`;
    }

    let staffDiscord = {
        title: `New Sorting Request: ${capitalize(characterData.Character)}`,
        text: `**Played by:** [${capitalize(characterData.Member, [' ', '-'])}](<https://${siteName}.jcink.net/?showuser=${characterData.ParentID}>)
        **Group:** ${capitalize(characterData.Group, [' '])}
        **First Character?** ${capitalize(getSelectText(form.querySelector('#first')))}
        **Requested?** ${capitalize(getSelectText(form.querySelector('#requested')))}${requestMessage}
        
        [**View Profile**](<https://${siteName}.jcink.net/?showuser=${characterData.AccountID}>)
        
        Please add this task to the JIRA board and mark this log with a checkmark. To sort the character, assign the JIRA task to yourself, move to the In Progress status, and then follow the acceptance process outlined in the Documentation.`,
        hook: claimLogs,
        color: rgbToHex(colors[characterData.Group][0], colors[characterData.Group][1], colors[characterData.Group][2]),
    }

    let publicDiscord = {
        title: `${capitalize(characterData.Member, [' ', '-'])} has finished ${capitalize(characterData.Character)}!`,
        text: `> _looks like ${characterData.Face}, belongs in ${characterData.Group}_

        [**Learn More**](<https://${siteName}.jcink.net/?showuser=${characterData.AccountID}>)${publicRequestMessage}`,
        hook: sortLogs,
        notification: `<@&${staffDiscordRole}>`,
        color: rgbToHex(colors[characterData.Group][0], colors[characterData.Group][1], colors[characterData.Group][2]),
    }

    setFormStatus(form);

    if(first) {
        sendAjax(form, memberData);
    }

    sendAjax(form, characterData, staffDiscord, publicDiscord);
});

/***** Edit Member Claims *****/
let editMemberForm = document.querySelector('#form-edit-member');
let aliasBox = editMemberForm.querySelector('[value="alias"]');
let pronounsBox = editMemberForm.querySelector('[value="pronouns"]');
let ageBox = editMemberForm.querySelector('[value="age"]');
let timezoneBox = editMemberForm.querySelector('[value="timezone"]');
let aboutBox = editMemberForm.querySelector('[value="about"]');
let triggersBox = editMemberForm.querySelector('[value="triggers"]');
let ratingsBox = editMemberForm.querySelector('[value="ratings"]');
checkToggle(aliasBox, '.ifAlias');
checkToggle(pronounsBox, '.ifPronouns');
checkToggle(ageBox, '.ifAge');
checkToggle(timezoneBox, '.ifTimezone');
checkToggle(aboutBox, '.ifAbout');
checkToggle(triggersBox, '.ifTriggers');
checkToggle(ratingsBox, '.ifRatings');
editMemberForm.addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        selectedChanges = Array.prototype.slice.call(form.querySelectorAll('[name="edit-member"]')).filter(item => item.checked).map(item => item.value),
        accountId = form.querySelector('#parentid'),
        alias = form.querySelector('#alias'),
        pronouns = form.querySelector('#pronouns'),
        age = form.querySelector('#age'),
        timezone = form.querySelector('#timezone'),
        about = form.querySelector('#about'),
        triggers = form.querySelector('#triggers'),
        language = form.querySelector('#language'),
        sex = form.querySelector('#sex'),
        violence = form.querySelector('#violence');

    let data = {
        SubmissionType: `edit-member`,
        AccountID: getAccountID(accountId),
        selectedChanges,
        Alias: getStandardValue(alias),
        Pronouns: getStandardValue(pronouns),
        Age: getValue(age),
        Timezone: getStandardValue(timezone),
        About: getValue(about),
        Triggers: getValue(triggers),
        Language: getSelectValue(language),
        Sex: getSelectValue(sex),
        Violence: getSelectValue(violence),
    }

    setFormStatus(form);

    editMember(form, data);
});

/***** Edit Character Claims *****/
let editCharacterForm = document.querySelector('#form-edit-character');
let profile = editCharacterForm.querySelector('#accountid');
let nameBox = editCharacterForm.querySelector('[value="character"]');
let groupBox = editCharacterForm.querySelector('[value="group"]');
let jobAddBox = editCharacterForm.querySelector('[value="jobs-add"]');
let jobChangeBox = editCharacterForm.querySelector('[value="jobs-change"]');
let jobRemoveBox = editCharacterForm.querySelector('[value="jobs-remove"]');
let roleAddBox = editCharacterForm.querySelector('[value="roles-add"]');
let roleChangeBox = editCharacterForm.querySelector('[value="roles-change"]');
let roleRemoveBox = editCharacterForm.querySelector('[value="roles-remove"]');
checkToggle(nameBox, '.ifName');
checkToggle(groupBox, '.ifGroup');
checkToggle(jobAddBox, '.ifJobAdd');
checkToggle(jobChangeBox, '.ifJobChange');
checkToggle(jobRemoveBox, '.ifJobRemove');
checkToggle(roleAddBox, '.ifRoleAdd');
checkToggle(roleChangeBox, '.ifRoleChange');
checkToggle(roleRemoveBox, '.ifRoleRemove');
profile.addEventListener('input', e => {
    pullCharacterClaims(e.currentTarget);
});
editCharacterForm.addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        selectedChanges = Array.prototype.slice.call(form.querySelectorAll('[name="edit-character"]')).filter(item => item.checked).map(item => item.value),
        accountId = form.querySelector('#accountid'),
        character = form.querySelector('#character'),
        group = form.querySelector('#group');

    let data = {
        SubmissionType: `edit-claims`,
        AccountID: getAccountID(accountId),
        selectedChanges,
        Character: getStandardValue(character),
        Group: getSelectText(group),
        GroupID: getSelectValue(group),
    }

    setFormStatus(form);

    editCharacter(form, data);
});

/***** Edit Business *****/
let editBusinessForm = document.querySelector('#form-edit-business');
let wantedBox = editBusinessForm.querySelector('[value="wanted"]');
let hiringBox = editBusinessForm.querySelector('[value="hiring"]');
let hoursBox = editBusinessForm.querySelector('[value="hours"]');
let editHours = editBusinessForm.querySelector('#hours');
checkToggle(wantedBox, '.ifWanted');
checkToggle(hiringBox, '.ifHiring');
checkToggle(hoursBox, '.ifHours');
simpleFieldToggle(editHours, '.ifSetHours', 'set hours');
editBusinessForm.addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        selectedChanges = Array.prototype.slice.call(form.querySelectorAll('[name="edit-business"]')).filter(item => item.checked).map(item => item.value),
        employer = form.querySelector('#employer'),
        hiring = form.querySelector('#hiring'),
        wanted = form.querySelector('#wanted'),
        hours = [];

    if(form.querySelector('#hours').options[form.querySelector('#hours').selectedIndex].value === 'set hours') {
        let hourSets = form.querySelectorAll('.hours-wrap .row');
        hourSets.forEach(set => {
            let rangeStart = getSelectValue(set.querySelector('.days-start select'));
            let rangeEnd = getSelectValue(set.querySelector('.days-end select'));
            let timeStart =  capitalize(getStandardValue(set.querySelector('.time-start input')), [' ']);
            let timeEnd = getStandardValue(set.querySelector('.time-end input')) !== `` && capitalize(getStandardValue(set.querySelector('.time-end input')), [' ']);

            hours.push({
                range: `${rangeStart} - ${rangeEnd}`.trim(),
                time: timeEnd ? `${timeStart} - ${timeEnd}`.trim() : timeStart.trim(),
            });
        });
    } else {
        hours.push({
            text: getSelectValue(form.querySelector('#hours')),
        });
    }

    let data = {
        SubmissionType: 'edit-business',
        selectedChanges: selectedChanges,
        Employer: getSelectText(employer),
        Hours: JSON.stringify(hours),
        Hiring: getSelectValue(hiring),
        Wanted: getValue(wanted),
    }

    setFormStatus(form);

    editBusiness(form, data);
});

/***** Request Help *****/
let requestType = document.querySelector('#form-moderation #type');
simpleFieldToggle(requestType, '.ifBoard', 'board');
simpleFieldToggle(requestType, '.ifThread', 'thread');
simpleFieldToggle(requestType, '.ifAccount', 'account');
simpleFieldToggle(requestType, '.ifOther', 'other');
complexFieldToggle(requestType, '.ifNotThread', ['', 'thread'], false);
document.querySelector('#form-moderation').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget;
    let type = getSelectValue(form.querySelector('#type'));
    let requester = getStandardValue(form.querySelector('#requester'));
    let board, parent, threads, moveTo, account, request;
    let discord = {
        title: `New Moderation Request: ${capitalize(type, [' '])}`,
        text: `**Requested by:** ${capitalize(requester, [' ', '-'])}\n`,
        hook: modLogs,
    };
    switch(type) {
        case `board`:
            board = getStandardValue(form.querySelector('#board'));
            parent = getStandardValue(form.querySelector('#parent'));
            request = getValue(form.querySelector('#request'));
            discord.text += `**Board Title:** ${capitalize(board)}
            **Location:** ${capitalize(parent)}
            **Request Details:**
            ${request}`;
            break;
        case `thread`:
            threads = getValue(form.querySelector('#threads'));
            moveTo = getSelectText(form.querySelector('#thread-location'));
            discord.text += `**Move To:** ${moveTo}
            **Thread(s) to Move:**
            ${threads}`;
            break;
        case `account`:
            account = getStandardValue(form.querySelector('#account'));
            request = getValue(form.querySelector('#request'));
            discord.text += `**Account:** ${account}
            **Request:**
            ${request}`;
            break;
        case `other`:
            request = getValue(form.querySelector('#request'));
            discord.text += `**Request:**
            ${request}`;
            break;
        default:
            break;
    }

    sendDiscordMessage(`https://discord.com/api/webhooks/${discord.hook}`, discord.title, discord.text);

    form.innerHTML = successMessage;
});

/***** Approve Character *****/
document.querySelector('#form-approve').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        id = form.querySelector('#accountid'),
        existing = staticClaims.filter(item => item.AccountID === getAccountID(id))[0],
        bodyText = form.querySelector('#about');
    
    let data = {
        SubmissionType: 'approve-character',
        AccountID: getAccountID(id),
        Status: 'approved',
    }

    let publicDiscord = {
        title: `Welcome ${capitalize(existing.Character)}!`,
        text: `**Played by ${capitalize(existing.Member, [' ', '-'])}**
        _looks like ${existing.Face}, belongs in ${existing.Group}_

        > ${getValue(bodyText)}

        [**Read More**](https://wherethehellis.jcink.net/?showuser=${existing.AccountID})`,
        hook: announceLogs,
        color: rgbToHex(colors[existing.Group][0], colors[existing.Group][1], colors[existing.Group][2]),
    }

    setFormStatus(form);
    
    sendAjax(form, data, publicDiscord);
});

/***** Add Species *****/
document.querySelector('#form-add-species').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        species = form.querySelector('#species'),
        aging = form.querySelector('#aging'),
        lifespan = form.querySelector('#lifespan'),
        physiology = form.querySelector('#physiology'),
        community = form.querySelector('#community'),
        strength = form.querySelector('#strength'),
        longevity = form.querySelector('#longevity'),
        vulnerability = form.querySelector('#vulnerability'),
        customPercent = form.querySelector('#custom-percent'),
        customTrait = form.querySelector('#custom-trait'),
        premium = form.querySelector('#speciescat[value="cat-premium"]').checked,
        hide = form.querySelector('#speciescat[value="staffOnly"]').checked,
        tagObjects = form.querySelectorAll('.form-tag'),
        tagArray = Array.prototype.slice.call(tagObjects).filter(tag => tag.checked),
        tags = tagArray.map(tag => tag.value).join(' '),
        awarenessObjects = form.querySelectorAll('[name="awareness"]'),
        awarenessArray = Array.prototype.slice.call(awarenessObjects).filter(tag => tag.checked),
        awareness = awarenessArray[0].value,
        knowledgeObjects = form.querySelectorAll('[name="knowledge"]'),
        knowledgeArray = Array.prototype.slice.call(knowledgeObjects).filter(tag => tag.checked),
        knowledge = knowledgeArray[0].value;
        abilities = [], weaknesses = [], credits = [];

    let traits = [
        {
            trait: 'physical strength',
            percent: getValue(strength),
        },
        {
            trait: 'longevity',
            percent: getValue(longevity),
        },
        {
            trait: 'vulnerability',
            percent: getValue(vulnerability),
        },
        {
            trait: getStandardValue(customTrait),
            percent: getValue(customPercent),
        },
    ];

    let abilitySets = document.querySelectorAll('.ability-row');
    abilitySets.forEach(ability => {
        abilities.push(getValue(ability.querySelector('input')));
    });

    let weaknessSets = document.querySelectorAll('.weakness-row');
    weaknessSets.forEach(weakness => {
        weaknesses.push(getValue(weakness.querySelector('input')));
    });

    let creditSets = document.querySelectorAll('.credit-row');
    creditSets.forEach(credit => {
        credits.push({
            username: getStandardValue(credit.querySelector('.user-name input')),
            userid: getAccountID(credit.querySelector('.user-id input')),
        });
    });

    let data = {
        SubmissionType: `add-species`,
        Species: getStandardValue(species),
        Aging: getStandardValue(aging),
        Lifespan: getStandardValue(lifespan),
        Physiology: getValue(physiology),
        CommunityStructure: getValue(community),
        Strengths: abilities.length > 0 ? JSON.stringify(abilities) : '',
        Weaknesses: weaknesses.length > 0 ? JSON.stringify(weaknesses) : '',
        Traits: traits.length > 0 ? JSON.stringify(traits) : '',
        Credit: credits.length > 0 ? JSON.stringify(credits) : '',
        Premium: premium,
        Tags: tags,
        Awareness: awareness,
        Knowledge: knowledge,
    }

    let staffDiscord = {
        title: `New Species Addition!`,
        text: `**${capitalize(data.Species)}** has been added to the sheet${hide && ` for future release`}. Review them here: <https://${siteName}.jcink.net/?act=Pages&kid=species&typesearch=${data.Species.replace(' ', '').toLowerCase().trim()}>`,
        hook: staffLogs,
    }

    let publicDiscord = {
        title: `New Species Addition!`,
        text: `**${capitalize(data.Species)}** has been added as a ${data.Premium ? `premium species` : `playable species`}! Read more about them here: <https://${siteName}.jcink.net/?act=Pages&kid=species&typesearch=${data.Species.replace(' ', '').toLowerCase().trim()}>`,
        hook: publicSpeciesLogs,
    }

    setFormStatus(form);

    console.log(data);

    sendAjax(form, data, staffDiscord, !hide ? publicDiscord : null);
});

/***** Add Plot *****/
document.querySelector('#form-add-plot').addEventListener('submit', e => {
    e.preventDefault();

    let form = e.currentTarget,
        plot = form.querySelector('#plot'),
        id = form.querySelector('#id'),
        priority = form.querySelector('#priority'),
        overview = form.querySelector('#overview'),
        sectionWraps = form.querySelectorAll('.section-wrap'),
        sections = [];

    sectionWraps.forEach((sectionWrap, i) => {
        let title = getStandardValue(sectionWrap.querySelector('.section-title input'));
        let priority = i + 1;
        let overview = getValue(sectionWrap.querySelector('.section-overview textarea'));
        let roleWraps = sectionWrap.querySelectorAll('.section-role');
        let roles = [];

        roleWraps.forEach((roleWrap, i) => {
            let title = getStandardValue(roleWrap.querySelector('.role-title input'));
            let priority = i + 1;
            let limit = getStandardValue(roleWrap.querySelector('.role-limit input'));
            let description = getValue(roleWrap.querySelector('.role-description input'));
            roles.push({
                role: title,
                priority: priority,
                limit: limit,
                description: description,
            });
        });

        sections.push({
            title: title,
            priority: priority,
            overview: overview,
            roles: roles,
        });
    });

    let data = {
        SubmissionType: 'add-plot',
        Plot: getStandardValue(plot),
        PlotID: getStandardValue(id),
        Priority: getValue(priority),
        Overview: getValue(overview),
        Sections: JSON.stringify(sections),
    }

    let staffDiscord = {
        title: `Plot Added`,
        text: `No extra actions required.`,
        hook: staffLogs,
    }

    setFormStatus(form);

    sendAjax(form, data, staffDiscord);
});