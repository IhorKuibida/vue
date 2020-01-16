// =============================================================================
// Filter Data
// =============================================================================

export default function ($t) {
    'use strict'

    return {
        prjName: {
            options: {
                label: $t('complex')
            },
            items:{
                'zelena': {
                    value: 'Avalon Zelena St.',
                    label: $t('Avalon Zelena St.'),
                    region: 'suhiv',
                    disabled: 0,
                    checked: 0
                },/* 
                'light': {
                    value: 'Avalon Light',
                    label: $t('Avalon Light'),
                    region: 'shev',
                    disabled: 0,
                    checked: 0
                }, */
                'up': {
                    value: 'Avalon Up',
                    label: $t('Avalon Up'),
                    region: 'suhiv',
                    disabled: 0,
                    checked: 0
                },/* 
                'lux': {
                    value: 'Avalon Lux',
                    label: $t('Avalon Lux'),
                    region: 'fran',
                    disabled: 0,
                    checked: 0
                }, */
                'avalon': {
                    value: 'Avalon',
                    label: $t('Avalon'),
                    region: 'shev',
                    disabled: 0,
                    checked: 0
                },
                'day2': {
                    value: 'Avalon 2Day',
                    label: $t('Avalon 2Day'),
                    region: 'fran',
                    disabled: 0,
                    checked: 0
                },
                'time': {
                    value: 'Avalon Time',
                    label: $t('Avalon Time'),
                    region: 'shev',
                    disabled: 0,
                    checked: 0
                },
                'avalon-37': {
                    value: 'Avalon 37',
                    label: $t('Avalon 37'),
                    region: 'lychakiv',
                    disabled: 0,
                    checked: 0
                },
                'avalon-holiday': {
                    value: 'Avalon Holiday',
                    label: $t('Avalon Holiday'),
                    region: 'sokilnyky',
                    disabled: 0,
                    checked: 0
                }
            }
        },
        prjRegion: {
            options: {
                label: $t('region')
            },
            items: {
                shev: {
                    value: 'region_sheva',
                    label: $t('region_sheva'),
                    region: ['light', 'avalon', 'time'],
                    disabled: 0,
                    checked: 0
                },
                fran: {
                    value: 'region_franko',
                    label: $t('region_franko'),
                    region: ['lux','day2'],
                    disabled: 0,
                    checked: 0
                },
                suhiv: {
                    value: 'region_sykhiv',
                    label: $t('region_sykhiv'),
                    region: ['zelena', 'up'],
                    disabled: 0,
                    checked: 0
                },
                lychakiv: {
                    value: 'region_lychakiv',
                    label: $t('region_lychakiv'),
                    region: ['avalon-37'],
                    disabled: 0,
                    checked: 0
                },
                sokilnyky: {
                    value: 'region_sokilnyky',
                    label: $t('region_sokilnyky'),
                    region: ['avalon-holiday'],
                    disabled: 0,
                    checked: 0
                },
            }

        },
        type: {
            options: {
                label: $t('type') + ' ' + $t('apartments')
            },
            items: {
                room1: {
                    value: 1,
                    label: $t('1'),
                    checked: 0
                },
                room2: {
                    value: 2,
                    label: $t('2'),
                    checked: 0
                },
                room3: {
                    value: 3,
                    label: $t('3'),
                    checked: 0
                },
                penthaos: {
                    value: 'penthouse',
                    label: $t('penthouse'),
                    checked: 0
                },
                comercial: {
                    value: 'comercial',
                    label: $t('comercial'),
                    checked: 0
                }
            }

        },
        prjFinish: {
            options: {
                label: $t('finish_object')
            },
            items: {
                finish1: {
                    value: 'finish_object1',
                    label: $t('finish_object1'),
                    checked: 0
                },
                finish2: {
                    value: 'finish_object2',
                    label: $t('finish_object2'),
                    checked: 0
                },
                finish3: {
                    value: 'finish_object3',
                    label: $t('finish_object3'),
                    checked: 0
                },
                finish4: {
                    value: 'finish_object4',
                    label: $t('finish_object4'),
                    checked: 0
                }
            }

        },
        area: {
            options: {
                label: $t('area')
            },
            items: {
                min: {
                    value: 0,
                    label: $t('m'),
                    checked: 1
                },
                max: {
                    value: 148.38,
                    label: $t('m'),
                    checked: 1
                }
            }

        },
        prjPlaces: {
            options: {
                label: $t('places')
            },
            items: {
                services: {
                    value: 'Консьєрж сервіс',
                    label: $t('Консьєрж сервіс'),
                    checked: 0,
                },
                place_car: {
                    value: 'place_car',
                    label: $t('place_car'),
                    checked: 0,
                },
                build_club: {
                    value: 'build_club',
                    label: $t('build_club'),
                    checked: 0,
                },
                parking: {
                    value: 'parking',
                    label: $t('parking'),
                    checked: 0,
                },
                park: {
                    value: 'park',
                    label: $t('park'),
                    checked: 0,
                },
                children: {
                    value: 'children',
                    label: $t('children'),
                    checked: 0,
                },
                zona: {
                    value: 'zona',
                    label: $t('zona'),
                    checked: 0,
                }
            }

        },
        flat_parameters: {
            options: {
                label: $t('params')
            },
            items: {
/*                panorama: {
                    value: 'Панорамні вікна',
                    label: $t('Панорамні вікна'),
                    checked: 0,
                },*/
                balcone: {
                    value: 'Балкон',
                    label: $t('Балкон'),
                    checked: 0,
                },
                terasa: {
                    value: 'Тераса',
                    label: $t('Тераса'),
                    checked: 0,
                },
                logia: {
                    value: 'Лоджія',
                    label: $t('Лоджія'),
                    checked: 0,
                },
            }

        }
    }
};

// end Filter Data