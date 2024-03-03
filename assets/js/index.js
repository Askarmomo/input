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





    SubmitbtnEl.addEventListener("click", (event) => {

        event.preventDefault()
        const tr = document.createElement("tr")
        tr.classList = "text-white border text-center"

        tr.innerHTML = `
        <tr class="text-white border text-center">
        <td class="text-white border text-center">${nameEl.value}</td>
        <td class="text-white border text-center">${numberEl.value}</td>
        <td class="text-white border text-center">${dateEl.value}</td>
        <td class="text-white border text-center">${addressEl.value}</td>
        </tr>`
        tableEL.append(tr)

    })

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
        localStorage.setItem("key",JSON.stringify(array))
    }

})

