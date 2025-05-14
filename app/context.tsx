import React, {useState, useContext, createContext, Children} from "react";

type ContainerProps = {
    children : React.ReactNode;
}

type TypeExContentType = {
    busTime : number,
    setBusTime : React.Dispatch<React.SetStateAction<number>>
    walkTime : number,
    setWalkTime : React.Dispatch<React.SetStateAction<number>>
    allTime : number,
    setAllTime : React.Dispatch<React.SetStateAction<number>>
}

const typeExContextState = {
    busTime : 0,
    setBusTime : () => 0,
    walkTime : 0,
    setWalkTime : () => 0,
    allTime : 0,
    setAllTime : () => 0
}

const TimeContext = createContext<TypeExContentType>(typeExContextState)

const TimeProvider = (props: ContainerProps) => {

    const [busTime,setBusTime] = useState<number>(0)
    const [walkTime,setWalkTime] = useState<number>(0)
    const [allTime, setAllTime] = useState<number>(0)

    const calculateAllTime = (items : Array<string>) =>{

        let time = 0

        for(let e of items){
            if(e === 'bus'){
                time += busTime
            }

            else{
                time += walkTime
            }
        }

        setAllTime(time)
    }


    return(
        <TimeContext.Provider value = {{busTime,walkTime,allTime,setBusTime,setWalkTime,setAllTime}}>
            {props.children}
        </TimeContext.Provider>
    )



}

const useTime = () => useContext(TimeContext);

export {TimeProvider,useTime}



