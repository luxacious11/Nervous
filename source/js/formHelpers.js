/***** Faces *****/
function checkClaims(form, data, staffDiscord = null, publicDiscord = null) {
    fetch(`https://opensheet.elk.sh/${sheetID}/Claims`)
    .then((response) => response.json())
    .then((claimData) => {
        let created = claimData.filter(item => item.Face === data.Face);

        if(created.length > 0) {
            handleWarning(form, claimExists);
        } else {
            checkReserves(form, data, staffDiscord, publicDiscord);
        }
    });
}
function checkReserves(form, data, staffDiscord = null, publicDiscord = null) {
    fetch(`https://opensheet.elk.sh/${sheetID}/FaceReserves`)
    .then((response) => response.json())
    .then((reserveData) => {
        let existing = reserveData.filter(item => item.Face === data.Face);
        let oldReserves = [];

        if(existing.length > 0) {
            existing.forEach((reserve, i) => {
                let difference = checkActiveReserve(reserve.Timestamp);
                if(difference < (defaultReserve + parseInt(reserve.Extension))) {
                    handleWarning(form, activeResExists);
                } else {
                    oldReserves.push(reserve);
                    existing.splice(i, 1);
                }
            });
            if(existing.length > 0) {
                handleWarning(form, activeResExists);
            } else {
                oldReserves.forEach(reserve => {
                    if(reserve.Member === data.Member) {
                        handleWarning(form, prevResExists);
                    } else {
			console.log('send data');
			console.log(data);
                        sendAjax(form, data, staffDiscord, publicDiscord);
                    }
                });
            }
        } else {
			console.log('send data');
			console.log(data);
            sendAjax(form, data, staffDiscord, publicDiscord);
        }
    });
}

/***** Plots *****/
function setPlotOptions(data, formID, field) {
    let plotOptions = `<option value="">(select)</option>`;
    data.forEach(plot => {
        plotOptions += `<option value="${plot.PlotID}">${capitalize(plot.Plot, [' ', '-'])}</option>`;
    });
    document.querySelector(`${formID} ${field}`).innerHTML = plotOptions;

    setPlotSwitchers(formID, data);
}
function setPlotSwitchers(formID, data) {
    let form = document.querySelector(formID);
    let plotField = form.querySelector('#plot');
    let sectionField = form.querySelector('#section');
    let roleField = form.querySelector('#role');

    plotField.addEventListener('change', e => {
        let selectedPlot = getSelectText(e.currentTarget);
        let activePlot = data.filter(plot => selectedPlot === plot.Plot)[0];
        let sections = activePlot ? JSON.parse(activePlot.Sections) : [];
        let sectionOptions = `<option value="">(select)</option>`;
        sections.forEach(section => {
            sectionOptions += `<option value="${cleanText(section.title)}">${capitalize(section.title, [' ', '-'])}</option>`;
        });
        sectionField.innerHTML = sectionOptions;
        let roleOptions = `<option value="">(select)</option>`;
        roleField.innerHTML = roleOptions;
    });

    sectionField.addEventListener('change', e => {
        let selectedPlot = getSelectText(plotField);
        let activePlot = data.filter(plot => selectedPlot === plot.Plot)[0];
        let sections = activePlot ? JSON.parse(activePlot.Sections) : [];
        let selectedSection = getSelectText(e.currentTarget);
        let activeSection = sections.filter(section => selectedSection === section.title)[0];
        let roles = activeSection ? activeSection.roles : [];
        let roleOptions = `<option value="">(select)</option>`;
        roles.forEach(role => {
            roleOptions += `<option value="${cleanText(role.role)}" data-limit="${role.limit}">${capitalize(role.role, [' ', '-'])}</option>`;
        });
        roleField.innerHTML = roleOptions;
    });
}
function checkRoleLimit(form, data, success, staffDiscord, publicDiscord) {
    fetch(`https://opensheet.elk.sh/${sheetID}/Claims`)
    .then((response) => response.json())
    .then((claimData) => {
        let singleRoles = [];
        claimData = claimData.filter(claim => claim.Roles && claim.Roles !== '');

        claimData.forEach(item => {
            let rolesArray = JSON.parse(item.Roles);
            rolesArray.forEach(role => {
                singleRoles.push({
                    Role: role,
                    Character: item.Character,
                    AccountID: item.AccountID,
                    Member: item.Member,
                    ParentID: item.ParentID,
                    Group: item.Group,
                    GroupID: item.GroupID,
                });
            });
        });

        singleRoles.forEach(role => {
            if(role.Role.role === data.Role) {
                data.Instances++;
            }
        });

        if(data.Instances >= data.Limit) {
            handleWarning(form, limitReached);
        } else {
            checkReservedRoles(form, data, success, staffDiscord, publicDiscord);
        }
    });
}
function checkReservedRoles(form, data, success, staffDiscord = null, publicDiscord = null) {
    fetch(`https://opensheet.elk.sh/${sheetID}/PlotReserves`)
    .then((response) => response.json())
    .then((reserveData) => {
        let existing = reserveData.filter(item => item.Plot === data.Plot && item.Section === data.Section && item.Role === data.Role);

        if(existing.length > 0) {
            existing.forEach((reserve) => {
                let difference = checkActiveReserve(reserve.Timestamp);
                if(difference < (defaultReserve + parseInt(reserve.Extension))) {
                    data.Instances++;
                }
            });
        }
        
        if(data.Limit !== 'unlimited' && data.Instances < data.Limit) {
            sendAjax(form, data, success, staffDiscord, publicDiscord);
        } else {
            handleWarning(form, limitReached);
        }
        
    });
}