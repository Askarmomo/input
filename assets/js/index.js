import JustValidate from 'just-validate';

const formEl = document.getElementById("form")

const validate = new JustValidate(formEl, {
    validateBeforeSubmitting: false,
});

const nameEl = document.getElementById("name")
const numberEl = document.getElementById("number")
const dateEl = document.getElementById("date")
const addressEl = document.getElementById("address")
const tableEL = document.getElementById("table")
const SubmitbtnEl = document.getElementById("Submitbtn")

validate.addField(nameEl, [
    {
        rule: 'required',
    },
    {
        rule: "minLength",
        value: 3,
    },
    {
        rule: "maxLength",
        value: 15,
    },

])
validate.addField(numberEl, [
    {
        rule: 'required',
    },
    {
        rule: "number",
    },
    {
        rule: "minLength",
        value: 10,
    },
])
validate.addField(dateEl, [
    {
        rule: 'required',
    },

])
validate.addField(addressEl, [
    {
        rule: 'required',
    },
    {
        rule: "minLength",
        value: 3,
    },
    {
        rule: "maxLength",
        value: 15,
    }
])

validate.onSuccess(() => {

    const formdata = new FormData(formEl)
    const formvalueobject = Object.fromEntries(formdata.entries())

    const array = []
    array.push(formvalueobject)

    const existingdata = localStorage.getItem("key")
    const existingdataarray = JSON.parse(existingdata)

    if (existingdataarray) {

        existingdataarray.push(formvalueobject)
        localStorage.setItem("key", JSON.stringify(existingdataarray))

    } else {

        array.push(formvalueobject)
        localStorage.setItem("key", JSON.stringify(array))
    }

    formEl.reset()


})

function getAllCorierData() {
    // get all stored datas which are avilable in localstorage
    const corierdata = localStorage.getItem("key")

    // display the ui with all those data
    const corierdataaray = JSON.parse(corierdata)

    // write those values into the table ui
    const finaldata = corierdataaray.map((corierdata) => {

        return `
        <tr>
            <td class="text-white p-2 border ">${corierdata.name}</td>
            <td class="text-white p-2 border">${corierdata.number}</td>
            <td class="text-white p-2 border">${corierdata.date}</td>
            <td class="text-white p-2 border">${corierdata.address}</td>
        </tr>
        `

    }).join(" ")

    tableEL.innerHTML += finaldata
}
getAllCorierData()