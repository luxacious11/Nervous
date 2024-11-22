/********** Global **********/
let pageType = document.querySelector('body').id;
let pageClasses = document.querySelector('body').classList;

//click to change subaccounts
document.querySelectorAll('#post_as_menu option').forEach(account => {
    account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
});
let switcher = document.querySelector('#account-switch #subaccounts_menu select');
if(switcher !== null) {
    document.querySelectorAll('select[name="sub_id"] option').forEach(account => {
        account.innerHTML = account.innerHTML.replace(/&nbsp;&nbsp;»/g,'');
    });
    initSwitcher();
}

/********** Initializations **********/
setTheme();
setSize();
initPopupProfile('.profile', '.popup-init a[href*="showuser"]');

/********** Window Click **********/
document.querySelector('.invisibleEl').addEventListener('click', e => {
    document.querySelectorAll('.nav--popout').forEach(menu => menu.classList.remove('is-open'));
    document.querySelectorAll('.button--menu').forEach(menu => menu.classList.remove('is-open'));
	e.target.classList.remove('menu-open');
});

/********** Index & Category View Only **********/
if(pageType === 'idx' || pageType === 'SC') {
	initForums();

    document.querySelector('.stats--recent').innerHTML = document.querySelector('#recent-topics table').outerHTML;
    document.querySelector('#recent-topics').remove();

    document.querySelectorAll('.stats--section-item.large-text a > span').forEach(el => el.innerText = capitalize(el.innerText));
    document.querySelectorAll('.recent-topics-info a > strong').forEach(el => el.innerText = capitalize(el.innerText, [' ', '-']));
}

/********** Profile **********/
if(pageType === 'Profile') {
    initHashAccordion('.hash-accordion', '.profile--section', '.profile--nav a');
    initAccordion();
    initMarkdown();
}

/********** Post View Only **********/
if(pageType === 'ST') {
    initPostRowDescription();
    initPostContentAlter();

    //initDiscordTagging('#ST main > table > tbody > tr > td:last-child');
}

/********** Login **********/
if(pageType === 'Login') {
    let textNodes = getAllTextNodes(document.querySelector('main'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
    });
    $("main > p").nextUntil("div.tableborder").andSelf().wrapAll(`<div class="textNodes"></div>`);
    $(`input[name="UserName"]`).attr('placeholder','Username');
    $(`input[name="PassWord"]`).attr('placeholder','Password');
}

