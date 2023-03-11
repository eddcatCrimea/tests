"use strict"

document.addEventListener('DOMContentLoaded', function () { // проверка, что документ загружен, после чего вызывается функция
const form = document.getElementById ('form');

form.addEventListener('submit', formSend);

async function formSend(e) {
e.preventDefault(); // запрещаем стандартную отправку формы
//валидация заполнения формы
let error = formValid(form);
let formData = new FormData(form);
formData.append('image', formImage.files[0]);

if (error === 0) {
  form.classList.add('_sending');
  let response = await fetch('sendmail.php', {
    method: 'POST',
    body: formData
   });

  if (response.ok){
    let result = await response.json();
    alert(result.message);
    formPreview.innerHTML = '';
    form.reset();
    form.classList.remove('_sending');
  }else{
    alert('Ошибка в этом секторе');
    form.classList.remove('_sending');
  }

} else {

    alert ('Вы пропустили обязательное поле. Заполните его!')
}
};

function formValid(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

for (let index = 0; index < formReq.length; index++ ) {
    const input = formReq[index];
    formRemoveError(input);

   if (input.classList.contains('_email')) {
        if (emailTest(input)) {
            formAddError(input);
            error++;
        }
    } else if (input.getAttribute("type") === "checkbox" && input.checked === false) { formAddError(input);
            error++;
    } else {
        if (input.value === '' ) {
            formAddError(input);
            error++;
        }
    }
}
    return error;
};

// добваить / убрать класс _error для валидации заполнения полей
function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
};
function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
};

// проверка правильности ввода email
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);}


// Прикрепления файла к отправляемым данным
// выбираем нужные поля и вешаем событие
const formImage = document.getElementById ('formImage');
const formPreview = document.getElementById ('formPreview');
formImage.addEventListener ('change', () => {
    uploadFile(formImage.files[0]);
});
// проверка на тип файла и размер
function uploadFile(file) {
if (!['image/jpeg', 'image/bmp', 'image/gif', 'image/png'].includes(file.type)) {
    alert ('Этот формат файла не разрешён!');
    formImage.value = '';
    return;
}
if (file.size > 2 * 1024 * 1024) {
    alert('Размер файла превашает 2Мб!');
    return;
}
// вывод превью на экран
let reader = new FileReader();
reader.onload = function (e) {
    formPreview.innerHTML = `<img src="${e.target.result}" alt="фото">`;
};
reader.onerror = function (e) {
    alert ('Ошибка!');
};
reader.readAsDataURL(file);
};
});


