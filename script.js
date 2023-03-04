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
    toggleSpinner(false);
  });
};

// spnineer
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spinner');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none');
  }
}
// all data show

// fetch single data
const fetchSingleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showSingleData(data.data);
    });
};

// show single data
function showSingleData(info) {
  const modalBody = document.getElementById("modalBody");
  console.log(info)
  const Somequestion = info.input_output_examples;
  let question = "";
  if (Somequestion !== null) {
    question += `${Somequestion[0].input}</br></br> ${Somequestion[0].output}`;
  } else {
    question += `
      <h5>can you give any example</h5>
      <h6>No No yet Take a break</h6>
    `;
  }

  const featurees = info.features;
  let featureesHtml = "";
  for (const key in featurees) {
    featureesHtml += `<li>${featurees[key].feature_name}</li>`;
  }

  const integrations = info.integrations;
  let integrationsList = "";
  if (integrations !== null) {
    integrations.map((li) => {
      integrationsList += `<li>${li}</li>`;
    });
  } else {
    integrationsList = "no data found";
  }

  // Modal
  modalBody.innerHTML = `
     <div class="border p-2">
     <h4>${info.description}</h4>
  
     <div id="hello" class="row  justify-content-between align-items-center">
     <div class="col-4 shadow small gap-1 p-4">
      ${info.pricing ? info.pricing[0].price : "free off cost/"}
      ${info.pricing ? info.pricing[0].plan : " basic"}
     </div>
     <div class="col-4 shadow small gap-1 p-4">
     ${info.pricing ? info.pricing[1].price : "free off cost/"}
     ${info.pricing ? info.pricing[1].plan : "pro"}
     </div>
     <div class="col-4 shadow small gap-1 p-4">
     ${info.pricing ? info.pricing[2].price : "free off cost/"}
     ${info.pricing ? info.pricing[2].plan : " Intership"}
     </div>
      
     </div>
  
  
     <div class="d-flex gap-3">
       <div>
       <h4 class="font-bold">Features</h4>
       <ul>
       ${info.features ? featureesHtml : "no data found"}
       </ul>
       </div>
       <div>
       <h4 class="font-bold">integration</h4>
       <ul>
       ${integrationsList}
       </ul>
       </div>
     </div>
   </div>
   <div class="p-2" >
     <div class="p-2">
     <img src="${info.image_link[0]}" alt=""class="img-fluid position-relative">
     <div id="accouricy" class="d-block rounded p-2 text-light fw-semibold fs-6 bg-danger position-absolute top-0 end-0">${
       info.accuracy.score * 100 + "% accouricy"
     }
     </div>
      <div class="mt-4">
      <h5>${question}</h5>
    </div>
    `;

  const accouricyy = document.getElementById("accouricy");
  const accouaricy = info.accuracy.score;
  if (accouaricy == null) {
    accouricyy.classList.add("d-none");
  }
};

// ProcessData 
const processData = (dataLimit) =>{
  getAIData(dataLimit);
}

document.getElementById('showMore').addEventListener('click', function(){
  toggleSpinner(true);
  processData();
});

processData(6);