/********** Registration **********/
if(pageType === 'Reg') {
    let textNodes = getAllTextNodes(document.querySelector('.tablepad > table > tbody > tr:first-child > td:last-child fieldset:first-child'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }
    inputWrap(`label[for="agree_cbox"] input[name="read_tos"]`);
    inputWrap(`fieldset input[name="allow_admin_mail"]`);
    inputWrap(`fieldset input[name="allow_member_mail"]`);
    fancyBoxes();
    if(document.querySelector('input[name="agree"][type="checkbox"]')) {
        $('input[name="agree"][type="checkbox"]').wrap('<label class="input-wrap tos"></label>');
        $('.input-wrap.tos').append('<div class="fancy-input checkbox"><i class="fa-solid fa-check"></i></div> <p>I agree to the terms of this registration, <b>I am at least 18 years of age,</b> and wish to proceed.</p>');
    }
}

/********** Topic List Only **********/
if(pageType === 'SF') {
	initForums();
    initTopicsWrap();
    initTopicDescription('.topic--description');
    initStickyBar();
}

/********** Topic View **********/
if(pageType === 'ST') {
    let descript = $('.topic-desc').html();
    if (descript != undefined) {
        var newDescript = descript.replace(", ", "");
        $('.topic-desc').html(newDescript);
    }
    
    //input clean up
    document.querySelector('#qr_open .tablepad').innerHTML = document.querySelector('#qr_open .tablepad').innerHTML.replace('|', '');
    let textNodes = getAllTextNodes(document.querySelector('#qr_open .tablepad'));
    textNodes.forEach(node => {
        const paragraph = document.createElement('p');
        node.after(paragraph);
        paragraph.appendChild(node);
        paragraph.innerText = paragraph.innerText.replace(`|`, ``).trim();
    });
    document.querySelectorAll(`#qr_open input[type="checkbox"]`).forEach(input => inputWrap(input));
    document.querySelectorAll('#qr_open .input-wrap').forEach(label => {
        label.querySelector('input').insertAdjacentHTML('afterend', `<div class="fancy-input checkbox">x</div>`);
    });
    $('#qr_open .tablepad > input').wrapAll('<div class="qr_buttons"></div>');
}

/********** Topic View **********/
if(pageType === 'Post') {
    if(document.querySelector('#topic-title')) {
        document.querySelector('#topic-title input').setAttribute('placeholder', 'Topic Title');
        document.querySelector('#topic-desc input').setAttribute('placeholder', 'Topic Description');
    }

    if(document.querySelector('#post-preview')) {
        initPostContentAlter('#post-preview > .row1 > .postcolor');
    }
    
    initMarkdown();
    let textNodes = getAllTextNodes(document.querySelector('#post-options .pformright'));
    if(textNodes) {
        textNodes.forEach(node => {
            const paragraph = document.createElement('p');
            node.after(paragraph);
            paragraph.appendChild(node);
        });
    }

    inputWrap(`input[name="enableemo"]`, 'br');
    inputWrap(`input[name="enablesig"]`, 'br');
    inputWrap(`input[name="enabletrack"]`, 'br');
    document.querySelectorAll('input[name="iconid"]').forEach(icon => {
        inputWrap(icon, `input`, 'radio');
    });
    fancyBoxes();
}

/********** User CP & Messages **********/
if(pageType === 'UserCP' || pageType === 'Msg') {
    //ucp menu
	initUCPMenu();

	//Edit Profile Edits
	if($('body.code-01').length > 0 && pageType === 'UserCP') {
        cpShift();
        splitProfile();
        ucpAesthetics();
        ucpAvatars();
        if(fullWidthFields.length > 0) {
            fields = createFieldArray(fullWidthFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('fullWidth'));
        }
        if(thirdWidthFields.length > 0) {
            fields = createFieldArray(thirdWidthFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('oneThird'));
        }
        if(setHeightFields.length > 0) {
            fields = createFieldArray(setHeightFields);
            document.querySelectorAll(fields).forEach(field => field.classList.add('staticHeight'));
        }
        
        toggleFields.forEach(toggle => {
            document.querySelector(toggle).addEventListener('change', () => {
                cpShift();
                splitProfile();
                ucpAesthetics();
                ucpAvatars();
            });
        });

        avatarImageFields.forEach(field => {
            document.querySelector(field).addEventListener('keyup', () => {
                setTimeout(() => {
                    ucpAvatars();
                }, 500);
            });
        });
    }

    //subaccounts
    if($('body.code-54').length > 0 && pageType === 'UserCP') {
        document.querySelectorAll('input[name="sub_ids[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //alerts
    if($('body.code-alerts').length > 0 && pageType === 'UserCP') {
        document.querySelectorAll('input[name="alert_id[]"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }

    //forum and topic subscriptions
    if ((pageClasses.contains('code-50') || pageClasses.contains('code-26')) && pageType === 'UserCP') {
        document.querySelectorAll('.tableborder > table > tbody > tr').forEach(row => {
            if(row.querySelectorAll('th, td').length === 1) {
                row.classList.add('ucp--header', 'pformstrip');
            }
        });

        if(pageClasses.contains('code-26')) {
            document.querySelectorAll(`.tableborder input[type="checkbox"]`).forEach(input => inputWrap(input));
            fancyBoxes();
        }
    }
    
    //board settings
    if (pageClasses.contains('code-04') && pageType === 'UserCP') {
        inputWrap(document.querySelector(`input[name="DST"]`));
        fancyBoxes();
    }
    
    //alert settings
    if ((pageClasses.contains('code-alerts_settings') || pageClasses.contains('code-02')) && pageType === 'UserCP') {
        document.querySelectorAll(`input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }

    //inbox
    if($('body.code-01').length > 0 && pageType === 'Msg') {
        document.querySelectorAll('#ucpcontent > form .dlight td:last-child .forminput[type="checkbox"]').forEach(input => {
            inputWrap(input);
        });
        fancyBoxes();
    }
    
    //send message
    if (pageClasses.contains('code-04') && pageType === 'Msg') {
        document.querySelectorAll(`input[type="checkbox"]`).forEach(input => inputWrap(input));
        fancyBoxes();
    }
}

/********** Store **********/
if(pageType === 'store') {
  //store menu
}