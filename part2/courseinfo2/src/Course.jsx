const Header = ({courseName}) => {;
    console.log(courseName);
    return (<h2>{courseName}</h2>);
}


const Part = ({ part }) => {
    console.log(part);
    return (
        <p> {part.name} {part.exercises}</p>
    );
}


const Total = ({parts}) => {
    console.log(parts);
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <h3> total of exercises {total}</h3>
    )
}


const Course = ({course}) => {
    return (
        <div>
            <Header courseName={course.name}/>
            {course.parts.map((part) => (
                <Part key = {part.id} part={part}/>
            ))}
            <Total parts={course.parts}/>

        </div>
    )
}


export default Course