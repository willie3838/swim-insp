function eventAnalysis(){
    var table = document.getElementById("table");
    greatest = 0;
    best_event = "";
    points = []
    events = []
    window.topfiveevents = []
    window.topfivepoints = []
    possibleStrokes = ["Freestyle", "Backstroke", "Butterfly", "Breaststroke"]

    for(i = 1; i < table.rows.length; i++)
    {
        var fina_points = parseInt(table.rows[i].cells[5].innerText);

        events.push(table.rows[i].cells[0].innerText);
        points.push(table.rows[i].cells[5].innerText);

        if(fina_points > greatest)
        {
            greatest = fina_points;
            best_event = table.rows[i].cells[0].innerText;         
        }
    }
    for (i = 0; i < 5; i++)
    {
        index = points.indexOf(String(Math.max(...points)));
        window.topfiveevents.push(events[index]);
        window.topfivepoints.push(parseInt(points[index]));
        events.splice(index,1);
        points.splice(index, 1);
    }
    document.getElementById("best-event").innerHTML = best_event;

    if(best_event.includes("50m") || best_event.includes("100m"))
    {
        document.getElementById("swimmer-type").innerHTML = "Sprinter";
    }
    else if(best_event.includes("200m") || best_event.includes("400m"))
    {
        document.getElementById("swimmer-type").innerHTML = "Mid-Distance";
    }
    else if(best_event.includes("800m") || best_event.includes("1500m"))
    {
        document.getElementById("swimmer-type").innerHTML = "Long Distance";
    }
}

function strokeAnalysis(){
    var table = document.getElementById("table");
    possibleStrokes = ["Freestyle", "Backstroke", "Butterfly", "Breaststroke"]
    freestyle = []
    backstroke = []
    butterfly = []
    breaststroke = []
    stroke = "";

    for(i = 1; i < table.rows.length; i++)
    {
        // checks to see if the event includes the specified stroke
        // then it adds the FINA points to the array
        if (table.rows[i].cells[0].innerText.includes("Freestyle"))
        {
            freestyle.push(parseInt(table.rows[i].cells[5].innerText));
        }
        else if (table.rows[i].cells[0].innerText.includes("Backstroke"))
        {
            backstroke.push(parseInt(table.rows[i].cells[5].innerText));
        }
        else if (table.rows[i].cells[0].innerText.includes("Butterfly"))
        {
            butterfly.push(parseInt(table.rows[i].cells[5].innerText));
        }
        else if (table.rows[i].cells[0].innerText.includes("Breaststroke"))
        {
            breaststroke.push(parseInt(table.rows[i].cells[5].innerText));
        }
    }

    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    
    avgFina = [arrAvg(butterfly), arrAvg(backstroke), arrAvg(freestyle), arrAvg(breaststroke)];
    greatest = 0;
    index = 0;
    
    for(i = 0; i < avgFina.length; i++)
    {
        if(avgFina[i] > greatest)
        {
            greatest = avgFina[i];
            index = i;
        }
    }

    if (index == 0)
    {
        stroke = "Butterfly";
    }
    else if (index == 1)
    {
        stroke = "Backstroke";
    }
    else if (index == 2)
    {
        stroke = "Freestyle";
    }
    else if (index == 3)
    {
        stroke = "Breaststroke";
    }

    document.getElementById("preferred-stroke").innerHTML = stroke;
    return avgFina
}

function loadBarGraph()
{
    eventAnalysis();
    var ctx = document.getElementById('myChart2').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'white';
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: window.topfiveevents,
            datasets: [{
                label: 'FINA Points',
                data: window.topfivepoints,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });   
}

function loadDoughnut()
{
    var ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'white';
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data:  {
            labels: ['Butterfly', 'Backstroke', 'Freestyle', 'Breaststroke'],
            datasets: [{
                data: strokeAnalysis(),

                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }],
        },
        options: {
            cutoutPercentage: 50,
            animateRoate: true,
        }
    });
}

function expandAside()
{
    var change = document.getElementsByTagName("body")[0].scrollHeight;
    change += "px"
    console.log(change);
    document.getElementsByTagName("aside")[0].style.height = change;
}

