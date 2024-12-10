import useSports from "../hooks/use-sports";

function SportsTable() {
    const { sports, isLoading, error } = useSports(); 

      
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

 return sports.map(({id,sport, sport_type}) => {
    return (
        <>
        <div key={id}>{sport}</div> <div>{sport_type}</div>
        </>
    )
 })

}

export default SportsTable