import React from 'react';
import './App.css';
import API from "./api/API";
import Header from "./components/Header";
import Filters from "./components/Filters";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tasks: [], projects: [], filter: 'All', onMobile: false, modalOpen: false, editedTask: null};
    }

    getProjects(tasks) {
        return [...new Set(tasks.map(t => t.project))];
    }

    componentDidMount() {
        API.getTasks().then((tasks) => this.setState({tasks: tasks, projects: this.getProjects(tasks)}));
    }

    showModal = () => {
        this.setState((state) => ({modalOpen: !state.modalOpen, editedTask: null}));
    }

    showSidebar = () => {
        this.setState((state) => ({onMobile: !state.onMobile}));
    }

    filterTasks = (filter, project) => {
        switch (filter) {
            case 'filter-important':
                API.getImportantTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Important'}));
                break;
            case 'filter-today':
                API.getTodayTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Today'}));
                break;
            case 'filter-week':
                API.getWeeklyTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Next Week'}));
                break;
            case 'filter-private':
                API.getPrivateTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Private'}));
                break;
            case 'filter-shared':
                API.getSharedTasks().then((tasks) => this.setState({tasks: tasks, filter: 'Shared'}));
                break;
            case 'filter-project':
                API.getByProject(project).then((tasks) => this.setState({tasks: tasks, filter: project}));
                break;
            default:
                API.getTasks().then((tasks) => this.setState({tasks: tasks, filter: 'All'}));
                break;
        }
    }

    addOrEditTask = (task) => {
        this.setState((state) => {
            // add a fake id for properly rendering the list
            if (!task.id)
                task.id = state.tasks.slice(-1)[0].id + 1;
            // remove possible duplicates
            let buildState = state.tasks.filter((t) => t.id !== task.id);
            // add new task
            buildState.push(task);
            //sort tasks by id
            buildState = buildState.sort((a, b) => a.id - b.id);
            return {tasks: buildState};
        });
    }

    editTask = (task) => {
        this.showModal();
        this.setState({editedTask: task});
    }

    deleteTask = (task) => {
        this.setState((state) => ({tasks: state.tasks.filter((t) => t.id !== task.id)}));
    }

    render() {
        return (
            <>
                <Header showSidebar={this.showSidebar}/>
                <Container fluid>
                    <Row className="vheight">
                        <Collapse in={this.state.onMobile}>
                            <Col sm={3} bg="light" id="left-sidebar" className="collapse d-sm-block below">
                                <Filters projects={this.state.projects} filterTasks={this.filterTasks}/>
                            </Col>
                        </Collapse>
                        <Col sm={9} className="below">
                            <h1>{this.state.filter}</h1>
                            <TaskList tasks={this.state.tasks} editTask={this.editTask} deleteTask={this.deleteTask}/>
                            <Button variant="dark" className="fixed-right-bottom" id="addButton" onClick={this.showModal}>+</Button>
                        </Col>

                        {this.state.modalOpen && <TaskForm modalOpen={this.state.modalOpen} showModal={this.showModal}
                                                           addOrEditTask={this.addOrEditTask}
                                                           task={this.state.editedTask}/>}
                    </Row>
                </Container>
            </>
        );
    }
}

export default App;
