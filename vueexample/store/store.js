import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


// PROJS
const PROJS = {
    "up": {
        "id": 4,
        "url": "./js/data/avalon-up.json",
    },
    "zelena": {
        "id": 5,
        "url": "./js/data/avalon-zelena.json",
    },
    "light": {
        "id": 6,
        "url": "./js/data/avalon-light.json",
    },
    "avalon": {
        "id": 7,
        "url": "./js/data/avalon.json",
    },
    "comfort": {
        "id": 8,
        "url": "./js/data/avalon-comfort.json",
    },
    "garden": {
        "id": 9,
        "url": "./js/data/avalon-garden.json",
    },
    "lux": {
        "id": 10,
        "url": "./js/data/avalon-lux.json",
        "style": {
            "full_floor_plan": true
        }
    },
    "2day": {
        "id": 30,
        "url": "./js/data/avalon-2day.json",
        "settings": {
            "pseudo-corp": true
        }
    },
    "time": {
        "id": 31,
        "url": "./js/data/avalon-time.json",
    },
    "avalon-37": {
        "id": 33,
        "url": "./js/data/avalon-37.json",
    },
    "avalon-holiday": {
        "id": 34,
        "url": "./js/data/avalon-holiday.json"
    },
    "avalon-new-point": {
        "id": 11,
        "url": "./js/data/avalon-new-point.json"
    },
    "avalon-flex": {
        "id": 40,
        "url": "./js/data/avalon-flex.json"
    },
}

// get current project id
function currentProjectId() {
    let projectPage = document.querySelector('body.project-page');
    let current = 0;
    if(projectPage) {
        current = document.querySelector('.section-prj-main').id;
    }
    return current;
};

// get data projects from json
function data() {
    let projectPage = document.querySelector('body.project-page');
    let pickUpPage = document.querySelector('body.pick-up-page');

    var arrProjects = [];
    var newData = {};

    // cycle of projects
    for (var prop in PROJS) {
        if (projectPage && PROJS[prop].id == currentProjectId()) {
            let propStyle = PROJS[prop].style ? true : false;
            let propSettings = PROJS[prop].settings ? true : false;
            getJsonData(arrProjects, propStyle, propSettings);
        }

        if (pickUpPage) {
            getJsonData(arrProjects);
        }
    }

    // get json and push to array projects
    function getJsonData(arr, style, settings) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', PROJS[prop].url, false);
        xhr.send();
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText );
        } else {
            let getData = JSON.parse(xhr.responseText);
            getData["id"] = PROJS[prop].id;

            if (style)
                getData["style"] = PROJS[prop].style;

            if (settings)
                getData["settings"] = PROJS[prop].settings;

            arr.push(getData);
        }
    }

    newData["projects"] = arrProjects;
    return newData;
}




