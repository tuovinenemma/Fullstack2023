const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  
  }
  const Header = ({course}) => {
  
    console.log(course)
    return <h1>{course.name}</h1>
  }
  
  const Content = ({parts}) => {
    console.log(parts)
  
    return(
      <div>
        {parts.map(part =>           
        <Part key={part.id} part={part} />        )}      
      </div>
    )
  }
  
  const Total = ({parts}) => {
    console.log(parts)
  
    const exercises = parts.map(part => part.exercises)
    const sumOfExercises = exercises.reduce((sum, current) => sum + current,0)
  
    return(
      <div>
        <h4>total of exercises: {sumOfExercises}</h4>
      </div>
    )
    
  }
  
  const Part = ({part}) => {
    
    return(
      <div>
        <p>
          {part.name} {part.exercises}
        </p>
      </div>
    )
}

export default Course