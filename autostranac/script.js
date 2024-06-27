const excel_file = document.getElementById('excel_file');
const arrange = document.getElementById('arrange')
var rearrangeListByRoom = document.getElementById("excel_data")
const newList = document.getElementById('newList')
var textEstranac = document.getElementById("textEstranac")
var odjavaPanel = document.getElementById("odjavaPanel")
var dateEstranac = document.getElementById("dateInput")
var currentDate = new Date();
var day = currentDate.getDate()
if ( day < 10 ){ day = '0' + day}
var month = currentDate.getMonth() + 1

if ( month < 10 ){ month = '0' + month}
var year = currentDate.getFullYear()
var currentDateOutput = day + "." +  month + "." + year + "."
dateEstranac.value = currentDateOutput

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
    "Kuvajt":                       879,
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
    "Maldivi":                      895,
    "Mali":                         896,
    "Malta":                        897,
    "Meksiko":                      903,
    "Moldavija":                    905,
    "Monako":                       906,
    "Crna gora":                    908,
    "Maroko":                       910,
    "Nizozemska":                   916,
    "Novi zeland":                  920,
    "Nikaragva":                    921,
    "Niger":                        922,
    "Nigerija":                     923,
    "Norveška":                     927,
    "Oman":                         928,
    "Pakistan":                     929,
    "Palestina":                    931,
    "Paragvaj":                     934,
    "Peru":                         935,
    "Filipini":                     936,
    "Poljska":                      938,
    "Portugal":                     939,
    "Katar":                        941,
    "Ruska federacija":             944,
    "Rumunjska":                    943,
    "Saudijska arabija":            956,
    "Srbija":                       958,
    "Singapur":                     961,
    "Slovačka":                     963,
    "Slovenija":                    964,
    "Španjolska":                   970,
    "Šri lanka":                    971,
    "Švedska":                      976,
    "Švicarska":                    977,
    "Sirija":                       978,
    "Tajvan":                       979,
    "Tajland":                      982,
    "Tunis":                        988,
    "Turska":                       989,
    "Ukrajina":                     994,
    "Ujed. arapski   emirati":      995,
    "Sjedinjene američke države":   996,
    "Urugvaj":                      998,
    "Venecuela":                    1001,
    "Vijetnam":                     1002,
    "Jemen":                        1007,
    "Zambija":                      1008,
    "Zimbabve":                     1009,
    "Velika britanija":             1010,

}


function resortAll() {
    var rows = document.querySelectorAll('tr')
    var array = []

      for (var n=0; n<rows.length; n++){   
        var cell = rows[n].querySelectorAll('th, td')
        var room = cell[1].textContent
        rows[n].setAttribute("id", room)
        array.push(rows[n].outerHTML)
      }
      array.sort()
      rearrangeListByRoom.innerHTML== " "
      rearrangeListByRoom.innerHTML= "<table class='table table-striped table-bordered'><tbody id='resorted'><tbody></table>"
    
      
      for (let j = 0; j < array.length; j++)
        {  document.getElementById("resorted").innerHTML+= array[j]  }
}



function rearrange() {
        resortAll()
    
        var rows = document.querySelectorAll('tr')
        
        
         for (var n=0; n<rows.length; n++)
         {  
            var cell = rows[n].querySelectorAll('th, td')

                var room = cell[1].textContent
                var lastName = cell[2].textContent
                var firstName = cell[3].textContent
                var gender = cell[4].textContent
                if (gender == "F"){gender = "Ž"}
                var country = cell[5].textContent
                country = country.toLowerCase()
                country = country.charAt(0).toUpperCase() + country.slice(1)
                var age = cell[6].textContent  
                var passport = cell[7].textContent
                var firstTwo = passport.slice(0,2)
                if (firstTwo == "2 " ) {passport = "P:" + passport.slice(2)}
                if (firstTwo == "27" ) {passport = "LK:" + passport.slice(2)}
                if (firstTwo == "6 " ) {passport = "DP:" + passport.slice(2)}
                if (firstTwo == "32" ) {passport = "VD:" + passport.slice(2)} 

             if (cell[5].textContent[0] + 1 > 0)
               
               {country = "Bosna i Hercegovina"
                age = cell[5].textContent
                passport = cell[6].textContent      
                passport = passport.substring(0, passport.indexOf(","))}
               
                age = age.substring(0, age.indexOf(",")) + ".";
          
            
            var newListRow = document.createElement("tr")
            newListRow.classList.add("list")
            newListRow.setAttribute('id',room);
            newList.appendChild(newListRow)
          
            var newListCell = document.createElement("td")
            newListCell.style.padding="4px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= lastName + firstName
            
            
          
            var newListCell = document.createElement("td")
            newListCell.style.padding="4px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= country
          
            var newListCell = document.createElement("td")
            newListCell.style.padding="4px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= passport
          
            var newListCell = document.createElement("td")
            newListCell.style.padding="4px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= age
          
            
            var newListCell = document.createElement("td")
            newListCell.style.padding="4px"
            newListRow.appendChild(newListCell)
            newListCell.textContent= gender
            if (newListCell.textContent=="Ž") {newListCell.style.color="red"}   
            
             
          var estranacNewDiv = document.createElement('div')
          estranacNewDiv.setAttribute("id", n)
          textEstranac.appendChild(estranacNewDiv)

          var firstNameEstranac = firstName.trim()
          var lastNameEstranac = lastName.trim()
          var genderEstranac = gender
          if (genderEstranac == "M") {genderEstranac = 1}
           else {genderEstranac = 2 }
          var passportEstranac = passport.slice(passport.lastIndexOf(" ")).trim()
          var documentTypeEstranac = passport.slice(0, passport.indexOf(":")).trim()
          if (documentTypeEstranac == "P" || documentTypeEstranac == "DP" ) {documentTypeEstranac = 1}
                else if (documentTypeEstranac == "LK") {documentTypeEstranac = 2}
                 else {documentTypeEstranac = 1003}
          var countryEstranac = countryMap[country]
                   if (!Number.isInteger(countryEstranac)) {alert(`ESTRANAC se neće moći prijaviti, ${country}`)}
          var dateEstranacValue = dateEstranac.value      
      
            estranacNewDiv.innerHTML = 
            `<div> await fetch("https://www.estranac.ba/ForeignCitizens/CreateForeignCitizen", {
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
                <span>"body": "FirstName=</span><span class='estranacHighlight'>${firstNameEstranac}</span>
                <span>&LastName=</span><span class='estranacHighlight' >${lastNameEstranac}</span>
                <span>&FKGenderID=</span><span class='estranacHighlight' >${genderEstranac}</span><span>&DateOfBirth=</span>
                <span class='estranacHighlight' >${age}</span>
                <span>&FKStateOfBirthID=&PlaceOfBirth=&FKCitizenshipID=</span>
                <span class='estranacHighlight' >${countryEstranac}</span>
                <span>&CheckedInDate=</span><span class='estranacHighlight'>${dateEstranacValue}</span>
                <span>&FKTravelDocumentsTypeID=</span><span class='estranacHighlight' >${documentTypeEstranac}</span>
                <span>&TravelDocumentNumber=</span><span class='estranacHighlight'>${passportEstranac}</span>
                <span>&TravelDocumentExpiryDate=&Publisher=&FKVisaTypeID=&VisaNumber=&VisaExpiryDate=&EntryDate=&autocomplete-places=&FKEntryPlaceID=&PhoneNumber=&Email=&Note=",</span>
                <div>"method": "POST","mode": "cors","credentials": "include"});</div><br><br>
                `
               
}       
        if (currentDateOutput != dateEstranacValue ) {alert('Datum nije jednak trenutnom vremenu ali kod je ispravan')}
        var list = document.querySelectorAll(".list")
        var arr = []
            
            i=0
            list.forEach(listItem=>{
                arr.push(listItem.outerHTML)
                }
            )
    

            list.forEach(element => {
                element.innerHTML=arr[i]
                element.innerHTML = element.innerHTML.replace(/(\r\n|\n|\r)/gm, " ");
                i++
                
            });
         rows.forEach(row=>{
            if (row.id!="list") {row.outerHTML=""}
         })
    

}


