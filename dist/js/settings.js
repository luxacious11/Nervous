const uploads = `uploads2`;
const siteName = `godlybehaviour`;
const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
const defaultSquare = `https://files.jcink.net/uploads2/godlybehaviour/GB24/forum_guidebook_min.jpg`;

const staffGroups = ['4', '26', '28'];
const oocGroups = [...staffGroups, '6'];
const optGroups = ['3'];

const extraSpecies = ['Werecreature', 'Dragon', 'Vampire', 'Faerie', 'Elemental', 'Centaur'];

const markdownSafe = `.profile .markdown, .postcolor.no-template, .postcolor blockquote, .postcolor tag-content, .postcolor tag-block, .postcolor tag-event, .postcolor tag-msg, .postcolor tag-action`;

/** auto-tracker code by FizzyElf - https://fizzyelf.jcink.net **/
trackerParams = {
    //include
    includeCategoryIds: ['3', '4', '5', '6', '7', '8'],
    includeForumIds: [],
    ignoreForumIds: ['1', '2', '3', '5', '6', '7', '11', '18', '26', '27', '28', '29', '30', '34', '35', '89', '127', '128', '129', '130'],

    //define au, comm, dev, archive forums
    historyForumIds: ['33', '37', '38'], //history
    commForumIds: ['17'], //comm
    commHistoryForumIds: ['32'], //comm history
    socialForumIds: ['40', '41'], //social
    socialHistoryForumIds: ['39'], //social history
    devForumIds: ['10', '123', '125', '152', '124', '126', '134', '135', '136', '137', '59', '60', '109', '73', '61', '145', '146', '147', '148', '105' ,'106', '107', '52', '53', '99', '54', '55', '56', '57', '153', '75', '81', '155', '156', '157', '69', '70', '98', '71', '72', '100', '101', '102', '103', '85','114', '8', '47', '48', '50', '49', '97', '51', '154', '76', '77', '78', '79', '80', '86', '138', '139', '140', '141', '142', '143', '144', '131', '133', '132', '9', '64', '117', '66', '108', '65', '68', '161', '162', '163', '164', '165', '168', '166', '170', '173', '174', '172','175', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '204', '205', '206', '207', '208', '209', '210', '211', '212', '215', '216', '217', '218', '219', '220', '221', '222', '223'], //dev
    devHistoryForumIds: ['31'], //dev history
    reqForumIds: ['12', '13', '14', '15', '16', '167'], //requests
    reqHistoryForumIds: ['36'], //request history
    eventForumIds: ['213', '214'], //events
    eventHistoryForumIds: ['177', '67', '115', '94', '104', '169', '176', '179'], //event history

    //set indicators
    indicators: ['fa-solid fa-check', 'fa-solid fa-star'], 
}

const speciesFields = [28, 58, 59, 61, 62, 63, 64];
const fullWidthFields = [12, 13, 23, 24, 27, 77, 76, 73, 29, 30, 31, 32, 33, 34, 65, 35, 66, 67, 68, 69, 70, 78, 72, 71, 40, 79, 56, 57, ...speciesFields];
const thirdWidthFields = [16, 17, 18];
const setHeightFields = [14, 15, 26, 77];

//toggle fields: account type, power type, image type
const toggleFields = createFieldArray([1, 40, 27, 65], true);

const characterFields = createFieldArray([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 55, 65, 72, 73, 74, 75, 76, 77]);

const singleRelFields = createFieldArray([35]);
const sectionRelFields = createFieldArray([66, 67, 68, 69, 70, 71, 72, 78]);

const hybridFields = createFieldArray([28]);
const wereFields = createFieldArray([58]);
const dragonFields = createFieldArray([59]);
const vampFields = createFieldArray([61]);
const faeFields = createFieldArray([62]);
const elementalFields = createFieldArray([63]);
const centaurFields = createFieldArray([64]);

const defaultImages = createFieldArray([42]);
const gridImages = createFieldArray([43, 45, 46]);
const mosaicImages = createFieldArray([44, 47]);

const avatarImageFields = createFieldArray([41, 60, 42, 43, 45, 46, 44, 47]);

