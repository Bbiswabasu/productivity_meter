// Fetching the records from the Local Storage of the Browser

/*

{Records} is an/a Object/Dictionary of record keyed by their ID's.
Structure of record is to be as follows:

id : Unique id of the record such as the time in ms from Jan 1 1970 (NUM to a STRING) (KEY OF THE OBJECT)
name : Name of the record which is to be taken form user while saving a record (STRING)

time_recorded : Time at which the user confirms the record action (INTEGER)
time_devoted : Time devoted for the action (INTEGER)
time_actual : Actual time used (INTEGER)
time_wasted : Time Wasted by the user in that record (INTEGER)

List/Array of Todos:

    Where a Todo is of the structure below:
    
    name : Name of the todo (STRING)
    completed : Whether that todo is accomplished or not (BOOLEAN)

*/

// Following is a sample information which will later be connected to real data

let records = {
    "1234" : {
        id : "1234",
        name : "Algorithms Learning",
        time_recorded : 1000000000,
        time_devoted : 10000,
        time_actual : 8000,
        time_wasted : 2000,
        todos : [
            {
                name : "Text Book reading",
                completed : true
            },
            {
                name : "Problem Solving",
                completed : true
            }
        ]
    },
    "6987" : {
        id : "6987",
        name : "JS Projects",
        time_recorded : 1000000000,
        time_devoted : 10000,
        time_actual : 8000,
        time_wasted : 2000,
        todos : [
            {
                name : "Completing Works",
                completed : true
            },
            {
                name : "Sending PRs",
                completed : false
            }
        ]
    }
}

localStorage.setItem("records",JSON.stringify(records));

// End of Sample Data

records = JSON.parse(localStorage.getItem("records"));
let count = 0;

for (const record_id in records){
    let record_text =   $("#recordTemplate")
                            .html()
                            .replace(/@record_id@/g, records[record_id].id)
                            .replace(/@unique_key@/g, records[record_id].id)
                            .replace(/@name@/g, records[record_id].name)
                            .replace(/@record_time@/g, records[record_id].time_recorded)
                            .replace(/@devoted_time@/g, records[record_id].time_devoted)
                            .replace(/@used_time@/g, records[record_id].time_actual)
                            .replace(/@wasted_time@/g, records[record_id].time_wasted)
    if (count == 0) $("#records").html(record_text);
    else $("#records").append(record_text);

    let inside_count = 0;
    for (const task of records[record_id].todos){
        let task_text =   $("#taskTemplate")
                                .html()
                                .replace(/@record_id@/g, records[record_id].id)
                                .replace(/@task_enum@/g, inside_count+1)
                                .replace(/@task_name@/g, task.name)
                                .replace(/@completed@/g, task.completed ? "checked" : "")
        if (inside_count == 0) $("#record" + records[record_id].id + " .tasks").html(task_text);
        else $("#record" + records[record_id].id + " .tasks").append(task_text);
        inside_count++;
    }

    count++;
}
