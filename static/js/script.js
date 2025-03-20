document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("templateSelector").addEventListener("change", fillTemplate);
});

function fillTemplate() {
    let selectedTemplate = document.getElementById("templateSelector").value;
    let templates = JSON.parse(document.getElementById("templateData").textContent);
    let template = templates.find(t => t.id == selectedTemplate);
    
    if (!template) return;

    // Aggiorna l'anteprima dell'oggetto e del corpo email
    document.getElementById("finalSubject").textContent = template.subject;
    document.getElementById("finalBody").textContent = template.body;

    // Resetta i placeholder
    let inputsDiv = document.getElementById("placeholders");
    inputsDiv.innerHTML = "<h4 class='mt-3'>Inserisci i dati:</h4>";

    let placeholders = template.placeholders ? template.placeholders.split(",").map(p => p.trim()) : [];

    placeholders.forEach(placeholder => {
        if (!placeholder) return;

        let inputGroup = document.createElement("div");
        inputGroup.classList.add("mb-2");

        let label = document.createElement("label");
        label.textContent = `[${placeholder}]:`;
        label.classList.add("form-label", "fw-bold");

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholder;
        input.id = `placeholder_${placeholder}`; // Evitiamo ID duplicati
        input.classList.add("form-control");

        // **Aggiungiamo correttamente l'event listener**
        input.addEventListener("input", updateEmail);

        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        inputsDiv.appendChild(inputGroup);
    });

    updateEmail(); // Forza l'aggiornamento iniziale
}

function updateEmail() {
    let selectedTemplate = document.getElementById("templateSelector").value;
    let templates = JSON.parse(document.getElementById("templateData").textContent);
    let template = templates.find(t => t.id == selectedTemplate);
    if (!template) return;

    let body = template.body;
    let subject = template.subject;

    document.querySelectorAll("#placeholders input").forEach(input => {
        let placeholder = input.placeholder.trim();
        let value = input.value.trim();

        // **Rimuoviamo le parentesi quadre per la regex**
        let cleanPlaceholder = placeholder.replace(/\[|\]/g, "");

        // **Creiamo la regex per la sostituzione**
        let regex = new RegExp(`\\[${cleanPlaceholder}\\]`, "g");

        // **Sostituisci solo se l'input NON è vuoto, altrimenti lascia il placeholder**
        if (value !== "") {
            body = body.replace(regex, value);
            subject = subject.replace(regex, value);
        }
    });

    document.getElementById("finalSubject").textContent = subject;
    document.getElementById("finalBody").textContent = body;
}

function copyToClipboard(id) {
    let text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copiato negli appunti!");
    }).catch(err => {
        console.error("Errore nella copia:", err);
    });
}

function openEditModal() {
    let selectedTemplateId = document.getElementById("templateSelector").value;
    if (!selectedTemplateId) return;
    
    let templates = JSON.parse(document.getElementById("templateData").textContent);
    let template = templates.find(t => t.id == selectedTemplateId);
    if (!template) return;

    document.getElementById("editTemplateId").value = template.id;
    document.getElementById("editName").value = template.name;
    document.getElementById("editSubject").value = template.subject;
    document.getElementById("editBody").value = template.body;
    document.getElementById("editPlaceholders").value = template.placeholders;
    
    // Imposta l'azione corretta per modifica ed eliminazione
    document.getElementById("editTemplateForm").action = `/edit/${template.id}`;
    document.getElementById("deleteTemplateForm").action = `/delete/${template.id}`;

    var editModal = new bootstrap.Modal(document.getElementById("editTemplateModal"));
    editModal.show();
}
document.getElementById("templateSelector").addEventListener("change", function() {
    let selectedTemplateId = document.getElementById("templateSelector").value;
    document.getElementById("templateActions").style.display = selectedTemplateId ? "block" : "none";
    
    // Aggiorna l'azione del form di eliminazione
    if (selectedTemplateId) {
        document.getElementById("deleteTemplateForm").action = `/delete/${selectedTemplateId}`;
    }
});