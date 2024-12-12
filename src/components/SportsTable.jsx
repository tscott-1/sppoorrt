import useSports from "../hooks/use-sports";

function SportsTable() {
    const { sports, isLoading, error } = useSports(); 

      
    if (isLoading) {
        return (<p>loading...</p>)
    }
       
    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
        <div className="sports-table-container">
        <table className="sports-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sport</th>
                    <th>Sport Type</th>
                </tr>
            </thead>
            <tbody>
                {sports.map(({id, sport, sport_type}) => (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{sport}</td>
                        <td>{sport_type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
}

export default SportsTable