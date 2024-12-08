/****** Global Initialization ******/
function initPopupProfile(profileSelector, clickable) {
    $(document).ready(function () {
        $('body').append('<div id="popout"><div class="scroll"></div></div>');

        async function handleProfileLinkClick(event) {
            event.preventDefault();
            const profileReturn = await $.get($(this).attr('href'), function (data) {
                profileHtml = $(profileSelector, data)
            })

	    document.querySelector('#popout').classList.add('is-open');
	    document.querySelector('.invisibleEl').classList.add('menu-open');
	    document.querySelectorAll('.nav--popout').forEach(nav => nav.classList.remove('is-open'));
            $("#popout .scroll").html(profileHtml);
	    document.querySelectorAll('.notPopout').forEach(el => el.remove());

	    removeBlankFields();
	    initPopoutFunctions(document.querySelector('#popout .profile--header h1').innerText);
	    initAccordion('.popout-accordion');
	    initMarkdown();
	    let group = document.querySelector('#popout .profile').dataset.group;
	    let accountType = document.querySelector('#popout .profile').dataset.accountType;
    
	    let ratings = [
	      {'type': 'lang','value': document.querySelector('.profile--popout-info .lang').innerHTML},
	      {'type': 'sex','value': document.querySelector('.profile--popout-info .sex').innerHTML},
	      {'type': 'vio','value': document.querySelector('.profile--popout-info .vio').innerHTML}
	    ];
	    let images = {
	      'tall-1': document.querySelector('.profile--popout-info .tall-a').getAttribute('src'),
	      'tall-2': document.querySelector('.profile--popout-info .tall-b').getAttribute('src'),
	      'wide-1': document.querySelector('.profile--popout-info .wide-a').getAttribute('src'),
	      'square-1': document.querySelector('.profile--popout-info .square-a').getAttribute('src'),
	      'square-2': document.querySelector('.profile--popout-info .square-b').getAttribute('src'),
	      'square-3': document.querySelector('.profile--popout-info .square-c').getAttribute('src'),
	    };
	    let birthday = {
	      'year': document.querySelector('.profile--popout-info .year').innerHTML,
	      'month': document.querySelector('.profile--popout-info .month').innerHTML,
	      'day': document.querySelector('.profile--popout-info .day').innerHTML,
	    }
	    let speciesDetails = {
	      'Hybrid': document.querySelector('.profile--popout-info .hybrid').innerHTML,
	      'Werecreature': document.querySelector('.profile--popout-info .were').innerHTML,
	      'Dragon': document.querySelector('.profile--popout-info .dragon').innerHTML,
	      'Vampire': document.querySelector('.profile--popout-info .vampire').innerHTML,
	      'Faerie': document.querySelector('.profile--popout-info .faerie').innerHTML,
	      'Elemental': document.querySelector('.profile--popout-info .elemental').innerHTML,
	      'Centaur': document.querySelector('.profile--popout-info .centaur').innerHTML,
	    }

	    if(oocGroups.includes(group) ||
	      (optGroups.includes(group) && accountType.toLowerCase() === `member`)
	    ) {
    		document.querySelectorAll('.charOnly').forEach(item => item.remove());
    	        ratings.forEach(rating => formatRating(rating));
    	        setRoster();
	    } else {
    		document.querySelectorAll('.memAccOnly').forEach(item => item.remove());
    		document.querySelectorAll('.notCharacterPopout').forEach(item => item.remove());
      	      initCharacter(document.querySelector('.profile--popout-info .relTrack').innerHTML, document.querySelector('.profile--popout-info .aesthetic').innerHTML, images, document.querySelector('.profile--popout-info .species').innerHTML, speciesDetails, document.querySelector('.profile--popout-info .overflow').innerHTML, document.querySelector('#popout .profile--header h1').innerText, birthday, true);
	    }

            $('html').click(function (e) {
                if (!$(e.target).closest(profileSelector).length) {
                    document.querySelector('#popout').classList.remove('is-open');
                    document.getElementById('popout').innerHTML = `<div class="scroll"></div>`;
	    	    document.querySelector('.invisibleEl').classList.remove('menu-open');
                }
            });

            $('html').on('keyup', function (e) {
                if (e.keyCode === 27) {
                    document.querySelector('#popout').classList.remove('is-open');
                    document.getElementById('popout').innerHTML = `<div class="scroll"></div>`;
	    	    document.querySelector('.invisibleEl').classList.remove('menu-open');
                }
            });
        }
        $(clickable).on('click', handleProfileLinkClick);
    });
}
function initPopoutFunctions(title) {
    document.querySelector('.profile--header h1').innerHTML = capitalize(title);
}
function initClipboard() {
    let clipboard = new Clipboard('.clipboard');
    clipboard.on('success', function(e) {
        console.log('clipboard success: ' + e);
    });
    clipboard.on('error', function(e) {
        console.log('clipboard error: ' + e);
    });
    let clipcode = new Clipboard('.codeclick', {
        target: function(trigger) {
        return trigger.nextElementSibling;
        }
    });
}
function initCodebox() {
    $("table[id='CODE-WRAP']").each(function() {
        var cc = $(this).find("td[id='CODE']").html();

        $(this).html(
            "<div class='codeblock code--wrapper'><div class='c-title codeclick'>Click to Copy</div><div class='codecon'><pre><code class='scroll'>"
            + cc +
            "</code></pre></div></div>"
        );
    });
}
function initCopyLink() {
    let clippedURL = new Clipboard('.post--permalink');
    document.querySelectorAll('.post--permalink').forEach(link => {
        link.addEventListener('click', e => {
            e.currentTarget.querySelector('.note').style.opacity = 1;
            setTimeout(() => {
                document.querySelectorAll('.note').forEach(note => note.style.opacity = 0);
            }, 3000);
        });
    });
}
function initQuickLogin() {
    if($('#quick-login').length) {
        $('#quick-login').appendTo('#quick-login-clip');
        document.querySelector('#quick-login-clip input[name="UserName"]').setAttribute('placeholder', 'Username');
        document.querySelector('#quick-login-clip input[name="PassWord"]').setAttribute('placeholder', 'Password');
    } else {
        var main_url = location.href.split('?')[0];
        $.get(main_url, function (data) {
            $('#quick-login', data).appendTo('#quick-login-clip');
            document.querySelector('#quick-login-clip input[name="UserName"]').setAttribute('placeholder', 'Username');
            document.querySelector('#quick-login-clip input[name="PassWord"]').setAttribute('placeholder', 'Password');
        });
    }
}
function initSwitcher() {
	let characters = switcher.querySelectorAll('option');
	let newSwitch = `<div class="switch">`;
	characters.forEach((character, i) => {
		if(i !== 0) {
			let characterName = character.innerText.trim();
			let characterId = character.value;
			newSwitch += `<label class="switch--block">
				<input type="checkbox" value="${characterId}" onchange="this.form.submit()" name="sub_id" />
				${createAvatars(`switch--image`, characterId)}
				<b>${capitalize(characterName)}</b>
			</label>`;
		}
	});
	newSwitch += `</div>`;
	switcher.insertAdjacentHTML('afterend', newSwitch);
	switcher.remove();
}
function basicMarkdownSplit(string, identifier, opening, closing) {
    let str;
    string.split(identifier).map((newvalue, newindex) => {
        if(string.split(identifier).length - 1 !== newindex) {
            if(newindex % 2 == 0) {
                str += newvalue;
            } else {
                str += `${opening}${newvalue}${closing}`;
            }
        }
    });
  
    return str;
}
function handleSpecialMarkdownAvoidance(value, identifier, opening, closing) {
    let newString = ``, warningIndex = -1;
    let strings = value.split(`="`);
    if (strings.length > 1) {
        strings.forEach((string, i) => {
    
            if(string.includes(identifier)) {
    
            if(string.includes('href') || string.includes('target') || string.includes('src') || string.includes('class') || string.includes('alt')) {
                warningIndex = i;
                newString += basicMarkdownSplit(string, identifier, opening, closing);
                if(strings.length - 1 !== i) {
                    newString += `="`;
                }
            } else {
                if(warningIndex === i - 1) {
                    newString += `${string.split(`">`)[0]}">`;
                    newString += basicMarkdownSplit(string, identifier, opening, closing);
                } else {
                    newString += basicMarkdownSplit(string, identifier, opening, closing);
                }
            }
    
            } else {
                if(strings.length - 1 !== i) {
                    newString += `${string}="`;
                } else {
                    newString += string;
                }
            }
        });
        return newString;
    } else {
        return `${value}${identifier}`;
    }
}
function formatMarkdown(str, identifier, opening, closing) {
    let original = str;
  
    str = str.split(identifier).map((value, index) => {
  
        if(str.split(identifier).length - 1 !== index && value !== '') {
            if ((value.includes('href=') || value.includes('target=') || value.includes('src=') || value.includes('class=') || value.includes('alt=')) && str.split(identifier).length > 1) {
                return handleSpecialMarkdownAvoidance(value, identifier, opening, closing);
            } else if(index % 2 == 0) {
                return value;
            } else {
                return `${opening}${value}${closing}`;
            }
        } else {
                return '';
        }
      
    }).join('');
  
    return str !== '' ? str : original;
}
function initMarkdown() {
    console.log(markdownSafe);
    if(document.querySelectorAll(markdownSafe).length > 0) {
        document.querySelectorAll(markdownSafe).forEach(post => {
            let str = post.innerHTML;
            str = formatMarkdown(str, `**`, `<b>"`, `"</b>`);
            str = formatMarkdown(str, `_`, `<i>`, `</i>`);
            str = formatMarkdown(str, `||`, `<tag-spoiler>`, `</tag-spoiler>`);
            post.innerHTML = str;
        });
    }

    let spoilers = document.querySelectorAll('tag-spoiler');
    if(spoilers.length > 0) {
        spoilers.forEach(spoiler => {
            spoiler.addEventListener('click', e => {e.currentTarget.classList.add('is-visible')});
        });
    }


    let quickLists = document.querySelectorAll('tl');
    if(quickLists.length > 0) {
        quickLists.forEach(list => {
            list.innerHTML = formatQuickList(list);
        });
    }
}

/****** Carousel Functions ******/
function carouselArrowIndex(e) {
    let {bullets, slides} = carouselVariableSetup(e);
    let index;
    bullets.forEach((bullet, i) => {
        if(bullet.classList.contains('is-active')) {
            index = i;
        }
    });
    
    //remove all active
    bullets.forEach(bullet => bullet.classList.remove('is-active'));
    slides.forEach(slide => slide.classList.remove('is-active'));

    return index;
}
function carouselVariableSetup(e, level = 0) {
    let wrapper;
    if(level === 1) {
        wrapper = e.parentNode.parentNode.parentNode;
    } else {
        wrapper = e.parentNode.parentNode;
    }

    let bullets = wrapper.querySelectorAll('.post--page');
    let slides = wrapper.querySelectorAll('.post--slide');

    return {bullets, slides, wrapper};
}
function carouselArrowAct(index, bullets, slides, wrapper) {
    //add active as needed
    bullets[index].classList.add('is-active');
    slides[index].classList.add('is-active');

    //move slides
    slides.forEach(slide => {
        slide.style.left = `${index * -100}%`;
    });
    
    //handle image
    if(index !== 0) {
        wrapper.classList.remove('is-image');
    } else {
        wrapper.classList.add('is-image');
    }
}
function carouselLeft(e) {
    //set up variables
    let index = carouselArrowIndex(e);
    let {bullets, slides, wrapper} = carouselVariableSetup(e);

    //determine new index
    if(index === 0) {
        index = bullets.length - 1;
    } else {
        index--;
    }

    //act on new index
    carouselArrowAct(index, bullets, slides, wrapper);
}
function carouselRight(e) {
    //set up variables
    let index = carouselArrowIndex(e);
    let {bullets, slides, wrapper} = carouselVariableSetup(e);

    //determine new index
    if(index === bullets.length - 1) {
        index = 0;
    } else {
        index++;
    }

    //act on new index
    carouselArrowAct(index, bullets, slides, wrapper);
}
function carouselPage(e) {
    let {bullets, slides, wrapper} = carouselVariableSetup(e, 1);
    let bulletsArray = Array.from(bullets);
    let index = bulletsArray.indexOf.call(bulletsArray, e);
    
    //remove all active
    bullets.forEach(bullet => bullet.classList.remove('is-active'));
    slides.forEach(slide => slide.classList.remove('is-active'));

    //act on new index
    carouselArrowAct(index, bullets, slides, wrapper);
}

/****** Index Initialization ******/
function initForums() {
    //manual links
    document.querySelectorAll('.forum .forum--manual-links').forEach(linkSet => {
        //subforums exist
        let subforumEl = linkSet.closest('.forum').querySelector('.subforums');
        if(subforumEl) {
            subforumEl.insertAdjacentHTML('beforeend', linkSet.innerHTML);
        }
        //subforums don't exist
        else {
            linkSet.closest('.forum').querySelector('.forum--links').insertAdjacentHTML('beforeend', linkSet.innerHTML);
            linkSet.closest('.forum').querySelector('.forum--links').classList.add('manual-only');
        }

        linkSet.remove();
    });
    document.querySelectorAll('.forum--links .subforums').forEach(linkSet => {
        if(linkSet.innerText === '') {
            linkSet.closest('.forum--links').classList.add('hidden');
        }
    });
    document.querySelectorAll('.forum--desc').forEach(el => el.remove());
}

/***** Profile Only *****/
function removeBlankFields() {
    document.querySelectorAll('.optional i').forEach(italic => {
        if(italic.innerText === 'No Information') {
            italic.closest('.optional').remove();
        }
    })
}
function formatRating(rating, selectorPrefix = ``) {
    if(rating.value === 'Any') {
        document.querySelector(`${selectorPrefix}${rating.type}-clip`).innerText = 3;
    } else if(rating.value === 'With Limits') {
        document.querySelector(`${selectorPrefix}${rating.type}-clip`).innerText = 2;
    } else if(rating.value === 'Mild') {
        document.querySelector(`${selectorPrefix}${rating.type}-clip`).innerText = 1;
    } else {
        document.querySelector(`${selectorPrefix}${rating.type}-clip`).innerText = 0;
    }
}
function formatAesthetics(aesthetics, images) {
    let imageHTML;
    switch (aesthetics) {
        case 'Mosaic':
            imageHTML = `<span class="twoWide"><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span class="twoWide"><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>
                <span><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>
                <span class="twoWide"><img src="${images['square-3']}" title="Square #3" alt="Square #3" loading="lazy" /></span>
                <span class="twoHigh"><img src="${images['tall-2']}" title="Tall #2" alt="Tall #2" loading="lazy" /></span>
                <span class="threeWide"><img src="${images['wide-1']}" title="Wide #1" alt="Wide #1" loading="lazy" /></span>`;
            break;
        case 'Grid':
            imageHTML = `<span class="twoWide"><img src="${images['wide-1']}" title="Wide #1" alt="Wide #1" loading="lazy" /></span>
                <span class="twoHigh"><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>
                <span><img src="${images['square-1']}" title="Square #1" alt="Square #1" loading="lazy" /></span>
                <span><img src="${images['square-2']}" title="Square #2" alt="Square #2" loading="lazy" /></span>`;
            break;
        case 'Single':
        default: 
        imageHTML = `<span><img src="${images['tall-1']}" title="Tall #1" alt="Tall #1" loading="lazy" /></span>`;
            break;
    }
    return imageHTML;
}
function Alpha(arr) {
    // SUBACCOUNTS PROFILE DISPLAY SCRIPT (ABC ORDER) by tonya aka wildflower
    let newArr = Array.prototype.slice.call(arr).map(item => {
        if (item.value === '-------------------') {
            return null
        }
        return {
            character: item.innerText.trim().toLowerCase().replace(`» `, ``),
            account: item.value
        }
    }).filter(item => item !== null)
    .sort((a, b) => {
        if(a.character > b.character) {
            return 1;
        } else if (a.character < b.character) {
            return -1;
        } else {
            return 0;
        }
    });
    return newArr;
}
function createAvatars(classes, id, attributes = ``) {
    let html = `<div class="${classes}" style="background-image: `;
    for(let i = 0; i < fileTypes.length; i++) {
        html += `url(https://files.jcink.net/${uploads}/${siteName}/av-${id}.${fileTypes[i]}),`;
    }
    html += `url(${defaultSquare});" ${attributes}></div>`;
    return html;
}
function setRoster() {   
    let alphaChars = Alpha(document.querySelectorAll('select[name=showuser] option'));
    alphaChars.forEach(character => {
        let imageDiv = createAvatars('profile--account-image', character.account, attributes = ``);

        let html = `<a class="profile--account" href="?showuser=${character.account}">
            ${imageDiv}
            <b>${capitalize(character.character)}</b>
        </a>`;

        document.querySelector('.profile--roster').insertAdjacentHTML('beforeend', html);
    });
}
function initProfile (title, ratings) {
    document.querySelector('.profile--header h1').innerHTML = capitalize(title);
    ratings.forEach(rating => formatRating(rating));
    removeBlankFields();
}
function initCharacter(relationships, aesthetics, images, species, speciesDetails, overflow, title, birthday, isLocal = false) {
    //remove member sections
    document.querySelectorAll('.memAccOnly').forEach(item => item.remove());

    //set up relationships
    if(relationships !== `Sectioned Tracker`) {
        document.querySelector('.genTrackOnly').classList.remove('hidden');
    } else {
        document.querySelector('.sectTrackOnly').classList.remove('hidden');
    }

    //set up aesthetics
    if(aesthetics !== `<i>No Information</i>` && aesthetics !== ``) {
        document.querySelector('.profile--aesthetic').innerHTML = formatAesthetics(aesthetics, images);
    }

    //set up age & birthday
    document.querySelector('age-clip').innerText = calculateAge(birthday);
    if (parseInt(birthday.year) < 0) {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year) * -1} BC`;
    } else {
        document.querySelector('birthday-clip').innerText = `${birthday.month} ${birthday.day}, ${parseInt(birthday.year)}`;
    }

    //set up species
    document.querySelector('species-clip').innerHTML = formatSpecies(species, speciesDetails);

    //Freeform Overflow
    if(overflow !== `` && overflow !== `<i>No Information</i>`) {
        document.querySelector('[name="#freeform"] .scroll.accent').insertAdjacentHTML('beforeend', overflow);
    }

    //Tracker
    if(!isLocal) {
        FillTracker(title, trackerParams);
    }
}
function initMember() {
    //remove character only sections
    document.querySelectorAll('.charOnly').forEach(item => item.remove());

    //subaccounts list
    setRoster();
}

/***** Topic List Only *****/
function initTopicDescription(selector) {
    document.querySelectorAll(selector).forEach(desc => {
        desc.innerHTML = desc.innerHTML.replaceAll('[', '<tag-highlight>').replaceAll(']', '</tag-highlight>');
    });
}
function initTopicsWrap() {
    $(`.macro--header`).each(function (index) {
        $(this).nextUntil(`.macro--header`).wrapAll(`<div class="topics--section"></div>`);
    }); 
}
function initStickyBar() {
    window.addEventListener('scroll', e => {
        let stickyBar = document.querySelector('main > table:first-of-type');
        if(stickyBar.getBoundingClientRect().top === 30) {
            stickyBar.classList.add('is-sticky');
        } else {
            stickyBar.classList.remove('is-sticky');
        }
    });
}

/****** Post Initialization ******/
function initPostRowDescription() {
    document.querySelector('.topic-title').innerHTML = capitalize(document.querySelector('.topic-title').innerText, [' ', '-']);
    let descript = $('.topic-desc').html();
    if (descript != undefined) {
        var newDescript = descript.replace(", ", "");
        $('.topic-desc').html(newDescript);
    }
    let desc = document.querySelector('.maintitle .topic-desc');
    if(desc.innerText) {
        initTopicDescription('.topic-desc');
    } else {
        desc.remove();
    }
}
function initPostContentAlter() {
    document.querySelectorAll('.post--content .postcolor').forEach(post => {
        if(!post.querySelector('* > tag-wrap') && !post.querySelector('* > tag-comm') && !post.querySelector('* > tag-social') && !post.querySelector('* > et-wrap') && !post.querySelector('* > et-comm') && !post.querySelector('* > et-social') && !post.querySelector('.spyder--outershell')) {
            post.classList.add('no-template');
        }
    });
    document.querySelectorAll('.post:has(.g-4) .charOnly, .post:has(.g-6) .charOnly, .post:has(.g-26) .charOnly, .post:has(.g-28) .charOnly, .post.type-Member:has(.g-3) .charOnly').forEach(item => item.remove());
}

/****** UserCP/Messages ******/
function initUCPMenu() {
    document.querySelector('#ucpmenu').innerHTML = `<button class="macro--button" onclick="toggleUCPMenu(this)">
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="accordion">
        ${typeof localUCPLinks !== 'undefined' ? localUCPLinks : jcinkUCPLinks}
    </div>`;

    initAccordion();
    initAccordionActive();

    let textNodes = getAllTextNodesArray(document.querySelectorAll('#UserCP.code-01 #ucpcontent td.pformleft'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('span');
        node.after(paragraph);
        paragraph.appendChild(node);
    });
}
function initAccordionActive() {
    if(pageType === 'Msg') {
        document.querySelectorAll('[data-category="messages"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'UserCP' && (pageClasses.contains('code-alerts') || pageClasses.contains('code-50') || pageClasses.contains('code-26'))) {
        document.querySelectorAll('[data-category="tracking"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'UserCP' && (pageClasses.contains('code-alerts_settings') || pageClasses.contains('code-04') || pageClasses.contains('code-02'))) {
        document.querySelectorAll('[data-category="settings"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'UserCP') {
        document.querySelectorAll('[data-category="account"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store' && (pageClasses.contains('store-inventory') || pageClasses.contains('store-donate_money') || pageClasses.contains('store-donate_item'))) {
        document.querySelectorAll('[data-category="personal"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store' && (pageClasses.contains('store-fine') || pageClasses.contains('store-do_edit_points') || pageClasses.contains('store-edit_points') || pageClasses.contains('store-do_staff_inventory') || pageClasses.contains('store-edit_inventory'))) {
        document.querySelectorAll('[data-category="staff"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store' && pageClasses.contains('store-home')) {
        document.querySelectorAll('[data-category="home"]').forEach(item => item.classList.add('is-active'));
    } else if (pageType === 'store') {
        document.querySelectorAll('[data-category="shop"]').forEach(item => item.classList.add('is-active'));
    }
    if(window.location.search) {
        if(document.querySelector(`#ucpmenu a[href="${window.location.search}"]`)) {
	    document.querySelector(`#ucpmenu a[href="${window.location.search}"]`).classList.add('is-active');
	}
    } else if (document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/usercp/')[1]}"]`)) {
        document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/usercp/')[1]}"]`).classList.add('is-active');
    } else if (document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/store/')[1]}"]`)) {
        document.querySelector(`#ucpmenu a[href="${window.location.pathname.split('/store/')[1]}"]`).classList.add('is-active');
    }


    if(pageType === 'store' && (pageClasses.contains('store-home') || pageClasses.contains('store-shop'))) {
        document.querySelectorAll('[data-category="shop"]').forEach(item => item.classList.add('is-active'));
    } else if(pageType === 'store' && (pageClasses.contains('store-inventory') || pageClasses.contains('store-donate_money') || pageClasses.contains('store-donate_item'))) {
        document.querySelectorAll('[data-category="personal"]').forEach(item => item.classList.add('is-active'));
    } else {
        document.querySelectorAll('[data-category="staff"]').forEach(item => item.classList.add('is-active'));
    }
}
function cpShift() {
	let imageType = document.querySelector(toggleFields[1]).value,
	    account = document.querySelector(toggleFields[0]).value,
        species = document.querySelector(toggleFields[2]).value,
        relationships = document.querySelector(toggleFields[3]).value,
	    showFields = [],
	    hideFields = characterFields
                    .concat(defaultImages)
                    .concat(gridImages)
                    .concat(mosaicImages)
                    .concat(singleRelFields)
                    .concat(sectionRelFields),
	    showHeaders = allHeaders;

	if(account == 'character') {
        if(imageType === 'grid') {
            showFields = characterFields
                        .concat(defaultImages)
                        .concat(gridImages);
            hideFields = mosaicImages;
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.remove('fullWidth');
        } else if (imageType === 'mosaic') {
            showFields = characterFields
                        .concat(defaultImages)
                        .concat(gridImages)
                        .concat(mosaicImages);
            hideFields = [];
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.remove('fullWidth');
        } else {
            showFields = characterFields
                        .concat(defaultImages);
            hideFields = gridImages
                        .concat(mosaicImages);
            showHeaders = allHeaders
                        .concat(charHeaders);
            document.querySelector(defaultImages[0]).classList.add('fullWidth');
        }

        specialSpecies.forEach(special => {
            if (special.species === species) {
                showFields = showFields.concat(special.fields);
            } else {
                hideFields = hideFields.concat(special.fields);
            }
        });

        if (relationships === 'a') {
            showFields = showFields.concat(singleRelFields);
            hideFields = hideFields.concat(sectionRelFields);
        } else {
            hideFields = hideFields.concat(singleRelFields);
            showFields = showFields.concat(sectionRelFields);
        }
    } else {
        specialSpecies.forEach(special => {
            hideFields = hideFields.concat(special.fields);
        });
    }
    
    adjustCP(showFields, hideFields, showHeaders);
}
function adjustCP(show, hide, headers) {
	show.forEach(field => {
		showAccField(field);
	});
	hide.forEach(field => {
		hideAccField(field);
	});
	document.querySelectorAll('thead').forEach(header => {
		header.remove();
	});
    if($('.ucp--section').length > 0) {
        if ( $('.ucp--section tr').parent().is( "tbody" ) ) {
            $('.ucp--section tr').unwrap();
        }
    }
	headers.forEach(header => {
		insertCPHeader(header['sectionTitle'], header['insertBefore'], header['sectionDescription'], header['lastField']);
	});
}
function hideAccField(field) {
	if(document.querySelector(field)) {
		document.querySelector(field).classList.add('hidden');
	}
}
function showAccField(field) {
	if(document.querySelector(field)) {
		document.querySelector(field).classList.remove('hidden');
	}
}
function splitProfile() {
    let headers = $('thead');
    headers.each(function (index, el) {
        if(index == headers.length - 1) {
            $(this).nextUntil('tr:last-child').wrapAll(`<tbody class="ucp--section" data-section="${$(this)[0].dataset.section}"></tbody>`);
        } else {
            $(this).nextUntil('thead').wrapAll(`<tbody class="ucp--section" data-section="${$(this)[0].dataset.section}"></tbody>`);
        }
    });
}
function insertCPHeader (title, field, description) {
    let html = `<thead data-section="${cleanText(title)}"><tr class="ucp--header"><td>
        <div class="sticky">
            <div class="ucp--header-title" data-section="${cleanText(title)}">${title}</div>`;
    if(description) {
        html += `<div class="ucp--description scroll" data-section="${cleanText(title)}">
            ${description}
        </div>`;
    }
    html += `</div></td></tr></thead>`;
	$(field).before(html);
}
function ucpAesthetics() {
    let imageObj = {
        'tall-1': document.querySelector('#field_46_input').value,
        'tall-2': document.querySelector('#field_47_input').value,
        'wide-1': document.querySelector('#field_45_input').value,
        'square-1': document.querySelector('#field_42_input').value,
        'square-2': document.querySelector('#field_43_input').value,
        'square-3': document.querySelector('#field_44_input').value,
    };
    let aesthetics = document.querySelector('#field_40_input').options[document.querySelector('#field_40_input').selectedIndex].innerText.replace(' ', '');

    let aestheticsSample = document.querySelector('.ucp--description[data-section="Aesthetics"] .sample');
    if(aestheticsSample) {
        aestheticsSample.classList.add(aesthetics.replace(' ', ''));
        aestheticsSample.innerHTML = formatAesthetics(aesthetics, imageObj);
    }
}
function ucpAvatars() {
    console.log('ucp avatars');
    let avatarSample = document.querySelector('.ucp--description[data-section="Images"] .sample');
    let avatarObj = {
        'tall': document.querySelector('#field_41_input').value,
        'tall-2': document.querySelector('#field_79_input').value,
        'wide': document.querySelector('#field_60_input').value,
    }

    let aestheticsObj = {
        'tall-1': document.querySelector('#field_46_input').value,
        'tall-2': document.querySelector('#field_47_input').value,
        'wide-1': document.querySelector('#field_45_input').value,
        'square-1': document.querySelector('#field_42_input').value,
        'square-2': document.querySelector('#field_43_input').value,
        'square-3': document.querySelector('#field_44_input').value,
    };
    let aesthetics = document.querySelector('#field_40_input').options[document.querySelector('#field_40_input').selectedIndex].innerText.replace(' ', '');
    let accType = document.querySelector('#field_1_input').options[document.querySelector('#field_1_input').selectedIndex].innerText.toLowerCase().trim();
    if(avatarSample) {
        let html = `<div><strong>Avatars</strong>
            <div class="avatars">
            ${formatAvatars(avatarObj)}
        </div></div>`;

        if(accType === 'character') {
            html += `<div><strong>Aesthetics</strong>
                <div class="profile--aesthetic ${aesthetics.replace(' ', '')}">
                ${formatAesthetics(aesthetics, aestheticsObj)}
            </div></div>`;
        }
        
        avatarSample.innerHTML = html;
    }
}
function formatAvatars(images) {
    let imageHTML = `<span class="tall"><img src="${images['tall']}" title="Tall Avatar" alt="Tall Avatar" loading="lazy" /></span>
    <span class="tall"><img src="${images['tall-2']}" title="Tall Member List" alt="Tall Member List (optional; will use the tall avatar if blank)" loading="lazy" /></span>
    <span class="wide"><img src="${images['wide']}" title="Wide Avatar" alt="Wide Avatar" loading="lazy" /></span>`;
    return imageHTML;
}
function toggleUCPMenu(e) {
    e.closest('#ucpmenu').classList.toggle('is-open');
}
function createFieldArray(arr, input = false) {
    if(input) {
        return arr.map(item => `#field_${item}_input`);
    }
    return arr.map(item => `#field_${item}`);
}

