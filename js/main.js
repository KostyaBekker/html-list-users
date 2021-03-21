const users = [
  {
    username: 'Kostya1234',
    firstName: 'Kostya',
    lastName: 'Bekker',
    email: 'BK@ukr.net',
    type: 'Driver',
    password: 'value12345',
    reapeatPassword: 'value12345'
  },
  {
    username: 'Ivan1234',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'Ivanov@i.ua',
    type: 'Admin',
    password: 'value12345',
    reapeatPassword: 'value12345'
  },
];

function inilisationListUsers () {
  let listAllUsers = '';
  users.forEach(item => {
    listAllUsers +=
      `
        <tr>
          <td>${item.username}</td>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td>${item.email}</td>
          <td>${item.type}</td>
        </tr>
      `
    });
  document.getElementById('list-users').innerHTML = listAllUsers;
}

inilisationListUsers();

const exit = document.getElementById('exit-modal');
const openButton = document.getElementById('open-button');
const createUserBlock = document.getElementById('modal-create');

openButton.addEventListener("click", openModal, true);

function closeModal () {
  createUserBlock.classList.add("d-none");
}

const formDataUsers = [
  {key: 'username', required: true, lable: 'Username', type: 'text'},
  {key: 'firstName', required: true, lable: 'FirstName', type: 'text'},
  {key: 'lastName', required: true, lable: 'LastName', type: 'text'},
  {
    key: 'email',
    required: true,
    lable: 'Email',
    type: 'email',
    placeholder: '@',
    error: 'errorEmail',
    reg: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  },
  {key: 'type', required: true, lable: 'Type', type: 'select', defaultValue: 'Admin'},
  {
    key: 'password',
    required: true,
    lable: 'Password',
    type: 'password',
    error: 'errorPassword',
    reg: /([a-z]+[0-9]+|[a-z]+[0-9]+[a-z]+[0-9]+|[0-9]+[a-z]+|[0-9]+[a-z]+|[0-9]+[a-z]+)/,
  },
  {
    key: 'reapeatPassword', 
    error: 'errorPassword',
    required: true,
    lable: 'Reapeat password',
    type: 'password',
    reg: /([a-z]+[0-9]+|[a-z]+[0-9]+[a-z]+[0-9]+|[0-9]+[a-z]+|[0-9]+[a-z]+|[0-9]+[a-z]+)/,
  },
];

function openModal () {
  exit.addEventListener("click", closeModal, true);
  document.getElementById('close-button').addEventListener("click", addUser, true);
  createUserBlock.classList.remove("d-none");
  let renderUsersFialds = '';
  formDataUsers.forEach(item => {
     if (item.type === 'select') {
      renderUsersFialds +=
      `
        <div class="list-users__creat-user__input-item">
          <lable>${item.lable}</lable>
          <div class="list-users__creat-user__select">
            <select id=${item.key}>
              <option value="Admin">Admin</option>
              <option value="Driver">Driver</option>
            </select>
            <img src="img/arrow_drop_down.svg" alt="arrow_drop_down">
          </div>
        </div>
      `
    } else  {
      renderUsersFialds +=
      `
        <div class="list-users__creat-user__input-item">
          <lable>${item.lable}</lable>
          <input type=${item.type} id=${item.key} placeholder=${item.placeholder ? item.placeholder : ''}>
          <span class="d-none" id=${item.error ? item.error : ''}>Error massage</span>
        </div>
      `
    }
  });
  document.getElementById('render-user-fialds').innerHTML = renderUsersFialds;
}

function addNewUserToHtml (newUser) {
  let listUsers = document.getElementById('list-users').innerHTML;
  listUsers +=
      `
        <tr>
          <td>${newUser.username}</td>
          <td>${newUser.firstName}</td>
          <td>${newUser.lastName}</td>
          <td>${newUser.email}</td>
          <td>${newUser.type}</td>
        </tr>
      `
  document.getElementById('list-users').innerHTML = listUsers;
}

function addUser () {
  let isValid = true;
  const newUser = {};
  formDataUsers.forEach(item => {
    const elem = document.getElementById(item.key)
    const elemError = document.getElementById(item.error)
    const value = elem.value;
    if (value) {
      elem.classList.remove("error-border");
    } else {
      elem.classList.add("error-border");
      isValid = false;
    }
    if (item.type === 'email') {
      if (item.reg.test(String(value).toLowerCase())) {
        elem.classList.remove("error-border");
        elemError.classList.remove("error-messege");
      } else {
        elem.classList.add("error-border");
        elemError.classList.add("error-messege");
        isValid = false;
      }
    }
    if (item.type === 'password') {
      if (value.length >= 8 && item.reg.test(String(value).toLowerCase())) {
        elem.classList.remove("error-border");
        elemError.classList.remove("error-messege");
      } else {
        elem.classList.add("error-border");
        elemError.classList.add("error-messege");
        isValid = false;
      }
    }
    newUser[item.key] = value;
  });

  if (isValid) {
    document.getElementById('successMessageAnswer').classList.remove("d-none");
    setTimeout(function(){
      document.getElementById('successMessageAnswer').classList.add("d-none");
    },1000)
    users.push(newUser);

    formDataUsers.forEach((item, index) => {
      document.getElementById(item.key).value = item.defaultValue || '';
    });

    addNewUserToHtml(newUser);
    createUserBlock.classList.add("d-none");

  } else {
    document.getElementById('errorMessageAnswer').classList.remove("d-none");
    setTimeout(function(){
      document.getElementById('errorMessageAnswer').classList.add("d-none");
    },1000)
  }
}
