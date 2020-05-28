import moment from 'moment'

class Task {

    constructor(id, description, important, privateTask, project, deadline, completed) {
        if (id) this.id = id
        this.description = description
        this.important = important
        this.privateTask = privateTask
        if (project) this.project = project
        if (deadline) this.deadline = deadline
        this.completed = completed || false
    }

    static from(json) {
        const t =  Object.assign(new Task(), json);
        if(t.deadline){
            t.deadline = moment(t.deadline);
        }
        return t;
    }

}

export default Task;