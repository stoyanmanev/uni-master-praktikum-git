
// -- request for data from api
function connectAPI(){
    data = null;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
			getTemplate(JSON.parse(this.response).response);
        }
    });

    xhr.open("GET", "https://www.scorebat.com/video-api/v3/");

    xhr.send(data);  
}
connectAPI();

// -- request for data from api

// request for template
// connectApi() -> this
function getTemplate(apiData){
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
		   renderData(apiData, this.response)
		}
	});

	xhr.open("GET", "../template/template.html");
	xhr.send();

}

// -- request for template

function renderData(apiData, template) {

	listData = [];

	apiData.forEach(() => {
		let container = document.querySelector('#render-field');
		let col = document.createElement('div');
		col.setAttribute('class', 'col col-4');
		col.innerHTML = template;
		container.appendChild(col);
		listData.push(col);
	});

	for(i in listData){
		let title = listData[i].querySelector('.title');
    	let competition = listData[i].querySelector('.container-data .competition');
    	let thumbnail = listData[i].querySelector('.container-data .thumbnail img');
		
		title.innerText = apiData[i].title;
		competition.innerText = apiData[i].competition;
		thumbnail.setAttribute('src', apiData[i].thumbnail);

		let videoSRC = apiData[i].videos[0].embed;
		videoSRC = videoSRC.split("'");
		videoSRC.forEach((result) => {
			if(result.includes('https://www.scorebat.com/embed/v/')){
				thumbnail.setAttribute('data-src', result);
			}
		})
	}

}