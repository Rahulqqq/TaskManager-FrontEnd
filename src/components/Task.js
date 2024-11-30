// import './Task.css';

export function Task(props) {
    return (
        <div >
            <p>Title: {props.task.title}</p>
            <p>DueDate: {props.task.dueDate}</p>
            <p>Status: {props.task.status}</p>
        </div>
    )
}