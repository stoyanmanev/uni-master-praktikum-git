let scrollPosition = 0;
let data = null;
let template = null;

const aways = () =>{

    // headData();
    
    window.onload = function(){
        window.addEventListener('resize', fixed);
        fixed();
    
        window.addEventListener("resize", aos);
        aos();
    
        randomImg();
        skillsParsent();

        connectAPI();

        userView();
        logicForViewBtns();

        console.log('load')
    };
    

}

// AOS Library

const aos = () =>{
    let w = window.innerWidth;
    if (w > 991) {
      AOS.init({
          once: true,
      });
  }
}

// AOS Library

// Add class on body named sticky

const fixed = () =>{
    let body = document.querySelector('body'); 

    if (window.pageYOffset > 0) {
       body.classList.add("sticky");
   } else {
       body.classList.remove("sticky");
   }

    window.onscroll = function() {

        if (window.pageYOffset > 0) {
           body.classList.add("sticky");
       } else {
           body.classList.remove("sticky");
       }

    }
}

// Add class on body named sticky

// Create random image in header .img-container:before

const randomImg = () => {
    let box = document.querySelector('#image-claim');
    let num = Math.floor(Math.random() * 3) + 1;
    box.setAttribute("data-image", num);
}

// Create random image in header .img-container:before

// Create style variable for width on .parsent:before

const skillsParsent = () => {
    let parsents = document.querySelectorAll('.skill .num');
    
    parsents.forEach((parsent) => {
        let parsentBox = parsent.parentElement.parentElement.querySelector('.parsent');
            parsentBox.setAttribute('data-ready','ready');
            parsentBox.setAttribute('style', '--i:' + parsent.innerText);
    });
}

// Create style variable for width on .parsent:before

//  render light box
function renderTemplateLightBox(link){
    document.body.classList.add('open-light-box');
    let container = document.querySelector('#ligth-box-container');    
    // close popUp
    //click btn
    document.querySelector('#close-button').addEventListener('click', (e) => {
        document.body.classList.remove('open-light-box');

        setTimeout(() =>{
            iframe.remove();
        }, 300)
    })
    // --click btn

    // --close popUp
    document.querySelector('#resource').innerText = link.title;
    let iframe = document.createElement('iframe');
    let attributes = {src: link.href, frameborder: '0', width: '100%', height: '100%', allow: 'autoplay;', notProps:['fullscreen']};
    let cloneAttributes = Object.entries(attributes);
    

    cloneAttributes.forEach((attr) => {
        if(typeof attr[1] !== 'object'){
            iframe.setAttribute(attr[0], attr[1]);
        }else{
            for(i in attr){
                iframe.setAttribute(attr[1][i], '')
            }
        }
    })

    document.querySelector('#content-text').appendChild(iframe);

}
// --render light box

// Api 
function connectAPI(){

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            data = JSON.parse(this.response).response
            getTemplate(data);
        }
    });

    xhr.open("GET", "https://www.scorebat.com/video-api/v3/");

    xhr.send(data);  
}

function getTemplate(apiData){
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            template = this.response;
            renderData(apiData, template)
        }
    });

    xhr.open("GET", "../template/template.html");
    xhr.send();

}

