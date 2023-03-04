const openAi = (datalimit) =>{
    loder(true)
    fetch ('https://openapi.programming-hero.com/api/ai/tools')
    .then(res=>res.json())
    .then(dates=>displayView(dates.data.tools,datalimit))
  }
  
 
  const displayView=(data,datalimit) =>{
    console.log(data)
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerText = '';
    //  data = data.slice(0,5);
    
  
  // see more button 
  const showAll = document.getElementById('btn-search')
  if( datalimit && data.length>6)
  {
    data = data.slice(0,6);
    showAll.classList.remove('d-none')
    // document.getElementById('btn-search').addEventListener('click' ,function(){
    //   openAi();
    // })
  }
  else{
    showAll.classList.add('d-none')
  }

   //Card section

  //  foreach loop
  
    data.forEach(openai => {
      console.log(openai);
      const createDiv = document.createElement('div')
  
      createDiv.classList.add('col', 'para',)
  
      createDiv.innerHTML = `
      <div class="card w-auto h-200 $enable-dark-mode	rounded">
      <img  src="${openai.image}" class="card-img-top p-3 rounded" alt="...">
      <div class="card-body ">
        <h6 class="card-title">Features</h6>
        <ol>
         <li class="card-title"> ${openai.features[0]?openai.features[0] : "No Found Data"}</li>
         <li class="card-title"> ${openai.features[1]?openai.features[1] : "No Found Data"}</li>
         <li class="card-title"> ${openai.features[2]?openai.features[2] : "No Found Data"}</li>
        </ol>
        <hr>
        <h5 class="card-text  para">${openai.name}</h5>
        <p class="card-text  para"><i class="fa-solid fa-calendar-days"></i> ${openai.published_in}</p>
  
       <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#detailsModal">
       <i class="fas fa-arrow-right text-right "onclick = "ShowDetails('${openai.id}')" ></i></button>
       
      </div>
    </div> 
      `
  
    cardContainer.appendChild(createDiv)
    });
    // stop spinner
    loder (false)
  }
  
  const ShowDetails = async id =>
  {
    const Url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    //console.log(Url)
   const response = await fetch(Url)
   const  Data = await response.json()
   displayModal(Data.data)
  
  }
  
  const displayModal = openai=>
  {
    // modaldetails section 

    document.getElementById('detailsModalLabel').innerText = openai.tool_name
    const openAiDetails = document.getElementById('openaiDetails')
  
    openAiDetails.innerHTML=`
    <div class="card w-100 h-auto $enable-dark-mode bg-danger	text-white">
    <div class="card-body ">
      <h6 class="card-title">${openai.description}</h6>
      <div >
        <div class = "row" >
        <ol class="d-flex ">
        <p class="card-title border bg-white text-black m-2">${openai.pricing[0].price?openai.pricing[0].price : "Contact us for pricing"} ${openai.pricing[0].plan?openai.pricing[0].plan : 'Enterprise'}
        </p>
        <p class="card-title border bg-white text-black m-2"> ${openai.pricing[1].price?openai.pricing[1].price : "Contact us for pricing"} ${openai.pricing[1].plan?openai.pricing[1].plan : 'Enterprise'} </p>
        <p class="card-title border bg-white text-black m-2"> ${openai.pricing[2]?openai.pricing[2].price : "Contact us for a pricing"} ${openai.pricing[2]?openai.pricing[2].plan : 'Enterprises'}</p>
       </ol>
        </div>
      </div>
  
  
      <div class="d-flex text-center">
      <div>
      <h6 class="">Features</h6>
      <li class="card-title"> ${openai.features["1"].feature_name?openai.features["1"].feature_name :'No Data Found'}</li>
      <li class="card-title">  ${openai.features['2'].feature_name?openai.features['2'].feature_name :'No Data Found'}</li>
      <li class="card-title">  ${openai.features['3'].feature_name?openai.features['3'].feature_name :'No Data Found'}</li>
      </div>
       
  
  
      <div class="ms-2">
      <h6>Intregations</h6>
      <li class="card-title ms-2"> ${openai.integrations[0]?openai.integrations[0] :'No Data Found'}</li>   
      <li class="card-title ms-2"> ${openai.integrations[1]?openai.integrations[1] :'No Data Found'}</li>   
      <li class="card-title ms-2"> ${openai.integrations[2]?openai.integrations[2] :'No Data Found'}</li>   
      </div>
      </div>
     
    </div>
  </div> 
    `
    // modal image section
    const openAiImage = document.getElementById("openaiImage")
    openAiImage.classList.add('modal-image')
    openAiImage.innerHTML = `
    <img  src="${openai.image_link[0]}" class="card-img-top p-2 rounded" alt="...">
    <h4> ${openai.input_output_examples[0].input?openai.input_output_examples[0].input : 'No Data Found'}${openai.input_output_examples[0].input?openai.input_output_examples[0].input : 'No Data Found'} </h4>
    <p> ${openai.input_output_examples[0].output?openai.input_output_examples[0].output : 'No! No! Yet! Resting '}</p>
    `
  } 
  // modal section end
  
  
  // see more button section
  
  document.getElementById('btn-search').addEventListener('click',function(){
    loder(true)
    openAi();
  })
  
  // spinner section
  const loder = islodding =>{
    const spinner = document.getElementById('spinner');
    if(islodding)
    {
      spinner.classList.remove('d-none');
    }
    else{
      spinner.classList.add('d-none');
    }
  }
  
  
  openAi(6);