let width, height, nextButton, prevButton, iframe, article;
let sections = [];
let svg;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    svg = document.querySelector('svg');
    nextButton = document.querySelector('.next-button');
    prevButton = document.querySelector('.prev-button');
    iframe = document.querySelector('iframe');
    article = document.querySelector('article');

    document.querySelectorAll('section').forEach(element => {
        sections.push(element);
    });

    sections.forEach(section => {
        section.style.top = getRandom(20, height - section.offsetHeight - 20)  + 'px';
        section.style.left = getRandom(20, width - section.offsetWidth - 20) + 'px';

        section.addEventListener("click", function(){
            openSection(section);
        });
    });

    sections.forEach(section => {
        let sectionBox = section.getBoundingClientRect();
        let nextLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        nextLine.setAttribute("x1", sectionBox.right - (section.offsetWidth/2));
        nextLine.setAttribute("y1", sectionBox.bottom);

        let nextSectionBox = document.querySelector("." + section.getAttribute('data-next')).getBoundingClientRect();
        nextLine.setAttribute("x2", nextSectionBox.left + (section.offsetWidth/2));
        nextLine.setAttribute("y2", nextSectionBox.top);
        
        nextLine.style.stroke = "rgb(200, 200, 200)"; //Set stroke colour
        nextLine.style.strokeWidth = "1px"; //Set stroke width
        svg.appendChild(nextLine);

        let prevLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        prevLine.setAttribute("x1", sectionBox.left + (section.offsetWidth/2));
        prevLine.setAttribute("y1", sectionBox.top);

        let prevSectionBox = document.querySelector("." + section.getAttribute('data-prev')).getBoundingClientRect();
        prevLine.setAttribute("x2", prevSectionBox.right - (section.offsetWidth/2));
        prevLine.setAttribute("y2", prevSectionBox.bottom);

        prevLine.style.strokeDasharray = "5";
        prevLine.style.stroke = "rgb(200, 200, 200)"; //Set stroke colour
        prevLine.style.strokeWidth = "1px"; //Set stroke width
        svg.appendChild(prevLine);

        section.addEventListener("click", function(){
            openSection(section);
        });

        section.addEventListener("mouseenter", function(){
            nextLine.style.stroke = "blue";
            prevLine.style.stroke = "blue";
            svg.style.zIndex = 2;
        });

        section.addEventListener("mouseleave", function(){
            nextLine.style.stroke = "rgb(200, 200, 200)";
            prevLine.style.stroke = "rgb(200, 200, 200)";
            svg.style.zIndex = 0;
        });
    });

};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function openSection(section){
    iframe.setAttribute('src', 'texts/' + section.className.split(" ")[0] + '/index.html');
    
    prevButton.addEventListener("click", function(){
        let prevSection = document.querySelector('.' + section.getAttribute('data-prev'));
        openSection(prevSection);
    });

    nextButton.addEventListener("click", function(){
        let nextSection = document.querySelector('.' + section.getAttribute('data-next'));
        openSection(nextSection);
    });

    article.style.display = 'block';
}
