var generateDayWiseTimeSeries = function(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
};

class AreaChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          stacked: true,
          events: {
            selection: function(chart, e) {
              console.log(new Date(e.xaxis.min));
            }
          }
        },
        colors: ["#008FFB", "#00E396"],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "left"
        },
        xaxis: {
          type: "datetime"
        }
      },
      series: [
        {
          name: "Predicted Area",
          data: generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            {
              min: 10,
              max: 60
            }
          )
        },
        {
          name: "Confidence",
          data: generateDayWiseTimeSeries(
            new Date("11 Feb 2017 GMT").getTime(),
            20,
            {
              min: 10,
              max: 20
            }
          )
        }
      ]
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height="350"
        />
      </div>
    );
  }
}

const domContainer = document.querySelector("#app");
ReactDOM.render(React.createElement(AreaChart), domContainer);
