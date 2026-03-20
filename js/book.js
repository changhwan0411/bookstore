async function bookData() {
    const params = new URLSearchParams({
        target: "title",
        query: "미움받을 용기",
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 8b5de02d32a111b75dd290686a1dcbd7"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);


        const boxElements = document.querySelectorAll("#new .swiper-slide");
        console.log(boxElements)


        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return;


            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
                    <h3>${data.documents[i].title}</h3>
                    <h6>${data.documents[i].authors}</h6>
                    <p>${data.documents[i].price}</p>
                    <button>click</button>
                    `
        });


    } catch (error) {
        console.error("베스트셀러 데이터 로드 실패:", error);
    }
}


async function bestSellerData() {
    const params = new URLSearchParams({
        target: "title",
        query: "2026 동형 모의고사",
        size: 10
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 8b5de02d32a111b75dd290686a1dcbd7"
            }
        });

        const data = await response.json();

        const boxElements = document.querySelectorAll(".box");

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            if (!doc) return;

            box.innerHTML = `
                 <div class="rank_num">${i + 1}</div>
                 <img src="${doc.thumbnail}" alt="교재이미지">
                 <p class="book_title">${doc.title}</p>
                 <p class="book_author">${doc.authors[0]}</p>
                 <p class="book_price">10% <span>${doc.price.toLocaleString()}원</span></p>
`;
        });



    } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
    }
}


// async function bestSellerData() {
//     const params = new URLSearchParams({
//         target: "title",

//         query: "2026 동형 모의고사",
//         size: 10
//     });

//     const url = `https://dapi.kakao.com/v3/search/book?${params}`;

//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {

//                 Authorization: "KakaoAK 8b5de02d32a111b75dd290686a1dcbd7"
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
//         }

//         const data = await response.json();


//         const boxElements = document.querySelectorAll("#best .swiper-slide");


//         boxElements.forEach((box, i) => {
//             const doc = data.documents[i];

//             if (!doc) return;


//             box.innerHTML = `
//         <img src="${doc.thumbnail}" alt="${doc.title}">
//         <h3>${i + 1}. ${doc.title}</h3>
//         <h6>${doc.authors.join(', ')}</h6> <p>${doc.price.toLocaleString()}원</p> <button>click</button>
//       `;
//         });

//     } catch (error) {
//         console.log('에러발생', error);
//     }
// }



window.addEventListener('load', () => {
    bestSellerData();
    bookData();
});


async function fetchBooks(query) {
            const params = new URLSearchParams({
                target: "title",
                query,
                size: 8
            });
            const url = `https://dapi.kakao.com/v3/search/book?${params}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: "KakaoAK 8b5de02d32a111b75dd290686a1dcbd7"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            return response.json();
        }

        async function bookData1() {
            try {
                const queries = [
                    { query: "파리", sectionId: "tab1" },
                    { query: "유아", sectionId: "tab2" },
                   
                ];

                for (const { query, sectionId } of queries) {
                    const data = await fetchBooks(query);

                    // 해당 섹션 내의 .box 요소 8개 선택
                    const section = document.querySelector(`#${sectionId}`);
                    const boxElements = section.querySelectorAll(".box");

                    boxElements.forEach((box, i) => {
                        const doc = data.documents[i];
                        if (!doc) return;

                        // 요소 생성 및 추가
                        box.innerHTML = `<img src="${doc.thumbnail}">
                        <h3>${doc.title}</h3>
                        <h6>${doc.authors}</h6>
                        <p>${doc.contents.substring(0, 60)}</p>
                        <button>click</button>
                        `
                    });
                }
            } catch (error) {
                console.log('에러발생', error);
            }
        }

        bookData1();

        const tabItems = document.querySelectorAll('#booktab li');
        const tabs = document.querySelectorAll('article');
        const titleList = document.getElementById('titlelist');

        tabItems.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                // 탭에 해당하는 리스트 보이고, 나머지는 숨기기
                tabs.forEach((tab, j) => {
                    tab.style.display = (i === j) ? 'flex' : 'none';
                });

                // 제목 텍스트 변경
                titleList.textContent = tab.textContent;
            });
        });