/****** Store ******/
function initStoreMenu() {
    document.querySelector('#ucpmenu').innerHTML = `<button class="macro--button" onclick="toggleUCPMenu(this)">
        <i class="fa-solid fa-bars"></i>
        <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="accordion">
        ${typeof localStoreLinks !== 'undefined' ? localStoreLinks : jcinkStoreLinks}
    </div>`;

    initAccordion();
    initAccordionActive();
}

/****** Members Initialization ******/
function initMembers() {
    initAccordion();
}
function formatMemberRow(type, data, extraFilters = '') {
    let tagList = ``, info = ``, details = ``, extras = ``;
    if(type === 'character') {
        tagList += `${data.character.speciesClass} ${data.character.ageClass} ${data.character.relationshipClass} ${data.character.locationClass}`;
        info += `<div class="member--stats">
            <span>${data.character.age} years old</span>
            <span>${data.character.pronouns}</span>
            <span>${data.character.location}</span>
            <span>${data.writer.alias}</span>
        </div>`;
        details = data.character.overview;
        extras += `<div class="member--species">${data.character.species}</div>`;
    } else {
        info += `<div class="member--stats">
            <span>${data.writer.age} years old</span>
            <span>${data.writer.pronouns}</span>
            <span>${data.writer.timezone}</span>
            <span>${data.writer.contact}</span>
        </div>`;
        details = data.writer.triggers;
        extras += `<div class="member--species">Joined ${data.universal.dates.joined}</div>
        <div class="member--species">Last seen ${data.universal.dates.lastActive}</div>`;
    }
    return `<div class="members--member grid-item g-${data.universal.groupID} ${data.writer.aliasClass} ${type} ${extraFilters} ${tagList}">
        <div class="member">
            <div class="member--id">N° ${data.universal.id}</div>
            <div class="member--top">
                <img src="${data.universal.imageWide}" loading="lazy" />
            </div>
            <div class="member--main">
                <a href="?showuser=${data.universal.id}">${formatName(data.universal.name, 'b')}</a>
                ${extras}
            </div>
            ${info}
            <div class="member--overview"><div class="scroll">
                ${details}
            </div></div>
        </div>
        <div class="hidden member--sortable">
            <span class="member--name">${data.universal.name}</span>
            <span class="member--age">${data.character.age}</span>
            <span class="member--posts">${data.universal.posts}</span>
            <span class="member--join">${data.universal.dates.joined}</span>
        </div>
    </div>`;
}
function populatePage(array) {
    let html = ``;
    let members = [], membersClean = [], speciesList = [], speciesClean = [];

    for (let i = 0; i < array.length; i++) {
        //Make Arrays
        let member = {raw: array[i].writer.alias, clean: array[i].writer.aliasClass};
        if(jQuery.inArray(member.clean, membersClean) == -1 && member.clean != '') {
            membersClean.push(member.clean);
            members.push(member);
        }
        let species = {raw: array[i].character.speciesRaw, clean: array[i].character.speciesClass};
        if(jQuery.inArray(species.clean, speciesClean) == -1 && species.clean != '') {
            speciesClean.push(species.clean);
            speciesList.push(species);
        }

        switch(array[i].universal.groupID) {
            //member only
            case 4:
            case 6:
                html += formatMemberRow('writer', array[i], 'active');
                break;
            //depends unsorted
            case 1:
            case 3:
            case 5:
                if(array[i].universal.type === 'character') {
                    html += formatMemberRow('character', array[i], 'pending');
                } else {
                    html += formatMemberRow('writer', array[i], 'pending');
                }
                break;
            //character only
            default: 
                html += formatMemberRow('character', array[i], 'active');
                break;
        }
    }
    document.querySelector('#members--rows').insertAdjacentHTML('beforeend', html);


    //sort arrays
    members.sort((a, b) => {
        if(a.clean < b.clean) {
            return -1;
        } else if (a.clean > b.clean) {
            return 1;
        } else {
            return 0;
        }
    });
    speciesList.sort((a, b) => {
        if(a.clean < b.clean) {
            return -1;
        } else if (a.clean > b.clean) {
            return 1;
        } else {
            return 0;
        }
    });

    //Append Arrays
    members.forEach(member => {
        document.querySelector('.members--filter-group[data-filter-group="alias"]').insertAdjacentHTML('beforeend', `<label><input type="checkbox" value=".${member.clean}"/>${member.raw}</label>`);
    });
    speciesList.forEach(species => {
        document.querySelector('.members--filter-group[data-filter-group="species"]').insertAdjacentHTML('beforeend', `<label><input type="checkbox" value=".${species.clean}"/>${species.raw}</label>`);
    });
}
function setCustomFilter() {
    //get search value
    qsRegex = document.querySelector(typeSearch).value.toLowerCase().trim();
    
    //add show class to all items to reset
    elements.forEach(el => el.classList.add(visible));
    
    //filter by nothing
    let searchFilter = '';
    
    //check each item
    elements.forEach(el => {
        let name = el.querySelector(memName).textContent;
        if(!name.toLowerCase().includes(qsRegex)) {
            el.classList.remove(visible);
            searchFilter = `.${visible}`;
        }
    });

    let filterGroups = document.querySelectorAll(filterGroup);
    let groups = [];
    let checkFilters;
    filterGroups.forEach(group => {
        let filters = [];
        group.querySelectorAll('label.is-checked input').forEach(filter => {
            if(filter.value) {
                filters.push(filter.value);
            }
        });
        groups.push({group: group.dataset.filterGroup, selected: filters});
    });

    groups.forEach(group => {
        let tagString = group.selected.join('_');
        appendSearchQuery(group.group, tagString);
    });

    let filterCount = 0;
    let comboFilters = [];
    groups.forEach(group => {
        // skip to next filter group if it doesn't have any values
        if ( group.selected.length > 0 ) {
            if ( filterCount === 0 ) {
                // copy groups to comboFilters
                comboFilters = group.selected;
            } else {
                var filterSelectors = [];
                var groupCombo = comboFilters;
                // merge filter Groups
                for (var k = 0; k < group.selected.length; k++) {
                    for (var j = 0; j < groupCombo.length; j++) {
                        //accommodate weirdness with object vs not
                        if(groupCombo[j].selected) {
                            if(groupCombo[j].selected != group.selected[k]) {
                                filterSelectors.push( groupCombo[j].selected + group.selected[k] );
                            }
                        } else if (!groupCombo[j].selected && group.selected[k]) {
                            if(groupCombo[j] != group.selected[k]) {
                                filterSelectors.push( groupCombo[j] + group.selected[k] );
                            }
                        }
                    }
                }
                // apply filter selectors to combo filters for next group
                comboFilters = filterSelectors;
            }
            filterCount++;
        }
    });
    
    //set filter to blank
    let filter = [];
    //check if it's only search
    if(qsRegex.length > 0 && comboFilters.length === 0) {
        filter = [`.${visible}`];
    }
    //check if it's only checkboxes
    else if(qsRegex.length === 0 && comboFilters.length > 0) {
        let combos = comboFilters.join(',').split(',');
        filter = [...combos];
    }
    //check if it's both
    else if (qsRegex.length > 0 && comboFilters.length > 0) {
        let dualFilters = comboFilters.map(filter => filter + `.${visible}`);
        filter = [...dualFilters];
    }

    //join array into string
    filter = filter.join(', ');
        
    //render isotope
    $container.isotope({
        filter: filter,
    });
    $container.isotope('layout');
}
function toggleListMenu(e) {
    if(e.closest('.members--menu')) {
        e.closest('.members--menu').classList.toggle('is-open');
    } else if(e.closest('.webpage--menu')) {
        e.closest('.webpage--menu').classList.toggle('is-open');
    }
}
function speciesRatios() {
    document.querySelector('.ratios-button').innerText = 'Updating...';
    fetch(`https://opensheet.elk.sh/${sheetID}/Species`)
    .then((response) => response.json())
    .then((data) => {

        let ratios = data.map(item => ({
            Species: standardizeLower(item.Species),
            Count: 0,
            Breakdown: null,
            SubmissionType: 'update-ratios'
        }));

        ratios.push({Species: 'human', Count: 0, Breakdown: null, SubmissionType: 'update-ratios'});

        let species = data.map(item => standardizeLower(item.Species));

        species.push('human');

        let filtered = accounts.filter(item => item.universal.groupID > 6 && item.universal.groupID !== 26 && item.universal.groupID !== 28 && item.universal.groupID !== 27);

        filtered.forEach(account => {
            let characterSpecies = standardizeLower(account.character.speciesRaw);
            let extra = standardizeLower(account.character.extraSpeciesData);
            if(species.includes(characterSpecies)) {
                const i = ratios.findIndex(e => e.Species === characterSpecies);
                if(characterSpecies === 'hybrid' && extra.includes('turned vampire')) {
                    const vampIndex = ratios.findIndex(e => e.Species === 'vampire');
                    ratios[vampIndex].Count++;
                } else {
                    ratios[i].Count++;
                }

                if(characterSpecies === 'werecreature' ||
                characterSpecies === 'dragon' ||
                characterSpecies === 'elemental' ||
                characterSpecies === 'centaur' ||
                characterSpecies === 'hybrid') {
                    if(extra.includes('turned vampire')) {
                        const vampIndex = ratios.findIndex(e => e.Species === 'vampire');
                        const original = extra.split(`, turned vampire`)[0].split(`born `)[1];
                        if(!ratios[vampIndex].Breakdown) {
                            ratios[vampIndex].Breakdown = [{form: 'born', count: 0}, {form: 'turned from human', count: 0}, {form: `turned from ${original}`, count: 1}];
                        } else {
                            const j = ratios[vampIndex].Breakdown ? ratios[vampIndex].Breakdown.findIndex(e => e.form === extra) : -1;
                            if(j < 0) {
                                ratios[vampIndex].Breakdown.push({form: `turned from ${original}`, count: 1});
                            } else {
                                ratios[vampIndex].Breakdown[j].count++;
                            }
                        }
                    } else {
                        ratios[i].Breakdown = ratios[i].Breakdown ? ratios[i].Breakdown : [];
                        const j = ratios[i].Breakdown ? ratios[i].Breakdown.findIndex(e => e.form === extra) : -1;
                        if(j < 0) {
                            ratios[i].Breakdown.push({form: extra, count: 1});
                        } else {
                            ratios[i].Breakdown[j].count++;
                        }
                    }
                } else if (characterSpecies === 'vampire') {
                    if(!ratios[i].Breakdown) {
                        ratios[i].Breakdown = [{form: 'born', count: 0}, {form: 'turned from human', count: 0}];
                    }
                    if(extra === 'born') {
                        ratios[i].Breakdown[0].count++;
                    } else if(extra === 'turned') {
                        ratios[i].Breakdown[1].count++;
                    }
                } else if (characterSpecies === 'faerie') {
                    if(!ratios[i].Breakdown) {
                        ratios[i].Breakdown = [{form: 'seelie', count: 0}, {form: 'unseelie', count: 0}];
                    }
                    if(extra === 'seelie') {
                        ratios[i].Breakdown[0].count++;
                    } else if(extra === 'unseelie') {
                        ratios[i].Breakdown[1].count++;
                    }
                }

            }
        });

        ratios.map(item => {
            if(item.Breakdown) {
                return item.Breakdown = JSON.stringify(item.Breakdown);
            } else {
                return item.Breakdown = '';
            }
        });

        return ratios;
	
    })
    .then((ratios) => {

        ratios.forEach(ratio => {

            $.ajax({
                url: `https://script.google.com/macros/s/${deployID}/exec`,   
                data: ratio,
                method: "POST",
                type: "POST",
                dataType: "json", 
                async: false,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                },
                complete: function () {
                    console.log('species complete');
                }
            });
        });

    }).then(() => {
        console.log('update finished!');
        document.querySelector('.ratios-button').innerText = 'Updated!';
        document.querySelector('.ratios-button').classList.add('is-done');
    });
}