const store = new Vuex.Store({

    // STATE
    state: {
        data: data(),


        // PROJECTS (prj)
        // prj modal
        prjModal: false,
        prjFloorStatus: false,
        prjApartmentStatus: false,
        prjOrderForm: false,

        // prj default value
        prjCurrentProject: currentProjectId(),
        prjCurrentCorp: 0,
        prjCurrentSection: 0,
        prjCurrentFloor: 0,
        prjCurrentApartment: 0,
        prjCurrentMultilevel: 0,

        // prj day/night style
        prjDayStyle: true,
        prjNightStyle: false,

        // prj panorama status
        prjPanorama: false,

        // if transition from filters page
        prjFromFltrStatus: false,


        // prj panorama modal
        prjPanoramaModalStatus: false,
        prjPanoramaIframeUrl: "",

        // prj virtual modal
        prjVirtualModalStatus: false,
        prjVirtualIframeUrl: "",

        // prj interactive plan modal
        prjInteractivePlanStatus: false,
        prjInteractivePlanIframeUrl: "",


        // FILTERS (fltr)
        // if transition from project page
        fltrFromPrjStatus: false,
    },


    // MUTATIONS
    mutations: {

        // PUSH MUTATIONS
        prjPushProject(state, number) {
            state.prjCurrentProject = number;
        },
        prjPushCorp(state, number) {
            state.prjCurrentCorp = number;
        },
        prjPushSection(state, number) {
            state.prjCurrentSection = number;
        },
        prjPushFloor(state, number) {
            state.prjCurrentFloor = number;
        },
        prjPushApartment(state, number) {
            state.prjCurrentApartment = number;
        },
        prjPushMultilevel(state, number) {
            state.prjCurrentMultilevel = number;
        },


        // MODAL
        openModal(state) {
            state.prjModal = true;
        },
        closeModal(state) {
            state.prjModal = false;
            state.prjFloorStatus = false;
            state.prjApartmentStatus = false;

            // clear default value
            state.prjCurrentSection = 0;
            state.prjCurrentFloor = 0;
            state.prjCurrentApartment = 0;
        },


        // ORDER FORM
        prjOpenOrderForm(state) {
            state.prjOrderForm = true;
        },
        prjCloseOrderForm(state) {
            state.prjOrderForm = false;
        },


        // OPEN/CLOSE FLOOR/APARTMENT
        // Floor
        prjOpenFloor(state) {
            state.prjApartmentStatus = false;
            state.prjFloorStatus = true;
        },
        // Apartment
        prjOpenApartment(state) {
            state.prjFloorStatus = false;
            state.prjApartmentStatus = true;
        },


        // SWITCH DAY/NIGHT
        // on Day style
        onDayStyle(state) {
            state.prjDayStyle = true;
            state.prjNightStyle = false;
        },
        // on Night style
        onNightStyle(state) {
            state.prjDayStyle = false;
            state.prjNightStyle = true;
        },


        // ON/OFF PANORAMA
        onPanorama(state) {
            state.prjPanorama = true;
        },
        offPanorama(state) {
            state.prjPanorama = false;
        },


        // (project page) transition from filters page => true
        prjFromFltr(state) {
            state.prjFromFltrStatus = true;
        },

        // (filters page) transition from project page => true
        fltrFromPrj(state) {
            state.fltrFromPrjStatus = true;
        },




        // Virtual modal
        openPanoramaModal(state, url) {
            state.prjPanoramaModalStatus = true;
            state.prjPanoramaIframeUrl = url;
        },
        closePanoramaModal(state, url) {
            state.prjPanoramaModalStatus = false;
        },

        // Virtual modal
        openVirtualModal(state, url) {
            state.prjVirtualModalStatus = true;
            state.prjVirtualIframeUrl = url;
        },
        closeVirtualModal(state, url) {
            state.prjVirtualModalStatus = false;
        },

        // Interactive plan modal
        openInteractivePlanModal(state, url) {
            state.prjInteractivePlanStatus = true;
            state.prjInteractivePlanIframeUrl = url;
        },
        closeInteractivePlanModal(state) {
            state.prjInteractivePlanStatus = false;
        },
    },


    // GETTERS
    getters: {

        // PROJECTS
        // get concrete project
        getCurrentProject: (state) => (indexProject) => {
            let dataProject = state.data.projects;
            let getCurentProjectData = dataProject.filter((item) => {
                return item.id == indexProject;
            });
            return getCurentProjectData[0];
        },

        // get project title
        getProjectTitle: (state) => (indexProject) => {
            let dataProject = store.getters.getCurrentProject(indexProject);
            return dataProject["complex_name"];
        },

        // get concrete project style (if prj has style)
        getCurrentProjectStyle: (state) => (indexProject) => {
            let dataProject = store.getters.getCurrentProject(indexProject);
            if (dataProject.style) {
                return dataProject.style;
            }
            else {
                return false;
            }
        },



        // CORPS
        // get all corps from concrete project
        getCorps: (state) => (indexProject) => {
            let dataProject = store.getters.getCurrentProject(indexProject);
            return dataProject.corps;
        },



        // SECTIONS
        // get all sections from concrete project
        getSections: (state) => (indexProject) => {
            let dataProject = store.getters.getCurrentProject(indexProject);
            return dataProject.sections;
        },

        // get concrete section
        getCurrentSection: (state) => (indexProject, indexSection) => {
            let dataProject = store.getters.getCurrentProject(indexProject);
            return dataProject.sections[indexSection];
        },

        // get section title
        getSectionTitle: (state) => (indexProject, indexSection) => {
            let dataSection = store.getters.getCurrentSection(indexProject, indexSection);
            return dataSection["section_title"];
        },

        // get section index from title
        getSectionIndexFromTitle: (state) => (indexProject, titleSection) => {
            let dataSections = store.getters.getSections(indexProject);
            let getSectionInex;
            Array.prototype.forEach.call(dataSections, (section, index) => {
                if(section.section_title == titleSection) {
                    return getSectionInex = index;
                }
            });
            return getSectionInex;
        },

        // sections corp
        // sectionsCorps: (state) => (indexProject) => {
        //     let dataSections = store.getters.getSections(indexProject);

        //     if (dataSections.length > 1) {
        //         const dataCorps = [];

        //         // getAllCorpsValue
        //         const getAllCorpsValue = dataSections.map((section, i) => {
        //             return section.corps_title;
        //         });

        //         // getUniqueCorpsValue
        //         const getUniqueCorpsValue = getAllCorpsValue.filter((item, pos, self) => {
        //             return self.indexOf(item) == pos;
        //         });

        //         // getUniqueCorps array
        //         getUniqueCorpsValue.forEach((corpsValue, i) => {
        //             let arr = dataSections.filter((section, i) => {
        //                 return section.corps_title == corpsValue;
        //             });
        //             dataCorps.push(arr);
        //         });

        //         return dataCorps;
        //     }
        //     else {
        //         return false;
        //     }
        // },

        // get concrete section which has corps
        getSectionsCorp: (state) => (indexProject, indexCorps) => {
            let dataSections = store.getters.getSections(indexProject);

            return dataSections.filter((item) => {
                if(item.corps_title) {
                    return item.corps_title == indexCorps + 1;
                }
                else {
                    return dataSections[0];
                }
            });
        },



        // FLOORS
        // get all floors from concrete section
        getFloors: (state) => (indexProject, indexSection) => {
            let dataSection = store.getters.getCurrentSection(indexProject, indexSection);
            return dataSection.floors;
        },

        // get concrete floor
        getCurrentFloor: (state) => (indexProject, indexSection, indexFloor) => {
            let dataSection = store.getters.getCurrentSection(indexProject, indexSection);
            return dataSection.floors[indexFloor];
        },

        // check floor
        checkFloor: (state) => (indexProject, indexSection, indexFloor) => {
            let getFloor = store.getters.getCurrentFloor(indexProject, indexSection, indexFloor);

            if (checkIfFloorWithoutParameters(getFloor) || checkIfFloorDisabled(getFloor)) {
                return false;
            }
            else {
                return true;
            }
        },

        // return enabled floor
        returnEnabledFloor: (state) => (indexProject, indexSection) => {
            let getSection = store.getters.getFloors(indexProject, indexSection);
            let index; // enabled floor index
            for (var i = 0; getSection.length - 1; i++) {
                if(store.getters.checkFloor(indexProject, indexSection, i)) {
                    index =  i;
                    break;
                }
            }
            return index;
        },



        // APARTMENTS
        // get all apartment from concrete floor
        getApartments: (state) => (indexProject, indexSection, indexFloor) => {
            let dataFloor = store.getters.getCurrentFloor(indexProject, indexSection, indexFloor);
            return dataFloor.flats;
        },

        // get concrete apartment
        getCurrentApartment: (state) => (indexProject, indexSection, indexFloor, indexApartment) => {
            let dataFloor = store.getters.getCurrentFloor(indexProject, indexSection, indexFloor);
            return dataFloor.flats[indexApartment];
        },

        // get apartment title
        getApartmentTitle: (state) => (indexProject, indexSection, indexFloor, indexApartment) => {
            let dataApartment = store.getters.getCurrentApartment(indexProject, indexSection, indexFloor, indexApartment);
            return dataApartment["title"];
        },

        // get apartment index from title
        getApartmentIndexFromTitle: (state) => (indexProject, indexSection, indexFloor, titleApartment) => {
            let dataApartments = store.getters.getApartments(indexProject, indexSection, indexFloor);
            let getApartmentInex;
            Array.prototype.forEach.call(dataApartments, (item, index) => {
                if (item["title"] == titleApartment) {
                    return getApartmentInex = index;
                }
            });
            return getApartmentInex;
        },

        // get count rooms
        getCountRooms: (state) => (indexProject, indexSection, indexFloor) => {
            let dataFlats = store.getters.getApartments(indexProject, indexSection, indexFloor);

            var arrType = [];
            var arrTypeInfo = {};

            dataFlats.forEach(function(itm, i) {
                if (itm.status !== "reserved" || itm.status !== "sold-out") {
                    arrType.push(itm.type);
                }
            });

            var uniqueArray = arrType.filter(function(item, pos, self) {
                return self.indexOf(item) == pos;
            });

            uniqueArray.forEach(function(itm) {
                let arr = arrType.filter(function(item) {
                    return item == itm;
                });
                arrTypeInfo[itm] = arr.length;
            });

            return arrTypeInfo;
        },

        // get all apartments
        getAllApartments: state => {
            let projects = state.data.projects;
            let allFlats = [];

            // get all projects
            for (var i = 0; i < projects.length; i++) {

                // if project status has testing do not add the apartments of this project to array allFlats
                if (projects[i].status === "testing" ) {
                    continue;
                }

                let sections = projects[i].sections;
                let getPrjName = projects[i].complex_name;
                let getPrjRegion = projects[i].region;
                let getPrjPlaces = projects[i].places;
                let getPrjFinish = projects[i].finish;

                // get all sections
                for (var n in sections) {
                    let getPrjSection = sections[n]["section_title"];
                    let floors = sections[n].floors;

                    // get all floors
                    for (var j in floors) {
                        let floor = floors[j];

                        // if floor is disabled => continue
                        if (checkIfFloorDisabled(floor)) continue;

                        let getPrjFloor = floor["title"];
                        let getPrjFloorIndex = j;
                        let flats = floor.flats;

                        // get all flats
                        for (var k in flats) {
                            flats[k]["prjName"] = getPrjName;
                            flats[k]["prjRegion"] = getPrjRegion;
                            flats[k]["prjFinish"] = getPrjFinish;
                            flats[k]["prjPlaces"] = getPrjPlaces;
                            flats[k]["prjSection"] = getPrjSection;
                            flats[k]["prjFloor"] = getPrjFloor;
                            flats[k]["prjFloorIndex"] = getPrjFloorIndex;
                            flats[k]["prjApartment"] = flats[k]["title"];

                            // console.log(allFlats);
                            if (flats[k].type) {
                                allFlats.push(flats[k]); // list flats
                            }
                        }
                    }
                }
            }

            return allFlats;
        }
    }
});





// CHECK FLOOR OPTION
// check if floor is disabled
function checkIfFloorDisabled(floor) {
    return (!floor.flats || floor.status === "disabled") ? true : false;
}

// check if floor without parameters
function checkIfFloorWithoutParameters(floor) {
    return (!floor.floor_image || !floor.floor_coords) ? true : false;
}

export default store;