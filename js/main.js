$(document).ready(function(){

	// Работа с навигацией
	const navIcon = document.querySelector(".nav-icon");
	const nav = document.querySelector(".nav-menu");
	const overlay = document.querySelector(".overlay-bg")
	const body = document.querySelector("body")

	// Закрытие оверлея и навигации по клику на сам оверлей и добавляем overflow: hidden для body
	overlay.addEventListener("click", function () {
		navIcon.classList.remove("nav-icon--active"); // Убираем активный класс у иконки моб.навигации
		nav.classList.remove("nav-menu--active"); // Убираем активный класс у блока моб. навигации
		overlay.classList.remove("overlay-bg--active"); // Убираем активный класс у оверлея
		body.classList.remove("scroll"); // Убираем класс у скролла
	})

	navIcon.addEventListener("click", function(){
		this.classList.toggle("nav-icon--active");
		nav.classList.toggle("nav-menu--active");
		overlay.classList.toggle("overlay-bg--active");
		body.classList.toggle("scroll")
	});

	// Находим ссылки внутри мобильной навигации
	const navLinks = document.querySelectorAll(".nav-menu a");

	// Обходим ссылки методом forEach
	navLinks.forEach(function (item){
		// Для каждой ссылки добавляем прослушку по событию "Клик"
		item.addEventListener("click", function (){
			navIcon.classList.remove("nav-icon--active"); // Убираем активный класс у иконки моб.навигации
			nav.classList.remove("nav-menu--active"); // Убираем активный класс у блока моб. навигации
			overlay.classList.remove("overlay-bg--active"); // Убираем активный класс у оверлея
			body.classList.remove("scroll"); // Убираем активный класс у скролла
		});
	});

    const formItems = document.querySelectorAll('.form__field');

    for(let item of formItems){
        const thisParent = item.closest('.form__item');
        const thisPlaceholder = thisParent.querySelector('.form__fake-placeholder');
        // Если input в фокусе
        item.addEventListener('focus', function(){
            thisPlaceholder.classList.add('form__fake-placeholder--active');
        });

        // Если input теряет фокус
        item.addEventListener('blur', function(){
            if(item.value.length > 0){
                thisPlaceholder.classList.add('form__fake-placeholder--active');
            }
            else{
                thisPlaceholder.classList.remove('form__fake-placeholder--active');
            }
        })
    }

    	//FORM VALIDATE
	$('.form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			subject: {
				required: true
			},
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите ваш Email',
				email: 'отсутсвует символ @'
			},
			subject: {
				required: 'Введите тему сообщения'
			},
			message: {
				required: 'Введите текст сообщения'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	})

	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".form").slideUp(1000);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепоку срабатывания остальных функций
		return false;
	}
})