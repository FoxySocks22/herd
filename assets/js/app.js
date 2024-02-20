// Variables 

const modal = document.querySelector('.modal');

const sections = [
    "Footer",
    "Form",
    "Main",
    "Header"
]

// Data

const comments = {
    "header": {
        "title": "Header",
        "thoughts": [
            "Not sure if the logo was letter head or part of the design.",
            "For some reason I was unable to download the provided logo.",
            "Same goes for the slider icons, I guess because their SVG files...",
            "Legit the first time I've used the <sup> tag.",
            "I'm a big fan of 7:1 and BEM when working with SASS.",
            "I generally build for two primary breakers, but modify this appraoch if the design calls for it.",
            "Obviously 7:1 is better for less flat projects, so the benefits here are slimmer. But I alwyas feel modular code, even SASS, is good.",
            "The little flip animation on the logo, only really exists to show I can use @keyframes, as sometimes people take those very seriously."
        ]
    },
    "main": {
        "title": "Main",
        "thoughts": [
            "I used Batman Ipsum to generate the text in this section, a little more fun than vanilla Ipsum.",
            "I use styled h2's rather than heirachical h2-h6 because it's easier to manage for SEO.",
            "I could not find an asset for the speach mark here.",
            "I opted not to use a framework like Bootstrap or Foundation as the design layout is realtively straightforward, and they introduce a lot of blaot if you don't need them, though I can use both as well as Tailwind."
        ]
    },
    "form": {
        "title": "Form",
        "thoughts": [
            "I did think about wiring the form up with mail trap, but it seemed pointless as nobody would have knowm it worked any way.",
            "I didn't use the :invalid selector, as it gives false impression to the user until they've finished typing, so a standalone :valid IMO is better.",
            "I know the design had the button underlined by default, but I really wanted to work in some hover effects somewhere.",
            "IMO i'd have placed the submit button below the checkbox to indicate a relation a little better.",
            "The flex properties here, really could have been a class, but they didn't see a whole lot of use."
        ]
    },
    "footer": {
        "title": "Footer",
        "thoughts": [
            "A lot of the SASS here, is to show that I can do a little more than the basics wth SASS, it isn't necceserily practical in this use case.",
            "If I can reduce the need to use third-part dependencies, espeiclaly if the solution is lightweight, I like to, so I made a simple CSS carousel.",
            "I also like that this slider has a more native feel and works greta for mobile.",
            "I did originally have a much sexier hover effect, but I opted for subdued in the end.",
            "For the footer base, I didn't see a ref for that color, so I improvised and tied it in with the overall brand identiy.",
            "I'd have rather the scroll indicator remain fixed, but without some messy JS that was tricky, i'd say it adequately serves it purpose though.",
            "The choice of a waffle image, is becuase it's an entirely non-offensive image, unless someone somewhere has a seathing annimosity for them - but then they'd be no friend of mine.",
            "If i'd anticiapted that I'd use quite as many pseudo elements I'd have classified them."
        ]
    }
}

// Methods & DOM manipulation

const populateModal = (section) => {
    const modalTitle = document.getElementById('modal-title');
    const modalList = document.getElementById('modal-list');
    modalTitle.innerHTML = '';
    modalList.innerHTML = '';
    modalTitle.innerHTML = comments[section].title + ' section thoughts & comments:';
    comments[section].thoughts.map((though) => {
        const listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(though));
        listItem.setAttribute('class', "list_item");
        modalList.appendChild(listItem);
    })
}

const getDataForModal = (event) => {
    const offset = document.documentElement.scrollTop || document.body.scrollTop
    const clickZone = event.clientY;
    const pos = +offset.toFixed(0) + +clickZone.toFixed(0);
    const parentElement = event.target.parentElement.closest('.parent');
    modal.style.display = 'block';
    modal.style.top = `${pos}px`;
    modal.style.left = `${(event.clientX / 2).toFixed(0)}px`;
    parentElement ? populateModal(parentElement.id) : alert('Try clicking a section again, must have missed it.');
} 

/* This really only exists as I originally planned on animating the enterance of
each section, but in the end I decided that was overkill. */
const fetchSection = (file) => {
    const injectionPoint = document.getElementById(file.toLowerCase());
    fetch(`partials/_${file}.html`).then(function (response) {
        return response.text();
    }).then(function(html) {
        injectionPoint.innerHTML = html;
    }).catch(function (err) {
        console.warn('Something went wrong.', err);
    });
}

sections.map((choice) => {
    fetchSection(choice);
    document.getElementById(choice.toLowerCase()).addEventListener('click', getDataForModal);
})

const hideModal = () => modal.style.display = 'none';

document.getElementById('hide').addEventListener('click', hideModal);

hideModal();
alert('There is a modal that appears when a section is clicked, it contains my thoughts on both my method and the design. There are four sections, header, main, form and footer - it will appear when each are clicked.');

/* So much more I wanted to do here, but given the time contraints this is all I 
had time to do with JavaScript. I do have Git which is full of my React & Node 
work, if your interested. */