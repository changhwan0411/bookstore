
async function subbookData() {
    const REST_API_KEY = '8b5de02d32a111b75dd290686a1dcbd7';
    const params = new URLSearchParams({
        target: "title",
        query: "시험"
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)

        // 요소 선택
        const subBox = document.querySelector(".bookmain");
        const bookTitle = document.querySelector(".booktitle")
        const publishEl = document.querySelector(".publish");
        const authorEl = document.querySelector(".author");
        const dateEl = document.querySelector(".date");
        const priceNum = document.querySelector(".total-num");

        // 데이터에서 필요한 값 추출
        const book = data.documents[0];
        const { title, thumbnail, authors, publisher, datetime, price } = book;

        // 요소 생성 및 추가
        subBox.innerHTML = `
                <img src="${thumbnail}">
                `
        priceNum.textContent += (price + 3000).toLocaleString() + "원";

        // 요소에 데이터 넣기
        authorEl.textContent = authors.join(", "); // 저자는 배열인 경우가 많으므로 join 사용
        publishEl.textContent = publisher;
        dateEl.textContent = new Date(datetime).toLocaleDateString(); // 날짜 형식 변환
        bookTitle.textContent = title;






    } catch (error) {
        console.log('에러발생', error);
    }
}

subbookData();



async function subbookData1() {
    const REST_API_KEY = '8b5de02d32a111b75dd290686a1dcbd7';
    const params = new URLSearchParams({
        target: "title",
        query: "최태성"
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();


        // 데이터 가져오는 부분 (생략, 기존 코드 그대로 사용)
        const books = data.documents; // 여러 권의 데이터를 가져옴
        const container = document.querySelector("#slider .swiper-wrapper");

        // 1. 데이터 반복해서 HTML 만들기
        books.forEach(book => {
            const { title, thumbnail, authors, price, publisher } = book;

            // 기존에 작성하시던 방식처럼 백틱(`) 활용
            container.innerHTML += `
                <div class="swiper-slide">
                    <img src="${thumbnail}" alt="${title}">
                    <div class="info">
                        <h3>${title}</h3>
                        <p>${authors.join(", ")}</p>
                        <p>${price.toLocaleString()}원</p>
                    </div>
                </div>
            `;
        });

        // 탭 클릭 이벤트 (108번 줄 부근에 삽입)
        const tabs = document.querySelectorAll(".tab-item");
        const contentsArea = document.querySelectorAll(".tab-content");

        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                const target = tab.dataset.tab;

                // 모든 탭/내용에서 active 클래스 제거
                tabs.forEach(t => t.classList.remove("active"));
                contentsArea.forEach(c => c.classList.remove("active"));

                // 클릭한 탭과 해당 ID를 가진 컨텐츠만 active 추가
                tab.classList.add("active");
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    targetElement.classList.add("active");
                }
            });
        });

        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement; // .accordion-item을 찾음

                // 클릭한 것만 열리고 나머지는 닫히게 하고 싶을 때 (선택 사항)
                // document.querySelectorAll('.accordion-item').forEach(i => {
                //     if (i !== item) i.classList.remove('active');
                // });

                item.classList.toggle('active'); // active 클래스 토글
            });
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

subbookData1();