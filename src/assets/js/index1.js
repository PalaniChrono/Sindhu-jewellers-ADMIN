$(function () {

	/* Sparline */
	$(".sparkline23").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, ], {
		type: 'line',
		height: '88',
		width: '110',
		lineColor: '#f5f3f3',
		fillColor: 'transparent',
		lineWidth: 3,
		spotColor: '#ffb209',
		minSpotColor: '#ffa22b'
	});
	/* Sparline closed */

	/* Sparline bar*/
	$(".sparkline_bar5").sparkline([2, 4, 3, 4, 5, 4, 5, 0, 3, 5, 6, 4], {
		type: 'bar',
		height: 85,
		width:250,
		barWidth: 4,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#f5f3f3'
	});
	/* Sparline bar closed*/

	/* Hight chart*/
    var chart;
    $(document).ready(function() {
    var perShapeGradient = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1.5
        };
        var colors = Highcharts.getOptions().colors;
			colors = [{
				linearGradient: perShapeGradient,
				stops: [
					[0, '#d428ea'],
					[1, '#8543f6']
					]
				}, {
				linearGradient: perShapeGradient,
				stops: [
					[0, '#fbc434'],
					[1, '#f66b4e']
					]
				}, {
				linearGradient: perShapeGradient,
				stops: [
					[0, '#62fb62'],
					[1, '#21a544']
					]
				}, {
				linearGradient: perShapeGradient,

				stops: [
					[0, '#f15074'],
					[1, '#f7583c']
					]
				}, {
				linearGradient: perShapeGradient,
				stops: [
					[0, '#00f2fe'],
					[1, '#1e63c3']
					]},

				]

        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'column'
            },
            title: {
                text:null
            },

            xAxis: {
                categories: ['Premium', 'Enterprise', 'Trial', 'Starter', 'Webiste']
            },

            plotOptions: {
                column: {
                    cursor: 'pointer',
                   dataLabels: {
                        enabled: true,
                        color: colors[0],
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function() {
                            return this.y +'%';
                        }
                    }
                },
				series: {
					pointWidth: 30
				}
            },

            series: [{
                name: name,
                data: [{
                    y: 55.11,
                    color: colors[0]
                }, {
                    y: 43.63,
                    color: colors[1]
                }, {
					 y: 38.63,
                    color: colors[2]
                }, {
					 y: 49.63,
                    color: colors[3]
                }, {
                    y: 36.94,
                    color: colors[4]
                }],
                color: 'white'
            }],
            legend: {enabled:false},yAxis: {
                min: 0,
                title: {
                    text: null
                },
                stackLabels: {
                    enabled: true
                }
            },
        });
    });
	/* Hight chart closed*/

	/* Chart-js (#site-executive) */
	var myCanvas = document.getElementById("site-executive");
	myCanvas.height="290";
	var myCanvasContext = myCanvas.getContext("2d");
	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 200);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');

	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 190);
	gradientStroke2.addColorStop(0, '#fbc434');
	gradientStroke2.addColorStop(1, '#f66b4e');
	var myChart = new Chart( myCanvas, {
		type: 'line',
		data : {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
			type: 'line',
			 datasets: [
			{
				label: "Users",
				data: [2,7,3,9,4,5,2,8,4,6,5,2,8,4,7,2,4,6,4,8,4,],
				backgroundColor: gradientStroke1,
				borderColor: '#8543f6' ,
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke1,
				pointBorderColor :'#8543f6',
				pointHoverBorderColor :gradientStroke1,
				pointBorderWidth :2,
				pointRadius :4,
				pointHoverRadius :4,
				labelColor:gradientStroke1,
				borderWidth: 2,

			}, {
				label: "Page-views",
				data: [5,3,9,6,5,9,7,3,5,2,5,3,9,6,5,9,7,3,5,2,7,10],
				backgroundColor: gradientStroke2,
				borderColor: '#ed6ea0',
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke2,
				pointBorderColor :'#ed6ea0',
				pointHoverBorderColor :gradientStroke2,
				pointBorderWidth :2,
				pointRadius :4,
				pointHoverRadius :4,
				borderWidth: 2,

			}
		  ]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display:true
			},
			tooltips: {
				show: true,
				showContent: true,
				alwaysShowContent: true,
				triggerOn: 'mousemove',
				trigger: 'axis',
				axisPointer:
				{
					label: {
						show: false,
					},
				}
			},

			scales: {
				xAxes: [ {
					gridLines: {
						color: '#eaf2f9',
						zeroLineColor: '#000'
					},
					ticks: {
						fontSize: 12,
						fontColor: '#000',
						 beginAtZero: true,
						padding: 0
					}
				} ],
				yAxes: [ {
					gridLines: {
						color: 'transparent',
						zeroLineColor: '#000'
					},
					ticks: {
						fontSize: 12,
						fontColor: '#000',
						beginAtZero: false,
						padding: 0
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
	})
	/* Chart-js (#site-executive) closed */

	/* Donutchart */
	Highcharts.setOptions({
			colors: ['rgb(152, 59, 243,0.9)', 'rgb(248, 143, 67,0.9)', 'rgb(78, 224, 88,0.9)']
	})
	Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
			return {
					radialGradient: {
							cx: 0.5,
							cy: 0.5,
							r: 0.9
					},
					stops: [
							[0, color],
							[0.4, Highcharts.Color(color).brighten(-.4).get('rgb')], // darken
							[0.6, color],
							[1, Highcharts.Color(color).brighten(-.4).get('rgb')], // darken
					]
			};
	});
	var chart = new Highcharts.Chart({
		chart: {
				renderTo: 'donut',
				type: 'pie',
				backgroundColor: 'transparent',
		},
		credits: false,
		exporting: false,
		tooltip: {
				formatter: function() {
						return '<p>' + this.series.name + '<br>$' + this.point.y + '</p>';
				},
				borderRadius: 5,
				borderWidth: 2,
				backgroundColor: '#fff',
				padding: 3
		},
		plotOptions: {
				pie: {
						borderWidth: .5,
						innerSize: '70%',
						cursor: 'pointer',
						slicedOffset: 5,
						slicedOffset: 5,

						borderColor: "rgba(255,255,255,.5)",

						dataLabels: {
								enabled: false
						}
				},

				// slice animation formatter function
				series: {
						allowPointSelect: false,
						stickyTracking: false,
						point: {
								events: {
										mouseOver: function() {
												var point = this,
												points = this.series.points;


												// unslice sliced element(s)
												for (var key in points) {
														if (points[key].sliced) {
																points[key].slice(false);
														}
												}

												// slice hovered element
												if (!point.selected) {
														point.slice(true);
												}
										}
								}
						},
						events: {
								mouseOut: function(event) {
										// unslice sliced element(s)
										for (var key in this.points) {
												if (this.points[key].sliced) {
														this.points[key].slice(false);
												}
										}
								}
						}
				}
		},
		title: {
				text: false
		},

		series: [{
				data: [
						['Firefox', 44.2],
						['IE7', 26.6],
						['IE6', 20]
				],
		}, ]
	},
	// using
	function(chart) { // on complete
			var xpos = '50%';
			var ypos = '50%';
			var circleradius = 102;
			// Render the circle
			chart.renderer.circle(xpos, ypos, circleradius).attr({
					fill: 'transparent',
			}).add();
	});
   /* Donutchart closed*/

   /* Chartjs (#revenue-by-channel) */
    var myCanvas = document.getElementById("revenue-by-channel");
	myCanvas.height="343";
	var myCanvasContext = myCanvas.getContext("2d");

	var gradientStroke1 = myCanvasContext.createLinearGradient(0, 0, 0, 240);
	gradientStroke1.addColorStop(0, '#d428ea');
	gradientStroke1.addColorStop(1, '#8543f6');

	var gradientStroke2 = myCanvasContext.createLinearGradient(0, 0, 0, 280);
	gradientStroke2.addColorStop(0, '#fbc434');
	gradientStroke2.addColorStop(1, '#f66b4e');

    var myChart = new Chart( myCanvas, {

		type: 'line',
		data: {
			labels: ["Jan", "feb", "Mar", "Apr", "May", "Jun", "Jul"],
			type: 'line',
			datasets: [{
				label: 'Social',
				data: [0, 70, 75, 120, 94, 141, 162],
				backgroundColor: 'transparent',
				borderColor: gradientStroke1,
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke1,
				pointBorderColor :gradientStroke1,
				pointHoverBorderColor :gradientStroke1,
				pointBorderWidth :4,
				pointRadius :2,
				pointHoverRadius :2,
				borderWidth: 4
			}, {
				label: "Paid Ads",
				data: [0, 50, 40, 80, 40, 79, 120],
				backgroundColor: 'transparent',
				borderColor: gradientStroke2,
				pointBackgroundColor:'#fff',
				pointHoverBackgroundColor:gradientStroke2,
				pointBorderColor :gradientStroke2,
				pointHoverBorderColor :gradientStroke2,
				pointBorderWidth :4,
				pointRadius :2,
				pointHoverRadius :2,
				borderWidth: 4
			}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				mode: 'index',
				titleFontSize: 12,
				titleFontColor: 'rgba(0,0,0,0.5)',
				bodyFontColor: 'rgba(0,0,0,0.5)',
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
					ticks: {
						fontColor: "rgba(0,0,0,0.5)",
					},
					display: true,
					gridLines: {
						color: '#eaf2f9'
					},
					scaleLabel: {
						display: true,
						labelString: 'Month',
						fontColor: '#323c53'
					}
				}],
				yAxes: [{
					ticks: {
						fontColor: "rgba(0,0,0,0.5)",
					},
					display: true,
					gridLines: {
						display: false,
						drawBorder: true
					},
					scaleLabel: {
						display: true,
						labelString: 'Revenue by channel',
						fontColor: '#323c53'
					}
				}]
			},
			title: {
				display: false,
				text: 'Normal Legend'
			}
		}
	});
	/* Chartjs (#revenue-by-channel) closed */

	/* sparkline_bar1 */
	$(".sparkline_bar1").sparkline([2, 4, 3, 4, 5, 4], {
		type: 'bar',
		height: 50,
		width:250,
		barWidth: 5,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#9740f4'
	});
	/* sparkline_bar1 end */

	/* sparkline_bar2 */
	$(".sparkline_bar2").sparkline([2, 4, 3, 4, 5, 4], {
		type: 'bar',
		height: 50,
		width:250,
		barWidth: 5,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#f28b34'
	});
	/* sparkline_bar2 end */

	/* sparkline_bar3 */
	$(".sparkline_bar3").sparkline([2, 4, 3, 4, 5, 4], {
		type: 'bar',
		height: 50,
		width:250,
		barWidth: 5,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#2ec52e'
	});
	/* sparkline_bar3 end */

	/* sparkline_bar4 */
	$(".sparkline_bar4").sparkline([2, 4, 3, 4, 5, 4], {
		type: 'bar',
		height: 50,
		width:250,
		barWidth: 5,
		barSpacing: 7,
		colorMap: {
			'9': '#a1a1a1'
		},
		barColor: '#ff4a31'
	});
	/* sparkline_bar4 end */

});