arrange.addEventListener("click", ()=>{
    rearrange()
})


function estranac() {
    var panel = document.querySelector(".panel")
    if (panel.style.display === "none") 
        {panel.style.display = "block"}
     else {panel.style.display = "none"}
     navigator.clipboard.writeText(panel.innerText)
}

function estranacOdjava(){

    var odjavaList = document.querySelectorAll("tr")

      for (let i = 0; i < odjavaList.length; i++){

         var odjavaListItem = odjavaList[i].querySelectorAll("th, td")
        
            if (odjavaListItem[11].textContent != "BOSNA I HERCEGOVINA")

                 {
                    var odjavaLastName = odjavaListItem[1].textContent.slice(0, odjavaListItem[1].textContent.indexOf(",") ).trim().toUpperCase()
                    var odjavaName = odjavaListItem[1].textContent.slice(odjavaListItem[1].textContent.indexOf(",") + 1 ).trim().toUpperCase()
                    
                    odjavaPanel.innerHTML += `<div class='panel2'>
                    var odjavaEstranacPanelBody = document.querySelector("tbody");
                    var odjavaEstranacPanelTr = odjavaEstranacPanelBody.querySelectorAll("tr");
                    
                       for (let j = 0; j < odjavaEstranacPanelTr.length; j++)
                         {  var odjavaEstranacPanelTd = odjavaEstranacPanelTr[j].querySelectorAll("td");
                            var nameTd = odjavaEstranacPanelTd[1].innerText;
                            var lastNameTd = odjavaEstranacPanelTd[2].innerText;

                            if ( nameTd == '${odjavaName}' && lastNameTd == '${odjavaLastName}' ) {
                                var odjavaHref = odjavaEstranacPanelTr[j].querySelector(".text-right").innerHTML;
                                var odjavaHrefNum = odjavaHref.slice(odjavaHref.indexOf("en/") + 3, odjavaHref.indexOf("en/") + 10 );
                                
                                fetch("https://www.estranac.ba/ForeignCitizens/CheckOutForeignCitizen", {
                                   "headers": {
                                     "accept": "*/*",
                                     "accept-language": "hr-HR,hr;q=0.9,en-US;q=0.8,en;q=0.7",
                                     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                     "priority": "u=1, i",
                                     "sec-ch-ua": "\\"Google Chrome\\";v=\\"125\\", \\"Chromium\\";v=\\"125\\", \\"Not.A/Brand\\";v=\\"24\\"",
                                     "sec-ch-ua-mobile": "?0",
                                     "sec-ch-ua-platform": "\\"Windows\\"",
                                     "sec-fetch-dest": "empty",
                                     "sec-fetch-mode": "cors",
                                     "sec-fetch-site": "same-origin",
                                     "x-requested-with": "XMLHttpRequest"
                                   },
                                   "referrer": "https://www.estranac.ba/ForeignCitizens/IndexForeignCitizen?page=5",
                                   "referrerPolicy": "strict-origin-when-cross-origin",
                                   "body": "id="+ odjavaHrefNum +"&fiscalBillNumber=&checkoutDate=${dateEstranac.value}",
                                   "method": "POST",
                                   "mode": "cors",
                                   "credentials": "include"
                                 });
                                }
                           }</div>`

                   
                 }
    }
    rearrangeListByRoom.innerHTML= ''
}