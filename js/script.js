// All Data Load
const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => showData(data.data.tools));
};

// Display Show Data
const showData = (aiTools) => {
  // console.log(aiTools)
  // console.log(data.data.tools[0].name)
  aiTools = aiTools.slice(0, 6);
//   console.log(aiTools);
  const dataConatiner = document.getElementById("data-container");
  dataConatiner.classList.add('row');
  dataConatiner.classList.add('g-3');
  dataConatiner.classList.add('mb-5');
  // dataConatiner.innerHTML='';

  // display Show
  aiTools.forEach((aiTool) => {
    // console.log(aiTool)
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    // div.classList.add("mb-5");
    div.innerHTML = `
    <div class="card">
        <img src="${aiTool.image}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">Features</h5>
     
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    </div>
        `;
    dataConatiner.appendChild(div);
  });
};

loadData();
