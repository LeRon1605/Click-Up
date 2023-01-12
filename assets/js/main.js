const header = document.getElementById('header');
const navDropdown = document.getElementsByClassName('nav-dropdown');
const mobileHeader = {
    header: document.getElementById('header-mobile'),
    wrapper: document.getElementById('header-wrapper'),
    toggleBtn: document.getElementById('mobile-nav'),
    closeBtn: document.getElementById('mobile-close'),
    navDropdown: document.getElementsByClassName('header__mobile_dropdownToggle')
};

window.addEventListener('scroll', e => {
    header.classList.toggle('header__scroll', window.scrollY > 0);
});

[...navDropdown].forEach(element => {
    element.addEventListener('mouseover', e => {
        [...navDropdown].forEach(x => {
            x.querySelector('.header__action_wrapper').style = 'display: none';
        });
        header.classList.add('header__active');
        element.querySelector('.header__action_wrapper').style = 'display: flex; flex-direction: column; border: 1px solid rgba(185, 190, 199, .6);';
    });

    element.addEventListener('mouseout', e => {
        [...navDropdown].forEach(x => {
            x.querySelector('.header__action_wrapper').style = 'display: none';
        });
        header.classList.remove('header__active');
    });
});

// Close mobile header if click outside
window.addEventListener('click', e => {
    if (mobileHeader.header.contains(e.target) && !mobileHeader.wrapper.contains(e.target)) {
        mobileHeader.header.classList.add('d_none');
    }
});

mobileHeader.toggleBtn.addEventListener('click', e => {
    mobileHeader.header.classList.toggle('d_none');
});

mobileHeader.closeBtn.addEventListener('click', e => {
    mobileHeader.header.classList.toggle('d_none');
});

[...mobileHeader.navDropdown].forEach(element => {
    element.addEventListener('click', e => {
        element.querySelector('.icon').classList.toggle('header__mobile_iconActive');
        element.nextElementSibling.classList.toggle('header__mobile_dropdownActive');
    });
});

const createBoard = (initElement, boardSelector, color) => {
    let current = {
        index: 0,
        element: null,
        contentBoard: null,
        toggle: function() {
            if (this.element) {
                this.element.classList.toggle(`board__nav_itemActive${color}`);
            }
            if (this.contentBoard) {
                this.contentBoard.forEach(element => element.classList.toggle('d_none'));
            }
        },
        newState: function(newElement, newBoard) {
            this.toggle();
            this.element = newElement;
            this.contentBoard = newBoard;
            this.toggle();
        }
    };
    // Auto change
    setInterval(() => {
        board.children[current.index].click(); 
        current.index = (++current.index) % board.children.length;
    }, 10000);
    const board = document.querySelector(boardSelector);
    [...board.children].forEach((element, i) => {
        if (element.dataset.selector === initElement) {
            current.newState(element, document.querySelectorAll(element.dataset.selector));
        }
        element.addEventListener('click', e => {
            if (current.element != null && e.target.dataset.selector !== current.element.dataset.selector) {
                current.newState(element, document.querySelectorAll(element.dataset.selector));
                current.index = i;
            }
        });
    });
};

const renderProfile = (obj) => {
    const profileImage = document.getElementById('profile-image');
    const feedback = document.getElementById('feedback');
    const company = document.getElementById('company');
    const companyLogo = document.getElementById('company-logo');

    profileImage.src = obj.image;
    feedback.innerText = obj.feedback;
    company.innerText = obj.info.company;
    companyLogo.src = obj.info.logo;
};

const makeSlider = (data, renderHtml) => {
    const slider = {
        data,
        current: 0,
        nextBtn: document.getElementById('next-btn'),
        prevBtn: document.getElementById('prev-btn'),
        init: function() {
            if (this.data.length > 0) {
                renderHtml(this.data[0]);
                this.prevBtn.classList.add('disabled');
            }
        }
    };

    slider.init();

    slider.nextBtn.addEventListener('click', () => {
        if (slider.current < slider.data.length - 1) {
            renderHtml(slider.data[++slider.current]);
            if (slider.current == slider.data.length - 1) {
                slider.nextBtn.classList.add('disabled');
            } 
            if (slider.current == 1) {
                slider.prevBtn.classList.remove('disabled');
            }
        }
    });

    slider.prevBtn.addEventListener('click', () => {
        if (slider.current > 0) {
            renderHtml(slider.data[--slider.current]);
            if (slider.current == 0) {
                slider.prevBtn.classList.add('disabled');
            } 
            if (slider.current == slider.data.length - 2) {
                slider.nextBtn.classList.remove('disabled');
            }
        }
    })
};

const slideData = [
    {
        image: './assets/images/jakub.png',
        feedback: `ClickUp has become such an integral part of our work! By putting our work on ClickUp and organizing it into Sprints, we made it easy to work across departments without overloading ourselves with meetings and email threads.`,
        info: {
            logo: './assets/images/stxnext.svg',
            company: 'Jakub, Inbound Marketing Team Lead, STX Next' 
        },
    },
    {
        image: './assets/images/gabriel-hoffman.png',
        feedback: `After using many different methods to create and manage Scrum frameworks, I finally found the most flexible and powerful platform: ClickUp.`,
        info: {
            logo: './assets/images/zenpilot.png',
            company: 'Gabriel Hoffman, Solutions Engineer, Zen Pilot' 
        },
    }
];

makeSlider(slideData, renderProfile);
createBoard('#project_task', '#board-nav-1', 'Red');
createBoard('#docs', '#board-nav-2', 'Violet');
createBoard('.import', '#board-nav-31', '');
createBoard('#projectManagement', '#board-nav-4', 'Blue');