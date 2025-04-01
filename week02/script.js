function RandomNumber() {
    const number = [];
    while (number.length<6){
        const num = Math.floor(Math.random() * 45) + 1;
        if (!number.includes(num)) {
            number.push(num);
        }
    }
}