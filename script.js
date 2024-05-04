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
var countryMap = {
    "Ruska federacija":             944,
    "Albanija":                     763,
    "Kosovo":                       763,
    "Alžir":                        764,
    "Andora":                       766,
    "Jermenija":                    772,
    "Australija":                   774,
    "Austrija":                     775,
    "Azerbejdžan":                  776,
    "Bahrein":                      778,
    "Bangladeš":                    779,
    "Barbados":                     780,
    "Bjelorusija":                  781,
    "Belgija":                      782,
    "Butan":                        786,
    "Bolivija":                     787,
    "Bocvana":                      789,
    "Brazil":                       791,
    "Bugarska":                     794,
    "Burkina faso":                 795,
    "Kamerun":                      799,
    "Kanada":                       800,
    "Čile":                         804,
    "Kina":                         805,
    "Kolumbija":                    808,
    "Kongo":                        810,
    "Kostarika":                    813,
    "Obala slonovače":              814,
    "Hrvatska":                     815,
    "Kuba":                         816,
    "Cipar":                        818,
    "Češka republika":              819,
    "Danska":                       820,
    "Dominika":                     822,
    "Dominikanska Republika":       823,
    "Ekvador":                      824,
    "Egipat":                       825,
    "Salvador":                     826,
    "Estonija":                     829,
    "Etiopija":                     830,
    "Fidži":                        833,
    "Finska":                       834,
    "Francuska":                    835,
    "Gabon":                        839,
    "Gruzija":                      841,
    "Njemačka":                     842,
    "Gana":                         843,
    "Gibraltar":                    844,
    "Grčka":                        845,
    "Grenland":                     846,
    "Grenada":                      847,
    "Gvatemala":                    850,
    "Gvineja":                      852,
    "Haiti":                        855,
    "Vatikan":                      857,
    "Honduras":                     858,
    "Hong kong":                    859,
    "Mađarska":                     860,
    "Island":                       861,
    "Indija":                       862,
    "Indonezija":                   863,
    "Iran":                         864,
    "Irak":                         865,
    "Irska":                        866,
    "Izrael":                       868,
    "Italija":                      869,
    "Japan":                        871,
    "Jordan":                       873,
    "Kazahstan":                    874,
    "Kenija":                       875,
    "Koreja - južna":               878,
    "Kirgistan":                    880,
    "Laos":                         881,
    "Letonija":                     882,
    "Libanon":                      883,
    "Libija":                       886,
    "Lihtenštajn":                  887,
    "Litva":                        888,
    "Luksemburg":                   889,
    "Makedonija":                   891,
    "Malezija":                     894,
    "Maroko":                       910,
    "Pakistan":                     929,
    "Portugal":                     939,
    "Saudijska arabija":            956,
    "Srbija":                       958,
    "Slovenija":                    964,
    "Sjedinjene američke države":   996,
    "Velika britanija":             1010,

}

arrange.addEventListener("click", ()=>{
    rearrange()
})

var dateEstranac = document.getElementById("dateInput")
var currentDate = new Date();
var day = currentDate.getDate()
if ( day < 10 ){ day = '0' + day}
var month = currentDate.getMonth() + 1
if ( month < 10 ){ month = '0' + month}
var year = currentDate.getFullYear()
var currentDateOutput = day + "." +  month + "." + year + "."
dateEstranac.value = currentDateOutput

