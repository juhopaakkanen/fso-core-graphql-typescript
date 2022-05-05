const Header = ({ header }) => <h2>{header}</h2>

const Part = ({ content, exercises }) => <p>{content} {exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} content={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ parts }) => <b>total of exercises {parts.reduce((a, b) =>  a + b.exercises, 0)}</b>

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}   />
    </div>
  )
}

export default Course