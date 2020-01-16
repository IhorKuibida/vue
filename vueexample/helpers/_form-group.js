// =============================================================================
// FORM GROUP
// =============================================================================

export default function(el) {
    'use strict'

    let parentEl = document.querySelector(el);
    let frmGroup = parentEl.querySelectorAll('.frm-group');
    let classFilled = 'frm-group--filled';

    Array.prototype.forEach.call(frmGroup, (item) => {
        let getInput = item.querySelector('.frm-group__input');
        let getLabel = item.querySelector('.frm-group__label');
        getInput.addEventListener('focus', e => {
            e.preventDefault();
            item.classList.add(classFilled);
        });

        getInput.addEventListener('blur', e => {
            if (getInput.value === '') {
                item.classList.remove(classFilled);
            }
        });
    });
};

// end FORM GROUP