
async function bookData() {
    const REST_API_KEY = 'KakaoAK 8b5de02d32a111b75dd290686a1dcbd7';
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

        // 요소 선택
        const subBox = document.querySelector(".bookmain");
        const contextBox = document.querySelector(".contextbox");
        const priceNum = document.querySelector(".pricenum");

        // 데이터에서 필요한 값 추출
        const book = data.documents[0];
        const { title, thumbnail, authors, price, contents } = book;

        // 요소 생성 및 추가
        subBox.innerHTML = `<h3>${title}</h3>
                <img src="${thumbnail}">
                `
        priceNum.textContent += price + "원";

        contextBox.innerHTML = `<h6>${authors[0]}</h6>
                <p>${contents}</p>
                <span>자세히보기</span>
                `
    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();


document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("./sub_txt/txt1.txt");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.text();
        document.getElementById("tmpBox").innerHTML = data;

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
});