const aestheticFields = {
    'single': {
        showFields: defaultImages,
        hideFields: [...gridImages, ...mosaicImages],
    },
    'grid': {
        showFields: [...defaultImages, ...gridImages],
        hideFields: [...mosaicImages],
    },
    'mosaic': {
        showFields: [...defaultImages, ...gridImages, ...mosaicImages],
        hideFields: [],
    }
};

const allHeaders = [
    {
        sectionTitle: `Player`,
        insertBefore: '#field_1',
        sectionDescription: `<p>This section is for information about <i>you</i>, the writer! This should be the same as the details on your OOC account for consistency's sake. If something changes, please make sure to update the change on <i>all</i> your accounts for that reason.</p>`,
    },
    {
        sectionTitle: `Images`,
        insertBefore: '#field_40',
        sectionDescription: `<p>These are mandatory image fields for both OOC and character accounts. The images don't need to be specific sizes as they will crop/resize automatically depending on the size of the viewer's screen. We <i>do</i> ask that you use high-quality images that follow the ratio given in the field, for example a “wide” image should be wider than it is tall.</p>

        <p><u>Please also remember to <a href="?act=UserCP&CODE=24" target="_blank">upload an avatar</a>.</u></p>
        
        <div class="sample"></div>`,
    },
    {
        sectionTitle: `Customization`,
        insertBefore: '#field_56',
        sectionDescription: `<p>These are optional "bonus" spots to customize the popout sidebar for you and you alone! You can use hyperlink HTML (provided below) to add custom links for ease of access, or drop a posting template in the code block for your own convenience- whatever you'd like to do, as it will only affect the profile that it's saved to!</p>
        
<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><a href="URL">text</a></textarea></pre>
</tag-code>`,
    },
];
const charHeaders = [
    {
        sectionTitle: `Basics`,
        insertBefore: '#field_13',
        sectionDescription: `<p>This section is for basic information about your character. All of it is <u>mandatory</u> except for "Partners", "Height and/or Weight", and "Defining Features" which can be left blank if you choose. Please make sure to read up on the site setting to choose a residence that fits your character's circumstances, and be sure to update their profile if their living arrangement changes at any point!</p>
        
            <p><b>Please note:</b><br>
            For hybrids, we do have specific standardization of wording and species order in the extra field for hybrids so our species statistics sheet continues to function properly! For these, we ask that you use the format: <u>species a x species b</u>, with the two species being in alphabetical order. If one of the species is one which would have an element or other form, such as a dragon or a werecreature, please put that in brackets like so: <u>dragon (element) x werecreature (form)</u>. Species with these extra details are:</p>

            <ul><li><b>Centaurs, Werecreatures:</b> Should have their animal form in brackets. Do NOT include color, just species.</li>
            <li><b>Dragons, Elementals:</b> Should have the element in brackets.</li>
            <li><b>Faeries:</b> Should have seelie or unseelie in brackets.</li>
            <li><b>Vampires:</b> Should have born or turned in brackets. This refers to the status of the <i>parent</i> vampire in this instance.</li></ul>

            <p>If your character is a hybrid of a hybrid, please instead use a format similar to: <u>species a x [species b x species c]</u>.</p>

            <p><b>If your character is a turned vampire that was not fully human when they were turned</b> they should <i>also</i> be marked as 'hybrid'. In this instance, please use the formatting of: <u>born species, turned vampire</u>. If they were a hybrid upon birth, replace species with the appropriate hybrid standardization. For example, <u>Born species a x species b, turned vampire</u>.</p>`,
    },
    {
        sectionTitle: `Details`,
        insertBefore: '#field_29',
        sectionDescription: `<p>This section includes your character's "Quick Facts" and "Freeform”. The "Quick Facts" are a bullet-point set of notes about your character, and should ideally provide a summary of the most important things to know about them. The "Freeform" content is entirely up to you- while there's no minimum length for it, it should give us another taste of what your character is like. Feel free to reach out in the Discord server for freeform ideas if you find yourself drawing a blank!</p>

        <p>On the other hand, if you happen to hit the character maximum for the freeform, use the "Freeform Overflow" to continue writing. In most cases, however, this field will simply be left blank.</p>

        <p>Most, if not all, of our HTML-based codes in our <a href="https://wherethehellis.jcink.net/index.php?showforum=4" target="_blank">Codebank</a> should work in our freeform.</p>

        <p>It is worth noting that these, and most, sections of the application do support some limited markdown options for easier coding. These include ** on either side to bold, _ on either side to italicize, and || on either side to spoiler. Additionally, we have quicker ways to do lists available as markdown. The code is below:</p>

<tag-code>
<div onclick="highlightCode()" class="copyQuick">copy</div>
<pre><textarea class="scroll"><tl>~ List Item
~ List Item
~ List Item</tl></textarea></pre>
</tag-code>`,
    },
    {
        sectionTitle: `Plotting`,
        insertBefore: '#field_32',
        sectionDescription: `<p>This section serves as your "shipper" on-site and should give others a brief summary of your character (a paragraph or two, in the "Overview" field) as well as some ideas for potential plots you're looking for, as well as plots you have no interest in pursuing. Please do not leave either field blank; we ask you provide at least a few solid ideas in the "Plot Hooks" field, and if you are open to any plot types at all, please write that in the "Not Interested" field as well.</p>
        
        <p><b>Do <u>NOT</u> use fancy styling in the overview.</b> Your profile will only be accepted if the styling is restricted to simple styling, like bolding, italics, strike through, hyperlinks, and underline.</p>`,
    },
    {
        sectionTitle: `Links`,
        insertBefore: '#field_36',
        sectionDescription: `<p>These are for optional links to further information/resources for your character! The custom link is for exactly that: a custom  link. Some things you might use it for are: a playlist, a pinterest board, a secondary dev thread, or a secondary wanted ad. Please leave these fields blank if you do not want to use them, and please keep the custom link title on the shorter side- 1 to 2 words should display nicely!</p>`,
    },
    {
        sectionTitle: `Relationships`,
        insertBefore: '#field_65',
        sectionDescription: `<p>This is more for <i>your</i> reference than anything else. Here you can keep track of any relationships developing with your character, from friendships to rivalries to romances. Format this section however you'd like; it's ultimately a handy little note for YOU above all else!</p>
        
        <p>The sectioned tracker option contains: Family, Important People, Romantic, Platonic, Antagonistic, Professional, Other, and Pets. Only sections that have content will display for this version of the tracker.</p>`,
    },
];
const specialSpecies = [
    {'species': 'hybrid', 'fields': hybridFields},
    {'species': 'were', 'fields': wereFields},
    {'species': 'dragon', 'fields': dragonFields},
    {'species': 'elemental', 'fields': elementalFields},
    {'species': 'vamp', 'fields': vampFields},
    {'species': 'faerie', 'fields': faeFields},
    {'species': 'centaur', 'fields': centaurFields},
];