function estranac(){
    var textEstranac = document.getElementById("textEstranac")
    var listItemsEstranac = document.querySelectorAll(".list")
        for (let i = 0; i < listItemsEstranac.length; i++)
            {var listItemValueEstranac = listItemsEstranac[i].querySelectorAll("td")
                var lastNameEstranac = listItemValueEstranac[0].innerHTML.slice(0, listItemValueEstranac[0].innerHTML.indexOf(" "))
                var firstNameEstranac = listItemValueEstranac[0].innerHTML.slice(listItemValueEstranac[0].innerHTML.indexOf(" "))
                
                var countryEstranac = countryMap[listItemValueEstranac[1].innerHTML]
                if (!Number.isInteger(countryEstranac)) {alert(`Code will not work, ${listItemValueEstranac[1].innerHTML}`)}
                console.log(countryEstranac)
                

                var documentTypeEstranac = listItemValueEstranac[2].innerHTML.slice(0, listItemValueEstranac[2].innerHTML.indexOf(":"))
                if (documentTypeEstranac == "P" || documentTypeEstranac == "DP" ) {documentTypeEstranac = 1}
                 else if (documentTypeEstranac == "LK") {documentTypeEstranac = 2}
                  else {documentTypeEstranac = 1003}
                var documentEstranac = listItemValueEstranac[2].innerHTML.slice(listItemValueEstranac[2].innerHTML.indexOf(" ")+1)
                var dateOfBirthEstranac = listItemValueEstranac[3].innerHTML
                var genderEstranac = listItemValueEstranac[4].innerHTML
                if (genderEstranac == "M") {genderEstranac = 1}
                 else {genderEstranac = 2 }
                var dateEstranacValue = dateEstranac.value
                var newDiv1 = document.createElement("div")
                var newDiv2 = document.createElement("div")
                var newDiv3 = document.createElement("div")
                var newSpan1 = document.createElement("span")
                var newSpan2 = document.createElement("span")
                var newSpan3 = document.createElement("span")
                var newSpan4 = document.createElement("span")
                var newSpan5 = document.createElement("span")
                var newSpan6 = document.createElement("span")
                var newSpan7 = document.createElement("span")
                var newSpan8 = document.createElement("span")
                var newSpan9 = document.createElement("span")
                var newSpan10 = document.createElement("span")
                var newSpan11 = document.createElement("span")
                var newSpan12 = document.createElement("span")
                var newSpan13 = document.createElement("span")
                var newSpan14 = document.createElement("span")
                var newSpan15 = document.createElement("span")
                var newSpan16 = document.createElement("span")
                var newSpan17 = document.createElement("span")
                
                var brakeLine = document.createElement("br")
                textEstranac.appendChild(newDiv1)
                textEstranac.appendChild(newDiv2)
                textEstranac.appendChild(newDiv3)
                newDiv2.appendChild(newSpan1)
                newDiv2.appendChild(newSpan2)
                newDiv2.appendChild(newSpan3)
                newDiv2.appendChild(newSpan4)
                newDiv2.appendChild(newSpan5)
                newDiv2.appendChild(newSpan6)
                newDiv2.appendChild(newSpan7)
                newDiv2.appendChild(newSpan8)
                newDiv2.appendChild(newSpan9)
                newDiv2.appendChild(newSpan10)
                newDiv2.appendChild(newSpan11)
                newDiv2.appendChild(newSpan12)
                newDiv2.appendChild(newSpan13)
                newDiv2.appendChild(newSpan14)
                newDiv2.appendChild(newSpan15)
                newDiv2.appendChild(newSpan16)
                newDiv2.appendChild(newSpan17)
                
                    newDiv1.innerHTML = `fetch("https://www.estranac.ba/ForeignCitizens/CreateForeignCitizen", {
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
                    "referrerPolicy": "strict-origin-when-cross-origin", `
                  
                  newDiv3.innerHTML = ` "method": "POST","mode": "cors","credentials": "include"});`
                  
                  newSpan1.innerHTML=`"body": "FirstName=`
                  newSpan2.innerHTML=`${firstNameEstranac}`
                  newSpan3.innerHTML=`&LastName=`
                  newSpan4.innerHTML=`${lastNameEstranac}`
                  newSpan5.innerHTML=`&FKGenderID=`
                  newSpan6.innerHTML=`${genderEstranac}`
                  newSpan7.innerHTML=`&DateOfBirth=`
                  newSpan8.innerHTML=`${dateOfBirthEstranac}`
                  newSpan9.innerHTML=`&FKStateOfBirthID=&PlaceOfBirth=&FKCitizenshipID=`
                  newSpan10.innerHTML=`${countryEstranac}`
                  newSpan11.innerHTML=`&CheckedInDate=`
                  newSpan12.innerHTML=`${dateEstranacValue}`
                  newSpan13.innerHTML=`&FKTravelDocumentsTypeID=`
                  newSpan14.innerHTML=`${documentTypeEstranac}`
                  newSpan15.innerHTML=`&TravelDocumentNumber=`
                  newSpan16.innerHTML=`${documentEstranac}`
                  newSpan17.innerHTML=`&TravelDocumentExpiryDate=&Publisher=&FKVisaTypeID=&VisaNumber=&VisaExpiryDate=&EntryDate=&autocomplete-places=&FKEntryPlaceID=&PhoneNumber=&Email=&Note=",`
                    
                   newSpan2.classList.add('estranacHighlight')
                   newSpan4.classList.add('estranacHighlight')
                   newSpan6.classList.add('estranacHighlight')
                   newSpan8.classList.add('estranacHighlight')
                   newSpan10.classList.add('estranacHighlight')
                   newSpan12.classList.add('estranacHighlight')
                   newSpan14.classList.add('estranacHighlight')
                   newSpan16.classList.add('estranacHighlight')

                  textEstranac.appendChild(brakeLine)
                  textEstranac.appendChild(brakeLine)
                    
            }
            if (currentDateOutput != dateEstranacValue ) {alert('Datum nije jednak trenutnom')}
}







// var country = cell[5].textContent
//country = country.toLowerCase()
//country = country.charAt(0).toUpperCase() + country.slice(1) 

//var country = "Bosna i Hercegovina"