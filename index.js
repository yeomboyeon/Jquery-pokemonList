// ajax 활용(페이지의 이동없이 데이터 교환 및 화면 갱신 가능, 비동기)
// 서버 주소 : https://pokeapi.co/api/v2/pokemon?limit=18&offset=18
// 1. 데이터 가져오기 jquery ajax
// 2. 어디서 가져오지? document.ready
// 3. 데이터 보여줄 화면을 선택자로 가져오기
// 4. 배열로 있는 데이터를 가져와 반복문으로 html을 만든다.
// 5. append(html) 맨 아래 입력 (선택한 요소 끝에 새로운 컨텐츠 추가하기)
// 6. 검색창에 입력시마다 도감이 검색되도록 구현(event.target)
// 7. 검색창에 입력되는 글자순서대로 맞는 이름만 출력되도록 구현(element.closet())

console.clear();

$(document).ready(function () {
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon?limit=18&offset=18", // =limit 를 9로 바꾸면 9가지 도감만 나옴
    success: function (response) {
      //   console.log(response); // 객체 값 전체 값 출력(여기서 가져와야할 데이터 값 확인)

      let html = ""; // html 도감 스타일 가져오기 위해 빈값으로 변수 저장

      const pokemonList = response.results; // // 가져와야 할 results 리스트 값을 변수에 저장
      //   console.log(pokemonList);
      for (let i = 0; i < pokemonList.length; i++) {
        // console.log(pokemonList[i]); // 해당 객체들을 잘 가져오는지 확인
        const pokemon = pokemonList[i]; // 해당 객체를 변수에 저장

        // html 도감 스타일 전체 태그를 문자열로 연결해서 반복문 돌면서 만들어지도록 하기
        // 선택자로 이미지 번호,이름,사진 가져오기(백틱(``))
        html += '<div class="card card-number-0 grass">';
        html += `<div><p>#${i + 1}</p><h3 class="white name">${
          pokemon.name
        }</h3></div>`;
        html += `<div><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          i + 1
        }.png"></div>`;
        html += "</div>";
      }
      //   console.log(html);

      // html에서 저장해주어야할 태그 위치(#list) 를 선택자로 가져와서 append하기
      $("#list").append(html);

      // 입력창에 검색 기능 구현
      $("input[name='searchText']").on("keyup", function (event) {
        const target = $(event.target);
        const searchText = target.val();
        // console.log(target.val()); // 입력할 때마다 입력 값 출력

        // 검색창에 공란이면 도감 전체 보여주기
        if (searchText === "") {
          $("#list").show();
          return;
        }

        // each문 으로 검색된 엘리먼트 출력
        $(".name").each(function (index, element) {
          //   console.log(element); // 검색하는 글자를 포함한 이름태그가 검색

          const pocketmonName = $(element).text();
          //   console.log(pocketmonName); // 검색에 해당된 이름만 검색됨

          // 입력한 문자가 특정 문자로 시작하는지 확인 결과 출력
          // 입력한 문자가 만족할 때까지 탐색하기 (element.closest()) 없으면 null 반환
          // 입력한 문자가 도감에 없으면 도감 숨기기
          if (pocketmonName.startsWith(searchText) === false) {
            $(element).closest(".card").hide(); // 입력한 문자가 시작부터 계속 맞는 도감만 출력됨
            // console.log($(element).closest(".card").hide()); //
            // $(element).closest(".card"); // 입력한 문자가 있는 도감은 다 표시됨
            $(element).hide(); // 입력한 문자가 있는 도감의 이름이 사라짐..
          }
        });
      });
    },
  });
});
