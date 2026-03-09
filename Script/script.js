async function loadAllIssues() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();
    displayIssues(data.data);
};

async function loadOpenIssues() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();

    const openIssues = data.data.filter(el=> el.status.toLowerCase().includes('open'));
    displayIssues(openIssues);

};

async function loadCloseIssues() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();

    const openIssues = data.data.filter(el=> el.status.toLowerCase().includes('closed'));
    displayIssues(openIssues);

};

function activeLoader(status) {
    const loader = document.getElementById('loader');
    if(status) {
        loader.classList.remove('hidden');
    }else{
        loader.classList.add('hidden');
    }
}

function activeTabs(id) {
    const allTabBtns = document.querySelectorAll('.tabBtn');
    
    allTabBtns.forEach(e=>{
        e.classList.add('btn-outline');
    })

    allTabBtns[id].classList.remove('btn-outline');
    if(allTabBtns[id].innerText.toLowerCase() === 'open'){
        loadOpenIssues();
    }else if(allTabBtns[id].innerText.toLowerCase() === 'closed'){
        loadCloseIssues();
    }else{
        loadAllIssues();
    }
}

async function loadModal(id){
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await response.json();

    const modalPop = document.getElementById('modalPop');

    modalPop.innerHTML = `
        <dialog id="my_modal" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box space-y-4">
                <div class="heading">
                    <h2 class="text-[24px] font-bold">${data.data.title}</h2>
                    <div>
                        <span class="priority px-5 py-1 text-[12px] ${data.data.status === "open"? "bg-green-100 text-green-500": "bg-purple-200 text-purple-500"} rounded-full">${data.data.status}</span><span class="py-1 text-[12px] text-[#64748B]"> • Opened by ${data.data.author} • ${new Date(data.data.createdAt).toLocaleDateString()}</span>

                    </div>
                </div>

                <div class="labels flex items-center gap-2">
                    <p class="bug  px-2  uppercase text-[12px] ${data.data.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600' : data.data.labels[0] === 'documentation' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-full">${data.data.labels[0]}</p>
                    <p class="help px-2 uppercase text-[12px] ${data.data.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600' : data.data.labels[1] === 'documentation' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-full">${data.data.labels[1]}</p>
                </div>

                <div class="des">
                    <p class="cardDsc text-[16px] text-[#64748B] mt-[-7px]">${data.data.description}</p>
                </div>

                <div class="author bg-gray-100 p-5 rounded-lg grid grid-cols-2">
                    <div class="name">
                        <p class="text-gray-500 mb-1">Assignee:</p>
                        <h6>${data.data.assignee === ""?"Unknown": data.data.assignee}</h6>
                    </div>
                    <div class="priority text-left">
                        <p class="text-gray-500 mb-1">Priority:</p>
                        <span class="priority px-5 py-1 uppercase text-[12px] ${data.data.priority ==='high'? "bg-red-100 text-red-500": data.data.priority ==='medium'? "bg-orange-100 text-orange-500": "bg-gray-200 text-gray-500"} rounded-full">${data.data.priority}</span>
                    </div>
                </div>

                <form method="dialog" class="flex justify-end">
                    <button class="btn btn-primary">Close</button>
                </form>
                </div>
            </div>
        </dialog>
    `;


    const modalBtn = document.getElementById('my_modal');
    modalBtn.showModal();

}

function displayIssues(data) {
    const issueCards = document.getElementById('issueCards');
    issueCards.innerHTML = "";
    activeLoader(true);



    data.forEach((el)=> {

        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `
            <div onclick="loadModal(${el.id})" class="card bg-white border-t-4 h-full rounded-md border-${el.status == "open"? "green":"purple"}-400 shadow-sm">
                <div class="cardInfo p-4 space-y-3">
                    <div class="statusBar flex justify-between items-center">
                        <div class="cardStatus w-full">
                            <img src="./assets/${el.status == "open"? "Open-Status":"Closed"}.png" alt="open">
                        </div>
                        <div>
                            <h5 class="priority px-5 py-1 uppercase text-[12px] ${el.priority === 'high' ? 'bg-red-100 text-red-600' : el.priority === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'} rounded-full">${el.priority}</h5>
                        </div>
                    </div>

                    <h3 class="cardTitle text-[14px] font-semibold capitalize line-clamp-1">${el.title}</h3>
                    <p class="cardDsc text-[12px] text-[#64748B] mt-[-7px] line-clamp-2">${el.description}</p>

                    <div class="labels flex items-center gap-2">
                        <span class="bug  px-2  uppercase text-[10px] ${el.labels[0] === 'enhancement' ? 'bg-green-100 text-green-600' : el.labels[0] === 'documentation' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-full">${el.labels[0]}</span>
                        <span class="help px-2 uppercase text-[10px] ${el.labels[1] === 'enhancement' ? 'bg-green-100 text-green-600' : el.labels[1] === 'documentation' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'} rounded-full">${el.labels.length==1?"":el.labels[1]}</span>
                    </div>
                </div>

                <div class="author p-4 border-t-1 border-gray-300 flex justify-between">
                    <div class="space-y-1">
                        <h5 class="autorName text-[12px] text-[#64748B]">by <span>${el.author}</span></h5>
                        <h5 class="autorName text-[12px] text-[#64748B]">by <span>${el.assignee === "" ? "Unknown" : el.assignee}</span></h5>
                    </div>
                    <div class="space-y-1 text-right">
                        <h6 class="text-[12px] text-[#64748B]">${new Date(el.createdAt).toLocaleDateString()}</h6>
                        <h6 class="text-[12px] text-[#64748B]">Updated: ${new Date(el.updatedAt).toLocaleDateString()}</h6>
                    </div>
                </div>
            </div>
        `;

        issueCards.append(cardDiv);

    })
    activeLoader(false);
    
    const issueCount = document.getElementById('issueCount');
    issueCount.innerText = issueCards.children.length;

}

loadAllIssues();

// search implementation
document.getElementById('searchField').addEventListener('input', event => {
    const searchInput = event.target.value.toLowerCase();
    
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=> res.json())
    .then(data=> {
        const allIssues = data.data;
        const filterSearch = allIssues.filter(issue =>{
            return issue.title.toLowerCase().includes(searchInput);

        })
        displayIssues(filterSearch);

        // neutralize all tabs 
        const allTabBtns = document.querySelectorAll('.tabBtn');
        allTabBtns.forEach(e=>{
        e.classList.add('btn-outline');
    })
    })
})


