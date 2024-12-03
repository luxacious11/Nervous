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
function formatName(name, singleStyle = 'span') {
    let nameArray = capitalize(name).split(' ').filter(item => item !== '');
    let formattedName = ``;
    if(nameArray.length > 1) {
        let surnames = [...nameArray];
        surnames.shift();
        formattedName = `<b>${nameArray[0]}</b><span>${surnames.join(' ')}</span>`
    } else {
        formattedName = `<${singleStyle}>${nameArray[0]}</${singleStyle}>`;
    }
    return formattedName;
}
function standardizeLower(text) {
    return text.toLowerCase().trim();
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
function setAgeClass(age) {
	if(age > 17 && age <= 25) {
	    return '1825';
	} else if(age > 25 && age <= 35) {
	    return '2635';
	} else if(age > 35 && age <= 45) {
	    return '3645';
	} else if(age > 45 && age <= 55) {
	    return '4655';
	} else if(age > 55 && age <= 100) {
	    return '56100';
	} else if(age > 100 && age <= 500) {
	    return '101500';
	} else if(age > 500 && age <= 1000) {
	    return '5011000';
	} else if(age > 1000 && age <= 2000) {
	    return '10012000';
	} else if(age > 2000 && age <= 3000) {
	    return '20013000';
	} else if(age > 3000) {
	    return '3001';
	} else {
	    return '';
	}
}
function setMortality(ageClass, species, extras) {
	if(immortals.includes(standardizeLower(species))) {
	    ageClass += ' immortal';
	} else if(standardizeLower(species) === 'hybrid') {
	    let hybridSpecies = standardizeLower(extras).replaceAll(`,`,'').split(' ').map(item => item.replaceAll(`(`, ``).replaceAll(`)`, ``));
	    let immortal = false;
	    for (let i = 0; i < hybridSpecies.length; i++) {
		if(immortals.includes(hybridSpecies[i])) {
			immortal = true;
		}
	    }
	    if (immortal) {
		ageClass += ' immortal';
	    } else {
		ageClass += ' mortal';
	    }
	} else {
	    ageClass += ' mortal';
	}
	return ageClass;
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

/****** Special Function Initialization ******/
function initTabs(isHash = false, wrapClass, menuClass, tabWrapClass, activeClass = 'is-active', categoryClass = null, firstClasses = []) {
    if(isHash) {
        window.addEventListener('hashchange', function(e){
            initHashTabs(wrapClass, menuClass, tabWrapClass, activeClass, categoryClass);
        });

        //hash linking
        if (window.location.hash){
            initHashTabs(wrapClass, menuClass, tabWrapClass, activeClass, categoryClass);
        } else {
            initFirstHashTab(firstClasses, activeClass);
        }
    } else {
        initRegularTabs(menuClass);
    }
}
function initRegularTabs(menuClass) {
    let labels = document.querySelectorAll(`${menuClass} > tag-label`);
    labels.forEach(label => {
        label.addEventListener('click', e => {
            let selected = e.currentTarget;
            let tab = document.querySelector(`tag-tab[data-key="${selected.dataset.key}"]`);
            let tabSiblings = Array.from(tab.parentNode.children);
            let tabIndex = tabSiblings.indexOf.call(tabSiblings, tab);
            
            labels.forEach(label => label.classList.remove('is-active'));
            tabSiblings.forEach(tab => tab.classList.remove('is-active'));
            
            selected.classList.add('is-active');
            tab.classList.add('is-active');
            tabSiblings.forEach(sibling => sibling.style.left = `${-100 * tabIndex}%`);
        });
    });
}
function initHashTabs(wrapClass, menuClass, tabWrapClass, activeClass, categoryClass = null) {
    //set variables for categories
    let selectedCategory, hashMain, hashCategory, hashCategoryArray, categorySiblings = [], categoryIndex, hashTab;

    //get hash and set basic variables
    let hash = $.trim( window.location.hash );
    let selected = document.querySelector(`${menuClass} a[href="${hash}"]`);
    let hashContent = document.querySelector(`tag-tab[data-key="${hash}"]`);
    let unsetDefault = Array.from(selected.parentNode.children);
    let tabSiblings = Array.from(hashContent.parentNode.children);
    let tabIndex = tabSiblings.indexOf.call(tabSiblings, hashContent);

    //set category variables document.querySelector(`.webpage--menu a[href="#tab2-2"]`).closest('.tab-category').getAttribute('data-category')
    if(categoryClass) {
        selectedCategory = selected.closest(categoryClass).getAttribute('data-category');

        hashMain = document.querySelector(`${menuClass} tag-label[data-category="${selectedCategory}"]`);

        hashCategory = document.querySelector(`${menuClass} tag-label[data-category="${selectedCategory}"]`);
        hashCategoryArray = document.querySelectorAll(`${menuClass} [data-category="${selectedCategory}"]`);
        hashCategoryTab = document.querySelector(`tag-tab[data-category="${selectedCategory}"]`);
        
        hashTab = document.querySelector(`${tabWrapClass} tag-tab[data-category="${selectedCategory}"]`);

        if(hashCategoryTab) {
            categorySiblings = Array.from(hashCategoryTab.parentNode.children);
            categoryIndex = categorySiblings.indexOf.call(categorySiblings, hashCategoryTab);
        }
    }

    //find the sub menu/inner menu link with the matching hash
    if (hash) {
        $(selected).trigger('click');
    }

    //Tabs
    //Remove active from everything
    document.querySelectorAll(`${menuClass} tag-label`).forEach(label => label.classList.remove(activeClass));
    document.querySelectorAll(`${menuClass} a`).forEach(label => label.classList.remove(activeClass));
    unsetDefault.forEach(label => label.classList.remove(activeClass));
    document.querySelectorAll(`${wrapClass} tag-tab`).forEach(label => label.classList.remove(activeClass));
    document.querySelectorAll(categoryClass).forEach(item => item.classList.remove(activeClass));

    //Add active
    selected.classList.add(activeClass);
    hashCategoryArray.forEach(item => item.classList.add(activeClass));
    hashContent.classList.add(activeClass);
    tabSiblings.forEach(tab => tab.style.left = `${tabIndex * -100}%`);

    //add active for category
    if(categoryClass) {
        hashMain.classList.add(activeClass);
        hashTab.classList.add(activeClass);
        categorySiblings.forEach(tab => tab.style.left = `${categoryIndex * -100}%`);
    }

    document.querySelector(menuClass).classList.remove('is-open');

    window.scrollTo(0, 0);
}
function initFirstHashTab(firstClasses, activeClass) {
    //Auto-select tab without hashtag present
    firstClasses.forEach(firstClass => {
        document.querySelector(firstClass).classList.add(activeClass);
    });
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

/****** Forms ******/
function getAccountID(field) {
    return field.value.trim().split('?showuser=').length > 1 ? field.value.split('?showuser=')[1].split('#')[0].trim() : field.value.trim();
}
function standardizeText(text) {
    return text.toLowerCase().trim();
}
function getSelectValue(field) {
    return standardizeText(field.options[field.selectedIndex].value);
}
function getSelectText(field) {
    return standardizeText(field.options[field.selectedIndex].innerText);
}
function getValue(field) {
    return field.value.trim();
}
function getStandardValue(field) {
    return standardizeText(getValue(field));
}
function getCleanStandardValue(field) {
    return cleanText(getStandardValue(field));
}
function setFormStatus(form, isSubmitting = true, isSubmitted = false) {
    if(isSubmitted) {
        form.innerHTML = successMessage;
    } else {
        if(isSubmitting) {
            form.querySelector('button[type="submit"]').innerText = `Submitting...`;
            form.querySelector('button[type="submit"]').setAttribute('disabled', 'true');
        } else {
            form.querySelector('button[type="submit"]').innerText = `Submit`;
            form.querySelector('button[type="submit"]').setAttribute('disabled', 'false');
        }
    }
}

function checkActiveReserve (timestamp) {
    let current = new Date();
    current = new Date(current.toLocaleString("en-US", {timeZone: "America/Halifax"}));
    let time = new Date(timestamp);
    let difference = ((current - time) / (1000*60*60*24));

    return difference;
}
function handleWarning(form, message) {
    if(form.querySelector('.warning')) {
        form.querySelector('.warning').remove();
    }
    form.insertAdjacentHTML('afterbegin', message);

    setFormStatus(form, false);
}
function extendExpiry(original, extension) {
	return new Date(new Date(original).setDate(new Date(original).getDate() + parseInt(extension)));
}
function setExpiry(timestamp, extension) {
    let reserveDate = new Date(timestamp);
    
    let current = new Date();
    current = new Date(current.toLocaleString("en-US", {timeZone: "America/Halifax"}));
    let time = new Date(timestamp);
    time = time.setDate(time.getDate() + defaultReserve + parseInt(extension))
    let difference = time - current;
    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    days = ('0' + days).slice(-2);
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hours = ('0' + hours).slice(-2);
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    minutes = ('0' + minutes).slice(-2);
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);
    seconds = ('0' + seconds).slice(-2);

    reserveDate.setDate(reserveDate.getDate() + defaultReserve + parseInt(extension));

    return `${days}D ${hours}H ${minutes}M`;
}

function sendDiscordMessage(webhook, embedTitle, message, notification = null, color = null) {
    const request = new XMLHttpRequest();
    request.open("POST", webhook);

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
        "content": notification,
        "embeds": [
            {
                "title": embedTitle,
                "description": message,
                "color": parseInt(color, 16)
            }
        ],
        "attachments": []
	};

    request.send(JSON.stringify(params));
}
function sendAjax(form, data, staffDiscord, publicDiscord) {
    $(form).trigger('reset');
    
    $.ajax({
        url: `https://script.google.com/macros/s/${deployID}/exec`,   
        data: data,
        method: "POST",
        type: "POST",
        dataType: "json", 
        success: function () {
            console.log('success');
            if(staffDiscord) {
                sendDiscordMessage(`https://discord.com/api/webhooks/${staffDiscord.hook}`, staffDiscord.title, staffDiscord.text, staffDiscord.notification, staffDiscord.color);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            form.innerHTML = `Whoops! The sheet connection didn't quite work. Please refresh the page and try again! If this persists, please open the console (ctrl + shift + J) and send Lux a screenshot of what's there.`;
        },
        complete: function () {
            setFormStatus(form, false);
            
            if(successMessage) {
                form.innerHTML = successMessage;
            }

            window.scrollTo(0, 0);
            
            console.log('complete');
            if(publicDiscord) {
                sendDiscordMessage(`https://discord.com/api/webhooks/${publicDiscord.hook}`, publicDiscord.title, publicDiscord.text, publicDiscord.notification, publicDiscord.color);
            }
        }
    });
}
function reloadForm() {
	location.reload();
}
function checkToggle(field, ifclass) {
    if(field.checked) {
        document.querySelectorAll(ifclass).forEach(item => item.classList.remove('hidden'));
    } else {
        document.querySelectorAll(ifclass).forEach(item => item.classList.add('hidden'));
    }

    field.addEventListener('change', e => {
        checkToggle(e.currentTarget, ifclass);
    });
}
function simpleFieldToggle(field, ifclass, showIf) {
    if(field.options[field.selectedIndex].value === showIf) {
        document.querySelectorAll(ifclass).forEach(item => item.classList.remove('hidden'));
    } else {
        document.querySelectorAll(ifclass).forEach(item => item.classList.add('hidden'));
    }

    field.addEventListener('change', e => {
        simpleFieldToggle(e.currentTarget, ifclass, showIf);
    });
}
function complexFieldToggle(field, ifclass, showIf, equals) {
    let show = false;
    if(showIf.includes(field.options[field.selectedIndex].value)) {
        if(equals) {
            show = true;
        }
    } else {
        if(!equals) {
            show = true;
        }
    }
    if(show) {
        document.querySelectorAll(ifclass).forEach(item => item.classList.remove('hidden'));
    } else {
        document.querySelectorAll(ifclass).forEach(item => item.classList.add('hidden'));
    }

    field.addEventListener('change', e => {
        complexFieldToggle(e.currentTarget, ifclass, showIf, equals);
    });
}
function addRow(e) {
    if(e.closest('.multi-buttons').dataset.rowType === 'hours') {
        e.closest('.adjustable').querySelector('.rows').insertAdjacentHTML('beforeend', formatHourRow());
    } else if(e.closest('.multi-buttons').dataset.rowType === 'plotsections') {
        e.closest('.adjustable').querySelector('.rows').insertAdjacentHTML('beforeend', formatSectionFields());
    } else if(e.closest('.multi-buttons').dataset.rowType === 'plotroles') {
        e.closest('.adjustable').querySelector('.rows').insertAdjacentHTML('beforeend', formatRoleFields());
    } else if(e.closest('.multi-buttons').dataset.rowType === 'jobs') {
        e.closest('.adjustable').querySelector('.rows').insertAdjacentHTML('beforeend', formatJobFields());
        setEmployers(staticBusinesses, `#${e.closest('form').getAttribute('id')}`, `.job-wrap`);
    } else if(e.closest('.multi-buttons').dataset.rowType === 'roles') {
        e.closest('.adjustable').querySelector('.rows').insertAdjacentHTML('beforeend', formatRoleClaimFields());
        setMultiplePlotOptions(staticSubplots, `#${e.closest('form').getAttribute('id')}`, `.role-wrap`);
    }
}
function removeRow(e) {
    let rows = e.closest('.adjustable').querySelectorAll('.row');
    rows[rows.length - 1].remove();
}
function formatSectionFields() {
    return `<div class="section-wrap row" data-type="grid">
        <label class="section-title">
            <b>Section Title</b>
            <span><input type="text" placeholder="Title" /></span>
        </label>
        <label class="section-overview">
            <b>Section Overview</b>
            <span><textarea placeholder="Overview"></textarea></span>
        </label>
        <label class="adjustable">
        <b>Roles</b>
        <div class="rows" data-type="grid" data-gap="xs"></div>
        <div class="multi-buttons" data-row-type="plotroles">
            <button type="button" onclick="addRow(this)">+ Add Role</button>
            <button type="button" onclick="removeRow(this)">- Remove Role</button>
        </div>
    </label>
    </div>`;
}
function formatRoleFields() {
    return `<div class="section-role row" data-type="grid" data-columns="2">
        <label class="role-title">
            <b>Role Title</b>
            <span><input type="text" placeholder="Role Name" /></span>
        </label>
        <label class="role-limit">
            <b>Role Limit</b>
            <span><input type="text" placeholder="Unlimited or a number" /></span>
        </label>
        <label class="role-description fullWidth">
            <b>Role Description</b>
            <span><input type="text" placeholder="Role Description (optional)" /></span>
        </label>
    </div>`;
}
function formatHourRow() {
    return `<div class="row" data-type="grid" data-columns="2">
        <div data-type="grid" data-gap="sm">
            <label class="days-start">
                <b>Days</b>
                <u>Start of Range</u>
                <span>
                    <select required>
                        <option value="">(select)</option>
                        <option value="mon">Monday</option>
                        <option value="tues">Tuesday</option>
                        <option value="wed">Wednesday</option>
                        <option value="thurs">Thursday</option>
                        <option value="fri">Friday</option>
                        <option value="sat">Saturday</option>
                        <option value="sun">Sunday</option>
                    </select>
                </span>
            </label>
            <label class="days-end">
                <u>End of Range</u>
                <span>
                    <select required>
                        <option value="">(select)</option>
                        <option value="mon">Monday</option>
                        <option value="tues">Tuesday</option>
                        <option value="wed">Wednesday</option>
                        <option value="thurs">Thursday</option>
                        <option value="fri">Friday</option>
                        <option value="sat">Saturday</option>
                        <option value="sun">Sunday</option>
                    </select>
                </span>
            </label>
        </div>
        <div data-type="grid" data-gap="sm">
            <label class="time-start">
                <b>Times</b>
                <u>Start of Range</u>
                <span data-type="grid">
                    <input type="text" placeholder="Opening time" required />
                </span>
            </label>
            <label class="time-end">
                <u>End of Range (optional)</u>
                <span data-type="grid">
                    <input type="text" placeholder="Closing time" />
                </span>
            </label>
        </div>
    </div>`;
}
function formatJobFields() {
    return `<div class="row job-wrap" data-type="grid" data-columns="2">
        <label class="employer fullWidth">
            <b>Employer</b>
            <span>
                <select>
                    <option value="">(select)</option>
                    <option value="self-employed">Self-Employed</option>
                </select>
            </span>
        </label>
        <label class="job-section">
            <b>Section</b>
            <span>
                <input type="text" placeholder="Section (Optional; e.g., department, branch, etc)" />
            </span>
        </label>
        <label class="position">
            <b>Position</b>
            <span>
                <input type="text" placeholder="Position" />
            </span>
        </label>
    </div>`;
}
function formatRoleClaimFields() {
    return `<div class="row role-wrap" data-type="grid" data-columns="2">
        <label class="plot fullWidth">
            <b>Plot</b>
            <span>
                <select>
                    <option value="">(select)</option>
                </select>
            </span>
        </label>
        <label class="plot-section">
            <b>Section</b>
            <span>
                <select>
                    <option value="">(select)</option>
                </select>
            </span>
        </label>
        <label class="role">
            <b>Role</b>
            <span>
                <select>
                    <option value="">(select)</option>
                </select>
            </span>
        </label>
    </div>`;
}
function formatJobChanges(data) {
    let jobs = JSON.parse(data.Jobs);
    let html = ``;
    jobs.forEach(job => {
        html += `<div data-employer="${cleanText(job.employer)}" data-section="${cleanText(job.section)}" data-position="${cleanText(job.position)}" data-type="grid" data-gap="sm" class="job-row">
            <div class="h7">${job.employer}</div>
            <div data-type="grid" data-columns="2">
                <label class="job-section">
                    <b>Section</b>
                    <span><input type="text" placeholder="${job.section}"></span>
                </label>
                <label class="position">
                    <b>Position</b>
                    <span><input type="text" placeholder="${job.position}"></span>
                </label>
            </div>
        </div>`;
    });
    
    return html;
}
function formatJobRemoval(data) {
    let jobs = JSON.parse(data.Jobs);
    let html = ``;
    jobs.forEach(job => {
        let label = ``;
        if(job.section && job.section !== '') {
            label = `${capitalize(job.employer, [' ', '-'])} - ${capitalize(job.section, [' ', '-'])} - ${capitalize(job.position, [' ', '-'])}`;
        } else {
            label = `${capitalize(job.employer, [' ', '-'])} - ${capitalize(job.position, [' ', '-'])}`;
        }
        html += `<label class="input-wrap">
            <input type="checkbox" name="remove-job" data-employer="${cleanText(job.employer)}" data-section="${cleanText(job.section)}" data-position="${cleanText(job.position)}">
            <div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div>
            <strong>${label}</strong>
        </label>`;
    });
    
    return html;
}
function formatRoleChangesl(data) {
    let roles = JSON.parse(data.Roles);
    let html = ``;

    roles.forEach(role => {
        let activePlot = subplotDataVar.filter(plot => role.plot === plot.Plot)[0];
        let sections = JSON.parse(activePlot.Sections);
        let sectionOptions = `<option value="">(select)</option>`;
        sections.forEach(section => {
            if(role.section === section.title) {
                sectionOptions += `<option value="${cleanText(section.title)}" selected>${capitalize(section.title, [' ', '-'])}</option>`;
            } else {
                sectionOptions += `<option value="${cleanText(section.title)}">${capitalize(section.title, [' ', '-'])}</option>`;
            }
        });
        let activeSection = sections.filter(section => role.section === section.title)[0];
        let plotRoles = activeSection.roles;
        let roleOptions = `<option value="">(select)</option>`;
        plotRoles.forEach(plotRole => {
            if(role.role === plotRole.role) {
                roleOptions += `<option value="${cleanText(plotRole.role)}" data-limit="${plotRole.limit}" selected>${capitalize(plotRole.role, [' ', '-'])}</option>`;
            } else {
                roleOptions += `<option value="${cleanText(plotRole.role)}" data-limit="${plotRole.limit}">${capitalize(plotRole.role, [' ', '-'])}</option>`;
            }
        });

        html += `<div data-plot="${role.plot}" data-section="${role.section}" data-role="${role.role}" data-type="grid" data-gap="sm" class="role-row">
            <div class="h7">${role.plot}</div>
            <div data-type="grid" data-columns="2">
                <label class="role-section">
                    <b>Section</b>
                    <span><select>${sectionOptions}</select></span>
                </label>
                <label class="role">
                    <b>Role</b>
                    <span><select>${roleOptions}</select></span>
                </label>
            </div>
        </div>`;
    });
    
    return html;
}
function formatRoleRemoval(data) {
    let roles = JSON.parse(data.Roles);
    let html = ``;
    roles.forEach(role => {
        html += `<label class="input-wrap">
            <input type="checkbox" name="remove-role" data-plot="${role.plot}" data-section="${role.section}" data-role="${role.role}">
            <div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div>
            <strong>${role.plot} - ${role.section} - ${role.role}</strong>
        </label>`;
    });
    
    return html;
}
function setEmployers(data, formID, wrapClass) {
    data = data.filter(employer => employer.Hiring && (employer.Hiring === 'yes' || employer.Hiring === 'ask first'));
    data.sort((a, b) => {
        if (a.Hiring.toLowerCase() === 'yes' && b.Hiring.toLowerCase() !== 'yes') {
            return -1;
        } else if (a.Hiring.toLowerCase() !== 'yes' && b.Hiring.toLowerCase() === 'yes') {
            return 1;
        } else if (a.Employer.toLowerCase().replace('the ', '') < b.Employer.toLowerCase().replace('the ', '')) {
            return -1;
        } else if (a.Employer.toLowerCase().replace('the ', '') > b.Employer.toLowerCase().replace('the ', '')) {
            return 1;
        } else {
            return 0;
        }
    });

    let employerOptions = `<option value="">(select)</option><option value="self-employed">Self-Employed</option>`;
    data.forEach((employer, i) => {
        if(i === 0) {
            let optgroup = `Ask First`;
            if(employer.Hiring.toLowerCase() === 'yes') {
                optgroup = `Actively Hiring`;
            }
            employerOptions += `<optgroup label="${optgroup}">`;
            employerOptions += `<option value="${employer.Employer}">${capitalize(employer.Employer, [' ', '-'])}</option>`;
        }
        //Different Hiring Status
        else if (data[i - 1].Hiring.toLowerCase() !== employer.Hiring.toLowerCase()) {
            let optgroup = `Ask First`;
            if(employer.Hiring.toLowerCase() === 'yes') {
                optgroup = `Actively Hiring`;
            }
            employerOptions += `</optgroup>`;
            employerOptions += `<optgroup label="${optgroup}">`;
            employerOptions += `<option value="${employer.Employer}">${capitalize(employer.Employer, [' ', '-'])}</option>`;
        } else {
            employerOptions += `<option value="${employer.Employer}">${capitalize(employer.Employer, [' ', '-'])}</option>`;
        }
        if(i === data.length - 1) {
            employerOptions += `</optgroup>`;
        }
    });
    document.querySelector(`${formID} ${wrapClass}:last-child .employer select`).innerHTML = employerOptions;
}
function setMultiplePlotOptions(data, formID, wrapClass) {
    let plotOptions = `<option value="">(select)</option>`;
    data.forEach(plot => {
        plotOptions += `<option value="${plot.PlotID}">${capitalize(plot.Plot, [' ', '-'])}</option>`;
    });
    document.querySelector(`${formID} ${wrapClass}:last-child .plot select`).innerHTML = plotOptions;

    setMultiplePlotSwitchers(formID, data, wrapClass);
}
function setMultiplePlotSwitchers(formID, data, wrapClass) {
    let form = document.querySelector(formID);
    let plotFields = form.querySelectorAll('.plot select');
    let sectionFields = form.querySelectorAll('.plot-section select');

    plotFields.forEach(plot => {
        plot.addEventListener('change', e => {
            let row = e.currentTarget.closest(wrapClass);
            let sectionField = row.querySelector('.plot-section select');
            let selectedPlot = e.currentTarget.options[e.currentTarget.selectedIndex].innerText.toLowerCase();
            let activePlot = data.filter(plot => selectedPlot === plot.Plot)[0];
            let sections = JSON.parse(activePlot.Sections);
            let sectionOptions = `<option value="">(select)</option>`;
            sections.forEach(section => {
                sectionOptions += `<option value="${cleanText(section.title)}">${capitalize(section.title, [' ', '-'])}</option>`;
            });
            sectionField.innerHTML = sectionOptions;
        });
    });

    sectionFields.forEach(section => {
        section.addEventListener('change', e => {
            let row = e.currentTarget.closest(wrapClass);
            let plotField = row.querySelector('.plot select');
            let roleField = row.querySelector('.role select');
            let selectedPlot = plotField.options[plotField.selectedIndex].innerText.toLowerCase();
            let activePlot = data.filter(plot => selectedPlot === plot.Plot)[0];
            let sections = JSON.parse(activePlot.Sections);
            let selectedSection = e.currentTarget.options[e.currentTarget.selectedIndex].innerText.toLowerCase().trim();
            let activeSection = sections.filter(section => selectedSection === section.title)[0];
            let roles = activeSection.roles;
            let roleOptions = `<option value="">(select)</option>`;
            roles.forEach(role => {
                roleOptions += `<option value="${cleanText(role.role)}" data-limit="${role.limit}">${capitalize(role.role, [' ', '-'])}</option>`;
            });
            roleField.innerHTML = roleOptions;
        });
    });
}
function setBusinessList(fieldClass, data, segmented = false) {
    document.querySelectorAll(fieldClass).forEach(el => {
        let html = `<option value="">(select)</option>`;
        if(segmented) {
            //edit data
        }
        data.forEach(business => {
            html += `<option value="${cleanText(business.Employer)}">${capitalize(business.Employer)}</option>`;
        });

        el.innerHTML = html;
    });
}