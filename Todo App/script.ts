class task {
  name: string;
  desc: string;
  date: Date;
  time: string;
  partner: string;
  priority: number;
  id: number;
  constructor(name, desc, date, time, partner = 'Me', priority, id) {
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.time = time;
    this.partner = partner;
    this.priority = priority;
    this.id = id;
  }
}

let tasks = [];
let partners: string[] = [];

let i = 0;
let pi = 1;
function add(t) {
  let tList = document.getElementsByClassName('task-list')[0];
  let newl = document.createElement('li');
  let prior = '';
  if (t.priority == 1) prior = 'High';
  if (t.priority == 0) prior = 'Medium';
  if (t.priority == -1) prior = 'Low';
  newl.classList.add('task');
  newl.innerHTML = `
    ${t.name}
    <button class="complete" type="button" id="comp-${t.id}">Complete task</button>
    <span id="edit-${t.id}" class="fas fa-edit fa-lg"></span>
    <div class="task-description">
      <ul>
        <li> ${t.name}</li>
        <li>${t.desc}</li>
        <li>${t.date}</li>
        <li>${t.time}</li>
        <li>${t.partner}</li>
        <li>${t.prior}</li>
      </ul>
    </div>
  `;

  tList.appendChild(newl);
  if (partners.includes(t.partner)) return;
  let par = document.getElementById('partner');
  partners.push(t.partner);
  let newa = document.createElement('a');
  newa.id = 'partner-' + pi;
  newa.innerText = t.partner;
  par.appendChild(newa);
  let newPart = document.getElementById('partner-' + pi);
  newPart.addEventListener('click', (e) => {
    let newTasks = tasks.filter((t2) => t2.partner === t.partner);
    tList.innerHTML = '';
    newTasks.forEach((t2) => add(t2));
  });
  pi++;
}

let sub = document.getElementById('submit');
sub.addEventListener('click', (e) => {
  e.preventDefault();
  let name = <HTMLInputElement>document.getElementById('myName').value;
  let desc = <HTMLInputElement>document.getElementById('myText').value;
  let date = <HTMLInputElement>document.getElementById('myDate').value;
  let time = <HTMLInputElement>document.getElementById('myTime').value;
  let partner = <HTMLInputElement>document.getElementById('myPartner').value;
  let priority = <HTMLInputElement>document.getElementById('myPriority').value;
  let id = i;
  let obj = new task(name, desc, date, time, partner, priority, id);
  add(obj);
  tasks.push(obj);
  let completeButton = document.getElementById('comp-' + id);
  completeButton.addEventListener('click', (e2) => {
    tasks = tasks.filter(function (t) {
      return t.name !== name;
    });
    completeButton.parentElement.remove();
  });
  let editButton = document.getElementById('edit-' + id);
  editButton.addEventListener('click', (e2) => {
    document.getElementById('myName').value = name;
    document.getElementById('myText').value = desc;
    document.getElementById('myDate').value = date;
    document.getElementById('myTime').value = time;
    document.getElementById('myPartner').value = partner;
    document.getElementById('myPriority').value = priority;
    tasks = tasks.filter(function (t) {
      return t.name !== name;
    });
    editButton.parentElement.remove();
  });

  // window.setTimeout(function () {
  //   alert('Time for task-' + id + '!');
  // },  );
  // console.log(time);
});

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', (e2) => {
  // <HTMLInputElement>document.getElementById('myName').value = '';
  // <HTMLInputElement>document.getElementById('myText').value = '';
  // <HTMLInputElement>document.getElementById('myDate').value = '';
  // <HTMLInputElement>document.getElementById('myTime').value = '';
  // <HTMLInputElement>document.getElementById('myPartner').value = '';
  // <HTMLInputElement>document.getElementById('myPriority').value = '';
  <HTMLFormElement>document.getElementById('form').reset();
});

let prioritySort = document.getElementById('sort-priority');
prioritySort.addEventListener('click', (e) => {
  tasks.sort((a, b) => a.priority - b.priority);
  let tList = document.getElementsByClassName('task-list')[0];
  tList.innerHTML = '';
  tasks.forEach((t) => {
    add(t);
  });
});
let alphaSort = document.getElementById('sort-alpha');
alphaSort.addEventListener('click', (e) => {
  tasks.sort((a, b) => a.name.localeCompare(b.name));
  let tList = document.getElementsByClassName('task-list')[0];
  tList.innerHTML = '';
  tasks.forEach((t) => {
    add(t);
  });
});

let search = document.getElementById('search');
search.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  let tList = document.getElementsByClassName('task-list')[0];
  tList.innerHTML = '';
  const filtered = tasks.filter((t) => {
    return t.name.toLowerCase().includes(searchString) || t.desc.toLowerCase().includes(searchString);
  });
  filtered.forEach((t) => add(t));
});

let defPart = document.getElementById('partner-' + 0);
defPart.addEventListener('click', (e) => {
  let newTasks = tasks.filter((t2) => t2.partner);
  let tList = document.getElementsByClassName('task-list')[0];
  tList.innerHTML = '';
  newTasks.forEach((t2) => add(t2));
});
