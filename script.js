//console.log("Job Application Tracker is working")
let editingRow = null;
let editingIndex = null;
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

let companyInput = document.getElementById("company");

console.log(companyInput.value)
let addJobButton = document.getElementById("addJobBtn");
let jobForm = addJobButton.closest("form");

addJobButton.addEventListener("click", function () {
    let company = document.getElementById("company").value;
    let role = document.getElementById("role").value;
    let location = document.getElementById("location").value;
    let status = document.getElementById("status").value;

    if (company.trim() === "") {
        alert("Please enter company name..");
        return;
    }
    if (role.trim() === "") {
        alert("Please enter job role..");
        return;
    }
    if (location.trim() === "") {
        alert("Please enter job location");
        return;
    }

    let job = {
        company: company,
        role: role,
        location: location,
        status: status,
    };

    let jobTableBody = document.getElementById("jobTableBody");

    if (editingRow !== null) {
        let cells = editingRow.children;
        cells[0].textContent = company;
        cells[1].textContent = role;
        cells[2].textContent = location;
        cells[3].textContent = status;

        jobs[editingIndex] = job;

        localStorage.setItem("jobs", JSON.stringify(jobs));


        editingRow = null;
        editingIndex = null;
        jobForm.reset();
        return;
    }

    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    let newIndex = jobs.length - 1;

    let newRow = document.createElement("tr");

    let companycell = document.createElement("td");
    companycell.textContent = company;

    newRow.appendChild(companycell);

    let rolecell = document.createElement("td");
    rolecell.textContent = role;
    newRow.appendChild(rolecell);

    let locationcell = document.createElement("td");
    locationcell.textContent = location;
    newRow.appendChild(locationcell);


    let statuscell = document.createElement("td");
    statuscell.textContent = status;
    newRow.appendChild(statuscell);

    let actionCell = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        let row = deleteButton.parentElement.parentElement;
        jobs.splice(newIndex, 1);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        row.remove();
    });

    let editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener('click', function () {
        let row = editButton.parentElement.parentElement;

        editingRow = row;
        editingIndex = newIndex;

        let cells = row.children;
        let companyValue = cells[0].textContent;
        let roleValue = cells[1].textContent;
        let locationValue = cells[2].textContent;
        let statusValue = cells[3].textContent;

        document.getElementById("company").value = companyValue;
        document.getElementById("role").value = roleValue;
        document.getElementById("location").value = locationValue;
        document.getElementById("status").value = statusValue;
    });

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    newRow.appendChild(actionCell);

    jobTableBody.appendChild(newRow);
    jobForm.reset();
});

let searchInput = document.getElementById("searchInput");
let statusFilter = document.getElementById("statusFilter");
function filterJobs() {

    let searchText = searchInput.value.toLowerCase();
    let selectedStatus = statusFilter.value;

    let filteredJobs = jobs.filter(function(job) {

        let matchesSearch =
            job.company.toLowerCase().includes(searchText) ||
            job.role.toLowerCase().includes(searchText) ||
            job.location.toLowerCase().includes(searchText);

        let matchesStatus =
            selectedStatus === "All" ||
            job.status === selectedStatus;

        return matchesSearch && matchesStatus;

    });

    displayJobs(filteredJobs);
}

// statusFilter.addEventListener("change", function () {

//     let selectedStatus = statusFilter.value;

//     let filteredJobs = jobs.filter(function(job) {

//         return selectedStatus === "All" || job.status === selectedStatus;

//     });

//     displayJobs(filteredJobs);

// });
statusFilter.addEventListener("change", filterJobs);

// searchInput.addEventListener("input", function () {
//     let searchText = searchInput.value.toLowerCase();
//     let filteredJobs = jobs.filter(function (job) {

//         return job.company.toLowerCase().includes(searchText) ||
//             job.role.toLowerCase().includes(searchText) ||
//             job.location.toLowerCase().includes(searchText);

//     });


//     displayJobs(filteredJobs);

// });
searchInput.addEventListener("input", filterJobs);



function displayJobs(jobList) {

    let jobTableBody = document.getElementById("jobTableBody");

    jobTableBody.innerHTML = "";

    jobList.forEach(function (job, index) {
        let newRow = document.createElement("tr");

        let companycell = document.createElement("td");
        companycell.textContent = job.company;
        newRow.appendChild(companycell);

        let rolecell = document.createElement("td");
        rolecell.textContent = job.role;
        newRow.appendChild(rolecell);

        let locationcell = document.createElement("td");
        locationcell.textContent = job.location;
        newRow.appendChild(locationcell);

        let statuscell = document.createElement("td");
        statuscell.textContent = job.status;
        newRow.appendChild(statuscell);

        let actionCell = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            document.getElementById("company").value = job.company;
            document.getElementById("role").value = job.role;
            document.getElementById("location").value = job.location;
            document.getElementById("status").value = job.status;

            editingRow = newRow;
            editingIndex = index;
        });

        actionCell.appendChild(editButton);
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {

            let row = deleteButton.parentElement.parentElement;

            jobs.splice(index, 1);

            localStorage.setItem("jobs", JSON.stringify(jobs));

            row.remove();

        });
        actionCell.appendChild(deleteButton);

        newRow.appendChild(actionCell);

        jobTableBody.appendChild(newRow);

        console.log(job);
    });
}
displayJobs(jobs);

