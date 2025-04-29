let CountryName=document.getElementById("Country_Input")
let searchBtn=document.getElementById("search_Btn")
let resultBox = document.getElementById("result");

searchBtn.addEventListener("click", function(){
    if (CountryName.value.trim() === "") {
        alert("국가 이름을 영어로 작성해주세요요!");
        return;
    }
    fetch(`https://restcountries.com/v3.1/name/${CountryName.value}`)
    .then(response => response.json())
    
    .then(data => {
        const countryInformation=data[0];
        const flag=countryInformation.flags.png;
        const capital=countryInformation.capital[0]

        resultBox.innerHTML = `
              <h2>${CountryName.value}</h2>
              <img src="${flag}" alt="${CountryName.value} 국기" width="200">
              <p>수도: ${capital}</p>
          `;
    })
    
    .catch(error => {
          console.error('에러 발생:', error);
          resultBox.innerHTML = `<p>나라를 찾을 수 없습니다.</p>`;
    });

})