const jcinkUCPLinks = `<div class="accordion--trigger" data-category="account"><b>Account</b></div>
        <div class="accordion--content" data-category="account">
            <a href="?act=UserCP&CODE=01">Edit Profile</a>
            <a href="?act=UserCP&CODE=24">Update Avatar</a>
            <a href="?act=UserCP&CODE=54">Sub-accounts</a>
            <a href="?act=UserCP&CODE=52">Edit Username</a>
            <a href="?act=UserCP&CODE=28">Change Password</a>
            <a href="?act=UserCP&CODE=08">Update Email</a>
        </div>
        <div class="accordion--trigger" data-category="messages"><b>Messages</b></div>
        <div class="accordion--content" data-category="messages">
            <a href="?act=Msg&CODE=01">Inbox</a>
            <a href="?act=Msg&CODE=04">Send Message</a>
        </div>
        <div class="accordion--trigger" data-category="tracking"><b>Tracking</b></div>
        <div class="accordion--content" data-category="tracking">
            <a href="?act=UserCP&CODE=alerts">Alerts</a>
            <a href="?act=UserCP&CODE=50">Forums</a>
            <a href="?act=UserCP&CODE=26">Topics</a>
        </div>
        <div class="accordion--trigger" data-category="settings"><b>Settings</b></div>
        <div class="accordion--content" data-category="settings">
            <a href="?act=UserCP&CODE=04">Board</a>
            <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
            <a href="?act=UserCP&CODE=02">Emails</a>
        </div>`;