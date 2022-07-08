$(function(e) {

    /* Peity bar chart */
	$(".bar").peity("bar",{
		  height: 2,
		  width: 5,
		  max: null,
		  min: 0,
		  padding: 0.3
	})
	 /* Peity bar chart closed */

	/* Peity bar chart-1 */
	$(".sparkline_bar1").sparkline([2, 4, 3, 4, 5, 4, 5, 0, 3, 5, 6, 4, 4, 4, 5, 3, 5], {
		type: 'bar',
		height: 78,
		width:250,
		barWidth: 4,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#f5f3f3'
	});
	/* Peity bar chart-1 closed */

	/* Peity bar chart-2 */
	$(".sparkline_bar2").sparkline([4, 6, 5, 7, 4, 3, 4 ], {
		type: 'bar',
		height: 37,
		width:150,
		barWidth: 4,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#8543f6'
	});
	/* Peity bar chart-2 closed */

	/* Peity bar chart-3 */
	$(".sparkline_bar3").sparkline([4, 6, 5, 7, 4, 3, 4 ], {
		type: 'bar',
		height: 37,
		width:150,
		barWidth: 4,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#8543f6'
	});
	/* Peity bar chart-3 closed */

    /* chartjs (#earnings) */
	var myCanvas = document.getElementById("earnings");
	myCanvas.height="252";
	var myCanvasContext = myCanvas.getContext("2d");
	var gradientColors = [
		{
		  start: '#8543f6',
		  end: '#d428ea'
		},
		{
		  start: '#fbc434',
		  end: '#f66b4e'
		}
		];
		var gradients = [];
		gradientColors.forEach( function( item ){
			var gradient = myCanvasContext.createLinearGradient(0, 0, 0 , 280);
			gradient.addColorStop(0, item.start);
			gradient.addColorStop(1, item.end);
			gradients.push(gradient);
		});
		var doughnutBar = new Chart(myCanvas, {
			type: 'doughnut',
			data: {
				labels: ["Weekly", "Monthly"],
				datasets: [{
					label: "Status",
					backgroundColor: gradients,
					borderColor: 'rgba(73, 79, 92, 0)',
					data: [38, 24]
				}]
			},
			options: {
				cutoutPercentage: 75,
				maintainAspectRatio: false,
				startAngle: 0,
				tooltips: {
					mode: 'index',
					backgroundColor: '#393e48'
				},
				legend: {
					position: 'bottom',
					labels: {
						fontSize: 12,
						padding: 25,
						boxWidth: 15
					}
				}
			}
		});
	/* chartjs (#earnings) closed */

	/* chartjs (#sales-statistics) */
	var myCanvas = document.getElementById("sales-statistics");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 360);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');

	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 360);
	gradientStroke2.addColorStop(0, '#fbc434');
	gradientStroke2.addColorStop(1, '#F66B4E');

    var myChart = new Chart( myCanvas, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
			datasets: [{
				label: 'Total Sales',
				data: [15, 13, 12, 14, 10, 15, 7, 14],
				backgroundColor: gradientStroke1,
				hoverBackgroundColor: gradientStroke1,
				hoverBorderWidth: 2,
				hoverBorderColor: 'gradientStroke1'
			},{
			label: 'Total Profits',
				data: [10, 14, 10, 15, 9, 13, 15, 18],
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
						fontColor: 'rgba(0,0,0,0.81)'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.8)",
					 },
					display: true,
					gridLines: {
						display: false,
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
	/* chartjs (#sales-statistics) closed */

	/* chartjs (#sales) */
	var myCanvas = document.getElementById("sales");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke = myCanvasContext.createLinearGradient(0, 0, 0, 380);
	gradientStroke.addColorStop(0, '#d428ea');
	gradientStroke.addColorStop(1, '#8543f6');
    var myChart = new Chart( myCanvas, {
		type: 'line',
		data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'line',
            datasets: [ {
				label: 'Return-On-Assets',
				data: [0, 50, 0, 100, 50, 130, 100, 140, 50],
				backgroundColor: gradientStroke,
				borderColor: '#8543f6',
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke,
				pointBorderColor :'#8543f6',
				pointHoverBorderColor :gradientStroke,
				pointBorderWidth :2,
				pointRadius :6,
				pointHoverRadius :2,
				borderWidth: 2
            }, ]
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
					usePointStyle: false,
				},
			},
			scales: {
				xAxes: [{
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
						fontColor: 'transparent'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.8)",
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
	/* chartjs (#sales) closed */

    /* chartjs (#orders) */
	var ctx = document.getElementById("orders");
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct'],
            type: 'line',
            datasets: [ {
                data: [1, 7, 3, 9, 4, 5, 2, 4,1,0],
                label: '',
                backgroundColor: 'rgba(225,225,225,0.3)',
                borderColor: '#fff',
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
                    borderWidth: 3
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });
	/* chartjs (#orders) closed*/

	/* chartjs (#profit) */
	var ctx = document.getElementById("profit");
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug'],
            type: 'line',
            datasets: [ {
                data: [0, 50, 0, 100, 50, 130, 100, 140],
                label: '',
                backgroundColor: 'transparent',
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
                    borderWidth: 3
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });
	/* chartjs (#profit) closed */

	/* chartjs (#sales-revenue) */
	var ctx = document.getElementById('sales-revenue').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 36, 150, 250);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');
    var myChart = new Chart( ctx, {
        type: 'line',
        data : {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            type: 'line',
             datasets: [
			{
				label: "Active Users",
				data: [2,7,3,9,4,5,2],
				backgroundColor: gradientStroke1,
				borderColor: '#8543f6',
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke1,
				pointBorderColor :'#8543f6',
				pointHoverBorderColor :gradientStroke1,
				pointBorderWidth :2,
				pointRadius :4,
				pointHoverRadius :4,
				lineTension :'0.2',
				borderWidth: 2
			}
		  ]
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
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4
                }
            }
        }
    });
	/* chartjs (#sales-revenue) closed */

 });