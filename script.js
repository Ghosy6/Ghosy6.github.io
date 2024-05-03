const excel_file = document.getElementById('excel_file');
const arrange = document.getElementById('arrange')
const newList = document.getElementById('newList')
var z = 0

function rearrange() {
    
        var rows = document.querySelectorAll('tr')
        
        
         for (var n=0; n<rows.length; n++)
         {  
            var cell = rows[n].querySelectorAll('td')
            if (cell[3])
            {if (cell[3].textContent == "M" || cell[3].textContent == "F"){
            var room = cell[1].textContent
            var name = cell[2].textContent
            var gender = cell[3].textContent
            if (gender == "F"){gender = "Ž"}
            var country = cell[4].textContent
            country = country.toLowerCase()
            country = country.charAt(0).toUpperCase() + country.slice(1)
            var age = cell[5].textContent   
            age = age.substring(0, age.indexOf(","));
            var passport = cell[6].textContent
            var firstTwo = passport.slice(0,2)
            if (firstTwo == "2 " ) {passport = "P:" + passport.slice(2)}
            if (firstTwo == "27" ) {passport = "LK:" + passport.slice(2)}
            if (firstTwo == "6 " ) {passport = "DP:" + passport.slice(2)}
            if (firstTwo == "32" ) {passport = "VD:" + passport.slice(2)}
            
    
            
            var newListRow = document.createElement("tr")
            newListRow.classList.add("list")
            newListRow.setAttribute('id',room);
            newList.appendChild(newListRow)
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= name
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= country
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= passport
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= age
    
            
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= gender
            if (newListCell.textContent=="Ž") {newListCell.style.color="red"}
           
            }
        else if (cell[4].textContent == "M" || cell[4].textContent == "F"){
            var room = cell[1].textContent
            var name = cell[2].textContent
            var gender = cell[4].textContent
            if (gender == "F"){gender = "Ž"}
            var country = "Bosna i Hercegovina"
            var age = cell[5].textContent   
            age = age.substring(0, age.indexOf(","));
            var passport = cell[6].textContent
            passport = passport.substring(0, passport.indexOf(","))
            
            
    
            
            var newListRow = document.createElement("tr")
            newListRow.classList.add("list")
            newListRow.setAttribute('id',room);
            newList.appendChild(newListRow)
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= name
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= country
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= passport
    
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= age
    
            
            var newListCell = document.createElement("td")
            newListCell.style.padding="3px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= gender
            if (newListCell.textContent=="Ž") {newListCell.style.color="red"}
        }
        }
            
            
            
    
            
          }
        var list = document.querySelectorAll(".list")
    
            var arr = []
            i=0
            list.forEach(listItem=>{
                arr.push(listItem.outerHTML)
                }
            )
    
            arr.sort()
            list.forEach(element => {
                element.innerHTML=arr[i]
                i++
                
            });
         rows.forEach(row=>{
            if (row.id!="list") {row.outerHTML=""}
         })
    

}

function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('tbl_exporttable_to_xls');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}

excel_file.addEventListener('change', (event) => {

    if(!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type))
    {
        document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';

        excel_file.value = '';

        return false;
    }

    var reader = new FileReader();

    reader.readAsArrayBuffer(event.target.files[0]);

    reader.onload = function(event){

        var data = new Uint8Array(reader.result);

        var work_book = XLSX.read(data, {type:'array'});

        var sheet_name = work_book.SheetNames;

        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {header:1});

        if(sheet_data.length > 0)
        {
            var table_output = '<table class="table table-striped table-bordered">';

            for(var row = 0; row < sheet_data.length; row++)
            {

                table_output += '<tr>';

                for(var cell = 0; cell < sheet_data[row].length; cell++)
                {

                    if(row == 0)
                    {

                        table_output += '<th>'+sheet_data[row][cell]+'</th>';

                    }
                    else
                    {

                        table_output += '<td>'+sheet_data[row][cell]+'</td>';

                    }

                }

                table_output += '</tr>';

            }

            table_output += '</table>';

            document.getElementById('excel_data').innerHTML += table_output;
        }

        excel_file.value = '';

    }

});


arrange.addEventListener("click", ()=>{
    rearrange()
})



