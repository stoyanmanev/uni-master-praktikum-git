const aways = () =>{

        
    // headData();
    
    window.onload = function(){
        window.addEventListener('resize', fixed);
        fixed();
    
        window.addEventListener("resize", aos);
        aos();
    
        randomImg();
        skillsParsent();
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

// 


// Create tags / scripts / link form data/config.json5

aways();




