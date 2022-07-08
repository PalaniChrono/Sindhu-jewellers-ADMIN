$(function(e) {
	'use strict';

	/* Chartjs (#areaChart1) */
	var ctx = document.getElementById('areaChart1').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 140);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'line',
            datasets: [ {
				label: 'Market value',
				data: [30, 70, 30, 100, 50, 130, 100, 140],
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
	/* Chartjs (#areaChart1) closed */

	/* Chartjs (#areaChart2) */
	var ctx = document.getElementById('areaChart2').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 140);
	gradientStroke1.addColorStop(0, '#fbc434');
	gradientStroke1.addColorStop(1, '#f66b4e');
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'line',
            datasets: [ {
				label: 'Market value',
				data: [24, 18, 28, 21, 32, 28,30],
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
	/* Chartjs (#areaChart2) closed */

	/* Chartjs (#areaChart3) */
	var ctx = document.getElementById('areaChart3').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 140);
	gradientStroke1.addColorStop(0, '#62fb62');
	gradientStroke1.addColorStop(1, '#21a544');
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'line',
            datasets: [ {
				label: 'Market value',
				data: [30, 70, 30, 100, 50, 130, 100, 140],
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
	/* Chartjs (#areaChart3) closed */

	/* Chartjs (#areaChart4) */
	var ctx = document.getElementById('areaChart4').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 180);
	gradientStroke1.addColorStop(0, '#f1644b');
	gradientStroke1.addColorStop(1, '#f94971');
    var myChart = new Chart( ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            type: 'line',
            datasets: [ {
				label: 'Market value',
				data: [24, 18, 28, 21, 32, 28,30],
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
	/* Chartjs (#areaChart4) closed */

	/* Chartjs (#areaChart4) */
	var myCanvas = document.getElementById("return-on-equity");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke = myCanvasContext.createLinearGradient(0, 0, 0, 340);
	gradientStroke.addColorStop(0, '#fbc434');
	gradientStroke.addColorStop(1, '#F66B4E');
    var myChart = new Chart( myCanvas, {
		type: 'bar',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
			datasets: [{
				label: 'Revenue',

				data: [8, 9, 12, 10, 10, 12, 8, 13, 14, 12, 5],
				backgroundColor: gradientStroke,
				hoverBackgroundColor: gradientStroke,
				hoverBorderWidth: 2,
				hoverBorderColor: 'gradientStroke'

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
					 barPercentage: 0.4,
					ticks: {
						fontColor: "rgba(0,0,0,0.7)",

					 },
					display: true,
					gridLines: {
						display: false,
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
						display: false,
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
	/* Chartjs (#areaChart4) closed */

	/* Chartjs (#return-On-Assets) */
	var myCanvas = document.getElementById("return-On-Assets");
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
				data: [20, 40, 30, 60, 41, 66, 45,45, 80],
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
	/* Chartjs (#return-On-Assets) closed */

	/* Updating chart */
    $("span.graph").peity("pie")
    var updatingChart = $(".updating-chart1").peity("line", { width: "100%",height:163 })

    setInterval(function() {

        var random = Math.round(Math.random() * 30)
        var values = updatingChart.text().split(",")
        values.shift()
        values.push(random)

        updatingChart
            .text(values.join(","))
            .change()
    }, 2500)
	/* Updating chart closed */

	/* Chartjs (#revenue-expenses) */
	var myCanvas = document.getElementById("revenue-expenses");
	myCanvas.height="245";
	var myCanvasContext = myCanvas.getContext("2d");
	var gradientColors = [
	{
	  start: '#d428ea',
	  end: ' #8543f6'
	},
	{
	  start: '#fbc434',
	  end: '#f66b4e'
	}
	];
	var gradients = [];
	gradientColors.forEach( function( item ){
		var gradient = myCanvasContext.createLinearGradient(0, 0, 0 , 320);
		gradient.addColorStop(0, item.start);
		gradient.addColorStop(1, item.end);
		gradients.push(gradient);
	});
	var doughnutBar = new Chart(myCanvas, {
		type: 'doughnut',
		data: {
			labels: ["Revenue", "Expenses"],
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
	/* Chartjs (#revenue-expenses) closed */

	/* Chartjs (#total-income) */
	var myCanvas = document.getElementById("total-income");
	myCanvas.height="300";

	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 180);
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

	/* Chartjs (#quick-ratio) */
	var ctx = document.getElementById('quick-ratio').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 340);
	gradientStroke1.addColorStop(0, '#62fb62');
	gradientStroke1.addColorStop(1, '#21a544');


	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			type: 'line',
			datasets: [{
				label: "Resolved Complaints",
				data: [5, 105, 26, 145, 65, 172, 182, 98, 215, 245, 62, 255],
				backgroundColor: gradientStroke1,
				borderColor: gradientStroke1,
				borderWidth: 4,
				pointStyle: 'circle',
				pointRadius: 0,
				pointBorderColor: 'transparent',
				pointBackgroundColor: '#ad59ff',
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,

			legend: {
				display: false,
				labels: {
					usePointStyle: true,
					fontFamily: 'Montserrat',
				},
			},
			scales: {
				xAxes: [{
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
	/* Chartjs (#quick-ratio) closed*/

	/* Chartjs (#current-ratio) */
	var ctx = document.getElementById('current-ratio').getContext('2d');
	var gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 350);
	gradientStroke1.addColorStop(0, '#f1644b');
	gradientStroke1.addColorStop(1, '#f94971');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			type: 'line',
			datasets: [{
				label: "Customer retention in %",
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
	/* Chartjs (#current-ratio) closed */

	/* Sparkelline bar chart*/
	$(".sparkline_bar1").sparkline([2, 4, 3, 4, 5, 4, 5, 0], {
		type: 'bar',
		height: 78,
		width:250,
		barWidth: 4,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#8543f6'
	});
	/* Sparkelline bar chart closed */

});