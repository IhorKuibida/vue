// =============================================================================
// PHONE MASK
// =============================================================================

require('./../vendors/imask');

export default function(el) {
    'use strict'

    let parentEl = document.querySelector(el);
    let phoneInputs = parentEl.querySelectorAll('input[type="tel"]');
    let start = 38;
    let maskOptions = {
        mask: '+{' + start + '}(000)000-00-00',
    };

    Array.prototype.forEach.call(phoneInputs, (item) => {
        let mask = new IMask(item, maskOptions);

        item.addEventListener('focus', e => {
            mask.updateOptions({
                lazy: false,
            });
        });

        item.addEventListener('blur', e => {
            if (+mask.typedValue === start) {

                mask.updateOptions({
                    lazy: true,
                });

                item.value = "";

                setTimeout(e => {
                    item.parentNode.classList.remove('frm-group--filled');
                }, 50);
            }
        });
    });
};

// end PHONE MASK