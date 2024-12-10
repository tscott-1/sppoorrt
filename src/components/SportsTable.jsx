import useSports from "../hooks/use-sports";

function SportsTable() {
    const { sports, isLoading, error } = useSports(); 

      
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

    console.log(sports)
 return sports.map(({sport, sport_type}) => {
    return (
        <>
        <div>{sport}</div> <div>{sport_type}</div>
        </>
    )
 })

}

export default SportsTable