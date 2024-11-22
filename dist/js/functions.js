/****** Settings ******/
function setTheme() {
    if(localStorage.getItem('theme') !== null) {
        switch(localStorage.getItem('theme')) {
            case 'light':
                document.querySelector('body').classList.remove('dark');
                document.querySelector('body').classList.add('light');
                break;
            case 'dark':
            default:
                document.querySelector('body').classList.add('dark');
                document.querySelector('body').classList.remove('light');
                break;
        }
    } else {
        document.querySelector('body').classList.add('dark');
        document.querySelector('body').classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }
}
function setSize() {
    if(localStorage.getItem('size') !== null) {
        switch(localStorage.getItem('size')) {
            case 'xl':
                document.querySelector('body').classList.remove('smFont');
                document.querySelector('body').classList.remove('lgFont');
                document.querySelector('body').classList.add('xlFont');
                break;
            case 'large':
                document.querySelector('body').classList.remove('smFont');
                document.querySelector('body').classList.add('lgFont');
                document.querySelector('body').classList.remove('xlFont');
                break;
            case 'small':
            default:
                document.querySelector('body').classList.remove('lgFont');
                document.querySelector('body').classList.add('smFont');
                document.querySelector('body').classList.remove('xlFont');
                break;
        }
    } else {
        document.querySelector('body').classList.remove('xlFont');
        document.querySelector('body').classList.remove('lgFont');
        document.querySelector('body').classList.add('smFont');
        localStorage.setItem('size', 'small');
    }
}

/****** Toggles ******/
function toggleTheme() {
    if(localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        setTheme();
    } else {
        localStorage.setItem('theme', 'dark');
        setTheme();
    }
}
function toggleSize() {
    if(localStorage.getItem('size') === 'small') {
        localStorage.setItem('size', 'large');
        setSize();
    } else if(localStorage.getItem('size') === 'large') {
        localStorage.setItem('size', 'xl');
        setSize();
    } else {
        localStorage.setItem('size', 'small');
        setSize();
    }
}
function toggleMenu(e) {
    let close = false;
    if(e.classList.contains('is-open')) {
        close = true;
    }
    if(e.dataset.menu) {
        document.querySelectorAll('.nav--popout').forEach(menu => menu.classList.remove('is-open'));
        document.querySelectorAll('.button--menu').forEach(menu => menu.classList.remove('is-open'));

        if(!close) {
            e.classList.add('is-open');
            document.querySelector(`.nav--popout[data-menu="${e.dataset.menu}"]`).classList.add('is-open');
            document.querySelector('.invisibleEl').classList.add('menu-open');
            if (e.dataset.menu === 'alerts') {
                load_alerts();
            }
        } else {
            document.querySelector('.invisibleEl').classList.remove('menu-open');
        }
    } else {
        document.querySelectorAll('.nav--popout').forEach(menu => menu.classList.remove('is-open'));
        document.querySelectorAll('.button--menu').forEach(menu => menu.classList.remove('is-open'));

        if(!close) {
            e.classList.add('is-open');
            e.closest('.nav--inline').querySelector('.nav--popout').classList.add('is-open');
            document.querySelector('.invisibleEl').classList.add('menu-open');
        } else {
            document.querySelector('.invisibleEl').classList.remove('menu-open');
        }
    }
}

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
function initAccordion(target = '.accordion') {
    document.querySelectorAll(target).forEach(accordion => {
        let triggers = accordion.querySelectorAll(':scope > .accordion--trigger');
        let contents = accordion.querySelectorAll(':scope > .accordion--content');
        if(window.innerWidth <= 480) {
            triggers.forEach(trigger => trigger.classList.remove('is-active'));
            contents.forEach(trigger => trigger.classList.remove('is-active'));
        }
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                let alreadyOpen = false;
                if(e.currentTarget.classList.contains('is-active')) {
                    alreadyOpen = true;
                }
                triggers.forEach(trigger => trigger.classList.remove('is-active'));
                contents.forEach(trigger => trigger.classList.remove('is-active'));

                if(alreadyOpen) {
                    e.currentTarget.classList.remove('is-active');
                    e.currentTarget.nextElementSibling.classList.remove('is-active');
                    alreadyOpen = false;
                } else {
                    e.currentTarget.classList.add('is-active');
                    e.currentTarget.nextElementSibling.classList.add('is-active');
                }
            });
        })
    });
}
function initHashAccordion(target = '.hash-accordion', child = '.section', anchors = null) {
    document.querySelectorAll(`[name="${window.location.hash}"] > .accordion--trigger`).forEach(el => {
        el.classList.add('is-active');
        el.nextElementSibling.classList.add('is-active');
    });
    document.querySelectorAll(`.profile--nav [href="${window.location.hash}"]`).forEach(el => el.classList.add('is-active'));

    document.querySelectorAll(target).forEach(accordion => {
        let triggers = accordion.querySelectorAll(`:scope > ${child} > .accordion--trigger`);
        let contents = accordion.querySelectorAll(`:scope > ${child} > .accordion--content`);
        if(window.innerWidth <= 480) {
            triggers.forEach(trigger => trigger.classList.remove('is-active'));
            contents.forEach(trigger => trigger.classList.remove('is-active'));
        }
        triggers.forEach(trigger => {
            trigger.addEventListener('click', e => {
                let alreadyOpen = false;
                if(e.currentTarget.classList.contains('is-active')) {
                    alreadyOpen = true;
                }
                triggers.forEach(el => el.classList.remove('is-active'));
                contents.forEach(el => el.classList.remove('is-active'));
                if(anchors) {
                    document.querySelectorAll(anchors).forEach(el => el.classList.remove('is-active'));
                }


                if(alreadyOpen) {
                    window.location.hash = 'intro';
                    document.querySelector(`.profile--nav [href="#${e.currentTarget.closest('[data-hash]').dataset.hash}"]`).classList.remove('is-active');
                    e.currentTarget.classList.remove('is-active');
                    e.currentTarget.nextElementSibling.classList.remove('is-active');
                    alreadyOpen = false;
                } else {
                    window.location.hash = e.currentTarget.closest('[data-hash]').dataset.hash;
                    document.querySelector(`.profile--nav [href="#${e.currentTarget.closest('[data-hash]').dataset.hash}"]`).classList.add('is-active');
                    e.currentTarget.classList.add('is-active');
                    e.currentTarget.nextElementSibling.classList.add('is-active');
                }
            });
        })
    });

    if(anchors) {
        document.querySelectorAll(anchors).forEach(anchor => {
            anchor.addEventListener('click', e => {
                if(e.currentTarget.classList.contains('is-active')) {
                    document.querySelectorAll('h2.accordion--trigger').forEach(trigger => {
                        trigger.classList.remove('is-active');
                        trigger.nextElementSibling.classList.remove('is-active');
                        document.querySelectorAll(anchors).forEach(anchor => anchor.classList.remove('is-active'));
                    });
                } else {
                    let hash = e.currentTarget.href.split('#')[1];
                    document.querySelectorAll('h2.accordion--trigger').forEach(trigger => {
                        trigger.classList.remove('is-active');
                        trigger.nextElementSibling.classList.remove('is-active');
                        document.querySelectorAll(anchors).forEach(anchor => anchor.classList.remove('is-active'));
                    });
                    document.querySelectorAll(`[name="#${hash}"] > .accordion--trigger, [name="#${hash}"] > .accordion--content`).forEach(el => el.classList.add('is-active'));
                    e.currentTarget.classList.add('is-active');
                }
            });
        });
    }
}

