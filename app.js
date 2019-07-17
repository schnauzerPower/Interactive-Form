//Give namefield focus on pageload
const nameInput = document.getElementsByTagName('input')[0];
$(nameInput).focus();

//New input field revealed when user selects 'other'
const yourRoleLabel = document.createElement('label');
yourRoleLabel.innerHTML = 'Your job role';
const yourRoleInput = document.createElement('input');
$(yourRoleInput).attr('type','text').attr('id','role').attr('name','user_role');
const firstFieldSet = document.getElementsByTagName('fieldset')[0];
firstFieldSet.appendChild(yourRoleLabel).appendChild(yourRoleInput);
$(yourRoleLabel).hide();
$(yourRoleInput).hide();

const title = document.getElementById('title');

title.addEventListener('change', function(){
    if(title.value === 'other') {
        $(yourRoleLabel).show();
        $(yourRoleInput).show();
        $(yourRoleInput).focus();
    }
    else {
        $(yourRoleLabel).hide();
        $(yourRoleInput).hide();
    }
});

const designSelection = document.getElementById('design');
const colorSelection = document.getElementById('color');
const colorLabel = document.getElementsByTagName('label')[6];
$(colorLabel).hide();
$(colorSelection).hide();

function generateColorSelectionOptions(...options) {  // Found code at: https://stackoverflow.com/questions/6364748/change-the-options-array-of-a-select-list by username: amit_g and edited by username: LaBracca
    while(colorSelection.options.length > 0) {
        colorSelection.remove(colorSelection.options.length - 1);
    }
    for(var i = 0; i < options.length; i++) {
        var opt = document.createElement('option');
        opt.textContent = options[i];
        const val = options[i].replace(/\s/, "").toLowerCase();
        opt.value = val;
        colorSelection.add(opt);
    }
    
    $(colorLabel).show();
    $(colorSelection).show();
}

//Update color selection menu depending on the users design selection
designSelection.addEventListener('change', function(){
    if(designSelection.value === "js puns") {
        generateColorSelectionOptions('Cornflower Blue', 'Dark Slate Grey', 'Gold');
    }
    else if(designSelection.value === "heart js") {
        generateColorSelectionOptions('Tomato', 'Steel Blue', 'Dim Grey');
    }
    else {
        $(colorLabel).hide();
        $(colorSelection).hide();
    }
});

const checkboxes = document.querySelectorAll('[type="checkbox"]');
const activities = document.querySelector('.activities');

activities.addEventListener('change', function(event){
    if(event.target.classList.contains('tuesdayMorning')) {
        console.log('it worked');
    }
});
