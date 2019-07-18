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

//User cannot select two activities that are at the same time. Total cost of selected activities is calculated and displayed below the list of activities.
const checkboxes = document.querySelectorAll('[type="checkbox"]');
const activities = document.querySelector('.activities');
const totalCost = document.createElement('p');
activities.appendChild(totalCost);
totalCost.innerHTML = "Total: $<span class='amount'></span>";
const dollarAmount = document.querySelector('.amount');
let num = 0;
dollarAmount.innerHTML = num;


function disableCheckboxes(event, className) {
    
    for(var i = 0; i < checkboxes.length; i++) {
        if($(event.target).prop('checked') === true && checkboxes[i].classList.contains(className) && $(checkboxes[i]).prop('checked')===false) {
            checkboxes[i].disabled = true;
        }
        else if($(event.target).prop('checked') === false && checkboxes[i].disabled === true && checkboxes[i].classList.contains(className)) {
            checkboxes[i].disabled = false;
        }
    }
}

function calculateTotalCost(event) {
    const str = event.target.parentElement.textContent;
    const cost = parseInt(str.slice(str.length - 3, str.length));
    if($(event.target).prop('checked')=== true) {
        num += cost;
    }
    else {
        num -= cost;
    }
    dollarAmount.innerHTML = num;
}


activities.addEventListener('change', function(event){
    calculateTotalCost(event);
    if(event.target.classList.contains('tuesdayMorning')) {
        disableCheckboxes(event, "tuesdayMorning");
    }
    else if(event.target.classList.contains('tuesdayAfternoon')) {
        disableCheckboxes(event, "tuesdayAfternoon");
    }
});

//The "Credit Card" payment option is selected by default.

$("#payment").val("credit card");
const paymentSelection = document.getElementById('payment');
const creditCardInfo = document.getElementById('credit-card');
const payPalSelected = document.getElementById('payPalSelected');
const bitCoinSelected = document.getElementById('payPalSelected');
paymentSelection.remove(0);
$(payPalSelected).hide();
$(bitcoinSelected).hide();
payPalSelected.innerHTML = "We'll take you to Paypal's site to set up your billing information, when you click “Register” below."
bitcoinSelected.innerHTML = "We'll take you to the Coinbase site to set up your billing information, when you click “Register” below."

paymentSelection.addEventListener('change', function(event){
    
    if(event.target.value === 'credit card') {
        $(creditCardInfo).show();
        $(payPalSelected).hide();
        $(bitcoinSelected).hide();
    }
    else if(event.target.value === 'paypal')  {
        $(payPalSelected).show();
        $(creditCardInfo).hide();
        $(bitcoinSelected).hide();
    }
    else {
        $(bitcoinSelected).show();
        $(payPalSelected).hide();
        $(creditCardInfo).hide();   
    }
});

const btn = document.querySelector('button');

btn.addEventListener('click', function(){
    
    
});




