window.addEventListener('scroll', e => {
    const header = document.getElementById('header');
    header.classList.toggle('header__scroll', window.scrollY > 0);
});

const createBoard = (initElement, boardSelector, color) => {
    let current = {
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
    let index = 0;
    // Auto change
    setInterval(() => {
        board.children[index].click(); 
        index = ++index % board.children.length;
    }, 10000);
    const board = document.querySelector(boardSelector);
    [...board.children].forEach((element, i) => {
        if (element.dataset.selector === initElement) {
            current.newState(element, document.querySelectorAll(element.dataset.selector));
        }
        element.addEventListener('click', e => {
            if (current.element != null && e.target.dataset.selector !== current.element.dataset.selector) {
                current.newState(element, document.querySelectorAll(element.dataset.selector));
                index = i;
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