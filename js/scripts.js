var table = document.querySelector("#myTable"),
    ths = table.querySelectorAll("thead th"),
    trs = table.querySelectorAll("tbody tr");

// MAKE ARRAY FUNCTION
// changing variable into an array (in order to perform methods on them in the future):

function makeArray(nodeList) {
    
    var arr = [];
    
    for (var i = 0; i < nodeList.length; i++) {
        arr.push(nodeList[i]);
    }
    
    return arr;
}

// CLEAR CLASS NAME FUNCTION
// deleting classes from HTML elements:

function clearClassName(nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
        nodeList[i].className = "";
    }
}

// SORT BY FUNCTION
// our main function used to sort elements inside arrays, save it as ducument fragment and present that fragment on the website:

function sortBy(e) {
    
    var target = e.target,
        thsArr = makeArray(ths),
        trsArr = makeArray(trs),
        index = thsArr.indexOf(target),
        df = document.createDocumentFragment(),
        order = (target.className === "" || target.className === "desc") ? "asc" : "desc";
    
    // removing existing classes from HTML table head elements:
    clearClassName(ths);
    
    // sorting array elements in alphabetical (or reverse) order (with different sorting methods for strings and numbers):
    trsArr.sort(function(a, b) {
        
        var tdA = a.children[index].textContent,
            tdB = b.children[index].textContent;
        
        if (isNaN(tdA) === true) {
            if(tdA < tdB) {
                return (order === "asc") ? -1 : 1;
            } else if(tdA > tdB) {
                return (order === "asc") ? 1 : -1;
            } else {
                return 0;
            }
        } else {
            return (order === "asc") ? (parseInt(tdA) - parseInt(tdB)) : (parseInt(tdB) - (parseInt(tdA)));
        }
    });
    
    // saving array elements as a document fragment:
    trsArr.forEach(function(tr) {
        df.appendChild(tr);
    });
    
    // adding class to the clicked HTML element:
    target.className = order;
    
    // adding new document fragment into the body of the table:
    table.querySelector("tbody").appendChild(df);
 
}

// "CLICK" EVENT
// calling the sortBy function while clicking on the table head element:

for (var i = 0; i < ths.length; i++) {
    ths[i].onclick = sortBy; 
}