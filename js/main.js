let activeUserId = '';
let users = [
  {
    username: 'Kostya1234',
    firstName: 'Kostya',
    lastName: 'Bekker',
    email: 'BK@ukr.net',
    type: 'Driver',
    password: 'value12345',
    reapeatPassword: 'value12345',
    id: '111'
  },
  {
    username: 'Ivan1234',
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'Ivanov@i.ua',
    type: 'Admin',
    password: 'value12345',
    reapeatPassword: 'value12345',
    id: '123'
  },
];

function renderListUsers () {
  let listAllUsers = '';
  users.forEach(item => {
    listAllUsers +=
      `
        <tr class="user" id=${item.id}>
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

renderListUsers();
document.getElementById('list-users').addEventListener("click", openModal, true);

const exit = document.getElementById('exit-modal');
const openButton = document.getElementById('open-button');
const createUserBlock = document.getElementById('modal-create');
const createButtonBlock = document.getElementById('list-users__creat-user__button');
const editButtonBlock = document.getElementById('list-users__edit-user__button');

openButton.addEventListener("click", openModal, true);

function closeModal () {
  createUserBlock.classList.add("d-none");
  document.getElementById('delete-user').removeEventListener("click", deleteUserFunc);
  document.getElementById('save-user').removeEventListener("click", saveUserFunc);
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
    error: 'errorReapeatPassword',
    required: true,
    lable: 'Reapeat password',
    type: 'password',
    reg: /([a-z]+[0-9]+|[a-z]+[0-9]+[a-z]+[0-9]+|[0-9]+[a-z]+|[0-9]+[a-z]+|[0-9]+[a-z]+)/,
  },
];



function openModal (event) {
  activeUserId = event.path[1].id;
  if (activeUserId) {
    createButtonBlock.classList.add("d-none");
    editButtonBlock.classList.remove("d-none");
  } else {
    editButtonBlock.classList.add("d-none");
    createButtonBlock.classList.remove("d-none");
  }
  document.getElementById('delete-user').addEventListener("click", deleteUserFunc);
  document.getElementById('save-user').addEventListener("click", saveUserFunc);

  exit.addEventListener("click", closeModal, true);
  document.getElementById('close-button').addEventListener("click", addUser, true);
  createUserBlock.classList.remove("d-none");
  let renderUsersFialds = '';
  let chekedUser = {};
  users.forEach(item => {
    if (item.id === activeUserId) {
      chekedUser = item;
    };
  });
  formDataUsers.forEach(item => {
     if (item.type === 'select') {
      renderUsersFialds +=
      `
        <div class="list-users__creat-user__input-item">
          <lable>${item.lable}</lable>
          <div class="list-users__creat-user__select">
            <select
              id=${item.key}
            >
              <option 
                ${chekedUser[item.key] ===  'Driver' ? `selected` : ""}
                value="Driver"
              >
                Driver
              </option>
              <option 
                ${chekedUser[item.key] ===  'Admin' ? `selected` : ""}
                value="Admin"
              >
                Admin
              </option>
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
          <input
            ${item.placeholder ? `placeholder=${item.placeholder}` : ""}
            ${chekedUser[item.key] ? `value=${chekedUser[item.key]}` : ""}
            type=${item.type}
            id=${item.key}
          >
          <span class="d-none" id=${item.error ? item.error : ''}>Error massage</span>
        </div>
      `
    }
  });
  document.getElementById('render-user-fialds').innerHTML = renderUsersFialds;
}

function deleteUserFunc () {
  let updateUsers = [];
  users.forEach(item => {
    if (activeUserId !== item.id) {
      updateUsers.push(item);
    }
  })
  users = updateUsers;
  renderListUsers();
  closeModal();
}

function addNewUserToHtml (newUser) {
  let listUsers = document.getElementById('list-users').innerHTML;
  listUsers +=
      `
        <tr class="user" id=${newUser.id}>
          <td>${newUser.username}</td>
          <td>${newUser.firstName}</td>
          <td>${newUser.lastName}</td>
          <td>${newUser.email}</td>
          <td>${newUser.type}</td>
        </tr>
      `
  document.getElementById('list-users').innerHTML = listUsers;
}
function getAllFields (callBack) {
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
    if (item.key === 'reapeatPassword') {
      if (value === newUser.password) {
        elem.classList.remove("error-border");
      } else {
        elem.classList.add("error-border");
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

    formDataUsers.forEach((item, index) => {
      document.getElementById(item.key).value = item.defaultValue || '';
    });
    createUserBlock.classList.add("d-none");
    callBack(newUser)
  } else {
    document.getElementById('errorMessageAnswer').classList.remove("d-none");
    setTimeout(function(){
      document.getElementById('errorMessageAnswer').classList.add("d-none");
    },1000)
  }
}

function addUser () {
  getAllFields(newUser => {
    newUser.id = String(Math.random() * (1000 - 2));
    users.push(newUser);
    addNewUserToHtml(newUser);
  })
}

function saveUserFunc () {
  getAllFields(newUser => {
    console.log(newUser);
    
    let updateUsers = [];
    users.forEach(item => {
      console.log(activeUserId, item.id)
      if (activeUserId === item.id) {
        newUser.id = activeUserId;
        updateUsers.push(newUser);
      } else {
        updateUsers.push(item);
      }
    })
    users = updateUsers;
    renderListUsers();
  })
}


