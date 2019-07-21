//1.FOCUS ON THE FIRST FIELD
const nameInput = document.getElementsByTagName('input')[0];
$(nameInput).focus();

//2. JOB ROLE SECTION 

//Hide 'other' label and input field 
const yourRoleLabel = document.querySelector('label[for="otherTitle"]');
const yourRoleInput = document.getElementById('otherTitle');
$(yourRoleLabel).hide();
$(yourRoleInput).hide();

//Show 'other' input field if 'other' is selected on the 'Your job role' dropdown menu and hide if not
const title = document.getElementById('title');
title.addEventListener('change', function(){
    const otherIsSelected = title.value === 'other';
    if(otherIsSelected) {
        $(yourRoleLabel).show();
        $(yourRoleInput).show();
        $(yourRoleInput).focus();
    }
    else {
        $(yourRoleLabel).hide();
        $(yourRoleInput).hide();
    }
});

//3. T-SHIRT SECTION

//Hide 'color' dropdown menu 
const colorSelection = document.getElementById('color');
const colorLabel = document.getElementsByTagName('label')[6];
$(colorLabel).hide();
$(colorSelection).hide();


//Show color dropdown menu, which changes depending on the users design selection
const designSelection = document.getElementById('design');
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

//Generate color dropdown menu with requested colors
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

//4. ACTIVITY REGISTRATION


const checkboxes = document.querySelectorAll('[type="checkbox"]');
const activities = document.querySelector('.activities');
const totalCost = document.createElement('p');
activities.appendChild(totalCost);
totalCost.innerHTML = "Total: $<span class='amount'></span>";
const dollarAmount = document.querySelector('.amount');
let runningTotal = 0;
dollarAmount.innerHTML = runningTotal;


//Calls calculateTotalCost(event) function on change event on activities list. Calls disableCheckBoxes() function if event.target has .tuesdayMorning or .tuesdayAfternoon class
activities.addEventListener('change', function(event){
    calculateTotalCost(event);
    if(event.target.classList.contains('tuesdayMorning')) {
        disableCheckboxes(event, "tuesdayMorning");
    }
    else if(event.target.classList.contains('tuesdayAfternoon')) {
        disableCheckboxes(event, "tuesdayAfternoon");
    }
});

//Function disables checkboxes where there is a time conflict
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

//Function adds or subtracts to total activity cost
function calculateTotalCost(event) {
    const str = event.target.parentElement.textContent;
    const cost = parseInt(str.slice(str.length - 3, str.length));
    if($(event.target).prop('checked')=== true) {
        runningTotal += cost;
    }
    else {
        runningTotal -= cost;
    }
    dollarAmount.innerHTML = runningTotal;
}

//5. DISPLAYING PAYMENT OPTIONS

//The "Credit Card" payment option is selected by default.
$("#payment").val("credit card");
const creditCardInfo = document.getElementById('credit-card');

//Remove 'select payment' option from dropdown menu
const paymentSelection = document.getElementById('payment');
paymentSelection.remove(0);

//Since credit card is default, initially hide Pay Pal and Bitcoin
const payPalSelected = document.getElementById('payPalSelected');
$(payPalSelected).hide();
payPalSelected.innerHTML = "We'll take you to Paypal's site to set up your billing information, when you click “Register” below."

const bitCoinSelected = document.getElementById('payPalSelected');
$(bitcoinSelected).hide();
bitcoinSelected.innerHTML = "We'll take you to the Coinbase site to set up your billing information, when you click “Register” below."

//Payment option in the select menu matches the payment option displayed on the page.
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

//6. FORM VALIDATION

//check if all criteria are met on form submission
const btn = document.querySelector('button');
btn.addEventListener('click', function(event){
    
    const emailInput = document.getElementsByTagName('input')[1];
    const ccNumber = document.getElementById('cc-num');
    const zipCode = document.getElementById('zip');
    const cvv = document.getElementById('cvv');
    const nameLabel = document.getElementsByTagName('label')[0];
    const emailLabel = document.getElementsByTagName('label')[1];
    const activitiesLabel = document.getElementsByTagName('legend')[2];
    const ccNumberLabel = document.querySelector('.col-6 label');
    const zipCodeLabel = document.querySelector('label[for="zip"]');
    const cvvLabel = document.querySelector('label[for="cvv"]');
    
    const nameInputHasValue = nameInput.value !== "";
    const emailInputHasValidValue = /^[^@]+@[^.]+\.\w+$/.test(emailInput.value);
    const ccNumberHasValidValue = /^\d{13,15}$/.test(ccNumber.value);
    const zipCodeHasValidValue = /^\d{5}$/.test(zipCode.value);
    const cvvHasValidValue = /^\d{3}$/.test(cvv.value);
    
   
    
    if(!nameInputHasValue || !emailInputHasValidValue || !isCheckBoxSelected() || !ccNumberHasValidValue ||
      !zipCodeHasValidValue || !cvvHasValidValue) {
        
        event.preventDefault();
        addOrRemoveErrorMessages(nameInputHasValue, nameLabel, 'Name is required');
        addOrRemoveErrorMessages(emailInputHasValidValue, emailLabel, 'Invalid email');
        addOrRemoveErrorMessages(isCheckBoxSelected(), activitiesLabel, 'You must select at least one activity');
        
        if($('#payment').val() === "credit card") {
            
            addOrRemoveErrorMessages(ccNumberHasValidValue, ccNumberLabel, 'Invalid credit card number');
            addOrRemoveErrorMessages(zipCodeHasValidValue, zipCodeLabel, 'Invalid zip code');
            addOrRemoveErrorMessages(cvvHasValidValue, cvvLabel, 'Invalid cvv');
        }
    } 
});

//Function checks if at least one checkbox is selected
function isCheckBoxSelected() {
    let selectedCheckBoxes = 0;
    for(var i = 0; i < checkboxes.length; i++) {
        if($(checkboxes[i]).prop('checked') === true) {
            selectedCheckBoxes++;
        }
    }
    return selectedCheckBoxes > 0;
}

//Function adds or removes error messages
function addOrRemoveErrorMessages(input, label, message) {
    if(!input) {
            label.classList.add('clearfix');
            $(label).attr('content', message); // Found code at: https://stackoverflow.com/questions/5041494/selecting-and-manipulating-css-pseudo-elements-such-as-before-and-after-usin?lq=1 by username: Nick Kline and edited by username: Eric
        }
        else {
            label.classList.remove('clearfix');
        }
}




