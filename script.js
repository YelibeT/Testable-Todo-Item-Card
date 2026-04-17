let todoData = {
    title: "Build *999#",
    description: "A USSD-based system for managing tasks using mobile phone without internet.",
    priority: "High",
    status: "Pending",
    dueDate: "2026-04-16T18:00:00Z"
};

const card = document.getElementById('todo-card');
const viewMode = document.getElementById('view-mode');
const editForm = document.getElementById('edit-form');
const statusControl = document.getElementById('status-control');
const completeToggle = document.getElementById('complete-toggle');
const expandBtn = document.getElementById('expand-btn');
const collapsibleDesc = document.getElementById('collapsible-desc');

function init() {
    renderCard();
    setInterval(updateTime, 30000);
}

function renderCard() {
    document.getElementById('todo-title').textContent = todoData.title;
    document.querySelector('[data-testid="test-todo-description"]').textContent = todoData.description;
    document.getElementById('status-display').textContent = todoData.status;
    document.querySelector('.priority-badge').textContent = todoData.priority;
    
    card.className = `todo-card ${todoData.priority.toLowerCase()}-priority`;
    if (todoData.status === "Done") card.classList.add('status-done');
    else card.classList.remove('status-done');
    
    statusControl.value = todoData.status;
    completeToggle.checked = (todoData.status === "Done");
    updateTime();
}

statusControl.addEventListener('change', (e) => {
    todoData.status = e.target.value;
    renderCard();
});

completeToggle.addEventListener('change', (e) => {
    todoData.status = e.target.checked ? "Done" : "Pending";
    renderCard();
});

expandBtn.addEventListener('click', () => {
    const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
    expandBtn.setAttribute('aria-expanded', !isExpanded);
    collapsibleDesc.classList.toggle('collapsed');
    expandBtn.textContent = isExpanded ? "Show Description" : "Hide Description";
});

document.getElementById('edit-btn').addEventListener('click', () => {
    viewMode.classList.add('hidden');
    editForm.classList.remove('hidden');
    document.getElementById('edit-title').value = todoData.title;
    document.getElementById('edit-desc').value = todoData.description;
    document.getElementById('edit-priority').value = todoData.priority;
    const d = new Date(todoData.dueDate);
    document.getElementById('edit-due-date').value = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    editForm.classList.add('hidden');
    viewMode.classList.remove('hidden');
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    todoData.title = document.getElementById('edit-title').value;
    todoData.description = document.getElementById('edit-desc').value;
    todoData.priority = document.getElementById('edit-priority').value;
    todoData.dueDate = new Date(document.getElementById('edit-due-date').value).toISOString();
    renderCard();
    editForm.classList.add('hidden');
    viewMode.classList.remove('hidden');
});

function updateTime() {
    if (todoData.status === "Done") {
        document.getElementById('time-remaining').textContent = "Completed";
        document.getElementById('overdue-badge').classList.add('hidden');
        return;
    }
    const diff = new Date(todoData.dueDate) - new Date();
    const isOverdue = diff < 0;
    const absDiff = Math.abs(diff);
    const mins = Math.floor(absDiff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    let str = days > 0 ? `${days} days` : hours > 0 ? `${hours} hours` : `${mins} minutes`;
    document.getElementById('time-remaining').textContent = isOverdue ? `Overdue by ${str}` : `Due in ${str}`;
    
    if (isOverdue) {
        document.getElementById('overdue-badge').classList.remove('hidden');
        card.classList.add('overdue-active');
    } else {
        document.getElementById('overdue-badge').classList.add('hidden');
        card.classList.remove('overdue-active');
    }
}

init();