function estranac(){
    var textEstranac = document.getElementById("textEstranac")
    var listItemsEstranac = document.querySelectorAll(".list")
        for (let i = 0; i < listItemsEstranac.length; i++)
            {var listItemValueEstranac = listItemsEstranac[i].querySelectorAll("td")
                var lastNameEstranac = listItemValueEstranac[0].innerHTML.slice(0, listItemValueEstranac[0].innerHTML.indexOf(" "))
                var firstNameEstranac = listItemValueEstranac[0].innerHTML.slice(listItemValueEstranac[0].innerHTML.indexOf(" "))
                var countryEstranac = listItemValueEstranac[1].innerHTML
                    if (countryEstranac=="Ruska federacija") {countryEstranac=944}
                    if (countryEstranac=="Albanija") {countryEstranac=763}
                    if (countryEstranac=="Kosovo") {countryEstranac=763}
                    if (countryEstranac=="Alžir") {countryEstranac=764}
                    if (countryEstranac=="Andora") {countryEstranac=766}
                    if (countryEstranac=="Jermenija") {countryEstranac=772}
                    if (countryEstranac=="Australija") {countryEstranac=774}
                    if (countryEstranac=="Austrija") {countryEstranac=775}
                    if (countryEstranac=="Azerbejdžan") {countryEstranac=776}
                    if (countryEstranac=="Bahrein") {countryEstranac=778}
                    if (countryEstranac=="Bangladeš") {countryEstranac=779}
                    if (countryEstranac=="Barbados") {countryEstranac=780}
                    if (countryEstranac=="Bjelorusija") {countryEstranac=781}
                    if (countryEstranac=="Belgija") {countryEstranac=782}
                    if (countryEstranac=="Butan") {countryEstranac=786}
                    if (countryEstranac=="Kanada") {countryEstranac=800}
                    if (countryEstranac=="Kina") {countryEstranac=805}
                    if (countryEstranac=="Hrvatska") {countryEstranac=815}
                    if (countryEstranac=="Njemačka") {countryEstranac=842}
                    if (countryEstranac=="Litva") {countryEstranac=888}
                    if (countryEstranac=="Maroko") {countryEstranac=910}
                    if (countryEstranac=="Pakistan") {countryEstranac=929}
                    if (countryEstranac=="Portugal") {countryEstranac=939}
                    if (countryEstranac=="Saudijska arabija") {countryEstranac=956}
                    if (countryEstranac=="Srbija") {countryEstranac=958}
                    if (countryEstranac=="Slovenija") {countryEstranac=964}
                    if (countryEstranac=="Sjedinjene američke države") {countryEstranac=996}
                    if (countryEstranac=="Velika britanija") {countryEstranac=1010}

                    

                

                var documentTypeEstranac = listItemValueEstranac[2].innerHTML.slice(0, listItemValueEstranac[2].innerHTML.indexOf(":"))
                if (documentTypeEstranac == "P" || documentTypeEstranac == "DP" ) {documentTypeEstranac = 1}
                 else if (documentTypeEstranac == "LK") {documentTypeEstranac = 2}
                  else {documentTypeEstranac = 1003}
                var documentEstranac = listItemValueEstranac[2].innerHTML.slice(listItemValueEstranac[2].innerHTML.indexOf(" ")+1)
                var dateOfBirthEstranac = listItemValueEstranac[3].innerHTML
                var genderEstranac = listItemValueEstranac[4].innerHTML
                if (genderEstranac == "M") {genderEstranac = 1}
                 else {genderEstranac = 2 }
                var dateEstranac = document.getElementById("dateInput")
                var dateEstranacValue = dateEstranac.value
                 console.log(countryEstranac)
                var newDiv = document.createElement("div")
                var brakeLine = document.createElement("br")
                textEstranac.appendChild(newDiv)

                 newDiv.innerHTML += `fetch("https://www.estranac.ba/ForeignCitizens/CreateForeignCitizen", {
                    "headers": {
                      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                      "accept-language": "hr-HR,hr;q=0.9,en-US;q=0.8,en;q=0.7",
                      "cache-control": "max-age=0",
                      "content-type": "application/x-www-form-urlencoded",
                      "priority": "u=0, i",
                      "sec-ch-ua": "\\"Chromium\\";v=\\"124\\", \\"Google Chrome\\";v=\\"124\\", \\"Not-A.Brand\\";v=\\"99\\"",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "\\"Windows\\"",
                      "sec-fetch-dest": "document",
                      "sec-fetch-mode": "navigate",
                      "sec-fetch-site": "same-origin",
                      "sec-fetch-user": "?1",
                      "upgrade-insecure-requests": "1"
                    },
                    "referrer": "https://www.estranac.ba/ForeignCitizens/CreateForeignCitizen",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": "FirstName=${firstNameEstranac}&LastName=${lastNameEstranac}&FKGenderID=${genderEstranac}&DateOfBirth=${dateOfBirthEstranac}&FKStateOfBirthID=&PlaceOfBirth=&FKCitizenshipID=${countryEstranac}&CheckedInDate=${dateEstranacValue}&FKTravelDocumentsTypeID=${documentTypeEstranac}&TravelDocumentNumber=${documentEstranac}&TravelDocumentExpiryDate=&Publisher=&FKVisaTypeID=&VisaNumber=&VisaExpiryDate=&EntryDate=&autocomplete-places=&FKEntryPlaceID=&PhoneNumber=&Email=&Note=",
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                  });

                  `
                  textEstranac.appendChild(brakeLine)
                  textEstranac.appendChild(brakeLine)
                    
            }
}







