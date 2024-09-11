const loadPhone = async(searchText = 'iphone',isShowAll,) =>{
  
     const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
     const data = await res.json();
     const phones = data.data;
    //  console.log(phones)
    displayPhones(phones,isShowAll,);
}
 
const displayPhones = (phones, isShowAll,) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    const showAll = document.getElementById('show-all-container')
      if(phones.length > 12 && !isShowAll){
        showAll.classList.remove('hidden')
     }
     else{
        showAll.classList.add('hidden')
     }

    if(!isShowAll){
        phones = phones.slice(0,12);
    }
     
     
    phones.forEach(phone =>{
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-red-200 p-4 shadow-xl`
        phoneCard.innerHTML = `
               <figure>
                      <img
                        src="${phone.image}"
                        alt="Phones!" />
                </figure>
                <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                <button onclick = "handleShowDetails('${phone.slug}')" class=" mt-4 btn btn-primary">Show Details</button>
                </div>

        `
        phoneContainer.appendChild(phoneCard)

    })
    toggleLoadingSpinner(false);
}

const handleShowDetails = async(id) =>{
            // console.log(id) 
            
            const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
            const data = await res.json()
           const phone = data.data;
            ShowAllDetails(phone);


}
const ShowAllDetails = (phone) =>{
    console.log(phone)
    show_details_modal.showModal()
    const modalContainer = document.getElementById('show-details-container');
    modalContainer.innerHTML = `
    
                <figure>
                      <img class = 'mx-auto'
                        src="${phone.image}"
                        alt="Phones-Details!" />
                </figure>
       <h3 class="mt-4 text-3xl font-bold">${phone.name}</h3>
       <p class="py-4 text-lg font-bold">Press ESC key or click the button below to close</p>
       <div class= "mt-4 bg-yellow-200 rounded-lg p-4 shadow-xl">
          <p><span class ="mt-2 text-lg font-bold">Storage : </span>${phone.mainFeatures.storage}</P>
          <p><span class ="mt-2 text-lg font-bold">Display size : </span>${phone.mainFeatures.displaySize}</P>
          <p><span class ="mt-2 text-lg font-bold">Chipset : </span>${phone.mainFeatures.chipSet}</P>
          <p><span class ="mt-2 text-lg font-bold">Memory : </span>${phone.mainFeatures.memory}</P>
          <p><span class ="mt-2 text-lg font-bold">Slug : </span>${phone.mainFeatures.storage}</P>
          <p><span class ="mt-2 text-lg font-bold">Release date : </span>${phone.releaseDate}</P>
          <p><span class ="mt-2 text-lg font-bold">Brand : </span>${phone.brand}</P>
          <p><span class ="mt-2 text-lg font-bold">Gps : </span>${phone?.others?.GPS || 'No Gps Available'}</P>

       
       </div>
    
    
    `
    
}
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value; 
    // console.log(searchText)
    loadPhone(searchText,isShowAll)
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}



const handleShowAll = () =>{
    handleSearch(true);
}
loadPhone()