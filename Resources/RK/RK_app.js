// Get the API link
const url = "http://127.0.0.1:5000/api/BigDataBandits/Listings"

// Fetch the JSON data and console it 
// It will turn it into a data object 
d3.json(url).then(data => {
    var ctx = document.getElementById('myChart').getContext('2d');
// console.log(data)
    var chartData = data.map((item) => {
        var adjustedPrice = parseFloat(item.adjusted_price.replace("$", ""));
        // console.log(adjustedPrice)
        return{
            x: adjustedPrice, // Assign the x-value
            y: item.accommodates, // Assign the y-value
            r: item.number_of_reviews * 10 // Assign the bubble size
        };
    });
console.log(chartData)
    var chart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{label: 'Bubble Chart',
            data: chartData, 
            backgroundColor: 'skyblue',
            borderColor: 'black'
            }]
        },

        options: {
            scales:{
                x: {
                    title:{
                        display: true,
                        text: 'Prices of Airbnb Listings'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'How many people are accommodated'
                    }
                }
            },
            plugins: {
                tooltip:{
                    callbacks: {
                        label: function(context) {
                            var name = context.raw.name;
                            var url = context.raw.listing_url;
                            return `Name: ${name}, URL: ${url}`;
                        }
                    }
                }
            }
        }
    })
}).catch(error => console.error(error));
