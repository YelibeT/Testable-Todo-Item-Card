let todoData = {
    title: "Build *999#",
    description: "A USSD-based system for managing tasks using mobile phone without internet.",
    priority: "High",
    status: "Pending",
    dueDate: "2027-04-16T18:00:00Z"
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
    
    const priorityBadge = document.querySelector('[data-testid="test-todo-priority"]');
    priorityBadge.textContent = todoData.priority;

    const indicator = document.querySelector('[data-testid="test-todo-priority-indicator"]');
    const priorityClass = `priority-${todoData.priority.toLowerCase()}`;
    
    indicator.className = 'priority-indicator'; 
    indicator.classList.add(priorityClass);

    card.className = 'todo-card';
    card.classList.add(priorityClass);
    if (todoData.status === "Done") card.classList.add('status-done');

    const dateObj = new Date(todoData.dueDate);
    const dueDateDisplay = document.getElementById('due-date-display');
    dueDateDisplay.textContent = `Due ${dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    dueDateDisplay.setAttribute('datetime', todoData.dueDate);

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
    document.querySelector('[data-testid="test-todo-edit-priority-select"]').value = todoData.priority;
    
    const d = new Date(todoData.dueDate);
    document.getElementById('edit-due-date').value = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    editForm.classList.add('hidden');
    viewMode.classList.remove('hidden');
    document.getElementById('edit-btn').focus();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    todoData.title = document.getElementById('edit-title').value;
    todoData.description = document.getElementById('edit-desc').value;
    todoData.priority = document.querySelector('[data-testid="test-todo-edit-priority-select"]').value;
    
    const newDate = document.getElementById('edit-due-date').value;
    if (newDate) {
        todoData.dueDate = new Date(newDate).toISOString();
    }
    
    renderCard();
    editForm.classList.add('hidden');
    viewMode.classList.remove('hidden');
    document.getElementById('edit-btn').focus();
});

function updateTime() {
    if (todoData.status === "Done") {
        document.getElementById('time-remaining').textContent = "Completed";
        document.getElementById('overdue-badge').classList.add('hidden');
        card.classList.remove('overdue-active');
        return;
    }

    const diff = new Date(todoData.dueDate) - new Date();
    const isOverdue = diff < 0;
    const absDiff = Math.abs(diff);

    const mins = Math.floor(absDiff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    let str = "";
    if (days > 0) str = `${days} days`;
    else if (hours > 0) str = `${hours} hours`;
    else str = `${mins} minutes`;

    document.getElementById('time-remaining').textContent = isOverdue ? `Overdue by ${str}` : `Due in ${str}`;
    
    const overdueBadge = document.getElementById('overdue-badge');
    if (isOverdue) {
        overdueBadge.classList.remove('hidden');
        card.classList.add('overdue-active');
    } else {
        overdueBadge.classList.add('hidden');
        card.classList.remove('overdue-active');
    }
}

init();