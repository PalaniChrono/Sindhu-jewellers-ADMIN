$(function(e) {

	/* Chartjs (#chart) */
	var myCanvas = document.getElementById("chart");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke = myCanvasContext.createLinearGradient(0, 0, 0, 380);
	gradientStroke.addColorStop(0, '#d428ea');
	gradientStroke.addColorStop(1, '#8543f6');

	var myChart = new Chart( myCanvas, {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [{
				label: "Incoming calls",
				borderColor: gradientStroke,
				pointBorderColor: gradientStroke,
				pointBackgroundColor: gradientStroke,
				pointHoverBackgroundColor: gradientStroke,
				pointHoverBorderColor: gradientStroke,
				pointBorderWidth: 7,
				pointHoverRadius: 7,
				pointHoverBorderWidth: 1,
				pointRadius: 3,
				fill: false,
				borderWidth: 4,
				data: [28, 50, 30, 60, 41, 66, 45,45, 80 ]
			}]
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
						fontColor: 'rgba(0,0,0,0.8)'
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
	/* Chartjs (#chart) closed */

	/* Chartjs (#revenue) */
	var myCanvas = document.getElementById("revenue");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 380);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');

	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 300);
	gradientStroke2.addColorStop(0, '#fbc434');
	gradientStroke2.addColorStop(1, '#f66b4e');

	var myChart = new Chart(myCanvas, {
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
						fontColor: 'rgba(0,0,0,0.8)'
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
	/* Chartjs (#revenue) closed */

	/* Chartjs (#resolved-complaints) */
	var ctx = document.getElementById("resolved-complaints");
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct'],
            type: 'line',
            datasets: [ {
                data: [1, 7, 3, 9, 4, 5, 2, 4,1,0],
                label: 'Resolved-complaints',
                backgroundColor: 'rgba(225,225,225,0.3)',
                borderColor: 'rgba(225,225,225)',
            }, ]
        },
        options: {

            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                cornerRadius: 0,
                intersect: false,
            },
            scales: {
                xAxes: [ {
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: 'transparent'
                    },
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent'
                    }
                } ],
                yAxes: [ {
                    display:false,
                    ticks: {
                        display: false,
                    }
                } ]
            },
            title: {
                display: false,
            },
            elements: {
                line: {
                    borderWidth: 4
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });
	/* Chartjs (#resolved-complaints) closed */

	/* Chartjs (#total-coversations) */
	var ctx = document.getElementById('total-coversations').getContext('2d');
	var gradientStroke = myCanvasContext.createLinearGradient(0, 0, 0, 300);
	gradientStroke.addColorStop(0, '#d428ea');
	gradientStroke.addColorStop(1, '#8543f6');
    var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
			datasets: [{
				label: "Total-coversations",
				borderColor: gradientStroke,
				borderWidth: 4,
				backgroundColor: 'transparent',
				data: [0, 50, 0, 100, 50, 130, 100, 140]
			}]
		},
        options: {

            maintainAspectRatio: true,
            legend: {
                display: false
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                cornerRadius: 0,
                intersect: false,
            },
            scales: {
                xAxes: [ {
                    gridLines: {
                        color: 'transparent',
                        zeroLineColor: 'transparent'
                    },
                    ticks: {
                        fontSize: 2,
                        fontColor: 'transparent'
                    }
                } ],
                yAxes: [ {
                    display:false,
                    ticks: {
                        display: false,
                    }
                } ]
            },
            title: {
                display: false,
            },
            elements: {
                line: {
                    borderWidth: 6
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });
	/* Chartjs (#total-coversations) closed */

	/* Chartjs (#total-customers) */
	var myCanvas = document.getElementById("total-customers");
	myCanvas.height="233";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 380);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');

	var myChart = new Chart(myCanvas, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ,"Aug", "Sep"],
			datasets: [{
				label: 'Revenue',
				data: [16, 14, 12, 14, 16, 15, 12, 14,18,10],
				backgroundColor: gradientStroke1,
				hoverBackgroundColor: gradientStroke1,
				hoverBorderWidth: 2,
				hoverBorderColor: 'gradientStroke1'
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
				},
			},
			scales: {
				xAxes: [{
					 barPercentage: 0.3,
					ticks: {
						fontColor: "rgba(0,0,0,0.7)",

					 },
					display: true,
					gridLines: {
						display: false,
						drawBorder: false
					},
					scaleLabel: {
						display: false,
						labelString: 'Month',
						fontColor: 'rgba(0,0,0,0.8)'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "transparent",
					 },
					display: true,
					gridLines: {
						display: false,
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
				text: 'Normal Legend'
			}
		}
	});
	/* Chartjs (#total-customers) closed */

	/* Chartcircle */
	if ($('.chart-circle-1').length) {
		$('.chart-circle-1').each(function() {
			let $this = $(this);
			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: 'rgba(0,0,0,0.1)',
				lineCap: 'round'
			});
		});
	}
	/* Chartcircle  closed*/

});