/****** Utilities ******/
function fixMc(str) {
    return (""+str).replace(/Mc(.)/g, function(m, m1) {
        return 'Mc' + m1.toUpperCase();
    });
}
function fixMac(str) {
    return (""+str).replace(/Mac(.)/g, function(m, m1) {
        return 'Mac' + m1.toUpperCase();
    });
}
function capitalize(str, separators = [` `, `'`, `-`]) {
    str = str.replaceAll(`\&\#39\;`, `'`);
    separators = separators || [ ' ' ];
    var regex = new RegExp('(^|[' + separators.join('') + '])(\\w)', 'g');
    let first = str.split(' ')[0].replace(regex, function(x) { return x.toUpperCase(); });
    let last = fixMac(fixMc(str.split(' ').slice(1).join(' ').replace(regex, function(x) { return x.toUpperCase(); })));
    return `${first} ${last}`;
}
function capitalizeMultiple(selector) {
    document.querySelectorAll(selector).forEach(character => {
        character.innerText = capitalize(character.innerText);
    });
}
function setMonth(month) {
    switch(month) {
        case 'January':
            month = 1;
            break;
        case 'February':
            month = 2;
            break;
        case 'March':
            month = 3;
            break;
        case 'April':
            month = 4;
            break;
        case 'May':
            month = 5;
            break;
        case 'June':
            month = 6;
            break;
        case 'July':
            month = 7;
            break;
        case 'August':
            month = 8;
            break;
        case 'September':
            month = 9;
            break;
        case 'October':
            month = 10;
            break;
        case 'November':
            month = 11;
            break;
        case 'December':
            month = 12;
            break;
        default:
            month = -1;
            break;
    }

    return month;
}
function getMonth(month) {
    switch(month) {
        case 1:
            month = 'January';
            break;
        case 2:
            month = 'February';
            break;
        case 3:
            month = 'March';
            break;
        case 4:
            month = 'April';
            break;
        case 5:
            month = 'May';
            break;
        case 6:
            month = 'June';
            break;
        case 7:
            month = 'July';
            break;
        case 8:
            month = 'August';
            break;
        case 9:
            month = 'September';
            break;
        case 10:
            month = 'October';
            break;
        case 11:
            month = 'November';
            break;
        case 12:
            month = 'December';
            break;
        default:
            month = 'Unset';
            break;
    }

    return month;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function cleanText(text) {
	return text.replaceAll(' ', '').replaceAll('&amp;', '').replaceAll('&', '').replaceAll(`'`, '').replaceAll(`"`, '').replaceAll(`.`, '').replaceAll(`(`, '').replaceAll(`)`, '').replaceAll(`,`, '').replaceAll(`’`, '').replaceAll(`é`, `e`).replaceAll(`è`, `e`).replaceAll(`ê`, `e`).replaceAll(`ë`, `e`).replaceAll(`ě`, `e`).replaceAll(`ẽ`, `e`).replaceAll(`ē`, `e`).replaceAll(`ė`, `e`).replaceAll(`ę`, `e`).replaceAll(`à`, `a`).replaceAll(`á`, `a`).replaceAll(`â`, `a`).replaceAll(`ä`, `a`).replaceAll(`ǎ`, `a`).replaceAll(`æ`, `ae`).replaceAll(`ã`, `a`).replaceAll(`å`, `a`).replaceAll(`ā`, `a`).replaceAll(`í`, `i`).replaceAll(`ì`, `i`).replaceAll(`ı`, `i`).replaceAll(`î`, `i`).replaceAll(`ï`, `i`).replaceAll(`ǐ`, `i`).replaceAll(`ĭ`, `i`).replaceAll(`ī`, `i`).replaceAll(`ĩ`, `i`).replaceAll(`į`, `i`).replaceAll(`ḯ`, `i`).replaceAll(`ỉ`, `i`).replaceAll(`ó`, `o`).replaceAll(`ò`, `o`).replaceAll(`ȯ`, `o`).replaceAll(`ô`, `o`).replaceAll(`ö`, `o`).replaceAll(`ǒ`, `o`).replaceAll(`ŏ`, `o`).replaceAll(`ō`, `o`).replaceAll(`õ`, `o`).replaceAll(`ǫ`, `o`).replaceAll(`ő`, `o`).replaceAll(`ố`, `o`).replaceAll(`ồ`, `o`).replaceAll(`ø`, `o`).replaceAll(`ṓ`, `o`).replaceAll(`ṑ`, `o`).replaceAll(`ȱ`, `o`).replaceAll(`ṍ`, `o`).replaceAll(`ú`, `u`).replaceAll(`ù`, `u`).replaceAll(`û`, `u`).replaceAll(`ü`, `u`).replaceAll(`ǔ`, `u`).replaceAll(`ŭ`, `u`).replaceAll(`ū`, `u`).replaceAll(`ũ`, `u`).replaceAll(`ů`, `u`).replaceAll(`ų`, `u`).replaceAll(`ű`, `u`).replaceAll(`ʉ`, `u`).replaceAll(`ǘ`, `u`).replaceAll(`ǜ`, `u`).replaceAll(`ǚ`, `u`).replaceAll(`ṹ`, `u`).replaceAll(`ǖ`, `u`).replaceAll(`ṻ`, `u`).replaceAll(`ủ`, `u`).replaceAll(`ȕ`, `u`).replaceAll(`ȗ`, `u`).replaceAll(`ư`, `u`);
}
function filterValue(e) {
    let searchValue = e.value.toLowerCase().trim();
    let names = document.querySelectorAll(`[data-key="${e.dataset.filter}"] .claim ${e.dataset.objects}`);
    let headers = document.querySelectorAll(`[data-key="${e.dataset.filter}"] ${e.dataset.headers}`);
    let wraps = document.querySelectorAll(`[data-key="${e.dataset.filter}"] .claim-wrap`);
    if(searchValue !== '') {
        e.parentNode.classList.add('pb');
        e.closest('.scroll').querySelectorAll('.accordion--trigger, .accordion--content').forEach(item => item.classList.add('is-active'));
        names.forEach(name => {
            let nameValue = name.innerText.toLowerCase().trim();
            if (nameValue.indexOf(searchValue) > -1) {
                name.closest('.claim').classList.remove('hidden');
            } else {
                name.closest('.claim').classList.add('hidden');
            }
            let childrenArray = Array.from(name.closest('.claim-wrap').querySelectorAll('.claim')).filter(item => !item.classList.contains('hidden'));
            if(childrenArray.length === 0) {
                name.closest('.claim-wrap').previousElementSibling.classList.add('hidden');
                if (e.dataset.hideWrap === 'true') {
                            name.closest('.claim-wrap').classList.add('hidden');
                }
            } else {
                name.closest('.claim-wrap').previousElementSibling.classList.remove('hidden');
                if (e.dataset.hideWrap === 'true') {
                            name.closest('.claim-wrap').classList.remove('hidden');
                }
            }
        });
    } else {
        e.parentNode.classList.remove('pb');
        headers.forEach(header => header.classList.remove('hidden'));
        names.forEach(name => name.closest('.claim').classList.remove('hidden'));
        wraps.forEach(wrap => wrap.classList.remove('hidden'));
        e.closest('.scroll').querySelectorAll('.accordion--trigger, .accordion--content').forEach(item => item.classList.remove('is-active'));
    }
}
function appendSearchQuery(param, value) {
	const url = new URL(window.location.href);
	url.searchParams.set(param, value);
	window.history.replaceState(null, null, url);
}
function translationSwitch(e) {
        let current = e.innerText;
        let original = e.dataset.original;
        let translation = e.dataset.result;
        if(current === original) {
            e.innerText = translation;
        } else {
            e.innerText = original;
        }
}
function highlightCode() {
    let clipcodeQuick = new Clipboard('.copyQuick', {
        target: function(trigger) {
            if(trigger.nextElementSibling.querySelector('textarea')) {
                return trigger.nextElementSibling.querySelector('textarea');
            } else {
                return trigger.nextElementSibling.querySelector('code');
            }
        }
    });
}
function getAllTextNodes(element) {
    if(element) {
        return Array.from(element.childNodes).filter(node => node.nodeType === 3 && node.textContent.trim().length > 1);
    }
}
function getAllTextNodesArray(elements) {
    let array = [];
    if(elements) {
        elements.forEach(element => {
            let nodes = Array.from(element.childNodes).filter(node => node.nodeType === 3 && node.textContent.trim().length > 1);
            if(nodes.length > 0) {
                array = [...array, ...nodes];
            }
        });
    }
    return array;
}
function inputWrap(el, next = null, type = 'checkbox') {
    if(next) {
        $(el).nextUntil(next).andSelf().wrapAll(`<label class="input-wrap ${type}"></label>`);
    } else {
        $(el).next().andSelf().wrapAll(`<label class="input-wrap ${type}"></label>`);
    }
}
function fancyBoxes() {
    document.querySelectorAll('.input-wrap.checkbox').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div>`);
    });
    document.querySelectorAll('.input-wrap.radio').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input radio"><i class="fa-solid fa-check"></i></div>`);
    });
}
function read_alerts() {
    let allMenus = document.querySelectorAll('.menu');
    let allButtons = document.querySelectorAll('.button--menu');
    allMenus.forEach(menu => menu.classList.remove('is-open'));
    allButtons.forEach(button => button.classList.remove('is-open'));
    document.querySelector('.invisibleEl').classList.remove('menu-open');
    $.get( "index.php?recent_alerts=1&read=1", function( data ) {
        $( "#recent_alerts_data" ).html( data );
    });
    document.querySelector(`button[data-menu=".nav--alerts"]`).dataset.new = 0;
}
function createAvatars(classes, id, attributes = ``) {
    let html = `<div class="${classes}" style="background-image: `;
    for(let i = 0; i < fileTypes.length; i++) {
        html += `url(https://files.jcink.net/${uploads}/${siteName}/av-${id}.${fileTypes[i]}),`;
    }
    html += `url(${defaultSquare});" ${attributes}></div>`;
    return html;
}
function formatQuickList(list) {
    let html = ``;

    if(list.innerHTML.split(`~ `).length > 0) {
        html = `<ul>
            ${list
            .innerHTML.split(`~ `)
            .filter(item => item !== '' && item !== '\n')
            .map(item => `<li>${item}</li>`).join('')}
        </ul>`;
    }

    return html;
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
function calculateAge(birthday) {
    let current = new Date();
    let currentYear = current.getFullYear();
    let currentMonth = current.getMonth() + 1;
    let currentDay = current.getDate();
    let birthYear = birthday.year;
    if(birthday.year.includes('calc')) {
        birthYear = parseInt(birthday.year.split(`<calc>`)[1].split(`</calc>`)[0]);
    }
    let birthMonth = setMonth(birthday.month);;
    let birthDay = birthday.day;
    let age = ``;
    if(birthMonth < currentMonth || (birthMonth === currentMonth && birthDay <= currentDay)) {
        age = currentYear - birthYear;
    } else {
        age = currentYear - birthYear - 1;
    }
    return age;
}
function formatSpecies(species, details) {
    if(species === `Hybrid`) {
        return details[species];
    } else if (extraSpecies.includes(species)) {
        return `${species} (${details[species]})`;
    } else {
        return species;
    }
}
// SUBACCOUNTS PROFILE DISPLAY SCRIPT (ABC ORDER) by tonya aka wildflower
function Alpha(arr) {
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