function renderData(apiData, template, condition = '', searchByName = false) {

    listData = [];

    apiData.forEach((data) => {
        if(!searchByName){
            if(data.competition.includes(condition)){ 
                let container = document.querySelector('#render-field');
                let col = document.createElement('div');
                col.setAttribute('class', 'col');
                col.innerHTML = template;
                container.appendChild(col);
                listData.push(col);
                

                let title = col.querySelector('.title');
                container = col.querySelector('.container-data');
                let competition = col.querySelector('.container-data .competition');
                let thumbnail = col.querySelector('.container-data .thumbnail img');
                let videoSRC = data.videos[0].embed;
                let listBtns = [];
                
                title.innerText = data.title;
                competition.innerText = data.competition;
                container.setAttribute('title', data.title);
                thumbnail.setAttribute('alt', data.title); 
                thumbnail.setAttribute('src', data.thumbnail);

                videoSRC = videoSRC.split("'");
                videoSRC.forEach((result) => {
                    if(result.includes('https://www.scorebat.com/embed/v/')){
                        container.setAttribute('href', result);
                    }
                })
            }  
        }else{
            if(data.title.includes(condition)){ 
                let container = document.querySelector('#render-field');
                let col = document.createElement('div');
                col.setAttribute('class', 'col-12 col-md-6 col-xl-4');
                col.innerHTML = template;
                container.appendChild(col);
                listData.push(col);
                

                let title = col.querySelector('.title');
                container = col.querySelector('.container-data');
                let competition = col.querySelector('.container-data .competition');
                let thumbnail = col.querySelector('.container-data .thumbnail img');
                let videoSRC = data.videos[0].embed;
                let listBtns = [];
                
                title.innerText = data.title;
                competition.innerText = data.competition;
                container.setAttribute('title', data.title);
                thumbnail.setAttribute('alt', data.title); 
                thumbnail.setAttribute('src', data.thumbnail);

                videoSRC = videoSRC.split("'");
                videoSRC.forEach((result) => {
                    if(result.includes('https://www.scorebat.com/embed/v/')){
                        container.setAttribute('href', result);
                    }
                })
            } 
        }
    });

    for(i in listData){
        // last crawl

        if(listData.length - 1 == i){
            linksToLightBox();
        }
    }
}

document.querySelector('#league').addEventListener('change', (e) => {
    if (document.querySelector('#league').value !== '') {
            document.querySelector('#render-field').innerHTML = '';
            renderData(data, template, e.target.value, false);
    }
});
document.querySelector('#search-by-name').addEventListener('keyup', (e) => {
    console.log(e.target.value);
    document.querySelector('#render-field').innerHTML = '';
    renderData(data, template, e.target.value, true);
});
// --Api

function linksToLightBox() {

    let listLinks = document.querySelectorAll('.light-box-image');

    listLinks.forEach((link) => {
        link.addEventListener("click", function(event){
          event.preventDefault();
          renderTemplateLightBox(link);
        });
    })

}

function userView(){
    let data = localStorage.getItem('View-Videos');

    if(data === null || data === 'grid-view'){
        document.querySelector('#render-field').classList.add('grid-view');
        return;
    }else if(data === 'column-view'){
        document.querySelector('#render-field').classList.add('column-view');
        document.querySelector('.view-btns-box i.grid-btn').classList.remove('active');
        document.querySelector('.view-btns-box i.column-btn').classList.add('active');
    }
}

document.addEventListener("scroll", (e) => {
    let currectPosition = window.scrollY;   

    if(currectPosition > scrollPosition){
        document.body.classList.add('scroll-to-bottom');
        document.body.classList.remove('scroll-to-top');  
    }else{
        document.body.classList.remove('scroll-to-bottom');
        document.body.classList.add('scroll-to-top');
    }
    scrollPosition = currectPosition;
});

window.addEventListener('load', () => {
    document.body.classList.add('load');
});


// change view function

function changeApiDataView(elem){
    let currentElement = document.querySelector(".view-btns-box .active")

    if(elem !== currentElement){
        currentElement.classList.remove('active');
        elem.classList.add('active');
        localStorage.setItem("View-Videos", elem.dataset.view);
        let container =  document.querySelector("#render-field");
        container.classList.add(elem.dataset.view);

        if(elem.dataset.view === 'grid-view' && container.classList.contains('column-view')){
            container.classList.remove('column-view');
        }else if(elem.dataset.view === 'column-view' && container.classList.contains('grid-view')){
            container.classList.remove('grid-view');
        }

    }else{
        return;
    }
}


function logicForViewBtns(){
    let viewBtns = document.querySelectorAll(".view-btns-box i");
    viewBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            changeApiDataView(e.target);
        })
    })
}

//-- change view function


aways();




