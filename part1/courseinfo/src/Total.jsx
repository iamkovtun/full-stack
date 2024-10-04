const Total = ({parts}) => {
    console.log(parts);
    let exersAll = parts.map(part => part.exercises);
    let total = exersAll.reduce((a,b) => a + b);
    return (
        <p> Number of exercises {total}</p>
    )
}

export default Total;