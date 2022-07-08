(function($) {
	"use strict";

	/* Sparkelline bar chart */
	$(".sparkline_bar1").sparkline([2, 4, 3, 4, 5, 4, 5, 0, 3, 5, 6, 4], {
		type: 'bar',
		height: 30,
		width:250,
		barWidth: 4,
		barSpacing: 2,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#8543f6'
	});
	/* Sparkelline bar chart closed */

	/* Circle-progress */
	$('#circle').circleProgress({
		value: 0.85,
		size: 70,
		emptyFill: '#eaf2f9',
		fill: {
		  gradient: ["#d428ea", "#8543f6"]
		}
    });
	/* Circle-progress closed */

	/* Circle-progress-1 */
	$('#circle-1').circleProgress({
		value: 0.64,
		size: 70,
		emptyFill: '#eaf2f9',
		fill: {
		  gradient: ["#fbc434", "#f66b4e"]
		}
	});
	/* Circle-progress-1 closed */

	/* Circle-progress-2 */
	$('#circle-2').circleProgress({
		value: 0.74,
		size: 70,
		emptyFill: '#eaf2f9',
		fill: {
		  gradient: ["#62fb62", "#21a544"]
		}
    });
    /* Circle-progress-2 closed */

	/* Circle-progress-3 */
	$('#circle-3').circleProgress({
		value: 0.55,
		size: 70,
		emptyFill: '#eaf2f9',
		fill: {
		  gradient: ["#f1644b", "#f94971"]
		}
    });
	/* Circle-progress-3 closed */

	/* Chartjs (#total-income) */
	var myCanvas = document.getElementById("team-work");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 280);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');

    var myChart = new Chart( myCanvas, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'line',
            datasets: [ {
				label: 'Total-incomeincome',
				data: [24, 18, 28, 21, 32, 28,30,30,10,40,20],
				backgroundColor: 'transparent',
				borderColor: gradientStroke1,
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke1,
				pointBorderColor :gradientStroke1,
				pointHoverBorderColor :gradientStroke1,
				pointBorderWidth :2,
				pointRadius :2,
				pointHoverRadius :2,
				borderWidth: 4
            }, ]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#6b6f80',
                bodyFontColor: '#6b6f80',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            scales: {
                xAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.9)",
					 },
					display: true,
					gridLines: {
						display: true,
						color: '#eaf2f9',
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'Month',
						fontColor: 'transparent'
					}
				}],
                yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.8)",
					 },
					display: true,
					gridLines: {
						display: true,
						color: '#eaf2f9',
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'sales',
						fontColor: 'transparent'
					}
				}]
            },
            title: {
                display: false,
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });
	/* Chartjs (#total-income) closed */

	/* Chartjs (#barchart) */
	var myCanvas = document.getElementById("bar-chart");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 300);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');
	
	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 390);
	gradientStroke2.addColorStop(0, '#fbc434');
	gradientStroke2.addColorStop(1, '#F66B4E');

    var myChart = new Chart( myCanvas, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
			datasets: [{
				label: 'Revenue',
				data: [15, 18, 12, 14, 10, 15, 7, 14],
							backgroundColor: gradientStroke1,
							hoverBackgroundColor: gradientStroke1,
							hoverBorderWidth: 2,
							hoverBorderColor: 'gradientStroke1'
			}, {

			    label: 'Support cost',
				data: [10, 14, 10, 15, 9, 14, 15, 20],
							backgroundColor: gradientStroke2,
							hoverBackgroundColor: gradientStroke2,
							hoverBorderWidth: 2,
							hoverBorderColor: 'gradientStroke2'

			}
		  ]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: '#000',
				bodyFontColor: '#000',
				backgroundColor: '#fff',
				cornerRadius: 3,
				intersect: false,

			},
			legend: {
				display: false,
				labels: {
					usePointStyle: true,
					fontFamily: 'Montserrat',
				},
			},
			scales: {
				xAxes: [{
					 barPercentage: 0.5,
					ticks: {
						fontColor: "rgba(0,0,0,0.7)",

					 },
					display: true,
					gridLines: {
						display: true,
						color: '#eaf2f9',
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'Month',
						fontColor: 'rgba(0,0,0,0.81)'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.8)",
					 },
					display: true,
					gridLines: {
						display: true,
						color: '#eaf2f9',
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'sales',
						fontColor: 'rgba(0,0,0,0.81)'
					}
				}]
			},
			title: {
				display: false,
				text: 'Normal Legend'
			}
		}
	});
	/* Chartjs (#barchart) closed */

	/* Chartjs (#service-chart) */
	var ctx = document.getElementById('service-chart').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 330);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			type: 'line',
			datasets: [{
				label: "Project Budget %",
				data: [85, 75, 96, 84, 85, 92, 79, 78, 74, 85, 86, 80],
				backgroundColor: gradientStroke1,
				borderColor: gradientStroke1,
				borderWidth: 4,
				pointStyle: 'circle',
				pointRadius: 0,
				pointBorderColor: 'transparent',
				pointBackgroundColor: '#00d9bf',
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#6b6f80',
                bodyFontColor: '#6b6f80',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
			legend: {
				display: false,
				labels: {
					usePointStyle: true,
					fontFamily: 'Montserrat',
				},
			},
			scales: {
				xAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.5)",
					},
					display: false,
					gridLines: {
						color: 'rgba(0,0,0,0.061)'
					},
					scaleLabel: {
						display: false,
						labelString: '',
						fontColor: 'rgba(0,0,0,0.61)'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.5)",
					},
					display: false,
					gridLines: {
						display: false,
						drawBorder: true
					},
					scaleLabel: {
						display: false,
						labelString: 'Customer retention in %',
						fontColor: 'rgba(0,0,0,0.61)'
					}
				}]
			},
			title: {
				display: false,
				text: 'Normal Legend'
			}
		}
	});
	/* Chartjs (#service-chart) closed */

})(jQuery);
