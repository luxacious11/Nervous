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

/***** Reserve a Role *****/
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
        hook: reserveLogs,
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
    console.log(publicDiscord.color);

    if(first) {
        sendAjax(form, memberData);
    }

    sendAjax(form, characterData, staffDiscord, publicDiscord);
});