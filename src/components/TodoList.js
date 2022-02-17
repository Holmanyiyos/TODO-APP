import React from "react";
import { TodoContext } from "./Context";
import "../css/TodoList.css"

function TodoList(props){
    const [prevDay, setPrevDay] = React.useState("");
    const {filterDay} = React.useContext(TodoContext);
    const today = new Date().toDateString();
    const numberDay = new Date().getDate();
    const week = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];
    const numDay = []
    function positionDay(numero){
        for(let i= 0; i< week.length; i++){
            numDay.push(i - numero + numberDay)
        }   
    }
    for(let i= 0; i< week.length; i++){
        if(today.includes(week[i])){
            positionDay(i)
        }
    }

    const handleFilterDays = (e, day)=>{
        if(prevDay === e){
            filterDay("")
            paintNumber(e)
        }else{
            const date = new Date;
            const month = date.getMonth() +1
            const year = date.getFullYear()
            paintNumber(e)
            if (month > 9) {
                filterDay(`${year}-${month}-${day}`)
            }else{
                filterDay(`${year}-0${month}-${day}`)
            }
            setPrevDay(e)
        }
    }

    const paintNumber=(card)=>{
        const selected = document.getElementById(card);
        const all = document.querySelectorAll(".dateContainer");
        if (selected.lastChild.classList.contains("clicked")) {
            for (let i = 0; i < all.length; i++) {
                all[i].lastChild.classList.remove("clicked");
            }
        }else{
            for (let i = 0; i < all.length; i++) {
                all[i].lastChild.classList.remove("clicked");
            }
            selected.lastChild.classList.add("clicked")
        }
    }

    return(
        <section className="section-list">
            <div className="weekContainer">
                {week.map(
                    (e, index)=><div className="dateContainer" key={e} id={e} onClick={()=>{handleFilterDays(e, numDay[index])}}>
                            <h4>{e}</h4>
                            <p>{numDay[index]}</p>
                        </div>
                )}
            </div>
            <ul className="list">
                {props.children}
            </ul>
        </section>
    )
}

export {TodoList};