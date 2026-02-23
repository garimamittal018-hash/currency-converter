BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#btn");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".To select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
         newoption.value=currcode;
         if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
         }else if(select.name==="To" && currcode==="INR"){
            newoption.selected="selected";
         }
         select.append(newoption);
}

        select.addEventListener("change",(evt)=>{
            updateflag(evt.target);
        });
}

    const updateflag=(element)=>{
        let currcode=element.value;
        let countrycode=countryList[currcode];
        let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
        let img=element.parentelement.querySelector("img");
        img.src=newsrc;
    };

    const updateexchangerate=async()=>{
        let amount=document.querySelector(".amount input");
        let amtval=amount.value;
        if(amtval==="" || amtval<1){
            amtval=1;
            amount.value="1";
        }

        const URL=`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

        let response=await fetch(URL);
        let data=await response.json();
        let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

        let finalamount=amtval*rate;
        msg.innerText=`${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
    };

    btn.addEventListener("click",(evt)=>{
        evt.preventDefault();
        updateexchangerate();
    });

    window.addEventListener("load",()=>{
        updateexchangerate();
    });