/****** Webpages ******/
function initWebpages() {
    //remove staff for non-staff
    if(!document.querySelector('body').classList.contains('g-4') && !document.querySelector('body').classList.contains('g-26') && !document.querySelector('body').classList.contains('g-28')) {
        document.querySelectorAll('.staffOnly').forEach(item => item.remove());
    }

    //remove loading screen
    document.querySelector('body').classList.remove('loading');
    document.querySelector('#loading').remove();
    initTabs(true, '.webpage', '.webpage--menu', '.webpage--content', 'is-active', '.tab-category', ['.webpage--menu .accordion--trigger', '.webpage--menu .accordion--content', '.webpage--menu .accordion--content a', '.webpage--content .tab-category', '.webpage--content .tab-category tag-tab']);

    //accordions
    initAccordion();

    let spoilers = document.querySelectorAll('tag-spoiler');
    if(spoilers.length > 0) {
        spoilers.forEach(spoiler => {
            spoiler.addEventListener('click', e => {e.currentTarget.classList.add('is-visible')});
        });
    }
}
function toggleWarning(e) {
    e.closest('.webpage--warning').querySelector('.webpage--warning-text').classList.toggle('is-open');
}
function initSpecies() {
    //isotope
    var filters = {};

    //set class variables
    let $container = $('#webpage--rows');
    let typeSearch = `#quicksearch`;
    let memName = `.species--title`;
    let visible = `is-visible`;
    let filterGroup = `.webpage--filter-group`;
    let filterOptions = `.webpage--filter-group input`;
    let gridItem = `.species--item`;
    let defaultShow = ``;

    function setCustomFilter() {
        //get search value
        qsRegex = document.querySelector(typeSearch).value;
        
        //add show class to all items to reset
        elements.forEach(el => el.classList.add(visible));
        
        //filter by nothing
        let searchFilter = '';
        
        //check each item
        elements.forEach(el => {
            let name = el.querySelector(memName).textContent;
            if(!name.toLowerCase().includes(qsRegex)) {
                el.classList.remove(visible);
                searchFilter = `.${visible}`;
            }
        });
    
        let filterGroups = document.querySelectorAll(filterGroup);
        let groups = [];
        filterGroups.forEach(group => {
            let filters = [];
            group.querySelectorAll('label.is-checked input').forEach(filter => {
                if(filter.value) {
                    filters.push(filter.value);
                }
            });
            groups.push({group: group.dataset.filterGroup, selected: filters});
        });

        groups.forEach(group => {
            let tagString = group.selected.join('_');
            appendSearchQuery(group.group, tagString);
        });
    
        let filterCount = 0;
        let comboFilters = [];
        groups.forEach(group => {
            // skip to next filter group if it doesn't have any values
            if ( group.selected.length > 0 ) {
                if ( filterCount === 0 ) {
                    // copy groups to comboFilters
                    comboFilters = group.selected;
                } else {
                    var filterSelectors = [];
                    var groupCombo = comboFilters;
                    // merge filter Groups
                    for (var k = 0; k < group.selected.length; k++) {
                        for (var j = 0; j < groupCombo.length; j++) {
                            //accommodate weirdness with object vs not
                            if(groupCombo[j].selected) {
                                if(groupCombo[j].selected != group.selected[k]) {
                                    filterSelectors.push( groupCombo[j].selected + group.selected[k] );
                                }
                            } else if (!groupCombo[j].selected && group.selected[k]) {
                                if(groupCombo[j] != group.selected[k]) {
                                    filterSelectors.push( groupCombo[j] + group.selected[k] );
                                }
                            }
                        }
                    }
                    // apply filter selectors to combo filters for next group
                    comboFilters = filterSelectors;
                }
                filterCount++;
            }
        });
        
        //set filter to blank
        let filter = [];
        //check if it's only search
        if(qsRegex.length > 0 && comboFilters.length === 0) {
            filter = [`.${visible}`];
        }
        //check if it's only checkboxes
        else if(qsRegex.length === 0 && comboFilters.length > 0) {
            let combos = comboFilters.join(',').split(',');
            filter = [...combos];
        }
        //check if it's both
        else if (qsRegex.length > 0 && comboFilters.length > 0) {
            let dualFilters = comboFilters.map(filter => filter + `.${visible}`);
            filter = [...dualFilters];
        }
    
        //join array into string
        filter = filter.join(', ');
        
        //render isotope
        $container.isotope({
            filter: filter
        });
    }

    //initialize isotope
    // quick search regex
    let qsRegex;
    let elements = document.querySelectorAll(gridItem);

    //handle filter storage
    let queryParamsArray = window.location.search.split('&').map(param => param.split('=')).filter(item => item.length > 1);
    let queryParams = {};
    queryParamsArray.forEach(param => {
	    queryParams[param[0]] = param[1];
    });
    for (const param in queryParams) {
        let key = param;
        let values = queryParams[param].split('_');
        
        if(document.querySelector(`[data-filter-group="${key}"]`) && values.length > 0) {
            document.querySelector(`[data-filter-group="${key}"] .all`).classList.remove('is-checked');
            values.forEach(value => {
                document.querySelector(`[data-filter-group="${key}"] [value="${value}"]`)
                .closest('label')
                .classList.add('is-checked');
            });
        }
    }
    setCustomFilter();

    if(window.location.search.split('typesearch=')[1]) {
        document.querySelector(typeSearch).value = window.location.search.split('typesearch=')[1].split('&')[0];
        setCustomFilter();
    }

    //use value of input select to filter
    let checkboxes = document.querySelectorAll(filterOptions);
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            if(e.currentTarget.classList.contains('all')) {
                e.currentTarget.checked = true;
                e.currentTarget.parentElement.classList.add('is-checked');
                e.currentTarget.parentElement.parentElement.querySelectorAll('input:not(.all)').forEach(input => {
                    input.checked = false;
                    input.parentElement.classList.remove('is-checked');
                });
            } else {
                if(e.currentTarget.parentElement.classList.contains('is-checked')) {
                    e.currentTarget.checked = false;
                    e.currentTarget.parentElement.classList.remove('is-checked');
                } else {
                    e.currentTarget.checked = true;
                    e.currentTarget.parentElement.classList.add('is-checked');
                    e.currentTarget.parentElement.parentElement.querySelector('input.all').checked = false;
                    e.currentTarget.parentElement.parentElement.querySelector('input.all').parentElement.classList.remove('is-checked');
                }
            }
            let labels = e.currentTarget.parentElement.parentElement.querySelectorAll('label');
            let checked = 0;
            labels.forEach(label => {
                if(label.classList.contains('is-checked')) {
                    checked++;
                }
            });
            if(checked === 0) {
                e.currentTarget.parentElement.parentElement.querySelector('input.all').checked = true;
                e.currentTarget.parentElement.parentElement.querySelector('input.all').parentElement.classList.add('is-checked');
            }
            //set filters
            setCustomFilter();
        });
    });
    
    // use value of search field to filter
    document.querySelector(typeSearch).addEventListener('keyup', e => {
	appendSearchQuery('typesearch', e.currentTarget.value);
        setCustomFilter();
    });

    document.querySelector('body').classList.remove('loading');
    document.querySelector('#loading').remove();
    initAccordion();
    initAccordion('.species-accordion', $('#webpage--rows'));
}