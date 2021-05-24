
let getYy = new Date().getFullYear();
let getMm = new Date().getMonth();

let calendar = document.querySelector(".calendar");
let monthCaption = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октрябрь", "Ноябрь", "Декабрь"]
let month; //месяц года
let dayInMonth;	//кол-во дней в месяце


function createCalendar() {

	// создаем цикл, который проверяет кол-во дней в месяце
	for(let day = 31; day >= 28; day--) {
	    month = new Date(getYy, getMm, day);	// добалвяем дату
	    if (getMm == month.getMonth()) {   		// проверяем кол-во дней в месяце
	        dayInMonth = day;             		// результат заносим в переменную
	        break;
	    }
	}

	let firstDay = new Date(getYy, getMm, 1);
	firstDay = firstDay.getDay(); 	// первый день недели

	let days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];	//дни недели
    let table = document.createElement("table"); 	//создаем тег <table>
    document.querySelector("div").prepend(table); 	//добавляем тег table в <div>
    let caption = table.createCaption();			//в переменную добавляем зоголовок таблицы
    caption.textContent = " "+monthCaption[getMm] + ` ${getYy}` + " года ";

    // создаем кнопки управления календарем

    let btnPrevMonth = document.createElement("button");
    btnPrevMonth.textContent = "<";	//кнопка пред. месяц
    let btnNextMonth = document.createElement("button");
    btnNextMonth.textContent = ">";	//кнопка след. месяц
    let btnPrevYy = document.createElement("button");
    btnPrevYy.textContent = "<<";	//кнопка пред. года
    let btnNextYy = document.createElement("button");
    btnNextYy.textContent = ">>";	//кнопка след. года
    // добавляем их в документ
    caption.prepend(btnPrevMonth);
    caption.prepend(btnPrevYy);
    caption.append(btnNextMonth)
    caption.append(btnNextYy);
    let th;
 
    let x = 1;	//нумерация ячеек с числами

    let trWeekDay = table.insertRow(0);	//создаем первую строку таблицы с днями нед
    for (a = 0; a < 7; a++) {
    	th = document.createElement("th");
    	th.innerHTML = days[a];
    	trWeekDay.append(th);
    	trWeekDay.classList.add("weekdays");
    }
    let trSecond = table.insertRow(1);	//создаем первую строку в которой создаем нужное кол-во пустых ячеек
    for (let y = 0; y < 7; y++) {		//если первый день нед больше 0 то создаем пустые ячейки
    		if (y < (firstDay - 1)) {						
    			td = trSecond.insertCell(y);
    			td.innerHTML = " ";
    			td.classList.add("td-not-this-month");	//добавляем стили для пустых ячеек
    		} else if ((firstDay - 1) == -1 && y < 6) {
    			td = trSecond.insertCell(y);
    			td.innerHTML = " ";
    			td.classList.add("td-not-this-month");	//добавляем стили для пустых ячеек
    		} else {
    			td = trSecond.insertCell(y);
    			td.innerHTML = x++;
    			td.classList.add("td_now");		//добавляем стили для ячеек с текущими датами
    		}
    	}
    // если первым днем неделм явдяется воскресенье, то таблицу делаем на 1 строку больше
    if ((firstDay - 1) == -1) {
    	for (let i = 2; i < 7; i++) {			
	    	let tr2 = table.insertRow(i);	//создаем остальные строки и нумерованные ячейки
	    	for (let z = 0; z < 7; z++) {	//если число счетчик Х больше кол-ва дней в месяце, то создаем после него пустые ячейки
	    		if (x <= dayInMonth) {
	    			td2 = tr2.insertCell(z);
	    			td2.innerHTML = x++;
	    			td2.classList.add("td_now");	//добавляем стили для ячеек с текущими датами
	    		} else {
	    			td2 = tr2.insertCell(z);
	    			td2.innerHTML = "";
	    			td2.classList.add("td-not-this-month");	//добавляем стили для пустых ячеек
	    		}
	    	}
	    }
	// если нет, то делаем на 1 строку меньше
    } else {
    	for (let i = 2; i < 6; i++) {			
	    	let tr2 = table.insertRow(i);	//создаем остальные строки и нумерованные ячейки
	    	for (let z = 0; z < 7; z++) {	//если число счетчик Х больше кол-ва дней в месяце, то создаем после него пустые ячейки
	    		if (x <= dayInMonth) {
	    			td2 = tr2.insertCell(z);
	    			td2.innerHTML = x++;
	    			td2.classList.add("td_now");	//добавляем стили для ячеек с текущими датами
	    		} else {
	    			td2 = tr2.insertCell(z);
	    			td2.innerHTML = "";
	    			td2.classList.add("td-not-this-month");	//добавляем стили для пустых ячеек
	    		}
	    	}
	    }
    }
    
    //функция которая по клику на кнопку меняет год или месяц в календаре
    btnNextYy.addEventListener("click", function () {
    	table.remove();	//когда нажимаем на кнопку удаляем старую таблицу
		++getYy;
		createCalendar();
	})
	btnPrevYy.addEventListener("click", function () {
		table.remove();	//когда нажимаем на кнопку удаляем старую таблицу
		--getYy;
		createCalendar();
	})
	btnNextMonth.addEventListener("click", function () {
		table.remove();	//когда нажимаем на кнопку удаляем старую таблицу
		++getMm;
		if (getMm > 11) {
			++getYy;
			getMm = 0;
		}
		createCalendar();
	})
	btnPrevMonth.addEventListener("click", function () {	//если месяц становится меньше чем январь, то уменьшаем год на 1 и месяц делаем декабрём
		table.remove();	//когда нажимаем на кнопку удаляем старую таблицу
		--getMm;
		if (getMm < 0) {
			getMm = 11;
			--getYy;
		}
		createCalendar();
	})
}

// эффект движения кругов вместе с мышью
function aaa() {
createCalendar();
	let posX, posY;
	let section = document.querySelector("section");
	let circleBig = document.querySelector(".circle-big");
	let circleSmall = document.querySelector(".circle-small");

		let topB = parseInt(window.getComputedStyle(circleBig).top.slice(0, 3));
		let bottomB = parseInt(window.getComputedStyle(circleBig).bottom.slice(0, 3));
		let leftB = parseInt(window.getComputedStyle(circleBig).left.slice(0, 3));
		let rightB = parseInt(window.getComputedStyle(circleBig).right.slice(0, 3));

		let topS = parseInt(window.getComputedStyle(circleSmall).top.slice(0, 3));
		let bottomS = parseInt(window.getComputedStyle(circleSmall).bottom.slice(0, 3));
		let leftS = parseInt(window.getComputedStyle(circleSmall).left.slice(0, 3));
		let rightS = parseInt(window.getComputedStyle(circleSmall).right.slice(0, 3));

	document.addEventListener("mousemove", function(e){
		posX = Math.floor(e.clientX/30);
		posY = Math.round(e.clientY/30);

		circleBig.style.top = topB - posY + "px";
		circleBig.style.left = leftB - 100 - posX + "px";


		circleSmall.style.top = topS - posY + "px";
		
		circleSmall.style.left = leftS + 20 - posX + "px";
	

		circleBig.classList.add("active");
		circleSmall.classList.add("active");

	})
}
aaa()
