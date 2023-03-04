function getAIData(dataLimit) {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((fethData) => showDisplayAIData(fethData.data.tools, dataLimit));
}

const showDisplayAIData = (universAllData, dataLimit) => {
  const divContainer = document.getElementById("card_container");
  divContainer.textContent = '';
  const showAll = document.getElementById('show-all');
    if(dataLimit && universAllData.length > 6) {
        universAllData = universAllData.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }


  universAllData.forEach((data) => {
    const { image, name, published_in, id } = data;

    const myDiv = document.createElement("div");
    myDiv.classList.add("col");
    const features = data.features;
    const featureList = features
      .map((feature) => `<li>${feature}</li>`)
      .join("");

    myDiv.innerHTML = `
       <div class="card h-100 Small shadow">
       <img src="${image}" class="card-img-top" alt="...">
       <div class="card-body">
         <h5 class="card-title">Featurse</h5>
         <ol>
          ${featureList}
        </ol>
         <hr>
         <h5 class="card-title">${name}</h5>
         <div class="d-flex justify-content-between align-items-center">
          <p><span><i class="fa-solid fa-calendar-days "></i></span> ${published_in}</p>
          
         <i onclick="fetchSingleData('${id}')" class="fa-solid fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
         </div>
       </div>  
      </div>    
      `;
    divContainer.appendChild(myDiv);

  });
};

// more btn

// spnineer

// all data show


// ProcessData 
const processData = (dataLimit) =>{
  getAIData(dataLimit);
}

document.getElementById('showMore').addEventListener('click', function(){
  processData();
});

processData(6);

