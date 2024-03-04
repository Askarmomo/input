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
    const newformvalue = []
    corierdataaray.map((corierdata) => {

        const trEl = document.createElement("tr")
        const tdEl1 = document.createElement("td")
        const tdEl2 = document.createElement("td")
        const tdEl3 = document.createElement("td")
        const tdEl4 = document.createElement("td")

        tdEl1.classList.add("p-2", "border", "text-white")
        tdEl1.textContent = corierdata.name

        tdEl2.classList.add("p-2", "border", "text-white")
        tdEl2.textContent = corierdata.number

        tdEl3.classList.add("p-2", "border", "text-white")
        tdEl3.textContent = corierdata.date

        tdEl4.classList.add("p-2", "border", "text-white")
        tdEl4.textContent = corierdata.address

        trEl.append(tdEl1, tdEl2, tdEl3, tdEl4)
        newformvalue.push(trEl)

    })

    newformvalue.forEach((el) => {
        tableEL.append(el)
    })

}
getAllCorierData()