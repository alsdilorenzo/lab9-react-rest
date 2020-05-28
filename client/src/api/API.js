import moment from 'moment';

let tasks = [
    {
        'id': 1,
        'description': 'Complete Lab 8',
        'important': true,
        'privateTask': true,
        'deadline': moment('2020-05-30T11:00:00'),
        'project': 'WebApp I',
        'completed': true
    },
    {
        'id': 2,
        'description': 'Watch Mr. Robot',
        'important': false,
        'privateTask': true,
        'deadline': moment('2020-05-31T18:59:00'),
        'project': 'Personal',
        'completed': false
    },
    {
        'id': 3,
        'description': 'Go for a walk',
        'important': true,
        'privateTask': false,
        'deadline': moment('2020-04-28T08:00:00'),
        'project': 'Personal',
        'completed': false
    }];


const isToday = (date) => {
    return date.isSame(moment(), 'day');
}

const isNextWeek = (date) => {
    const nextWeek = moment().add(1, 'weeks');
    const tomorrow = moment().add(1, 'days');
    return date.isAfter(tomorrow) && date.isBefore(nextWeek);
}

async function getTasks(){
    return tasks;
}

async function getImportantTasks() {
    return tasks.filter((t) => {
        return t.important;
    });
}

async function getTodayTasks() {
    return tasks.filter((t) => {
        if(t.deadline)
            return isToday(t.deadline);
        else
            return false;
    });
}

async function getWeeklyTasks() {
    return tasks.filter((t) => {
        if(t.deadline)
            return isNextWeek(t.deadline);
        else
            return false;
    });
}

async function getPrivateTasks() {
    return tasks.filter((t) => {
        return t.privateTask;
    });
}

async function getSharedTasks() {
    return tasks.filter((t) => {
        return !t.privateTask;
    });
}

async function getByProject(project) {
    return tasks.filter((t) => {
        return t.project === project;
    });
}

const API = { getTasks,getImportantTasks, getTodayTasks,getWeeklyTasks,getPrivateTasks,getSharedTasks, getByProject} ;
export default API;
