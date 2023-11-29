// step1 요구사항 구현을 위한 전락
// TODO 메뉴 추가
// - [✅] 메뉴의 이름을 입력 받고 확인 버튼을 누르면 메뉴가 추가된다.
// - [✅] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [✅] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [✅] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [✅] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [✅] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [✅] 메뉴 수정 버튼을 눌렀을 떄 브라우저에서 제공하는 `prompt` 인터페이스를 띄워 수정할 수 있게한다.
// - [✅] 모달창의 input에서 수정할 메뉴 이름을 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [] 메뉴 삭제 버튼 이벤트를 받고,
// - [] 브라우저에서 제공하는 confirm 인터페이스를 활용해 확인용 모달창을 띄운다
// - [] 모달창의 확인 버튼을 누르면 메뉴가 삭제된다.
// - [] 모달창의 취소 버튼을 누르면 삭제되지 않는다.

// util 함수
// 반복되는 querySelector를 단순화하기 위해
// $ 표시는 보통 자바스크립트에서 dom element를 가져올때 관용적으로 많이 사용함
const $ = (selector) => document.querySelector(selector);

function App() {
  // 메뉴 수정을 위한 이벤트 위임
  // 수정을 하기 위해서는 이벤트를 바인딩해줘야하는데
  // index.html에는 바인딩한 element가 없다.
  // 메뉴 추가를해야 생성 되는 동적인 element이기 때문이다.
  // 이럴때 그 상위의 element에 이벤트를 위임할 수 있다.
  $("#espresso-menu-list").addEventListener("click", (e) => {
    console.log("target", e.target);
    if (e.target.classList.contains("menu-edit-button")) {
      // e.target을 사용해 클릭한 element가 뭔지 확인 가능
      // prompt 기본 값에 기존의 메뉴 이름 넣기
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요",
        $menuName.innerText
      );
      $menuName.innerText = updatedMenuName;
    }
  });

  // for태그가 자동으로 전송되는거 방지
  // 브라우저에서 form태그가 있으면 enter키 눌렀을때 자동으로 전송하게끔 함
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력받는건
  // 메뉴 이름 추가 함수를 만들어서 재사용
  const addMenuName = () => {
    // 입력된 값이 없으면 추가되지 않도록 함
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    // input에 입력된 값(value)를 espressoMenuName변수에 저장
    const espressoMenuName = $("#espresso-menu-name").value;

    // espressoMenuName을 인자로 받아서 li 태그를 생성하는 함수
    const menuItemTemplate = (espressoMenuName) => {
      return `
      <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
    };

    // insertAdjacentHTML메서드를 사용해 실제 html에 추가
    // innerHTML을 사용하지 않는 이유는 innerHTML은 엔터키를 누를때마다 새로 추가하지 않고 아예 덮어 씌움
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    // 총 메뉴 갯수를 count
    // ul 안에 있는 li 태그들의 갯수를 세어 변수에 담는다.
    // 갯수를 담은 변수가 dom에 반영되도록 한다.
    // querySelectorAll 모든 query 가져옴
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;

    // input은 빈 값으로 초기화
    $("#espresso-menu-name").value = "";
  };

  //확인 버튼 클릭시 메뉴 추가
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });
  // 엔터키 입력시 메뉴 추가
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuName();
    }
  });
}

App();
