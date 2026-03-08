async function loadIssues() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await response.json();
    displayIssues(data.data);
};

function activeLoader(status) {
    const loader = document.getElementById('loader');
    if(status) {
        loader.classList.remove('hidden');
    }else{
        loader.classList.add('hidden');
    }
}

function displayIssues(data) {
    activeLoader(true);


    data.forEach((el)=> {
        const issueCards = document.getElementById('issueCards');
        // issueCards.cr

        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `
            <div class="card bg-white border-t-4 h-full rounded-md border-${el.status == "open"? "green":"purple"}-400 shadow-sm">
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
                        <h6 class="text-[12px] text-[#64748B]">Update: ${new Date(el.updatedAt).toLocaleDateString()}</h6>
                    </div>
                </div>
            </div>
        `;

        issueCards.append(cardDiv);

        activeLoader(false);
    })

}

loadIssues();
