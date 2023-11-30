// step1 돔 조작과 이벤트 핸들링으로 메뉴 관리하기를 위한 전략
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
// - [✅] 메뉴 삭제 버튼 이벤트를 받고,
// - [✅] 브라우저에서 제공하는 confirm 인터페이스를 활용해 확인용 모달창을 띄운다
// - [✅] 모달창의 확인 버튼을 누르면 메뉴가 삭제된다.
// - [✅] 모달창의 취소 버튼을 누르면 삭제되지 않는다.
// - [✅] 총 개수도 같이 줄어야 함.

// step2 상태 관리로 메뉴 관리하기를 위한 전략
// TODO localStorage Read & Write
// - [✅ ] localStorage에 데이터를 저장한다. write
//  - [✅ ] 메뉴를 추가할 때 저장
//  - [✅ ] 메뉴를 수정할 때 저장
//  - [✅ ] 메뉴를 삭제할 때 로컬스토리지에 저장된 것 삭제
// - [✅ ] localStorage에 있는 데이터를 읽어온다. read

// TODO 카테고리별 메뉴판 관리
// - [✅ ] 에스프레소 메뉴판 관리
// - [✅ ] 프라푸치노 메뉴판 관리
// - [✅ ] 블렌디드 메뉴판 관리
// - [✅ ] 티바나 메뉴판 관리
// - [✅ ] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [✅ ] 페이지가 최초로 로딩될 때는 localStorage에 저장된 에스프레소 메뉴를 읽어 온다.
// - [✅ ] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// - [✅ ] 품절 버튼을 UI에 추가한다.
// - [✅ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [✅ ] 품절 버튼을 클릭하면 sold-out class를 추가하여 UI 상태를 변경한다.
// - [✅ ] localStorage에 있는 데이터에도 품절 상태임을 저장한다.
// - [✅ ] toggle로 작동하게 한다

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
    // JSON.stringify JSON 형식의 객체를 문자열로 바꿔준는 메서드
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
    // 데이터가 문자열이기 때문에 제이슨 형식으로 바꿔야함
  },
};

function App() {
  // 상태는 변할 수 있는 데이터를 의미
  // 이 앱에 있는 상태: 메뉴명
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  // 상태값을 선언후 빈 배열로 초기화
  this.currentCategory = "espresso";

  // 초기 화면
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    renderMenuName();
  };

  const updateMenuCount = () => {
    const menuCount = $("#menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  const renderMenuName = () => {
    const template = this.menu[this.currentCategory]
      .map((item, index) => {
        return `
      <li data-menu-id="${index}" class="${
          item.soldOut ? "sold-out" : ""
        } menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button> 
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
      })
      .join("");

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    const espressoMenuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    renderMenuName();
    $("#menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut; // soldOut 속성 추가하고 boolean 값
    store.setLocalStorage(this.menu);
    renderMenuName();
  };

  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
      return;
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
      return;
    }

    if (e.target.classList.contains("menu-sold-out-button")) {
      soldOutMenu(e);
      return;
    }
  });

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#menu-submit-button").addEventListener("click", addMenuName);

  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuName();
    }
  });

  $("nav").addEventListener("click", (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      this.currentCategory = categoryName;
      console.log("categoryName", categoryName);
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      renderMenuName();
    }
  });
}

const app = new App();
// 맨 처음에 페이지를 접근하면 app 이라는 객체가 생성

app.init(); // app 객체의 init을 실행

// app이 인스턴스로 만든다는 의미
// 함수를 하나 선언했다면 그 함수는 하나만 존재
// 인스턴스로 만든다는 거는 그 함수를 모델로 새로운 객체들이 여러개 만들어질 수 있고 각각의 상태를 가질 수 있음
// 예를 들어 채팅창이 여러개, 채팅창 하나 하나가 각각의 객체임
// 채팅방이라는 플랫폼은 같지만 각기 다른 내용의 채팅이 됨

// 상태 관리의 중요성
// 상태 관리란 변화하는 데이터를 잘 반영하는 것
// 사용자와 인터랙션이 가능한 웹애플리케이션을 만들기 위해서
// 기본적으로 이루어져야하는 것이 상태관리 이기 때문
