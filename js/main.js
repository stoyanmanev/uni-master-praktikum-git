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

// Create tags / scripts / link form data/config.json5

const headData = () =>{
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status===200) {

            data = eval("("+request.responseText+")");
            convertJSON(eval("("+request.responseText+")"));

        }
        
    }

    request.open("GET", "./data/config.json5");
    request.send();


    const convertJSON = (object) =>{
        const siteProperties = object.site;
        const pages = object.page;
        let fullData = [];

        const getValues = (listObj) =>{
            const nestObj = (objects, link) => {
                
                for(x in objects){
                    
                    let iterationObject = [];
                    
                        if(typeof objects[x] === 'object'){
                            let listX = Object.entries(objects[x])

                            listX.forEach((item) => {
                                iterationObject.push([{type:link, [x]:item[0], content: item[1]}])
                            });
                        }
                        else{
                            let listX = Object.entries(objects)
                            listX.forEach((elem) => {
                                if(typeof elem[1] !== 'object'){
                                    iterationObject.push([{type:link, [elem[0]]: elem[1]}])
                                }
                            });
                        }
                        
                    fullData.push(iterationObject);
                    
                }
            }

            listObj.forEach((type) =>{
                nestObj(type[1], type[0]);
            })

        }

        getValues(Object.entries(siteProperties));
        renderData(fullData);
    }

    const renderData = (fullData) =>{
        fullData.forEach((list) => {
            list.forEach((item) => {
                if(Object.keys(item[0]).length !== 3){
                    let link = document.createElement(item[0].type);
                    let props = Object.entries(item[0]);
                    props.shift();
                    link.setAttribute([props[0][0]], props[0][1]);
                    document.head.appendChild(link);
                }
                else{
                    let link = document.createElement(item[0].type);
                    
                    if(item[0].type === 'meta'){
                        let props = Object.entries(item[0]);
                        props.shift();
                        link.setAttribute([props[0][0]], props[0][1]);
                        if(typeof props[1][1] === 'object'){
                            let netsProps = Object.entries(props[1][1]);
                            let propsText = '';
                            netsProps.forEach((prop) => {
                                propsText += prop[0] + "=" + prop[1] + ", ";
                            })
                            propsText = propsText.slice(0, propsText.length - 2);
                            link.setAttribute([props[1][0]], propsText);
                            
                        }else{
                            link.setAttribute([props[1][0]], props[1][1]);
                        }
                        document.head.appendChild(link);
                    }
                    else{
                        console.log(item)
                        item.forEach((i) => {
                            console.log(i);
                        })
                    }
                }
            });
        });
    }
}

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
    // xhr.open("GET", "../data/template.html");
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
                // col.setAttribute('class', 'col-12 col-md-6 col-xl-4');
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
                // col.setAttribute('class', 'col medium-6 giant-4'); \\ work
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




